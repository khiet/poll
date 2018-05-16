import React from 'react';
import styles from './VoteResult.css'

const voteResult = (props) => {
  return(
    <div className={styles.VoteResult}>
      <div className={styles.VoteOption}>{props.option}</div>
      <div className={styles.VoteTotal}>{props.total}</div>
    </div>
  );
};

export default voteResult;
