import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscoverComponent } from './discover.component';
import { ShowMovieComponent } from './show-movie/show-movie.component';

const routes: Routes = [
  { path: '', component: DiscoverComponent },
  { path: 'show/:id', component: ShowMovieComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscoverRoutingModule {}
