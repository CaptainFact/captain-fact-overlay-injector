import React from 'react'
import Header from './Header'

test('default render', () => {
  snapshot(<Header videoHashId="xxxx" t={tMock} />)
})

test('show toggle if given a close function', () => {
  snapshot(<Header videoHashId="xxxx" onCloseClick={() => 42} t={tMock} />)
})

test('new tab image can be override', () => {
  snapshot(
    <Header videoHashId="xxxx" imgNewTab="overrided-pic.jpg" t={tMock} />
  )
})

test('with empty url params', () => {
  const urlParams = {}
  snapshot(<Header videoHashId="xxxx" urlParams={urlParams} t={tMock} />)
})

test('with statement in url params', () => {
  const urlParams = { statement: 61 }
  snapshot(<Header videoHashId="xxxx" urlParams={urlParams} t={tMock} />)
})
