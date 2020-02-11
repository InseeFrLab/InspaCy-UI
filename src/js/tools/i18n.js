import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguagesFiles from "../../assets/languages";

i18n.use(initReactI18next).init({
  resources: LanguagesFiles,
  fallbackLng: "en",
  lng: process.env.REACT_APP_DEFAULT_LANGUAGE || "fr",
  debug: false,
  keySeparator: ".",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
