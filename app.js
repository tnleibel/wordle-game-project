
/*-------------------------------- Constants --------------------------------*/
const secretWord = ["Q", "U", "A", "R", "T"]
/*---------------------------- Variables (state) ----------------------------*/
let currentRow
let currentTile
let turn
let winner
let grid
/*------------------------ Cached Element References ------------------------*/
const rulesButton = document.querySelector(".open-modal")
const closeRulesButton = document.querySelector(".close-button")
const rulesOverlay = document.querySelector("#overlay")
const rowsEl = document.querySelectorAll(".row")
const virtualKbdEl = document.querySelector(".virtual-keyboard")
const deleteButtonEl = document.querySelector(".delete-button")
const sumbitButtonEl = document.querySelector(".submit-button")
/*-------------------------------- Functions --------------------------------*/
function init() {
    grid = [
        [],
        [],
        [],
        [],
        [],
        []
    ]
    turn = 1
    currentRow = 0
    currentTile = 0
    winner = false
}
init()

function handleClick(event) {
    if(grid[currentRow].length > 4) {
        return
    }
    if(winner === true) {
        return
    }
    if(event.target.className === "key") {
        grid[currentRow].push(event.target.innerHTML)
        updateGrid()
        currentTile++
    }
}

function deleteTile() {
    currentTile--
    grid[currentRow][currentTile] = ""
    updateGrid()
    grid[currentRow].pop()
}

const checkForWin = (grid, secretWord) => {
    return JSON.stringify(grid[currentRow]) === JSON.stringify(secretWord)
}

function submit() {
    if(grid[currentRow].length < 5) {
        return
    }
    grid[currentRow].forEach((tile, index) => {
        let secretWordLetter = secretWord[index]
        if(tile === secretWord[index]) {
            rowsEl[currentRow].children[index].style.backgroundColor = "green"
        } else if (secretWord.includes(tile) === true && grid.indexOf(tile) !== secretWord.indexOf(secretWordLetter)) {
            rowsEl[currentRow].children[index].style.backgroundColor = "yellow"
        } else {
            rowsEl[currentRow].children[index].style.backgroundColor = "grey"
        }
    })
    if(checkForWin(grid, secretWord)) {
        winner = true
    }
    currentRow++
    currentTile = 0
}

function updateGrid() {
        rowsEl[currentRow].children[currentTile].innerHTML = grid[currentRow][currentTile]
}

function openModal() {
    modal.classList.add("active")
    rulesOverlay.classList.add("active")
}

function closeModal() {
    modal.classList.remove("active")
    rulesOverlay.classList.remove("active")
}


/*----------------------------- Event Listeners -----------------------------*/
rulesButton.addEventListener("click", () => {
    const modal = document.querySelector(".modal")
    openModal(modal)
})

closeRulesButton.addEventListener("click", () => {
    const modal = document.querySelector(".modal")
    closeModal(modal)
})

virtualKbdEl.addEventListener("click", handleClick)

deleteButtonEl.addEventListener("click", deleteTile)

sumbitButtonEl.addEventListener("click", submit)

