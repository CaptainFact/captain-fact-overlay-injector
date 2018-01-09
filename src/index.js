import React from 'react'
import ReactDOM from 'react-dom'

import {videosSelectorFunc, resolverFunc} from './config'
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

  // Inject facts on videos
  const videoTags = videosSelectorFunc(document)
  for (const videoTag of videoTags) {
    const videoUrl = resolverFunc(videoTag)
    const injectDOM = document.createElement('div')
    injectDOM.className = DOM_NODE_CLASS
    videoTag.appendChild(injectDOM)
    ReactDOM.render(<InjectedApp videoUrl={videoUrl}/>, injectDOM)
  }
}