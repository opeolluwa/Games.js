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
import {getItem, writeText} from "./utils.ts";
import {emoji, replies} from "./resources.ts";


let username: string | undefined = null;


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
        playGame()

    });

    usernameForm?.addEventListener("submit", async (e) => {
        e.preventDefault();
        username = usernameFormInput?.value;
        gamePlayScreen?.classList.add("hidden")
        gameMainScreen?.classList.remove("hidden")

    });
});


function playGame() {
    writeText('Provide your name to get started.');

    const usernameInput = document.createElement('p');


    gamePromptForm?.addEventListener('submit', (e) => {
        e.preventDefault()
        if (gamePromptFormInput?.value) {
            gameMainScreen?.appendChild(usernameInput)
            usernameInput.innerText = gamePromptFormInput?.value;

            writeText(`${getItem(replies.welcome)} ${gamePromptFormInput?.value} ${getItem(emoji.goodFeedBack)}`)
        }
    })




}

