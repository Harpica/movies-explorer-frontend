import { SERVER_URL } from '../utils/constants';
import { Movie, SavedMovie, User } from '../utils/types';
import ServerInterface from './Api';

class MainApi extends ServerInterface {
  constructor(url: string, headers: { [key: string]: string }) {
    super(url, headers);
  }

  registerUser(name: string, email: string, password: string) {
    return this._request<User>(`${this.url}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ name: name, email: email, password: password }),
    });
  }
  loginUser(email: string, password: string) {
    return this._request<User>(`${this.url}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ email: email, password: password }),
    });
  }
  logoutUser() {
    return this._request<{ message: string }>(`${this.url}/logout`);
  }
  getUserData() {
    const request = this._request<User>(`${this.url}/users/me`, {
      method: 'GET',
      headers: this.headers,
    });
    return request;
  }
  updateUserData(name: string, email: string) {
    return this._request<User>(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ name: name, email: email }),
    });
  }
  getUserSavedMovies() {
    return this._request<Array<SavedMovie>>(`${this.url}/movies`, {
      method: 'GET',
      headers: this.headers,
    });
  }
  saveMovie(movie: Movie, userId: string) {
    return this._request<SavedMovie>(`${this.url}/movies`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ ...movie, owner: userId }),
    });
  }
  deleteMovie(movieId: string) {
    return this._request<SavedMovie>(`${this.url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this.headers,
    });
  }
}

const mainApi = new MainApi(SERVER_URL, {
  'Access-Control-Request-Credentials': 'true',
  'Content-Type': 'application/json',
});

export default mainApi;
