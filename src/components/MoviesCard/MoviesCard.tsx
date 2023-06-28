import { Movie, SavedMovie } from '../../@types/types';
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
  toggleSaveMovie: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    movie: Movie | SavedMovie
  ) => void;
}

const MoviesCard: React.FC<MoviesCardProps> = ({
  type,
  toggleSaveMovie,
  ...props
}) => (
  <a
    className={`movies-card ${type === 'saved' && 'movies-card_saved'}`}
    tabIndex={0}
    href={props.trailerLink}
    target='_blank'
    rel='noreferrer'
  >
    <img src={props.image} alt={props.nameRU} className='movies-card__image' />
    <div className='movies-card__container'>
      <div className='movies-card__title-container'>
        <h3 className='movies-card__title'>{props.nameRU}</h3>
        {type === 'all' && (
          <button
            aria-label='Сохранить в избранное'
            type='button'
            className='movies-card__like'
            onClick={(e) => toggleSaveMovie(e, props)}
          >
            <HeartIcon isActive={props.owner !== undefined} />
          </button>
        )}
        {type === 'saved' && (
          <button
            aria-label='Удалить из избранного'
            type='button'
            className='movies-card__delete'
            tabIndex={0}
            onClick={(e) => toggleSaveMovie(e, props)}
          />
        )}
      </div>
      <p className='movies-card__duration'>
        {`${Math.round(props.duration / 60)}ч ${props.duration % 60}м`}
      </p>
    </div>
  </a>
);

export default MoviesCard;
