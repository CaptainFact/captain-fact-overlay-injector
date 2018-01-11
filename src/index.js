import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import CFToggleButton from './components/CFToggleButton/CFToggleButton'
import CFButton from './components/CFButton/CFButton'
import { InterfaceState } from './components/App/interface_reducer'
import store from './components/App/store'
import App from './components/App/App'
import videoAdapters from './lib/video_adapters'


window.CaptainFactOverlayInjector = class CaptainFactOverlayInjector {
  constructor(config={}) {
    // TODO check config and warn user if missing keys
    this.config = config
    this.mountedFacts = []
    this.factsMounter = this.factsMounter.bind(this)
    this.enable = this.enable.bind(this)
    this.disable = this.disable.bind(this)

    this.mountAll()
  }

  // ---- Public API ----

  enable() {
    if (this.mountedFacts.length > 0) {
      console.warn('Facts overlay already mounted, ignoring request')
      return false
    }
    InterfaceState.enable()
    this.mountAll()
    return true
  }

  disable() {
    // Delete all DOM elements
    InterfaceState.disable()
    store.reset()
    this.mountedFacts.map(domNode => ReactDOM.unmountComponentAtNode(domNode))
    this.mountedFacts = []
  }

  // ---- Private API ----

  mountAll() {
    this.mountActivateToggleBtns()
    this.mountAllFactsEngine()
  }

  mountAllFactsEngine() {
    if (!store.getState().Interface.isEnabled)
      return false
    const videos = this.config.videosSelectorFunc()
    if (videos.length === 0)
      return 0
    // TODO We only support a single video at the moment
    this.mountFactEngine(videos[0])
  }

  mountFactEngine(video) {
    const isOverlay = !this.config.display || this.config.display === 'overlay'
    const videoUrl = this.config.urlExtractor(video)
    const player = this.config.getPlayer(video, videoAdapters)

    // Ensure parent will hide sidebar correctly with animated overlay
    if (this.config.animated !== false && isOverlay)
      video.style.overflow = 'hidden'

    // Send components generators to injector
    const injector = this.config.factsInjector || this.defaultFactsInjector
    injector(
      this.factsMounter, video,
      () => <App videoUrl={videoUrl} player={player} display={this.config.display || 'overlay'}/>,
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
    if (component) {
      this.mountWithStore(container, component)
      this.mountedFacts.push(container)
    }
  }

  mountActivateToggleBtns() {
    if (!this.config.activateToggleBtnClass)
      return 0
    const allContainers = document.getElementsByClassName(this.config.activateToggleBtnClass)
    for (let container of allContainers) {
      this.mountWithStore(container, <CFToggleButton enable={this.enable} disable={this.disable}/>)
    }
  }

  /**
   * Mount given React component in node with a store binded
   * @param node - The node inside which component will be added
   * @param component - The component to mount
   */
  mountWithStore(node, component) {
    ReactDOM.render(
      <Provider store={store}>
        {component}
      </Provider>
    , node)
  }
}

// If config is defined in the global scope, instantiate after window.onload
if (typeof window.CaptainFactOverlayConfig !== 'undefined')
  window.addEventListener('load', () => {
    window.injectedCaptainFactOverlay = new CaptainFactOverlayInjector(window.CaptainFactOverlayConfig)
  })


export default CaptainFactOverlayInjector