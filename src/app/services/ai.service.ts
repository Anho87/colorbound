import { inject, Injectable, signal } from '@angular/core';
import { Enemy } from '../models/entities/enemies/enemy';
import { Player } from '../models/entities/player/player';
import { CombatService } from './combat.service';
import { Biome } from '../models/enums/biome.enum';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private combatService = inject(CombatService);
  enemyHasActed = signal<Enemy[]>([]);

  characterMove(ai: Enemy, playerCharacters: Player[], biome: Biome, allEnemies: Enemy[]) {
    if (this.enemyHasActed().some(e => e.name === ai.name)) return;
  
    const target = this.getTargetInRange(ai, playerCharacters);
    if (target && target.isAlive()) {
      this.combatService.combat(ai, target, biome);
    } else {
      const closest = this.getClosestPlayer(ai, playerCharacters);
      if (closest) {
        this.moveTowards(ai, closest, playerCharacters, allEnemies);
      }
    }
  
    this.enemyHasActed.update(prev => [...prev, ai]);
  }
  
  

  getTargetInRange(ai: Enemy, players: Player[]): Player | null {
    return players.find(p => this.combatService.checkRange(ai, p)) || null;
  }

  getClosestPlayer(ai: Enemy, players: Player[]): Player | null {
    let closest = null;
    let minDist = Infinity;

    for (const p of players) {
      const dist = this.distance(ai.position, p.position);
      if (dist < minDist) {
        minDist = dist;
        closest = p;
      }
    }

    return closest;
  }

  moveTowards(ai: Enemy, target: Player, players: Player[], enemies: Enemy[]) {
    const directions: [number, number][] = [
      [1, 0],  
      [-1, 0], 
      [0, 1],  
      [0, -1], 
      [1, 1],  
      [-1, 1], 
      [1, -1], 
      [-1, -1] 
    ];
  
    const [ax, ay] = ai.position;
    const [tx, ty] = target.position;
  
    const sortedDirs = directions.sort((a, b) => {
      const da = this.distance([ax + a[0], ay + a[1]], [tx, ty]);
      const db = this.distance([ax + b[0], ay + b[1]], [tx, ty]);
      return da - db;
    });
  
    for (const [dx, dy] of sortedDirs) {
      const newPos: [number, number] = [ax + dx, ay + dy];
      if (!this.isPositionOccupied(newPos, players, enemies)) {
        ai.position = newPos;
        break;
      }
    }
  }
  

  isPositionOccupied(pos: [number, number], players: Player[], enemies: Enemy[]): boolean {
    return (
      players.some(p => this.positionsMatch(p.position, pos)) ||
      enemies.some(e => this.positionsMatch(e.position, pos))
    );
  }

  positionsMatch(a: [number, number], b: [number, number]): boolean {
    return a[0] === b[0] && a[1] === b[1];
  }

  distance(a: [number, number], b: [number, number]): number {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
  }

  resetEnemyActions() {
    this.enemyHasActed.set([]);
  }

}
