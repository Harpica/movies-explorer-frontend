import './Movies.css';
import Header from '../Header/Header';

const Movies = () => {
  return (
    <div className='movies'>
      <section className='movies__header'>
        <Header type='authorized' />
      </section>
    </div>
  );
};

export default Movies;
