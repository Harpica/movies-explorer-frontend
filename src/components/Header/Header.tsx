import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

interface HeaderProps {
  type: 'authorized' | 'unauthorized';
}

const Header: React.FC<HeaderProps> = ({ type }) => {
  return (
    <header className='header'>
      <div className='header__container'>
        <Logo />
        <Navigation type={type} />
      </div>
    </header>
  );
};

export default Header;
