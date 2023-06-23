import { useState } from 'react';
import movieApi from '../HTTP/MoviesApi';
import { Movie, MovieFromApi, SearchQuery } from '../utils/types';

const useSearchMovies = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getMovies = async (searchQuery: SearchQuery) => {
    setIsLoading(true);
    try {
      const movies = await movieApi.getMovies();
      const filteredMovies = filterMoviesAndAddImageLink(movies, searchQuery);
      if (filteredMovies !== undefined) {
        saveQueryResults(filteredMovies, searchQuery);
      }
      return filteredMovies;
    } catch (err) {
      return Promise.reject(err);
    } finally {
      setIsLoading(false);
    }
  };

  function filterMoviesAndAddImageLink(
    movies: Array<MovieFromApi>,
    searchQuery: SearchQuery
  ) {
    return movies.reduce((prev: Array<Movie>, curr) => {
      if (
        curr.nameRU.toLowerCase().includes(searchQuery.searchValue) === true &&
        ((searchQuery.isShort === true && curr.duration < 40) ||
          searchQuery.isShort !== true)
      ) {
        prev.push({ ...curr, image: curr.image.url, movieId: curr.id });
        return prev;
      }
      return prev;
    }, []);
  }

  function saveQueryResults(movies: Array<Movie>, searchQuery: SearchQuery) {
    window.localStorage.setItem('query', JSON.stringify(searchQuery));
    window.localStorage.setItem('movies', JSON.stringify(movies));
  }

  return { getMovies, isLoading };
};

export default useSearchMovies;
