import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { CARDS } from '../../utils/constants';

interface MoviesCardListProps {
  type: 'saved' | 'all';
}

const MoviesCardList: React.FC<MoviesCardListProps> = ({ type }) => {
  return (
    <section className='movies-list'>
      <div className='movies-list__container'>
        <ul className='movies-list__list'>
          {CARDS.map((card, i) => {
            if (!card.isSaved && type === 'saved') {
              return;
            }
            return (
              <li className='movies-list__item'>
                <MoviesCard {...card} type={type} />
              </li>
            );
          })}
        </ul>
        {type === 'all' && (
          <button type='button' className='movies-list__load'>
            Еще
          </button>
        )}
      </div>
    </section>
  );
};

export default MoviesCardList;
