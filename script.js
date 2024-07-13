const cells = document.querySelectorAll("[data-cell]");
const messageText = document.getElementById("message");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", restartGame);

function handleCellClick() {
    console.log("Cell clicked"); // Test if the click event is triggered
}

function restartGame() {
    console.log("Restart button clicked"); // Test if the restart button click event is triggered
}
const handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = parseInt(cell.getAttribute("data-index"));

    if (gameState[cellIndex] !== "" || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.color = currentPlayer === "X" ? "#ff6347" : "#87ceeb";

    if (checkWin()) {
        endGame(false);
    } else if (checkDraw()) {
        endGame(true);
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (currentPlayer === "O") {
            setTimeout(makeSystemMove, 500); // Delay for system move
        }
    }
};

const makeSystemMove = () => {
    // Find an empty cell and make a move
    const emptyCells = gameState.reduce((acc, cell, index) => {
        if (cell === "") acc.push(index);
        return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const systemMoveIndex = emptyCells[randomIndex];

    gameState[systemMoveIndex] = currentPlayer;
    cells[systemMoveIndex].textContent = currentPlayer;
    cells[systemMoveIndex].style.color = currentPlayer === "X" ? "#ff6347" : "#87ceeb";

    if (checkWin()) {
        endGame(false);
    } else if (checkDraw()) {
        endGame(true);
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player after system move
    }
};

const checkWin = () => {
    return winningConditions.some((condition) => {
        return condition.every((index) => {
            return gameState[index] === currentPlayer;
        });
    });
};

const checkDraw = () => {
    return gameState.every((cell) => {
        return cell !== "";
    });
};

const endGame = (draw) => {
    if (draw) {
        messageText.textContent = "It's a Draw!";
    } else {
        messageText.textContent = `${currentPlayer} Wins!`;
    }
    gameActive = false;
};

const restartGame = () => {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    messageText.textContent = "";
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.style.color = "white";
    });

    // If system starts the game
    if (currentPlayer === "O") {
        setTimeout(makeSystemMove, 500); // Delay for system move
    }
};

cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", restartGame);

// Call restartGame to start a new game
restartGame();
