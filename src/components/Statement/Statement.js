import React, { PureComponent } from 'react'
import { translate } from 'react-i18next'
import classnames from 'classnames'

import TimeDisplay from '../Utils/TimeDisplay'
import { statementText, statementDisplay, focused, tag } from './Statement.css'

@translate(['translations'])
export default class Statement extends PureComponent {
  render() {
    const { text, speaker, time } = this.props.statement
    return (
      <div className={classnames(statementDisplay, {[focused]: this.props.isFocused})}>
        <div className={tag}>
          {this.props.textPrefix || ''}
          {speaker ? <strong>{speaker.fullName} {this.props.t('at')} </strong> : `${this.props.t('At')} ` }
          <TimeDisplay textBefore="" time={time} handleClick={this.props.onTimeClick}/>
        </div>
        <p className={statementText}>{text}</p>
      </div>
    )
  }
}
