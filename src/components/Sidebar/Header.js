import React from 'react'

import { FRONTEND_URL } from '../../constants'

import { header, closeBtn, title } from './Header.css'

import DEFAULT_IMG_NEW_TAB from '../../assets/new_tab.png'
import DEFAULT_IMG_CLOSE from '../../assets/close.svg'


export const Header = ({
  videoHashId,
  onCloseClick = null,
  imgNewTab = DEFAULT_IMG_NEW_TAB,
  imgClose = DEFAULT_IMG_CLOSE
}) => (
  <div className={header}>
    <a
      href={`${FRONTEND_URL}/videos/${videoHashId}`}
      target="_BLANK"
      title="Open discussion on CaptainFact"
      rel="noopener noreferrer"
    >
      <h1 className={title}>CaptainFact <img src={imgNewTab} alt=""/></h1>
    </a>
    {onCloseClick &&
    <button title="Close sidebar" className={closeBtn} onClick={onCloseClick}>
      <img src={imgClose} alt="Close"/>
    </button>
    }
  </div>
)


export default Header
