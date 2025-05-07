import { Archetype } from '../../enums/archetype.enum';
import { Color } from '../../enums/color.enum';
import { RangerWeapon } from '../../enums/ranger-weapon.enum';
import { Character } from '../character';

export class Ranger extends Character {
  override archetype: Archetype = Archetype.Ranger;
  override weapon: RangerWeapon;

  constructor(
    name: string,
    color: Color,
    weapon: RangerWeapon,
    hp: number = 100,
    position: [number, number] = [0, 0],
    range: number = 2,
    imageUrl: string = ''
  ) {
    super(name, color, weapon, hp, position, range, imageUrl);
    this.weapon = weapon;
  }

  getAction(): string {
    return `${
      this.name
    } attacks from afar with a ${this.weapon.toUpperCase()}!`;
  }

  static getDefaults(color: Color) {
    return {
      range: 2,
      imageUrl: `assets/sprites/mage-${color.toLowerCase()}.png`,
    };
  }
}
