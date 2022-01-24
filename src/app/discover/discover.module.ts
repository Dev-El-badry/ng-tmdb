import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscoverRoutingModule } from './discover-routing.module';
import { DiscoverComponent } from './discover.component';
import { MaterialModule } from '../material.module';
import { MovieCardComponent } from '../_partials/movie-card/movie-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShowMovieComponent } from './show-movie/show-movie.component';
import { StoreModule } from '@ngrx/store';
import { movieReducer } from './store/discover.reducer';

@NgModule({
  declarations: [DiscoverComponent, MovieCardComponent, ShowMovieComponent],
  imports: [
    CommonModule,
    DiscoverRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    StoreModule.forFeature('discover', movieReducer)
  ]
})
export class DiscoverModule { }
