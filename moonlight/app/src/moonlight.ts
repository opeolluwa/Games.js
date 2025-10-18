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
import {getItem, injectTypingAnimation, writeMachineText, writePlayerText} from "./utils.ts";
import {emoji, replies} from "./resources.ts";
import _ from 'lodash'
import {ulid} from "ulid";


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
        initGame()
    });

    usernameForm?.addEventListener("submit", async (e) => {
        e.preventDefault();
        testUser.username = usernameFormInput?.value;
        gamePlayScreen?.classList.add("hidden")
        gameMainScreen?.classList.remove("hidden")

    });

});


function initGame() {
    writeMachineText('Provide your name to get started.');

    gamePromptForm?.addEventListener('submit', (e) => {
        e.preventDefault()
        if (gamePromptFormInput?.value) {
            const username = _.capitalize(gamePromptFormInput?.value)
            writePlayerText(String(username))
            gamePromptFormInput.value = ""
            writeMachineText(`${getItem(replies.welcome)} ${username} ${getItem(emoji.goodFeedBack)}`)

            _.delay(injectTypingAnimation, 1000, 1500)
            _.delay(writeMachineText, 2500, 'You have five trials to guess a number. A correct guess award you $100')
            _.delay(writeMachineText, 4000, `a wrong one deduct $20 from  your current balance "${testUser.currentScore}"`)

        }

        gamePromptForm?.removeEventListener('submit', () => {
            alert("main loop here ")
        })
    })


}
