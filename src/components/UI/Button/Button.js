import React from 'react';
import styles from './Button.css';

const Button = (props) => {
  return <button className={styles.Button}>{props.label}</button>;
};

export default Button;
