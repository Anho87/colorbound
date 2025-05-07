import { Injectable } from '@angular/core';
import { Enemy } from '../models/entities/enemies/enemy';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  characterMove(ai: Enemy){
    console.log(ai.name);
  }
}
