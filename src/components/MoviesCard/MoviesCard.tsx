import HeartIcon from '../../svgs/HeartIcon';
import { Movie, SavedMovie } from '../../utils/types';
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
  toggleSaveMovie: (movie: Movie | SavedMovie) => void;
}

const MoviesCard: React.FC<MoviesCardProps> = ({
  type,
  toggleSaveMovie,
  ...props
}) => {
  return (
    <a
      className={`movies-card ${type === 'saved' && 'movies-card_saved'}`}
      tabIndex={0}
      href={props.trailerLink}
      target='_blank'
      rel='noreferrer'
    >
      <img
        src={props.image}
        alt={props.nameRU}
        className='movies-card__image'
      />
      <div className='movies-card__container'>
        <div className='movies-card__title-container'>
          <h3 className='movies-card__title'>{props.nameRU}</h3>
          {type === 'all' && (
            <button
              type='button'
              className='movies-card__like'
              onClick={() => toggleSaveMovie(props)}
            >
              <HeartIcon isActive={props.owner !== undefined} />
            </button>
          )}
          {type === 'saved' && (
            <button
              type='button'
              className='movies-card__delete'
              tabIndex={0}
              onClick={() => toggleSaveMovie(props)}
            />
          )}
        </div>
        <p className='movies-card__duration'>{props.duration}</p>
      </div>
    </a>
  );
};

export default MoviesCard;
