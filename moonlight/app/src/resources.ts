import { getItem } from "./utils.ts";

let userName = ""; // TODO: dynamically set from actual player class

export const emoji = {
  goodFeedBack: [
    "😊", "😘", "🤗", "💞", "💝", "💓", "💖", "😍", "😝", "👐", "😚",
    "😄", "😎", "👏", "🙌", "🌟", "🔥", "💪", "🥳", "🤩", "💥", "✨",
  ],
  ouchFeedBack: [
    "😣", "😭", "😩", "😟", "😤", "😢", "😒", "😌", "😔", "😬", "🤧",
    "🥺", "🙃", "😖", "😕", "😫", "😵", "🤕", "😿", "🥹",
  ],
};

export const replies = {
  greaterThan: [
    `Try again, your guess is greater than the target.`,
    `That’s too high! ${getItem(emoji.ouchFeedBack)}`,
    `Overshot it, ${userName || "player"} — go a bit lower.`,
    `Whoa! ${getItem(emoji.ouchFeedBack)} Too high!`,
    `That number’s flying over the moon! Try smaller.`,
    `You’re overshooting ${userName || "buddy"}!`,
    `Easy there ${getItem(emoji.ouchFeedBack)} that’s higher than needed.`,
    `You went too far ${userName || "friend"} — aim lower.`,
    `Close, but too high ${getItem(emoji.ouchFeedBack)}.`,
    `Overestimated 😅! The number’s smaller.`,
    `That’s way up there! Bring it down a notch.`,
    `Almost! ${getItem(emoji.ouchFeedBack)} Just a bit less.`,
  ],

  lessThan: [
    `Ouch! ${getItem(emoji.ouchFeedBack)} your guess is less than the number.`,
    `${getItem(emoji.ouchFeedBack)} Try something greater.`,
    `Aim higher ${userName || "player"}!`,
    `${userName || "You"}, that’s below the target.`,
    `Go higher ${getItem(emoji.ouchFeedBack)}.`,
    `Think bigger ${userName || "friend"}!`,
    `You’re below the mark. Push it up.`,
    `That’s too low, ${userName || "buddy"}!`,
    `Up, up, up! ${getItem(emoji.ouchFeedBack)}.`,
    `Try a larger number.`,
    `So close ${getItem(emoji.ouchFeedBack)}! Just a bit higher.`,
    `Tiny guess! ${userName || "champ"} go bigger!`,
  ],

  equalTo: [
    `Awesome! ${getItem(emoji.goodFeedBack)} That's correct!`,
    `🎯 Bang on! You guessed it right!`,
    `${getItem(emoji.goodFeedBack)} Ten on ten! That’s correct.`,
    `Incredible ${userName || "player"}! ${getItem(emoji.goodFeedBack)}`,
    `Boom 💥 You nailed it!`,
    `Perfect guess! ${getItem(emoji.goodFeedBack)}`,
    `Spot on! ${getItem(emoji.goodFeedBack)} Brilliant!`,
    `You’re a natural! ${getItem(emoji.goodFeedBack)}`,
    `That’s exactly the number! 🎯`,
    `Excellent work ${userName || "player"}!`,
    `You’re unstoppable! ${getItem(emoji.goodFeedBack)}`,
    `Unbelievable precision ${getItem(emoji.goodFeedBack)}!`,
  ],

  closeTo: [
    `Almost there ${getItem(emoji.ouchFeedBack)}.`,
    `That’s very close, just off by a bit.`,
    `So close ${userName || "player"}! ${getItem(emoji.goodFeedBack)}`,
    `Nearly perfect — try again!`,
    `That was close! ${getItem(emoji.ouchFeedBack)}`,
    `Almost nailed it! ${getItem(emoji.goodFeedBack)}`,
    `You’re on the edge of glory!`,
    `Just missed it ${userName || "buddy"}.`,
    `That’s close — don’t stop now!`,
    `Right next door! ${getItem(emoji.goodFeedBack)}`,
    `You can almost taste victory! ${getItem(emoji.goodFeedBack)}`,
    `Keep going, you’re so close!`,
  ],

  welcome: [
    `Welcome ${userName || "player"}! ${getItem(emoji.goodFeedBack)}`,
    `Glad to have you here ${getItem(emoji.goodFeedBack)}.`,
    `It’s good to have you ${userName || "champ"}!`,
    `Greetings, ${userName || "friend"}! Let’s begin!`,
    `Hey ${userName || "legend"} 👋 Ready to play?`,
    `Ah, the great ${userName || "player"} enters the arena!`,
    `Welcome aboard ${getItem(emoji.goodFeedBack)} Let’s have fun!`,
    `Let’s light it up ${userName || "player"}! ${getItem(emoji.goodFeedBack)}`,
    `Yo ${userName || "friend"}! Let’s see your guessing skills 🔥`,
    `Welcome ${userName || "player"}! The moonlight awaits 🌙`,
    `Holla ${userName || "star"}! Let’s test your luck!`,
    `Step right in ${getItem(emoji.goodFeedBack)} Game time!`,
  ],
};
