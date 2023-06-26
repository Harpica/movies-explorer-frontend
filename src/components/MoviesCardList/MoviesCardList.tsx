import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { Movie, SavedMovie, typeOfSavedMovie } from '../../utils/types';
import mainApi from '../../HTTP/MainApi';

interface MoviesCardListProps {
  type: 'saved' | 'all';
  movies: Array<SavedMovie | Movie>;
  setSavedMovies: React.Dispatch<React.SetStateAction<Map<number, SavedMovie>>>;
  getMoreMoviesButton?: React.ReactElement;
}

const MoviesCardList: React.FC<MoviesCardListProps> = ({
  type,
  movies,
  setSavedMovies,
  getMoreMoviesButton,
}) => {
  const toggleSaveMovie = async (movie: Movie | SavedMovie) => {
    try {
      if (typeOfSavedMovie(movie) === true) {
        await mainApi.deleteMovie((movie as SavedMovie)._id);
        setSavedMovies((s) => {
          s.delete(movie.movieId);
          return new Map(s);
        });
      } else {
        const newMovie = await mainApi.saveMovie(movie);
        setSavedMovies((s) => new Map(s.set(newMovie.movieId, newMovie)));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className='movies-list'>
      <div className='movies-list__container'>
        <ul className='movies-list__list'>
          {movies.map((movie, _i) => {
            if (type === 'saved' && !typeOfSavedMovie(movie)) {
              return <></>;
            }
            return (
              <li className='movies-list__item' key={movie.movieId}>
                <MoviesCard
                  {...movie}
                  type={type}
                  toggleSaveMovie={toggleSaveMovie}
                />
              </li>
            );
          })}
        </ul>
        {type === 'all' && getMoreMoviesButton}
      </div>
    </section>
  );
};

export default MoviesCardList;
