import ReactTimeAgo from 'react-time-ago';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle } from '../apiCalls';

export const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticle(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  });

  if (isLoading) {
    return <p>Article is loading, please wait</p>;
  }

  const formatText = article.body.replaceAll('. ', '.\n\n');

  return (
    <article className='article-page'>
      <span>
        {article.topic}--
        {article.author}--
      </span>
      <ReactTimeAgo
        date={new Date(article.created_at).getTime()}
        locale='en-US'
      />
      <h2>{article.title}</h2>
      <img src={article.article_img_url} />
      <div>
        Votes: {article.votes}, Comments: {article.comment_count}
      </div>
      <p className='article-body'>{formatText}</p>
    </article>
  );
};
