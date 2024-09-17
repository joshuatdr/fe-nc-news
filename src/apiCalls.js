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

export const getComments = (article_id) => {
  return apiClient
    .get(`/articles/${article_id}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUser = (username) => {
  return apiClient.get(`/users/${username}`).then(({ data: { user } }) => {
    return user;
  });
};
