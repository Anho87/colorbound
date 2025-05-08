import { inject, Injectable, signal } from '@angular/core';
import { Player } from '../models/entities/player/player';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  hasActed = signal<Player[]>([]);

  characterMove(player: Player) {
    if (!this.hasActed().some(p => p.name === player.name)) {
      this.hasActed.update(actedPlayers => [...actedPlayers, player]);
    }
  }

  checkHasActedContains(player: Player){
    return this.hasActed().find(p => p.position === player.position)
  }

 resetHasActed(){
  this.hasActed.set([]);
 }
}
