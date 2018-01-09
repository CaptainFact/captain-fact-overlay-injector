import React from 'react'
import ReactDOM from 'react-dom'


import InjectedApp from './App/InjectedApp'
import CFToggleButton from './CFToggleButton/CFToggleButton'


const DOM_NODE_CLASS = 'captainfact-overlay'
const DOM_TOGGLE_BTN_NODE_CLASS = 'cf-toggle-btn'
const CF_BUTTON_NODE_CLASS = 'CFButton'

window.onload = () => {
  // Load CF toggle buttons
  const toggleBtns = document.getElementsByClassName(DOM_TOGGLE_BTN_NODE_CLASS)
  for (const domNode of toggleBtns)
    ReactDOM.render(<CFToggleButton/>, domNode)

  // Load facts on videos
  const youtubeFrames = document.querySelectorAll('iframe[src^="https://www.youtube.com"]')
  for (const frame of youtubeFrames) {
    // const injectDOM = document.createElement('div')
    // injectDOM.className = DOM_NODE_CLASS
    // frame.appendChild(injectDOM)
    // console.log(frame)
  }
}