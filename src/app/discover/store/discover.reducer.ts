import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Movie } from "../movie.model";
import { MovieActions, SET_AVAILABLE_MOVIE, SET_AVAILABLE_MOVIES } from "./discover.actions";
import * as fromRoot from '../../app.reducer';
export interface MovieState {
  availableMovies: Movie[];
  availableMovie: Movie;
}

export interface State extends fromRoot.State {
  movies: MovieState;
}

const initialState: MovieState = {
  availableMovies: [],
  availableMovie: null
};

export function movieReducer (state = initialState, action: MovieActions) {
  switch(action.type) {
    case SET_AVAILABLE_MOVIES:
      return {
        ...state,
        availableMovies: action.payload
      };
    case SET_AVAILABLE_MOVIE:
      return {
        ...state,
        availableMovie: action.payload
      };
    default:
      return state;
  }
}

export const getMovieState = createFeatureSelector<MovieState>('discover');

export const getAvailableMovies = createSelector(getMovieState, (state: MovieState) => state.availableMovies);
export const getAvailableMovie = createSelector(getMovieState, (state: MovieState) => state.availableMovie);