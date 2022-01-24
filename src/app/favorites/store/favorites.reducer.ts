import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Movie } from '../../discover/movie.model';
import {
  FavoriteActions,
  SET_FAV_MOVIES,
  DEL_FAV_MOVIE,
} from './favorites.actions';
import * as fromRoot from '../../app.reducer';

export interface FavoriteState {
  favoriteMovies: Movie[];
}

export interface State extends fromRoot.State {
  favorites: FavoriteState;
}

const initialState: FavoriteState = {
  favoriteMovies: [],
};

export function favoriteReducer(state = initialState, action: FavoriteActions) {
  switch (action.type) {
    case SET_FAV_MOVIES:
      return {
        ...state,
        favoriteMovies: action.payload,
      };
    case DEL_FAV_MOVIE:
      const index = state.favoriteMovies.indexOf(
        state.favoriteMovies.find((el) => el.id === action.payload)
      );
      const newData = [...state.favoriteMovies];

      newData.splice(index, 1);
      return {
        ...state,
        favoriteMovies: newData,
      };

    default:
      return state;
  }
}

export const getMovieState = createFeatureSelector<FavoriteState>('favorites');

export const getFavMovies = createSelector(
  getMovieState,
  (state: FavoriteState) => state.favoriteMovies
);
