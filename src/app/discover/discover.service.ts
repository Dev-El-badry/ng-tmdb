import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { environment } from "src/environments/environment";
import * as fromDiscover from './store/discover.reducer';

@Injectable({
  providedIn: 'root'
})
export class DiscoverService {
  private _root = environment.baseUrl;
  private _token = environment.apiToken;

  constructor(
    private http: HttpClient,
    private store: Store<fromDiscover.State>
  ) {}
}