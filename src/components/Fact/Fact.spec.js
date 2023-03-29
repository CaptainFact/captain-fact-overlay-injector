import React from 'react'
import { Fact } from './Fact'

const BASE_COMMENT = {
  user: { id: 42 },
  approve: true,
  score: 1337,
  source: {
    url: 'https://example.com',
  },
}

test('approving fact', () => {
  snapshot(<Fact comment={BASE_COMMENT} graphics={{}} />)
})

test('refuting fact', () => {
  snapshot(<Fact comment={{ ...BASE_COMMENT, approve: false }} graphics={{}} />)
})

test('with text', () => {
  snapshot(<Fact comment={{ ...BASE_COMMENT, text: 'Foobar' }} graphics={{}} />)
})

test('custom star image', () => {
  snapshot(<Fact comment={BASE_COMMENT} graphics={{ star: 'custom.jpg' }} />)
})
