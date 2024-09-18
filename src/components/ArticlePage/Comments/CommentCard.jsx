import ReactTimeAgo from 'react-time-ago';
import { TailSpin } from 'react-loading-icons';
import { useEffect, useState, useContext } from 'react';
import { getUser } from '../../../apiCalls';
import { VoteWidget } from '../../VoteWidget';
import { UserContext } from '../../../contexts/User';

export const CommentCard = ({ comment, isPlaceholder }) => {
  const [userAvatar, setUserAvatar] = useState(
    'https://cdn.vectorstock.com/i/500p/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg'
  );

  if (!isPlaceholder) {
    useEffect(() => {
      getUser(comment.author).then((user) => {
        setUserAvatar(user.avatar_url);
      });
    }, []);
  } else {
    const { user } = useContext(UserContext);
    return (
      <li>
        <span className='author'>{user.username}</span>
        <span className='date'>just now</span>
        <img src={user.avatar_url} />
        <VoteWidget votes={0} isPlaceholder={true} />
        <p className='loading'>
          <TailSpin stroke='#ffffff' strokeWidth='2.5' />
        </p>
      </li>
    );
  }

  return (
    <li>
      <span className='author'>{comment.author}</span>
      <span className='date'>
        <ReactTimeAgo
          date={new Date(comment.created_at).getTime()}
          locale='en-US'
        />
      </span>
      <img src={userAvatar} />
      <VoteWidget votes={comment.votes} comment_id={comment.comment_id} />
      <p>{comment.body}</p>
    </li>
  );
};
