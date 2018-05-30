import React, { Component } from 'react';
import styles from './App.css';

import PollBuilder from './containers/PollBuilder/PollBuilder';
import Poll from './containers/Poll/Poll';
import Navigation from './components/Navigation/Navigation';
import pandaImage from './assets/images/panda.png';
import Aux from './hoc/Aux/Aux';

import { Switch, Route, Link, withRouter } from 'react-router-dom';

import * as navigationTitles from './components/Navigation/NavigationTitles';

class App extends Component {
  render() {
    console.log('this.props.history: ', this.props.history);
    console.log('this.props.location: ', this.props.location);
    console.log('this.props.match: ', this.props.match);

    let navigationTitle = navigationTitles.DEFAULT;
    if (this.props.location.state) {
      navigationTitle = this.props.location.state.title;
    }

    return (
      <div className={styles.App}>
        <Navigation title={navigationTitle} />

        <Switch>
          <Route path='/polls/:id/result' component={Poll} />
          <Route path='/polls/:id' component={Poll} />
          <Route path='/polls' component={PollBuilder} />
          <Route path='/' render={() => {
            return(
              <Aux>
                <img src={pandaImage} alt='panda' />
                <h1>Ready to make a poll?</h1>
                <Link
                  className={styles.Link}
                  to={{pathname: '/polls', state: {title: navigationTitles.CREATE_POLL}}}
                >
                  CREATE POLL
                </Link>
              </Aux>
            );
          }} />
      </Switch>
    </div>
    );
  }
}

export default withRouter(App);
