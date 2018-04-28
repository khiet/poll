import React from 'react';

import styles from './TextArea.css';

const TextArea = (props) => {
  return(
    <textarea className={styles.TextArea}
      onChange={props.changed}
      placeholder={props.placeholder}
    />
  );
};

export default TextArea;
