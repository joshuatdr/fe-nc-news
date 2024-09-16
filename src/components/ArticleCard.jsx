import ReactTimeAgo from 'react-time-ago';

export const ArticleCard = ({
  article: { topic, created_at, title, article_img_url, votes, comment_count },
}) => {
  return (
    <li className='article-card'>
      <span>{topic}, </span>
      <ReactTimeAgo date={new Date(created_at).getTime()} locale='en-US' />
      <h2>{title}</h2>
      <img src={article_img_url} />
      <div>
        Votes: {votes}, Comments: {comment_count}
      </div>
    </li>
  );
};
