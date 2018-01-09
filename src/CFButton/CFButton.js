import 'isomorphic-fetch'
import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { cfbutton, pulse } from './CFButton.css'
import { InterfaceState } from '../App/interface_reducer'
import { getFocusedStatement } from '../Statement/selectors'
import { ICONS } from '../config'


@connect(state => ({
  statements: state.Statements.data,
  displayed: state.Interface.sidebarCollapsed,
  video: state.Video.data,
  statement: getFocusedStatement(state)
}))
export default class CFButton extends React.Component {
  getIcon() {
    if (!this.props.statement)
      return ICONS.neutral

    const globalScore = this.props.statement.comments.reduce((score, comment) =>
      score + (comment.approve ? comment.score : -comment.score)
    , 0)
    if (globalScore > 0)
      return ICONS.confirm
    else if (globalScore < 0)
      return ICONS.refute
    else
      return ICONS.neutral
  }

  render() {
    if (!this.props.video || this.props.statements.size === 0)
      return null
    return (
      <img src={this.getIcon()}
        className={classnames("CFButton", cfbutton, {[pulse]: !!this.props.statement})}
        title="CaptainFact"
        onClick={InterfaceState.openSidebar}
        style={{
          display: this.props.displayed ? "block" : "none"
        }}
      />
    )
  }
}