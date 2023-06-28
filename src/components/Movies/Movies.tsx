import React, { useCallback, useEffect, useState } from 'react';
import { Movie, SavedMovie, SearchQuery } from '../../@types/types';
import useMoviesWithPagination from '../../hooks/useMoviesWithPagination';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Notification from '../Notification/Notification';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

interface MoviesProps {
  savedMovies: Map<number, SavedMovie>;
  setSavedMovies: React.Dispatch<React.SetStateAction<Map<number, SavedMovie>>>;
}

const Movies: React.FC<MoviesProps> = ({ savedMovies, setSavedMovies }) => {
  const [movies, setMovies] = useState<Array<Movie | SavedMovie>>([]);
  const [defaultValues, setDefaultValues] = useState<{
    [key: string]: string;
  }>({});

  const {
    searchMoviesApi,
    isLoading,
    notificationMessage,
    filteredMovies,
    filterMovies,
    showedMovies,
    getMoreMovies,
  } = useMoviesWithPagination(movies);

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

  useEffect(() => {
    const storedMoviesString = window.localStorage.getItem('movies');
    const queryString = window.localStorage.getItem('query');
    if (storedMoviesString !== null && queryString !== null) {
      const storedMovies: Array<Movie> = JSON.parse(storedMoviesString);
      const query: { [key: string]: string } = JSON.parse(queryString);
      setMovies(getMoviesWithLikes(storedMovies));
      setDefaultValues(query);
    }
  }, [getMoviesWithLikes]);

  const onSubmitSearchQuery = useCallback(
    async (searchQuery: SearchQuery) => {
      const newMovies = await searchMoviesApi(searchQuery);
      if (newMovies !== null) {
        setMovies(getMoviesWithLikes(newMovies));
      }
    },
    [getMoviesWithLikes, searchMoviesApi]
  );

  return (
    <div className='movies'>
      <Header type='authorized' />
      <main className='movies__content'>
        <SearchForm
          onSubmit={onSubmitSearchQuery}
          onSwitcherChange={filterMovies}
          defaultValues={defaultValues}
        />
        <Notification message={notificationMessage} />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            type='all'
            movies={showedMovies}
            setSavedMovies={setSavedMovies}
            getMoreMoviesButton={
              <button
                type='button'
                className={`movies-list__load ${
                  filteredMovies.length !== 0 &&
                  filteredMovies.length !== showedMovies.length
                    ? ''
                    : 'movies-list__load_hide'
                }`}
                onClick={getMoreMovies}
              >
                Еще
              </button>
            }
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Movies;
