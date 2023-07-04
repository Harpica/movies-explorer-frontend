import React, { useCallback, useEffect, useState, useRef } from 'react';
import { SavedMovie } from '../../@types/types';
import useMoviesApi from '../../hooks/useMoviesApi';
import useMoviesFilter from '../../hooks/useMoviesFilter';
import useMoviesPagination from '../../hooks/useMoviesPagination';
import { NOTIFICATIONS } from '../../utils/constants';
import { getLocalStorageValue } from '../../utils/utils';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Notification from '../Notification/Notification';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

interface MoviesProps {
  savedMovies: Map<number, SavedMovie>;
  setSavedMovies: React.Dispatch<React.SetStateAction<Map<number, SavedMovie>>>;
}

const Movies: React.FC<MoviesProps> = ({ savedMovies, setSavedMovies }) => {
  const [searchValue, setSearchValue] = useState<string>(() =>
    getLocalStorageValue<string>('searchValue', '')
  );
  const isShortInit = useRef(
    (() => getLocalStorageValue<boolean>('isShort', false))()
  );
  const [notificationMessage, setNotificationMessage] = useState<string>(
    searchValue === '' ? NOTIFICATIONS.enterKeyword : ''
  );

  const { movies, searchMoviesApi, isLoading } = useMoviesApi(savedMovies);
  const { filterMoviesByDuration, filteredMovies } = useMoviesFilter(
    movies,
    isShortInit.current
  );
  const { showedMovies, getMoreMovies, hasMoreMovies } =
    useMoviesPagination(filteredMovies);

  const onSubmitSearchQuery = useCallback(
    async (searchValue: string) => {
      setNotificationMessage('');
      const result = await searchMoviesApi(searchValue);
      if (result.status === 'failure') {
        setNotificationMessage(result.message);
      }
    },
    [searchMoviesApi]
  );

  const onSwitcherChange = useCallback(
    (isShort: boolean) => {
      setNotificationMessage('');
      window.localStorage.setItem('isShort', JSON.stringify(isShort));
      const result = filterMoviesByDuration(isShort);
      if (result.status === 'failure') {
        setNotificationMessage(result.message);
      }
    },
    [filterMoviesByDuration]
  );

  return (
    <div className='movies'>
      <Header type='authorized' />
      <main className='movies__content'>
        <SearchForm
          onSubmit={onSubmitSearchQuery}
          onSwitcherChange={onSwitcherChange}
          setSearchValue={setSearchValue}
          isShortInit={isShortInit.current}
          searchValue={searchValue}
          type='all'
          isLoading={isLoading}
        />
        <Notification message={notificationMessage} />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            type='all'
            movies={showedMovies}
            setSavedMovies={setSavedMovies}
            getMoreMoviesButton={
              <button
                type='button'
                className={`movies-list__load ${
                  hasMoreMovies() ? '' : 'movies-list__load_hide'
                }`}
                onClick={getMoreMovies}
              >
                Еще
              </button>
            }
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Movies;
