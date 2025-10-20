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

export class Moonlight extends GameEngine {
  private player?: Player;
  private guess: number;
  private handleSubmit?: (e: SubmitEvent) => void;
  private gameLoopSound?: HTMLAudioElement;

  constructor() {
    super();
    this.guess = generateGuess();
  }

  public init(): void {
    document.addEventListener("DOMContentLoaded", () => {
      this.gameLoopSound = playSound("/sound/game-loop.mp3");
      this.gameLoopSound.loop = true;

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

    this.handleSubmit = (e: SubmitEvent) => {
      e.preventDefault();
      if (!gamePromptFormInput?.value) return;

      const username = _.capitalize(gamePromptFormInput.value);
      writePlayerText(username);
      gamePromptFormInput.value = "";

      writeMachineText(
        `${getItem(replies.welcome)} ${username} ${getItem(emoji.goodFeedBack)}`
      );
      this.player = new Player(username);

      _.delay(injectTypingAnimation, 1000, 1500);
      _.delay(
        writeMachineText,
        2500,
        "You have five trials to guess a number. A correct guess awards you $100"
      );
      _.delay(
        writeMachineText,
        4000,
        `A wrong one deducts $20 from your current balance "${
          this.player?.getInformation().stats.win
        }"`
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

    this.handleSubmit = (e: SubmitEvent) => {
      e.preventDefault();

      const userInput = Number(gamePromptFormInput?.value);
      if (isNaN(userInput)) {
        writeMachineText("Please enter a valid number!");
        return;
      }

      writePlayerText(String(userInput));
      gamePromptFormInput!.value = "";

      const result = this.checkGuess(userInput);

      if (result === "win") {
        _.delay(() => {
          writeMachineText("🎉 You guessed it right! Make a new guess!");
          this.play(); // recursively start a new round
        }, 2000);
      }
    };

    gamePromptForm?.addEventListener("submit", this.handleSubmit);
  }

  private checkGuess(playerInput: number): "win" | "continue" {
    const target = this.guess;

    if (playerInput >= target - 5 && playerInput < target) {
      this.updateCurrentAmount(-20);
      writeMachineText(getItem(replies.closeTo));
    } else if (playerInput > target) {
      this.updateCurrentAmount(-20);
      writeMachineText(getItem(replies.greaterThan));
    } else if (playerInput < target) {
      this.updateCurrentAmount(-20);
      writeMachineText(getItem(replies.lessThan));
    } else {
      balloons();
      playSound("/sound/winner-sound.mp3");
      this.updateCurrentAmount(+100);
      return "win";
    }

    return "continue";
  }

  private updateCurrentAmount(score: number): void {
    console.log("Score update:", score);
  }

  private cleanupListeners(): void {
    if (this.handleSubmit) {
      gamePromptForm?.removeEventListener("submit", this.handleSubmit);
    }
  }
}
