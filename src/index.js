import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import store from './components/App/store'
import { InterfaceState } from './components/App/interface_reducer'

import CFToggleButton from './components/CFToggleButton/CFToggleButton'
import CFButton from './components/CFButton/CFButton'
import App from './components/App/App'
import videoAdapters from './lib/video_adapters'
import loadConfig from './config'


window.CaptainFactOverlayInjector = class CaptainFactOverlayInjector {
  constructor(config) {
    this.config = loadConfig(config)
    this.mountedFacts = []
    this.injectedFactsContainers = []
    this.defaultFactsInjector = this.defaultFactsInjector.bind(this)
    this.factsMounter = this.factsMounter.bind(this)
    this.enable = this.enable.bind(this)
    this.disable = this.disable.bind(this)

    this.mountAll()
  }

  // ---- Public API ----

  /**
   * Enable the fact injector
   * @returns {boolean} - returns false if already enabled or mounted
   */
  enable() {
    if (store.getState().Interface.isEnabled || this.mountedFacts.length > 0) {
      console.warn('Facts overlay already mounted, ignoring request')
      return false
    }
    InterfaceState.enable()
    this.mountAll()
    return true
  }

  /**
   * Disable fact injector and unmount all mounted facts
   */
  disable() {
    // Delete all DOM elements
    this.unmountAll()

    // Disable and reset store
    InterfaceState.disable()
    store.reset()
  }

  /**
   * Unmount existing overlay and reload everything. Useful with single page apps
   */
  reload() {
    this.unmountAll()
    store.reset()
    this.mountAll()
  }

  // ---- Private API ----

  mountAll() {
    this.mountActivateToggleBtns()
    this.mountAllFactsEngine()
  }

  unmountAll() {
    // Delete all DOM elements
    this.mountedFacts.map(domNode => ReactDOM.unmountComponentAtNode(domNode))
    this.injectedFactsContainers.map(domNode => domNode.parentNode.removeChild(domNode))
    this.mountedFacts = []
    this.injectedFactsContainers = []
  }

  mountAllFactsEngine() {
    if (!store.getState().Interface.isEnabled)
      return false
    const videos = this.config.injector.videosSelectorFunc()
    if (videos.length === 0)
      return 0
    // TODO We only support a single video at the moment
    this.mountFactEngine(videos[0])
  }

  mountFactEngine(video) {
    const isOverlay = this.config.app.display === 'overlay'
    const videoUrl = this.config.injector.urlExtractor(video)
    const player = this.config.injector.getPlayer(video, videoAdapters)

    // Ensure parent will hide sidebar correctly with animated overlay
    if (this.config.app.animated !== false && isOverlay)
      video.style.overflow = 'hidden'

    // Send components generators to injector
    const injector = this.config.injector.factsInjector || this.defaultFactsInjector
    injector(
      this.factsMounter, video,
      () => <App videoUrl={videoUrl} player={player} config={this.config.app}/>,
      () => isOverlay ? <CFButton onClick={InterfaceState.openSidebar} icons={this.config.app.graphics.logo}/> : null
    )
  }

  defaultFactsInjector(mountFunc, video, facts, toggleBtn) {
    mountFunc(this.injectInNode(video), facts)
    mountFunc(this.injectInNode(video), toggleBtn)
  }

  injectInNode(node) {
    const injectDOM = document.createElement('div')
    node.appendChild(injectDOM)
    this.injectedFactsContainers.push(injectDOM)
    return injectDOM
  }

  factsMounter(container, componentGenerator) {
    const component = componentGenerator()
    if (component) {
      this.mountWithStore(container, component)
      this.mountedFacts.push(container)
    }
  }

  mountActivateToggleBtns() {
    if (!this.config.injector.activateToggleBtnClass)
      return 0
    const allContainers = document.getElementsByClassName(this.config.injector.activateToggleBtnClass)
    for (let container of allContainers) {
      this.mountWithStore(
        container,
        <CFToggleButton enable={this.enable} disable={this.disable} icon={this.config.app.graphics.logo.neutral}/>
      )
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