import { emoji, replies, getItem } from "./data.js";
import { db, dbReady } from "./database.js";
import { v4 as uuidv4 } from "uuid";

const inputFeed = document.getElementById("inputFeed"),
  node = document.getElementById("node"),
  trigger = document.getElementById("triggerSend"),
  userName = document.getElementById("userName"),
  currentAmount = document.getElementById("currentAmount");

//define money player gets on game initialization
let cashPrice = 100;

const playerName = () => userName.innerText;

//live scores
let win = document.querySelector("#win span");
let loss = document.querySelector("#loss span");
win.style.color = "#009900";
win.style.paddingLeft = "1px";
loss.style.color = "#ff1a1a";
loss.style.paddingLeft = "1px";
let winCount = 0;
let lossCount = 0;

//a function to update cashPrice
let updateCurrentAmount = function (increment) {
  cashPrice += increment;
  currentAmount.innerText = `$${cashPrice}.00`;
};
//a function that create element and add content to it
function write(sampleText) {
  let element = document.createElement("p");
  element.classList.add("msg-bot");
  node.appendChild(element);
  node.parentElement.scrollTop = node.parentElement.scrollHeight;
  //then...
  //modify sample text
  sampleText = sampleText.split(" ");
  //initially add the first word to the node
  //attach text animation to send message button click event
  //add the first word to the node 5 milliseconds after the send button is clicked
  element.innerText = sampleText[0];
  //initially add the first word to the node
  //then...
  //loop thru the sampleText add each word to the text content of the target node every 200 * index of word.length
  for (let word = 1; word < sampleText.length; word++) {
    window.setTimeout(() => {
      element.innerText += ` ${sampleText[word]}`;
    }, word * 125);
  }
  //add sound to each write() function
  trigger.addEventListener("click", () => {
    newMsgSound.play();
  });
}

function initGamePlay() {
  //if the user provide a name, welcome him
  if (inputFeed.value) {
    //Capitalize the name
    userTextFeed();
    let inputFeedValue = inputFeed.value;
    inputFeedValue = inputFeedValue.split("");
    inputFeedValue[0] = inputFeedValue[0].toUpperCase();
    inputFeedValue = inputFeedValue.join("");
    //write the welcome message
    write(
      `${getItem(replies.welcome)} ${inputFeedValue} ${getItem(emoji.goodFeedBack)}`,
    );
    userName.innerText = inputFeedValue;
    currentAmount.innerText = `$${cashPrice}.00`;
  }
  //then...
  //clear the inputFeed
  //inputFeed.value = '';
}

//function that prints the player responses to the screen
function userTextFeed() {
  //create user input node
  let userInput = document.createElement("p");

  userInput.classList.add("msg-user");

  if (inputFeed.value) {
    node.appendChild(userInput);
    userInput.innerText = inputFeed.value;
    node.parentElement.scrollTop = node.parentElement.scrollHeight;
  }
}

//initialize the game play
write("Provide your name to get started.");

//wrap the initialization in a function  for event controls
async function play() {
  if (!inputFeed.value) return;
  userTextFeed();
  initGamePlay();

  const name = inputFeed.value.toUpperCase();
  await dbReady;

  let player = await db.getPlayer(name);

  if (!player) {
    await db.createPlayer(name);
    player = await db.getPlayer(name);
    await db.saveScore(uuidv4(), player.id, 0, 0, 100);
    window.setTimeout(
      write,
      1000,
      "You have five trials to guess a number. A correct guess awards you $100",
    );
    window.setTimeout(
      write,
      3000,
      `A wrong guess deducts $20 from your balance "${currentAmount.innerText}"`,
    );
    window.setTimeout(write, 5000, `Let's play. Take a guess, highest value is 100`);
  } else {
    const latest = await db.getLatestScore(player.id);
    if (latest) {
      cashPrice = Number(latest.current_amount);
      currentAmount.innerText = `$${cashPrice}.00`;
      win.innerText = `${(winCount = latest.win)}`;
      loss.innerText = `${(lossCount = latest.loss)}`;
    }
    window.setTimeout(
      write,
      1000,
      `Welcome back ${name}. You have $${cashPrice} from your last game`,
    );
    window.setTimeout(write, 1700, `Play on, take a guess. Highest is 100.`);
  }

  trigger.removeEventListener("click", play);
  inputFeed.value = "";
}

//guess value control function & value
const numberGenerator = () => Math.round(Math.random() * 100);
let value = numberGenerator();

//game over control function
let newGame = function () {
  if (inputFeed.value == value) {
    //start a new game if player has more cash
    value = numberGenerator();
    window.setTimeout(
      write,
      2300,
      `Let's play again ${userName.innerText} ${getItem(emoji.goodFeedBack)} Guess the new number`,
    );
    validatePlayerGuess();
  }
};

//new game control function
let gameOver = function (timeOut) {
  //initialize a new game
  if (cashPrice <= 0) {
    const missedNumber = value;
    loss.innerText = `${(lossCount += 1)}`;
    value = numberGenerator();
    cashPrice = 0;
    updateCurrentAmount(100);
    window.setTimeout(
      write,
      timeOut,
      `${getItem(emoji.ouchFeedBack)} Insufficient funds. The number was ${missedNumber}`,
    );
    window.setTimeout(
      write,
      timeOut + timeOut / 4,
      `${getItem(emoji.ouchFeedBack)}. Let\'s play again\!\nTake a guess`,
    );
    validatePlayerGuess();
  }
};
async function updatePlayerData() {
  const name = userName.innerText.toUpperCase();
  if (!name) return;
  const player = await db.getPlayer(name);
  if (player) {
    await db.saveScore(uuidv4(), player.id, winCount, lossCount, cashPrice);
  }
}

//here's the game play
inputFeed.addEventListener("keydown", (e) => {
  if (e.key === "Enter") trigger.click();
});
trigger.addEventListener("click", () => {
  newMsgSound.play();
});
trigger.addEventListener("click", play);
trigger.addEventListener("click", validatePlayerGuess);
trigger.addEventListener("click", () => { gameOver(2500); });
trigger.addEventListener("click", () => { updatePlayerData(); });

//A function to validate Player Guess
function validatePlayerGuess() {
  if (inputFeed.value) {
    //guess = inputFeed.value
    if (inputFeed.value >= value - 5 && inputFeed.value < value) {
      updateCurrentAmount(-20);
      userTextFeed();
      write(getItem(replies.closeTo));
      inputFeed.value = "";
    } else if (inputFeed.value > value) {
      updateCurrentAmount(-20);
      userTextFeed();
      write(getItem(replies.greaterThan));
      inputFeed.value = "";
    } else if (inputFeed.value < value) {
      updateCurrentAmount(-20);
      userTextFeed();
      write(getItem(replies.lessThan));
      inputFeed.value = "";
    } else if (inputFeed.value == value) {
      userTextFeed();
      win.innerText = `${(winCount += 1)}`;
      newGame(1500);
      updateCurrentAmount(100);
      write(getItem(replies.equalTo));
      inputFeed.value = "";
    }
  }
}
