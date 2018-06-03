import React from 'react'
import { Fact } from './Fact'


test('approving fact', () => {
  snapshot(<Fact comment={{user: {id: 42}, approve: true, score: 1337}} graphics={{}}/>)
})

test('refuting fact', () => {
  snapshot(<Fact comment={{user: {id: 42}, approve: false, score: 1337}} graphics={{}}/>)
})

test('with text', () => {
  snapshot(<Fact comment={{user: {id: 42}, approve: true, score: 1337, text: 'Foobar'}} graphics={{}}/>)
})

test('custom star image', () => {
  snapshot(<Fact comment={{user: {id: 42}, approve: true, score: 1337}} graphics={{star: 'custom.jpg'}}/>)
})