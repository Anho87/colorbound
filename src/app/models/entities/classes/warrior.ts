import { Archetype } from "../../enums/archetype.enum";
import { Color } from "../../enums/color.enum";
import { WarriorWeapon } from "../../enums/warrior-weapon.enum";
import { Character } from "../character";


export class Warrior extends Character {
  override archetype: Archetype = Archetype.Warrior;
  override weapon: WarriorWeapon;

  constructor(
    name: string,
    color: Color,
    weapon: WarriorWeapon,
    hp: number = 100,
    position: number = 0,
    range: number = 1,
      imageUrl: string = ''
  ) {
    super(name, color, weapon, hp, position, range, imageUrl);
    this.weapon = weapon;
  }
 
  getAction(): string {
    return `${this.name} swings their ${this.weapon.toUpperCase()} with brute force!`;
  }

  static getDefaults(color: Color) {
    return {
      range: 1,
      imageUrl: `assets/sprites/mage-${color.toLowerCase()}.png`,
    };
  }
}
