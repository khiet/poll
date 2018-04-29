import React, { Component } from 'react';
import styles from './App.css';

import Poll from './containers/Poll';
import Aux from './hoc/Aux/Aux';

import { Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Switch>
          <Route path='/poll' component={Poll} />
          <Route path='/' render={() => {
            return(
              <Aux>
                <h1>Ready to make a poll?</h1>
                <Link className={styles.Link} to='/poll'>CREATE POLL</Link>
              </Aux>
            );
          }} />
        </Switch>
      </div>
    );
  }
}

export default App;
