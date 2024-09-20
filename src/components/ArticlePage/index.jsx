import ReactTimeAgo from 'react-time-ago';
import { HashLink } from 'react-router-hash-link';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Comments } from './Comments';
import { getArticle } from '../../apiCalls';
import { VoteWidget } from '../VoteWidget';

export const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    getArticle(article_id)
      .then((article) => {
        setArticle(article);
        setIsLoading(false);
      })
      .catch(() => {
        setErr(true);
      });
  }, []);

  if (err) {
    return <p className='loading'>Article {article_id} was not found!</p>;
  }

  if (isLoading) {
    return <p className='loading'>Article is loading, please wait</p>;
  }

  const formatText = article.body.replaceAll('. ', '.\n\n');

  return (
    <>
      <article>
        <Link to={`/topic/${article.topic}`} className='article-topic'>
          {article.topic}
        </Link>
        <span className='article-author'>
          <em>{article.author}</em>
        </span>
        <span className='article-date'>
          <ReactTimeAgo
            date={new Date(article.created_at).getTime()}
            locale='en-US'
          />
        </span>
        <h2>{article.title}</h2>
        <img className='article-img' src={article.article_img_url} />
        <div className='stats-bar'>
          <VoteWidget votes={article.votes} article_id={article.article_id} />
          <HashLink to='#comments' className='widget'>
            Comments: {article.comment_count}
          </HashLink>
        </div>
        <p>{formatText}</p>
      </article>
      <Comments article_id={article_id} />
    </>
  );
};
