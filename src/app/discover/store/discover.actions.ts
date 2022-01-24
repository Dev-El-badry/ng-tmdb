import {Action} from '@ngrx/store';
import { Movie } from '../movie.model';

export const SET_AVAILABLE_MOVIES  = '[Movies] set available movies';
export const SET_AVAILABLE_MOVIE = '[Movie] set available movie';

export class SetAvailableMovies implements Action {
  readonly type = SET_AVAILABLE_MOVIES;

  constructor(public payload: Movie[]) {}
}

export class SetAvailableMovie implements Action {
  readonly type = SET_AVAILABLE_MOVIE;

  constructor(public payload: Movie) {}
}


export type MovieActions = SetAvailableMovies | SetAvailableMovie;