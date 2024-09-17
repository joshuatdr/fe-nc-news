import ReactTimeAgo from 'react-time-ago';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

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
      <span>
        {topic}--
        {author}--
      </span>
      <ReactTimeAgo date={new Date(created_at).getTime()} locale='en-US' />
      <Link to={`/article/${article_id}`}>
        <h2>{title}</h2>
      </Link>
      <img className='article-img' src={article_img_url} />
      <div className='stats-bar'>
        <span className='widget'>
          <button>+</button>
          {votes}
          <button>-</button>
        </span>
        <HashLink to={`/article/${article_id}/#comments`} className='widget'>
          Comments: {comment_count}
        </HashLink>
      </div>
    </li>
  );
};
