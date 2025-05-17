import { Archetype } from "../../enums/archetype.enum";
import { Color } from "../../enums/color.enum";
import { Character } from "../character";
import { Mage } from "../classes/mage";
import { Monk } from "../classes/monk";
import { Ranger } from "../classes/ranger";
import { Warrior } from "../classes/warrior";

export class Enemy extends Character {
  archetype: Archetype;

  constructor(
    name: string,
    color: Color,
    weapon: string,
    archetype: Archetype,
    position: [number, number] = [0, 0]
  ) {
    const { range, imageUrl, weaponImageUrl } = Enemy.getDefaultsFromArchetype(archetype, color, weapon);
    super(name, color, weapon, 100, position, range, imageUrl, weaponImageUrl);
    this.archetype = archetype;
  }

  static getDefaultsFromArchetype(archetype: Archetype, color: Color, weapon: string) {
    switch (archetype) {
      case Archetype.Mage:
        return Mage.getDefaults(color,weapon);
      case Archetype.Warrior:
        return Warrior.getDefaults(color,weapon);
      case Archetype.Ranger:
        return Ranger.getDefaults(color,weapon);
      case Archetype.Monk:
        return Monk.getDefaults(color,weapon);
      default:
        return { range: 1, imageUrl: 'assets/sprites/default.png', weaponImageUrl: 'assets/sprites/warrior-sword.png'};
    }
  }

  getAction(): string {
    return 'attacks!';
  }
}
