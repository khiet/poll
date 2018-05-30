import React, { Component } from 'react';
import styles from './App.css';
import sharedStyles from './assets/stylesheets/Shared.css';

import PollBuilder from './containers/PollBuilder/PollBuilder';
import Poll from './containers/Poll/Poll';
import PollResult from './containers/PollResult/PollResult';

import Navigation from './components/Navigation/Navigation';
import pandaImage from './assets/images/poll-logo.png';

import { Switch, Route, Link, withRouter } from 'react-router-dom';

import * as navigationTitles from './components/Navigation/NavigationTitles';

const debugging = (props) => {
  console.log('this.props.history: ', props.history);
  console.log('this.props.location: ', props.location);
  console.log('this.props.match: ', props.match);
  console.log('localStorage: ', localStorage);
};

class App extends Component {
  render() {
    debugging(this.props);

    let navigationTitle = navigationTitles.DEFAULT;
    if (this.props.location.state) {
      navigationTitle = this.props.location.state.title;
    }

    return (
      <div className={styles.App}>
        <Navigation title={navigationTitle} />
        <Switch>
          <Route path='/polls/:id/result' component={PollResult} />
          <Route path='/polls/:id' component={Poll} />
          <Route path='/polls' component={PollBuilder} />
          <Route path='/' render={() => {
            return(
              <div className={styles.Content}>
                <img src={pandaImage} alt='panda' className={styles.Logo} />
                <h1>Ready to make a poll?</h1>
                <Link
                  className={sharedStyles.Link}
                  to={{pathname: '/polls', state: {title: navigationTitles.CREATE_POLL}}}
                >
                  CREATE POLL
                </Link>
              </div>
            );
          }} />
      </Switch>
    </div>
    );
  }
}

export default withRouter(App);
