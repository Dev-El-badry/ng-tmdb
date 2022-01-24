import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscoverRoutingModule } from './discover-routing.module';
import { DiscoverComponent } from './discover.component';
import { ShowMovieComponent } from './show-movie/show-movie.component';
import { StoreModule } from '@ngrx/store';
import { movieReducer } from './store/discover.reducer';
import { SharedModule } from '../_partials/shared.module';
import { ReviewsComponent } from './show-movie/reviews/reviews.component';
import { AddReviewComponent } from './show-movie/reviews/add-review/add-review.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DiscoverComponent,
    ShowMovieComponent,
    ReviewsComponent,
    AddReviewComponent,
  ],
  imports: [
    CommonModule,
    DiscoverRoutingModule,
    StoreModule.forFeature('discover', movieReducer),
    SharedModule,
    FormsModule,
  ],
  entryComponents: [AddReviewComponent],
})
export class DiscoverModule {}
