import Player from './src/player.js';

// --- Game Setup ---
const BOARD_SIZE = 10;
const SHIP_LENGTHS = [5, 4, 3, 3, 2];

let player, computer;
let currentShipIdx = 0;
let currentDirection = 'horizontal';
let isPlacingShips = true;
let isPlayerTurn = true;

const playerBoardDiv = document.getElementById('player-board');
const computerBoardDiv = document.getElementById('computer-board');
const statusText = document.getElementById('status-text');
const startBtn = document.getElementById('start-btn');
const randomizeBtn = document.getElementById('randomize-btn');
const resetBtn = document.getElementById('reset-btn');

// --- Utility Functions ---
function createBoardGrid(boardDiv, onClick) {
  boardDiv.innerHTML = '';
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = x;
      cell.dataset.y = y;
      cell.addEventListener('click', (e) => onClick(x, y, e));
      boardDiv.appendChild(cell);
    }
  }
}

function renderBoards() {
  // Player board
  const board = player.board.getBoard();
  Array.from(playerBoardDiv.children).forEach(cell => {
    const x = +cell.dataset.x;
    const y = +cell.dataset.y;
    const val = board[y][x];
    cell.className = 'cell';
    if (val) cell.classList.add('ship');
    if (val && val.getHits && val.getHits() > 0) cell.classList.add('hit');
    if (player.board.missedAttacks.some(([mx, my]) => mx === x && my === y)) cell.classList.add('miss');
  });
  // Computer board
  const cBoard = computer.board.getBoard();
  Array.from(computerBoardDiv.children).forEach(cell => {
    const x = +cell.dataset.x;
    const y = +cell.dataset.y;
    cell.className = 'cell';
    // Only show hits/misses
    if (cBoard[y][x] && cBoard[y][x].getHits && cBoard[y][x].getHits() > 0) cell.classList.add('hit');
    if (computer.board.missedAttacks.some(([mx, my]) => mx === x && my === y)) cell.classList.add('miss');
  });
}

function canPlaceShip(board, x, y, length, direction) {
  for (let i = 0; i < length; i++) {
    const row = direction === 'horizontal' ? y : y + i;
    const col = direction === 'horizontal' ? x + i : x;
    if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) return false;
    if (board[row][col]) return false;
  }
  return true;
}

function placeShipPreview(x, y) {
  renderBoards();
  const length = SHIP_LENGTHS[currentShipIdx];
  for (let i = 0; i < length; i++) {
    const row = currentDirection === 'horizontal' ? y : y + i;
    const col = currentDirection === 'horizontal' ? x + i : x;
    if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) continue;
    const cell = playerBoardDiv.querySelector(`[data-x="${col}"][data-y="${row}"]`);
    if (cell) cell.classList.add('preview');
  }
}

function clearPreview() {
  Array.from(playerBoardDiv.children).forEach(cell => cell.classList.remove('preview'));
}

function handlePlayerBoardClick(x, y) {
  if (!isPlacingShips) return;
  const board = player.board.getBoard();
  const length = SHIP_LENGTHS[currentShipIdx];
  if (canPlaceShip(board, x, y, length, currentDirection)) {
    player.board.placeShip(x, y, length, currentDirection);
    currentShipIdx++;
    if (currentShipIdx >= SHIP_LENGTHS.length) {
      isPlacingShips = false;
      statusText.textContent = 'All ships placed! Click Start Game.';
      startBtn.disabled = false;
    } else {
      statusText.textContent = `Place ship of length ${SHIP_LENGTHS[currentShipIdx]}`;
    }
    renderBoards();
  } else {
    statusText.textContent = 'Invalid placement. Try again.';
  }
}

function handlePlayerBoardMouseOver(x, y) {
  if (!isPlacingShips) return;
  placeShipPreview(x, y);
}

function handlePlayerBoardMouseOut() {
  if (!isPlacingShips) return;
  clearPreview();
}

