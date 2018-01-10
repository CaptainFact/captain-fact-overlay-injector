import React from 'react'
import classNames from 'classnames'

import {activatedLocalStorageKey} from '../../config'
import {container, icon, title, radioBtn, active} from './CFToggleButton.css'
import iconImg from '../../assets/icon.png'


export default class CFToggleButton extends React.PureComponent {
  constructor(props, context) {
    super(props, context)
    this.state = {isActive: loadIsActive()}
  }

  render() {
    return (
      <div className={container}>
        <img className={icon} src={iconImg}/>
        <a href="https://captainfact.io" className={title}>CaptainFact</a>
        <div className={classNames(radioBtn, {[active]: this.state.isActive})} onClick={() => this.setActive(true)}>
          <span>ON</span>
        </div>
        <div className={classNames(radioBtn, {[active]: !this.state.isActive})} onClick={() => this.setActive(false)}>
          <span>OFF</span>
        </div>
      </div>
    )
  }

  setActive(isActive) {
    this.setState({isActive})
    saveIsActive(isActive)
  }
}

const loadIsActive = () =>
  localStorage.getItem(activatedLocalStorageKey) !== 'false'

const saveIsActive = (isActive) =>
  localStorage.setItem(activatedLocalStorageKey, isActive ? 'true' : 'false')