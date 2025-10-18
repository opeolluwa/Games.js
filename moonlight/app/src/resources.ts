import {getItem} from "./utils.ts";

let userName = "" // todo: assign actual player name dynamically

export const emoji = {
    goodFeedBack: [
        '😊', '😘', '🤗', '💞', '💝', '💓', '💖', '😍', '😝', '👐', '😚',
        '😄', '😎', '👏', '🙌', '🌟', '🔥', '💪', '🥳', '🤩', '💥', '✨'
    ],
    ouchFeedBack: [
        '😣', '😭', '😩', '😟', '😤', '😢', '😒', '😌', '😔', '😬', '🤧',
        '🥺', '🙃', '😖', '😕', '😫', '😵', '🤕', '😿', '🥹'
    ]
};

export const replies = {
    greaterThan: [
        `Try again, your current input is greater than the number.`,
        `Exceeding! Try a lesser value.`,
        `That's over the top, try something lower.`,
        `Ouch! that's way more than the target.`,
        `Hmm, you overshot it ${getItem(emoji.ouchFeedBack)}.`,
        `Whoa! Too high ${getItem(emoji.ouchFeedBack)}.`,
        `You went past the mark ${getItem(emoji.ouchFeedBack)}. Bring it down.`,
        `Nope! ${getItem(emoji.ouchFeedBack)} Try going lower.`,
        `You’re flying too high, ${userName || 'player'}! Lower it.`,
        `Overestimated 😅! The number’s smaller.`
    ],

    lessThan: [
        `Ouch! ${getItem(emoji.ouchFeedBack)} your guess is less than the number.`,
        `${getItem(emoji.ouchFeedBack)} Try something greater, current input is less than target.`,
        `Aim higher ${userName || 'player'}!`,
        `${userName || 'You'}, your guess is not up to the target.`,
        `Go higher ${getItem(emoji.ouchFeedBack)}.`,
        `A bit too low, ${userName || 'friend'}.`,
        `Think bigger! ${getItem(emoji.ouchFeedBack)}`,
        `That’s under the mark, ${userName || 'buddy'}.`,
        `Try something larger! ${getItem(emoji.ouchFeedBack)}`,
        `You’re below the target. Aim up!`
    ],

    equalTo: [
        `Awesome! ${getItem(emoji.goodFeedBack)} That's correct!`,
        `${getItem(emoji.goodFeedBack)} Ten on Ten! Your input is correct.`,
        `Incredible 😋 that's correct ${getItem(emoji.goodFeedBack)}.`,
        `That's very correct!`,
        `You're UNSTOPPABLE! That's correct!`,
        `You guessed right ${getItem(emoji.goodFeedBack)}.`,
        `Spot on! ${getItem(emoji.goodFeedBack)} Brilliant!`,
        `Boom 💥 You nailed it!`,
        `Perfect shot ${getItem(emoji.goodFeedBack)}.`,
        `🎯 Direct hit! That’s exactly the number!`
    ],

    closeTo: [
        `Almost there ${getItem(emoji.ouchFeedBack)}.`,
        `That's very close, yet less than the number ${getItem(emoji.ouchFeedBack)}.`,
        `Ouch ${getItem(emoji.ouchFeedBack)} You missed by a bit. The target number is higher.`,
        `${getItem(emoji.ouchFeedBack)}...that was so close, try again.`,
        `That's close!`,
        `You tried ${getItem(emoji.goodFeedBack)}, aim again.`,
        `Nearly perfect ${getItem(emoji.ouchFeedBack)}.`,
        `You’re on the edge of glory!`,
        `That’s close! Don’t stop now.`,
        `Almost nailed it! ${getItem(emoji.goodFeedBack)}`
    ],

    welcome: [
        `Welcome ${userName || 'player'}!`,
        `Glad to have you ${getItem(emoji.goodFeedBack)}.`,
        `It’s good to have you!`,
        `You’re most welcome ${userName || 'champ'}!`,
        `Greetings, ${userName || 'friend'}!`,
        `Holla! Ready to play?`,
        `Welcome, let’s get started!`,
        `Hey ${userName || 'legend'} 👋, time to test your luck!`,
        `Ah, the great ${userName || 'player'} enters the arena!`,
        `Welcome aboard ${getItem(emoji.goodFeedBack)} Let’s have some fun!`
    ]
};
