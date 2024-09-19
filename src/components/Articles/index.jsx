import { ArticleCard } from './ArticleCard';
import { getArticles } from '../../apiCalls';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Articles.css';

export const Articles = () => {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { topic } = useParams();

  useEffect(() => {
    getArticles(topic).then((articles) => {
      setArticleList(articles);
      setIsLoading(false);
    });
  }, [topic]);

  if (isLoading) {
    return <p className='loading'>Loading, please wait</p>;
  }

  return (
    <ul className='article-list'>
      {articleList.map((article, i) => {
        return <ArticleCard key={i} article={article} />;
      })}
    </ul>
  );
};
