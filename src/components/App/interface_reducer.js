import { Record } from 'immutable'
import { State } from 'jumpstate'


const ACTIVATED_LOCALSTORAGE_KEY = 'captainfact_isActive'

const INITIAL_STATE = new Record({
  isEnabled: loadIsActive(),
  sidebarCollapsed: true
})

export const InterfaceState = State('Interface', {
  initial: INITIAL_STATE(),
  enable: state => stateIsEnabledChange(state, true),
  disable: state => stateIsEnabledChange(state, false),
  openSidebar: state => state.set('sidebarCollapsed', false),
  closeSidebar: state => state.set('sidebarCollapsed', true),
  reset: (state) => INITIAL_STATE().set('isEnabled', state.isEnabled)
})

function stateIsEnabledChange(state, isEnabled) {
  saveIsEnabled(isEnabled)
  return state.set('isEnabled', isEnabled)
}

function loadIsActive() {
  return localStorage.getItem(ACTIVATED_LOCALSTORAGE_KEY) !== 'false'
}

function saveIsEnabled(isEnabled) {
  return localStorage.setItem(ACTIVATED_LOCALSTORAGE_KEY, isEnabled ? 'true' : 'false')
}