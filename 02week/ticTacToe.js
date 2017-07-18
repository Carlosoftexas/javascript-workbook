'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let playerTurn = 'X';

function printBoard() {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

function horizontalWin() {
	for (var i=0; i<3; i++) {
		var count = 0;
		for (var k=0; k<3; k++) {
			if (board[i][k]==playerTurn) {
				count++;
			}
		}
		if (count==3) {
			return true;
		}
	}
	return false;
}

function verticalWin() {
	for (var i=0; i<3; i++) {
		var count = 0;
		for (var k=0; k<3; k++) {
			if (board[k][i]==playerTurn) {
				count++;
			}
		}
		if (count==3) {
			return true;
		}
	}
	return false;
}

function diagonalWin() {
	var count1 = 0;
	var count2 = 0;
	for (var i=0; i<3; i++) {
		if (board[i][i]==playerTurn) {
			count1++;
		}
		if (board[i][2-i]==playerTurn) {
			count2++;
		}
	}
	if (count1==3 || count2==3) {
		return true;
	}
	return false;
}

function checkForWin() {
	if (horizontalWin()===true) {
		return true;
	}
	if (verticalWin()===true) {
		return true;
	}
	if (diagonalWin()===true) {
		return true;
	}
	return false;
}

function ticTacToe(row, column) {
	board[row][column] = playerTurn;
	if (checkForWin()===true) {
		console.log('Player ' + playerTurn + ' wins');
		return 'Player ' + playerTurn + ' wins';
	} else {
		playerTurn = (playerTurn == 'X') ? 'O' :'X';
	}
}


function getPrompt() {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });

}



// Tests

if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}
