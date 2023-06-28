export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface UserCredentials {
  name: string;
  email: string;
  password: string;
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
    formats: {
      thumbnail: {
        url: string;
      };
    };
  };
  trailerLink: string;
  nameRU: string;
  nameEN: string;
}

export interface Movie extends Omit<MovieFromApi, 'image' | 'id'> {
  image: string;
  movieId: number;
  thumbnail: string;
}

export interface SavedMovie extends Omit<Movie, 'id'> {
  _id: string;
  owner: string;
  movieId: number;
}

export function typeOfSavedMovie(
  movie: Movie | SavedMovie
): movie is SavedMovie {
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

export function typeOfApiError(
  err: any
): err is { status: number; message: string } {
  if ('status' in err && 'message' in err) {
    return true;
  }
  return false;
}