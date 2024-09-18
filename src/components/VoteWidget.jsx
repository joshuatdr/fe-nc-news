import { patchVotes } from '../apiCalls';
import { useState } from 'react';

export const VoteWidget = ({
  votes,
  article_id,
  comment_id,
  isPlaceholder,
}) => {
  let [currVotes, setCurrVotes] = useState(votes);
  let [addButtonEnabled, setAddButtonEnabled] = useState(true);
  let [subButtonEnabled, setSubButtonEnabled] = useState(true);
  const handleClick = (inc_votes) => {
    const voteData = article_id
      ? { article_id, inc_votes }
      : { comment_id, inc_votes };
    if (inc_votes > 0) {
      setAddButtonEnabled(false);
      setSubButtonEnabled(true);
    } else {
      setAddButtonEnabled(true);
      setSubButtonEnabled(false);
    }
    patchVotes(voteData).catch((err) => {
      setCurrVotes((currVotes -= voteData.inc_votes));
      inc_votes > 0 ? setAddButtonEnabled(true) : setSubButtonEnabled(true);
    });
    setCurrVotes((currVotes += voteData.inc_votes));
  };
  return (
    <span className='widget'>
      <button
        disabled={!addButtonEnabled || isPlaceholder}
        // className='add-vote'
        onClick={() => {
          handleClick(1);
        }}
      >
        +
      </button>
      {currVotes}
      <button
        disabled={!subButtonEnabled || isPlaceholder}
        // className='sub-vote'
        onClick={() => {
          handleClick(-1);
        }}
      >
        -
      </button>
    </span>
  );
};
