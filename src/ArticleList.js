import React from 'react'
import axios from 'axios'

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

    axios
      .get('https://conduit.productionready.io/api/articles?limit=10')
      .then((response) => {
        setRequestState(possibleRequestStates.SUCCESS)
        setArticles(response.data.articles)
      })
      .catch((error) => {
        setRequestState(possibleRequestStates.FAILURE)
        console.error(error)
      })
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
                  <span className="date">January 20th</span>
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
