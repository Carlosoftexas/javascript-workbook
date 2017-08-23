'use strict';

/**
 * group attributes and methods

let ttt = new TicTacToe();
ttt.handleClick();
TicTacToe.handleClick()
ttt.info()
 */
class Util {
  constructor(state) {
    this.state = state;
  }

  horizontalWin() {
	for (var i=0; i<3; i++) { // top to bottom
		var count = 0;
		for (var k=0; k<3; k++) {
			if (this.state.board[k+i].className=='taken type-'+this.state.player) {
				count++;
			}
		}
		if (count==3) {
			return true;
		}
	}
	return false;
}

verticalWin() {
	for (var i=0; i<3; i++) { // left to right
		var count = 0;
		for (var k=0; k<9; k += 3) {
      console.log((k+i), this.state.board[i+k].className, this.state.player);
			if (this.state.board[i+k].className=='taken type-'+this.state.player) {
				count++;
			}
		}
		if (count==3) {
			return true;
		}
	}
	return false;
}

diagonalWin() {
	var count1 = 0;
	var count2 = 0;
	for (var i=0; i<9; i += 4) {
		if (this.state.board[i].className=='taken type-'+this.state.player) {
			count1++;
    }
  }
	for (var i=2; i<9; i += 4) {
		if (this.state.board[i].className=='taken type-'+this.state.player) {
			count2++;
		}
	}
	if (count1==3 || count2==3) {
		return true;
	}
	return false;
}

checkForWin() {
  console.log('utils check for win');

	if (this.horizontalWin()===true) {
		return true;
   }
	if (this.verticalWin()===true) {
		return true;
  }

	if (this.diagonalWin()===true) {
		return true;
  }
	return false;
}


}

class TicTacToe extends React.Component {
  constructor(props) {
    super(props); // reference to the super class

    this.state = { // property
      player: 'X', // property
      board: [] //
    }
    this.helper = new Util(this.state);
  }

  handleClick(cellIndex) {
    if (document.querySelector('div[data-cell="'+cellIndex+'"]')
        .className.startsWith('taken')) {
      return;
    }
    // is the board initialized already
    if (this.state.board.length<1) {
      for (let i=0; i<9; i++) { // 0 ... 8
        this.state.board.push(
//          document.querySelector('#someId'))
//          document.querySelector('.className'))
          document.querySelector('div[data-cell="'+i+'"]')
        )
      }
    }
    this.state.board[cellIndex].className = 'taken type-' + this.state.player;
    this.state.board[cellIndex].removeAttribute('onClick');
    if (this.helper.checkForWin()) {
      alert('Player ' + this.state.player + ' Won!');
      this.resetBoard();
    }
    this.state.player = (this.state.player === 'X') ? 'O' : 'X';
    this.state.board.map(cell => {
        if (cell.className.startsWith('square')) {
          cell.className = 'square type-' + this.state.player;
        }
    });
  }

  resetBoard() {
    this.state.board.map(cell => {
      cell.className = 'square type-X';
      this.state.player = 'X';
    });
  }

  render() { // bring it to the dom

    // debugger;
    return (
      <div>
        <div className="row">
          <div data-cell="0" className="square type-X" onClick={() => this.handleClick(0)}></div>
          <div data-cell="1" className="square type-X" onClick={() => this.handleClick(1)}></div>
          <div data-cell="2" className="square type-X" onClick={() => this.handleClick(2)}></div>
        </div>
        <div className="row">
          <div data-cell="3" className="square type-X" onClick={() => this.handleClick(3)}></div>
          <div data-cell="4" className="square type-X" onClick={() => this.handleClick(4)}></div>
          <div data-cell="5" className="square type-X" onClick={() => this.handleClick(5)}></div>
        </div>
        <div className="row">
          <div data-cell="6" className="square type-X" onClick={() => this.handleClick(6)}></div>
          <div data-cell="7" className="square type-X" onClick={() => this.handleClick(7)}></div>
          <div data-cell="8" className="square type-X" onClick={() => this.handleClick(8)}></div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <TicTacToe/>, document.getElementById('tic-tac-toe'));
