let attempts, score, randomNum;

//fetching all the neccessery html elements from the DOM
const guess = document.getElementById("guess_input");
const submit = document.getElementById("submit_btn");
const hint = document.getElementById("hint");
const attemptsTxt = document.getElementById("attempts");
const restart = document.getElementById("restart_btn");
const scoreTxt = document.getElementById("score");
const guessHistory = document.getElementById("guessHistory");
const guessList = document.getElementById("guessList");
const errorTxt = document.getElementById("errorTxt");

// function for initial configuration used during window refreshes and restarts
function gamestart() {
  attempts = 0;
  score = 10;
  randomNum = Math.floor(Math.random() * 100) + 1;
  guess.disabled = false;
  guess.value = "";
  //hides hints, attempts, scores, and also history and error which will appear during wrong input
  hint.style.display = "none";
  attemptsTxt.style.display = "none";
  scoreTxt.style.display = "none";
  guessHistory.style.display = "none";
  errorTxt.style.display = "none";
  // erases list elements, so history is new
  guessList.innerHTML = "";
}

submit.addEventListener("click", () => {
  const userValue = Number(guess.value);
  // checking if input value is empty  or number out of range
  if (!userValue || userValue < 1 || userValue > 100 || !(Number.isInteger(userValue))) {
    errorTxt.style.display = "block";
    guess.value = "";
    return;
  }

  errorTxt.style.display = "none";
  // at every click of the guess if attempt < 10 then checks if user guessed correctly and during uncorrect answer gives a hint
  if (attempts < 10) {
    let result = "";
    hint.style.display = "block";
    if (userValue === randomNum) {
      hint.textContent = "🎉 Correct!";
      result = "Correct";
      guess.disabled = true;
    } else if (userValue < randomNum) {
      hint.textContent = "📉 Too Low!";
      result = "Too Low";
    } else {
      hint.textContent = "📈 Too high!";
      result = "Too high";
    }
    guess.value = "";
    attempts++;
    score--;

    attemptsTxt.textContent = "Attempts:" + attempts + "/10";
    scoreTxt.textContent = "Score:" + score;
    attemptsTxt.style.display = "block";
    scoreTxt.style.display = "block";
    guessHistory.style.display = "block";

    // creating li
    // ${} - lets you use variable directly inside of ` `
    const newRec = document.createElement("li");
    newRec.innerHTML = `You guessed  <span class="guess_history"> ${userValue} </span>   (${result}) `;
    newRec.classList.add("guess_history"); // adds styling
    guessList.appendChild(newRec); //created element becomes the  element of teh new list

    // case when we did not guess at 10-th attempt  we can not write another input- guess.disabled
    if (attempts === 10 && result !== "Correct") {
      guess.disabled = true;
      hint.textContent = "💥 Game Over!";
    }

    // for better visual puts history into two columns
    if (guessList.children.length >= 5) {
      guessList.style.columnCount = 2;
    } else {
      guessList.style.columnCount = 1;
    }

  }
});

restart.addEventListener("click", gamestart);
window.addEventListener("load", gamestart);
