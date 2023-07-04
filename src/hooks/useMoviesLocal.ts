import { useEffect, useState, useCallback } from 'react';
import { Movie, SavedMovie } from '../@types/types';
import { NOTIFICATIONS } from '../utils/constants';

const useMoviesLocal = (
  allMovies: Array<Movie | SavedMovie>,
  searchValue: string
) => {
  const [movies, setMovies] = useState<Array<Movie | SavedMovie>>(allMovies);

  const searchMoviesLocal = useCallback(
    (searchValue: string) => {
      const filteredMovies = movies.filter((movie) =>
        movie.nameRU.includes(searchValue)
      );
      setMovies(filteredMovies);
      if (filteredMovies.length === 0) {
        return {
          status: 'failure',
          message: NOTIFICATIONS.notFound,
        };
      }
      return {
        status: 'success',
        message: NOTIFICATIONS.success,
      };
    },
    [movies]
  );

  useEffect(() => {
    if (searchValue !== '') {
      searchMoviesLocal(searchValue);
      return;
    }
    setMovies(allMovies);
  }, [allMovies, searchValue, searchMoviesLocal]);

  return { movies, searchMoviesLocal };
};

export default useMoviesLocal;
