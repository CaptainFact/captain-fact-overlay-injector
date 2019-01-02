import 'isomorphic-fetch'
import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { translate } from 'react-i18next'

import { cfbutton, pulse, hidden } from './CFButton.css'
import { InterfaceState } from '../App/interface_reducer'
import { getFocusedStatement } from '../Statement/selectors'
import { getGraphics } from '../App/Configuration/selectors'

import iconNeutral from '../../assets/logo-borderless.svg'
import iconConfirm from '../../assets/confirm-borderless.svg'
import iconRefute from '../../assets/refute-borderless.svg'

export class CFButton extends React.PureComponent {
  render() {
    if (!this.props.hasVideo || !this.props.hasStatements) return null

    const globalScore = this.calculateGlobalScore()
    const { t } = this.props
    return (
      <img
        src={this.getIcon(globalScore)}
        className={this.getClassNames()}
        title={t('CaptainFact')}
        onClick={InterfaceState.openSidebar}
        alt={t('acronymCF')}
      />
    )
  }

  getClassNames() {
    return classnames(cfbutton, {
      [pulse]: !!this.props.statement,
      [hidden]: !this.props.displayed
    })
  }

  getIcon(globalScore) {
    if (globalScore > 0) return (this.props.icons && this.props.icons.confirm) || iconConfirm
    if (globalScore < 0) return (this.props.icons && this.props.icons.refute) || iconRefute
    return (this.props.icons && this.props.icons.neutral) || iconNeutral
  }

  calculateGlobalScore() {
    // TODO This should be in Redux
    if (!this.props.statement) return 0

    return this.props.statement.comments.reduce((score, comment) => {
      if (comment.approve === true) return score + Math.max(comment.score, 0)
      if (comment.approve === false) return score - Math.max(comment.score, 0)
      return score
    }, 0)
  }
}

export default connect(state => ({
  hasStatements: state.Statements.data.size !== 0,
  hasVideo: !!state.Video.data,
  displayed: state.Interface.sidebarCollapsed,
  statement: getFocusedStatement(state),
  icons: getGraphics(state).logo,
  baseSize: state.Configuration.app.baseSize
}))(translate(['translations'])(CFButton))
