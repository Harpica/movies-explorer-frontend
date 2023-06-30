import { useCallback, useEffect, useState } from 'react';
import { Movie, MovieFromApi, SavedMovie } from '../@types/types';
import movieApi from '../HTTP/MoviesApi';
import { NOTIFICATIONS } from '../utils/constants';

const useMoviesApi = (savedMovies: Map<number, SavedMovie>) => {
  const [movies, setMovies] = useState<Array<Movie | SavedMovie>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getMoviesWithLikes = useCallback(
    (allMovies: Array<Movie>) => {
      const moviesWithLikes: Array<Movie | SavedMovie> = allMovies.map(
        (movie) => {
          if (savedMovies.has(movie.movieId)) {
            return savedMovies.get(movie.movieId)!;
          }
          return movie;
        }
      );
      return moviesWithLikes;
    },
    [savedMovies]
  );

  function filterMoviesByValueAndAddImageLink(
    movies: Array<MovieFromApi>,
    searchValue: string
  ) {
    const searchValuelowerCase = searchValue.toLowerCase();
    return movies.reduce((prev: Array<Movie>, curr) => {
      if (curr.nameRU.toLowerCase().includes(searchValuelowerCase)) {
        prev.push({
          ...curr,
          image: `https://api.nomoreparties.co${curr.image.url}`,
          thumbnail: `https://api.nomoreparties.co${curr.image.formats.thumbnail.url}`,
          movieId: curr.id,
        });
        return prev;
      }
      return prev;
    }, []);
  }

  function saveQueryResults(movies: Array<Movie>, searchValue: string) {
    window.localStorage.setItem('searchValue', JSON.stringify(searchValue));
    window.localStorage.setItem('movies', JSON.stringify(movies));
  }

  async function getMovies(searchValue: string) {
    const allMovies = await movieApi.getMovies();
    const filteredMovies = filterMoviesByValueAndAddImageLink(
      allMovies,
      searchValue
    );
    if (filteredMovies !== undefined) {
      saveQueryResults(filteredMovies, searchValue);
    }
    return filteredMovies;
  }

  async function searchMoviesApi(searchValue: string): Promise<{
    status: 'success' | 'failure';
    message: string;
  }> {
    setIsLoading(true);
    try {
      const movies = await getMovies(searchValue);
      setMovies(getMoviesWithLikes(movies));
      return { status: 'success', message: NOTIFICATIONS.success };
    } catch (err) {
      return {
        status: 'failure',
        message: NOTIFICATIONS.serverApiError,
      };
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const storedMoviesString = window.localStorage.getItem('movies');
    if (storedMoviesString !== null) {
      const storedMovies: Array<Movie> = JSON.parse(storedMoviesString);
      setMovies(getMoviesWithLikes(storedMovies));
    }
  }, [getMoviesWithLikes]);

  return { movies, searchMoviesApi, isLoading };
};

export default useMoviesApi;
