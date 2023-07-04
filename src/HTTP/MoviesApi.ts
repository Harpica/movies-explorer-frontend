import { MovieFromApi } from '../@types/types';
import { MOVIE_API_URL } from '../utils/constants';
import ServerInterface from './Api';

class MovieApi extends ServerInterface {
  static instance: MovieApi;

  private constructor(url: string, headers: { [key: string]: string }) {
    super(url, headers);
  }

  static getInstance() {
    if (!MovieApi.instance) {
      MovieApi.instance = new MovieApi(MOVIE_API_URL, {
        'Content-Type': 'application/json',
      });
    }
    return MovieApi.instance;
  }

  getMovies() {
    return this.request<Array<MovieFromApi>>(`${this.url}`, {
      method: 'GET',
      headers: this.headers,
    });
  }
}

const movieApi = MovieApi.getInstance();

export default movieApi;
