import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr_translation from "../../assets/languages/fr.json";
import en_translation from "../../assets/languages/en.json";

i18n.use(initReactI18next).init({
  resources: {
    fr: {
      translation: fr_translation
    },
    en: {
      translation: en_translation
    }
  },
  fallbackLng: "en",
  lng: "fr",
  debug: true,
  keySeparator: ".",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
