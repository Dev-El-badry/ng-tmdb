import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscoverRoutingModule } from './discover-routing.module';
import { DiscoverComponent } from './discover.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShowMovieComponent } from './show-movie/show-movie.component';
import { StoreModule } from '@ngrx/store';
import { movieReducer } from './store/discover.reducer';
import { SharedModule } from '../_partials/shared.module';

@NgModule({
  declarations: [DiscoverComponent, ShowMovieComponent],
  imports: [
    CommonModule,
    DiscoverRoutingModule,
    StoreModule.forFeature('discover', movieReducer),
    SharedModule,
  ],
})
export class DiscoverModule {}
