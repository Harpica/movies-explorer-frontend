import myPhoto from '../../images/My-photo.jpg';
import SectionTitle from '../SectionTitle/SectionTitle';
import './AboutMe.css';

const AboutMe = () => (
  <section className='about-me' id='about-me'>
    <div className='about-me__container'>
      <SectionTitle title='Студент' />
      <div className='about-me__description-container'>
        <div className='about-me__description-column'>
          <h3 className='about-me__name'>Александра</h3>
          <p className='about-me__job'>Фронтенд-разработчик</p>
          <p className='about-me__description'>
            Я живу в Кутаиси, имею высшее химико-технологическое образование и
            опыт работы в науке и клинических исследованиях. Люблю дредлоки,
            игру на гитаре и йогу. После прохождения курса по веб-разработке
            получила работу над благотворительным проектом для
            онлайн-тестирования школьников как фуллстак-разработчик.
          </p>
          <a
            href='https://github.com/Harpica'
            target='_blank'
            rel='noreferrer'
            className='about-me__github'
          >
            Github
          </a>
        </div>
        <img src={myPhoto} alt='me' className='about-me__photo' />
      </div>
      <h4 className='about-me__portfolio-title'>Портфолио</h4>
      <ul className='about-me__portfolio-list'>
        <li className='about-me__project-item'>
          <a
            href='https://harpica.github.io/hotel-booking/'
            target='_blank'
            rel='noreferrer'
            className='about-me__project-link'
          >
            <p className='about-me__project-name'>Статичный сайт</p>
            <p className='about-me__project-arrow'>&#8599;</p>
          </a>
        </li>
        <li className='about-me__project-item'>
          <a
            href='https://harpica.github.io/russian-travel/'
            target='_blank'
            rel='noreferrer'
            className='about-me__project-link'
          >
            <p className='about-me__project-name'>Адаптивный сайт</p>
            <p className='about-me__project-arrow'>&#8599;</p>
          </a>
        </li>
        <li className='about-me__project-item'>
          <a
            href='https://mesto.harpica.nomoredomains.monster/'
            target='_blank'
            rel='noreferrer'
            className='about-me__project-link'
          >
            <p className='about-me__project-name'>Одностраничное приложение</p>
            <p className='about-me__project-arrow'>&#8599;</p>
          </a>
        </li>
      </ul>
    </div>
  </section>
);

export default AboutMe;
