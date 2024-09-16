import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://nc-news-jokh.onrender.com/api',
  timeout: 1000,
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
