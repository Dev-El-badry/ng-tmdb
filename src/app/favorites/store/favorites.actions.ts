import { Action } from '@ngrx/store';
import { Movie } from '../../discover/movie.model';

export const SET_FAV_MOVIES = '[Favorites] set favorite movies';
export const DEL_FAV_MOVIE = '[Favorites] delete favorite movie';

export class SetFavMovies implements Action {
  readonly type = SET_FAV_MOVIES;

  constructor(public payload: Movie[]) {}
}

export class DelFavMovie implements Action {
  readonly type = DEL_FAV_MOVIE;

  constructor(public payload: number) {}
}

export type FavoriteActions = SetFavMovies | DelFavMovie;
