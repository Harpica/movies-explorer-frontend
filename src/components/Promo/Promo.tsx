import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { DEFAULT_USER } from '../../utils/constants';
import Header from '../Header/Header';
import './Promo.css';

const Promo = () => {
  const { name } = useContext(CurrentUserContext);
  return (
    <section className='promo' id='promo'>
      <div className='promo__container'>
        <Header
          type={name !== DEFAULT_USER.name ? 'authorized' : 'unauthorized'}
        />
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
