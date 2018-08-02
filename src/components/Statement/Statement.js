import React, { PureComponent } from 'react'
import { translate } from 'react-i18next'
import classnames from 'classnames'

import TimeDisplay from '../Utils/TimeDisplay'
import { statementText, statementDisplay, focused, tag, tagContainer, timer } from './Statement.css'

@translate(['translations'])
export default class Statement extends PureComponent {
  render() {
    const { text, speaker, time } = this.props.statement
    return (
      <div className={classnames(statementDisplay, {[focused]: this.props.isFocused})}>
        <div className={tagContainer}>
          <div className={tag}>
            {this.props.textPrefix || ''}
            <TimeDisplay
              className={timer}
              textBefore=""
              time={time}
              handleClick={this.props.onTimeClick}
            />
            {speaker !== null && <strong>{speaker.fullName}</strong>}
          </div>
        </div>
        <p className={statementText}>
          <span>{text}</span>
        </p>
      </div>
    )
  }
}
