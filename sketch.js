let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let cellWidth; // width of each cell
let cellHeight; // height of each cell

let aiPlayer = 'X'; // symbol for AI player
let humanPlayer = 'O'; // symbol for human player
let currentPlayer = humanPlayer; // indicates the current player

function setup() {
  createCanvas(400, 400);
  cellWidth = width / 3;
  cellHeight = height / 3;
  bestMove();
}

// Function to check if three values are equal and not empty
function equals3(a, b, c) {
  return a === b && b === c && a !== '';
}

// Function to check for a winner or a tie
function checkWinner() {
  let winner = null;

  // Check horizontally
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Check vertically
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Check diagonally
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        openSpots++;
      }
    }
  }

  if (winner === null && openSpots === 0) {
    return 'tie';
  } else {
    return winner;
  }
}

// Function to handle human player's move
function mousePressed() {
  if (currentPlayer === humanPlayer) {
    let i = floor(mouseX / cellWidth);
    let j = floor(mouseY / cellHeight);

    if (board[i][j] === '') {
      board[i][j] = humanPlayer;
      currentPlayer = aiPlayer;
      bestMove();
    }
  }
}

// Function to draw the tic-tac-toe board and pieces
function draw() {
  background(255);
  strokeWeight(4);

  line(cellWidth, 0, cellWidth, height);
  line(cellWidth * 2, 0, cellWidth * 2, height);
  line(0, cellHeight, width, cellHeight);
  line(0, cellHeight * 2, width, cellHeight * 2);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = cellWidth * i + cellWidth / 2;
      let y = cellHeight * j + cellHeight / 2;
      let spot = board[i][j];
      textSize(32);
      let radius = cellWidth / 4;

      if (spot === humanPlayer) {
        noFill();
        ellipse(x, y, radius * 2);
      } else if (spot === aiPlayer) {
        line(x - radius, y - radius, x + radius, y + radius);
        line(x + radius, y - radius, x - radius, y + radius);
      }
    }
  }

  let result = checkWinner();
  if (result !== null) {
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '32pt');
    if (result === 'tie') {
      resultP.html('Tie!');
    } else {
      resultP.html(`${result} wins!`);
    }
  }
}