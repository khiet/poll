import React, { Component } from 'react';

import styles from './Poll.css';

import VoteOptions from '../../components/VoteOptions/VoteOptions';
import ParticipantCount from '../../components/ParticipantCount/ParticipantCount';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-polls';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import User from '../../containers/User/User';
import CopyText from '../../containers/CopyText/CopyText';

import Spinner from '../../components/UI/Spinner/Spinner';

import * as navigationTitles from '../../components/Navigation/NavigationTitles';

class Poll extends Component {

  state = {
    pollId: '',
    title: '',
    pollUserName: '',
    participantCount: 0,
    votedVote: '',
    voteResult: {},
    selectedOption: null,
    votable: false,
    voting: false,
    userId: '',
    userName: '',
    loading: false
  }

  componentDidMount() {
    const pollId = this.props.match.params.id;
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    axios.get(
      '/polls/' + pollId + '.json'
    ).then(res => {
      const pollUserName = res.data.userName;
      const pollOptions = res.data.options;

      axios.get(
        '/votes.json?orderBy="pollId"&equalTo="' + pollId + '"'
      ).then(res => {
        const votes = res.data;
        const participantCount = Object.keys(votes).length;
        let votedVote = '';
        const voteResult = {};

        pollOptions.forEach(pollOption => {
          voteResult[pollOption] = 0;
        });

        Object.values(votes).forEach(vote => {
          if (vote.userId === userId) {
            votedVote = vote.value;
          }
          voteResult[vote.value] += 1;
        });

        this.setState(
          {
            participantCount: participantCount,
            votedVote: votedVote,
            voteResult: voteResult
          }
        );

      }).catch(err => {
        console.log('err: ', err);
      });

      this.setState(
        {
          pollId: pollId,
          title: res.data.title,
          userId: userId,
          userName: userName,
          pollUserName: pollUserName
        }
      );

    }).catch(err => {
      console.log(err);
    });
  }

  optionSelectedHandler = e => {
    this.setState({selectedOption: e.target.value, votable: true});
  };

  voteSubmitHandler = (e) => {
    e.preventDefault();

    if (this.state.userId) {
      this.createVoteHandler(this.state.userId);
    } else {
      this.setState({ voting: true });
    }
  };

  createVoteHandler = (userId) => {
    this.setState({loading: true});

    const pollId = this.state.pollId;
    const vote = {
      userId: userId,
      pollId: pollId,
      value: this.state.selectedOption
    };

    axios.get('/votes.json?orderBy="pollId"&equalTo="' + pollId + '"').then(res => {
      const keys = Object.keys(res.data);
      const foundVoteId = keys.find(voteId => {
        return (res.data[voteId].userId === userId) && (res.data[voteId].pollId === pollId)
      });

      if (foundVoteId) {
        axios.delete(
          '/votes/' + foundVoteId + '.json'
        ).then(res => {
          console.log('res: ', res);
        }).catch(err => {
          console.log('err: ', err);
        });
      }

      axios.post(
        '/votes.json', vote
      ).then((response) => {
        this.setState({votable: false, loading: false});

        const location = {
          pathname: '/polls/' + this.state.pollId + '/result',
          state: { title: navigationTitles.RESULT }
        };
        this.props.history.push(location);

      }).catch((err) => {
        this.setState({loading: false});
        console.log('err: ', err);
      });

    }).catch(err => {
      this.setState({loading: false});
      console.log('err: ', err);
    });
  };

  render() {
    let spinner = null;
    if (this.state.loading) {
      spinner = <Spinner />;
    }

    let userContainer = null;
    if (this.state.voting) {
      userContainer = (
        <User
          onSuccess={(userId) => this.createVoteHandler(userId)}
        />
      );
    }

    let copyText = null;
    if (this.state.pollUserName === this.state.userName) {
      copyText = (
        <div className={styles.CopyTextContainer}>
          <CopyText helpText="Copy to clipboard for sharing" value={window.location.href} />
        </div>
      );
    }

    return(
      <div className={styles.Content}>
        {copyText}
        {spinner}
        <div className={styles.Status}>Open</div>
        <h1>{this.state.title}</h1>
        <div className={styles.CreatedBy}>
          Created by {this.state.pollUserName}
        </div>
        <ParticipantCount count={this.state.participantCount} />
        <form onSubmit={this.voteSubmitHandler}>
          <VoteOptions voteResult={this.state.voteResult} changed={this.optionSelectedHandler} votedVote={this.state.votedVote} />
          <Button label='VOTE' disabled={!this.state.votable} />
        </form>
        {userContainer}
      </div>
    );
  }
}

export default withErrorHandler(Poll, axios);
