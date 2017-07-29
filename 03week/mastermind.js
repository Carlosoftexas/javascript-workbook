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

  // 4 characters in the string
  for (let i = 0; i < 4; i++) {
    // creates random index
    const randomIndex = getRandomInt(0, letters.length);
    // add letter at random index to secret string
    solution += letters[randomIndex];
  }
console.log(solution); 
}

// random number generator 0 ... 7 including -> letters.length - 1
function getRandomInt(min, max) {
//	0.99 * 8 ~ 8  -> 7
//	0.0001 * 8 -> 0
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint() {
    // current guess from user
	let currentGuess = arguments[0];
	let positionsChecked = []; // to avoid adding duplicates to the results

	let numHits = 0; // correct position
	let numContained = 0; // just contained - wrong position

	// init
	for (let i=0; i<4; i++){
		positionsChecked[i] = false; // set all positions in the secret string to unchecked
	}
 	// 0 1 2 3
	// 'abcd' - 1-1
	// 'aabb'
	// calculate hits
	for (let i=0; i<4; i++){ // for every character in the current guess and solution
		if (currentGuess.charAt(i) === solution.charAt(i)) { //
			positionsChecked[i] = true; // set position to checked to not check again
			numHits++; // increase greens - contained at correct position
		}
	}

	// calculate only contained
 	// 0 1 2 3
	// 'abcd' - 1-1
	// 'aabb'
	for(let i=0; i<4; i++){ // for every character in the current guess a b c d
		for (let j=0; j<4; j++){ // for every character in the solution
			if (currentGuess.charAt(i) === solution.charAt(j) // if there is a match
				&& positionsChecked[j] === false // and we haven't checked the solution's character yet
			){
				positionsChecked[j] = true; // set position to checked to not check again
				numContained++; // increae yellows - contained but wrong position
			}
		}
	}
	return numHits+'-'+numContained;
}

function mastermind(guess) {
//  solution = 'abcd'; // Comment this out to generate a random solution
  console.log('guess', guess);
  board.push(guess);
  if (guess===solution) {
    return 'You guessed it!';
  }
}


function getPrompt() {
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
