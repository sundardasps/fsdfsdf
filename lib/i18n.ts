import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    resources: {
      en: {
        common: {
          welcome: "Welcome",
          login: "Login",
          logout: "Logout",
        },
        home: {
          title: "Welcome to Our App",
          description: "This is a multi-language application"
        }
      },
      es: {
        common: {
          welcome: "Bienvenido",
          login: "Iniciar sesión",
          logout: "Cerrar sesión",
        },
        home: {
          title: "Bienvenido a Nuestra App",
          description: "Esta es una aplicación multiidioma"
        }
      }
    }
  });

export default i18n;