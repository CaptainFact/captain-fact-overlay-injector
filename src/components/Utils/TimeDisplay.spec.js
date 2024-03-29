import React from 'react'
import TimeDisplay from './TimeDisplay'

test('render time', () => {
  snapshot(<TimeDisplay time={0} />)
  snapshot(<TimeDisplay time={42} />)
  snapshot(<TimeDisplay time={60} />)
  snapshot(<TimeDisplay time={3600} />)
  snapshot(<TimeDisplay time={7342} />)
})

test('add a - sign if negative', () => {
  snapshot(<TimeDisplay time={-42} />)
})

test('prefix with given text', () => {
  snapshot(<TimeDisplay time={42} textBefore="Dont't feed greemlins after " />)
})

test('time becomes clickable if a function is passed', () => {
  snapshot(<TimeDisplay time={1334} handleClick={() => 'Awesome'} />)
})
