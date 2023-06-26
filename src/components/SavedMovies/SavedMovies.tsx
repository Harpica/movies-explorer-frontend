import './SavedMovies.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { Movie, SavedMovie, SearchQuery } from '../../utils/types';
import useSearchMovies from '../../hooks/useSearchMovies';
import { useEffect, useState } from 'react';
import Notification from '../Notification/Notification';
import useMovies from '../../hooks/useMovies';

interface SavedMoviesProps {
  savedMoviesArray: Array<SavedMovie>;
  setSavedMovies: React.Dispatch<React.SetStateAction<Map<number, SavedMovie>>>;
}

const SavedMovies: React.FC<SavedMoviesProps> = ({
  savedMoviesArray,
  setSavedMovies,
}) => {
  const { notificationMessage, filteredMovies, filterMovies } =
    useMovies(savedMoviesArray);

  return (
    <div className='saved-movies'>
      <Header type='authorized' />
      <div className='saved-movies__content'>
        <SearchForm onSubmit={filterMovies} onSwitcherChange={filterMovies} />
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
