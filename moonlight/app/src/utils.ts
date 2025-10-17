import {gameMainScreen, gamePromptForm} from "./dom.ts";
import {playSound} from "./gameSound.ts";


export const getItem = (collection: string[]): string => {
    let index = Math.round(Math.random() * (collection.length - 1))
    return collection[index];
}


export function writeText(sampleText: string) {
    const element = document.createElement('p');
    Object.assign(element.style, chatElementStyles)
    gameMainScreen?.appendChild(element);

    const sentence: string[] = sampleText.split(' ');
    for (let word = 0; word < sentence.length; word++) {
        window.setTimeout(() => {
            element.innerText += ` ${sentence[word]}`;
        }, (word * 125));

    }
    //add sound to each write() function
    gamePromptForm.addEventListener('submit', (e) => {
        e.preventDefault()
        playSound("/sound/game-new-message.mp3")
    });

}
