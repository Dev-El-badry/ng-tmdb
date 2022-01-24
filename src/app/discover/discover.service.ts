import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import * as fromDiscover from './store/discover.reducer';
import * as Discover from './store/discover.actions';
import * as UI from '../core/ui/store/ui.actions';
import { Movie } from './movie.model';
import { Review } from './review.model';

export interface MovieModel {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface ReviewModel {
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root',
})
export class DiscoverService {
  private _root = environment.baseUrl;
  private _token = environment.apiToken;
  private _session = environment.session;

  constructor(
    private http: HttpClient,
    private store: Store<fromDiscover.State>
  ) {}

  getMovies(page = 1) {
    this.store.dispatch(new UI.StartLoading());
    this.http
      .get<MovieModel>(
        `${this._root}movie/top_rated?api_key=${this._token}&page=${page}`
      )
      .subscribe((movieModel) => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(
          new Discover.SetAvailableMovies(movieModel.results)
        );
      });
  }

  getMovie(movieId: number) {
    this.store.dispatch(new UI.StartLoading());
    this.http
      .get<Movie>(`${this._root}movie/${movieId}?api_key=${this._token}`)
      .subscribe((movieModel) => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Discover.SetAvailableMovie(movieModel));
      });
  }

  getReviews(movieId: number) {
    this.http
      .get<ReviewModel>(
        `${this._root}movie/${movieId}/reviews?api_key=${this._token}`
      )
      .subscribe((reviewModel) => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Discover.SetReviewsMovie(reviewModel.results));
      });
  }

  addRate(movieId: number, rate: number) {
    if (isNaN(rate)) return;

    const body = JSON.stringify({
      value: rate,
    });
    return this.http.post<{ status_message: string; status_code: number }>(
      `${this._root}movie/${movieId}/rating?api_key=${this._token}&session_id=${this._session}`,
      body,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }
    );
  }
}
