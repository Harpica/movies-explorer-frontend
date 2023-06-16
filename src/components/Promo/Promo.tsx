import './Promo.css';
import Header from '../Header/Header';

const Promo = () => {
  return (
    <section className='promo' id='promo'>
      <div className='promo__container'>
        <Header type='unauthorized' />
        <div className='promo__title-container'>
          <h1 className='promo__title'>
            Учебный проект студента факультета Веб-разработки.
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Promo;
