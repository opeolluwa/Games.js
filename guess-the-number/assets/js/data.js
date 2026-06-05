export const getItem = (object) => {
  let index = Math.round(Math.random() * (object.length - 1));
  return object[index];
};

export const emoji = {
  goodFeedBack: [
    "😊",
    "😘",
    "🤗",
    "💞",
    "💝",
    "💓",
    "💖",
    "💓",
    "😍",
    "😝",
    "👐",
    "😚",
  ],
  ouchFeedBack: [
    "😣",
    "😭",
    "😩",
    "😟",
    "😤",
    "😢",
    "😒",
    "😌",
    "😔",
    "😬",
    "🤧",
  ],
};

export const replies = {
  greaterThan: [
    `Try again, your current input  is greater than the number`,
    `Exceeding\!\n Try a lesser value`,
    `That's over the top \n, try something lower`,
    `Ouch! that's way more than the target`,
  ],
  lessThan: [
    `Ouch\! ${getItem(emoji.ouchFeedBack)} your guess is less than the number ${getItem(emoji.ouchFeedBack)}`,
    `${getItem(emoji.ouchFeedBack)}Try something greater, current input is less than target`,
    `Aim higher.`,
    `Your guess is not up to the target.`,
  ],
  equalTo: [
    `Awesome!  ${getItem(emoji.goodFeedBack)}that's correct.`,
    `${getItem(emoji.goodFeedBack)} Ten on Ten \!, your input is correct`,
    `Incredible😋 that's correct ${getItem(emoji.goodFeedBack)}`,
    `That's very correct`,
    `You're UNSTOPPABLE\! That's correct `,
    `You guessed right ${getItem(emoji.goodFeedBack)}`,
  ],
  closeTo: [
    `Almost there.${getItem(emoji.ouchFeedBack)}`,
    `That's very close yet less than the number.${getItem(emoji.ouchFeedBack)}.`,
    `Ouch ${getItem(emoji.ouchFeedBack)} You missed a bit. The target Number is higher.`,
    `${getItem(emoji.ouchFeedBack)}...that was so close , try again.`,
    `That's close `,
    `You tried ${getItem(emoji.goodFeedBack)}, aim again`,
  ],
  welcome: [
    "Welcome",
    "Glad to have you",
    "It's good to have you",
    "You're most welcome",
    "Greetings",
    "Holla\!",
    "Welcome, let's get started",
  ],
};
