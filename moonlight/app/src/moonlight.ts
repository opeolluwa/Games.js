import {
    gameMainScreen,
    gamePlayScreen,
    gamePromptForm,
    gamePromptFormInput,
    playGameBtn,
    splashScreen,
    usernameForm,
    usernameFormInput,
} from "./dom";
import {playSound} from "./gameSound";
import {MAIN_SCREEN_DELAY} from "./constants.ts";
import {getItem, injectTypingAnimation, writeMachineText, writePlayerText} from "./utils.ts";
import {emoji, replies} from "./resources.ts";
import _ from 'lodash'
import {ulid} from "ulid";


const numberGenerator = () => Math.round(Math.random() * 100);
let guess = numberGenerator();


interface User {
    currentScore: number;
    identifier: string,
    username: string | undefined,
    score: {
        win: number,
        loss: number
    }
}


const testUser: User = {
    identifier: ulid(),
    username: undefined,
    score: {
        win: 0,
        loss: 0
    },
    currentScore: 0
};


document.addEventListener("DOMContentLoaded", () => {
    const sound = playSound("/sound/game-loop.mp3");

    window.setTimeout(() => {
        splashScreen?.classList.add("hidden");
        gamePlayScreen?.classList.remove("hidden");
        sound.pause();
    }, MAIN_SCREEN_DELAY);

    playGameBtn?.addEventListener("click", () => {
        gamePlayScreen?.classList.add("hidden");
        gameMainScreen?.classList.remove("hidden")
        initGame();
    });

    usernameForm?.addEventListener("submit", async (e) => {
        e.preventDefault();
        testUser.username = usernameFormInput?.value;
        gamePlayScreen?.classList.add("hidden")
        gameMainScreen?.classList.remove("hidden")

    });

});


let handleGamePromptSubmit

function initGame() {
    writeMachineText('Provide your name to get started.');

    if (handleGamePromptSubmit) {
        gamePromptForm?.removeEventListener('submit', handleGamePromptSubmit);
    }

    // Define the handler
    handleGamePromptSubmit = (e) => {
        e.preventDefault();

        if (gamePromptFormInput?.value) {
            const username = _.capitalize(gamePromptFormInput?.value);
            writePlayerText(String(username));
            gamePromptFormInput.value = "";
            writeMachineText(`${getItem(replies.welcome)} ${username} ${getItem(emoji.goodFeedBack)}`);
        }

        _.delay(injectTypingAnimation, 1000, 1500);
        _.delay(writeMachineText, 2500, 'You have five trials to guess a number. A correct guess awards you $100');
        _.delay(writeMachineText, 4000, `A wrong one deducts $20 from your current balance "${testUser.currentScore}"`);

        // Remove listener after it runs once
        gamePromptForm?.removeEventListener('submit', handleGamePromptSubmit);

        // Start the game logic
        play();
    };

    // Add the listener
    gamePromptForm?.addEventListener('submit', handleGamePromptSubmit);


}


function play() {
    writeMachineText("Guess a number between 1 and 100");

    // Remove old handler if any
    if (handleGamePromptSubmit) {
        gamePromptForm?.removeEventListener('submit', handleGamePromptSubmit);
    }

    handleGamePromptSubmit = (e) => {
        e.preventDefault();
        const userInput = Number(gamePromptFormInput?.value);
        if (isNaN(userInput)) return writeMachineText("Please enter a valid number!");

        writePlayerText(userInput)
        checkGuess(guess, userInput);
        gamePromptFormInput.value = "";
    };

    gamePromptForm?.addEventListener('submit', handleGamePromptSubmit);
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
        playSound("/sound/winner-sound.mp3")
        // win.innerText = `${++winCount}`;
        // updateCurrentAmount(100);
        // write(getItem(replies.equalTo));

        // Start a new game after a short delay
        // _.delay(newGame, 1500);
    }

    // Reset input field after processing
    // inputFeed.value = "";

}


export function updateCurrentAmount(score: number) {
    testUser.currentScore += score
}