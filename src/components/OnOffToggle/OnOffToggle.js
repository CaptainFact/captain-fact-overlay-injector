import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import styles from './OnOffToggle.module.css'
import DEFAULT_ICON from '../../assets/logo-borderless.svg'

export class OnOffToggle extends React.PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <img className={styles.icon} src={this.props.icon || DEFAULT_ICON} />
        <a
          href="https://captainfact.io"
          target="__BLANK"
          className={styles.title}
        >
          CaptainFact
        </a>
        <div
          className={classNames(styles.radioBtn, {
            [styles.active]: this.props.isEnabled,
          })}
          onClick={() => this.setEnabled(true)}
        >
          <span>ON</span>
        </div>
        <div
          className={classNames(styles.radioBtn, {
            [styles.active]: !this.props.isEnabled,
          })}
          onClick={() => this.setEnabled(false)}
        >
          <span>OFF</span>
        </div>
      </div>
    )
  }

  setEnabled(enabled) {
    if (!this.props.isEnabled && enabled) this.props.enable()
    else if (this.props.isEnabled && !enabled) this.props.disable()
  }
}

export default connect((state) => ({ isEnabled: state.Interface.isEnabled }))(
  OnOffToggle
)
