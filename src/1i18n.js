import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n.use(LanguageDetector).init({
  resources: {
    en: {
      translations: {
        "at": "at",
        "At ": "At ",
        "Previous": "Previous",
        "Next": "Next",
        "Show Statements": "Show Statements",
        "Show Facts": "Show Facts",
        "Close": "Close",
        "Close sidebar": "Close sidebar",
        "pts": "pts",
        "Open discussion on CaptainFact": "Open discussion on CaptainFact",
        "CF": "CF",
        "CaptainFact": "CaptainFact"
      }
    },
    fr: {
      translations: {
        "at": "à",
        "At ": "À ",
        "Previous": "Précédent",
        "Next": "Suivant",
        "Show Statements": " Voir les citations",
        "Show Facts": "Voir les sources",
        "Close": "Fermer",
        "Close sidebar": "Fermer la barre latérale",
        "pts": "pts",
        "Open discussion on CaptainFact": "Ouvrir les discussions sur CaptainFact",
        "CF": "CF",
        "CaptainFact": "CaptainFact"
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
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    formatSeparator: ","
  },

  react: {
    wait: true
  }
});

export default i18n
