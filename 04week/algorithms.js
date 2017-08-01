'use strict';

const assert = require('assert');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

let arr = [];

for (let i = 0; i < 1000; i++) {
  arr.push(getRandomInt(0, 1000));
}

function bubbleSort(arr) {
  while (true) { // infinite
    let found = false;
    for (var i = 0; i < arr.length - 1; i++) { // 0 ... 7 - one less because we maybe want to switch position
      if (arr[i] > arr[i + 1]) { // if current is greater than next
        found = true; // indicate we're not finished yet
        let item = arr[i]; // save current item in variable
        arr[i] = arr[i + 1]; // put the next element to the current position
        arr[i + 1] = item; // put the next position to the value of the saved one
      }
    }
    if (found === false) { // all sorted
      break; // leave while
    }
  }
  return arr;
}

function mergeSort(arr) {
  if (arr.length <= 1) { // nothing to sort or splice
    return arr; // return input
  }

  let cutPosition = Math.floor(arr.length / 2); // get cut Position index

  let leftSideSublist = arr.slice(0, cutPosition); // left side of cut

  let rightSideSublist = arr.slice(cutPosition, arr.length); // right side including cut



  return orderAndMerge(mergeSort(leftSideSublist), mergeSort(rightSideSublist)); // cut, order and merge recursively
}

function orderAndMerge(leftSideSublist, rightSideSublist) {

  let stack = []; // merged sublist // 5

  while (leftSideSublist.length > 0 && rightSideSublist.length > 0) {
    if (leftSideSublist[0] <= rightSideSublist[0]) { // compare frist elem left and right
      stack.push(leftSideSublist.shift()); // if left element is smaller take first one off
      // and push as next into the stack
    } else {
      stack.push(rightSideSublist.shift()); // otherwise push the first right one to the stack
    }
  }

  while (leftSideSublist.length > 0) {
    // if there are remaining elements because length of sublists wasn't equal
    stack.push(leftSideSublist.shift()); // add to list
  }

  while (rightSideSublist.length > 0) { // same for the right list
    stack.push(rightSideSublist.shift());
  }


  return stack; // ordered and merged sublist
}



function binarySearch(sourceArray, valueToFind) {

  let startPosition = 0;
  let endPosition = sourceArray.length - 1;
  let cutPosition = Math.floor((endPosition + startPosition) / 2);

  while (true) { // we haven't reached end of part
    if (sourceArray[cutPosition] == valueToFind // value found
      ||
      startPosition >= endPosition) { // or end of subsequence
      break; // leave while
    }
    // if in left list and smaller -> move end pos one before cut
    if (valueToFind < sourceArray[cutPosition]) {
      endPosition = cutPosition - 1;
      // if in right list -> move start pos 1 further right
    } else if (valueToFind > sourceArray[cutPosition]) {
      startPosition = cutPosition + 1;
    }
    // calculate cutPosition from new position values
    cutPosition = Math.floor((endPosition + startPosition) / 2);
  }
  // when we found a value or start position has reached end
  // we should have a valid result
  if (sourceArray[cutPosition] == valueToFind) {
    return cutPosition;
  } // otherwise ...
  return false;
}

// Tests

if (typeof describe === 'function') {

  function comparator(a, b) {
    if (Number(a) < Number(b)) return -1;
    if (Number(a) > Number(b)) return 1;
    return 0;
  }

  describe('#bubbleSort()', () => {
    it('should sort array', () => {
      const sorted = bubbleSort(arr);
      assert.deepEqual(sorted, arr.sort(comparator));
    });
  });

  describe('#mergeSort()', () => {
    it('should sort array', () => {
      const sorted = mergeSort(arr);
      assert.deepEqual(sorted, arr.sort(comparator));
    });
  });

  describe('#binarySearch()', () => {
    it('should return the index of given item if sorted array contains it', () => {
      const idx = binarySearch([1, 2, 3, 4], 3);
      assert.equal(idx, 2);
    });
    it('should return false if item not in sorted array', () => {
      const idx = binarySearch([1, 2, 3, 4], 5);
      assert.equal(idx, false);
    });
  });

} else {

  console.log('Run the tests!')

}
