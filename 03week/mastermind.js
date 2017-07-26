'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
// global
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function printBoard() {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

function generateSolution() {
  // 4 character in the string
  for (let i = 0; i < 4; i++) {
    // xreates random string
    const randomIndex = getRandomInt(0, letters.length);
    // secret string
    solution += letters[randomIndex];
  }
  console.log('solution', solution);
}

// random number generator 0 ... 7 including
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint() {
    let currentGuess = arguments[0];
		let numGreens = 0; // contained and correct position
		let numYellows = 0; // just contained
		let checked = [];
		let doublicates = {};
		// init
		for (let i=0; i<4; i++){
			checked[i] = false;
		};
		// calculate greens
		for (let i=0; i<4; i++){
		  let currentChar = solution.charAt(i);
		  //
		  if ( true === (currentChar in doublicates) ) {
		    doublicates[currentChar]++;
		  } else {
		    doublicates[currentChar] = 1;
		  }
			if (currentGuess.charAt(i) === solution.charAt(i) && checked[i] === false){
				checked[i] = true;
				numGreens++;
			}
		}
		console.log('doublicates', doublicates);
		// calculate yellows
		for(let i=0; i<4; i++){
			for (let j=0; j<4; j++){
				if (currentGuess.charAt(i) === solution.charAt(j) && checked[i] === false){
					checked[i] = true;
					numYellows++;
				}
			}
		}

		let dubString = '';
		for (let e in doublicates) {
		  if (doublicates[e]>1) {
		    dubString += 1+'-';
		  }
		}
		if (dubString.length>0) {
		  dubString = dubString.substring(0, dubString.lastIndexOf('-'));
		  return dubString;
		}
		return numGreens+'-'+numYellows;
}

function mastermind(guess) {
//  solution = 'abcd'; // Comment this out to generate a random solution
  console.log('guess', guess);
  board.push(guess);
  if (guess===solution) {
    return 'You guessed it!';
  }

  // your code here
}


function getPrompt() {
  // guess from user
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
