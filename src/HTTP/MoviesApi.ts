import { MOVIE_API_URL } from '../utils/constants';
import { MovieFromApi } from '../utils/types';
import ServerInterface from './Api';

class MovieApi extends ServerInterface {
  constructor(url: string, headers: { [key: string]: string }) {
    super(url, headers);
  }

  getMovies() {
    return this.request<Array<MovieFromApi>>(`${this.url}`, {
      method: 'GET',
      headers: this.headers,
    });
  }
}

const movieApi = new MovieApi(MOVIE_API_URL, {
  'Content-Type': 'application/json',
});

export default movieApi;
