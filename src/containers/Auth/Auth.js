import React, { Component } from 'react';

import styles from './Auth.css';
import axios from 'axios';
import axiosPolls from '../../axios-polls';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import Spinner from '../../components/UI/Spinner/Spinner';

// Set token, expiryDate, localId, userId and userName in localStorage
// token is an authentication token to Firebase Database
// expiryDate is an expiry date for token
// localId is UUID for a Firebase Authentication user
// userId and userName are associated with a user stored in Firebase Database
class Auth extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    signUp: true,
    submittable: false,
    errorMessage: '',
    loading: false
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
    this.setState({loading: true});

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
        this.setState({loading: false});
        const userId = res.data.name;
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', this.state.name);

        if (this.props.authSuccess) {
          this.props.authSuccess();
        }
      }).catch(err => {
        this.setState({loading: false});

        console.log('err: ', err);
      });
    }).catch(err => {
      this.setState({loading: false});

      this.setState({errorMessage: err.response.data.error.message});
      console.log('err: ', err);
    });
  };

  loginUser = (email, password) => {
    this.setState({loading: true});

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
        this.setState({loading: false});

        const userId = Object.keys(res.data)[0];
        const userName = Object.values(res.data)[0].name;
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', userName);
      }).catch(err => {
        this.setState({loading: false});

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
      this.setState({loading: false});

      this.setState({errorMessage: err.response.data.error.message});
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

    this.setState({signUp: !this.state.signUp, errorMessage: ''});
  }

  componentDidUpdate(prevProps, prevState) {
    let submittable = (this.state.email !== '' && this.state.password !== '');
    if (this.state.signUp) { // require name for signUp
      submittable = submittable && this.state.name;
    }

    if (prevState.submittable !== submittable) {
      this.setState({submittable: submittable});
    }
  }

  render() {
    let spinner = null;
    if (this.state.loading) {
      spinner = <Spinner />;
    }

    let nameTextField = null;
    if (this.state.signUp) {
      nameTextField = (
        <Input inputType='text'
          value={this.state.name}
          placeholder='Name'
          changed={this.nameChangedHandler}
        />
      );
    }

    let errorMessageContainer = null;
    if (this.state.errorMessage) {
      errorMessageContainer = (
        <div className={styles.ErrorMessage}>
          {this.state.errorMessage}
        </div>
      );
    }

    return(
      <div className={styles.Content}>
        {spinner}
        <div className={styles.Heading}>
          Please sign up or log in to continue
        </div>
        {errorMessageContainer}
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
