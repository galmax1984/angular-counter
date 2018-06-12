import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { GameSettings } from '../models/game-settings';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class GameSettingsService {

  constructor(private api: ApiService) { }

  getSettings(settingsName: string): Observable<GameSettings> {
    let result = this.api
      .getGameSettings()
      .pipe(
        map(x => {
          result = x.filter(s => s.Name === settingsName)[0];
          console.log(result);
          return result;
      }));

    return result;
  }
}
