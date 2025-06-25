import Player from './player.js';

const player = Player('You');
const computer = Player('Computer', true);

// Pre-place ships
player.board.placeShip(0, 0, 2);
computer.board.placeShip(0, 0, 2);

// Handle turns, DOM, etc. here later