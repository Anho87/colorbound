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

  enemyCharacters = signal<Enemy[]>([]);
  playerCharacters = signal<Player[]>([]);
  biome = signal<Biome>(Biome.LavaChamber);
  selectedPlayerIndex = signal<number | null>(null);

  gameStart(){
    this.setBiome();
    this.gameOnGoing = true;
    while(this.gameOnGoing){
      this.playerTurn()
      this.enemyTurn();
    }
  }

  playerTurn(){
    const characters = this.playerCharacters();
    for (let index = 0; index < characters.length; index++) {
      const character = characters[index];
      this.playerService.characterMove(character); 
    }
  }

  enemyTurn(){
    const characters = this.enemyCharacters();
    for (let index = 0; index < characters.length; index++) {
      const character = characters[index];
      this.aiService.characterMove(character);
    }
    this.gameOnGoing = false;
    console.log('game over');
  }

  checkIfGameOver(){
    if (this.playerCharacters().length < 1) {
      this.gameOnGoing = false;
      console.log('you lose');
    }else if (this.enemyCharacters().length < 1) {
      this.gameOnGoing = false;
      console.log('you win');
    }
  }

  positionsMatch(a: [number, number], b: [number, number]): boolean {
    return a[0] === b[0] && a[1] === b[1];
  }

  getCharactersAtCoord(coord: [number, number]): (Player | Enemy)[] {
    return [
      ...this.playerCharacters().filter(c => this.positionsMatch(c.position, coord)),
      ...this.enemyCharacters().filter(c => this.positionsMatch(c.position, coord)),
    ];
  }

  getSelectedPlayer(): Player | null {
    const idx = this.selectedPlayerIndex();
    return idx !== null ? this.playerCharacters()[idx] : null;
  }

  selectPlayerAtCoord(coord: [number, number]) {
    const player = this.playerCharacters().find(p => this.positionsMatch(p.position, coord));
    if (player) {
      const idx = this.playerCharacters().indexOf(player);
      this.selectedPlayerIndex.set(idx);
    }
  }

  moveSelectedPlayerTo(to: [number, number]) {
    const idx = this.selectedPlayerIndex();
    if (idx === null) return;
    if (!this.checkMovement(to)) return;

    const updated = [...this.playerCharacters()];
    updated[idx].position = to;
    this.playerCharacters.set(updated);
    this.selectedPlayerIndex.set(null);
    console.log(this.enemyCharacters());
    console.log(this.playerCharacters());
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

