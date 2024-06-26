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
const rowsEl = document.querySelectorAll(".row")
const virtualKbdEl = document.querySelector(".virtual-keyboard")
const deleteButtonEl = document.querySelector(".delete-button")
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
    if(event.target.className === "key") {
        grid[currentRow].push(event.target.innerHTML)
        updateGrid()
        currentTile++
    }
}

function deleteTile() {
    grid[currentRow].pop()
    updateGrid()
    currentTile--
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

