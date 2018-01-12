import { State } from "jumpstate"

import Configuration from "./record"


export const ConfigurationState = State('Configuration', {
  initial: Configuration(),
  load: (state, config) => Configuration(config),
  reset: () => Configuration()
})
