import React from 'react'

const ArticlePreview = (article) => (
  <div className="article-preview" key={article.slug}>
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

export const NoArticlesMessage = () => (
  <div className="article-preview">There are no articles in the feed.</div>
)

export const renderArticlePreviewList = (articles) => articles.map(ArticlePreview)
