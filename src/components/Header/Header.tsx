import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import SidebarNav from '../SidebarNav/SidebarNav';
import { useState } from 'react';

interface HeaderProps {
  type: 'authorized' | 'unauthorized';
}

const Header: React.FC<HeaderProps> = ({ type }) => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  return (
    <header className='header'>
      <div className='header__container'>
        <Logo />
        <Navigation type={type} openMenu={() => setMenuIsOpen(true)} />
      </div>
      <SidebarNav isOpen={menuIsOpen} closeMenu={() => setMenuIsOpen(false)} />
    </header>
  );
};

export default Header;
