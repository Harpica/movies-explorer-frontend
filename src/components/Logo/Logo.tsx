import { NavLink } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import { ROUTES } from '../../utils/constants';

const Logo = () => {
  return (
    <NavLink to={ROUTES.main}>
      <img src={logo} alt='Логотип приложения' />
    </NavLink>
  );
};

export default Logo;
