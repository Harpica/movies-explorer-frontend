import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className='not-found'>
      <div className='not-found__content'>
        <h1 className='not-found__title'>404</h1>
        <p className='not-found__message'>Страница не найдена</p>
      </div>
      <button
        type='button'
        aria-label='Назад'
        onClick={() => navigate(-1)}
        className='not-found__back'
      >
        Назад
      </button>
    </section>
  );
};

export default NotFound;
