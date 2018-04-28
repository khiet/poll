import React from 'react';

import Input from '../ui/Input';

const Option = (props) => {
  const placeholderText = props.number + '. Enter an option';

  return(
    <div>
      <Input number={props.number} value={props.value} placeholder={placeholderText} changed={props.changed} />
    </div>
  );
}

export default Option;
