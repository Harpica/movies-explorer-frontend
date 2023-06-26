import { SERVER_URL } from '../utils/constants';
import { Movie, SavedMovie, User } from '../utils/types';
import ServerInterface from './Api';

class MainApi extends ServerInterface {
  constructor(url: string, headers: { [key: string]: string }) {
    super(url, headers, 'include');
  }

  async registerUser(name: string, email: string, password: string) {
    return this.request<{ user: User }>(`${this.url}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ name: name, email: email, password: password }),
    }).then((data) => data.user);
  }
  async loginUser(email: string, password: string) {
    return this.request<{ user: User }>(`${this.url}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ email: email, password: password }),
    }).then((data) => data.user);
  }
  async logoutUser() {
    return this.request<{ message: string }>(`${this.url}/logout`);
  }
  async getUserData() {
    const request = this.request<{ user: User }>(`${this.url}/users/me`, {
      method: 'GET',
      headers: this.headers,
    }).then((data) => data.user);
    return request;
  }
  async updateUserData(name: string, email: string) {
    const data = await this.request<{ user: User }>(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ name: name, email: email }),
    });
    return data.user;
  }
  async getUserSavedMovies() {
    return this.request<{ movies: Array<SavedMovie> }>(`${this.url}/movies`, {
      method: 'GET',
      headers: this.headers,
    }).then((data) => data.movies);
  }
  async saveMovie(movie: Movie) {
    return this.request<{ movie: SavedMovie }>(`${this.url}/movies`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailerLink: movie.trailerLink,
        thumbnail: movie.thumbnail || movie.trailerLink,
        movieId: movie.movieId,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then((data) => data.movie);
  }
  async deleteMovie(id: string) {
    return this.request<{ deletedMovieId: string }>(
      `${this.url}/movies/${id}`,
      {
        method: 'DELETE',
        headers: this.headers,
      }
    ).then((data) => data.deletedMovieId);
  }
}

const mainApi = new MainApi(SERVER_URL, {
  'Access-Control-Request-Credentials': 'true',
  'Content-Type': 'application/json',
});

export default mainApi;
