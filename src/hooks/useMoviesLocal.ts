import { useCallback, useEffect, useState } from 'react';
import { Movie, SavedMovie } from '../@types/types';

const useMoviesLocal = (
  allMovies: Array<Movie | SavedMovie>,
  searchValue: string
) => {
  const [movies, setMovies] = useState<Array<Movie | SavedMovie>>(allMovies);
  const [filterValue, setFilterValue] = useState();

  function searchMoviesLocal(searchValue: string) {
    const filteredMovies = movies.filter((movie) =>
      movie.nameRU.includes(searchValue)
    );
    setMovies(filteredMovies);
  }

  useEffect(() => {
    console.log('useMoviesLocal');
    if (searchValue !== '') {
      searchMoviesLocal(searchValue);
      return;
    }
    setMovies(allMovies);
  }, [allMovies, searchValue]);

  return { movies, searchMoviesLocal };
};

export default useMoviesLocal;
