import Enzyme, { shallow, render } from 'enzyme'
import { Adapter } from 'enzyme-adapter-preact'


// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() })

// Make Enzyme functions available in all test files without importing
global.shallow = shallow
global.render = render
global.tMock = str => `Translated<${str}>`

// Add a helper to register snapshot
global.snapshot = Component => expect(shallow(Component)).toMatchSnapshot()

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate HoC receive
  // the t function as a prop
  translate: () => Component => {
    Component.defaultProps = {
      ...Component.defaultProps,
      t: (str) => `translated<${str}>`
    }
    return Component
  }
}))
