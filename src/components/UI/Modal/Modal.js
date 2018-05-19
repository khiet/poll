import React from 'react';
import styles from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const modal = (props) => {
  let modalToDisplay = null;
  if (props.show) {
    modalToDisplay = (
      <div className={styles.Modal} onClick={props.clicked}>
        {props.children}
      </div>
    );
  }

  return(
    <Aux>
      <Backdrop show={props.show} clicked={props.clicked} />
      {modalToDisplay}
    </Aux>
  );
};

export default modal;
