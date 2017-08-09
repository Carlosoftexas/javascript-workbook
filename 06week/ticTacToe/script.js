'use strict';
// define global
var player = '';

document.addEventListener('DOMContentLoaded', () => {
    // find button element
    var oBtn = document.querySelector('#o');

    oBtn.addEventListener('click', () => {
      player = 'O';
       displayUserChoice();
    });

    var xBtn = document.querySelector('#x');

    xBtn.addEventListener('click', () => {
      player = 'X';
      displayUserChoice();
    });

});

function displayUserChoice() {
  document.querySelector('#announce-winner').innerHTML = 'Player: ' + player;
};
