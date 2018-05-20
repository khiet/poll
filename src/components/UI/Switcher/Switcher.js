import React from 'react';
import styles from './Switcher.css';

const switcher = (props) => {
  return(
    <div className={styles.Switcher}>
      <div
        className={props.selectedType === 'text' ? styles.OptionActive : styles.Option}
        onClick={() => props.clicked('text')}
      >
        Text
      </div>
      <div
        className={props.selectedType === 'date' ? styles.OptionActive : styles.Option}
        onClick={() => props.clicked('date')}
      >
        Date
      </div>
    </div>
  );
};

export default switcher;
