import { patchVotes } from '../apiCalls';
import { useState } from 'react';

export const VoteWidget = ({ votes, article_id, comment_id }) => {
  let [currVotes, setCurrVotes] = useState(votes);
  const voteData = article_id
    ? { article_id, inc_votes: 1 }
    : { comment_id, inc_votes: 1 };
  const handleClick = (e) => {
    if (e.target.className === 'sub-vote') {
      voteData.inc_votes = -1;
    }
    patchVotes(voteData).catch((err) => {
      setCurrVotes((currVotes -= voteData.inc_votes));
    });
    setCurrVotes((currVotes += voteData.inc_votes));
  };
  return (
    <span className='widget'>
      <button className='add-vote' onClick={handleClick}>
        +
      </button>
      {currVotes}
      <button className='sub-vote' onClick={handleClick}>
        -
      </button>
    </span>
  );
};
