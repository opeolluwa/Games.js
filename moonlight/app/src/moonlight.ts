import {
    gameMainScreen,
    gamePlayScreen, gamePromptForm, gamePromptFormInput,
    playGameBtn,
    splashScreen,
    usernameForm,
    usernameFormInput,
} from "./dom";
import {playSound} from "./gameSound";
import {MAIN_SCREEN_DELAY} from "./constants.ts";
import {getItem, writeMachineText, writePlayerText} from "./utils.ts";
import {emoji, replies} from "./resources.ts";
import _ from 'lodash'

let username: string | undefined = '';


document.addEventListener("DOMContentLoaded", () => {
    const sound = playSound("/sound/game-loop.mp3");

    window.setTimeout(() => {
        splashScreen?.classList.add("hidden");
        gamePlayScreen?.classList.remove("hidden");
        sound.pause();
    }, MAIN_SCREEN_DELAY);

    playGameBtn?.addEventListener("click", () => {
        gamePlayScreen?.classList.add("hidden");
        // mainScreen?.classList.remove("hidden");
        gameMainScreen?.classList.remove("hidden")
        initGame()

    });

    usernameForm?.addEventListener("submit", async (e) => {
        e.preventDefault();
        username = usernameFormInput?.value;
        gamePlayScreen?.classList.add("hidden")
        gameMainScreen?.classList.remove("hidden")

    });

    // add sound to each write() function
    // gamePromptForm?.addEventListener('submit', (e) => {
    //     e.preventDefault()
    //     playSound("/sound/game-new-message.mp3")
    //
    //     if (gamePromptFormInput?.value) {
    //         gameMainScreen?.appendChild(usernameInput)
    //         usernameInput.innerText = gamePromptFormInput?.value;
    //
    //         writeText(`${getItem(replies.welcome)} ${gamePromptFormInput?.value} ${getItem(emoji.goodFeedBack)}`)
    //     }
    // });
});


function runGame() {
    writeMachineText('Provide your name to get started.');


    // gamePromptForm?.addEventListener('submit', (e) => {
    //     e.preventDefault()
    //     if (gamePromptFormInput?.value) {
    //         gameMainScreen?.appendChild(usernameInput)
    //         usernameInput.innerText = gamePromptFormInput?.value;
    //
    //         writeText(`${getItem(replies.welcome)} ${gamePromptFormInput?.value} ${getItem(emoji.goodFeedBack)}`)
    //     }
    // })


}

function initGame() {
    writeMachineText('Provide your name to get started.');
    gamePromptForm?.addEventListener('submit', (e) => {
        e.preventDefault()
        if (gamePromptFormInput?.value) {
            username = _.capitalize(gamePromptFormInput?.value)
            writePlayerText(String(username))
            gamePromptFormInput.value = ""
            // writePlayerText(`${getItem(replies.welcome)} ${username} ${getItem(emoji.goodFeedBack)}`)
        }
    })
}