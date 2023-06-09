import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import LANG_EN from "./en/translation.json";
import LANG_JA from "./ja/translation.json";

const resources = {
  en: {
    translation: LANG_EN,
  },
  ja: {
    translation: LANG_JA,
  },
};

void i18next.use(LanguageDetector).use(initReactI18next).init({
  resources,
  fallbackLng: "en",
});

export default i18next;
