import React from 'react'
import { TagList } from './TagList'
import { Feed } from './Feed'

export const HomePage = () => {
  return (
    <>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <Feed />
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <TagList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
