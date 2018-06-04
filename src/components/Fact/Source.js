import React from 'react'
import upperCase from 'voca/upper_case'

import { siteNameContainer, siteName, articleTitle, sourceLink } from './Source.css'
import DEFAULT_IMG_NEW_TAB from '../../assets/new_tab.png'


const getHostName = url =>
  upperCase(url.replace(/https?:\/\//, '').replace(/\/.*/g, ''))

const Source = ({source: {url, title, site_name}, imgNewTab = DEFAULT_IMG_NEW_TAB}) => (
  <a href={url} target="_BLANK" className={sourceLink}>
    <div className={siteNameContainer}>
      <img src={imgNewTab}/>&nbsp;
      <span className={siteName}>
        { upperCase(site_name) || getHostName(url) }
      </span>
    </div>
    <span className={articleTitle}>{title}</span>
  </a>
)

export default Source
