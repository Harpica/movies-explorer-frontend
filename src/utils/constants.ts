import { User } from '../@types/types';

export const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';

export const MOVIE_API_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const ROUTES = {
  main: '/',
  movies: '/movies',
  savedMovies: '/saved-movies',
  profile: '/profile',
  signin: '/signin',
  signup: '/signup',
};

export const TECHS = [
  'HTML',
  'CSS',
  'JS',
  'React',
  'Git',
  'Express.js',
  'mongoDB',
];

export const DEFAULT_USER: User = {
  _id: '0',
  name: 'Default',
  email: 'email@email.com',
};
