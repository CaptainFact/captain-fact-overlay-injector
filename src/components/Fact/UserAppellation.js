import React from "react"

import { container } from './UserAppellation.css'
import { FRONTEND_URL } from '../../constants'


// TODO Show only username, show full name in title

const UserAppellation = ({user: {username, name}}) => {
  const prettyUsername = ` @${username}`
  return (
    <a href={`${FRONTEND_URL}/u/${username}`} className={container}>
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