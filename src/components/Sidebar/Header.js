import React from 'react'
import { translate } from 'react-i18next'

import { FRONTEND_URL } from '../../constants'

import { header, closeBtn, title } from './Header.css'

import DEFAULT_IMG_NEW_TAB from '../../assets/new_tab.png'
import DEFAULT_IMG_CLOSE from '../../assets/close.svg'
import Button from '../Utils/Button'

export const optionsToQueryString = options => {
  if (!options || Object.keys(options).length === 0) return ''
  return `?${Object.entries(options)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&')}`
}

class Header extends React.PureComponent {
  render() {
    const { t, onCloseClick, videoHashId, urlParams } = this.props
    return (
      <div className={header}>
        <a
          href={`${FRONTEND_URL}/videos/${videoHashId}${optionsToQueryString(
            urlParams
          )}`}
          target="_BLANK"
          title={t('OpenDiscussion')}
          rel="noopener noreferrer"
        >
          <h1 className={title}>
            CaptainFact
            {' '}
            <img src={this.props.imgNewTab} alt="" />
          </h1>
        </a>
        {onCloseClick && (
          <Button
            title={t('closeSidebar')}
            className={closeBtn}
            onClick={onCloseClick}
          >
            <img src={this.props.imgClose} alt="X" />
          </Button>
        )}
      </div>
    )
  }
}

Header.defaultProps = {
  videoHashId: null,
  onCloseClick: null,
  imgNewTab: DEFAULT_IMG_NEW_TAB,
  imgClose: DEFAULT_IMG_CLOSE,
  urlParams: {}
}

export default translate(['translations'])(Header)
