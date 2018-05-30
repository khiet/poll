import React from 'react';

import styles from './VoteOption.css';

const voteOption = (props) => {

  const voteLabelStyle = props.voted ? styles.VotedLabel : styles.VoteLabel;
  let radioInput = null;
  if (props.changed) {
    radioInput = (
      <input type='radio'
        name={props.group}
        value={props.title}
        id={props.title}
        onChange={props.changed}
      />
    );
  }

  return(
    <div className={styles.VoteOption}>
      <div className={styles.InputContainer}>
        {radioInput}
        <label className={voteLabelStyle} htmlFor={props.title}>
          {props.title}
        </label>
      </div>
      <span>
        {props.total}
      </span>
    </div>
  );
};

export default voteOption;
