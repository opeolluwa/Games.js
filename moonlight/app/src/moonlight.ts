import _ from "lodash";
import { balloons } from "balloons-js";
import {
  gameMainScreen,
  gamePlayScreen,
  gamePromptForm,
  gamePromptFormInput,
  playGameBtn,
  splashScreen,
} from "./dom";
import { GameEngine } from "./engine";
import { Player } from "./player";
import { replies, emoji } from "./resources";
import { MAIN_SCREEN_DELAY } from "./constants";
import { playSound } from "./gameSound";
import {
  generateGuess,
  getItem,
  injectTypingAnimation,
  writeMachineText,
  writePlayerText,
} from "./utils";
import { Database } from "./database";

export class Moonlight extends GameEngine {
  private player?: Player;
  private guess: number;
  private handleSubmit?: (e: SubmitEvent) => void;
  private gameLoopSound?: HTMLAudioElement;
    private database :  Database;

  constructor() {
    super();
    this.guess = generateGuess();
    this.database = new Database();
  }

  public  init(): void {
    document.addEventListener("DOMContentLoaded", () => {
      this.gameLoopSound = playSound("/sound/game-loop.mp3");
      this.gameLoopSound.loop = true;
      this.gameLoopSound.volume *= 0;

      window.setTimeout(() => {
        splashScreen?.classList.add("hidden");
        gamePlayScreen?.classList.remove("hidden");
      }, MAIN_SCREEN_DELAY);

      playGameBtn?.addEventListener("click", () => {
        gamePlayScreen?.classList.add("hidden");
        gameMainScreen?.classList.remove("hidden");
        this.start();
      });
    });
  }

  public start(): void {
    super.start();
    writeMachineText("Provide your name to get started.");
    this.waitForName();
  }

  private waitForName(): void {
    this.cleanupListeners();

    this.handleSubmit = async (e: SubmitEvent) => {
      e.preventDefault();
      if (!gamePromptFormInput?.value) return;

      const username = _.capitalize(gamePromptFormInput.value.trim());
      writePlayerText(username);
      gamePromptFormInput.value = "";

      writeMachineText(
        `${getItem(replies.welcome)} ${username} ${getItem(emoji.goodFeedBack)}`
      );

       this.player = new Player(username);

      //   // 🔹 Fetch or create player
      //   const existingPlayer = await this.database.findPlayerByName(
      //     username.toLowerCase()
      //   );
      //   if (existingPlayer) {
      //     this.player = existingPlayer;
      //     writeMachineText(`Welcome back, ${username}!`);
      //   } else {
      //     this.player = new Player(username);
      //     await this.database.savePlayer(this.player);
      //     writeMachineText("New player profile created!");
      //   }

      _.delay(injectTypingAnimation, 1000, 1500);
      _.delay(
        writeMachineText,
        2500,
        "You have five trials to guess a number. A correct guess awards you +1 win."
      );
      _.delay(
        writeMachineText,
        4000,
        `A wrong one increases your loss count. Current stats: Wins ${this.player?.getStats.win}, Losses ${this.player?.getStats.loss}`
      );

      this.cleanupListeners();
      this.play();
    };

    gamePromptForm?.addEventListener("submit", this.handleSubmit);
  }

  private play(): void {
    this.guess = generateGuess();
    writeMachineText("Guess a number between 1 and 100");

    if (gamePromptFormInput) gamePromptFormInput.type = "number";
    this.cleanupListeners();

    this.handleSubmit = async (e: SubmitEvent) => {
      e.preventDefault();
      const userInput = Number(gamePromptFormInput?.value);
      if (isNaN(userInput)) {
        writeMachineText("Please enter a valid number!");
        return;
      }

      writePlayerText(String(userInput));
      gamePromptFormInput!.value = "";

      const result = await this.checkGuess(userInput);

      if (result === "win") {
        _.delay(() => {
          writeMachineText("🎉 You guessed it right! Make a new guess!");
          this.play(); // recursively start new round
        }, 2000);
      }
    };

    gamePromptForm?.addEventListener("submit", this.handleSubmit);
  }

  private async checkGuess(playerInput: number): Promise<"win" | "continue"> {
    const target = this.guess;

    if (!this.player) return "continue";

    if (playerInput >= target - 5 && playerInput < target) {
      await this.incrementLoss();
      writeMachineText(getItem(replies.closeTo));
    } else if (playerInput > target) {
      await this.incrementLoss();
      writeMachineText(getItem(replies.greaterThan));
    } else if (playerInput < target) {
      await this.incrementLoss();
      writeMachineText(getItem(replies.lessThan));
    } else {
      balloons();
      playSound("/sound/winner-sound.mp3");
      await this.incrementWin();
      return "win";
    }

    return "continue";
  }

  private incrementWin(): void {
    if (!this.player) return;
    this.player.getStats.incrementWin();
    // await this.database.savePlayer(this.player);
    console.log(
      `🏆 ${this.player.getName()} Wins: ${this.player.getStats.win}, Losses: ${
        this.player.getStats.loss
      }`
    );
  }

  private incrementLoss(): void {
    if (!this.player) return;
    this.player.getStats.incrementLoss();
    // await this.database.savePlayer(this.player);
    console.log(
      `💔 ${this.player.getName()} Wins: ${this.player.getStats.win}, Losses: ${
        this.player.getStats.loss
      }`
    );
  }

  private cleanupListeners(): void {
    if (this.handleSubmit) {
      gamePromptForm?.removeEventListener("submit", this.handleSubmit);
    }
  }
}
