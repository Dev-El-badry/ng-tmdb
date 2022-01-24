import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuth$: Observable<boolean>;
  list = [];
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.renderList();
  }

  renderList() {
    this.list = [
      {
        title: 'Movies',
        action: () => {
          this.router.navigateByUrl('/')
        }
      },
      {
        title: 'Your Favorites',
        action: () => {
          this.router.navigateByUrl('/')
        }
      }
      
    ];
  }

}