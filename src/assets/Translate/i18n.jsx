import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './english.json';
import arTranslation from './arbic.json';

i18n
        .use(initReactI18next)
        .init({
                resources: {
                        en: { translation: enTranslation },
                        ar: { translation: arTranslation },
                },
                lng: 'en', // Set the default language
                fallbackLng: 'en', // Fallback language if translation is not found
                interpolation: {
                        escapeValue: false, // React already escapes values
                },
        });

export default i18n;
