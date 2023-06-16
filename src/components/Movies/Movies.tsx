import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Movies = () => {
  return (
    <div className='movies'>
      <section className='movies__header'>
        <Header type='authorized' />
      </section>
      <Footer />
    </div>
  );
};

export default Movies;
