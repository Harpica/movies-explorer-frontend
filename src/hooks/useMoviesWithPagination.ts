import { useEffect, useState } from 'react';
import { Movie, SavedMovie } from '../utils/types';
import useMovies from './useMovies';

const useMoviesWithPagination = (movies: Array<Movie | SavedMovie>) => {
  const {
    searchMoviesApi,
    searchMoviesLocal,
    isLoading,
    notificationMessage,
    filteredMovies,
    filterMovies,
  } = useMovies(movies);

  const [showedMovies, setShowedMovies] = useState<Array<SavedMovie | Movie>>(
    []
  );
  const [lastIndex, setLastIndex] = useState(12);

  useEffect(() => {
    setShowedMovies(filteredMovies.slice(0, 12));
  }, [filteredMovies]);

  function getMoreMovies() {
    const amoutOfNewMovies = 3;
    setShowedMovies(
      showedMovies.concat(
        filteredMovies.slice(lastIndex, lastIndex + amoutOfNewMovies)
      )
    );
    setLastIndex(lastIndex + amoutOfNewMovies);
  }

  return {
    searchMoviesApi,
    searchMoviesLocal,
    isLoading,
    notificationMessage,
    filteredMovies,
    filterMovies,
    showedMovies,
    getMoreMovies,
  };
};

export default useMoviesWithPagination;
