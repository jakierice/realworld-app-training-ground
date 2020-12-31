import React from 'react'
import { Link } from 'react-router-dom'

import { getTags } from './api-client'

export const IDLE = 'idle'
export const PENDING = 'pending'
export const SUCCESS = 'success'
export const FAILURE = 'failure'

export function TagList() {
  const [requestState, setRequestState] = React.useState(IDLE)
  const [tags, setTags] = React.useState([])

  React.useEffect(() => {
    setRequestState(PENDING)

    getTags()
      .then(setTags)
      .then(() => void setRequestState(SUCCESS))
      .catch((_error) => {
        setRequestState(FAILURE)
      })
  }, [])

  return (
    <>
      <p>Popular Tags</p>
      <div className="tag-list">
        {requestState === PENDING && <span>Loading...</span>}
        {requestState === FAILURE && <span>Could not load tags.</span>}
        {requestState === SUCCESS &&
          tags
            .filter((tag) => tag.split().every((c) => c.charCodeAt(0) !== 8204))
            .map((tag) => (
              <Link to={`/?tag=${tag}`} className="tag-pill tag-default">
                {tag}
              </Link>
            ))}
      </div>
    </>
  )
}
