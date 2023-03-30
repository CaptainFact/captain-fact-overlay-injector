import i18n from 'i18next'
import store from './components/App/store'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  lng: store.getState().Configuration.app.language,
  resources: {
    en: {
      translations: {
        at: 'at',
        At: 'At',
        Previous: 'Previous',
        Next: 'Next',
        ShowStatements: 'Show Statements',
        ShowFacts: 'Show Facts',
        Close: 'Close',
        closeSidebar: 'Close sidebar',
        pts: 'pts',
        OpenDiscussion: 'Open discussion on CaptainFact',
        acronymCF: 'CF',
        CaptainFact: 'CaptainFact',
        anonymous: 'Anonymous user:',
      },
    },
    fr: {
      translations: {
        at: 'à',
        At: 'À',
        Previous: 'Précédent',
        Next: 'Suivant',
        ShowStatements: 'Voir les citations',
        ShowFacts: 'Voir les sources',
        Close: 'Fermer',
        closeSidebar: 'Fermer la barre latérale',
        pts: 'pts',
        OpenDiscussion: 'Ouvrir la discussion sur CaptainFact',
        acronymCF: 'CF',
        CaptainFact: 'CaptainFact',
        anonymous: 'Utilisateur anonyme\u00A0:',
      },
    },
  },
  fallbackLng: 'en',

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false, // we use content as keys

  interpolation: {
    formatSeparator: ',',
  },

  react: {
    wait: true,
  },
})

export default i18n
