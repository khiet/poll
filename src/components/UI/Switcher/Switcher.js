import React from 'react';
import styles from './Switcher.css';

const switcher = (props) => {
  return(
    <div className={styles.Switcher}>
      <div className={styles.Active}>Text</div>
      <div className={styles.Option}>Date</div>
    </div>
  );
};

export default switcher;
