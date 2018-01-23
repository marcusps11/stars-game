import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Number from './components/number.js';

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stars:  1 + Math.floor(9 * Math.random()),
      selectedNumbers: [2, 4],
      usedNumbers: [7, 8]
    }
  }

  selectionIsWrong() {
    _.sum(this.state.selectedNumbers) > this.state.stars
  }

  render() {
    return (
      <div className="game">
        <div className="help">
          Pick 1 or more numbers that sum
          to the number of stars
        </div>
        <div className="body">
          <div className="stars">
          {_.range(this.state.stars).map(starIndex =>
            <div key={starIndex} className="star" />
          )}
          </div>
          <div className="play-numbers">
          {_.range(1, 10).map(number => {
            const isUsed =
              this.state.usedNumbers.indexOf(number) >= 0;
            const isSelected =
              this.state.selectedNumbers.indexOf(number) >= 0;

              return (
                <Number
                 key={number}
                 number={number}
                 isUsed={isUsed}
                 isSelected={isSelected}
                 selectionIsWrong={this.selectionIsWrong}
                  />
              )
          }
          )}

          </div>
        </div>
      </div>
    );
  }
}

 ReactDOM.render((
  <Game />
), document.getElementById('root'))
