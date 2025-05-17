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
    position: [number, number] = [0, 0],
    range: number = 1,
    imageUrl: string = '',
    weaponImageUrl: string = '',
  ) {
    super(name, color, weapon, hp, position, range, imageUrl, weaponImageUrl);
    this.weapon = weapon;
  }
 
  getAction(): string {
    return `${this.name} swings their ${this.weapon.toUpperCase()} with brute force!`;
  }

  static getDefaults(color: Color, weapon: string) {
    return {
      range: 1,
      imageUrl: `assets/sprites/warrior-${color.toLowerCase()}.png`,
      weaponImageUrl: `assets/sprites/warrior-${weapon.toLowerCase()}.png`,
    };
  }
}
