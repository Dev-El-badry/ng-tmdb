import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as fromFav from './store/favorites.reducer';
import * as Fav from './store/favorites.actions';
import * as UI from '../core/ui/store/ui.actions';
import { MovieModel } from '../discover/discover.service';
import { UiService } from '../core/ui/ui.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private _root = environment.baseUrl;
  private _token = environment.apiToken;
  private _session = environment.session;

  constructor(
    private http: HttpClient,
    private store: Store<fromFav.State>,
    private uiService: UiService
  ) {}

  addToFavorite(id: number) {
    const body = JSON.stringify({
      media_type: 'movie',
      media_id: id,
      favorite: true,
    });
    return this.http.post<{ status_message: string; status_code: number }>(
      `${this._root}account/elbadry/favorite?api_key=${this._token}&session_id=${this._session}`,
      body,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      }
    );
  }

  getFavMovies() {
    this.store.dispatch(new UI.StartLoading());
    this.http
      .get<MovieModel>(
        `${this._root}account/elbadry/favorite/movies?api_key=${this._token}&session_id=${this._session}`
      )
      .subscribe((movieModel) => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Fav.SetFavMovies(movieModel.results));
      });
  }

  deleteFavMove(movieId: number) {
    const body = JSON.stringify({
      media_type: 'movie',
      media_id: movieId,
      favorite: false,
    });
    return this.http
      .post<{ status_message: string; status_code: number }>(
        `${this._root}account/elbadry/favorite?api_key=${this._token}&session_id=${this._session}`,
        body,
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
        }
      )
      .subscribe(
        (result) => {
          this.uiService.snackbar(result.status_message, 'OKAY');
          this.store.dispatch(new Fav.DelFavMovie(movieId));
        },
        (err) => {
          this.uiService.snackbar('Something went wrong', 'CLOSED');
        }
      );
  }
}
