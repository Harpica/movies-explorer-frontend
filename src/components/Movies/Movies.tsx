import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { Movie, SavedMovie, SearchQuery } from '../../utils/types';
import React, { useCallback, useEffect, useState } from 'react';
import Notification from '../Notification/Notification';
import useMoviesWithPagination from '../../hooks/useMoviesWithPagination';

interface MoviesProps {
  savedMovies: Map<number, SavedMovie>;
  setSavedMovies: React.Dispatch<React.SetStateAction<Map<number, SavedMovie>>>;
}

const Movies: React.FC<MoviesProps> = ({ savedMovies, setSavedMovies }) => {
  const [movies, setMovies] = useState<Array<Movie | SavedMovie>>([]);
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
    (movies: Array<Movie>) => {
      const moviesWithLikes: Array<Movie | SavedMovie> = movies.map((movie) => {
        if (savedMovies.has(movie.movieId)) {
          return savedMovies.get(movie.movieId)!;
        }
        return movie;
      });
      return moviesWithLikes;
    },
    [savedMovies]
  );

  useEffect(() => {
    const storedMovies = window.localStorage.getItem('movies');
    if (storedMovies !== null) {
      const movies: Array<Movie> = JSON.parse(storedMovies);
      setMovies(getMoviesWithLikes(movies));
    }
  }, [getMoviesWithLikes]);

  async function onSubmitSearchQuery(searchQuery: SearchQuery) {
    const newMovies = await searchMoviesApi(searchQuery);
    if (newMovies !== null) {
      setMovies(getMoviesWithLikes(newMovies));
    }
  }

  return (
    <div className='movies'>
      <Header type='authorized' />
      <main className='movies__content'>
        <SearchForm
          onSubmit={onSubmitSearchQuery}
          onSwitcherChange={filterMovies}
          defaultValues={JSON.parse(window.localStorage.getItem('query') || '')}
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
              <React.Fragment>
                {filteredMovies.length !== 0 &&
                  filteredMovies.length !== showedMovies.length && (
                    <button
                      type='button'
                      className='movies-list__load'
                      onClick={getMoreMovies}
                    >
                      Еще
                    </button>
                  )}
              </React.Fragment>
            }
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Movies;
