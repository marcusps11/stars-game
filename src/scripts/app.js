import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Number from './components/number.js';

const randomSum = (arr, maxSum) => {
  const sets = [[]], sums = [];
  for (let i = 0; i < arr.length; i++) {
  for (let j = 0, len = sets.length; j < len; j++) {
  const candidateSet = sets[j].concat(arr[i]);
  const candidateSum = _.sum(candidateSet);
  if (candidateSum <= maxSum) {
  sets.push(candidateSet);
  sums.push(candidateSum);
  }
  }
  }
  return _.sample(sums);
 }

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedNumbers: [],
      usedNumbers: [],
      seconds: 5

    }
    this.onNumberClick = this.onNumberClick.bind(this)
    this.numbers = _.range(1, 10);
    this.stars = _.range(1 + Math.floor(9 * Math.random()));
    this.selectionIsWrong = false;

  }


  selectionIsWrong() {
    _.sum(this.state.selectedNumbers) > this.stars
  }

  renderStars() {
    return this.stars.map(starIndex =>
    <div className="star" key={starIndex} />
    );
   }

   renderPlayAgain() {
     return (
       <div className="game-done">
          <div className="message">Nice!</div>
          <button onClick={this.resetGame}>Play again</button>
        </div>
     )
   }

   renderGameOver() {
    return (
      <div className="game-done">
         <div className="message">Unlucky</div>
         <button onClick={this.resetGame}>Play again</button>
       </div>
    )
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }



   resetGame = () => {
    this.stars = _.range(randomSum(this.numbers, 9));
    this.gameIsDone = false;
    this.setState({
    selectedNumbers: [],
    usedNumbers: [],
    seconds: 5
    });
   }

   startTimer() {
      this.timer = setInterval(this.countDown.bind(this), 1000);
   }

   countDown() {
    if(this.state.seconds >= 0) {
      let seconds = this.state.seconds -1
      console.log(this.state.seconds)
      this.setState({
        seconds: seconds
      })
    }
    if(this.state.seconds === 0) {
      this.gameIsDone = true
    }
   }

  onNumberClick(number) {
    this.startTimer()
    this.setState(prevState => {
      let {
        selectedNumbers,
        usedNumbers
      } = prevState;

      if (selectedNumbers.indexOf(number) >= 0) {
        selectedNumbers = selectedNumbers.filter(sN => sN !== number)
      } else {
        selectedNumbers = [...selectedNumbers, number];
      }

      const selectedSum = _.sum(selectedNumbers);
      this.selectionIsWrong = selectedSum > this.stars.length;


      if(selectedSum === this.stars.length) {
        usedNumbers = [...usedNumbers, ...selectedNumbers];
        selectedNumbers = [];
        this.stars = _.range(
          randomSum(_.difference(this.numbers, usedNumbers), 9)
        );
      }

      this.gameIsDone =
      usedNumbers.length === this.numbers.length;

      return {
        selectedNumbers,
        usedNumbers
        }
    })
  }

  numberStatus(number) {
    if (this.state.usedNumbers.indexOf(number) >= 0) {
      return 'used'
    }
    const isSelected =
      this.state.selectedNumbers.indexOf(number) >=0;
    if (isSelected) {
      return this.selectionIsWrong ? 'wrong' :'selected';
    }
    return 'available'

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
            {this.gameIsDone ? this.state.seconds > 0 ? this.renderPlayAgain(): this.renderGameOver() : this.renderStars()}
          </div>
          <div className="play-numbers">
          {this.numbers.map(number => {
              return (
                <Number
                 key={number}
                 number={number}
                 status={this.numberStatus(number)}
                 onClick={this.onNumberClick}
                  />
              )
          }
          )}
          </div>
          <div className="timer">
          </div>
        </div>
      </div>
    );
  }
}

 ReactDOM.render((
  <Game />
), document.getElementById('root'))
