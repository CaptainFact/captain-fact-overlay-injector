import 'isomorphic-fetch'
import React from 'react'
import { connect } from 'react-redux'
import debounce from 'debounce'
import classNames from 'classnames'

import CFButton from '../CFButton/CFButton'
import Sidebar from '../Sidebar/Sidebar'
import { fetchVideo } from '../Video/effects'

import styles from './App.module.css'
import { InterfaceState } from './interface_reducer'
import i18n from '../../i18n'

const SIZE_REGEX = /(\d+)(px|em|rem)$/
const BASE_DIM = 800 * 450
const MAX_DIM = 1920 * 1080
const DIM_INTERVAL = MAX_DIM - BASE_DIM
const MIN_RATIO = 1
const MAX_RATIO = 1.5
const RATIO_INTERVAL = MAX_RATIO - MIN_RATIO
const SIZE_THRESHOLDS = {
  0: 'cf_xmobile',
  769: 'cf_xtablet',
  1024: 'cf_xdesktop',
  1216: 'cf_xwidescreen',
  1408: 'cf_xfullhd',
}

const mapStateToProps = (state) => ({
  video: state.Video.data,
  config: state.Configuration,
  forceResize: state.Interface.forceResize,
})

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.onResize = debounce(this.onResize.bind(this), 200)
    this.state = { forceResize: null }
  }

  componentDidMount() {
    fetchVideo(this.props.videoUrl)
    i18n.changeLanguage(this.props.config.app.language)
    if (this.props.config.app.autoSize) {
      window.addEventListener('resize', this.onResize)
      window.addEventListener('onfullscreenchange', this.onResize)
    }
  }

  componentDidUpdate(oldProps) {
    const currentLocale = this.props.config.app.language
    if (oldProps.config.app.language !== currentLocale) {
      i18n.changeLanguage(currentLocale)
    }
  }

  componentWillUnmount() {
    if (this.props.config.app.autoSize) {
      window.removeEventListener('resize', this.onResize)
      window.removeEventListener('onfullscreenchange', this.onResize)
    }
  }

  render() {
    if (!this.props.video) return <div style={{ display: 'none' }} />
    return (
      <div
        className={classNames(styles.app, this.getScreenType())}
        style={{ fontSize: this.getSize() }}
      >
        {this.props.config.app.display === 'overlay' && (
          <CFButton onClick={InterfaceState.openSidebar} />
        )}
        <Sidebar video={this.props.video} player={this.props.player} />
      </div>
    )
  }

  onResize() {
    this.setState({ forceResize: Date.now() })
  }

  getScreenType() {
    const containerWidth = this.props.container.offsetWidth
    let screenType
    for (const threshold in SIZE_THRESHOLDS) {
      if (containerWidth < threshold) break
      screenType = SIZE_THRESHOLDS[threshold]
    }
    return screenType
  }

  getSize() {
    const parsedSize = SIZE_REGEX.exec(this.props.config.app.baseSize)
    if (!parsedSize) return this.props.config.app.baseSize

    const playerDim =
      this.props.container.offsetWidth * this.props.container.offsetHeight
    const minRatio =
      ((playerDim - BASE_DIM) * RATIO_INTERVAL) / DIM_INTERVAL + MIN_RATIO
    const modifierRatio = Math.min(minRatio, MAX_RATIO)
    const size = parseInt(parsedSize[1]) * modifierRatio
    return `${size}${parsedSize[2]}`
  }
}

export default connect(mapStateToProps)(App)
