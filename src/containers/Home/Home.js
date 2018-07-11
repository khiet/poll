import React, { Component } from 'react';

import styles from './Home.css';
import sharedStyles from '../../assets/stylesheets/Shared.css';

import homeIcon from '../../assets/images/home-icon.png';

import Button from '../../components/UI/Button/Button';
import Auth from '../../containers/Auth/Auth';
import Modal from '../../components/UI/Modal/Modal';

import * as navigationTitles from '../../components/Navigation/NavigationTitles';
import { Link } from 'react-router-dom';

class Home extends Component {

  state = {
    authenticated: false,
    showAuthModal: false
  }

  componentDidMount() {
    // set authenticated to true if user auth items are present and has a valid expiryDate
    if (localStorage.getItem('token') &&
      localStorage.getItem('expiryDate') &&
      localStorage.getItem('localId') &&
      localStorage.getItem('userId') &&
      localStorage.getItem('userName')) {

      const expiryDate = new Date(localStorage.getItem('expiryDate'));
      if (expiryDate > new Date()) {
        this.setState({authenticated: true});
      }
    }
  }

  authenticateUserHandler = () => {
    this.setState({showAuthModal: true});
  }

  hideAuthModalHandler = () => {
    this.setState({showAuthModal: false});
  }

  authenticateUserSuccess = () => {
    const location = {
      pathname: '/polls/',
      state: { title: navigationTitles.CREATE_POLL }
    };
    this.props.history.push(location);
  }

  render() {

    let createPollLink = <Button label="LOGIN TO CREATE POLL" clicked={this.authenticateUserHandler} />
    if (this.state.authenticated) {
      createPollLink = (
        <Link
          className={sharedStyles.Link}
          to={{pathname: '/polls', state: {title: navigationTitles.CREATE_POLL}}}
        >
          CREATE POLL
        </Link>
      );
    }

    return(
      <React.Fragment>
        <div className={styles.Content}>
          <img src={homeIcon} alt='panda' className={styles.Logo} />
          <h1>Ready to make a poll?</h1>
          {createPollLink}
        </div>
        <Modal
          backdropClicked={this.hideAuthModalHandler}
          show={this.state.showAuthModal}
        >
          <Auth authSuccess={this.authenticateUserSuccess} />
        </Modal>
      </React.Fragment>
    );
  }
}

export default Home;
