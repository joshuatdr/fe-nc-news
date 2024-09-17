import { useEffect, useState } from 'react';
import { CommentCard } from './CommentCard';
import { getComments } from '../../../apiCalls';
import './Comments.css';

export const Comments = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getComments(article_id).then((comments) => {
      setComments(comments);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p>Comments loading, please wait</p>;
  }

  return (
    <section id='comments'>
      <h2>Comments:</h2>
      <ul>
        {comments.length === 0 ? (
          <span>It's quiet in here ... No comments yet!</span>
        ) : (
          comments.map((comment) => {
            return <CommentCard key={comment.comment_id} comment={comment} />;
          })
        )}
      </ul>
    </section>
  );
};
