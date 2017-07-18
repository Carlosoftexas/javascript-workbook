'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



// 1) should attach "yay" if word begins with vowel
    // 2) should lowercase and trim word before translation

// data: all our vowls
// -> find first index in input string
// inputString -> banana
function pigLatin(inputString) {
  inputString = inputString.toLowerCase().trim();
  var vowels = ['a', 'e', 'i', 'o', 'u']; // data list -> vowls

  // minimum first occurencs of any vowl inside our vowls array
  var firstIndex = inputString.length; // -> 6 ->

  for (var i=0; i<vowels.length; i++) { // loop over all vowls
    // i==0 -> vowels[i] -> a
    for (var s=0; s<inputString.length; s++) { // loop over all characters in inputstring
      // s=0 -> b
      // s=1 -> a ->
      if ( inputString[s]==vowels[i]) { // vowl matchts character in string
        if ( s<firstIndex) {
          firstIndex = s; // 1
        }
      }
    }
  }
  if (firstIndex===0) {
    return inputString + 'yay';
  } else {
    // leave for loops
    // firstInde should be smalles -> b anana -> 1
     // banana
    var start = inputString.substring(0, firstIndex) + 'ay'; // -> b
    var cut = inputString.substring(firstIndex);
    return cut + start; // anana + bay
  }
}

// Tests

if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();
}
