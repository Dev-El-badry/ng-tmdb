import { Action } from '@ngrx/store';
import { Movie } from '../movie.model';
import { Review } from '../review.model';

export const SET_AVAILABLE_MOVIES = '[Movies] set available movies';
export const SET_AVAILABLE_MOVIE = '[Movie] set available movie';

export const SET_REVIEWS = '[Reviews] set reviews movie';

export class SetAvailableMovies implements Action {
  readonly type = SET_AVAILABLE_MOVIES;

  constructor(public payload: Movie[]) {}
}

export class SetAvailableMovie implements Action {
  readonly type = SET_AVAILABLE_MOVIE;

  constructor(public payload: Movie) {}
}

export class SetReviewsMovie implements Action {
  readonly type = SET_REVIEWS;

  constructor(public payload: Review[]) {}
}

export type MovieActions =
  | SetAvailableMovies
  | SetAvailableMovie
  | SetReviewsMovie;
