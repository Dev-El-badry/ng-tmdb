import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from './movie.model';
import * as fromDiscover from './store/discover.reducer';
import * as fromRoot from '../app.reducer';
import { DiscoverService } from './discover.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscoverComponent implements OnInit {
  movies: Movie[];
  isLoading$: Observable<boolean>;

  constructor(
    private store: Store<fromDiscover.State>,
    private discoverService: DiscoverService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.getItems();
    this.discoverService.getMovies();
  }

  getItems() {
    this.store.select(fromDiscover.getAvailableMovies).subscribe(movies => {
      if(movies.length)
        this.movies = movies;
    });
  }

}
