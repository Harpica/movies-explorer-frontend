import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';
import { ROUTES } from '../../utils/constants';
import Movies from '../Movies/Movies';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.main} element={<Main />} />
        <Route path={ROUTES.movies} element={<Movies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
