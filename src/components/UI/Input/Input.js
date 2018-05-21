import React from 'react';
import styles from './Input.css';

const input = (props) => {
  return(
    <input
      type={props.inputType}
      className={styles.Input}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.changed}
      onFocus={props.focused}
    />
  );
};

export default input;
