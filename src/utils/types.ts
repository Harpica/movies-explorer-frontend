export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Movie {
  _id: string;
  country: string;
  director: string;
  duration: number;
  year: string;
  description: string;
  image: string;
  trailerLink: string;
  thumbnail: string;
  movieId: number;
  nameRU: string;
  nameEN: string;
}

export interface SavedMovie extends Movie {
  owner: string;
}
