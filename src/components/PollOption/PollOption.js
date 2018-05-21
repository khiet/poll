import React from 'react';

import Input from '../UI/Input/Input';

const pollOption = (props) => {
  let placeholderText = null;

  if (props.pollType === 'text') {
    placeholderText = props.number + '. Enter an option';
  } else if (props.pollType === 'date') {
    placeholderText = props.number + '. Enter a date';
  }

  return(
    <Input
      number={props.number}
      value={props.value}
      changed={props.changed}
      inputType='text'
      placeholder={placeholderText}
    />
  );
}

export default pollOption;
