import React from 'react';
const _ = require('lodash');
import Square from './Square.js'

/*
 *  0  1  2  3
 *  4  5  6  7
 *  8  9  10 11
 *  12 13 14 15
 */
const lines = [
  // left
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  // up
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  // right
  [3, 2, 1, 0],
  [7, 6, 5, 4],
  [11, 10, 9, 8],
  [15, 14,13, 12],
  // down
  [12, 8, 4, 0],
  [13, 9, 5, 1],
  [14, 10, 6, 2],
  [15, 11, 7, 3]
];

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: this._initGame(),
    }
  }

  _initGame() {
    let squares = _.fill(Array(16), null);

    // random assign two squares to 2 or 4, make sure one of them is 2
    const valOne = _.random(0, 15);
    squares[valOne] = 2;

    let valTwo = _.random(0, 15);
    while(valTwo === valOne) {
      valTwo = _.random(0, 15);
    }
    squares[valTwo] = _.random(1, 2) * 2;
    return squares;
  }

  // check if game win
  _isGameWin() {
    return _.find(this.state.squares, val => 2048) ? true : false;
  }
  // check if game over
  _isGameOver() {
    if (_.find(this.state.squares, val => null)) {
      return false;
    }

    //TODO
  }

  // handle up, down, left, right keyboard event
  _handleKeyPress(e) {
    if (e.keyCode === 37) { // left
      this._handleOneKey(0);
    } else if (e.keyCode === 38) { // up
      this._handleOneKey(1);
    } else if (e.keyCode === 39) { // right
      this._handleOneKey(2);
    } else if (e.keyCode === 40) { // down
      this._handleOneKey(3);
    }

    const squares = this.state.squares;
  }

  _handleOneKey(index) {
    const squares = this.state.squares;
    const chunks = _.chunk(lines, 4);

    _.forEach(chunks[index], line => {
        // filter out null value
        const array = _.filter(line, index => !_.isNull(squares[index]));

        // concatenate values
        let values = [];
        for (let i = 0; i < array.length; i++) {
          if (i != array.lengh - 1 && squares[array[i]] === squares[array[i+1]]) {
            values.push(squares[array[i]] * 2);
            i++;
          } else {
            values.push(squares[array[i]]);
          }
        }

        // update squares
        for (let i = 0; i < line.length; i++) {
          if (i >= values.length) {
            squares[line[i]] = null;
          } else {
            squares[line[i]] = values[i];
          }
        }
      });

      // select a random grid whose value is null, and set it as either 2 or 4
      const grids = _.filter(_.range(16), index => _.isNull(squares[index]));
      squares[grids[_.random(0, grids.length - 1)]] = _.random(1, 2) * 2;

      // set state
      this.setState(squares);
  }

	render() {
    document.body.onkeydown = (e) => this._handleKeyPress(e);

    const squares = this.state.squares;
		return (
      <div>
			  <div className="game-row">
          <Square value={squares[0]}/>
          <Square value={squares[1]}/>
          <Square value={squares[2]}/>
          <Square value={squares[3]}/>
        </div>
        <div className="game-row">
          <Square value={squares[4]}/>
          <Square value={squares[5]}/>
          <Square value={squares[6]}/>
          <Square value={squares[7]}/>
        </div>
        <div className="game-row">
          <Square value={squares[8]}/>
          <Square value={squares[9]}/>
          <Square value={squares[10]}/>
          <Square value={squares[11]}/>
        </div>
        <div className="game-row">
          <Square value={squares[12]}/>
          <Square value={squares[13]}/>
          <Square value={squares[14]}/>
          <Square value={squares[15]}/>
        </div>
      </div>
    );
	}
}

export default Game;