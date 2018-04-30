import React from 'react';
import styles from './Button.css';

const button = (props) => {
  return <button className={styles.Button} disabled={props.disabled}>{props.label}</button>;
};

export default button;
