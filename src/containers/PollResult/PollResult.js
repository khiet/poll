import React, { Component } from 'react';
import VoteResult from '../../components/VoteResult/VoteResult';
import styles from './PollResult.css';
import axios from '../../axios-polls';

class PollResult extends Component {

  state = {
    pollId: '',
    title: '',
    results: {}
  }

  componentDidMount() {
    const pollId = this.props.match.params.id;

    axios.get(
      '/votes.json?orderBy="pollId"&equalTo="' + pollId + '"'
    ).then((response) => {
      const results = {};

      const votes = Object.values(response.data);
      votes.forEach((item) => {
        if (results[item.value] !== undefined) {
          results[item.value] += 1;
        } else {
          results[item.value] = 1;
        }
      });

      this.setState({results: results, pollId: pollId});
    }).catch(
      error => console.log(error)
    );
  }

  render() {
    const voteResults = Object.keys(this.state.results).map((k) => {
      return <VoteResult key={k} option={k} total={this.state.results[k]} />;
    });

    return(
      <div className={styles.PollResult}>
        <h1>Poll Result</h1>
        {voteResults}
      </div>
    );
  }
}

export default PollResult;
