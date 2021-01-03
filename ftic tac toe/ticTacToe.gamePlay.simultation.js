//def Players constructor
function Player(playerName) {
 this.playerName = playerName,
  this.cube = document.querySelectorAll('#container div div')
};



//def player methods and props
Player.prototype = {
 constructor: Player,
 //game form parameters 
 move() {
  //inform user of game play
  this.cube.forEach(cube => {
   cube.setAttribute('class', 'fas fa-5x fa-circle-notch');
   cube.style.color = "#ffffff";
   cube.style.padding = "1rem";
   cube.addEventListener('click', () => {
    cube.classList.toggle('fa-times');
    cube.style.color = '#000000';
    cube.style.backgroundColor = 'rgba(255,0,0,1)';
      alert(`Your turn: ${this.playerName}`);

   });
  });

 }
};


//max valid game move round
const MAX_GAME_MOVE = 9;

(function gamePlay() {
 //intantiate players, get names, store locally as player1 and player2
 let player1 = new Player(prompt('player 1: Please provide name', '') || 'Player 1');
 let player2 = new Player(prompt('player 2: Please provide name', '') || 'player 2');
 //game turn 


 let i = 0;
 while (i < MAX_GAME_MOVE) {}
  if (i % 2 == 0) {
   player1.move();
  }
  else {
   player2.move();
  }

  i++;
 
})();
/*
 for (let i = 0; i < MAX_GAME_MOVE; i++) {
  if (i % 2 == 0) {
   player1.move();
  }
  else {
   player2.move();
  }

 }
};
*/


//add value to the element 

//cube.style.backgroundColor = 'red';

/*
cube.forEach(cube => {
 cube.setAttribute('class', 'fas fa-5x fa-circle-notch');
 cube.style.color = '#ffffff';
 cube.addEventListener('click', () => {
  cube.classList.toggle('fa-times');
  cube.style.color = '#000000';
  cube.style.backgroundColor = 'red';
 });
});
cube.forEach(cube => {
 cube.addEventListener('click', ()=>{
  cube.classList.toggle('fa-times');
 });
});
*/