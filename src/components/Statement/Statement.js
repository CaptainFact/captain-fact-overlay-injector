import React, { PureComponent } from 'react'
import classnames from 'classnames'

import TimeDisplay from '../Utils/TimeDisplay'
import { statementText, statementDisplay, focused, tag } from './Statement.css'


export default class Statement extends PureComponent {
  render() {
    const { text, speaker, time } = this.props.statement
    return (
      <div className={classnames(statementDisplay, {[focused]: this.props.isFocused})}>
        {this.props.textPrefix || ''}
        <div className={tag}>
          {speaker ? <strong>{speaker.full_name} at </strong> : 'At ' }
          <TimeDisplay textBefore="" time={time} handleClick={this.props.onTimeClick}/>
        </div>
        <p className={statementText}>“ {text}</p>
      </div>
    );
  }
}
