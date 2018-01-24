import React, { PureComponent } from 'react'

import { FRONTEND_URL } from '../../constants'

import { header, closeBtn, title } from './Header.css'
import DEFAULT_IMG_NEW_TAB from "../../assets/new_tab.png"


export const Header = ({videoHashId, onCloseClick=null, imgNewTab=DEFAULT_IMG_NEW_TAB}) =>
  <div className={header}>
    <a href={`${FRONTEND_URL}/videos/${videoHashId}`} target="_BLANK" title="Open discussion on CaptainFact">
      <h1 className={title}>CaptainFact <img src={imgNewTab}/></h1>
    </a>
    {onCloseClick &&
    <a title="Close sidebar" className={closeBtn} onClick={onCloseClick}>
      ❌
    </a>
    }
  </div>


export default Header
