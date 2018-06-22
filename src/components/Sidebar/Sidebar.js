import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import Statement from '../Statement/Statement'
import FactsContainer from '../Fact/FactsContainer'
import { InterfaceState } from '../App/interface_reducer'
import { STATEMENT_FOCUS_TIME } from '../../constants'
import { PlaybackState } from '../App/playback_reducer'
import { getGraphics } from '../App/Configuration/selectors'
import Header from './Header'

import {
  sidebar, sidebarContent, jumpLink, actionsLinks, disabled, collapsed,
  slideIn, slideOut, statementsList, isBlock, animated
} from './Sidebar.css'

import DEFAULT_IMG_PREV from '../../assets/prev.svg'
import DEFAULT_IMG_NEXT from '../../assets/next.svg'


@connect(state => ({
  statements: state.Statements.data,
  isLoading: state.Statements.isLoading,
  isCollapsed: state.Interface.sidebarCollapsed,
  videoHashId: state.Video.data.hashId,
  config: state.Configuration.get('app'),
  imgNext: getGraphics(state).next || DEFAULT_IMG_NEXT,
  imgPrev: getGraphics(state).prev || DEFAULT_IMG_PREV
}))
export default class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTime: null, currentView: 'facts'
    }
    this.collapseAnimation = null
    this.handleTimeClick = this.handleTimeClick.bind(this)
  }

  componentWillUpdate(nextProps) {
    if (this.props.isCollapsed && !nextProps.isCollapsed)
      this.collapseAnimation = slideIn
    else if (!this.props.isCollapsed && nextProps.isCollapsed)
      this.collapseAnimation = slideOut
    else
      this.collapseAnimation = null
  }

  componentDidMount() {
    if (this.props.player)
      this.props.player.onTimeUpdate(this.onTimeUpdate.bind(this))
  }

  componentWillUnmount() {
    if (this.props.player)
      this.props.player.destroy()
  }

  onTimeUpdate(currentTime) {
    // TODO move to effect
    currentTime = Math.trunc(currentTime)
    if (this.state.currentTime !== currentTime) {
      this.setState({ currentTime: currentTime + 1 })
      PlaybackState.setPosition(currentTime + 1)
    }
  }

  getFocusedStatementIndex() {
    // TODO Move to redux selector
    const { currentTime } = this.state
    if (currentTime === null)
      return -1
    return this.props.statements.findLastIndex(st =>
      currentTime >= st.time && currentTime <= st.time + STATEMENT_FOCUS_TIME
    )
  }

  handleTimeClick(time) {
    // TODO move to effect
    this.setState({ currentTime: time + 1 })
    PlaybackState.setPosition(time + 1)
    if (this.props.player)
      this.props.player.setPosition(time)
  }

  renderStatementJumpLink(jumpType, statement, textBefore = '', textAfter = '') {
    return (
      <button
        className={classnames(jumpLink, {[disabled]: !statement})}
        onClick={() => (statement ? this.handleTimeClick(statement.time) : true)}
      >
        {textBefore} {jumpType} {textAfter}
      </button>
    )
  }

  toggleView() {
    this.setState({
      currentView: (this.state.currentView === 'facts' ? 'statements' : 'facts')
    })
  }

  renderStatementNavigateLinks(currentStatementIdx) {
    const { currentTime } = this.state
    const { statements, imgNext, imgPrev } = this.props
    const prevStatement = statements.findLast((s, idx) => s.time < currentTime && idx !== currentStatementIdx)
    const nextStatement = statements.find((s, idx) => s.time > currentTime && idx !== currentStatementIdx)

    return (
      <div className={actionsLinks}>
        {this.renderStatementJumpLink('Previous', prevStatement, <img src={imgPrev} alt="<"/>)}
        {statements.size > 1 &&
          <button className={jumpLink} onClick={() => this.toggleView()}>
            Show {this.state.currentView === 'facts' ? 'Statements' : 'Facts'}
          </button>
        }
        {this.renderStatementJumpLink('Next', nextStatement, null, <img src={imgNext} alt=">"/>)}
      </div>
    )
  }

  render() {
    const currentStatementIdx = this.getFocusedStatementIndex()
    const currentStatement = currentStatementIdx === -1 ? null : this.props.statements.get(currentStatementIdx)
    const {statements, isCollapsed, config: {display, animate, graphics}} = this.props
    const isOverlay = display === 'overlay'
    const classes = classnames(sidebar, this.collapseAnimation, {
      [collapsed]: isOverlay && isCollapsed,
      [isBlock]: display === 'block',
      [animated]: animate
    })
    const urlParams = currentStatement != null ? {statement: currentStatement.id} : {}

    return (
      <div className={classes}>
        <Header
          videoHashId={this.props.videoHashId}
          onCloseClick={isOverlay ? InterfaceState.closeSidebar : null}
          imgNewTab={graphics.newTab}
          imgClose={graphics.close}
          urlParams={urlParams}
        />
        {this.renderStatementNavigateLinks(currentStatementIdx)}
        <div className={sidebarContent}>
          {this.state.currentView === 'facts' && currentStatementIdx !== -1 &&
            <div>
              <Statement
                statement={currentStatement}
                isFocused
                onTimeClick={this.handleTimeClick}
              />
              <FactsContainer comments={currentStatement.comments}/>
            </div>
          }
          {this.state.currentView === 'statements' &&
            <div className={statementsList}>
              {statements.map(s => (
                <Statement
                  key={s.id}
                  statement={s}
                  onTimeClick={this.handleTimeClick}
                  textPrefix={s === currentStatement ? '> ' : ''}
                />
              )).toArray()}
            </div>
          }
        </div>
      </div>
    )
  }
}
