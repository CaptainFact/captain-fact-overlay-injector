import React from 'react'
import Source from './Source'

const DEFAULT_SOURCE = {
  url: 'https://truetruth.local/this-is-the-truth',
  title: 'The true fact about facts',
  site_name: 'TrueTruth',
}

test('full source', () => {
  snapshot(<Source source={DEFAULT_SOURCE} />)
})

test('source without site name', () => {
  snapshot(<Source source={{ ...DEFAULT_SOURCE, site_name: null }} />)
})

test('with custom new tab image', () => {
  snapshot(<Source source={DEFAULT_SOURCE} imgNewTab="custom-pic.jpg" />)
})
