import React, { Component } from 'react';

import styles from './User.css';
import axios from '../../axios-polls';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';

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

  componentDidUpdate(prevProps, prevState) {
    const submittable = (this.state.name !== '');

    if (prevState.submittable !== submittable) {
      this.setState({submittable: submittable});
    }
  }

  render() {
    return(
      <Modal show={this.state.showModal}>
        <div className={styles.Heading}>
          Please enter your name
        </div>
        <form onSubmit={this.createUserHandler}>
          <Input
            inputType='text'
            placeholder='Your name'
            changed={this.nameChangedHandler}
          />
          <Button label='CONFIRM AND VOTE' disabled={!this.state.submittable} />
        </form>
      </Modal>
    );
  }
}

export default User;
