'use strict';
// define global
var player = '';

document.addEventListener('DOMContentLoaded', () => {
    // find button element
    // oBtn hold a reference to the html element
    var oBtn = document.querySelector('#o'); // -> real html elem -> btn -> location - harddrive
    // register event handler
    oBtn.addEventListener('click', () => {
      player = 'O';
       displayUserChoice();
       renderBoard();
       console.log(player); // -> O
    });

    var xBtn = document.querySelector('#x');
    xBtn.addEventListener('click', () => {
      player = 'X';
      displayUserChoice();
      renderBoard();
    });

    var clearBtn = document.querySelector('#clear');
    clearBtn.addEventListener('click', () => {
      console.log('clear');
      player = '';
      resetBoard();
    });

});

function resetBoard() {
 for (var i=0; i<9; i++) {
    // assign player's class
    document.getElementById('_'+i).className
      = 'square';
 }
  document.querySelector('#announce-winner').innerHTML = 'Chose X or O';
}

function renderBoard() {
  // select all elems with class square
 var squares = document.getElementsByClassName('square');
 for (var i=0; i<squares.length; i++) {

    // assign player's class
    document.getElementById(squares[i].id).className
      = 'square type-' + player;
 }
}

function checkWin() {

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

function horizontalWin() {
	for (var i=0; i<9; i += 3) { // top - bottom
		var count = 0;
      console.log('row');
    for (var k=0; k<3; k++) { // left - right
      if (document.getElementById('_'+(k+i))
          .className.startsWith('taken type-'+player)) {
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
   console.log('player', player);
	for (var i=0; i<3; i++) {
		var count = 0;
		for (var k=0; k<9; k +=3) {
      if (document.getElementById('_'+(k+i))
          .className.startsWith('taken type-'+player)) {
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
	for (var i=0; i<9; i += 4) {
      if (document.getElementById('_'+i)
          .className.startsWith('taken type-'+player)) {
        count1++;
      }
  }

	for (var i=2; i<9-1; i += 2) {
      if (document.getElementById('_'+i)
          .className.startsWith('taken type-'+player)) {
        count2++;
      }
  }
	if (count1==3 || count2==3) {
		return true;
	}
	return false;
}


function displayUserChoice() {

  var squares = document.getElementsByClassName('square');
  for (var i=0; i<squares.length; i++) {
     document.getElementById(squares[i].id)
        .removeEventListener('click', handleEvent);
      document.getElementById(squares[i].id)
        .addEventListener('click', handleEvent
      );
  }
    document.querySelector('#announce-winner').innerHTML = 'Player: ' + player;
};

var handleEvent = function (event) {
          //console.log('player', player);
            document.getElementById(event.target.id).className = 'taken type-'+player;
          if (checkWin()) {
            document.querySelector('#announce-winner').innerHTML = 'Player: ' + player + ' Won';
            setTimeout(function() {
              //player = '';
              //resetBoard();
              location.href = location.href;
            }, 4000);
          } else {
            player = (player=='X') ? 'O' : 'X';
            renderBoard();
          }
        }
