import Enzyme, { shallow, render } from 'enzyme'
import { Adapter } from 'enzyme-adapter-preact'


// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() })

// Make Enzyme functions available in all test files without importing
global.shallow = shallow
global.render = render

// Add a helper to register snapshot
global.snapshot = component => expect(shallow(component)).toMatchSnapshot()

