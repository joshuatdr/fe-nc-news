import ReactTimeAgo from 'react-time-ago';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { VoteWidget } from '../VoteWidget';

export const ArticleCard = ({
  article: {
    article_id,
    topic,
    author,
    created_at,
    title,
    article_img_url,
    votes,
    comment_count,
  },
}) => {
  return (
    <li className='article-card'>
      <Link to={`/topic/${topic}`} className='article-topic'>
        {topic}
      </Link>
      <span className='article-author'>
        <em>{author}</em>
      </span>
      <span className='article-date'>
        <ReactTimeAgo date={new Date(created_at).getTime()} locale='en-US' />
      </span>
      <Link to={`/article/${article_id}`}>
        <h2>{title}</h2>
      </Link>
      <img className='article-img' src={article_img_url} />
      <div className='stats-bar'>
        <VoteWidget votes={votes} article_id={article_id} />
        <HashLink to={`/article/${article_id}/#comments`} className='widget'>
          Comments: {comment_count}
        </HashLink>
      </div>
    </li>
  );
};
