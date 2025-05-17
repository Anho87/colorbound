import { Component, EventEmitter, inject, Output } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Color } from '../../models/enums/color.enum';
import { Archetype } from '../../models/enums/archetype.enum';
import { MageWeapon } from '../../models/enums/mage-weapon.enum';
import { MonkWeapon } from '../../models/enums/monk-weapon.enum';
import { RangerWeapon } from '../../models/enums/ranger-weapon.enum';
import { WarriorWeapon } from '../../models/enums/warrior-weapon.enum';
import { Player } from '../../models/entities/player/player';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CharacterForm {
  id: number;
  color: Color;
  archetype: Archetype;
  weapon: string;
  weapons: string[];
}

@Component({
  selector: 'app-character-creation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './character-creation.component.html',
  styleUrl: './character-creation.component.css',
})
export class CharacterCreationComponent {
  @Output() closeCharacterCreation = new EventEmitter();
  private gameService = inject(GameService);

  colors = Object.values(Color);
  archetypes = Object.values(Archetype);

characterForms: CharacterForm[] = [
  { id: 1, color: Color.Red, archetype: Archetype.Warrior, weapon: '', weapons: [] },
  { id: 2, color: Color.Blue, archetype: Archetype.Mage, weapon: '', weapons: [] },
  { id: 3, color: Color.Green, archetype: Archetype.Ranger, weapon: '', weapons: [] },
];

  constructor() {
    this.characterForms.forEach((_, i) => this.updateWeapons(i));
  }

  updateWeapons(index: number) {
    const archetype = this.characterForms[index].archetype;
    let weapons: string[] = [];

    switch (archetype) {
      case Archetype.Mage:
        weapons = Object.values(MageWeapon);
        break;
      case Archetype.Monk:
        weapons = Object.values(MonkWeapon);
        break;
      case Archetype.Ranger:
        weapons = Object.values(RangerWeapon);
        break;
      case Archetype.Warrior:
        weapons = Object.values(WarriorWeapon);
        break;
    }

    this.characterForms[index].weapons = weapons;
    this.characterForms[index].weapon = weapons[0];
  }

  createAllCharacters() {
    this.gameService.playerCharacters.set([]);
    const boardWidth = this.gameService.boardWidth();
    const boardHeight = this.gameService.boardHeight();
    
    for (let i = 0; i < this.characterForms.length; i++) {
      const form = this.characterForms[i];
      const name = this.createName(form);
      const x = boardWidth - 1 - i;  
      const y = boardHeight - 1;     
      const position: [number, number] = [x, y];
      const newCharacter = new Player(name, form.color, form.weapon, form.archetype, position);
      this.gameService.playerCharacters.update((list) => [...list, newCharacter]);
    }
    console.log(this.gameService.playerCharacters());
    this.closeCharacterCreation.emit();
  }

  createName(form: CharacterForm): string {
    return `Player ${form.color} ${form.archetype} ${this.gameService.playerCharacters().length + 1}`;
  }

  trackByValue(index: number, value: string): string {
  return value;
}


  onCloseCharacterCreation(){
    this.closeCharacterCreation.emit();
  }
}
