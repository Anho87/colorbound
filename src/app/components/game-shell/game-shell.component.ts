import { Component, inject } from '@angular/core';
import { WelcomeComponent } from '../welcome/welcome.component';
import { GameMenuComponent } from '../game-menu/game-menu.component';
import { GameService } from '../../services/game.service';
import { GameBoardComponent } from "../game-board/game-board.component";

@Component({
  selector: 'app-game-shell',
  imports: [WelcomeComponent, GameMenuComponent, GameBoardComponent],
  templateUrl: './game-shell.component.html',
  styleUrl: './game-shell.component.css',
})
export class GameShellComponent {
  private gameService = inject(GameService);
  ifWelcome: boolean = true;
  ifGameMenu: boolean = false;
  ifGame: boolean = false;

  onPlayClicked() {
    this.ifWelcome = false;
    this.ifGameMenu = true;
    this.ifGame = false;
  }

  onStartGame(){
    this.ifWelcome = false;
    this.ifGameMenu = false;
    this.ifGame = true;
    this.gameService.gameStart();
  }

  onGiveUp(){
    this.ifGameMenu = true;
    this.ifGame = false;
  }
}
