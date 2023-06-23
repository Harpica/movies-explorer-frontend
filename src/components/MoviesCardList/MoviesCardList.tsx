import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { CARDS } from '../../utils/constants';
import { Movie, SavedMovie, typeOfSavedMovie } from '../../utils/types';
import { useState } from 'react';

interface MoviesCardListProps {
  type: 'saved' | 'all';
  movies: Array<SavedMovie | Movie>;
  setSavedMovies: React.Dispatch<React.SetStateAction<Map<number, SavedMovie>>>;
}

const MoviesCardList: React.FC<MoviesCardListProps> = ({
  type,
  movies,
  setSavedMovies,
}) => {
  const [showedMovies, setShowedMovies] = useState<Array<SavedMovie | Movie>>(
    () => {
      if (type === 'all') {
        return movies.slice(0, 12);
      }
      return movies;
    }
  );
  const [lastIndex, setLastIndex] = useState(12);

  function getMoreMovies() {
    const amoutOfNewMovies = 3;
    setShowedMovies(
      showedMovies.concat(movies.slice(lastIndex, lastIndex + amoutOfNewMovies))
    );
    setLastIndex(lastIndex + amoutOfNewMovies);
  }

  return (
    <section className='movies-list'>
      <div className='movies-list__container'>
        <ul className='movies-list__list'>
          {showedMovies.map((movie, _i) => {
            if (type === 'saved' && !typeOfSavedMovie(movie)) {
              return;
            }
            return (
              <li className='movies-list__item' key={movie.movieId}>
                <MoviesCard {...movie} type={type} />
              </li>
            );
          })}
        </ul>
        {type === 'all' && movies.length !== showedMovies.length && (
          <button
            type='button'
            className='movies-list__load'
            onClick={getMoreMovies}
          >
            Еще
          </button>
        )}
      </div>
    </section>
  );
};

export default MoviesCardList;
