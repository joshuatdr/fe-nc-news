import ReactTimeAgo from 'react-time-ago';
import { useEffect, useState } from 'react';
import { getUser } from '../../../apiCalls';

export const CommentCard = ({ comment }) => {
  const [userAvatar, setUserAvatar] = useState(
    'https://cdn.vectorstock.com/i/500p/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg'
  );

  useEffect(() => {
    getUser(comment.author).then((user) => {
      setUserAvatar(user.avatar_url);
    });
  }, []);

  return (
    <li>
      <span>
        {comment.author}--
        <ReactTimeAgo
          date={new Date(comment.created_at).getTime()}
          locale='en-US'
        />
      </span>
      <span id='avatar-body'>
        <img src={userAvatar} />
        <p>{comment.body}</p>
      </span>
      <span>Votes: {comment.votes}</span>
    </li>
  );
};
