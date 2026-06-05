import { gsap } from "gsap";
import confetti from "canvas-confetti";
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
let gameStarted = false;

//a function to update cashPrice
let updateCurrentAmount = function (increment) {
  cashPrice += increment;
  currentAmount.innerText = `$${cashPrice}.00`;
  gsap.fromTo(
    currentAmount,
    { scale: 1.35, color: increment > 0 ? "#1FC5C8" : "#ff4444" },
    { scale: 1, color: "#1FC5C8", duration: 0.45, ease: "back.out(2)", overwrite: true }
  );
};
//a function that create element and add content to it
function write(sampleText) {
  let element = document.createElement("p");
  element.classList.add("msg-bot");
  node.appendChild(element);
  node.parentElement.scrollTop = node.parentElement.scrollHeight;
  gsap.from(element, { opacity: 0, x: -20, duration: 0.3, ease: "power2.out" });
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
    gsap.from(userInput, { opacity: 0, x: 20, duration: 0.25, ease: "power2.out" });
  }
}

//initialize the game play
gsap.from("header", { y: -50, opacity: 0, duration: 0.6, ease: "power3.out" });

gsap.fromTo(".greenstick-left",
  { rotation: -6 },
  { rotation: 7, transformOrigin: "50% 100%", duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" }
);
gsap.fromTo(".greenstick-right",
  { rotation: 6 },
  { rotation: -7, transformOrigin: "50% 100%", duration: 3.3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.9 }
);

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
  gameStarted = true;
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
    gsap.fromTo(loss, { scale: 1.6 }, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)", overwrite: true });
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
  if (!gameStarted) return;
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

function spawnBalloons() {
  const palette = ["#E8927C", "#5a8a80", "#F0B429", "#6BB5C9", "#D4A0E8", "#1FC5C8"];
  for (let i = 0; i < 6; i++) {
    const color = palette[i % palette.length];
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 50 90");
    const leftPct = 8 + i * 14 + (Math.random() * 6 - 3);
    Object.assign(svg.style, {
      position: "fixed", bottom: "-110px", left: `${leftPct}%`,
      width: "46px", zIndex: "998", pointerEvents: "none",
    });
    svg.innerHTML = `
      <ellipse cx="25" cy="28" rx="19" ry="24" fill="${color}" opacity="0.92"/>
      <path d="M19 50 Q25 57 31 50" stroke="${color}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M25 57 Q29 70 25 88" stroke="rgba(255,255,255,0.45)" stroke-width="1.3" fill="none"/>
    `;
    document.body.appendChild(svg);
    gsap.to(svg, {
      y: -(window.innerHeight + 160),
      x: (Math.random() - 0.5) * 90,
      rotation: (Math.random() - 0.5) * 18,
      duration: 3.2 + i * 0.25 + Math.random() * 1.2,
      delay: i * 0.18,
      ease: "power1.out",
      onComplete: () => svg.remove(),
    });
  }
}

function fireConfetti() {
  const colors = ["#E8927C", "#5a8a80", "#F0B429", "#6BB5C9", "#1FC5C8", "#ffffff"];
  confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors });
  window.setTimeout(() => {
    confetti({ particleCount: 50, angle: 60,  spread: 55, origin: { x: 0, y: 0.7 }, colors });
    confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors });
  }, 280);
}

function winFlash() {
  const flash = document.createElement("div");
  Object.assign(flash.style, {
    position: "fixed", inset: "0",
    background: "rgba(255, 215, 50, 0.28)",
    zIndex: "997", pointerEvents: "none",
  });
  document.body.appendChild(flash);
  gsap.to(flash, { opacity: 0, duration: 0.75, ease: "power2.out", onComplete: () => flash.remove() });
}

function celebrateWin() {
  winFlash();
  fireConfetti();
  spawnBalloons();
}

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
      gsap.fromTo(win, { scale: 1.6 }, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)", overwrite: true });
      newGame(1500);
      updateCurrentAmount(100);
      write(getItem(replies.equalTo));
      celebrateWin();
      inputFeed.value = "";
    }
  }
}
