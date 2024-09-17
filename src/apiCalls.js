import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://nc-news-jokh.onrender.com/api',
});

export const getArticles = () => {
  return apiClient
    .get('/articles')
    .then(({ data: { articles } }) => {
      return articles;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getArticle = (article_id) => {
  return apiClient
    .get(`/articles/${article_id}`)
    .then(({ data: { article } }) => {
      return article;
    })
    .catch((err) => {
      console.log(err);
    });
};
