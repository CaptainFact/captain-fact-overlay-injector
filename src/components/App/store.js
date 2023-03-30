import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { CreateJumpstateMiddleware } from 'jumpstate'

import { StatementsState } from '../Statement/reducer'
import { VideoState } from '../Video/reducer'
import { PlaybackState } from './playback_reducer'
import { InterfaceState } from './interface_reducer'
import { ConfigurationState } from './Configuration/reducer'

// Declare reducers
const reducers = combineReducers({
  Video: VideoState,
  Statements: StatementsState,
  Interface: InterfaceState,
  Playback: PlaybackState,
  Configuration: ConfigurationState,
})

// Declare middlewares
const middlewares = [CreateJumpstateMiddleware()]

// Build store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
)
store.reset = () => {
  VideoState.reset()
  StatementsState.reset()
  PlaybackState.reset()
  InterfaceState.reset()
}

export default store
