import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Player } from '../../models/entities/player/player';
import { Enemy } from '../../models/entities/enemies/enemy';
import { CombatService } from '../../services/combat.service';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css',
})
export class GameBoardComponent implements OnInit {
  @Output() onGiveUp = new EventEmitter();
  private gameService = inject(GameService);
  private combatService = inject(CombatService);
  youWin = computed(() => this.gameService.youWin());
  youLose = computed(() => this.gameService.youLose());
  boardWidth = this.gameService.boardWidth();
  boardHeight = this.gameService.boardHeight();
  tiles: [number, number][] = [];
  selectedCharacter?: Player | Enemy;
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
    const char = this.gameService.getCharacterAtCoord(coord);
    this.selectedCharacter = this.gameService.getCharacterAtCoord(coord);
    const selectedPlayer = this.gameService.getSelectedPlayer();

    if (char instanceof Player) {
      this.gameService.selectPlayerAtCoord(coord);
    } else if (selectedPlayer && char instanceof Enemy) {
      const enemy = char as Enemy;
      this.combatService.combat(selectedPlayer, enemy,  this.gameService.biome());
      this.gameService.clearSelection();
      this.gameService.removeDead();
      this.gameService.checkIfGameOver();
    } else if (selectedPlayer) {
      this.gameService.moveSelectedPlayerTo(coord);
    }
  }

  isSelectedTile(coord: [number, number]): boolean {
    return this.gameService.isSelectedPlayerTileCoord(coord);
  }

  getCharacterAt(coord: [number, number]) {
    return this.gameService.getCharacterAtCoord(coord);
  }

  passTurn(){
    this.gameService.passTurn();
  }


  giveUp(){
    this.gameService.giveUp();
    this.onGiveUp.emit();
  }
}
