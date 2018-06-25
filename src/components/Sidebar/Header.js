import React from 'react'
import { translate } from 'react-i18next'

import { FRONTEND_URL } from '../../constants'

import { header, closeBtn, title } from './Header.css'

import DEFAULT_IMG_NEW_TAB from '../../assets/new_tab.png'
import DEFAULT_IMG_CLOSE from '../../assets/close.svg'

export const Header = ({
  videoHashId,
  onCloseClick = null,
  imgNewTab = DEFAULT_IMG_NEW_TAB,
  imgClose = DEFAULT_IMG_CLOSE,
  t
}) => (
  <div className={header}>
    <a
      href={`${FRONTEND_URL}/videos/${videoHashId}`}
      target="_BLANK"
      title={ t('Open discussion on CaptainFact') }
      rel="noopener noreferrer"
    >
      <h1 className={title}>CaptainFact <img src={imgNewTab} alt=""/></h1>
    </a>
    {onCloseClick &&
    <button title={ t('Close sidebar') } className={closeBtn} onClick={onCloseClick}>
      <img src={imgClose} alt={t('Close')}/>
    </button>
    }
  </div>
)


export default Header
