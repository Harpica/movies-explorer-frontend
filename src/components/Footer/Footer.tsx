import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <p className='footer__description'>
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <nav className='footer__nav'>
          <p className='footer__year'>&copy; 2023</p>
          <ul className='footer__list'>
            <li className='footer__item'>
              <a
                href='https://practicum.yandex.ru/'
                target='_blank'
                className='footer__link'
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className='footer__item'>
              <a
                href='https://github.com/Harpica/movies-explorer-frontend'
                target='_blank'
                className='footer__link'
              >
                Github
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
