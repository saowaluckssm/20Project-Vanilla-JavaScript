const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];


let randomWord;
let score = 0;
let time = 10;

// Set difficlty 
let difficulty = localStorage.getItem("difficlty") !== null ? localStorage.getItem("difficlty") : "medium";

// Set difficlty select value
difficultySelect.value = localStorage.getItem("difficlty") !== null ? localStorage.getItem("difficlty") : "medium";


// Focus on input
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];

}

// Add Dom
const addWordToDOM = () => {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

// Update Score

const updateScore = () => {
  score++
  scoreEl.innerText = score;
}

// Gameover
const gameOver = () => {
  endgameEl.innerHTML = `
   <h1>Time ran out</h1>
   <p>Your final score is ${score} </p>
   <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = "flex";

}


function updateTime() {
  time--;
  timeEl.innerText = time + "s";

  if( time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }

 
}

addWordToDOM();


// Typing
text.addEventListener("input", event => {
  const insertedText = event.target.value;
  
  if(insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    event.target.value = "";

    if ( difficulty === "hard") {
      time += 2;
    } else if ( difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }
    
    updateTime();

  }

});

// Settings btn click
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

// Setting select
settingsForm.addEventListener("change", e => {
  difficulty = e.target.value;
  console.log(difficulty);
  localStorage.setItem("difficlty", difficulty);
})


