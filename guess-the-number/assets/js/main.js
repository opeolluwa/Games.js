//refrence user input feed 
let inputFeed = document.getElementById('inputFeed');

//refrence the root node
var node = document.getElementById('node');

/*refrence the send button*/
var trigger = document.getElementById('triggerSend');

/*refrence the player userName node*/
let userName = document.getElementById('userName');

//refrence the player cash Price node
let currentAmount = document.getElementById('currentAmount');

//define money player gets on game initialization
let cashPrice = 100;

const playerName = () => userName.innerText;

//a function that get random element from objects
let getItem = function(object) {
  let index = Math.round(Math.random() * (object.length - 1))
  return object[index];
}

//live scores
let win = document.querySelector('#win span');
let loss = document.querySelector('#loss span');
win.style.color = '#009900';
win.style.paddingLeft = '1px';
loss.style.color = '#ff1a1a';
loss.style.paddingLeft = '1px';
let winCount = 0;
let lossCount = 0;
let emoji = {

  //define happy emojis
  goodFeedBack: [
     '😊', '😘', '🤗',
     '💞', '💝', '💓',
     '💖', '💓', '😍',
     '😝', '👐', '😚'
     ],

  //define sad emojis
  ouchFeedBack: [
    '😣', '😭', '😩',
    '😟', '😤', '😢',
    '😒', '😌', '😔',
    '😬', '🤧']
};

