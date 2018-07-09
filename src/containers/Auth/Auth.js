import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import styles from './Auth.css';
import axios from 'axios';
import axiosPolls from '../../axios-polls';

class Auth extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    signUp: true,
    submittable: false
  }

  authenticateUser = e => {
    e.preventDefault();

    if (this.state.signUp) {
      this.signupUser(this.state.email, this.state.password);
    } else {
      this.loginUser(this.state.email, this.state.password);
    }
  };

  signupUser = (email, password) => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    axios.post(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + process.env.REACT_APP_FIREBASE_API_KEY, authData
    ).then(res => {
      const expiryDate = new Date(new Date().getTime() + (res.data.expiresIn * 1000));
      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem('expiryDate', expiryDate);
      localStorage.setItem('localId', res.data.localId);

      const user = {
        name: this.state.name,
        localId: res.data.localId
      };

      axiosPolls.post(
        '/users.json', user
      ).then(res => {
        const userId = res.data.name;
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', this.state.name);

        if (this.props.authSuccess) {
          this.props.authSuccess();
        }
      }).catch(err => {
        console.log('err: ', err);
      });
    }).catch(err => {
      console.log('err: ', err);
    });
  };

  loginUser = (email, password) => {
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    axios.post(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + process.env.REACT_APP_FIREBASE_API_KEY, authData
    ).then(res => {

      axiosPolls.get(
        '/users.json?orderBy="localId"&equalTo="' + res.data.localId + '"'
      ).then(res => {
        const userId = Object.keys(res.data)[0];
        const userName = Object.values(res.data)[0].name;
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', userName);
      }).catch(err => {
        console.log('err: ', err);
      });

      const expiryDate = new Date(new Date().getTime() + (res.data.expiresIn * 1000));
      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem('expiryDate', expiryDate);
      localStorage.setItem('localId', res.data.localId);

      if (this.props.authSuccess) {
        this.props.authSuccess();
      }
    }).catch(err => {
      console.log(err);
    });
  };

  nameChangedHandler = e => {
    this.setState({name: e.target.value});
  };

  emailChangedHandler = e => {
    this.setState({email: e.target.value});
  };

  passwordChangedHandler = e => {
    this.setState({password: e.target.value});
  };

  switchAuth = e => {
    e.preventDefault();

    this.setState({signUp: !this.state.signUp});
  }

  componentDidUpdate(prevProps, prevState) {
    const submittable = (this.state.email !== '' && this.state.password !== '');

    if (prevState.submittable !== submittable) {
      this.setState({submittable: submittable});
    }
  }

  render() {

    let nameTextField = null;
    if (this.state.signUp) {
      nameTextField = (
        <Input inputType='text'
          placeholder='Name'
          changed={this.nameChangedHandler}
        />
      );
    }

    return(
      <div className={styles.Content}>
        <div className={styles.Heading}>
          Please sign up or log in to continue
        </div>
        <form onSubmit={this.authenticateUser}>
          {nameTextField}
          <Input inputType='email'
            placeholder='Email'
            changed={this.emailChangedHandler}
          />
          <Input
            inputType='password'
            placeholder='Password'
            changed={this.passwordChangedHandler}
          />
          <Button label={this.state.signUp ? 'Sign Up' : 'Log In' } disabled={!this.state.submittable} />
        </form>
        <div className={styles.SwitchAuth}>
          {this.state.signUp ? 'Already have an account?' : 'Do not have an account yet?' }
          <div className={styles.SwitchAuthLink} onClick={this.switchAuth}>
            {this.state.signUp ? 'Log In' : 'Sign Up'}
          </div>
        </div>
      </div>
    );
  }
}

export default Auth;
