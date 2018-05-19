import React, { Component } from 'react';
import styles from './App.css';

import PollBuilder from './containers/PollBuilder/PollBuilder';
import Poll from './containers/Poll/Poll';
import pandaImage from './assets/images/panda.png';
import Aux from './hoc/Aux/Aux';

import { Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Switch>
          <Route path='/poll/:id/result' component={Poll} />
          <Route path='/poll/:id' component={Poll} />
          <Route path='/poll' component={PollBuilder} />
          <Route path='/' render={() => {
            return(
              <Aux>
                <img src={pandaImage} alt='panda' />
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
