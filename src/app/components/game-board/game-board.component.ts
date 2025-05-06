import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Player } from '../../models/entities/player/player';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css',
})
export class GameBoardComponent {
  private gameService = inject(GameService);

  boardWidth = 7;
  boardHeight = 10;
  boardSize = this.boardWidth * this.boardHeight;
  tiles = Array(this.boardSize).fill(null);

  playerCharacters = this.gameService.playerCharacters;
  enemyCharacters = this.gameService.enemyCharacters;

  onTileClick(index: number) {
    const chars = this.gameService.getCharactersAt(index);
    if (chars.some((c) => c instanceof Player)) {
      this.gameService.selectPlayerAt(index);
    } else if (this.gameService.selectedPlayerIndex() !== null) {
      this.gameService.moveSelectedPlayer(index);
      console.log(this.gameService.playerCharacters());
      console.log(this.gameService.enemyCharacters());
    }
  }

  isSelectedTile(index: number): boolean {
    return this.gameService.isSelectedPlayerTile(index);
  }

  getCharactersAt(index: number) {
    return this.gameService.getCharactersAt(index);
  }
}
