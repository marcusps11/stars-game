import React  from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import colors from './colors.js';

class Number extends React.PureComponent {
  constructor(props) {
    super(props)
    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler() {
   if(!this.props.status !== 'used') {
     this.props.onClick(this.props.number)
   }
  }

  componentDidUpdate() {
    console.log('Numebr updated');
   }

   componentWillUpdate(nextProps) {
    console.log(this.props, nextProps);
   }

  style() {
    return { backgroundColor: colors[this.props.status]}
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
