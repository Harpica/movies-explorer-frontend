import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SavedMovie } from '../../@types/types';
import mainApi from '../../HTTP/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { DEFAULT_USER, ROUTES } from '../../utils/constants';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import Preloader from '../Preloader/Preloader';
import Profile from '../Profile/Profile';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState(DEFAULT_USER);
  const [isAuth, setIsAuth] = useState<boolean>(currentUser.name !== 'Default');
  const [savedMovies, setSavedMovies] = useState<Map<number, SavedMovie>>(
    new Map<number, SavedMovie>()
  );

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const user = await mainApi.getUserData();
        setCurrentUser(user);
        setIsAuth(true);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (isAuth === true) {
      (async () => {
        try {
          const movies = await mainApi.getUserSavedMovies();
          if (movies.length !== 0) {
            const moviesMap = new Map<number, SavedMovie>();
            movies.forEach((movie) => {
              moviesMap.set(movie.movieId, movie);
            });
            setSavedMovies(moviesMap);
          }
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [isAuth]);

  const logOut = async () => {
    try {
      await mainApi.logoutUser();
      setIsAuth(false);
      setCurrentUser(DEFAULT_USER);
    } catch (err) {
      console.log(err);
    }
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path={ROUTES.main} element={<Main />} />
          <Route
            path={ROUTES.signup}
            element={
              <ProtectedRouteElement
                statement={!isAuth}
                redirect={ROUTES.movies}
              >
                <Register
                  setIsAuth={setIsAuth}
                  setCurrentUser={setCurrentUser}
                />
              </ProtectedRouteElement>
            }
          />
          <Route
            path={ROUTES.signin}
            element={
              <ProtectedRouteElement
                statement={!isAuth}
                redirect={ROUTES.movies}
              >
                <Login setIsAuth={setIsAuth} setCurrentUser={setCurrentUser} />
              </ProtectedRouteElement>
            }
          />
          <Route
            path={ROUTES.movies}
            element={
              <ProtectedRouteElement statement={isAuth} redirect={ROUTES.main}>
                <Movies
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}
                />
              </ProtectedRouteElement>
            }
          />
          <Route
            path={ROUTES.savedMovies}
            element={
              <ProtectedRouteElement statement={isAuth} redirect={ROUTES.main}>
                <SavedMovies
                  savedMoviesArray={Array.from(savedMovies.values())}
                  setSavedMovies={setSavedMovies}
                />
              </ProtectedRouteElement>
            }
          />
          <Route
            path={ROUTES.profile}
            element={
              <ProtectedRouteElement statement={isAuth} redirect={ROUTES.main}>
                <Profile logOut={logOut} setCurrentUser={setCurrentUser} />
              </ProtectedRouteElement>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
