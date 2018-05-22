import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Aux from '../../hoc/Aux/Aux';

import DatePicker from '../../components/DatePicker/DatePicker';

class PollOption extends Component {

  state = {
    showDate: false,
    selectedDay: null
  }

  showDatePickerHandler = () => {
    if (this.props.pollType === 'date') {
      this.setState({showDate: true});
    }
  };

  hideDatePickerHandler = () => {
    // if (this.props.pollType === 'date') {
    //   this.setState({showDate: false});
    // }
  };

  dateSelectedHandler = (day) => {
    this.setState({selectedDay: day});
  };

  render() {
    let placeholderText = null;

    if (this.props.pollType === 'text') {
      placeholderText = this.props.number + '. Enter an option';
    } else if (this.props.pollType === 'date') {
      placeholderText = this.props.number + '. Enter a date';
    }

    let datePicker = null;
    if (this.state.showDate) {
      datePicker = <DatePicker clicked={this.dateSelectedHandler} />;
    }

    return(
      <Aux>
        {datePicker}
        <Input
          inputType='text'
          value={this.state.selectedDay ? this.state.selectedDay.toLocaleDateString() : this.props.value}
          changed={this.props.changed}
          focused={this.showDatePickerHandler}
          blured={this.hideDatePickerHandler}
          placeholder={placeholderText}
        />
      </Aux>
    );
  }
}

export default PollOption;
