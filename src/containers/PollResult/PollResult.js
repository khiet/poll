import React, { Component } from 'react';

import styles from './PollResult.css';
import sharedStyles from '../../assets/stylesheets/Shared.css';
import axios from '../../axios-polls';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import VoteOptions from '../../components/VoteOptions/VoteOptions';
import ParticipantCount from '../../components/ParticipantCount/ParticipantCount';
import Button from '../../components/UI/Button/Button';
import UserVote from '../../components/UserVote/UserVote';

import Spinner from '../../components/UI/Spinner/Spinner';

import * as navigationTitles from '../../components/Navigation/NavigationTitles';

import { Link } from 'react-router-dom';

class PollResult extends Component {

  state = {
    pollId: '',
    title: '',
    pollUserName: '',
    participantCount: 0,
    votedVote: '',
    userVote: {},
    voteResult: {},
    loading: false
  }

  componentDidMount() {
    const pollId = this.props.match.params.id;
    const userId = localStorage.getItem('userId');

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
          pollUserName: pollUserName
        }
      );

    }).catch(err => {
      console.log(err);
    });
  }

  showVotesHandler = () => {
    this.setState({loading: true});
    axios.get(
      '/votes.json?orderBy="pollId"&equalTo="' + this.state.pollId + '"'
    ).then(res => {
      this.setState({votable: false, loading: false});

      const votes = Object.values(res.data);
      const userVote = {};

      votes.forEach(vote => {
        axios.get(
          '/users/' + vote.userId + '.json'
        ).then(res => {
          this.setState({loading: false});

          userVote[res.data.name] = vote.value;
          this.setState({ userVote: userVote });
        }).catch(err => {
          this.setState({loading: false});
          console.log('err: ', err);
        });
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

    const voteUsers = Object.keys(this.state.userVote);
    const userVoteList = voteUsers.map(voteUser => {
      const voteValue = this.state.userVote[voteUser];
      return <UserVote key={voteUser} value={voteValue} name={voteUser} />;
    });

    return(
      <div className={styles.Content}>
        {spinner}
        <div className={styles.Status}>Open</div>
        <h1>{this.state.title}</h1>
        <div className={styles.CreatedBy}>
          Created by {this.state.pollUserName}
        </div>
        <ParticipantCount count={this.state.participantCount} />
        <div className={styles.OptionList}>
          <VoteOptions voteResult={this.state.voteResult} votedVote={this.state.votedVote} />
        </div>
        <div className={styles.RevoteContainer}>
          <Link className={sharedStyles.LinkSecondary} to={{pathname: '/polls/' + this.state.pollId, state: {title: navigationTitles.VOTE}}}>
            REVOTE
          </Link>
          <Button label='SHOW DETAILS' clicked={this.showVotesHandler} />
        </div>
        <div className={styles.UserVoteListContainer}>
          {userVoteList}
        </div>
      </div>
    );
  }
}

export default withErrorHandler(PollResult, axios);
