import React from 'react'

import { getArticles } from './api-client'

const possibleRequestStates = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILURE: 'failure',
}

export function ArticleList() {
  const [requestState, setRequestState] = React.useState(
    possibleRequestStates.IDLE,
  )
  const [articles, setArticles] = React.useState([])

  React.useEffect(() => {
    setRequestState(possibleRequestStates.PENDING)

    getArticles()
      .then(setArticles)
      .then(() => void setRequestState(possibleRequestStates.SUCCESS))
      .catch(() => setRequestState(possibleRequestStates.FAILURE))
  }, [])

  return (
    <>
      {requestState === possibleRequestStates.PENDING && (
        <span>Loading...</span>
      )}

      {requestState === possibleRequestStates.FAILURE && (
        <span>Sorry, your articles could not be loaded at this time.</span>
      )}

      {requestState === possibleRequestStates.SUCCESS &&
        articles.map((article) => {
          return (
            <div className="article-preview">
              <div className="article-meta">
                <a href="profile.html">
                  <img src={article.author.image} />
                </a>
                <div className="info">
                  <a href="" className="author">
                    {article.author.username}
                  </a>
                  <span className="date">{article.createdAt}</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart"></i> {article.favoritesCount}
                </button>
              </div>
              <a href="" className="preview-link">
                <h1>{article.title}</h1>
                <p>{article.description}</p>
                <span>Read more...</span>
              </a>
            </div>
          )
        })}
    </>
  )
}
