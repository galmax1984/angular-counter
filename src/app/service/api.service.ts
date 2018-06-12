import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GameSettings } from '../models/game-settings';
import { Observable } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  private rootApi = 'http://5b1e84764d4fc00014b07de3.mockapi.io/api/';
  constructor(private http: Http) { }

  getGameSettings(): Observable<GameSettings[]> {
    return this.get<GameSettings[]>('gamesettings');
  }

  private get<T>(url: string, parameters?: any): Observable<T> {
    const search = new URLSearchParams();
    return this.http
      .get(this.rootApi +  url, {params: search})
      .pipe(map(response => response.json() as T));
  }
}
