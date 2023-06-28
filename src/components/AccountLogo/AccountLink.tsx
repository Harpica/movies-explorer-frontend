import { NavLink } from 'react-router-dom';
import Account from '../../images/Account.svg';
import { ROUTES } from '../../utils/constants';
import './AccountLink.css';

const AccountLink = () => (
  <NavLink to={ROUTES.profile} className='account-link'>
    <p className='account-link__text'>Аккаунт</p>
    <div className='account-link__image-container'>
      <img src={Account} alt='Лого аккаунт' />
    </div>
  </NavLink>
);

export default AccountLink;
