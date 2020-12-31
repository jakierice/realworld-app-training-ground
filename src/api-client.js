import axios from 'axios'

const jwt = window.localStorage.getItem('jwt')

const client = axios.create({
  // baseURL: "https://conduit.productionready.io/api",
  baseURL: "http://localhost:5100/api",
  headers: jwt
    ? {
        Authorization: 'Token ' + jwt,
      }
    : {},
})

export const getCurrentUser = () =>
  client.get('/user').then((response) => response.data.user)

export const registerUser = (newUserData) =>
  client
    .post('/users/', { user: newUserData })
    .then((response) => response.data.user)

export const loginUser = (credentials) =>
  client.post('/users/login', { user: credentials }).then((response) => {
    window.localStorage.setItem('jwt', response.data.user.token)

    return response.data.user
  })

export const getArticles = () => client
  .get('/articles')
  .then((response) => response.data.articles)

export const getTags = () =>
  client.get("/tags").then((response) => response.data.tags);

export const createArticle = (article) =>
  client
    .post("/articles", { article })
    .then((response) => response.data.articles);

export const editArticle = (newArticleDetails, slug) =>
  client.post(`/articles/${slug}`, { newArticleDetails });
