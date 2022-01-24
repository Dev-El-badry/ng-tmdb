import { Component, Input, OnInit } from '@angular/core';
import { UiService } from '../../core/ui/ui.service';
import { Movie } from '../../discover/movie.model';
import { FavoritesService } from '../../favorites/favorites.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() movie: Movie;
  @Input() del: boolean;
  isLoading: boolean;
  constructor(
    private uiService: UiService,
    private favService: FavoritesService
  ) {}

  ngOnInit(): void {}

  addToFavorite(movieId: number) {
    this.isLoading = true;
    this.favService.addToFavorite(movieId).subscribe(
      (result) => {
        this.uiService.snackbar(result.status_message, 'OKAY');
        this.isLoading = false;
      },
      (err) => {
        this.uiService.snackbar('Something went wrong', 'CLOSED');
        this.isLoading = false;
      }
    );
  }

  deleteFav(movieId: number) {
    this.favService.deleteFavMove(movieId);
  }
}
