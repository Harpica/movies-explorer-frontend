import './SavedMovies.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { SavedMovie, SearchQuery } from '../../utils/types';

interface SavedMoviesProps {
  savedMovies: Map<number, SavedMovie>;
  setSavedMovies: React.Dispatch<React.SetStateAction<Map<number, SavedMovie>>>;
}

const SavedMovies: React.FC<SavedMoviesProps> = ({
  savedMovies,
  setSavedMovies,
}) => {
  return (
    <div className='saved-movies'>
      <Header type='authorized' />
      <div className='saved-movies__content'>
        <SearchForm onSubmit={(searchQuery: SearchQuery) => {}} />
        <MoviesCardList
          type='saved'
          movies={Array.from(savedMovies.values())}
          setSavedMovies={setSavedMovies}
        />
      </div>
      <Footer />
    </div>
  );
};

export default SavedMovies;
