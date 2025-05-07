import { inject, Injectable } from '@angular/core';
import { GameService } from './game.service';
import { CombatService } from './combat.service';
import { Character } from '../models/entities/character';

@Injectable({
  providedIn: 'root',
})
export class DamageService {
  private gameService = inject(GameService);

  calculateDamage(attacker: Character, defender: Character) {
    let attackBonus = this.calculateAttackBonus(attacker, defender);
    let protection = this.calculateProtection(attacker, defender);
    let damage: number = Math.ceil(20 * attackBonus * protection);
    defender.hp -= damage;

    console.log(
      `${defender.name} took ${damage} damage, remaining HP: ${defender.hp}`
    );
  }

  calculateAttackBonus(attacker: Character, defender: Character): number {
      console.log(attacker.weapon);
      console.log(attacker.archetype);
      console.log(defender.weapon);
      console.log(defender.archetype);
      let biome = this.gameService.biome();
    let attackBonus = 1;
    switch (biome) {
      case 'lava chamber':
        if (attacker.color == 'red') attackBonus += 0.15;
        console.log('biome red');
        break;
      case 'abandon temple':
        if (attacker.color == 'green') attackBonus += 0.15;
        console.log('biome green');
        break;
      case 'crystal cavern':
        if (attacker.color == 'blue') attackBonus += 0.15;
        console.log('biome blue');
        break;
      case 'desert shrine':
        if (attacker.color == 'yellow') attackBonus += 0.15;
        console.log('biome yellow');
        break;
      default:
        break;
    }

    switch (attacker.color) {
      case 'green':
        if (defender.color == 'yellow') attackBonus += 0.15;
        console.log('attacker green');
        break;
      case 'yellow':
        if (defender.color == 'blue') attackBonus += 0.15;
        console.log('attacker yellow');
        break;
      case 'red':
        if (defender.color == 'green') attackBonus += 0.15;
        console.log('attacker red');
        break;
      case 'blue':
        if (defender.color == 'red') attackBonus += 0.15;
        console.log('attacker blue');
        break;
      default:
        break;
    }

    switch (attacker.archetype){
      case 'warrior':
        if (defender.archetype == 'ranger') attackBonus += 0.1;
        switch(attacker.weapon){
          case 'sword':
            if (defender.weapon == 'hammer') attackBonus += 0.1;
            break;
            case 'hammer':
            if (defender.weapon == 'axe') attackBonus += 0.1;
            break;
            case 'axe':
            if (defender.weapon == 'spear') attackBonus += 0.1;
            break;
            case 'spear':
            if (defender.weapon == 'sword') attackBonus += 0.1;
            break;
          default:
            break;
        }
        break;
        case 'ranger':
        if (defender.archetype == 'monk') attackBonus += 0.1;
        switch(attacker.weapon){
          case 'bow':
            if (defender.weapon == 'crossbow') attackBonus += 0.1;
            break;
            case 'crossbow':
            if (defender.weapon == 'throwing knife') attackBonus += 0.1;
            break;
            case 'throwing knife':
            if (defender.weapon == 'sling') attackBonus += 0.1;
            break;
            case 'sling':
            if (defender.weapon == 'bow') attackBonus += 0.1;
            break;
          default:
            break;
        }
        break;
        case 'monk':
        if (defender.archetype == 'mage') attackBonus += 0.1;
        switch(attacker.weapon){
          case 'staff':
            if (defender.weapon == 'fists') attackBonus += 0.1;
            break;
            case 'fists':
            if (defender.weapon == 'nunchaku') attackBonus += 0.1;
            break;
            case 'nunchaku':
            if (defender.weapon == 'sai') attackBonus += 0.1;
            break;
            case 'sai':
            if (defender.weapon == 'staff') attackBonus += 0.1;
            break;
          default:
            break;
        }
        break;
        case 'mage':
        if (defender.archetype == 'warrior') attackBonus += 0.1;
        switch(attacker.weapon){
          case 'fire':
            if (defender.weapon == 'earth') attackBonus += 0.1;
            break;
            case 'earth':
            if (defender.weapon == 'lightning') attackBonus += 0.1;
            break;
            case 'lightning':
            if (defender.weapon == 'water') attackBonus += 0.1;
            break;
            case 'water':
            if (defender.weapon == 'fire') attackBonus += 0.1;
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
    console.log(attackBonus);
    return attackBonus;
  }

  calculateProtection(attacker: Character, defender: Character): number {
    let biome = this.gameService.biome();
    let protection = 1;
    switch (biome) {
      case 'lava chamber':
        if (defender.color == 'red') protection -= 0.15;
        console.log('biome red');
        break;
      case 'abandon temple':
        if (defender.color == 'green') protection -= 0.15;
        console.log('biome green');
        break;
      case 'crystal cavern':
        if (defender.color == 'blue') protection -= 0.15;
        console.log('biome blue');
        break;
      case 'desert shrine':
        if (defender.color == 'yellow') protection -= 0.15;
        console.log('biome yellow');
        break;
      default:
        break;
    }

    switch (attacker.color) {
      case 'green':
        if (defender.color == 'red') protection -= 0.15;
        console.log('attacker green');
        break;
      case 'yellow':
        if (defender.color == 'green') protection -= 0.15;
        console.log('attacker yellow');
        break;
      case 'red':
        if (defender.color == 'blue') protection -= 0.15;
        console.log('attacker red');
        break;
      case 'blue':
        if (defender.color == 'yellow') protection -= 0.15;
        console.log('attacker blue');
        break;
      default:
        break;
    }
    console.log(protection);
    return protection;
  }
}

