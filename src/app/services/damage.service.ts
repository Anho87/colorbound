import { Injectable } from '@angular/core';
import { Character } from '../models/entities/character';
import { Biome } from '../models/enums/biome.enum';

@Injectable({
  providedIn: 'root',
})
export class DamageService {
 

  calculateDamage(attacker: Character, defender: Character, biome: Biome) {
    let attackBonus = this.calculateAttackBonus(attacker, defender, biome);
    let protection = this.calculateProtection(attacker, defender,biome);
    let damage: number = Math.ceil(20 * attackBonus * protection);
    defender.hp -= damage;
    
    console.log(
      `${defender.name} took ${damage} damage, remaining HP: ${defender.hp}`
    );
  }

  calculateAttackBonus(
    attacker: Character,
    defender: Character,
    biome: Biome
  ): number {
    let attackBonus = 1;
    switch (biome) {
      case 'lava chamber':
        if (attacker.color == 'red') attackBonus += 0.15;
        break;
      case 'abandon temple':
        if (attacker.color == 'green') attackBonus += 0.15;
        break;
      case 'crystal cavern':
        if (attacker.color == 'blue') attackBonus += 0.15;
        break;
      case 'desert shrine':
        if (attacker.color == 'yellow') attackBonus += 0.15;
        break;
      default:
        break;
    }

    switch (attacker.color) {
      case 'green':
        if (defender.color == 'yellow') attackBonus += 0.15;
        break;
      case 'yellow':
        if (defender.color == 'blue') attackBonus += 0.15;
        break;
      case 'red':
        if (defender.color == 'green') attackBonus += 0.15;
        break;
      case 'blue':
        if (defender.color == 'red') attackBonus += 0.15;
        break;
      default:
        break;
    }

    switch (attacker.archetype) {
      case 'warrior':
        if (defender.archetype == 'ranger') attackBonus += 0.1;
        switch (attacker.weapon) {
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
        switch (attacker.weapon) {
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
        switch (attacker.weapon) {
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
        switch (attacker.weapon) {
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

    return attackBonus;
  }

  calculateProtection(attacker: Character, defender: Character, biome: Biome): number {
    let protection = 1;
    switch (biome) {
      case 'lava chamber':
        if (defender.color == 'red') protection -= 0.15;
        break;
      case 'abandon temple':
        if (defender.color == 'green') protection -= 0.15;
        break;
      case 'crystal cavern':
        if (defender.color == 'blue') protection -= 0.15;
        break;
      case 'desert shrine':
        if (defender.color == 'yellow') protection -= 0.15;
        break;
      default:
        break;
    }

    switch (attacker.color) {
      case 'green':
        if (defender.color == 'red') protection -= 0.15;
        break;
      case 'yellow':
        if (defender.color == 'green') protection -= 0.15;
        break;
      case 'red':
        if (defender.color == 'blue') protection -= 0.15;
        break;
      case 'blue':
        if (defender.color == 'yellow') protection -= 0.15;
        break;
      default:
        break;
    }
    return protection;
  }
}
