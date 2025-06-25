import Gameboard from './gameboard.js';

export default function Player(name, isComputer = false) {
  const board = Gameboard();
  const playedMoves = new Set();

  const randomMove = () => {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (playedMoves.has(`${x},${y}`));
    playedMoves.add(`${x},${y}`);
    return [x, y];
  };

  const makeMove = (enemyBoard, x, y) => {
    enemyBoard.receiveAttack(x, y);
  };

  return {
    name,
    board,
    makeMove,
    randomMove
  };
}