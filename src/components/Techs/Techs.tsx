import { TECHS } from '../../utils/constants';
import SectionTitle from '../SectionTitle/SectionTitle';
import './Techs.css';

const Techs = () => (
  <section className='techs' id='techs'>
    <div className='techs__container'>
      <SectionTitle title='Технологии' />
      <h3 className='techs__title'>{`${TECHS.length} технологий`}</h3>
      <p className='techs__description'>
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className='techs__list'>
        {TECHS.map((tech) => (
          <li key={tech} className='techs__tech-item'>
            {tech}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Techs;
