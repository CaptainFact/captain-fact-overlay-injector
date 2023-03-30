import React from 'react'

import styles from './UserAppellation.module.css'
import { FRONTEND_URL } from '../../constants'

export const UserAppellation = ({ user: { username, name } }) => {
  return (
    <a
      href={`${FRONTEND_URL}/u/${username}`}
      className={styles.container}
      title={name}
    >
      <strong>{`@${username}`}</strong>
    </a>
  )
}

export default UserAppellation
