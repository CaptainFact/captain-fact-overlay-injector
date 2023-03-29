import React from 'react'
import { UserAppellation } from './UserAppellation'

test('render with only username', () => {
  snapshot(<UserAppellation user={{ username: 'Toto' }} />)
})

test('render with username + name', () => {
  snapshot(<UserAppellation user={{ username: 'Toto', name: 'Titi Toto' }} />)
})
