import { State } from 'jumpstate'
import { Record } from 'immutable'


const INITIAL_STATE = new Record({
  position: null,
  forcedPosition: null
})

export const PlaybackState = State('Playback', {
  initial: INITIAL_STATE(),
  setPosition(state, position) {
    return state.set('position', Math.trunc(position))
  },
  forcePosition(state, position) {
    return state.merge({position, forcedPosition: position + 1})
  },
  resetForcedPosition(state) {
    return state.set('forcedPosition', null)
  },
  resetPosition(state) {
    return state.merge({position: null, forcedPosition: null})
  },
  reset: () => INITIAL_STATE()
})
