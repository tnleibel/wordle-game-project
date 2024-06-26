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
const virtualKbdEl = document.querySelector(".virtual-keyboard")
/*-------------------------------- Functions --------------------------------*/
function init() {
    grid = [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""]
    ]
    turn = 1
    currentRow = 0
    currentTile = 0
    winner = false
}
init()

function handleClick(event) {
    if(event.target.className === "key") {
        grid[currentRow][currentTile] = event.target.innerHTML
        console.log(event.target.innerHTML)
        console.log(grid)
        updateGrid()
    }
    
}

function updateGrid() {
    for(i = 0; i < grid.length; i++) {
        let tile = grid[i]
        for(let j = 0; j < tile.length; j++) {
            gridEl.innerHTML = grid[i][j]
        }
    }
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

