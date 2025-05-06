import { Archetype } from "../../enums/archetype.enum";
import { Color } from "../../enums/color.enum";
import { MonkWeapon } from "../../enums/monk-weapon.enum";
import { Character } from "../character";


export class Monk extends Character {
  override archetype: Archetype = Archetype.Monk;
  override weapon: MonkWeapon;

  constructor(
    name: string,
    color: Color,
    weapon: MonkWeapon,
    hp: number = 100,
    position: number = 0,
    range: number = 1,
     imageUrl: string = ''
  ) {
    super(name, color, weapon, hp, position, range, imageUrl);
    this.weapon = weapon;
  }


  getAction(): string {
    return `${this.name} performs a focused strike with ${this.weapon.toUpperCase()}!`;
  }

  static getDefaults(color: Color) {
    return {
      range: 1,
      imageUrl: `assets/sprites/mage-${color.toLowerCase()}.png`,
    };
  }
}
