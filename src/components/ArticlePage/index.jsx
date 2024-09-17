import ReactTimeAgo from 'react-time-ago';
import { HashLink } from 'react-router-hash-link';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Comments } from './Comments';
import { getArticle } from '../../apiCalls';
import { VoteWidget } from '../VoteWidget';

export const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticle(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p>Article is loading, please wait</p>;
  }

  const formatText = article.body.replaceAll('. ', '.\n\n');

  return (
    <>
      <article>
        <span>
          {article.topic}--
          {article.author}--
        </span>
        <ReactTimeAgo
          date={new Date(article.created_at).getTime()}
          locale='en-US'
        />
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
