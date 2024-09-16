import { ArticleCard } from './ArticleCard';
import { getArticles } from '../apiCalls';
import { useEffect, useState } from 'react';

export const Articles = () => {
  const [articleList, setArticleList] = useState([]);
  useEffect(() => {
    getArticles().then((articles) => {
      setArticleList(articles);
    });
  }, []);
  return (
    <ul className='article-container'>
      {articleList.map((article, i) => {
        return <ArticleCard key={i} article={article} />;
      })}
    </ul>
  );
};
