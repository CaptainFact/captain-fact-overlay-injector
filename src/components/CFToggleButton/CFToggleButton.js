import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import {container, icon, title, radioBtn, active} from './CFToggleButton.css'
import iconImg from '../../assets/icon.png'


export class CFToggleButton extends React.PureComponent {
  render() {
    return (
      <div className={container}>
        <img className={icon} src={iconImg}/>
        <a href="https://captainfact.io" className={title}>CaptainFact</a>
        <div className={classNames(radioBtn, {[active]: this.props.isEnabled})} onClick={() => this.setEnabled(true)}>
          <span>ON</span>
        </div>
        <div className={classNames(radioBtn, {[active]: !this.props.isEnabled})} onClick={() => this.setEnabled(false)}>
          <span>OFF</span>
        </div>
      </div>
    )
  }

  setEnabled(enabled) {
    if (!this.props.isEnabled && enabled)
      this.props.enable()
    else if (this.props.isEnabled && !enabled)
      this.props.disable()
  }
}

export default connect(state => ({isEnabled: state.Interface.isEnabled}))(CFToggleButton)