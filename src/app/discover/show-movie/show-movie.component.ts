import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DiscoverService } from '../discover.service';
import { Movie } from '../movie.model';
import { Review } from '../review.model';
import * as fromDiscover from '../store/discover.reducer';

@Component({
  selector: 'app-show-movie',
  templateUrl: './show-movie.component.html',
  styleUrls: ['./show-movie.component.scss'],
})
export class ShowMovieComponent implements OnInit {
  movie: Movie;
  movieId: number;
  reviews: Review[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private discoverService: DiscoverService,
    private store: Store<fromDiscover.State>
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('id')) {
        this.router.navigateByUrl('/');
        return;
      }
      this.movieId = +paramMap.get('id');
      this.getMovie();
      this.getReviews();
    });
  }

  getMovie() {
    this.discoverService.getMovie(this.movieId);
    this.store.select(fromDiscover.getAvailableMovie).subscribe((movie) => {
      if (movie) {
        this.movie = movie;
      }
    });
  }

  getReviews() {
    this.discoverService.getReviews(this.movieId);
    this.store.select(fromDiscover.getReviews).subscribe((review) => {
      if (review) {
        this.reviews = review;
      }
    });
  }
}
