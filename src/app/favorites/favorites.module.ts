import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites.component';
import { StoreModule } from '@ngrx/store';
import { favoriteReducer } from './store/favorites.reducer';
import { SharedModule } from '../_partials/shared.module';

@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    StoreModule.forFeature('favorites', favoriteReducer),
    SharedModule,
  ],
})
export class FavoritesModule {}
