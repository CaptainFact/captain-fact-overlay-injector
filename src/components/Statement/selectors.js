import { createSelector } from 'reselect'
import { STATEMENT_FOCUS_TIME } from '../../constants'


// TODO Make this cached
export const getFocusedStatement = createSelector(
  state => state.Statements.data,
  state => state.Playback.position,
  (statements, position) => {
    if (position === null)
      return null
    const statement = statements.findLast(st =>
      position >= st.time && position <= st.time + STATEMENT_FOCUS_TIME
    )
    return statement || null
  }
)
