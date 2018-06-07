import React from 'react';

import styles from './UserVote.css';

const userVote = (props) => {

  return(
    <div className={styles.Content}>
      <div className={styles.Name}>{props.name}</div>
      <div className={styles.Value}>{props.value}</div>
    </div>
  );

};

export default userVote;
