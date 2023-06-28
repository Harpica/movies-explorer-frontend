import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import AccountLink from '../AccountLogo/AccountLink';
import './SidebarNav.css';

interface SidebarNavProps {
  isOpen: boolean;
  closeMenu: () => void;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ isOpen, closeMenu }) => (
  <section
    className={`sidebar ${isOpen ? 'sidebar_opened' : 'sidebar_closed'}`}
  >
    <nav
      className={
        'sidebar-nav'
        + `${isOpen ? ' sidebar-nav_opened' : ' sidebar-nav_closed'}`
      }
    >
      <button
        type='button'
        className='sidebar-nav__close'
        onClick={closeMenu}
        aria-label='Закрыть меню'
      />
      <ul className='sidebar-nav__list'>
        <li className='sidebar-nav__item'>
          <NavLink
            to={ROUTES.main}
            className={({ isActive }) => (isActive
              ? 'sidebar-nav__link sidebar-nav__link_active'
              : 'sidebar-nav__link')}
          >
            Главная
          </NavLink>
        </li>
        <li className='sidebar-nav__item'>
          <NavLink
            to={ROUTES.movies}
            className={({ isActive }) => (isActive
              ? 'sidebar-nav__link sidebar-nav__link_active'
              : 'sidebar-nav__link')}
          >
            Фильмы
          </NavLink>
        </li>
        <li className='sidebar-nav__item'>
          <NavLink
            to={ROUTES.savedMovies}
            className={({ isActive }) => (isActive
              ? 'sidebar-nav__link sidebar-nav__link_active'
              : 'sidebar-nav__link')}
          >
            Сохраненные фильмы
          </NavLink>
        </li>
        <li className='sidebar-nav__item sidebar-nav__item_type_account'>
          <AccountLink />
        </li>
      </ul>
    </nav>
  </section>
);

export default SidebarNav;
