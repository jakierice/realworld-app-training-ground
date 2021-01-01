import React from 'react'
import { Link } from 'react-router-dom'

import { getTags } from './api-client'
import { useRequest } from './useRequest'
import {
  isEveryCharacterZeroWidthNonJoiner,
  renderMaybeEmptyList,
} from './helpers'

import { BlockLoadingIndicator } from './ui-components'

const Tag = (tag) => (
  <Link to={`/?tag=${tag}`} className="tag-pill tag-default" key={tag}>
    {tag}
  </Link>
)

const renderTags = (tags) =>
  tags.filter(isEveryCharacterZeroWidthNonJoiner).map(Tag)

const NoTagsMessage = () => (
  <span>
    None of the articles have tags. You can tag an article during creation or
    editing!
  </span>
)

export const TagList = () => {
  const request = React.useCallback(() => getTags(), [])
  const matchRequestState = useRequest(request)

  return (
    <>
      <p>Popular Tags</p>
      <div className="tag-list">
        {matchRequestState({
          idle: BlockLoadingIndicator,
          pending: BlockLoadingIndicator,
          failure: () => <span>Could not load tags.</span>,
          success: renderMaybeEmptyList(NoTagsMessage, renderTags),
        })}
      </div>
    </>
  )
}
