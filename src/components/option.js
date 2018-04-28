import React from 'react';

const Option = (props) => {

  const placeholderText = props.number + '. Enter an option';

  return(
    <div>
      <input type='text' value={props.value} placeholder={placeholderText} onChange={props.changed} />
    </div>
  );
}

export default Option;
