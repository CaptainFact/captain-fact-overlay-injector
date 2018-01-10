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
    const videos = this.config.videosSelectorFunc()
    if (videos.length === 0)
      return 0
    // TODO We only support a single video at the moment
    this.mountFactEngine(videos[0])
  }

  mountFactEngine(video) {
    const isOverlay = !this.config.display || this.config.display === 'overlay'
    const videoUrl = this.config.urlExtractor(video)

    // Ensure parent will hide sidebar correctly with animated overlay
    if (this.config.animated !== false && isOverlay)
      video.style.overflow = 'hidden'

    // Send components generators to injector
    const injector = this.config.factsInjector || this.defaultFactsInjector
    injector(
      this.factsMounter, video,
      () => <App videoUrl={videoUrl} player={video} display={this.config.display || 'overlay'}/>,
      () => isOverlay ? <CFButton onClick={InterfaceState.openSidebar}/> : null
    )
  }

  defaultFactsInjector(mountFunc, video, facts, toggleBtn) {
    const injectDOM = document.createElement('div')
    const injectDOM2 = document.createElement('div')

    video.appendChild(injectDOM)
    video.appendChild(injectDOM2)
    mountFunc(injectDOM, facts)
    mountFunc(injectDOM2, toggleBtn)
  }

  factsMounter(container, componentGenerator) {
    const component = componentGenerator()
    if (component)
      mountWithStore(container, component)
  }

  mountActivateToggleBtns() {
    if (!this.config.activateToggleBtnClass)
      return 0
    const allContainers = document.getElementsByClassName(this.config.activateToggleBtnClass)
    for (let container of allContainers) {
      mountWithStore(container, <CFToggleButton/>)
    }
  }
}

/**
 * Create a dom node, append it to given node, and mount given React component in it
 * @param node - The node inside which component will be added
 * @param component - The component to mount
 */
function mountWithStore(node, component) {
  ReactDOM.render(
    <Provider store={store}>
      {component}
    </Provider>
  , node)
}

// If config is defined in the global scope, instantiate after window.onload
if (typeof window.CaptainFactOverlayConfig !== 'undefined')
  window.addEventListener('load', () => {
    new CaptainFactOverlayInjector(window.CaptainFactOverlayConfig)
  })


export default CaptainFactOverlayInjector