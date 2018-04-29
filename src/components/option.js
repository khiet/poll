import React from 'react';

import Aux from '../hoc/Aux/Aux';
import Input from './UI/Input/Input';

const Option = (props) => {
  const placeholderText = props.number + '. Enter an option';

  return(
    <Aux>
      <Input
        number={props.number}
        value={props.value}
        placeholder={placeholderText}
        changed={props.changed}
      />
    </Aux>
  );
}

export default Option;
