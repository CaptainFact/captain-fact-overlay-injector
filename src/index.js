import React from 'react'
import {Provider} from 'react-redux'
import { I18nextProvider } from 'react-i18next'

import store from './components/App/store'
import { InterfaceState } from './components/App/interface_reducer'
import { ConfigurationState } from './components/App/Configuration/reducer'

import videoAdapters from './lib/video_adapters'
import OnOffToggle from './components/OnOffToggle/OnOffToggle'
import App from './components/App/App'

import i18n from './1i18n'

const ReactDOM = require('react-dom')

class CaptainFactOverlayInjector {
  constructor(config) {
    ConfigurationState.load(config)
    this.config = store.getState().Configuration
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
   * Return the current lib version
   * @returns {string}
   */
  static getVersion() {
    return CF_VERSION
  }

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
   * Unmount existing overlay and reload everything (except configuration)
   */
  reload() {
    this.unmountAll()
    store.reset()
    this.mountAll()
  }

  /**
   * @returns {boolean} true if enabled, false otherwise
   */
  isEnabled() {
    // Only use isEnabled if ON / OFF toggle is present
    return this.config.injector.onOffToggleSelector ? store.getState().Interface.isEnabled : true
  }

  /**
   * Autosize only triggers on window size change or fullscreen toggle.
   * If your application has special needs or resize events, you can use
   * this method to force autosize refresh
   */
  forceResize() {
    InterfaceState.forceResize()
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
    if (!this.isEnabled())
      return false
    const videos = this.config.injector.videosSelector()
    if (videos.length === 0 || !videos[0])
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
      this.factsMounter, video, () => <App videoUrl={videoUrl} player={player} container={video}/>
    )
  }

  defaultFactsInjector(mountFunc, video, facts) {
    mountFunc(this.injectInNode(video), facts)
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
    if (!this.config.injector.onOffToggleSelector)
      return 0
    const allContainers = this.config.injector.onOffToggleSelector()
    for (const container of allContainers) {
      this.mountWithStore(
        container,
        <OnOffToggle enable={this.enable} disable={this.disable} icon={this.config.app.graphics.logo.neutral}/>
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
      <I18nextProvider i18n={i18n}>
        <Provider store={store} i18n={i18n}>
          {component}
        </Provider>
      </I18nextProvider>
      , node)
  }
}

// If config is defined in the global scope, instantiate after window.onload
if (typeof window !== 'undefined' && typeof window.CaptainFactOverlayConfig !== 'undefined')
  window.addEventListener('load', () => {
    window.injectedCaptainFactOverlay = new CaptainFactOverlayInjector(window.CaptainFactOverlayConfig)
  })


export default CaptainFactOverlayInjector
