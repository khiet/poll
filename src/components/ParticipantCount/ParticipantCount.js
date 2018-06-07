import React from 'react';

import styles from './ParticipantCount.css';

const participantCount = (props) => {
  return(
    <div className={styles.Content}>
      <div className={styles.ParticipantCount}>
        {props.count} participants
      </div>
    </div>
  );
};

export default participantCount;
