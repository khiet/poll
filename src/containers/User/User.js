import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-polls';

import styles from './User.css';

class User extends Component {

  state = {
    name: '',
    submittable: false,
    showModal: true
  }

  nameChangedHandler = e => {
    this.setState({name: e.target.value});
  };

  createUserHandler = e => {
    e.preventDefault();

    const user = {
      name: this.state.name
    }

    axios.post(
      '/users.json', user
    ).then(res => {
      this.setState({ showModal: false });

      const userId = res.data.name;
      localStorage.setItem('userId', userId);
      if (this.props.onSuccess) {
        this.props.onSuccess(userId);
      }
    }).catch(err => {
      console.log('err: ', err);
    });
  };

  hideModalHandler = () => {
    this.setState({ showModal: false });
  };

  componentDidUpdate(prevProps, prevState) {
    const submittable = (this.state.name !== '');

    if (prevState.submittable !== submittable) {
      this.setState({submittable: submittable});
    }
  }

  render() {
    return(
      <Modal
        show={this.state.showModal}
        backdropClicked={this.hideModalHandler}
      >
        <div className={styles.User}>
          <form onSubmit={this.createUserHandler}>
            <Input
              inputType='text'
              placeholder='Your name'
              changed={this.nameChangedHandler}
            />
            <Button label='CONFIRM AND VOTE' disabled={!this.state.submittable} />
          </form>
        </div>
      </Modal>
    );
  }
}

export default User;
