import {OnOffToggle} from './OnOffToggle'


test('button activated', () => {
  snapshot(<OnOffToggle isEnabled={true}/>)
})

test('button disabled', () => {
  snapshot(<OnOffToggle isEnabled={false}/>)
})

test('displays custom icon', () => {
  snapshot(<OnOffToggle isEnabled={true} icon="custom-icon.jpg"/>)
})

test('verify buttons labels and order', () => {
  const mounted = mount(<OnOffToggle isEnabled={false}/>)
  expect(mounted.find('.radioBtn').at(0).text()).toBe('ON')
  expect(mounted.find('.radioBtn').at(1).text()).toBe('OFF')
})

test('call enable if disabled', () => {
  const enableFunc = jest.fn()
  const mounted = mount(<OnOffToggle isEnabled={false} enable={enableFunc}/>)

  mounted.find('.radioBtn').at(0).simulate('click')
  expect(enableFunc).toBeCalled()
})

test('call enable if enabled', () => {
  const disableFunc = jest.fn()
  const mounted = mount(<OnOffToggle isEnabled={false} enable={disableFunc}/>)

  mounted.find('.radioBtn').at(0).simulate('click')
  expect(disableFunc).toBeCalled()
})
