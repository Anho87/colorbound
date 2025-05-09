import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CharacterCreationComponent } from '../character-creation/character-creation.component';

@Component({
  selector: 'app-game-menu',
  standalone: true,
  imports: [CharacterCreationComponent],
  templateUrl: './game-menu.component.html',
  styleUrl: './game-menu.component.css',
})
export class GameMenuComponent implements OnInit {
  @Output() startGame = new EventEmitter();
  private gameService = inject(GameService);
  ifCreatePlayerCharacter: boolean = false;
  isOpen = false;

  ngOnInit(): void {
    this.generateEnemies(3);
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  generatePlayerCharacters() {
     this.isOpen = false;
    this.ifCreatePlayerCharacter = !this.ifCreatePlayerCharacter;
  }

  generateEnemies(number: number) {
    this.gameService.generateEnemies(number);
    this.isOpen = false;
    console.log(this.gameService.enemyCharacters());
  }

  onStartGame() {
     this.isOpen = false;
    if (this.gameService.playerCharacters().length > 0) {
      this.startGame.emit();
    } else {
      console.log('Have to create your team first.');
    }
  }
}
