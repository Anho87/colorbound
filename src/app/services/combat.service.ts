import { inject, Injectable } from '@angular/core';
import { GameService } from './game.service';
import { Character } from '../models/entities/character';
import { Player } from '../models/entities/player/player';
import { Enemy } from '../models/entities/enemies/enemy';
import { DamageService } from './damage.service';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root',
})
export class CombatService {
  private gameService = inject(GameService);
  private damageService = inject(DamageService);
  private playerService = inject(PlayerService);

  combat(attacker: Character, defender: Character) {
    console.log(`${attacker.name} attacks ${defender.name}`);
    if (this.playerService.checkHasActedContains(attacker)) return;
    if (!this.checkRange(attacker, defender)) {
      console.log('Target is out of range!');
      return;
    }

    this.damageService.calculateDamage(attacker, defender);
    this.playerService.characterMove(attacker);
    this.checkIfAlive(attacker, defender);
    this.gameService.checkIfGameOver();
  }



  checkRange(attacker: Character, target: Character): boolean {
    const [ax, ay] = attacker.position;
    const [tx, ty] = target.position;

    const dx = Math.abs(ax - tx);
    const dy = Math.abs(ay - ty);

    return dx + dy <= attacker.range;
  }

  checkIfAlive(attacker: Character, defender: Character): void {
    if (!defender.isAlive()) {
      if (defender instanceof Player) {
        this.gameService.playerCharacters.update(players =>
          players.filter(p => p.name  !== defender.name )
        );
      } else if (defender instanceof Enemy) {
        this.gameService.enemyCharacters.update(enemies =>
          enemies.filter(e => e.name  !== defender.name )
        );
      }
    }
  }
}
