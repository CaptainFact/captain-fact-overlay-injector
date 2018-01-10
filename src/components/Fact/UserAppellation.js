import React from "react"
import { container } from './UserAppellation.css'
import { frontendURL } from '../../config'


const UserAppellation = ({user: {username, name}}) => {
  const prettyUsername = ` @${username}`
  return (
    <a href={`${frontendURL}/u/${username}`} className={container}>
      <strong>{ name || prettyUsername }</strong>
      {name &&
      <small>
         { prettyUsername }
      </small>
      }
    </a>
  )
}

export default UserAppellation