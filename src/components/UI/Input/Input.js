import React from 'react';
import styles from './Input.css';

const Input = (props) => {
  return(
    <input
      type='text'
      className={styles.Input}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.changed}
    />
  );
};

export default Input;
