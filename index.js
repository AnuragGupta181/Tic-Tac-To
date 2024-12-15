const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameBoard = Array(9).fill(''); // Array to store the game state

// Function to handle cell click
function handleCellClick(event) {
  const clickedCellIndex = event.target.dataset.index;
  const clickedCellValue = gameBoard[clickedCellIndex];

  // Check if cell is empty and game is not over
  if (clickedCellValue === '' && !checkWinner()) {
    gameBoard[clickedCellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    // Switch player turn
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;

    // Check for winner or tie after each move
    if (checkWinner()) {
      statusText.textContent = `${currentPlayer === 'X' ? 'O' : 'X'} Wins!`;
      statusText.classList.add('win');
    } else if (checkTie()) {
      statusText.textContent = `It's a Tie!`;
      statusText.classList.add('tie');
    }
  }
}

// Function to check for a winner
function checkWinner() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningConditions.length; i++) {
    const condition = winningConditions[i];
    const cell1 = gameBoard[condition[0]];
    const cell2 = gameBoard[condition[1]];
    const cell3 = gameBoard[condition[2]];

    if (cell1 !== '' && cell1 === cell2 && cell2 === cell3) {
      return true;
    }
  }

  return false;
}

// Function to check for a tie
function checkTie() {
  return gameBoard.every((cell) => cell !== '');
}

// Add click event listener to each cell
cells.forEach((cell) => cell.addEventListener('click', handleCellClick));

// Add click event listener to restart button
restartButton.addEventListener('click', () => {
  gameBoard = Array(9).fill('');
  cells.forEach((cell) => (cell.textContent = ''));
  currentPlayer = 'X';
  statusText.textContent = `${currentPlayer}'s turn`;
  statusText.classList.remove('win', 'tie');
});
