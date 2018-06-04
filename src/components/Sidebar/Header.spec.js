import {Header} from './Header'


test('default render', () => {
  snapshot(<Header videoHashId="xxxx"/>)
})

test('show toggle if given a close function', () => {
  snapshot(<Header videoHashId="xxxx" onCloseClick={() => 42}/>)
})

test('new tab image can be override', () => {
  snapshot(<Header videoHashId="xxxx" imgNewTab="overrided-pic.jpg"/>)
})

test('call function when clicking on close', () => {
  const closeFunc = jest.fn()
  const mounted = mount(<Header videoHashId="xxxx" onCloseClick={closeFunc}/>)

  mounted.find('.closeBtn').first().simulate('click')
  expect(closeFunc).toBeCalled()
})
