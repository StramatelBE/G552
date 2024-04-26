import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./en.json";
import translationFR from "./fr.json";
import translationPL from "./pl.json";
import translationDE from "./de.json";
import translationES from "./es.json";
import translationNL from "./nl.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "fr", // Langue par défaut si la détection échoue
    resources: {
      en: {
        translation: translationEN,
      },
      fr: {
        translation: translationFR,
      },
      pl: {
        translation: translationPL,
      },
      de: {
        translation: translationDE,
      },
      es: {
        translation: translationES,
      },
      nl: {
        translation: translationNL,
      },
    },
    detection: {
      order: ["localStorage", "navigator"], // vérifie d'abord localStorage, puis la langue du navigateur
      caches: ["localStorage"], // stocke le choix de langue de l'utilisateur dans localStorage
    },
    interpolation: {
      escapeValue: false, // React échappe déjà les valeurs
    },
  });

export default i18n;
