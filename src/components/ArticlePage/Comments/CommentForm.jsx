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

  const handleSubmit = (e) => {
    e.preventDefault();
    const commentBody = e.target.form[0].value;
    if (commentBody.length > 9) {
      const filter = new Filter(); //remove bad words
      postComment(filter.clean(commentBody), user.username, article_id).then(
        (comment) => {
          setTimeout(() => {
            setComments([comment, ...comments]);
            setIsPostingComment(false);
          }, 1000);
        }
      );
      setIsPostingComment(true);
      setIsMsgVisible(false);
    } else {
      setIsMsgVisible(true);
    }
  };

  return (
    <form>
      <span id='form-username'>
        Posting as: <em>{user.username}</em>
      </span>
      <img src={user.avatar_url} />
      <textarea placeholder='Write a comment' />
      <input
        disabled={isPostingComment}
        type='submit'
        value='Submit'
        onClick={handleSubmit}
      />
      <span id={isMsgVisible ? 'not-enough-chars' : 'hidden'}>
        Please enter at least 10 characters
      </span>
    </form>
  );
};
