import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
  NgZone,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from './movie.model';
import * as fromDiscover from './store/discover.reducer';
import * as fromRoot from '../app.reducer';
import { DiscoverService } from './discover.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { map, pairwise, filter, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscoverComponent implements OnInit, AfterViewInit {
  movies$: Observable<Movie[]>;
  isLoading$: Observable<boolean>;
  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;
  page: number = 1;

  constructor(
    private store: Store<fromDiscover.State>,
    private discoverService: DiscoverService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.getItems();
    this.discoverService.getMovies();
  }

  ngAfterViewInit(): void {
    this.scroller
      .elementScrolled()
      .pipe(
        map(() => this.scroller.measureScrollOffset('bottom')),
        pairwise(),
        filter(([y1, y2]) => y2 < y1 && y2 < 140),
        throttleTime(200)
      )
      .subscribe(() => {
        this.ngZone.run(() => {
          this.page += 1;
          this.discoverService.getMovies(this.page);
        });
      });
  }

  getItems() {
    this.movies$ = this.store.select(fromDiscover.getAvailableMovies);
  }
}