function handleComputerBoardClick(x, y) {
  if (isPlacingShips || !isPlayerTurn) return;
  const cBoard = computer.board.getBoard();
  // Prevent attacking same cell twice
  if (cBoard[y][x] && cBoard[y][x].getHits && cBoard[y][x].getHits() > 0) return;
  if (computer.board.missedAttacks.some(([mx, my]) => mx === x && my === y)) return;
  player.makeMove(computer.board, x, y);
  renderBoards();
  if (computer.board.allSunk()) {
    statusText.textContent = 'You win!';
    isPlayerTurn = false;
    return;
  }
  isPlayerTurn = false;
  statusText.textContent = "Computer's turn...";
  setTimeout(computerTurn, 700);
}

function computerTurn() {
  let [x, y] = computer.randomMove();
  computer.makeMove(player.board, x, y);
  renderBoards();
  if (player.board.allSunk()) {
    statusText.textContent = 'Computer wins!';
    return;
  }
  isPlayerTurn = true;
  statusText.textContent = 'Your turn! Click enemy board to attack.';
}

function randomizeComputerShips() {
  const cBoard = computer.board.getBoard();
  for (let i = 0; i < SHIP_LENGTHS.length; i++) {
    let placed = false;
    while (!placed) {
      const dir = Math.random() < 0.5 ? 'horizontal' : 'vertical';
      const x = Math.floor(Math.random() * BOARD_SIZE);
      const y = Math.floor(Math.random() * BOARD_SIZE);
      if (canPlaceShip(cBoard, x, y, SHIP_LENGTHS[i], dir)) {
        computer.board.placeShip(x, y, SHIP_LENGTHS[i], dir);
        placed = true;
      }
    }
  }
}

function resetGame() {
  player = Player('You');
  computer = Player('Computer', true);
  currentShipIdx = 0;
  currentDirection = 'horizontal';
  isPlacingShips = true;
  isPlayerTurn = true;
  statusText.textContent = `Place ship of length ${SHIP_LENGTHS[0]}`;
  startBtn.disabled = true;
  createBoardGrid(playerBoardDiv, handlePlayerBoardClick);
  createBoardGrid(computerBoardDiv, handleComputerBoardClick);
  // Add mouseover for preview
  Array.from(playerBoardDiv.children).forEach(cell => {
    cell.addEventListener('mouseover', () => handlePlayerBoardMouseOver(+cell.dataset.x, +cell.dataset.y));
    cell.addEventListener('mouseout', handlePlayerBoardMouseOut);
  });
  renderBoards();
}

// --- Event Listeners ---
startBtn.addEventListener('click', () => {
  if (isPlacingShips) return;
  randomizeComputerShips();
  statusText.textContent = 'Your turn! Click enemy board to attack.';
  isPlayerTurn = true;
  startBtn.disabled = true;
});

randomizeBtn.addEventListener('click', () => {
  // Randomly place player ships
  const pBoard = player.board.getBoard();
  let placedShips = 0;
  while (placedShips < SHIP_LENGTHS.length) {
    const dir = Math.random() < 0.5 ? 'horizontal' : 'vertical';
    const x = Math.floor(Math.random() * BOARD_SIZE);
    const y = Math.floor(Math.random() * BOARD_SIZE);
    if (canPlaceShip(pBoard, x, y, SHIP_LENGTHS[placedShips], dir)) {
      player.board.placeShip(x, y, SHIP_LENGTHS[placedShips], dir);
      placedShips++;
    }
  }
  currentShipIdx = SHIP_LENGTHS.length;
  isPlacingShips = false;
  statusText.textContent = 'All ships placed! Click Start Game.';
  startBtn.disabled = false;
  renderBoards();
});

resetBtn.addEventListener('click', resetGame);

document.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'r' && isPlacingShips) {
    currentDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
    statusText.textContent = `Rotation: ${currentDirection}. Place ship of length ${SHIP_LENGTHS[currentShipIdx]}`;
  }
});

// --- Initialize ---
resetGame();
