import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

interface HeaderProps {
  type: 'authorized' | 'unauthorized';
}

const Header: React.FC<HeaderProps> = ({ type }) => {
  return (
    <header className='header'>
      <Logo />
      <Navigation type={type} />
    </header>
  );
};

export default Header;
