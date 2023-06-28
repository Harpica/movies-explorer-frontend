import { useContext, useState } from 'react';
import { User } from '../../@types/types';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import EditPopup from '../EditPopup/EditPopup';
import Header from '../Header/Header';
import './Profile.css';

interface ProfileProps {
  logOut: () => void;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
}

const Profile: React.FC<ProfileProps> = ({ logOut, setCurrentUser }) => {
  const user = useContext(CurrentUserContext);
  const { name, email } = user;
  const [isEditPopupOpen, setIsEditPopupOpen] = useState<boolean>(false);

  const openEditPopup = () => {
    setIsEditPopupOpen(true);
  };

  const closePopup = () => {
    setIsEditPopupOpen(false);
  };

  return (
    <div className='profile'>
      <Header type='authorized' />
      <section className='profile__content'>
        <div className='profile__data-container'>
          <h2 className='profile__title'>{`Привет, ${name}!`}</h2>
          <dl className='profile__data-list'>
            <div className='profile__data-pair'>
              <dt className='profile__data-title'>Имя</dt>
              <dd className='profile__data-description'>{name}</dd>
            </div>
            <div className='profile__data-pair'>
              <dt className='profile__data-title'>E-mail</dt>
              <dd className='profile__data-description'>{email}</dd>
            </div>
          </dl>
        </div>
        <div className='profile__button-container'>
          <button
            type='button'
            className='profile__button'
            onClick={openEditPopup}
          >
            Редактировать
          </button>
          <button
            type='button'
            className='profile__button profile__button_type_logout'
            onClick={logOut}
          >
            Выйти из аккаунта
          </button>
        </div>
      </section>
      <EditPopup
        isOpen={isEditPopupOpen}
        closePopup={closePopup}
        user={user}
        setCurrentUser={setCurrentUser}
      />
    </div>
  );
};

export default Profile;
