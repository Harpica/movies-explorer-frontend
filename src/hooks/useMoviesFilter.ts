import { useEffect, useState, useCallback, useRef } from 'react';
import { Movie, SavedMovie } from '../@types/types';
import { IS_SHORT_DURATION } from '../utils/constants';

const useMoviesFilter = (
  movies: Array<Movie | SavedMovie>,
  isShortInit: boolean
) => {
  const [filteredMovies, setFilteredMovies] =
    useState<Array<Movie | SavedMovie>>(movies);

  const isShortFilter = useRef<boolean>(isShortInit);

  const filterMoviesByDuration = useCallback(
    (isShort: boolean) => {
      isShortFilter.current = isShort;
      setFilteredMovies(
        movies.filter(
          (movie) =>
            (isShort && movie.duration <= IS_SHORT_DURATION) || !isShort
        )
      );
    },
    [movies]
  );

  useEffect(() => {
    filterMoviesByDuration(isShortFilter.current);
  }, [movies, filterMoviesByDuration, isShortFilter]);

  return { filterMoviesByDuration, filteredMovies };
};

export default useMoviesFilter;
