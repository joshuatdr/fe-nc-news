import { Filter } from 'bad-words';
import { UserContext } from '../../../contexts/User';
import { useContext, useState } from 'react';
import { postComment } from '../../../apiCalls';

export const CommentForm = ({
  article_id,
  isPostingComment,
  setIsPostingComment,
  comments,
  setComments,
}) => {
  const { user } = useContext(UserContext);
  const [isMsgVisible, setIsMsgVisible] = useState(false);
  const [formInput, setFormInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInput.length > 9) {
      const filter = new Filter(); //remove bad words
      postComment(filter.clean(formInput), user.username, article_id).then(
        (comment) => {
          setTimeout(() => {
            setComments([comment, ...comments]);
            setIsPostingComment(false);
          }, 1000);
        }
      );
      setIsPostingComment(true);
      setIsMsgVisible(false);
      setFormInput('');
    } else {
      setIsMsgVisible(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <span id='form-username'>
        Posting as: <em>{user.username}</em>
      </span>
      <img src={user.avatar_url} />
      <textarea
        placeholder='Write a comment'
        value={formInput}
        onChange={(e) => {
          setFormInput(e.target.value);
        }}
      />
      <input disabled={isPostingComment} type='submit' value='Submit' />
      <span id={isMsgVisible ? 'not-enough-chars' : 'hidden'}>
        Please enter at least 10 characters
      </span>
    </form>
  );
};
