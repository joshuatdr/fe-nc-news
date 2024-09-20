import ReactTimeAgo from 'react-time-ago';
import { TailSpin } from 'react-loading-icons';
import { useEffect, useState, useContext } from 'react';
import { deleteComment, getUser } from '../../../apiCalls';
import { VoteWidget } from '../../VoteWidget';
import { UserContext } from '../../../contexts/User';

export const CommentCard = ({
  comment,
  comments,
  setComments,
  isPlaceholder,
}) => {
  const [userAvatar, setUserAvatar] = useState(
    'https://cdn.vectorstock.com/i/500p/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg'
  );
  const [isDeletingComment, setIsDeletingComment] = useState(false);
  const { user } = useContext(UserContext);

  if (!isPlaceholder) {
    useEffect(() => {
      getUser(comment.author).then((user) => {
        setUserAvatar(user.avatar_url);
      });
    }, []);
  } else {
    return (
      <li className='comment-card'>
        <span className='author'>{user.username}</span>
        <span className='date'>just now</span>
        <img src={user.avatar_url} />
        <VoteWidget votes={0} isPlaceholder={true} />
        <p className='loading-comment comment-body'>
          <TailSpin stroke='#ffffff' strokeWidth='2.5' />
        </p>
        <button className='delete-button' disabled={true}>
          Delete
        </button>
      </li>
    );
  }

  const handleClick = (e) => {
    setIsDeletingComment(true);
    deleteComment(comment.comment_id).then(() => {
      setTimeout(() => {
        setIsDeletingComment(false);
        const copyComments = comments.filter((copyComment) => {
          return copyComment.comment_id !== comment.comment_id;
        });
        setComments(copyComments);
      }, 1000);
    });
  };

  return (
    <li className='comment-card'>
      <span className='author'>{comment.author}</span>
      <span className='date'>
        <ReactTimeAgo
          date={new Date(comment.created_at).getTime()}
          locale='en-US'
        />
      </span>
      <img src={userAvatar} />
      <VoteWidget votes={comment.votes} comment_id={comment.comment_id} />
      {isDeletingComment ? (
        <p className='deleting-comment comment-body'>
          <TailSpin stroke='#ffffff' strokeWidth='2.5' />
        </p>
      ) : (
        <p className='comment-body'>{comment.body}</p>
      )}
      {comment.author === user.username ? (
        <button
          className='delete-button'
          disabled={isDeletingComment}
          onClick={handleClick}
        >
          Delete
        </button>
      ) : null}
    </li>
  );
};