//an object with text flow control
let replies = {
  //an array of validatePlayerGuess fuction feedback messages
  greaterThan: [
        `Try again, your current input  is greater that the number`,
        `Exceeding\!\n Try a lesser value`,
        `That's over the top \n, try something lower`,
        `Ouch! that's way more than the target`
        ],


  //an array of validatePlayerGuess fuction feedback messages
  lessThan: [
      `Ouch\! ${getItem(emoji.ouchFeedBack)} your guess is less than the number ${getItem(emoji.ouchFeedBack)}`,
      `${getItem(emoji.ouchFeedBack)}Try something greater, current input is less than target`,
      `Aim higher ${userName.innerText}.`,
      `${userName.innerText}, your guess is not up to the target.`
       ],


  //an array of validatePlayerGuess fuction feedback messages
  equalTo: [
        `Awesome!  ${getItem(emoji.goodFeedBack)}that's correct.`,
        `${getItem(emoji.goodFeedBack)} Ten on Ten \!, your input is correct`,
        `Incredible😋 that's correct ${getItem(emoji.goodFeedBack)}`,
        `That's very correct`,
        `You're UNSTOPPABLE\! That's correct `,
        `You guessed right ${getItem(emoji.goodFeedBack)}`
        ],


  //an array of validatePlayerGuess fuction feedback messages
  closeTo: [
        `Almost there.${getItem(emoji.ouchFeedBack)}`,
       `That's very close yet less than the number.${getItem(emoji.ouchFeedBack)}.`,
        `Ouch ${getItem(emoji.ouchFeedBack)} You miss a bit. The target Number is a higher.`,
        `${getItem(emoji.ouchFeedBack)}...that was so close , try again.`,
        `That's close `,
        `You tried ${getItem(emoji.goodFeedBack)}, aim again`
        ],


  //an array of welcome messages
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



//a function to update cashPrice
let updateCurrentAmount = function(increment) {
  cashPrice += increment;
  currentAmount.innerText = `$${cashPrice}.00`;
}
//css Object model for async element => 
let elementStyles = {
  maxWidth: '45%',
  backgroundColor: '#1FC5C8',
  padding: '5px 9px',
  borderRadius: '8px 25px 25px 18px',
  marginBottom: '2.5px'
}



//a fuctiin that create element and add content to it
function write(sampleText) {
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




function initGamePlay() {
  //if the user provide a name, welcome him
  if (inputFeed.value) {
    //Capitalize the name 
    userTextFeed();
    let inputFeedValue = inputFeed.value;
    inputFeedValue = inputFeedValue.split('');
    inputFeedValue[0] = inputFeedValue[0].toUpperCase();
    inputFeedValue = inputFeedValue.join('');
    //write the welcome message
    write(`${getItem(replies.welcome)} ${inputFeedValue} ${getItem(emoji.goodFeedBack)}`)
    userName.innerText = inputFeedValue;
    currentAmount.innerText = `$${cashPrice}.00`;
  }
  //then...
  //clear the inputFeed
  //inputFeed.value = '';
}




//function tht print the player responses to the screen
function userTextFeed() {
  //create user input node
  let userInput = document.createElement('p');

  //add css to element
  Object.assign(userInput.style, {
    maxWidth: '45%',
    backgroundColor: '#1FC5C8',
    color: '#fff',
    padding: '5px 9px',
    borderRadius: '18px',
    marginTop: '-1rem',
    position: 'absolute',
    right: '0',
  });

  if (inputFeed.value) {
    //add the element to the root node
    node.appendChild(userInput)
    userInput.innerText = inputFeed.value;
  }
}


//initialize the game play
write('Provide your name to get started.');



//wrap the initialization in a function  for event controls
function play() {
  userTextFeed();
  initGamePlay()
  if (localStorage.getItem(inputFeed.value.toUpperCase()) === null) {
    window.setTimeout(write, 1000, 'You have five trials to guess a number. A correct guess award you $100');
    window.setTimeout(write, 3000, `a wrong one deduct $20 from  your current balance "${currentAmount.innerText}"`)
    window.setTimeout(write, 5000, `Let\'s play.\nTake a guess,\nhighest value is ${100}`)
  }
  else {
    window.setTimeout(write, 1000, `${inputFeed.value.toUpperCase()}. You have ${JSON.parse(localStorage.getItem(inputFeed.value.toUpperCase())).cash/20} trials left from last game and $${JSON.parse(localStorage.getItem(inputFeed.value.toUpperCase())).cash}`);
    window.setTimeout(write, 1700, `Play on, take a guess. The least is ${100 - value}; highest remains 100.`)
  }
  trigger.removeEventListener('click', play)

}




//guess value control function & value
const numberGenerator = () => Math.round(Math.random() * 100);
let value = numberGenerator();



//game over control function
let newGame = function() {
  if (inputFeed.value == value) {
    //start a new game if player has more cash
    value = numberGenerator();
    window.setTimeout(write, 2300, `Let's play again ${userName.innerText} ${getItem(emoji.goodFeedBack)} Guess the new number`);
    validatePlayerGuess();
  }
}

//new game control function
let gameOver = function(timeOut) {
  //initialize a new game
  if (cashPrice <= 0) {
    loss.innerText = `${lossCount+=1}`;
    value = numberGenerator();
    cashPrice = 0;
    updateCurrentAmount(100);
    window.setTimeout(write, timeOut, `${getItem(emoji.ouchFeedBack)}Insufficient funds; unable to continue`);
    window.setTimeout(write, (timeOut + (timeOut / 4)), `${getItem(emoji.ouchFeedBack)}. Let\'s play again\!\nTake a guess`);
    validatePlayerGuess();
  }
}
/*==================database control module==========================================*/
/* its a two way gate here, if player exist fetch the player data, else makea new player*/
let modPlayerData = {};

function makePlayer() {
  if (localStorage.getItem(inputFeed.value.toUpperCase()) === null) {

    //make a player object to keep track of user data
    class PLAYER {
      //player constructor
      constructor(name, cash, win = 0, loss = 0) {
        this.name = name,
          this.cash = cash,
          this.win = win,
          this.loss = loss
      }
      // a function that instantiate player Id in database
      playerId = () => `$${Date.now()}`
      //stringify data
      stringify = () => JSON.stringify(new PLAYER(inputFeed.value.toUpperCase()))
    }
    // store the player data using real player name
    localStorage.setItem(inputFeed.value.toUpperCase(), new PLAYER(inputFeed.value.toUpperCase()).stringify());
    //parse the made player data as JSON Object
    modPlayerData = JSON.parse(localStorage.getItem(inputFeed.value.toUpperCase()))
  }
  /*code block.for player existence
  ==> fet the data into variable retrievedPlayerData
  ==> update the nodes  value & scores
  */
  else {
    let retrievedPlayerData = JSON.parse(localStorage.getItem(inputFeed.value.toUpperCase()));
    //the update
    cashPrice = retrievedPlayerData.cash;
    currentAmount.innerText = `$${cashPrice}.00`;
    win.innerText = `${ winCount =retrievedPlayerData.win}`;
    loss.innerText = `${ lossCount =retrievedPlayerData.loss}`;
  }
  //error handling
  trigger.removeEventListener('click', makePlayer);
  inputFeed.value = '';
};

//a function to update the database
function updatePlayerData() {
  //update current amount from current amount node 
  modPlayerData.cash = cashPrice;
  //update current score from current amount node 
  modPlayerData.win = winCount;
  modPlayerData.loss = lossCount;

  //update database
  localStorage.setItem(document.getElementById("userName").innerText.toUpperCase(), JSON.stringify(modPlayerData))
  //fetch data
  let data = localStorage.getItem(document.getElementById("userName").innerText.toUpperCase())
  //log data
  console.log(data)
}
/*==================database control module end==========================================*/

//here's the game play
trigger.addEventListener('click', () => { newMsgSound.play() });
trigger.addEventListener('click', play);
trigger.addEventListener('click', validatePlayerGuess);
//trigger.addEventListener('click', newGame);
trigger.addEventListener('click', () => {
  gameOver(2500);
})
trigger.addEventListener('click', makePlayer);
trigger.addEventListener('click', updatePlayerData);

//A function to validate Player Guess
function validatePlayerGuess() {
  if (inputFeed.value) {
    //guess = inputFeed.value
    if (inputFeed.value >= value - 5 && inputFeed.value < value) {
      updateCurrentAmount(-20);
      userTextFeed();
      write(getItem(replies.closeTo));
      inputFeed.value = "";
    }
    else if (inputFeed.value > value) {
      updateCurrentAmount(-20);
      userTextFeed();
      write(getItem(replies.greaterThan));
      inputFeed.value = "";
    }
    else if (inputFeed.value < value) {
      updateCurrentAmount(-20);
      userTextFeed();
      write(getItem(replies.lessThan));
      inputFeed.value = "";
    }
    else if (inputFeed.value == value) {
      userTextFeed();
      win.innerText = `${winCount+=1}`;
      newGame(1500);
      updateCurrentAmount(100);
      write(getItem(replies.equalTo));
      inputFeed.value = "";
    }
  }

}