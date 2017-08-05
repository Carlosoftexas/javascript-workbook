'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function Checker(symbol, startX, startY) {
  this.symbol = symbol
  this.startX = startX;
  this.startY = startY;
}

function Board() {

  this.grid = [];
  this.checkers = [];
  // creates an 8x8 array, filled with null values
  this.createGrid = function() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null);
      }
    }
  };

  // prints out the board
  this.viewGrid = function() {
    // add our column numbers
    let string = " 0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
      }
    }
    // join the rowOfCheckers array to a string, separated by a space
    string += rowOfCheckers.join(' ');
    // add a 'new line'
    string += "\n";
    }
    console.log(string);
  };

// Your code here
}
function Game() {

  this.board = new Board();

  this.start = function() {
    this.board.createGrid();
    this.createCheckers();
  // Your code here
  };
  this
  this.createCheckers = function() {
    // black ones start left top 0,1
    let trigger = 1;
    for (let y=0; y<3; y++) { // row index
      for (let x=trigger; x<=7; x += 2) { // col index
        console.log(y, [y,x]);
        this.board.checkers.push(new Checker('o', x, y));
        this.board.grid[y][x] = {symbol : 'o'};
      }
      trigger = (trigger>0) ? 0 : 1;
    }
    trigger = 0;
    for (let y=5; y<8; y++) { // row index
      for (let x=trigger; x<=7; x += 2) { // col index
        console.log(y, [y,x]);
        this.board.checkers.push(new Checker('x', x, y));
        this.board.grid[y][x] = {symbol : 'x'};
      }
      trigger = (trigger>0) ? 0 : 1;
    }
  };
}

function getPrompt() {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
  rl.question('to where?: ', (toWhere) => {
  game.moveChecker(whichPiece, toWhere);
  getPrompt();
  });
  });
}

/*

 */


const game = new Game();
game.start();


// Tests

if (typeof describe === 'function') {
describe('Game', () => {
it('should have a board', () => {
assert.equal(game.board.constructor.name, 'Board');
});
it('board should have 24 checkers', () => {
assert.equal(game.board.checkers.length, 24);
});
});

describe('Game.moveChecker()', function () {
it('should move a checker', function () {
assert(!game.board.grid[4][1]);
game.moveChecker('50', '41'); // what are these params? number of field? 1 ... 64?
assert(game.board.grid[4][1]);
game.moveChecker('21', '30');
assert(game.board.grid[3][0]);
game.moveChecker('52', '43');
assert(game.board.grid[4][3]);
});
it('should be able to jump over and kill another checker', () => {
game.moveChecker('30', '52');
assert(game.board.grid[5][2]);
assert(!game.board.grid[4][1]);
assert.equal(game.board.checkers.length, 23);
});
});
} else {
getPrompt();
}
