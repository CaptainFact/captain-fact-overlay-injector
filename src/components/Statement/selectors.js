import { createSelector } from 'reselect'
import { statementFocusTime } from "../../config"


// TODO Make this cached
export const getFocusedStatement = createSelector(
  state => state.Statements.data,
  state => state.Playback.position,
  (statements, position) => {
    if (position === null)
      return null
    const statement = statements.findLast(st =>
      position >= st.time && position <= st.time + statementFocusTime
    )
    return statement || null
  }
)