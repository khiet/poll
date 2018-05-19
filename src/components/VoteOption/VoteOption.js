import React from 'react';

import styles from './VoteOption.css';

const voteOption = (props) => {
  return(
    <div className={styles.VoteOption}>
      <input type='radio'
        name={props.group}
        value={props.title}
        id={props.title}
        onChange={props.changed}
      />

      <label className={styles.VoteLabel} htmlFor={props.title}>
        {props.title}
      </label>
      <span className={styles.Result}>
        {props.total}
      </span>
    </div>
  );
};

export default voteOption;
