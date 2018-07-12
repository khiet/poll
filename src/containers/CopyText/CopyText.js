import React, { Component } from 'react';

import styles from './CopyText.css';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class CopyText extends Component {

  copyHandler = () => {
    const copyText = document.getElementById("CopyTextField");
    copyText.select();

    document.execCommand("copy");
  };

  render() {
    return(
      <React.Fragment>
        <div className={styles.HelpText}>
          {this.props.helpText}
        </div>
        <div className={styles.CopyArea}>
          <Input
            id="CopyTextField"
            inputType='text'
            value={this.props.value}
            readOnly
          />
          <Button label='COPY' clicked={this.copyHandler} />
        </div>
      </React.Fragment>
    );
  }
}

export default CopyText;
