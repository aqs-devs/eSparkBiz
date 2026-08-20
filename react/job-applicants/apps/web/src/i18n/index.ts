import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import common from './locales/en/common.json';
import basicInfo from './locales/en/applicants/basicInfo.json';
import auth from './locales/en/auth.json';
import users from './locales/en/users.json';

import commonAr from './locales/ar/common.json';
import basicInfoAr from './locales/ar/applicants/basicInfo.json';
import authAr from './locales/ar/auth.json';
import usersAr from './locales/ar/users.json';

export const resources = {
  en: {
    common,
    basicInfo,
    auth,
    users,
  },
  ar: {
    common: commonAr,
    basicInfo: basicInfoAr,
    auth: authAr,
    users: usersAr,
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: ['en', 'ar'],
    fallbackLng: 'en',
    defaultNS: 'common',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'jobApplicantsLanguage',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;