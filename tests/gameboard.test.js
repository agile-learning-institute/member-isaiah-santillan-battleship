import Gameboard from '../src/gameboard.js';

describe('Gameboard logic', () => {
  it('places ships and receives attacks correctly', () => {
    const board = Gameboard();
    board.placeShip(0, 0, 2);
    board.receiveAttack(0, 0);
    board.receiveAttack(1, 0);
    expect(board.allSunk()).toBe(true);
  });

  it('records missed attacks', () => {
    const board = Gameboard();
    board.receiveAttack(5, 5);
    expect(board.missedAttacks).toContainEqual([5, 5]);
  });
});