import './AccountLink.css';
import Account from '../../images/Account.svg';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

const AccountLink = () => {
  return (
    <NavLink to={ROUTES.profile} className='account-link'>
      <p className='account-link__text'>Аккаунт</p>
      <div className='account-link__image-container'>
        <img src={Account} alt='Лого аккаунт' />
      </div>
    </NavLink>
  );
};

export default AccountLink;
