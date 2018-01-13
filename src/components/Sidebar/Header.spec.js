import {Header} from './Header'


test('default render', () => {
  snapshot(<Header videoId={42}/>)
})

test('show toggle if given a close function', () => {
  snapshot(<Header videoId={50} onCloseClick={() => 42}/>)
})

test('new tab image can be override', () => {
  snapshot(<Header videoId={42} imgNewTab="overrided-pic.jpg"/>)
})

test('call function when clicking on close', () => {
  const closeFunc = jest.fn()
  const mounted = mount(<Header videoId={42} onCloseClick={closeFunc}/>)

  mounted.find('.closeBtn').first().simulate('click')
  expect(closeFunc).toBeCalled()
})
