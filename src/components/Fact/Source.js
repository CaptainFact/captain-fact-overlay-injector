import React from 'react'
import upperCase from 'voca/upper_case'

import styles from './Source.module.css'
import DEFAULT_IMG_NEW_TAB from '../../assets/new_tab.png'

const getHostName = (url) =>
  upperCase(url.replace(/https?:\/\//, '').replace(/\/.*/g, ''))

const Source = ({
  source: { url, title, site_name },
  imgNewTab = DEFAULT_IMG_NEW_TAB,
}) => (
  <a
    href={url}
    target="_BLANK"
    rel="noopener noreferrer"
    className={styles.sourceLink}
  >
    <div className={styles.siteNameContainer}>
      <img src={imgNewTab} alt="" />
      &nbsp;
      <span className={styles.siteName}>
        {upperCase(site_name) || getHostName(url)}
      </span>
    </div>
    <span className={styles.articleTitle}>{title}</span>
  </a>
)

export default Source
