import React, { Component } from 'react';

import styles from './Poll.css';
import VoteOption from '../../components/VoteOption/VoteOption';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-polls';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Spinner from '../../components/UI/Spinner/Spinner';

import * as navigationTitles from '../../components/Navigation/NavigationTitles';

class Poll extends Component {

  state = {
    pollId: '',
    title: '',
    options: [],
    participantCount: 0,
    selectedOption: null,
    votable: false,
    voted: false,
    loading: false
  }

  componentDidMount() {
    const pollId = this.props.match.params.id;

    axios.get(
      '/polls/' + pollId + '.json'
    ).then((response) => {
      const ttl  = response.data.title;
      const opts = response.data.options;
      const participantCnt = this.getParticipantCount(opts);

      this.setState(
        {
          pollId: pollId,
          title: ttl,
          options: opts,
          participantCount: participantCnt
        }
      );

    }).catch(
      error => console.log(error)
    );
  }

  optionSelectedHandler = (e) => {
    this.setState({selectedOption: e.target.value, votable: true});
  };

  createVoteHandler = (e) => {
    e.preventDefault();
    this.setState({loading: true});

    const pollId = this.state.pollId;
    const vote = {
      pollId: pollId,
      value: this.state.selectedOption
    };

    axios.post(
      '/votes.json', vote
    ).then((response) => {
      const opts = this.state.options.map((opt) => {
        if (opt.value === vote.value) {
          opt['total'] += 1;
        }

        return opt;
      });

      axios.put(
        '/polls/' + pollId + '/options.json', opts
      ).then((response) => {
        const participantCnt = this.getParticipantCount(opts);
        this.setState({participantCount: participantCnt, voted: true, votable: false, loading: false});
        const location = {
          pathname: '/polls/' + pollId + '/result',
          state: { title: navigationTitles.VOTE }
        };
        this.props.history.push(location);
      }).catch((err) => {
        this.setState({loading: false});
        console.log('err: ', err);
      });

    }).catch((err) => {
      this.setState({loading: false});
      console.log('err: ', err);
    });
  };

  createVoteAgainHandler = (e) => {
    e.preventDefault();

    console.log('createVoteAgainHandler: ' + this.state.selectedOption);
  };

  getParticipantCount = (pollOptions) => {
    return pollOptions.map((opt) => {
      return opt['total'];
    }).reduce((acc, val) => {
      return acc + val;
    });
  };

  render() {

    const options = this.state.options.map((opt) => {
      return <VoteOption key={opt.value} group='vote' title={opt.value} total={opt.total} changed={this.optionSelectedHandler} />;
    });

    let voteButton = null;
    if (this.state.voted) {
      voteButton = <Button label='VOTE AGAIN' disabled={!this.state.votable} clicked={this.createVoteAgainHandler} />;
    } else {
      voteButton = <Button label='VOTE' disabled={!this.state.votable} clicked={this.createVoteHandler} />;
    }

    let spinner = null;
    if (this.state.loading) {
      spinner = <Spinner />;
    }

    return(
      <div className={styles.Poll}>
        <div className={styles.Status}>Open</div>
        <h1 className={styles.Title}>
          {this.state.title}
        </h1>
        <div className={styles.CreatedBy}>
          Created by Khiet
        </div>
        <div className={styles.ParticipantCount}>
          {this.state.participantCount} participants
        </div>
        <form className={styles.Form}>
          {options}
          {voteButton}
        </form>
        {spinner}
      </div>
    );
  }
}

export default withErrorHandler(Poll, axios);
