import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = () => {
  return (
    <div className='movies'>
      <Header type='authorized' />
      <div className='movies__content'>
        <SearchForm />
        <MoviesCardList type='all' />
      </div>
      <Footer />
    </div>
  );
};

export default Movies;
