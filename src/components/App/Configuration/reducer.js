import { State } from "jumpstate"
import DEFAULT_CONFIG from './default'


export const ConfigurationState = State('Configuration', {
  initial: DEFAULT_CONFIG,
  load: (state, config) => state.mergeDeep(config),
  reset: () => DEFAULT_CONFIG
})
