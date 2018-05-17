import React, { Component } from 'react';
import VoteResult from '../../components/VoteResult/VoteResult';
import styles from './PollResult.css';
import axios from '../../axios-polls';

class PollResult extends Component {

  state = {
    pollId: '',
    title: '',
    options: []
  }

  componentDidMount() {
    const pollId = this.props.match.params.id;

    axios.get(
      '/polls/' + pollId + '.json'
    ).then((response) => {
      const ttl  = response.data.title;
      const opts = response.data.options;

      this.setState({title: ttl, options: opts, pollId: pollId});
    }).catch(
      error => console.log(error)
    );
  }

  render() {
    const voteResults = this.state.options.map((opt) => {
      return <VoteResult key={opt.value} option={opt.value} total={opt.total} />;
    });

    return(
      <div className={styles.PollResult}>
        <h1>Poll Result</h1>
        <h2>{this.state.title}</h2>
        {voteResults}
      </div>
    );
  }
}

export default PollResult;
