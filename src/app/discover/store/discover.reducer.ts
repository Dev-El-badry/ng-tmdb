import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Movie } from '../movie.model';
import {
  MovieActions,
  SET_AVAILABLE_MOVIE,
  SET_AVAILABLE_MOVIES,
  SET_REVIEWS,
} from './discover.actions';
import * as fromRoot from '../../app.reducer';
import { Review } from '../review.model';
export interface MovieState {
  availableMovies: Movie[];
  availableMovie: Movie;
  reviews: Review[];
}

export interface State extends fromRoot.State {
  movies: MovieState;
}

const initialState: MovieState = {
  availableMovies: [],
  availableMovie: null,
  reviews: [],
};

export function movieReducer(state = initialState, action: MovieActions) {
  switch (action.type) {
    case SET_AVAILABLE_MOVIES:
      const data = [...state.availableMovies].concat(action.payload);

      return {
        ...state,
        availableMovies: data,
      };
    case SET_AVAILABLE_MOVIE:
      return {
        ...state,
        availableMovie: action.payload,
      };
    case SET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    default:
      return state;
  }
}

export const getMovieState = createFeatureSelector<MovieState>('discover');

export const getAvailableMovies = createSelector(
  getMovieState,
  (state: MovieState) => state.availableMovies
);
export const getAvailableMovie = createSelector(
  getMovieState,
  (state: MovieState) => state.availableMovie
);

export const getReviews = createSelector(
  getMovieState,
  (state: MovieState) => state.reviews
);
