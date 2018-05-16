import React, { Component } from 'react';

import styles from './Poll.css';
import VoteOption from '../../components/VoteOption/VoteOption';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-polls';

class Poll extends Component {

  state = {
    pollId: '',
    title: '',
    options: [],
    selectedOption: null,
    votable: false
  }

  componentDidMount() {
    const pollId = this.props.match.params.id;

    axios.get(
      '/polls/' + pollId + '.json'
    ).then((response) => {
      console.log(response);

      const ttl = response.data.title;
      const opts = response.data.options;

      this.setState({title: ttl, options: opts, pollId: pollId});

    }).catch(
      error => console.log(error)
    );
  }

  optionSelectedHandler = (e) => {
    this.setState({selectedOption: e.target.value, votable: true});
  };

  createVoteHandler = (e) => {
    e.preventDefault();

    const vote = {
      pollId: this.state.pollId,
      value: this.state.selectedOption
    };

    axios.post(
      '/votes.json', vote
    ).then((response) => {
      console.log(response);
    }).catch(
      error => console.log(error)
    );

    console.log(this.state.selectedOption);
  };

  render() {

    const options = this.state.options.map((opt) => {
      return <VoteOption key={opt.value} group='vote' title={opt.value} total={888} changed={this.optionSelectedHandler} />;
    });

    return(
      <div className={styles.Poll}>
        <h5 className={styles.Status}>Open</h5>
        <div>
          Poll ID: {this.state.pollId}
        </div>
        <h1>{this.state.title}</h1>
        <form onSubmit={this.createVoteHandler}>
          {options}
          <Button label='VOTE' disabled={!this.state.votable} />
        </form>
      </div>
    );
  }
}

export default Poll;
