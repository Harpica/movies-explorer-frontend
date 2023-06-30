import { useState, useCallback } from 'react';
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

  const onSubmitSearchQuery = useCallback(
    (searchValue: string) => {
      const result = searchMoviesLocal(searchValue);
      if (result.status === 'failure') {
        setNotificationMessage(result.message);
      }
    },
    [searchMoviesLocal]
  );

  const onSwitcherChange = useCallback(
    (isShort: boolean) => {
      setNotificationMessage('');
      const result = filterMoviesByDuration(isShort);
      if (result.status === 'failure') {
        setNotificationMessage(result.message);
      }
    },
    [filterMoviesByDuration]
  );

  return (
    <div className='saved-movies'>
      <Header type='authorized' />
      <div className='saved-movies__content'>
        <SearchForm
          onSubmit={onSubmitSearchQuery}
          onSwitcherChange={onSwitcherChange}
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
