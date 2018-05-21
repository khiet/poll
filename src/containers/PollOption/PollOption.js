import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Aux from '../../hoc/Aux/Aux';

import DatePicker from '../../components/DatePicker/DatePicker';

class PollOption extends Component {

  showDatePickerHandler = () => {
    console.log('showDatePickerHandler');
  };

  dateSelectedHandler = (day) => {
    console.log(day);
  };

  render() {
    let placeholderText = null;

    if (this.props.pollType === 'text') {
      placeholderText = this.props.number + '. Enter an option';
    } else if (this.props.pollType === 'date') {
      placeholderText = this.props.number + '. Enter a date';
    }

    return(
      <Aux>
        <DatePicker clicked={this.dateSelectedHandler} />
        <Input
          inputType='text'
          value={this.props.value}
          changed={this.props.changed}
          focused={this.showDatePickerHandler}
          placeholder={placeholderText}
        />
      </Aux>
    );
  }
}

export default PollOption;
