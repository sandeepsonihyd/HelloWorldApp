const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let board = Array(9).fill('');
const statusDisplay = document.getElementById('status');

function checkWinner() {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  return wins.some(comb => comb.every(idx => board[idx] === currentPlayer));
}

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');
  if (board[index] !== '' || checkWinner()) {
    return;
  }
  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  if (checkWinner()) {
    statusDisplay.textContent = `${currentPlayer} wins!`;
  } else if (board.every(cell => cell !== '')) {
    statusDisplay.textContent = 'Draw!';
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function resetGame() {
  board.fill('');
  cells.forEach(cell => (cell.textContent = ''));
  currentPlayer = 'X';
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

document.getElementById('reset').addEventListener('click', resetGame);
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

