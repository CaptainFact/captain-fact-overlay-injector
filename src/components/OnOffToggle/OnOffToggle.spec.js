import React from 'react'
import { OnOffToggle } from './OnOffToggle'


test('button activated', () => {
  snapshot(<OnOffToggle isEnabled/>)
})

test('button disabled', () => {
  snapshot(<OnOffToggle isEnabled={false}/>)
})

test('displays custom icon', () => {
  snapshot(<OnOffToggle isEnabled icon="custom-icon.jpg"/>)
})

test('verify buttons labels and order', () => {
  const mounted = shallow(<OnOffToggle isEnabled={false}/>)
  expect(mounted.find('.radioBtn').at(0).text()).toBe('ON')
  expect(mounted.find('.radioBtn').at(1).text()).toBe('OFF')
})

test('call enable if disabled', () => {
  const enableFunc = jest.fn()
  const mounted = shallow(<OnOffToggle isEnabled={false} enable={enableFunc}/>)

  mounted.find('.radioBtn').at(0).simulate('click')
  expect(enableFunc).toBeCalled()
})

test('call enable if enabled', () => {
  const disableFunc = jest.fn()
  const mounted = shallow(<OnOffToggle isEnabled={false} enable={disableFunc}/>)

  mounted.find('.radioBtn').at(0).simulate('click')
  expect(disableFunc).toBeCalled()
})
