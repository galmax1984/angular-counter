import { Component, OnInit } from '@angular/core';
import { GameSettingsService } from '../service/game-settings.service';
import { GameSettings } from '../models/game-settings';
import {StateMachine, StateEvent} from 'angular2-state-machine/core';

export enum By {Left = 0, Right = 1}

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  providers: [GameSettingsService]
})

export class CounterComponent implements OnInit {
  public gameSettings: GameSettings = new GameSettings();

  public CurrentServe: By = By.Left;
  public leftPlayerPoints = 0;
  public rightPlayerPoints = 0;

  public leftPlayerSets = 0;
  public rightPlayerSets = 0;

  private setWonFlag = false;

  constructor(private gameSettingsService: GameSettingsService) {
    gameSettingsService.getSettings('TableTennisDefault')
      .subscribe(x => {
        console.log(x);
        if (x) {
          this.gameSettings = x;
        }
      });
    console.log(this.gameSettings);
    }

  ngOnInit() {
  }

  pointWon(player: By) {

    if (this.setWonFlag) {
      this.resetCounters();
      return;
    }

    switch (player) {
      case By.Left: {
        this.leftPlayerPoints ++;
        break;
      }
      default: {
        this.rightPlayerPoints ++;
      }
    }

    if (!this.canScore(player)) {
      this.setWon(player);
    }
  }

  setWon(player: By) {
    this.setWonFlag = true;

    switch (player) {
      case By.Left: {
        this.leftPlayerSets ++;
        break;
      }
      default: {
        this.rightPlayerSets ++;
      }
    }

    this.isMatchWon(player);
  }

  resetCounters() {
    this.setWonFlag = false;
    this.leftPlayerPoints = 0;
    this.rightPlayerPoints = 0;
  }

  canScore(player: By): boolean {
    return (((this.getScore(player) < this.gameSettings.NumberOfPointsPerSet)
        && (this.getScore(player) <= this.gameSettings.DeuceStartingPoint)) ||
      (Math.abs(this.getScore(By.Left) - this.getScore(By.Right)) <= 1
        && (this.getScore(player) > this.gameSettings.DeuceStartingPoint)));
  }

  isMatchWon(player: By): boolean {
    const quotient = Math.floor(this.gameSettings.NumberOfSetsPerMatch / 2);
    console.log(quotient);
    return this.getSetsScore(player) > quotient;
  }

  getSetsScore(player: By): number {
    switch (player) {
      case By.Left: {
        return this.leftPlayerSets;
      }
      default: {
        return this.rightPlayerSets;
      }
    }
  }

  getScore(player: By): number {
    switch (player) {
      case By.Left: {
        return this.leftPlayerPoints;
      }
      default: {
        return this.rightPlayerPoints;
      }
    }
  }
}
