import React from 'react'
import { Header } from './Header'


test('default render', () => {
  snapshot(<Header videoHashId="xxxx" t={(str) => str} />)
})

test('show toggle if given a close function', () => {
  snapshot(<Header videoHashId="xxxx" onCloseClick={() => 42} t={(str) => str} />)
})

test('new tab image can be override', () => {
  snapshot(<Header videoHashId="xxxx" imgNewTab="overrided-pic.jpg" t={(str) => str} />)
})

test('call function when clicking on close', () => {
  const closeFunc = jest.fn()
  const mounted = shallow(<Header videoHashId="xxxx" onCloseClick={closeFunc} t={(str) => str} />)

  mounted.find('.closeBtn').first().simulate('click')
  expect(closeFunc).toBeCalled()
})
