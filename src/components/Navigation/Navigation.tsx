import './Navigation.css';
import { NavLink } from 'react-router-dom';
import Account from '../../images/Account.svg';
import { ROUTES } from '../../utils/constants';

interface NavigationProps {
  type: 'authorized' | 'unauthorized';
}

const Navigation: React.FC<NavigationProps> = ({ type }) => {
  return (
    <nav className='navigation'>
      {type === 'authorized' && (
        <ul className='navigation__list navigation__list_authorized'>
          <li>
            <NavLink to={ROUTES.movies} className='navigation__link'>
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink to={ROUTES.savedMovies} className='navigation__link'>
              Сохраненные фильмы
            </NavLink>
          </li>
          <li className='navigation__item_margin-left_auto'>
            <NavLink
              to={ROUTES.profile}
              className='navigation__link navigation__link_type_account'
            >
              <p className='navigation__link-text'>Аккаунт</p>
              <div className='account-image__container'>
                <img src={Account} alt='Лого аккаунт' />
              </div>
            </NavLink>
          </li>
        </ul>
      )}
      {type === 'unauthorized' && (
        <ul className='navigation__list navigation__list_unauthorized'>
          <li>
            <NavLink
              to={ROUTES.signup}
              className='navigation__link navigation__link_type_signup'
            >
              Регистрация
            </NavLink>
          </li>
          <li>
            <NavLink
              to={ROUTES.signin}
              className='navigation__link navigation__link_type_signin'
            >
              Войти
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
