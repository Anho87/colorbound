import { inject, Injectable } from '@angular/core';
import { Character } from '../models/entities/character';
import { DamageService } from './damage.service';
import { PlayerService } from './player.service';
import { Biome } from '../models/enums/biome.enum';
import { Player } from '../models/entities/player/player';

@Injectable({
  providedIn: 'root',
})
export class CombatService {
  private damageService = inject(DamageService);
  private playerService = inject(PlayerService);

  combat(attacker: Character, defender: Character, biome: Biome) {
    if (!this.checkRange(attacker, defender)) {
      console.log('Target is out of range!');
      return;
    }
  
    this.damageService.calculateDamage(attacker, defender, biome);
  
    
    if (attacker instanceof Player) {
      if (this.playerService.checkHasActedContains(attacker)) return;
      this.playerService.characterMove(attacker);
    }
  }



  checkRange(attacker: Character, target: Character): boolean {
    const [ax, ay] = attacker.position;
    const [tx, ty] = target.position;

    const dx = Math.abs(ax - tx);
    const dy = Math.abs(ay - ty);

    return dx + dy <= attacker.range;
  }


}
