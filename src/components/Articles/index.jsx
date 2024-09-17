import { ArticleCard } from './ArticleCard';
import { getArticles } from '../../apiCalls';
import { useEffect, useState } from 'react';

export const Articles = () => {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles().then((articles) => {
      setArticleList(articles);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p>Loading, please wait</p>;
  }

  return (
    <ul className='article-list'>
      {articleList.map((article, i) => {
        return <ArticleCard key={i} article={article} />;
      })}
    </ul>
  );
};
