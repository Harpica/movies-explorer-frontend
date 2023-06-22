import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';
import { DEFAULT_USER, ROUTES } from '../../utils/constants';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useState } from 'react';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = useState(DEFAULT_USER);
  // const [isAuth, setIsAuth] = useState<boolean>(currentUser.name !== 'Default');
  const [isAuth, setIsAuth] = useState<boolean>(true);

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path={ROUTES.main} element={<Main />} />
          <Route path={ROUTES.signup} element={<Register />} />
          <Route path={ROUTES.signin} element={<Login />} />
          <Route
            path={ROUTES.movies}
            element={
              <ProtectedRouteElement statement={isAuth} redirect={ROUTES.main}>
                <Movies />
              </ProtectedRouteElement>
            }
          />
          <Route
            path={ROUTES.savedMovies}
            element={
              <ProtectedRouteElement statement={isAuth} redirect={ROUTES.main}>
                <SavedMovies />
              </ProtectedRouteElement>
            }
          />
          <Route
            path={ROUTES.profile}
            element={
              <ProtectedRouteElement statement={isAuth} redirect={ROUTES.main}>
                <Profile />
              </ProtectedRouteElement>
            }
          />
          <Route path={'*'} element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
