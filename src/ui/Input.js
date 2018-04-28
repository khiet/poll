import React from 'react';
import styles from './Input.css';

const Input = (props) => {
  return <input className={styles.Input} type='text' value={props.value} placeholder={props.placeholder} onChange={props.changed} />;
};

export default Input;
