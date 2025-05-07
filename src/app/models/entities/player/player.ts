import { Archetype } from "../../enums/archetype.enum";
import { Color } from "../../enums/color.enum";
import { Character } from "../character";
import { Mage } from "../classes/mage";
import { Monk } from "../classes/monk";
import { Ranger } from "../classes/ranger";
import { Warrior } from "../classes/warrior";

export class Player extends Character {
  archetype: Archetype;

  constructor(
    name: string,
    color: Color,
    weapon: string,
    archetype: Archetype,
    position: [number, number] = [0, 0]
  ) {
    const { range, imageUrl } = Player.getDefaultsFromArchetype(archetype, color);
    super(name, color, weapon, 100, position, range, imageUrl);
    this.archetype = archetype;
  }

  static getDefaultsFromArchetype(archetype: Archetype, color: Color) {
    switch (archetype) {
      case Archetype.Mage:
        return Mage.getDefaults(color);
      case Archetype.Warrior:
        return Warrior.getDefaults(color);
      case Archetype.Ranger:
        return Ranger.getDefaults(color);
      case Archetype.Monk:
        return Monk.getDefaults(color);
      default:
        return { range: 1, imageUrl: 'assets/sprites/default.png' };
    }
  }

  getAction(): string {
    return 'attacks!';
  }
}
