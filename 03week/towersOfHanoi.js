'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// global vars to store the current start and end stack
// as the other functions don't have parameters
let currentStartStack = [];
let currentEndStack = [];

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

function movePiece() {
  let mover = currentStartStack.splice(currentStartStack.length-1, 1);
  currentEndStack.push(mover[0]);
}

function isLegal() {
	// for the tests we will receive parameters here
	if (arguments.length===2) {
	  // init the global vars from function parameters
	  currentStartStack = stacks[arguments[0]];
	  currentEndStack = stacks[arguments[1]];
	}
  if (currentStartStack.length===0) {
    return false;
  }
  if (currentEndStack.length===0) {
    return true;
  }
  if (currentStartStack[currentStartStack.length-1] > currentEndStack[currentEndStack.length-1]) {
    return false;
  }
  return true;
}

function checkForWin() {
  if (stacks.a.length===0 && (stacks.b.length===4 || stacks.c.length===4)) {
    return true;
  }
  return false;
}

function towersOfHanoi(startStack, endStack) {
  currentStartStack = stacks[startStack];
  currentEndStack = stacks[endStack];
  if (isLegal()) {
    movePiece();
    if (checkForWin()) {
      return true;
    }
  }
  return false;
}

function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {

	it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });

    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });

  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
