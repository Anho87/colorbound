import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Player } from '../../models/entities/player/player';
import { Enemy } from '../../models/entities/enemies/enemy';
import { CombatService } from '../../services/combat.service';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css',
})
export class GameBoardComponent implements OnInit {
  private gameService = inject(GameService);
  private combatService = inject(CombatService);

  boardWidth = this.gameService.boardWidth();
  boardHeight = this.gameService.boardHeight();
  tiles: [number, number][] = [];

  playerCharacters = this.gameService.playerCharacters;
  enemyCharacters = this.gameService.enemyCharacters;

  ngOnInit() {
    for (let y = 0; y < this.boardHeight; y++) {
      for (let x = 0; x < this.boardWidth; x++) {
        this.tiles.push([x, y]);
      }
    }
  }

  onTileClick(coord: [number, number]) {
    const chars = this.gameService.getCharactersAtCoord(coord);
    const selectedPlayer = this.gameService.getSelectedPlayer();

    if (chars.some(c => c instanceof Player)) {
      this.gameService.selectPlayerAtCoord(coord);
    } else if (selectedPlayer && chars.some(c => c instanceof Enemy)) {
      const enemy = chars.find(c => c instanceof Enemy) as Enemy;
      this.combatService.combat(selectedPlayer, enemy);
    } else if (selectedPlayer) {
      this.gameService.moveSelectedPlayerTo(coord);
    }
  }

  isSelectedTile(coord: [number, number]): boolean {
    return this.gameService.isSelectedPlayerTileCoord(coord);
  }

  getCharactersAt(coord: [number, number]) {
    return this.gameService.getCharactersAtCoord(coord);
  }
}
