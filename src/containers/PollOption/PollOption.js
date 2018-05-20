import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Aux from '../../hoc/Aux/Aux';

import DatePicker from '../../components/DatePicker/DatePicker';

class PollOption extends Component {

  state = {
    optionValue: '',
    showDate: false
  }

  showDatePickerHandler = () => {
    if (this.props.pollType === 'date') {
      this.setState({showDate: true, optionValue: ''});
    }
  };

  dateSelectedHandler = (day) => {
    const updatedValue = day.toLocaleDateString();

    this.setState(
      {optionValue: updatedValue, showDate: false},
      this.props.onOptionValueChange(updatedValue)
    );
  };

  inputChangedHandler = (e) => {
    const updatedValue = e.target.value;

    this.setState(
      {optionValue: updatedValue},
      this.props.onOptionValueChange(updatedValue)
    );
  };

  render() {
    let datePicker = null;
    if (this.state.showDate && !this.state.optionValue) {
      datePicker = <DatePicker clicked={this.dateSelectedHandler} />;
    }

    return(
      <Aux>
        {datePicker}
        <Input
          inputType='text'
          value={this.state.optionValue}
          changed={this.inputChangedHandler}
          focused={this.showDatePickerHandler}
          placeholder={this.props.placeholder}
        />
      </Aux>
    );
  }
}

export default PollOption;
