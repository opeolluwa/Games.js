import { balloons } from "balloons-js";
import _ from "lodash";
import { MAIN_SCREEN_DELAY } from "./constants.ts";
import {
  gameMainScreen,
  gamePlayScreen,
  gamePromptForm,
  gamePromptFormInput,
  playGameBtn,
  splashScreen,
} from "./dom";
import { playSound } from "./gameSound";
import { emoji, replies } from "./resources.ts";
import {
  generateGuess,
  getItem,
  injectTypingAnimation,
  writeMachineText,
  writePlayerText,
} from "./utils.ts";
import { Player } from "./player.ts";

let guess = generateGuess();
alert(guess);

document.addEventListener("DOMContentLoaded", () => {
  const sound = playSound("/sound/game-loop.mp3");
  sound.loop = true;

  window.setTimeout(() => {
    splashScreen?.classList.add("hidden");
    gamePlayScreen?.classList.remove("hidden");
  }, MAIN_SCREEN_DELAY);

  playGameBtn?.addEventListener("click", () => {
    gamePlayScreen?.classList.add("hidden");
    gameMainScreen?.classList.remove("hidden");
    initGame();
  });
});

let handleGamePromptSubmit: (event: SubmitEvent) => void;

function initGame() {
  let player: Player | undefined = undefined;

  writeMachineText("Provide your name to get started.");

  if (handleGamePromptSubmit) {
    gamePromptForm?.removeEventListener("submit", handleGamePromptSubmit);
  }

  handleGamePromptSubmit = (e: Event) => {
    e.preventDefault();

    if (gamePromptFormInput?.value) {
      const username = _.capitalize(gamePromptFormInput?.value);
      writePlayerText(String(username));
      gamePromptFormInput.value = "";
      writeMachineText(
        `${getItem(replies.welcome)} ${username} ${getItem(emoji.goodFeedBack)}`
      );
      player = new Player(username);
    }

    _.delay(injectTypingAnimation, 1000, 1500);
    _.delay(
      writeMachineText,
      2500,
      "You have five trials to guess a number. A correct guess awards you $100"
    );
    _.delay(
      writeMachineText,
      4000,
      `A wrong one deducts $20 from your current balance "${player?.getStats.win}"`
    );

    gamePromptForm?.removeEventListener("submit", handleGamePromptSubmit);

    play();
  };

  gamePromptForm?.addEventListener("submit", handleGamePromptSubmit);
}

function play() {
  writeMachineText("Guess a number between 1 and 100");
  gamePromptFormInput!.type = "number";

  // Remove old handler if any
  if (handleGamePromptSubmit) {
    gamePromptForm?.removeEventListener("submit", handleGamePromptSubmit);
  }

  handleGamePromptSubmit = (e: Event) => {
    e.preventDefault();
    const userInput = Number(gamePromptFormInput?.value);
    if (isNaN(userInput))
      return writeMachineText("Please enter a valid number!");

    writePlayerText(userInput);
    checkGuess(guess, userInput);
    gamePromptFormInput.value = "";
  };

  gamePromptForm?.addEventListener("submit", handleGamePromptSubmit);
}

export function checkGuess(targetValue: number, playerInput: number) {
  // Basic input validation
  if (isNaN(playerInput)) {
    writeMachineText("Please enter a valid number!");
    return;
  }

  // Player guessed within 5 but less than the target
  if (playerInput >= targetValue - 5 && playerInput < targetValue) {
    updateCurrentAmount(-20);
    writeMachineText(getItem(replies.closeTo));
  }

  // Player guessed too high
  else if (playerInput > targetValue) {
    updateCurrentAmount(-20);
    writeMachineText(getItem(replies.greaterThan));
  }

  // Player guessed too low
  else if (playerInput < targetValue) {
    updateCurrentAmount(-20);
    writeMachineText(getItem(replies.lessThan));
  }

  // Player guessed correctly
  else if (playerInput === targetValue) {
    balloons();
    playSound("/sound/winner-sound.mp3");
  }
}

export function updateCurrentAmount(score: number) {
  console.log(score);
}
