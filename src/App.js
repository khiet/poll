import React, { Component } from 'react';
import styles from './App.css';

import Home from './containers/Home/Home';
import Poll from './containers/Poll/Poll';
import PollBuilder from './containers/PollBuilder/PollBuilder';
import PollResult from './containers/PollResult/PollResult';

import Navigation from './components/Navigation/Navigation';

import { Switch, Route, withRouter } from 'react-router-dom';

import * as navigationTitles from './components/Navigation/NavigationTitles';

class App extends Component {
  render() {
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
          <Route path='/' component={Home} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
