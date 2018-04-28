import React, { Component } from 'react';
import styles from './App.css';

import Poll from './containers/Poll';

import { Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Switch>
          <Route path='/poll' component={Poll} />
          <Route path='/' render={() => {
            return(
              <div>
                <h1>Ready to make a poll?</h1>
                <Link to='/poll'>CREATE POLL</Link>
              </div>
            );
          }} />
        </Switch>
      </div>
    );
  }
}

export default App;
