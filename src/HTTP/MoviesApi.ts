import { MOVIE_API_URL } from '../utils/constants';
import { Movie } from '../utils/types';
import ServerInterface from './Api';

class MovieApi extends ServerInterface {
  constructor(url: string, headers: { [key: string]: string }) {
    super(url, headers);
  }
  getMovies() {
    return this._request<Array<Movie>>(`${this.url}`, {
      method: 'GET',
      headers: this.headers,
    });
  }
}

const movieApi = new MovieApi(MOVIE_API_URL, {
  'Content-Type': 'application/json',
});

export default movieApi;
