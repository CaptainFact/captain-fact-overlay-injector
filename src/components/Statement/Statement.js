import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import classnames from 'classnames'

import TimeDisplay from '../Utils/TimeDisplay'
import styles from './Statement.module.css'

const { statementText, statementDisplay, focused, tag, tagContainer, timer } =
  styles

class Statement extends PureComponent {
  render() {
    const {
      isFocused,
      textPrefix,
      onTimeClick,
      statement: { text, speaker, time },
    } = this.props
    return (
      <div className={classnames(statementDisplay, { [focused]: isFocused })}>
        <div className={tagContainer}>
          <div className={tag}>
            {textPrefix || ''}
            <TimeDisplay
              className={timer}
              textBefore=""
              time={time}
              handleClick={onTimeClick}
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

export default withTranslation(['translations'])(Statement)
