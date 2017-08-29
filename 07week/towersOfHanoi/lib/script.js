'use strict';

/**
 * group attributes and methods

let ttt = new TicTacToe();
ttt.handleClick();
TicTacToe.handleClick()
ttt.info()
 */

class TowersOfHanoi extends React.Component {

  constructor(props) {
    super(props); // reference to the super class
    this.state = { // property
      startTower: 'st1',
      endTower: 'st3',
      mover: false, // brick we want to move
      moverStack: false, // tower mover currently is in
      currentStack: false // target stack we wish to drop the brick
    };
  }

  /**
   * gets executed by react after contructor -> render
   */
  componentDidMount() {
    this.setInfo('Select a block to start');
  }

  resetState() {
    this.state.mover = false;
    this.state.moverStack = false;
    this.state.currentStack = false;
  }

  /**
   * click on brick
   * @param {*} event contains an attribute: target which references the html
   * element we clicked upon
   */
  handleBlockClick(event) {
    event.stopPropagation();

    // input from user
    this.state.mover = event.target; // brick we clicked upon
    this.state.moverStack = event.target.parentNode; // current tower of the brick

    // validate input
    if (this.isBrickSelectionValid(this.state.mover, this.state.moverStack)) {
      this.setInfo('Selected: ' + this.state.mover.getAttribute('data-block'));
      return;
    } else {
      this.setInfo('Selection invalid');
      this.resetState();
    }
  }

  isBrickSelectionValid(m, st) {
    let children = st.childNodes; // all bricks inside the tower
    return children[children.length - 1].getAttribute('id') === m.getAttribute('id');
  }

  /**
   * set message to status component
   * @param {*} msg
   */
  setInfo(msg) {
    document.querySelector('.status').innerHTML = msg;
  }

  /**
   * click on tower as target for dropping the brick
   * @param {*} event
   */
  handleStackClick(event) {
    event.stopPropagation();
    this.state.currentStack = event.target;
    if (true === this.checkMoveAllowed()) {
      this.state.currentStack.appendChild(this.state.mover);
      this.setInfo('Dropped on: ' + this.state.currentStack.getAttribute('data-stack'));
      this.resetState();
      if (this.checkWinner()) {
        this.setInfo('You won!');
        this.resetState();
      }
      return;
    } else {
      this.resetState();
      this.setInfo('Invalid move');
    }
  }

  checkWinner() {
    return document.querySelector('#' + this.state.startTower).childNodes.length === 4;
  }

  /**
   * check if selected tower is valid for dropping
   */
  checkMoveAllowed() {
    if (this.state.mover === false || this.state.currentStack === false) {
      console.log('both false');
      return false;
    }
    // dropping on the same stack is not allowed
    if (this.state.currentStack.getAttribute('id') == this.state.moverStack.getAttribute('id')) {
      this.setInfo('Invalid move');
      console.log('same stack');
      return false;
    }

    let children = this.state.currentStack.childNodes;
    if (children.length < 1) {
      console.log('no childs');
      return true;
    }
    return parseInt(children[children.length - 1].getAttribute('data-block')) > parseInt(this.state.mover.getAttribute('data-block'));
  }

  resetBoard(event) {
    event.stopPropagation();
    let strtStack = document.querySelector('#st1');
    for (let i = 100; i > 0; i -= 25) {
      strtStack.appendChild(document.querySelector('div[data-block="' + i + '"]'));
    }
    this.resetState();
    this.setInfo('Select a block to start');
  }

  render() {
    // bring it to the dom

    // debugger;
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'status' },
        this.state.info
      ),
      React.createElement(
        'button',
        { onClick: e => this.resetBoard(e) },
        'Restart'
      ),
      React.createElement(
        'div',
        { 'data-stack': '1', id: 'st1', onClick: e => this.handleStackClick(e) },
        React.createElement('div', { 'data-block': '100', id: 'a1', onClick: e => this.handleBlockClick(e) }),
        React.createElement('div', { 'data-block': '75', id: 'a2', onClick: e => this.handleBlockClick(e) }),
        React.createElement('div', { 'data-block': '50', id: 'a3', onClick: e => this.handleBlockClick(e) }),
        React.createElement('div', { 'data-block': '25', id: 'a4', onClick: e => this.handleBlockClick(e) })
      ),
      React.createElement('div', { 'data-stack': '2', id: 'st2', onClick: e => this.handleStackClick(e) }),
      React.createElement('div', { 'data-stack': '3', id: 'st3', onClick: e => this.handleStackClick(e) }),
      React.createElement('div', { id: 'announce-game-won' })
    );
  }
}

ReactDOM.render(React.createElement(TowersOfHanoi, null), document.getElementById('towers-of-hanoi'));