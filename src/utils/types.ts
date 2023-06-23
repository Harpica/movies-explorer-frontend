export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface MovieFromApi {
  id: number;
  country: string;
  director: string;
  duration: number;
  year: string;
  description: string;
  image: {
    url: string;
  };
  trailerLink: string;
  thumbnail: string;
  nameRU: string;
  nameEN: string;
}

export interface Movie extends Omit<MovieFromApi, 'image'> {
  image: string;
  movieId: number;
}

export interface SavedMovie extends Movie {
  _id: string;
  owner: string;
  movieId: number;
}

export function typeOfSavedMovie(movie: Movie | SavedMovie) {
  if ('owner' in movie) {
    return true;
  }
  return false;
}

export interface SearchQuery {
  searchValue: string;
  isShort: boolean;
}

export type SwitchValue = 'true' | 'false';
