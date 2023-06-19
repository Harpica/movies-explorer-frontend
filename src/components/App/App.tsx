import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';
import { ROUTES } from '../../utils/constants';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.main} element={<Main />} />
        <Route path={ROUTES.movies} element={<Movies />} />
        <Route path={ROUTES.savedMovies} element={<SavedMovies />} />
        <Route path={ROUTES.profile} element={<Profile />} />
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
