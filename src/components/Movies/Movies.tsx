import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

const Movies = () => {
  return (
    <div className='movies'>
      <Header type='authorized' />
      <main className='movies__content'>
        <SearchForm />
        {/* <Preloader /> */}
        <MoviesCardList type='all' />
      </main>
      <Footer />
    </div>
  );
};

export default Movies;
