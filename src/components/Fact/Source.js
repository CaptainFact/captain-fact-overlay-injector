import React from "react"
import upperCase from "voca/upper_case"
import { siteName, articleTitle, sourceLink } from './Source.css'
import imgNewTab from "../../assets/new_tab.png"


const getHostName = url =>
  upperCase(url.replace(/https?:\/\//, "").replace(/\/.*/g, ""))

const Source = ({source: {url, title, site_name}}) => (
  <a href={url} target="_BLANK" className={sourceLink}>
    <div>
      <img src={imgNewTab} height="10"/>&nbsp;
      <span className={siteName}>
        { upperCase(site_name) || getHostName(url) }
      </span>
    </div>
    <span className={articleTitle}>{title}</span>
  </a>
)

export default Source