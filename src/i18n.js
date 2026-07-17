import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importaremos los diccionarios (los crearemos en el paso 3)
import translationEN from './locals/en.json';
import translationES from './locals/es.json';

const resources = {
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  }
};

i18n
  .use(LanguageDetector) // Detecta el idioma del navegador automáticamente
  .use(initReactI18next) // Conecta i18next con React
  .init({
    resources,
    fallbackLng: 'en', // Si el idioma del usuario no es ni es/en, usa español por defecto
    interpolation: {
      escapeValue: false // React ya nos protege de ataques XSS
    }
  });

export default i18n;