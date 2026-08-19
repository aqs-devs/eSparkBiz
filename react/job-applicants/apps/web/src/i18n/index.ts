import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import common from './locales/en/common.json';
import basicInfo from './locales/en/applicants/basicInfo.json';
import auth from './locales/en/auth.json';
import users from './locales/en/users.json';

export const resources = {
    en: {
        common,
        basicInfo,
        auth,
        users,
    },
} as const;

i18n.use(initReactI18next).init({
    resources,

    lng: 'en',
    fallbackLng: 'en',

    defaultNS: 'common',

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;