import { trigger, inputFeed, cashPrice, winCount, lossCount, userName } from './main.js';
let modPlayerData = {};

function makePlayer() {


  if (localStorage.getItem(inputFeed.value.toUpperCase()) === null) {

    //make a player object to keep track of user data
    class PLAYER {
      //player constructor
      constructor(name, cash = 100, win = 0, loss = 0) {
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

    //  make random player id's to hold real player name
    //then store the player data using real player name
    localStorage.setItem(inputFeed.value.toUpperCase(), new PLAYER(inputFeed.value.toUpperCase()).stringify());
    //present player data as JSON Object
    modPlayerData = JSON.parse(localStorage.getItem(inputFeed.value.toUpperCase()))
    // console.log(rawPlayerData)
    
  }
  else{ console.log(JSON.parse(localStorage.getItem(inputFeed.value.toUpperCase())))
  
  
  cashPrice = JSON.parse(localStorage.getItem(inputFeed.value.toUpperCase())).cash;
}
trigger.removeEventListener('click', makePlayer);
inputFeed.value = '';
};


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
  //console.log(data)


}

console.log(localStorage.getItem("ZEUS"))

trigger.addEventListener('click', makePlayer);
trigger.addEventListener('click', updatePlayerData);