import './NavTab.css';
import { HashLink } from 'react-router-hash-link';
import { ROUTES } from '../../utils/constants';

const NavTab = () => {
  return (
    <nav className='navtab'>
      <ul className='navtab__ul-container'>
        <li>
          <HashLink
            smooth
            to={`${ROUTES.main}#about-project`}
            className='navtab__hashlink'
          >
            О проекте
          </HashLink>
        </li>
        <li>
          <HashLink
            smooth
            to={`${ROUTES.main}#techs`}
            className='navtab__hashlink'
          >
            Технологии
          </HashLink>
        </li>
        <li>
          <HashLink
            smooth
            to={`${ROUTES.main}#about-me`}
            className='navtab__hashlink'
          >
            Студент
          </HashLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavTab;
