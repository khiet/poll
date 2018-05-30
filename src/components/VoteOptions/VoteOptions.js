import React from 'react';

import VoteOption from '../../components/VoteOption/VoteOption';

const voteOptions = (props) => {
  const voteOptions = Object.keys(props.voteResult).map((key) => {
    return(
      <VoteOption
        key={key}
        group='vote'
        title={key}
        total={props.voteResult[key]}
        changed={props.changed}
        voted={(props.votedVote === key)}
      />
    );
  });

  return voteOptions;
};

export default voteOptions;
