/**
 * Makes the best move for the AI player using the minimax algorithm.
 */
function bestMove() {
  // AI to make its turn
  let bestScore = -Infinity;
  let move;

  // Iterate through each cell on the board
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Check if the spot is available
      if (board[i][j] === '') {
        // Temporarily make the move
        board[i][j] = aiPlayer;
        let score = minimax(board, 0, false);
        board[i][j] = ''; // Undo the move

        // Update the best score and move if needed
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }

  // Make the best move
  board[move.i][move.j] = aiPlayer;
  currentPlayer = humanPlayer;
}

let scores = {
  X: 10,
  O: -10,
  tie: 0
};

/**
 * Scores the current state of the board using the minimax algorithm.
 * @param {Array} board - The current state of the board.
 * @param {number} depth - The depth of the recursive search.
 * @param {boolean} isMaximizing - Indicates whether it's the maximizing player's turn.
 * @return {number} The score of the current board state.
 */
function minimax(board, depth, isMaximizing) {
  let result = checkWinner();

  // If there is a winner or the board is full, return the score
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;

    // Check available spots and find the maximum score
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Check if the spot is available
        if (board[i][j] === '') {
          // Temporarily make the move
          board[i][j] = aiPlayer;
          let score = minimax(board, depth + 1, false);
          board[i][j] = ''; // Undo the move

          // Update the best score
          bestScore = Math.max(score, bestScore);
        }
      }
    }

    return bestScore;
  } else {
    let bestScore = Infinity;

    // Check available spots and find the minimum score
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Check if the spot is available
        if (board[i][j] === '') {
          // Temporarily make the move
          board[i][j] = humanPlayer;
          let score = minimax(board, depth + 1, true);
          board[i][j] = ''; // Undo the move

          // Update the best score
          bestScore = Math.min(score, bestScore);
        }
      }
    }

    return bestScore;
  }
}