import { useEffect, useState } from 'react';
import { Movie, SavedMovie } from '../@types/types';
import { findCardsGridCongig } from '../utils/utils';

const useMoviesPagination = (movies: Array<Movie | SavedMovie>) => {
  const [showedMovies, setShowedMovies] =
    useState<Array<SavedMovie | Movie>>(movies);
  const [cardsGridConfig, setCardsGridConfig] = useState<{
    init: number;
    add: number;
  }>(() => findCardsGridCongig(window.innerWidth));
  const [lastIndex, setLastIndex] = useState(cardsGridConfig.init);
  function getHandleResizeFunction() {
    let timeId: NodeJS.Timeout;
    function updateConfig() {
      clearTimeout(timeId);
      timeId = setTimeout(() => {
        setCardsGridConfig(findCardsGridCongig(window.innerWidth));
      }, 250);
    }
    return updateConfig;
  }

  function getMoreMovies() {
    const reminder = showedMovies.length % cardsGridConfig.add;

    const amoutOfNewMovies =
      reminder === 0
        ? cardsGridConfig.add
        : cardsGridConfig.add + cardsGridConfig.add - reminder;

    setShowedMovies(
      showedMovies.concat(movies.slice(lastIndex, lastIndex + amoutOfNewMovies))
    );
    setLastIndex(lastIndex + amoutOfNewMovies);
  }

  function hasMoreMovies() {
    return movies.length !== 0 && movies.length !== showedMovies.length;
  }

  useEffect(() => {
    setShowedMovies(movies.slice(0, cardsGridConfig.init));
  }, [movies, cardsGridConfig.init]);

  useEffect(() => {
    const updateConfig = getHandleResizeFunction();
    window.addEventListener('resize', updateConfig);
    return () => {
      window.removeEventListener('resize', updateConfig);
    };
  }, []);

  return {
    showedMovies,
    getMoreMovies,
    hasMoreMovies,
  };
};

export default useMoviesPagination;
