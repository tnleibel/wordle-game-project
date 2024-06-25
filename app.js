/*-------------------------------- Constants --------------------------------*/
const secretWord = ["", "", "", "", ""]

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
const gridEl = document.querySelectorAll(".sqr")
/*-------------------------------- Functions --------------------------------*/
function init() {
    grid = [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
    ]
    turn = 1
    currentRow = 0
    currentTile = 0
    winner = false
}
init()

function updateGrid() {
    grid.forEach((square, index) => {
        gridEl[index].innerHTML = grid[currentRow, index]
    })
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


