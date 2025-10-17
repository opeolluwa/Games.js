import {getItem} from "./utils.ts";

let userName = "" //todo use conceree value
export const emoji = {
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


export const replies = {
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