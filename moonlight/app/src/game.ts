import { GameEngine } from "./engine";
import { Player } from "./player";
import { generateGuess } from "./utils";

export class Moonlight extends GameEngine {
  private player: Player | undefined;
  private guess: number;

  constructor() {
    super();
    this.guess = generateGuess();
  }

  public initGame(name: string): void {
    this.player = new Player(name);
  }

  public runGame(): void {}
}