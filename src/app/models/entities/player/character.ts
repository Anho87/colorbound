import { Archetype } from "../../enums/archetype.enum";
import { Color } from "../../enums/color.enum";


export abstract class Character {
  constructor(
    public name: string,
    public color: Color,
    public weapon: string,
    public hp: number = 100
  ) {}

  abstract archetype: Archetype;

  isAlive(): boolean {
    return this.hp > 0;
  }

  takeDamage(amount: number) {
    this.hp = Math.max(this.hp - amount, 0);
  }

  abstract getAction(): string;
}

