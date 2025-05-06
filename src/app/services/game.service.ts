import { Injectable, signal } from '@angular/core';
import { Enemy } from '../models/entities/enemies/enemy';
import { Archetype } from '../models/enums/archetype.enum';
import { Color } from '../models/enums/color.enum';
import { MageWeapon } from '../models/enums/mage-weapon.enum';
import { WarriorWeapon } from '../models/enums/warrior-weapon.enum';
import { RangerWeapon } from '../models/enums/ranger-weapon.enum';
import { MonkWeapon } from '../models/enums/monk-weapon.enum';
import { Player } from '../models/entities/player/player';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  enemyCharacters = signal<Enemy[]>([]);
  playerCharacters = signal<Player[]>([]);

  selectedPlayerIndex = signal<number | null>(null);

  getCharactersAt(index: number): (Player | Enemy)[] {
    return [
      ...this.playerCharacters().filter(c => c.position === index),
      ...this.enemyCharacters().filter(c => c.position === index),
    ];
  }

  selectPlayerAt(index: number) {
    const player = this.playerCharacters().find(p => p.position === index);
    if (player) {
      const idx = this.playerCharacters().indexOf(player);
      this.selectedPlayerIndex.set(idx);
    }
  }

  moveSelectedPlayer(toIndex: number) {
    const idx = this.selectedPlayerIndex();
    if (idx === null) return;

    const updated = [...this.playerCharacters()];
    updated[idx].position = toIndex;
    this.playerCharacters.set(updated);
    this.selectedPlayerIndex.set(null);
  }

  isSelectedPlayerTile(index: number): boolean {
    const idx = this.selectedPlayerIndex();
    return idx !== null && this.playerCharacters()[idx].position === index;
  }

  generateEnemies(number: number) {
    this.enemyCharacters.set([]);
    for (let index = 0; index < number; index++) {
      const colors = Object.values(Color);
      const archetypes = Object.values(Archetype);
      const position = 0 + index;
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomArchetype = archetypes[Math.floor(Math.random() * archetypes.length)];
  
      const name = `${randomColor} ${randomArchetype} ${this.enemyCharacters().length + 1}`;
  
      let weapon: string;
  
      switch(randomArchetype){
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

      this.enemyCharacters.update((enemies) => [
        ...enemies,
        new Enemy(name, randomColor, weapon, randomArchetype, position),
      ]);
    }
      
    }
}

function getRandom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

