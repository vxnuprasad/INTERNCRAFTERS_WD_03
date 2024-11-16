const cells = document.querySelectorAll('[data-cell]');
const winnerMessage = document.getElementById('winner-message');
const restartButtons = document.getElementById('game-status');
const newMatchButton = document.getElementById('new-match-button');
const nextMatchButton = document.getElementById('next-match-button');
const startButton = document.getElementById('start-button');
const playerXInput = document.getElementById('player-x');
const playerOInput = document.getElementById('player-o');
const errorMessage = document.getElementById('error-message');
const scores = document.getElementById('scores');
const playerXScore = document.getElementById('player-x-score');
const playerOScore = document.getElementById('player-o-score');
const roundNumberDisplay = document.getElementById('round-number');

let currentPlayer = 'X';
let playerXName = '';
let playerOName = '';
let xScore = 0;
let oScore = 0;
let gameActive = false;
let roundNumber = 1;
const boardState = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (boardState[cellIndex] || !gameActive) return;

  boardState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWin(currentPlayer)) {
    gameActive = false;
    const winnerName = currentPlayer === 'X' ? playerXName : playerOName;
    winnerMessage.textContent = `${winnerName} wins! 🎉`;
    updateScore(currentPlayer);
    showRestartOptions();
    return;
  }

  if (boardState.every(cell => cell)) {
    gameActive = false;
    winnerMessage.textContent = 'It\'s a draw!';
    showRestartOptions();
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin(player) {
  return winningCombinations.some(combination =>
    combination.every(index => boardState[index] === player)
  );
}

function updateScore(player) {
  if (player === 'X') {
    xScore++;
    playerXScore.textContent = xScore;
  } else {
    oScore++;
    playerOScore.textContent = oScore;
  }
}

function resetBoard() {
  boardState.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
}

function startGame() {
  playerXName = playerXInput.value;
  playerOName = playerOInput.value;
  if (!playerXName || !playerOName) {
    errorMessage.style.display = 'block';
    return;
  }
  errorMessage.style.display = 'none';
  scores.style.display = 'block';
  startButton.style.display = 'none';
  gameActive = true;
  currentPlayer = 'X';
  document.getElementById('game-board').style.display = 'grid';
  document.getElementById('game-status').style.display = 'block';
}

function showRestartOptions() {
  newMatchButton.style.display = 'inline-block';
  nextMatchButton.style.display = 'inline-block';
}

function handleNewMatch() {
  resetBoard();
  playerXName = '';
  playerOName = '';
  playerXInput.value = '';
  playerOInput.value = '';
  xScore = 0;
  oScore = 0;
  roundNumber = 1;
  playerXScore.textContent = xScore;
  playerOScore.textContent = oScore;
  roundNumberDisplay.textContent = roundNumber;
  startButton.style.display = 'inline-block';
  document.getElementById('game-board').style.display = 'none';
  scores.style.display = 'none';
  gameActive = false;
  winnerMessage.textContent = '';
  newMatchButton.style.display = 'none';
  nextMatchButton.style.display = 'none';
}

function handleNextMatch() {
  resetBoard();
  roundNumber++;
  roundNumberDisplay.textContent = roundNumber;
  gameActive = true;
  currentPlayer = 'X';
  winnerMessage.textContent = '';
  newMatchButton.style.display = 'none';
  nextMatchButton.style.display = 'none';
}

startButton.addEventListener('click', startGame);
newMatchButton.addEventListener('click', handleNewMatch);
nextMatchButton.addEventListener('click', handleNextMatch);
cells.forEach(cell => cell.addEventListener('click', handleCellClick));


function checkWin(player) {
  const winningCombination = winningCombinations.find(combination =>
    combination.every(index => boardState[index] === player)
  );

  if (winningCombination) {
    highlightWinningCells(winningCombination);
    return true;
  }
  return false;
}

function highlightWinningCells(combination) {
  combination.forEach(index => {
    cells[index].classList.add('winning');
  });
}

function resetBoard() {
  boardState.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken', 'winning'); // Remove highlight class
  });
}
