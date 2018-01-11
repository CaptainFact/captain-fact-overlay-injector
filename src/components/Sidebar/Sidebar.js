import React, { Component } from 'react'
import { Actions } from 'jumpstate'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { fetchStatements } from '../Statement/effects'
import Statement from '../Statement/Statement.js'
import FactsContainer from '../Fact/FactsContainer.js'
import { icon } from "../Utils/Icon.css"
import { InterfaceState } from '../App/interface_reducer'
import { frontendURL, statementFocusTime } from '../../config'

import {
  sidebar, sidebarHeader, title, sidebarContent, jumpLink, actionsLinks, disabled , collapsed,
  slideIn, slideOut, statementsList, isBlock, animated, closeBtn
} from './Sidebar.css'
import { PlaybackState } from '../App/playback_reducer'

import imgNewTab from "../../assets/new_tab.png"

@connect(state => ({
  statements: state.Statements.data,
  isLoading: state.Statements.isLoading,
  isCollapsed: state.Interface.sidebarCollapsed,
  videoId: state.Video.data.id
}))
export default class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTime: null, currentView: "facts"
    }
    // this.player = null
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
    fetchStatements(this.props.video.id)
    this.props.player.onTimeUpdate(this.onTimeUpdate.bind(this))
  }

  componentWillUnmount() {
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
      currentTime >= st.time && currentTime <= st.time + statementFocusTime
    )
  }

  handleTimeClick(time) {
    // TODO move to effect
    this.props.player.setPosition(time)
  }

  renderStatementJumpLink(jumpType, statement, textBefore='', textAfter='') {
    return (
      <a className={classnames(jumpLink, {[disabled]: !statement})}
         onClick={() => statement ? this.handleTimeClick(statement.time) : true}>
        {textBefore}{jumpType} {textAfter}
      </a>
    )
  }

  toggleView() {
    this.setState({currentView: (this.state.currentView === "facts" ? "statements" : "facts")})
  }

  renderStatementNavigateLinks(currentStatementIdx) {
    const { currentTime } = this.state
    const { statements } = this.props
    const prevStatement = statements.findLast((s, idx) => s.time < currentTime && idx !== currentStatementIdx)
    const nextStatement = statements.find((s, idx) => s.time > currentTime && idx !== currentStatementIdx)
    return (
      <div className={actionsLinks}>
        {this.renderStatementJumpLink('Previous', prevStatement, '⏮️ ')}
        {statements.size > 1 &&
          <a className={jumpLink} onClick={this.toggleView.bind(this)}>
            Show {this.state.currentView === "facts" ? "Statements" : "Facts"}
          </a>
        }
        {this.renderStatementJumpLink('Next', nextStatement, '', ' ⏭️')}
      </div>
    )
  }

  render() {
    const currentStatementIdx = this.getFocusedStatementIndex()
    const currentStatement = currentStatementIdx === -1 ? null : this.props.statements.get(currentStatementIdx)
    const {statements, isCollapsed, display='overlay', animate=true} = this.props
    const togglable = display === 'overlay'
    const classes = classnames(sidebar, this.collapseAnimation, {
      [collapsed]: togglable && isCollapsed,
      [isBlock]: display === 'block',
      [animated]: animate
    })

    return (
      <div className={classes}>
        <div className={sidebarHeader}>
          <a href={`${frontendURL}/videos/${this.props.videoId}`} target="_BLANK"
             title="Open discussion on CaptainFact">
            <h1 className={title}>CaptainFact <img src={imgNewTab}/></h1>

          </a>
          {togglable &&
          <a title="Close sidebar" className={closeBtn} onClick={InterfaceState.closeSidebar}>
            ❌
          </a>
          }
        </div>
        {this.renderStatementNavigateLinks(currentStatementIdx)}
        <div className={sidebarContent}>
          {this.state.currentView === "facts" && currentStatementIdx !== -1 &&
            <div>
              <Statement statement={currentStatement} isFocused={true}
                         onTimeClick={this.handleTimeClick}/>
              <FactsContainer comments={currentStatement.comments}/>
            </div>
          }
          {this.state.currentView === "statements" &&
            <div className={statementsList}>
              {statements.map(s =>
                <Statement  key={s.id} statement={s} onTimeClick={this.handleTimeClick}
                            textPrefix={s === currentStatement ? '➡️ ' : ''}/>
              )}
            </div>
          }
        </div>
      </div>
    );
  }
}
