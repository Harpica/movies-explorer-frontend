import SectionTitle from '../SectionTitle/SectionTitle';
import './AboutProject.css';

const AboutProject = () => (
  <section className='about-project' id='about-project'>
    <div className='about-project__container'>
      <SectionTitle title='О проекте' />
      <ul className='about-project__description-list'>
        <li className='about-project__description-item'>
          <h3 className='about-project__description-title'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about-project__description'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className='about-project__description-item'>
          <h3 className='about-project__description-title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about-project__description'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className='about-project__diagram'>
        <li className='about-project__diagram-section'>
          <p className='about-project__diagram-time about-project__diagram-time_color_black'>
            1 неделя
          </p>
          <p className='about-project__diagram-description'>Back-end</p>
        </li>
        <li className='about-project__diagram-section'>
          <p className='about-project__diagram-time about-project__diagram-time_color_gray'>
            4 недели
          </p>
          <p className='about-project__diagram-description'>Front-end</p>
        </li>
      </ul>
    </div>
  </section>
);

export default AboutProject;
