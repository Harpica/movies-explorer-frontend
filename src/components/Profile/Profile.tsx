import Header from '../Header/Header';
import './Profile.css';

const Profile = () => {
  return (
    <div className='profile'>
      <Header type='authorized' />
      <section className='profile__content'>
        <div className='profile__data-container'>
          <h2 className='profile__title'>Привет, Виталий!</h2>
          <dl className='profile__data-list'>
            <div className='profile__data-pair'>
              <dt className='profile__data-title'>Имя</dt>
              <dd className='profile__data-description'>Виталий</dd>
            </div>
            <div className='profile__data-pair'>
              <dt className='profile__data-title'>E-mail</dt>
              <dd className='profile__data-description'>pochta@yandex.ru</dd>
            </div>
          </dl>
        </div>
        <div className='profile__button-container'>
          <button className='profile__button'>Редактировать</button>
          <button className='profile__button profile__button_type_logout'>
            Выйти из аккаунта
          </button>
        </div>
      </section>
    </div>
  );
};

export default Profile;
