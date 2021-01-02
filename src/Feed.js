import React from 'react'
import { useParams } from 'react-router-dom'

import { getArticles, getArticleFeed } from './api-client'
import { useQueryParams } from './useQueryParams'
import { useRequest } from './useRequest'
import { renderMaybeEmptyList, matchString } from './helpers'
import { NoArticlesMessage, renderArticlePreviewList } from './ArticlePreview'
import { BlockLoadingIndicator, Tabs, Tab } from './ui-components'

const tabs = [
  { key: 'my-feed', linkTo: '/my-feed', title: 'Your Feed' },
  { key: 'global', linkTo: '/global', title: 'Global Feed' },
]

export const Feed = () => {
  const { tab } = useParams()
  const tag = useQueryParams().get('tag')

  const request = React.useCallback(
    () =>
      matchString(tab)({
        'my-feed': () => getArticleFeed(),
        global: () => getArticles({ tag }),
      }),
    [tag, tab],
  )

  const matchRequestState = useRequest(request)

  return (
    <>
      <div className="feed-toggle">
        <Tabs>{tabs.map(Tab)}</Tabs>
      </div>
      <div className="container">
        {matchRequestState({
          idle: BlockLoadingIndicator,
          pending: BlockLoadingIndicator,
          success: renderMaybeEmptyList(
            NoArticlesMessage,
            renderArticlePreviewList,
          ),
          failure: () => (
            <span>
              Feed articles could not be loaded. Try reloading the page.
            </span>
          ),
        })}
      </div>
    </>
  )
}
