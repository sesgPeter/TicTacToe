/* 
Select the board element from the DOM
*/
const board = document.getElementById('board');

/* 
Select all the cells (divs with the class "cell") from the DOM
*/

const cells = document.querySelectorAll('.cell');

/* 
Initialize the current player to 'X'
*/
let currentPlayer = 'X';

/* 
Create an array to track the state of the game board (null means the cell is empty)
*/
let gameState = Array(9).fill(null);

/*
Define all possible winning combinations (rows, columns, and diagonals)
*/
const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
];


/*  
Function to handle a player's move when a cell is clicked
*/
function handleClick(event) {
    /*
    Get the clicked cell and its index
    */
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    /* 
    If the cell is already filled or the game is won, do nothing
    */
    if (gameState[index] || checkWinner()) {
        return;
    }

    /* 
    Update the game state with the current player's symbol ('X' or 'O')
    */
    gameState[index] = currentPlayer;

    /*
    Update the cell's text content to show the current player's symbol
    */
    cell.textContent = currentPlayer;

    /*
    Check if the current player has won
    */
    if (checkWinner()) {
        /*
        If a winner is found, display an alert and stop further moves
        */
        alert(`${currentPlayer} wins!`);
        return;
    }

    /*
    Switch to the other player ('X' becomes 'O', and 'O' becomes 'X')
    */
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

/*
Function to check if there is a winner
*/
function checkWinner() {
    /*
    Check each winning combination to see if all three cells are filled with the same player's symbol
    */
    return winningCombinations.some(combination => {
        const [a, b, c] = combination; // Destructure the indices of the combination
        /* 
        Return true if all three cells in the combination are filled with the same player's symbol
        */
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

/* Add a click event listener to each cell to handle player moves
*/
cells.forEach(cell => cell.addEventListener('click', handleClick));