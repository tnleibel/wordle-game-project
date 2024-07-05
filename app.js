/*-------------------------------- Constants --------------------------------*/
import { words } from "./data.js";
const letterKeys = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const letterEval = {};
/*---------------------------- Variables (state) ----------------------------*/
let currentRow;
let currentTile;
let turn;
let winner;
let grid;
let secretWord;
/*------------------------ Cached Element References ------------------------*/
const rulesButton = document.querySelector(".open-modal");
const closeRulesButton = document.querySelector(".close-button");
const rulesOverlay = document.querySelector("#overlay");
const rowsEl = document.querySelectorAll(".row");
const virtualKbdEl = document.querySelector(".virtual-keyboard");
const deleteButtonEl = document.querySelector(".delete-button");
const sumbitButtonEl = document.querySelector(".submit-button");
const keyboardKeys = document.querySelectorAll(".key");
const messageEl = document.querySelector(".message");
/*-------------------------------- Functions --------------------------------*/
function init() {
  grid = [[], [], [], [], [], []];
  turn = 1;
  currentRow = 0;
  currentTile = 0;
  winner = false;
  generateWord()
}
init();

function generateWord() {
  const randomWordIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomWordIndex];
  secretWord = randomWord.split("");
}

function handleClick(event) {
  if (grid[currentRow].length > 4) {
    return;
  }
  if (winner === true) {
    return;
  }
  if (event.target.className.split(" ").includes("key")) {
    grid[currentRow].push(event.target.innerHTML);
    updateGrid();
    currentTile++;
  }
}

function handleKeystroke(event) {
  if (turn > 6) {
    return;
  }
  if (grid[currentRow].length > 4 && letterKeys.includes(event.key)) {
    return;
  }
  if (winner === true) {
    return;
  }
  if (letterKeys.includes(event.key)) {
    grid[currentRow].push(event.key);
    updateGrid();
    currentTile++;
  } else if (event.key === "Enter") {
    submit();
  } else if (event.key === "Backspace") {
    deleteTile();
  }
}

function deleteTile() {
  if (turn > 6) {
    return;
  }
  if (currentTile === 0) {
    return;
  }
  currentTile--;
  grid[currentRow][currentTile] = "";
  updateGrid();
  grid[currentRow].pop();
}

const checkForWin = (grid, secretWord) => {
  return JSON.stringify(grid[currentRow]) === JSON.stringify(secretWord);
};

function advanceTurn() {
  turn++;
  currentRow++;
  currentTile = 0;
}

function submit() {
  if (turn > 6) {
    return;
  }
  if (grid[currentRow].length < 5) {
    return;
  }
  const currentGuess = grid[currentRow].join("");
  const animatedRow = rowsEl[currentRow];
  if (!words.some((word) => word === currentGuess)) {
    rowsEl[currentRow].classList.add("move-left-right");
    animatedRow.addEventListener("animationend", endAnimation);
    return;
  }
  let turningIndex = currentRow;
  grid[turningIndex].forEach((tile, index) => {
    processGuessedLetter(tile, index, turningIndex, currentGuess);
  });
  updateKeyboard();
  if (checkForWin(grid, secretWord)) {
    winner = true;
  } else {
    advanceTurn();
  }
  updateMessage();
}

function processGuessedLetter(tile, index, turningIndex, currentGuess) {
  let secretWordLetter = secretWord[index];
  if (tile === secretWord[index]) {
    setTimeout(() => {
      rowsEl[turningIndex].children[index].classList.add(
        "flip-horizontal-top",
        "background-green"
      );
    }, index * 250);
    setLetterEval(tile, "valid");
    return;
  }
  if (
    secretWord.includes(tile) === true &&
    grid.indexOf(tile) !== secretWord.indexOf(secretWordLetter)
  ) {
    const lettersBefore = currentGuess.slice(0, index);
    const lettersAfter = currentGuess.slice(turningIndex, index);
    if (!lettersBefore.includes(tile)) {
      setTimeout(() => {
        rowsEl[turningIndex].children[index].classList.add(
          "flip-horizontal-top",
          "background-yellow"
        );
      }, index * 250);
      setLetterEval(tile, "semivalid");
      return;
    }
  }
  setTimeout(() => {
    rowsEl[turningIndex].children[index].classList.add(
      "flip-horizontal-top",
      "background-grey"
    );
  }, index * 250);
  setLetterEval(tile, "invalid");
}

function setLetterEval(key, state) {
  const currentValue = letterEval[key];
  if (currentValue !== null) {
    if (currentValue === "valid") {
      return;
    }
    if (currentValue === "semivalid" && state === "valid") {
      letterEval[key] = "valid";
    }
    if (currentValue === "invalid") {
      return;
    }
  }
  letterEval[key] = state;
}

function updateGrid() {
  rowsEl[currentRow].children[currentTile].innerHTML =
    grid[currentRow][currentTile];
}

function updateKeyboard() {
  keyboardKeys.forEach((keyEl) => {
    const currentLetter = keyEl.innerHTML;
    const currentValue = letterEval[currentLetter];
    keyEl.classList.remove(
      "key-background-green",
      "key-background-yellow",
      "key-background-grey"
    );
    switch (currentValue) {
      case "valid":
        keyEl.classList.add("key-background-green");
        break;
      case "semivalid":
        keyEl.classList.add("key-background-yellow");
        break;
      case "invalid":
        keyEl.classList.add("key-background-grey");
        break;
      default:
        break;
    }
  });
}

function updateMessage() {
  if (!winner && turn <= 6) {
    return;
  }
  if (!winner && turn > 6) {
    messageEl.innerHTML = `You Lose! The Secret Word Was ${secretWord
      .join("")
      .toUpperCase()}.`;
  }
  if (winner) {
    messageEl.innerHTML = "You Win!";
  }
}

function openModal() {
  modal.classList.add("active");
  rulesOverlay.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
  rulesOverlay.classList.remove("active");
}

function endAnimation() {
  rowsEl[currentRow].classList.remove("move-left-right");
}
/*----------------------------- Event Listeners -----------------------------*/
rulesButton.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  openModal(modal);
});

closeRulesButton.addEventListener("click", () => {
  const modal = document.querySelector(".modal");
  closeModal(modal);
});

document.addEventListener("keydown", handleKeystroke);

virtualKbdEl.addEventListener("click", handleClick);

deleteButtonEl.addEventListener("click", deleteTile);

sumbitButtonEl.addEventListener("click", submit);
