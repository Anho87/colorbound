import { inject, Injectable, signal } from '@angular/core';
import { Enemy } from '../models/entities/enemies/enemy';
import { Archetype } from '../models/enums/archetype.enum';
import { Color } from '../models/enums/color.enum';
import { MageWeapon } from '../models/enums/mage-weapon.enum';
import { WarriorWeapon } from '../models/enums/warrior-weapon.enum';
import { RangerWeapon } from '../models/enums/ranger-weapon.enum';
import { MonkWeapon } from '../models/enums/monk-weapon.enum';
import { Player } from '../models/entities/player/player';
import { Biome } from '../models/enums/biome.enum';
import { PlayerService } from './player.service';
import { AiService } from './ai.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private playerService = inject(PlayerService);
  private aiService = inject(AiService);
  gameOnGoing: boolean = false;
  boardWidth = signal<number>(10);
  boardHeight = signal<number>(10);
  youLose = signal<boolean>(false);
  youWin = signal<boolean>(false);
  enemyCharacters = signal<Enemy[]>([]);
  playerCharacters = signal<Player[]>([]);
  biome = signal<Biome>(Biome.LavaChamber);
  selectedPlayerIndex = signal<number | null>(null);
  selectedPlayerCord = signal<[number, number]>([0, 0]);

  gameStart() {
    this.setBiome();
    this.gameOnGoing = true;
    this.gameLoop();
  }

  async gameLoop() {
    while (this.gameOnGoing) {
      await this.playerTurn();
      this.playerService.resetHasActed();
      await this.enemyTurn();
    }
  }

  async playerTurn() {
    console.log('Your turn');
    await this.waitForAllPlayersToAct();
    console.log('Your turn finished');
  }

  waitForAllPlayersToAct(): Promise<void> {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (
          this.playerService.hasActed().length ===
          this.playerCharacters().length
        ) {
          clearInterval(interval);
          console.log('All players have acted');
          resolve();
        }
      }, 100);
    });
  }

  async enemyTurn() {
    console.log('AI turn');
    const playerCharacters = this.playerCharacters();
    const enemyCharacters = this.enemyCharacters();
    const biome = this.biome();

    for (let enemy of enemyCharacters) {
      this.aiService.characterMove(
        enemy,
        playerCharacters,
        biome,
        enemyCharacters
      );
      this.removeDead(); 
      this.checkIfGameOver();
      await this.sleep(300);
    }

    this.aiService.resetEnemyActions();
    console.log('AI turn finished');
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  removeDead() {
    this.playerCharacters.update(players => players.filter(p => p.isAlive()));
    this.enemyCharacters.update(enemies => enemies.filter(e => e.isAlive()));
  }


  checkIfGameOver() {
    if (this.playerCharacters().length < 1) {
      this.gameOnGoing = false;
      this.youLose.set(true);
    } else if (this.enemyCharacters().length < 1) {
      this.gameOnGoing = false;
      this.youWin.set(true);
    }
  }

  positionsMatch(a: [number, number], b: [number, number]): boolean {
    return a[0] === b[0] && a[1] === b[1];
  }

  getCharacterAtCoord(coord: [number, number]): Player | Enemy | undefined {
    const player = this.playerCharacters().find((p) =>
      this.positionsMatch(p.position, coord)
    );
    if (player) return player;

    return this.enemyCharacters().find((e) =>
      this.positionsMatch(e.position, coord)
    );
  }

  getSelectedPlayer(): Player | null {
    const idx = this.selectedPlayerIndex();
    return idx !== null ? this.playerCharacters()[idx] : null;
  }

  selectPlayerAtCoord(coord: [number, number]) {
    const player = this.playerCharacters().find((p) =>
      this.positionsMatch(p.position, coord)
    );
    if (player) {
      const idx = this.playerCharacters().indexOf(player);
      this.selectedPlayerIndex.set(idx);
      this.selectedPlayerCord.set(coord);
    }
  }

  moveSelectedPlayerTo(to: [number, number]) {
    const idx = this.selectedPlayerIndex();
    if (idx === null) return;
  
    const players = [...this.playerCharacters()];
    const player = players[idx];
  
    if (!this.checkMovement(to)) return;
    if (this.playerService.checkHasActedContains(player)) return;
  
    
    player.position = to;
    this.playerCharacters.set(players);
  
  
    this.playerService.characterMove(player);
  
    this.clearSelection() 
  }

  clearSelection() {
    this.selectedPlayerIndex.set(null);
    this.selectedPlayerCord.set([0, 0]);
  }
  
  

  checkMovement([targetX, targetY]: [number, number]): boolean {
    const idx = this.selectedPlayerIndex();
    if (idx === null) return false;

    const [x, y] = this.playerCharacters()[idx].position;

    const possibleMoves: [number, number][] = [
      [x + 1, y],
      [x + 2, y],
      [x - 1, y],
      [x - 2, y],
      [x, y + 1],
      [x, y + 2],
      [x, y - 1],
      [x, y - 2],
      [x + 1, y + 1],
      [x - 1, y + 1],
      [x + 1, y - 1],
      [x - 1, y - 1],
    ];
    return possibleMoves.some(([px, py]) => px === targetX && py === targetY);
  }

  isSelectedPlayerTileCoord(coord: [number, number]): boolean {
    const idx = this.selectedPlayerIndex();
    if (idx === null) return false;
    return this.positionsMatch(this.playerCharacters()[idx].position, coord);
  }

  generateEnemies(number: number) {
    this.enemyCharacters.set([]);
    for (let i = 0; i < number; i++) {
      const colors = Object.values(Color);
      const archetypes = Object.values(Archetype);
      const x = i % this.boardWidth();
      const y = Math.floor(i / this.boardWidth());

      const randomColor = getRandom(colors);
      const randomArchetype = getRandom(archetypes);
      const name = `Enemy ${randomColor} ${randomArchetype} ${i + 1}`;

      let weapon: string;

      switch (randomArchetype) {
        case Archetype.Mage:
          weapon = getRandom(Object.values(MageWeapon));
          break;
        case Archetype.Warrior:
          weapon = getRandom(Object.values(WarriorWeapon));
          break;
        case Archetype.Ranger:
          weapon = getRandom(Object.values(RangerWeapon));
          break;
        case Archetype.Monk:
          weapon = getRandom(Object.values(MonkWeapon));
          break;
      }

      this.enemyCharacters.update((list) => [
        ...list,
        new Enemy(name, randomColor, weapon, randomArchetype, [x, y]),
      ]);
    }
  }

  setBiome() {
    const biomes = Object.values(Biome);
    const randomBiome = getRandom(biomes);
    this.biome.set(randomBiome);
    console.log(this.biome());
  }
}

function getRandom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}
