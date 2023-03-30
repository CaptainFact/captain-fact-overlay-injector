import React from 'react'
import { OnOffToggle } from './OnOffToggle'

test('button activated', () => {
  snapshot(<OnOffToggle isEnabled />)
})

test('button disabled', () => {
  snapshot(<OnOffToggle isEnabled={false} />)
})

test('displays custom icon', () => {
  snapshot(<OnOffToggle isEnabled icon="custom-icon.jpg" />)
})
