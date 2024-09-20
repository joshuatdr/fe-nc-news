import { ArticleCard } from './ArticleCard';
import { ArticleSort } from './ArticleSort';
import { getArticles } from '../../apiCalls';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './Articles.css';

export const Articles = () => {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByQuery = searchParams.get('sort_by');
  const orderQuery = searchParams.get('order');
  const { topic } = useParams();

  useEffect(() => {
    getArticles(topic, sortByQuery, orderQuery)
      .then((articles) => {
        setIsLoading(false);
        setErr(null);
        setArticleList(articles);
      })
      .catch(() => {
        setIsLoading(false);
        setErr(true);
      });
  }, [isLoading, topic, searchParams]);

  if (isLoading) {
    return <p className='loading'>Loading, please wait</p>;
  }

  if (err) {
    return (
      <p className='loading'>
        I wish we had some articles on {topic} ... but we don't.
      </p>
    );
  }

  return (
    <>
      <ArticleSort
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <ul className='article-list'>
        {articleList.map((article, i) => {
          return <ArticleCard key={i} article={article} />;
        })}
      </ul>
    </>
  );
};
