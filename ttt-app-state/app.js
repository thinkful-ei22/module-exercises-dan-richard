'use strict';
/* global $ */

const state = {
  board: [null, null, null, null, null, null, null, null, null],
  xIsNext: false,
  winPattern: null,
};

// State modification functions
function setMove(cellNo) {
  // convert cellNo to integer in case it's still a string from DOM
  const cell = Math.abs(cellNo);

  // if there is a winner, this action must do nothing and return
  if (state.winPattern) return;

  // if something is already in the cell, do nothing and return
  if (state.board[cell] !== null) return;

  // if xIsNext, then place 'X'; otherwise, place 'O'
  state.board[cell] = state.xIsNext ? 'X' : 'O';

  // set xIsNext to the *opposite* boolean value of current xIsNext
  state.xIsNext = !state.xIsNext;

  const winPattern = checkWinner(state.board);
  if (winPattern) {
    state.winPattern = winPattern;
  }
}
function newGame() {
  state.xIsNext = true;
  state.board = Array(9).fill(null);
  state.winPattern = null;
}
// Render functions
function renderBoard() {
  // renderRow function accepts start/end ids and generates a row of cells:
  const renderRow = (startId, endId) => {
    let html = '<div class="row">';
    for (let i = startId; i <= endId; i++) {
      // `winClass` is a string to be placed in the `class` attribute on the HTML element
      // it'll either be 'win' to match our css class or empty string if no class should be added
      const winClass = state.winPattern.includes(i) ? 'win' : '';

      html += `
          <div class="cell ${winClass}" id="${i}">
              <p>${state.board[i] ? state.board[i] : '&nbsp;'}</p>
          </div>
      `;
    }
    for (let i = startId; i <= endId; i++) {
      // insert empty HTML character if there's `null` in board array
      html += `
              <div class="cell" id="${i}">
                  <p>${state.board[i] ? state.board[i] : '&nbsp;'}</p>
              </div>
          `;
    }
    html += '</div>';
    return html;
  };

  // run the renderRow() function for each row and concatenate into `html`
  let html = '';
  html += renderRow(0, 2);
  html += renderRow(3, 5);
  html += renderRow(6, 8);

  // insert `html` into DOM element
  $('.board').html(html);
}

// Event Listeners

function onCellClick(event) {
  const cellId = $(event.target).closest('.cell').attr('id');
  setMove(cellId);
  renderBoard();
}

$('.board').on('click', '.cell', onCellClick);

function onNewGameClick() {
  newGame();
  renderBoard();
}

$('#new-game').click(onNewGameClick);

/**
 * Analyzes board to determine if win state occurred
 * @param {Array} board
 * @returns {Array|null} - Array of indexes that denote winning cells; null if no winner
 * */
function checkWinner(board) {
  const winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8]];

  for (let i = 0; i < winPatterns.length; i++) {
    const winPattern = winPatterns[i];

    // Prevent win with three nulls by checking first cell isn't null
    if (!board[winPattern[0]]) continue;

    if (board[winPattern[0]] === board[winPattern[1]] && board[winPattern[1]] === board[winPattern[2]]) {
      return winPattern;
    }
  }

  return null;
}

