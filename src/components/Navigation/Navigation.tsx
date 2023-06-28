import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import AccountLink from '../AccountLogo/AccountLink';
import './Navigation.css';

interface NavigationProps {
  type: 'authorized' | 'unauthorized';
  openMenu: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ type, openMenu }) => (
  <nav className='navigation'>
    {type === 'authorized' && (
      <>
        <button
          aria-label='открыть меню'
          type='button'
          className='navigation__burger'
          onClick={openMenu}
        />
        <ul className='navigation__list navigation__list_authorized'>
          <li>
            <NavLink
              to={ROUTES.movies}
              className={({ isActive }) =>
                isActive
                  ? 'navigation__link navigation__link_active'
                  : 'navigation__link'
              }
            >
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink
              to={ROUTES.savedMovies}
              className={({ isActive }) =>
                isActive
                  ? 'navigation__link navigation__link_active'
                  : 'navigation__link'
              }
            >
              Сохраненные фильмы
            </NavLink>
          </li>
          <li className='navigation__item_margin-left_auto'>
            <AccountLink />
          </li>
        </ul>
      </>
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

export default Navigation;
