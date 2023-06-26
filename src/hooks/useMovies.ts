import { useEffect, useState } from 'react';
import { Movie, SavedMovie, SearchQuery } from '../utils/types';
import useSearchMovies from './useSearchMovies';

const useMovies = (movies: Array<Movie | SavedMovie>) => {
  const { searchMoviesApi, searchMoviesLocal, isLoading, notificationMessage } =
    useSearchMovies();
  const [filteredMovies, setFilteredMovies] =
    useState<Array<Movie | SavedMovie>>(movies);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  function filterMovies(searchQuery: SearchQuery) {
    setFilteredMovies(searchMoviesLocal(movies, searchQuery));
  }

  return {
    searchMoviesApi,
    searchMoviesLocal,
    isLoading,
    notificationMessage,
    filteredMovies,
    filterMovies,
  };
};

export default useMovies;
