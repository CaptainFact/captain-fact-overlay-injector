import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import {activatedLocalStorageKey} from './config'
import CFToggleButton from './components/CFToggleButton/CFToggleButton'
import CFButton from './components/CFButton/CFButton'
import { InterfaceState } from './components/App/interface_reducer'
import store from './components/App/store'
import App from './components/App/App'


const DOM_NODE_CLASS = 'captainfact-overlay'
const DOM_TOGGLE_BTN_NODE_CLASS = 'cf-toggle-btn'
const CF_BUTTON_NODE_CLASS = 'CFButton'


window.CaptainFactOverlayInjector = class CaptainFactOverlayInjector {
  constructor(config={}) {
    this.config = config
    // TODO check config and warn user if missing keys
    this.mountActivateToggleBtns()
    this.mountAllFactsEngine()
  }

  mountAllFactsEngine() {
    const videos = this.config.videosSelectorFunc(document)
    if (videos.length === 0)
      return 0
    // TODO We only support a single video at the moment
    this.mountFactEngine(videos[0])
  }

  mountFactEngine(video) {
    const videoUrl = this.config.urlExtractor(video)
    if (this.config.animated !== false)
      video.style.overflow = 'hidden'

    injectWithStore(video, <App videoUrl={videoUrl} player={video}/>)
    injectWithStore(video, <CFButton onClick={InterfaceState.openSidebar}/>, CF_BUTTON_NODE_CLASS)
  }

  mountActivateToggleBtns() {
    if (!this.config.activateToggleBtnClass)
      return 0
    const allContainers = document.getElementsByClassName(this.config.activateToggleBtnClass)
    for (let container of allContainers) {
      injectWithStore(container, <CFToggleButton/>)
    }
  }
}

/**
 * Create a dom node, append it to given node, and mount given React component in it
 * @param node - The node inside which component will be added
 * @param component - The component to mount
 * @param injectedClassName - HTML class for component's container
 * @param injectedType - Container HTML type (@default "div")
 */
function injectWithStore(node, component, injectedClassName="", injectedType='div') {
  const injectDOM = document.createElement(injectedType)
  injectDOM.className = injectedClassName
  node.appendChild(injectDOM)
  ReactDOM.render(
    <Provider store={store}>
      {component}
    </Provider>
  , injectDOM)
}

if (typeof window.CaptainFactOverlayConfig !== 'undefined')
  window.addEventListener('load', () => {
    new CaptainFactOverlayInjector(window.CaptainFactOverlayConfig)
  })


export default CaptainFactOverlayInjector