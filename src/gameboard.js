import Ship from './ship.js';

export default function Gameboard() {
  const board = Array(10).fill(null).map(() => Array(10).fill(null));
  const missedAttacks = [];
  const ships = [];

  const placeShip = (x, y, length, direction = 'horizontal') => {
    const ship = Ship(length);
    for (let i = 0; i < length; i++) {
      const row = direction === 'horizontal' ? y : y + i;
      const col = direction === 'horizontal' ? x + i : x;
      board[row][col] = ship;
    }
    ships.push(ship);
  };

  const receiveAttack = (x, y) => {
    const target = board[y][x];
    if (target && typeof target.hit === 'function') {
      target.hit();
    } else {
      missedAttacks.push([x, y]);
    }
  };

  const allSunk = () => ships.every(ship => ship.isSunk());

  return {
    placeShip,
    receiveAttack,
    allSunk,
    missedAttacks,
    getBoard: () => board
  };
}