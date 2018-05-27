import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import styles from './Auth.css';
import axios from '../../axios-polls';

class Auth extends Component {

  state = {
    email: '',
    password: '',
    signUp: true
  }

  authenticateUser = (e) => {
    e.preventDefault();

    if (this.state.signUp) {
      this.signupUser(this.state.email, this.state.password);
    } else {
      this.loginUser(this.state.email, this.state.password);
    }
  };

  signupUser = (email, password) => {
    console.log('signup', email, password);
  };

  loginUser = (email, password) => {
    console.log('login', email, password);
  };

  emailChangedHandler = (e) => {
    this.setState({email: e.target.value});
  };

  passwordChangedHandler = (e) => {
    this.setState({password: e.target.value});
  };

  switchAuth = (e) => {
    e.preventDefault();

    this.setState({signUp: !this.state.signUp});
  }

  render() {
    return(
      <div className={styles.Auth}>
        <form onSubmit={this.authenticateUser}>
          <Input inputType='text'
            placeholder='Email'
            value={this.state.email}
            changed={this.emailChangedHandler}
          />
          <Input
            inputType='password'
            placeholder='Password'
            value={this.state.password}
            changed={this.passwordChangedHandler}
          />
          <Button label={this.state.signUp ? 'Sign Up' : 'Log In' } />
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
