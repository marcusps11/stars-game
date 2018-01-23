import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import colors from './colors.js';

class Number extends React.PureComponent {
  constructor(props) {
    super(props)
    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler() {
   if(!this.props.isUsed) {
     this.props.onClick(this.props.number)
   }
  }

  style() {
    if(this.props.isUsed) {
      return {backgroundColor: colors.used}
    }

    if(this.props.isSelected) {
      return {
        backgroundColor: this.props.selectionIsWrong
          ? colors.wrong
          : colors.selected,
      }
    }
    return {}
  }

  render() {
      return (
        <button
          className="number"
          onClick={this.clickHandler}
          style={this.style()}
          >
          {this.props.number}
        </button>
      );
    }
}

export default Number;
