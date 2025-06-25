import Ship from '../src/ship.js';

describe('Ship factory', () => {
  it('registers hits and sinks', () => {
    const ship = Ship(3);
    ship.hit();
    ship.hit();
    expect(ship.getHits()).toBe(2);
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});