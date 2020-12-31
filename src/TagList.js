import React from 'react'
import { Link } from 'react-router-dom'

import { getTags } from './api-client'
import { useRequest } from './useRequest'

export function TagList() {
  const request = React.useCallback(() => getTags(), [])
  const matchRequestState = useRequest(request)

  return (
    <>
      <p>Popular Tags</p>
      <div className="tag-list">
        {matchRequestState({
          idle: () => <></>,
          pending: () => <span>Loading...</span>,
          failure: () => <span>Could not load tags.</span>,
          success: (tags) =>
            tags
              .filter((tag) =>
                tag.split().every((c) => c.charCodeAt(0) !== 8204),
              )
              .map((tag) => (
                <Link to={`/?tag=${tag}`} className="tag-pill tag-default">
                  {tag}
                </Link>
              )),
        })}
      </div>
    </>
  )
}
