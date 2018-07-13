const browserLocale = () => {
  const defaultLanguage = 'en'

  if (typeof window === 'undefined') {
    return defaultLanguage
  }
  return (window.navigator.userLanguage || window.navigator.language || defaultLanguage)
    .split('-')[0].toLowerCase()
}

export default browserLocale
