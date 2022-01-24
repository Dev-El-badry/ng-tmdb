import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { environment } from "src/environments/environment";

import * as fromDiscover from './store/discover.reducer';
import * as Discover from './store/discover.actions';
import * as UI from '../core/ui/store/ui.actions';
import { Movie } from "./movie.model";

interface MovieModel {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root'
})
export class DiscoverService {
  private _root = environment.baseUrl;
  private _token = environment.apiToken;

  constructor(
    private http: HttpClient,
    private store: Store<fromDiscover.State>
  ) {}

  getMovies() {
    this.store.dispatch(new UI.StartLoading());
    this.http.get<MovieModel>(`${this._root}movie/top_rated?api_key=${this._token}`)
      .subscribe(movieModel => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Discover.SetAvailableMovies(movieModel.results));
      });
  }
}