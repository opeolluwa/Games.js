//a function that take a word and distort the order
let randomizeWord = function(exampleWord) {
  let randomWord = [];
  let randomIndex = [];
  //split the string to use array methods
  exampleWord = exampleWord.toLowerCase().split('');
  //get the indexes
  for (let wordIndex = 0; wordIndex < exampleWord.length; wordIndex++) {
    //make random indexes
    let index = Math.round(Math.random() * (exampleWord.length - 1));
    //ERROR HANDLING : make sure no index is repeated
    while (randomIndex.includes(index)) {
      index = Math.round(Math.random() * (exampleWord.length - 1));
    }
    //hey mama here's the big deal the random index is cooked 🤣
    randomIndex.push(index);
  }
  //fetch the letters that own the index
  for (let elem of randomIndex) {
    randomWord.push(exampleWord[elem]);
  }
  if (randomWord.join('') !== exampleWord.join('')) {
    return [randomWord.join(''), exampleWord.join('')];
  };
}



//word getter function
const wordGetter = (difficultyLevel) => difficultyLevel[Math.round(Math.random() * (difficultyLevel.length - 1))];




//initialize game play
let initializeGamePlay = function(difficultyLevel) {
  document.querySelector('p').innerText = randomizeWord(wordGetter(difficultyLevel));
}
let time = 10;
  document.querySelector('div').innerText = `${time} seconds left`;

const timer = () => {
  if (time > 0) {
    time = time - 1
  }
  if(time ==0 ){
    time = 10;
  }
  document.querySelector('div').innerText = `${time} seconds left`;
  //style.cssconsole.log(time)
}

