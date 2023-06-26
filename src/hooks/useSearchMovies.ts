import { useState } from 'react';
import movieApi from '../HTTP/MoviesApi';
import { Movie, MovieFromApi, SavedMovie, SearchQuery } from '../utils/types';

const useSearchMovies = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>('');

  async function getMovies(searchQuery: SearchQuery) {
    const movies = await movieApi.getMovies();
    const filteredMovies = filterMoviesAndAddImageLink(movies, searchQuery);
    if (filteredMovies !== undefined) {
      saveQueryResults(filteredMovies, searchQuery);
    }
    return filteredMovies;
  }

  function filterMoviesAndAddImageLink(
    movies: Array<MovieFromApi>,
    searchQuery: SearchQuery
  ) {
    const searchValuelowerCase = searchQuery.searchValue.toLowerCase();
    return movies.reduce((prev: Array<Movie>, curr) => {
      if (
        curr.nameRU.toLowerCase().includes(searchValuelowerCase) === true &&
        ((searchQuery.isShort === true && curr.duration < 40) ||
          searchQuery.isShort !== true)
      ) {
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

  function saveQueryResults(movies: Array<Movie>, searchQuery: SearchQuery) {
    window.localStorage.setItem('query', JSON.stringify(searchQuery));
    window.localStorage.setItem('movies', JSON.stringify(movies));
  }

  function filterMovies(
    movies: Array<Movie | SavedMovie>,
    searchQuery: SearchQuery
  ) {
    return movies.filter((movie) => {
      return (
        movie.nameRU
          .toLowerCase()
          .includes(searchQuery.searchValue.toLowerCase()) === true &&
        ((searchQuery.isShort === true && movie.duration < 40) ||
          searchQuery.isShort !== true)
      );
    });
  }

  async function searchMoviesApi(searchQuery: SearchQuery) {
    setIsLoading(true);
    try {
      setNotificationMessage('');
      const movies = await getMovies(searchQuery);
      if (movies.length === 0) {
        setNotificationMessage('Ничего не найдено');
      }
      return movies;
    } catch (err) {
      setNotificationMessage('Что-то пошло не так :С');
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  function searchMoviesLocal(
    movies: Array<Movie | SavedMovie>,
    searchQuery: SearchQuery
  ) {
    const filteredMovies = filterMovies(movies, searchQuery);
    if (filteredMovies.length === 0) {
      setNotificationMessage('Ничего не найдено');
    } else {
      setNotificationMessage('');
    }
    return filteredMovies;
  }

  return {
    searchMoviesApi,
    searchMoviesLocal,
    isLoading,
    notificationMessage,
  };
};

export default useSearchMovies;
