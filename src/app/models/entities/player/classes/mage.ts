import { Archetype } from "../../../enums/archetype.enum";
import { Color } from "../../../enums/color.enum";
import { MageWeapon } from "../../../enums/mage-weapon.enum";
import { Character } from "../character";

export class Mage extends Character {
  override archetype: Archetype = Archetype.Mage; 
  override weapon: MageWeapon;

  constructor(
    name: string,
    color: Color,
    weapon: MageWeapon,
    hp: number = 100
  ) {
    super(name, color, weapon, hp);
    this.weapon = weapon;
  }

  getAction(): string {
    return `${this.name} casts ${this.weapon.toUpperCase()} magic!`;
  }
}
