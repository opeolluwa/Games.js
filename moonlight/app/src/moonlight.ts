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


const emoji = {
    goodFeedBack: [
        '😊', '😘', '🤗',
        '💞', '💝', '💓',
        '💖', '💓', '😍',
        '😝', '👐', '😚'
    ],
    ouchFeedBack: [
        '😣', '😭', '😩',
        '😟', '😤', '😢',
        '😒', '😌', '😔',
        '😬', '🤧']
};

const getItem = (collection: string[]): string => {
    let index = Math.round(Math.random() * (collection.length - 1))
    return collection[index];
}

const replies = {
    //an array of validatePlayerGuess fuction feedback messages
    greaterThan: [
        `Try again, your current input  is greater that the number`,
        `Exceeding\!\n Try a lesser value`,
        `That's over the top \n, try something lower`,
        `Ouch! that's way more than the target`
    ],

    lessThan: [
        `Ouch\! ${getItem(emoji.ouchFeedBack)} your guess is less than the number ${getItem(emoji.ouchFeedBack)}`,
        `${getItem(emoji.ouchFeedBack)}Try something greater, current input is less than target`,
        `Aim higher ${userName.innerText}.`,
        `${userName.innerText}, your guess is not up to the target.`
    ],


    equalTo: [
        `Awesome!  ${getItem(emoji.goodFeedBack)}that's correct.`,
        `${getItem(emoji.goodFeedBack)} Ten on Ten \!, your input is correct`,
        `Incredible😋 that's correct ${getItem(emoji.goodFeedBack)}`,
        `That's very correct`,
        `You're UNSTOPPABLE\! That's correct `,
        `You guessed right ${getItem(emoji.goodFeedBack)}`
    ],

    closeTo: [
        `Almost there.${getItem(emoji.ouchFeedBack)}`,
        `That's very close yet less than the number.${getItem(emoji.ouchFeedBack)}.`,
        `Ouch ${getItem(emoji.ouchFeedBack)} You miss a bit. The target Number is a higher.`,
        `${getItem(emoji.ouchFeedBack)}...that was so close , try again.`,
        `That's close `,
        `You tried ${getItem(emoji.goodFeedBack)}, aim again`
    ],


    welcome: [
        'Welcome',
        'Glad to have you',
        'It\'s good to have you',
        'You\'re most welcome',
        'Greetings',
        'Holla\!',
        'Welcome, let\'s get started',
    ]

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
        // mainScreen?.classList.remove("hidden");
        gameMainScreen?.classList.remove("hidden")
    });

    // usernameForm?.addEventListener("submit", async (e) => {
    //     e.preventDefault();
    //     alert("sjkgsgnlk/sgklnj")
    //     const username = usernameFormInput?.value;
    //     //TODO: add validation
    //     // await findOrCreateUser(String(username));
    //     gamePlayScreen?.classList.add("hidden")
    //     gameMainScreen?.classList.remove("hidden")
    // });
});






//a fuctiin that create element and add content to it
function writeText(sampleText) {
    //create element asynchronously
    let element = document.createElement('p');
    //aee css to element
    Object.assign(element.style, {
        maxWidth: '45%',
        backgroundColor: '#2D2D2D',
        color: '#fff',
        padding: '5px 9px',
        borderRadius: '8px 25px 25px 18px',
        marginBottom: '12px',
    })
    //append the element to root nod
    node.appendChild(element);
    //then...
    //modify sample text
    sampleText = sampleText.split(' ');
    //initially addd the first word to the node
    //attach text annimation to send message buttonclick event
    //add the first word to the node 5mili seconds after the send button is clicked
    element.innerText = sampleText[0];
    //initially addd the first word to the node
    //then...
    //loop thru the sampleText add each word to the text econtent of the target node every 200 * index of word.length
    for (let word = 1; word < sampleText.length; word++) {
        window.setTimeout(() => {
            element.innerText += ` ${sampleText[word]}`;
        }, (word * 125));

    }
    //add sound to each write() function
    trigger.addEventListener('click', () => { newMsgSound.play() });

}
