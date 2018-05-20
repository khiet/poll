import React from 'react';

import styles from './Navigation.css';

const navigation = (props) => {
  return(
    <div className={styles.Navigation}>
      <span className={styles.Title}>
        {props.title}
      </span>
    </div>
  );
};

export default navigation;
