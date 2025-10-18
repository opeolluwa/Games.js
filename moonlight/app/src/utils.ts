import {
    gameMainScreen,
    gamePromptForm,
    machineTextStylesheet,
    playerTextStylesheet,
    typingStateStylesheet
} from "./dom.ts";
import {playSound} from "./gameSound.ts";


export const getItem = (collection: string[]): string => {
    let index = Math.round(Math.random() * (collection.length - 1))
    return collection[index];
}


// a shared function to write user's or machine's text
function writeText(message: string, actor: "machine" | "player") {
    const element = document.createElement('p');
    let stylesheet

    if (actor == "machine") {
        stylesheet = machineTextStylesheet
    } else {
        stylesheet = playerTextStylesheet
    }

    Object.assign(element.style, stylesheet)
    gameMainScreen?.appendChild(element);

    const sentence: string[] = message.split(' ');
    for (let word = 0; word < sentence.length; word++) {
        window.setTimeout(() => {
            element.innerText += ` ${sentence[word]}`;
        }, (word * 125));

    }
}


export const writePlayerText = (message: string) => writeText(message, 'player')
export const writeMachineText = (message: string) => writeText(message, 'machine')


export function injectTypingAnimation
(displayTimeout: number) {
    const typingElement = document.createElement('p')
    typingElement.classList.add('typing-animation')
    Object.assign(typingElement.style, typingStateStylesheet)
    gameMainScreen?.appendChild(typingElement)
    window.setTimeout(() => {
        typingElement.classList.add('hidden')
    }, displayTimeout)
}

