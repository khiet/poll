import React from 'react';

import styles from './PollOption.css';

const pollOption = (props) => {
  return(
    <div className={styles.PollOption}>
      <label className={styles.Container} htmlFor={props.title}>
        {props.title}
        <input type='radio' name={props.group} value={props.title} id={props.title} onChange={props.changed} />
        <span className={styles.Checkmark}></span>
      </label>
      <span className={styles.Result}>
        {props.total}
      </span>
    </div>
  );
};

export default pollOption;
