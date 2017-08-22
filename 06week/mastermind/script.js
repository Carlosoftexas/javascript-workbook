'use strict';

var solution = '';
// let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
var letters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

var nextRowIndex = 0;

function generateSolution(btn) {
  solution = '';
  // btn.disabled = true;
  // 4 characters in the string
  for (var i = 0; i < 4; i++) {
    // creates random index
    var randomIndex = getRandomInt(0, letters.length);
    // add letter at random index to secret string
    solution += letters[randomIndex];
  }
  // console.log(solution);
  var topCells = document.querySelectorAll('table tr')[0];
    console.log(topCells.children.length);
  for (var i=0; i<topCells.children.length-1; i++) {
    console.log(i);
    topCells.children[i].innerHTML = solution.charAt(i);
  }
//  console.log(topCells);
}

// random number generator 0 ... 7 including -> letters.length - 1
function getRandomInt(min, max) {
//	0.99 * 8 ~ 8  -> 7
//	0.0001 * 8 -> 0
  return Math.floor(Math.random() * (max - min)) + min;
}

function makeGuess() {
  var selectors = document.querySelectorAll('select');
  var nums = [];
  selectors.forEach(select => {
    nums.push(select.options[select.selectedIndex].value);
  });
  console.log(nums);
  var cells = document.querySelectorAll('table tr');
  var nextRow = cells[cells.length-2-nextRowIndex];
  nextRowIndex++;
  for (var i=0; i<nextRow.children.length-2; i++) {
    nextRow.children[i].innerHTML = nums[i];
  }
  var guess = nums.join('');
  var hints = generateHint(guess);
  nextRow.children[4].innerHTML = hints[0];
  nextRow.children[5].innerHTML = hints[1];
  checkWin(guess);
  if (nextRowIndex>=10) {
    alert('You Lost');
    showSecret();
  }
}
function showSecret() {
  var selector = document.querySelectorAll('table tr')[0];
  selector.className = 'show';
}
function checkWin(currentGuess) {
  if (currentGuess===solution) {
    alert('Congrats you Won!');
    showSecret();
 //   document.querySelector('#sec').disabled = false;
  }
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
	return [numHits, numContained];
}


document.addEventListener('DOMContentLoaded', () => {

});
