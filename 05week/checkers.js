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
  this.player = {'symbol' : 'x'}; // switch -> x | o

  this.start = function() {
    this.board.createGrid();
    this.createCheckers();
  // Your code here
  };
  // source = '50', target = '41' -> [5, 0] [4, 1] -> map
  this.moveChecker = function(source, target) {
      let sourceCoords = source.split('').map(function(val) {
        return parseInt(val);
      });
      let targetCoords = target.split('').map(function(val) {
        return parseInt(val);
      });
      console.log('sourceCoords', sourceCoords);
      console.log('targetCoords', targetCoords);

      let targetChecker = this.findCheckerByChords(sourceCoords);
      this.board.grid[sourceCoords[0]][sourceCoords[1]].symbol = null;
      this.board.grid[targetCoords[0]][targetCoords[1]] = { 'symbol': this.player.symbol};
      this.player.symbol = (this.player.symbol=='x') ? 'o' : 'x';
      this.board.checkers[targetChecker[0]].startX = targetCoords[1];
      this.board.checkers[targetChecker[0]].startY = targetCoords[0];
      let gap = [0,0];
      gap[0] = Math.floor(((targetCoords[0]-sourceCoords[0])/2));
      gap[1] = Math.floor(((targetCoords[1]-sourceCoords[1])/2));
      if (Math.abs(gap[0])>0 && Math.abs(gap[1])>0) {
          gap[0] += sourceCoords[0];
          gap[1] += sourceCoords[1];
         let deleteChecker = this.findCheckerByChords(gap);
         this.board.checkers.splice(deleteChecker[0], 1);
         this.board.grid[deleteChecker[1].startY][deleteChecker[1].startX] = null;
      }

  };

  this.findCheckerByChords = function (source) {
    let sourceChecker = {};
    let sourceIndex = -1;
      for (let i=0; i<this.board.checkers.length; i++) {
        if (this.board.checkers[i].startY==source[0]
                    && this.board.checkers[i].startX==source[1] ) {
                      sourceChecker = this.board.checkers[i];
                      sourceIndex = i;
                      break;
                    }
      }
    return [sourceIndex, sourceChecker];
  };
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
