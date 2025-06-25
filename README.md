# Battleship Game by Isaiah Santillan

A modern, interactive implementation of the classic Battleship game. This project lets you play Battleship against a computer opponent in your browser, with a clean UI and manual or random ship placement. The game logic is written in modular JavaScript, and the project includes automated unit tests using Jest.

---

## What is this project?

This is a web-based Battleship game where you:
- Place your ships manually (with rotation) or randomly.
- Play against a computer that places ships and attacks randomly.
- See visual feedback for hits, misses, and ship placement.
- Enjoy a responsive, user-friendly interface.

The project is designed for learning, fun, and as a demonstration of modern JavaScript practices, including ES modules and automated testing.

---

## Technologies Used

- **JavaScript (ES Modules):** All game and UI logic is written using modern JavaScript syntax and modules.
- **HTML5 & CSS3:** For the interactive UI and responsive layout.
- **Jest:** For unit testing the game logic.
- **Babel:** For transpiling modern JavaScript in tests.
- **Node.js & npm:** For dependency management and running tests.

---

## Setup & Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/agile-learning-institute/member-isaiah-santillan-battleship.git
   cd member-isaiah-santillan-battleship
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```
---

## Running the Game Locally

> **Note:** For ES module support, you should use a local server (not just open index.html directly).

- **With VS Code Live Server:**
  - Right-click `index.html` and select "Open with Live Server".

- **With Node.js (using serve):**
  ```sh
  npx serve .
  ```
  or
  ```sh
  npx http-server .
  ```

- **Then:**
  - Open your browser to the provided `localhost` URL.

---

## How to Play

- Place your ships by clicking on your board. Press `R` to rotate the current ship.
- Or, click "Randomize Ships" to auto-place your ships.
- Click "Start Game" when ready.
- Click on the enemy board to attack.
- Use "Reset Game" to start over at any time.

---

## NPM Scripts

- **Install dependencies:**
  ```sh
  npm install
  ```
- **Run all tests:**
  ```sh
  npm test
  ```
- **Run tests with coverage report:**
  ```sh
  npm run coverage
  ```

---
