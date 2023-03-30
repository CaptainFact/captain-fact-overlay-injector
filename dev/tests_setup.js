import React from 'react'
import renderer from 'react-test-renderer'
import { render, screen } from '@testing-library/react'

global.shallow = (Component) => render(Component) && screen

// Make Enzyme functions available in all test files without importing
global.tMock = (str) => `Translated<${str}>`

// Add a helper to register snapshot
global.snapshot = (Component) => {
  const result = renderer.create(Component).toJSON()
  expect(result).toMatchSnapshot()
}

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate HoC receive
  // the t function as a prop
  withTranslation: () => (Component) => {
    Component.defaultProps = {
      ...Component.defaultProps,
      t: (str) => `translated<${str}>`,
    }
    return Component
  },
}))
