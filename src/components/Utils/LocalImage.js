import React from 'react'

const LocalImage = ({src, ...props}) =>
  <img src={`img/${src}`} {...props}/>

export default LocalImage