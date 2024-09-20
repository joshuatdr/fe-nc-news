import { useEffect, useState } from 'react';
import { CommentCard } from './CommentCard';
import { getComments } from '../../../apiCalls';
import './Comments.css';
import { CommentForm } from './CommentForm';

export const Comments = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPostingComment, setIsPostingComment] = useState(false);

  useEffect(() => {
    getComments(article_id).then((comments) => {
      setComments(comments);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p className='loading'>Comments loading, please wait</p>;
  }

  return (
    <section id='comments'>
      <h2>Comments:</h2>
      <CommentForm
        isPostingComment={isPostingComment}
        setIsPostingComment={setIsPostingComment}
        comments={comments}
        setComments={setComments}
        article_id={article_id}
      />
      <ul className='comments-list'>
        {isPostingComment ? <CommentCard isPlaceholder={true} /> : null}
        {comments.length === 0 ? (
          <span>It's quiet in here ... No comments yet!</span>
        ) : (
          comments.map((comment) => {
            return (
              <CommentCard
                key={comment.comment_id}
                comment={comment}
                comments={comments}
                setComments={setComments}
              />
            );
          })
        )}
      </ul>
    </section>
  );
};
