export const getConfig = state => state.Configuration

export const getConfigValue = (state, key) => getConfig(state).get(key)