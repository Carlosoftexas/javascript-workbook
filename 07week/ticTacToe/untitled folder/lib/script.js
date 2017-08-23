'use strict';

// class definition like we uses i.e.
// var date = new Date() // -> gives us instance of type Date
/*
function Checker(p1, p2) {
  this.p1;
  this.p2;
}
var checker = new Checker('a', 'p');
*/

class TicTacToe extends React.Component {
  // constructor method
  // let ttt = new TicTacToe(props)

  constructor(props) {
    super(props); // reference to the super class
    // super.showInfo(); // piints to the super class, in thie case React.Component
    // this.selectSquare('');  // points to the current instance
    this.state = {
      player: 'X'
    };
  }

  selectSquare(squareElem) {
    /*
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
      */
  }

  render() {
    // bring it to the dom

    debugger;
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement('div', { 'data-cell': '0', onClick: () => this.selectSquare(this), 'class': 'square type-{this.player}' }),
        React.createElement('div', { 'data-cell': '1', onClick: () => this.selectSquare(this), 'class': 'square type-{this.player}' }),
        React.createElement('div', { 'data-cell': '2', onClick: () => this.selectSquare(this), 'class': 'square type-{this.player}' })
      ),
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement('div', { 'data-cell': '3', onClick: () => this.selectSquare(this), 'class': 'square type-{this.player}' }),
        React.createElement('div', { 'data-cell': '4', onClick: () => this.selectSquare(this), 'class': 'square type-{this.player}' }),
        React.createElement('div', { 'data-cell': '5', onClick: () => this.selectSquare(this), 'class': 'square type-{this.player}' })
      ),
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement('div', { 'data-cell': '6', 'class': 'square type-{this.player}' }),
        React.createElement('div', { 'data-cell': '7', 'class': 'square type-{this.player}' }),
        React.createElement('div', { 'data-cell': '8', 'class': 'square type-{this.player}' })
      )
    );
  }
}

ReactDOM.render(React.createElement(TicTacToe, null), document.getElementById('tic-tac-toe'));