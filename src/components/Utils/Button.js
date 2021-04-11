import React from 'react'


/* eslint-disable react/button-has-type */

/**
 * A Button with default type="button".
 */
const Button = ({ type = 'button', ...props }) => (
  <button
    type={type}
    {...props}
  />
)

export default Button
