import React from 'react';

import Input from '../UI/Input/Input';
import Aux from '../../hoc/Aux/Aux';

import DatePicker from '../../components/DatePicker/DatePicker';

const showDatePicker = () => {
  console.log('showDatePicker');
};

const dateSelectedHandler = (day) => {
  console.log(day);
};

const pollOption = (props) => {
  let placeholderText = null;

  if (props.pollType === 'text') {
    placeholderText = props.number + '. Enter an option';
  } else if (props.pollType === 'date') {
    placeholderText = props.number + '. Enter a date';
  }

  return(
    <Aux>
      <DatePicker clicked={dateSelectedHandler} />
      <Input
        value={props.value}
        changed={props.changed}
        focused={showDatePicker}
        inputType='text'
        placeholder={placeholderText}
      />
    </Aux>
  );
}

export default pollOption;
