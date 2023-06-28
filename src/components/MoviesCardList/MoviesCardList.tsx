import { Movie, SavedMovie, typeOfSavedMovie } from '../../@types/types';
import mainApi from '../../HTTP/MainApi';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

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
  const toggleSaveMovie = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    movie: Movie | SavedMovie
  ) => {
    e.preventDefault();
    try {
      if (typeOfSavedMovie(movie)) {
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
          {movies.map((movie) => {
            if (type === 'saved' && !typeOfSavedMovie(movie)) {
              return '';
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
