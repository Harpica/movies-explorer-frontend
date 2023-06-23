import HeartIcon from '../../svgs/HeartIcon';
import './MoviesCard.css';

interface MoviesCardProps {
  country: string;
  director: string;
  duration: number;
  year: string;
  description: string;
  image: string;
  trailerLink: string;
  thumbnail: string;
  movieId: number;
  nameRU: string;
  nameEN: string;
  _id?: string;
  owner?: string;
  type: 'saved' | 'all';
}

const MoviesCard: React.FC<MoviesCardProps> = ({
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  thumbnail,
  movieId,
  nameRU,
  nameEN,
  _id,
  owner,
  type,
}) => {
  return (
    <div
      className={`movies-card ${type === 'saved' && 'movies-card_saved'}`}
      tabIndex={0}
    >
      <img
        src={`https://api.nomoreparties.co/${image}`}
        alt={nameRU}
        className='movies-card__image'
      />
      <div className='movies-card__container'>
        <div className='movies-card__title-container'>
          <h3 className='movies-card__title'>{nameRU}</h3>
          {type === 'all' && (
            <button type='button' className='movies-card__like'>
              <HeartIcon isActive={owner !== undefined} />
            </button>
          )}
          {type === 'saved' && (
            <button
              type='button'
              className='movies-card__delete'
              tabIndex={0}
            />
          )}
        </div>
        <p className='movies-card__duration'>{duration}</p>
      </div>
    </div>
  );
};

export default MoviesCard;
