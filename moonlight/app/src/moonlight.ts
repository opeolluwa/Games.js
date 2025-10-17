import {
    gameMainScreen,
    gamePlayScreen,
    mainScreen,
    playGameBtn,
    splashScreen,
    usernameForm,
    usernameFormInput,
} from "./dom";
import {playSound} from "./gameSound";
import {findOrCreateUser} from "./users";

export const MAIN_SCREEN_DELAY = 1000;

document.addEventListener("DOMContentLoaded", () => {
    const sound = playSound("/sound/game-loop.mp3");

    window.setTimeout(() => {
        splashScreen?.classList.add("hidden");
        gamePlayScreen?.classList.remove("hidden");
        sound.pause();
    }, MAIN_SCREEN_DELAY);

    playGameBtn?.addEventListener("click", () => {
        gamePlayScreen?.classList.add("hidden");
        mainScreen?.classList.remove("hidden");
    });

    usernameForm?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = usernameFormInput?.value;
        //TODO: add validation
        await findOrCreateUser(String(username));
        gamePlayScreen?.classList.add("hidden")
        gameMainScreen?.classList.remove("hidden")
    });
});
