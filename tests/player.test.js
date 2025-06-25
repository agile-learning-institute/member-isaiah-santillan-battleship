import Player from '../src/player.js';

describe('Player', () => {
  it('can make moves and hit enemy ships', () => {
    const player1 = Player('Alice');
    const player2 = Player('Computer');
    player2.board.placeShip(0, 0, 1);
    player1.makeMove(player2.board, 0, 0);
    expect(player2.board.allSunk()).toBe(true);
  });

  it('computer generates random legal moves', () => {
    const computer = Player('Computer', true);
    const move = computer.randomMove();
    expect(move.length).toBe(2);
    expect(move[0]).toBeGreaterThanOrEqual(0);
    expect(move[0]).toBeLessThan(10);
  });
});