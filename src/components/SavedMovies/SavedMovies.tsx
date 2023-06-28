import { SavedMovie } from '../../@types/types';
import useMovies from '../../hooks/useMovies';
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
