import { useState, useCallback, useEffect } from 'react';
import { SavedMovie } from '../../@types/types';
import useMoviesFilter from '../../hooks/useMoviesFilter';
import useMoviesLocal from '../../hooks/useMoviesLocal';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Notification from '../Notification/Notification';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

interface SavedMoviesProps {
  savedMoviesArray: Array<SavedMovie>;
  setSavedMovies: React.Dispatch<React.SetStateAction<Map<number, SavedMovie>>>;
}

const SavedMovies: React.FC<SavedMoviesProps> = ({
  savedMoviesArray,
  setSavedMovies,
}) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [notificationMessage, setNotificationMessage] = useState<string>('');

  const { movies, searchMoviesLocal } = useMoviesLocal(
    savedMoviesArray,
    searchValue
  );
  const { filterMoviesByDuration, filteredMovies } = useMoviesFilter(
    movies,
    false
  );

  useEffect(() => {
    setNotificationMessage('');
    if (filteredMovies.length === 0) {
      setNotificationMessage('Ничего не найдено');
    }
  }, [filteredMovies, searchValue]);

  const onSubmitSearchQuery = useCallback(
    (searchValue: string) => {
      searchMoviesLocal(searchValue);
    },
    [searchMoviesLocal]
  );

  return (
    <div className='saved-movies'>
      <Header type='authorized' />
      <div className='saved-movies__content'>
        <SearchForm
          onSubmit={onSubmitSearchQuery}
          onSwitcherChange={filterMoviesByDuration}
          setSearchValue={setSearchValue}
          isShortInit={false}
          searchValue={searchValue}
          type='saved'
        />
        <Notification message={notificationMessage} />
        <MoviesCardList
          type='saved'
          movies={filteredMovies}
          setSavedMovies={setSavedMovies}
        />
      </div>
      <Footer />
    </div>
  );
};

export default SavedMovies;
