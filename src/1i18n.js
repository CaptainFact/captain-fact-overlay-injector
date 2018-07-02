import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n.use(LanguageDetector).init({
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
        CaptainFact: 'CaptainFact'
      }
    },
    fr: {
      translations: {
        at: 'à',
        At: 'À',
        Previous: 'Précédent',
        Next: 'Suivant',
        ShowStatements: 'Voir les Citations',
        ShowFacts: 'Voir les sources',
        Close: 'Fermer',
        closeSidebar: 'Fermer la barre latérale',
        pts: 'pts',
        OpenDiscussion: 'Ouvrir la discussion sur CaptainFact',
        acronymCF: 'CF',
        CaptainFact: 'CaptainFact'
      }
    }
  },
  fallbackLng: {
    'en-US': ['en'],
    'fr-FR': ['fr'],
    default: ['en'],
  },
  debug: true,

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false, // we use content as keys

  interpolation: {
    formatSeparator: ','
  },

  react: {
    wait: true
  }
})

export default i18n
