import React from 'react'

import { getArticles } from './api-client'
import { useRequest } from './useRequest'

export function ArticleList() {
  const request = React.useCallback(() => getArticles(), [])
  const matchRequestState = useRequest(request)

  return (
    <>
      {matchRequestState({
        idle: () => <span>Loading...</span>,
        pending: () => <span>Loading...</span>,
        failure: () => (
          <span>Sorry, the articles could not be loaded at this time.</span>
        ),
        success: (articles) =>
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
          }),
      })}
    </>
  )
}
