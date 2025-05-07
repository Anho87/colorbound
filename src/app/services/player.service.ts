import { Injectable } from '@angular/core';
import { Player } from '../models/entities/player/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  

  characterMove(player:Player){
  console.log(player.name);

 }
}
