import { Archetype } from "../../enums/archetype.enum";
import { Color } from "../../enums/color.enum";
import { MageWeapon } from "../../enums/mage-weapon.enum";
import { Character } from "../character";

export class Mage extends Character {
  override archetype: Archetype = Archetype.Mage;
  override weapon: MageWeapon;

  constructor(
    name: string,
    color: Color,
    weapon: MageWeapon,
    hp: number = 100,
    position: [number, number] = [0, 0],
    range: number = 2,
    imageUrl: string = ''
  ) {
    super(name, color, weapon, hp, position, range, imageUrl);
    this.weapon = weapon;
  }

  getAction(): string {
    return `${this.name} casts ${this.weapon.toUpperCase()} magic!`;
  }

  static getDefaults(color: Color) {
    return {
      range: 2,
      imageUrl: `assets/sprites/mage-${color.toLowerCase()}.png`,
    };
  }
}
