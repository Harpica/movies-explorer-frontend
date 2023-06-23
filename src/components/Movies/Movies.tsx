import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { Movie, SavedMovie, SearchQuery } from '../../utils/types';
import React, { useCallback, useEffect, useState } from 'react';
import useSearchMovies from '../../hooks/useSearchMovies';

interface MoviesProps {
  savedMovies: Map<number, SavedMovie>;
  setSavedMovies: React.Dispatch<React.SetStateAction<Map<number, SavedMovie>>>;
}

const Movies: React.FC<MoviesProps> = ({ savedMovies, setSavedMovies }) => {
  const { getMovies, isLoading } = useSearchMovies();
  const [movies, setMovies] = useState<Array<Movie | SavedMovie>>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

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
    try {
      setErrorMessage('');
      const movies = await getMovies(searchQuery);
      setMovies(getMoviesWithLikes(movies));
    } catch (err) {
      setErrorMessage('Что-то пошло не так :С');
    }
  }

  return (
    <div className='movies'>
      <Header type='authorized' />
      <main className='movies__content'>
        <SearchForm
          onSubmit={onSubmitSearchQuery}
          defaultValues={JSON.parse(window.localStorage.getItem('query') || '')}
        />
        {errorMessage !== '' && <p>{errorMessage}</p>}
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            type='all'
            movies={movies}
            setSavedMovies={setSavedMovies}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Movies;
