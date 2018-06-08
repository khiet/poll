import React from 'react';
import styles from './Input.css';

const input = (props) => {
  return(
    <input
      type={props.inputType}
      className={styles.Input}
      id={props.id}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.changed}
      onFocus={props.focused}
      onBlur={props.blured}
      readOnly={props.readOnly}
    />
  );
};

export default input;
