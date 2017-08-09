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
      let targetChecker = [];

      let foundData = this.findCheckerByChords(sourceCoords[0], sourceCoords[1]);
      console.log('foundData ', foundData );
      let sourceIndex = foundData[0];
      let sourceChecker = foundData[1];
      if (sourceIndex>-1) {
        this.board.checkers[sourceIndex].startX = sourceCoords[1];
        this.board.checkers[sourceIndex].startY = sourceCoords[0];
        this.board.grid[sourceCoords[0]][sourceCoords[1]] = null;
        this.board.grid[targetCoords[0]][targetCoords[1]] = { 'symbol': 'x'};
      }
      let yDif = sourceCoords[0] - targetCoords[0];
      let yY = [];
      for (let y = 1; y<=Math.abs(yDif); y++) {
        yY.push(sourceCoords[0]+y); // y-values of positions on the way
      }
      let xDif = sourceCoords[1] - targetCoords[1];
      let xX = [];
      for (let x = 1; x<=Math.abs(xDif); x++) {
        xX.push(sourceCoords[1]+x); // y-values of positions on the way
      }
      for (let k=0; k<yY.length;k++) {
        let elem = this.findCheckerByChords(yY[k], xX[k]);
        if (elem[0]>-1 && k>=1) {
           this.board.checkers.splice(elem[0], 1);
        }
      }
      console.log('y:', yY, 'x:', xX);

            console.log('sourceChecker', sourceChecker);
            console.log('targetChecker', targetChecker);

  };

/*
1) Game.moveChecker() should be able to jump over and kill another checker:
   AssertionError: null == true
    at Context.it (checkers.js:229:1)


 1) Game.moveChecker() should move a checker:
    ReferenceError: i is not defined
     at Game.moveChecker (checkers.js:101:33)
     at Context.<anonymous> (checkers.js:200:6)

 2) Game.moveChecker() should be able to jump over and kill another checker:
    ReferenceError: i is not defined
     at Game.moveChecker (checkers.js:101:33)
     at Context.it (checkers.js:208:6)




1) Game.moveChecker() should move a checker:
   ReferenceError: sourceCoords is not defined
    at Game.findCheckerByChords (checkers.js:118:29)
    at Game.moveChecker (checkers.js:82:28)
    at Context.<anonymous> (checkers.js:184:6)

2) Game.moveChecker() should be able to jump over and kill another checker:
   ReferenceError: sourceCoords is not defined
    at Game.findCheckerByChords (checkers.js:118:29)
    at Game.moveChecker (checkers.js:82:28)
    at Context.it (checkers.js:192:6)

*/
  this.findCheckerByChords = function (y, x) {
    let sourceChecker = {};
    let sourceIndex = -1;
      for (let i=0; i<this.board.checkers.length; i++) {
        let checker = this.board.checkers[i];
        if (checker.startY==y
                    && checker.startX==x ) {
                      sourceChecker = checker;
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
