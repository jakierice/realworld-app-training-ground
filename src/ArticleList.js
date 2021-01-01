import React from 'react'

import { getArticles } from './api-client'
import { useQueryParams } from './useQueryParams'
import { useRequest } from './useRequest'
import { renderMaybeEmptyList } from './helpers'

import { BlockLoadingIndicator } from './ui-components'

const ArticlePreview = (article) => (
  <div className="article-preview">
    <div className="article-meta">
      <a href="profile.html">
        <img
          src={article.author.image}
          alt={`avatar of user ${article.author.username}`}
        />
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

const renderArticlePreviews = (articles) => articles.map(ArticlePreview)

const NoArticlesMessage = () => (
  <div className="article-preview">Nobody has written any articles yet!</div>
)

export const ArticleList = () => {
  const tag = useQueryParams().get('tag')
  const request = React.useCallback(() => getArticles({ tag }), [tag])
  const matchRequestState = useRequest(request)

  return matchRequestState({
    idle: BlockLoadingIndicator,
    pending: BlockLoadingIndicator,
    success: renderMaybeEmptyList(NoArticlesMessage, renderArticlePreviews),
    failure: () => (
      <span>Sorry, the articles could not be loaded at this time.</span>
    ),
  })
}
