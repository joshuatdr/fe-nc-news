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
  return apiClient
    .get(`/users/${username}`)
    .then(({ data: { user } }) => {
      return user;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const patchVotes = ({ article_id, comment_id, inc_votes }) => {
  let queryStr = '';
  if (article_id) {
    queryStr += `/articles/${article_id}`;
  } else {
    queryStr += `/comments/${comment_id}`;
  }
  return apiClient.patch(queryStr, { inc_votes }).then(({ data }) => {
    return data;
  });
};
