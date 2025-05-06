import { Component } from '@angular/core';
import { WelcomeComponent } from '../welcome/welcome.component';
import { GameMenuComponent } from '../game-menu/game-menu.component';
import { GameComponent } from '../game/game.component';

@Component({
  selector: 'app-game-shell',
  imports: [WelcomeComponent, GameMenuComponent, GameComponent],
  templateUrl: './game-shell.component.html',
  styleUrl: './game-shell.component.css',
})
export class GameShellComponent {
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
  }
}
