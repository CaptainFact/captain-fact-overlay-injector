import React from 'react'
import { translate } from 'react-i18next'

import { FRONTEND_URL } from '../../constants'

import { header, closeBtn, title } from './Header.css'

import DEFAULT_IMG_NEW_TAB from '../../assets/new_tab.png'
import DEFAULT_IMG_CLOSE from '../../assets/close.svg'

@translate(['translations'])
class Header extends React.PureComponent {
  render() {
    const { t, onCloseClick} = this.props
    return (
      <div className={header}>
        <a
          href={`${FRONTEND_URL}/videos/${this.props.videoHashId}`}
          target="_BLANK"
          title={t('OpenDiscussion')}
          rel="noopener noreferrer"
        >
          <h1 className={title}>CaptainFact <img src={this.props.imgNewTab} alt=""/></h1>
        </a>
        {onCloseClick &&
          <button title={t('closeSidebar')} className={closeBtn} onClick={onCloseClick}>
            <img src={this.props.imgClose} alt={t('Close')}/>
          </button>
        }
      </div>
    )
  }
}

Header.defaultProps = {
  videoHashId: null,
  onCloseClick: null,
  imgNewTab: DEFAULT_IMG_NEW_TAB,
  imgClose: DEFAULT_IMG_CLOSE
}

export default Header
