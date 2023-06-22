import './Logo.css';
import { NavLink } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import { ROUTES } from '../../utils/constants';

const Logo = () => {
  return (
    <NavLink to={ROUTES.main} className='logo'>
      <img src={logo} alt='Логотип приложения' className='logo__image' />
    </NavLink>
  );
};

export default Logo;
