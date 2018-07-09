import React from 'react';
import styles from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
  let modalToDisplay = null;

  let control = null;
  if (props.controls) {
    const controls = props.controls.map((ctl) => {
      const style = ctl.primary ? styles.PrimaryControl : styles.SecondaryControl;

      return(
        <div key={ctl.label} className={style} onClick={ctl.clicked}>
          {ctl.label}
        </div>
      );
    });

    control = <div className={styles.ModalControl}>{controls}</div>;
  }

  if (props.show) {
    modalToDisplay = (
      <div className={styles.Modal}>
        {props.children}
        {control}
      </div>
    );
  }

  return(
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.backdropClicked} />
      {modalToDisplay}
    </React.Fragment>
  );
};

export default modal;
