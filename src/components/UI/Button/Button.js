import React from 'react';
import styles from './Button.css';

const button = (props) => {

  let buttonStyle = styles.Button;
  if (props.secondary) {
    buttonStyle = styles.ButtonSecondary;
  }

  return(
    <button
      className={buttonStyle}
      disabled={props.disabled}
      onClick={props.clicked}
    >
      {props.label}
    </button>
  );
};

export default button;
