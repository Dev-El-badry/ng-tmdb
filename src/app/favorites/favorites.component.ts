import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from '../discover/movie.model';
import { FavoritesService } from './favorites.service';
import * as fromFavorite from './store/favorites.reducer';
import * as fromRoot from '../app.reducer';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  movies: Movie[] = [];
  isLoading$: Observable<boolean>;

  constructor(
    private store: Store<fromFavorite.State>,
    private favService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.getItems();
    this.favService.getFavMovies();
  }

  getItems() {
    this.store.select(fromFavorite.getFavMovies).subscribe((movies) => {
      if (movies.length) this.movies = movies;
    });
  }
}
