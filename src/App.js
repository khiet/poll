import React, { Component } from 'react';
import styles from './App.css';

import Poll from './containers/Poll';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <h1>Ready to make a poll?</h1>
        <Poll />
      </div>
    );
  }
}

export default App;
