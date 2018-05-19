import React from 'react';
import styles from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const modal = (props) => {
  return(
    <Aux>
      <Backdrop />
      <div className={styles.Modal}>
        {props.children}
      </div>
    </Aux>
  );
};

export default modal;
