import HeartIcon from '../../svgs/HeartIcon';
import './MoviesCard.css';

interface MoviesCardProps {
  image: string;
  title: string;
  duration: string;
  isSaved: boolean;
  type: 'saved' | 'all';
}

const MoviesCard: React.FC<MoviesCardProps> = ({
  image,
  title,
  duration,
  isSaved,
  type,
}) => {
  return (
    <div className={`movies-card ${type === 'saved' && 'movies-card_saved'}`}>
      <img src={image} alt={title} className='movies-card__image' />
      <div className='movies-card__container'>
        <div className='movies-card__title-container'>
          <h3 className='movies-card__title'>{title}</h3>
          {type === 'all' && (
            <button type='button' className='movies-card__like'>
              <HeartIcon isActive={isSaved} />
            </button>
          )}
          {type === 'saved' && (
            <button type='button' className='movies-card__delete' />
          )}
        </div>
        <p className='movies-card__duration'>{duration}</p>
      </div>
    </div>
  );
};

export default MoviesCard;
