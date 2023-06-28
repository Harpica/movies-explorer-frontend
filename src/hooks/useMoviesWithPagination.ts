import { useEffect, useState } from 'react';
import { Movie, SavedMovie } from '../@types/types';
import { findCardsGridCongig } from '../utils/utils';
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
    [],
  );
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

    const amoutOfNewMovies = reminder === 0
      ? cardsGridConfig.add
      : cardsGridConfig.add + cardsGridConfig.add - reminder;

    setShowedMovies(
      showedMovies.concat(
        filteredMovies.slice(lastIndex, lastIndex + amoutOfNewMovies),
      ),
    );
    setLastIndex(lastIndex + amoutOfNewMovies);
  }

  useEffect(() => {
    setShowedMovies(filteredMovies.slice(0, cardsGridConfig.init));
  }, [filteredMovies, cardsGridConfig.init]);

  useEffect(() => {
    const updateConfig = getHandleResizeFunction();
    window.addEventListener('resize', updateConfig);
    return () => {
      window.removeEventListener('resize', updateConfig);
    };
  }, []);

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
