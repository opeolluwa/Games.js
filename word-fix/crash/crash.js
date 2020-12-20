/*let words = fetch('build/mod-word.txt');
words.then(json => json.text())
  .then((json) => {
    let holder = [];
    let wordArr = json.split(',');
    for (let elem of wordArr) {
      holder.push(`['${elem}']`);
    }
    document.querySelector('button').onclick = function() {
      document.body.innerText = holder;
    }
  });*/



/*
let filterWords = fetch('build/words.json');

filterWords.then((response) => response.json())
  .then(json => {
    let holder = [];
    for (let elem of json) {
      if (elem.toString().length >=9) {
        holder.push(`["${elem}"]`)
      }
    }
    document.querySelector('button').onclick = function() {
      document.body.innerText = holder;
    }
  });*/
