import React from 'react';

import Input from './UI/Input/Input';

const pollOption = (props) => {
  const placeholderText = props.number + '. Enter an option';

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
