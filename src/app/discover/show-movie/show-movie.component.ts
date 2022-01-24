import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-show-movie',
  templateUrl: './show-movie.component.html',
  styleUrls: ['./show-movie.component.scss']
})
export class ShowMovieComponent implements OnInit {
  movie: Movie;
  constructor() { }

  ngOnInit(): void {
  }

}
