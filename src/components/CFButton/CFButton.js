import 'isomorphic-fetch'
import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { cfbutton, pulse } from './CFButton.css'
import { InterfaceState } from '../App/interface_reducer'
import { getFocusedStatement } from '../Statement/selectors'

import iconNeutral from "../../assets/icon.png"
import iconConfirm from "../../assets/icon_confirm.png"
import iconRefute from "../../assets/icon_refute.png"


@connect(state => ({
  statements: state.Statements.data,
  displayed: state.Interface.sidebarCollapsed,
  video: state.Video.data,
  statement: getFocusedStatement(state)
}))
export default class CFButton extends React.Component {
  getIcon() {
    if (!this.props.statement)
      return iconNeutral

    const globalScore = this.props.statement.comments.reduce((score, comment) =>
      score + (comment.approve ? comment.score : -comment.score)
    , 0)
    if (globalScore > 0)
      return iconConfirm
    else if (globalScore < 0)
      return iconRefute
    else
      return iconNeutral
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