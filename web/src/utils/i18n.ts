import { TRANSLATIONS } from '../locales/translations';
import { Ledger } from './storage';
export const t = (key) => {
  const lang = Ledger.get('LANG') || 'en';
  return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key;
};
export const setLanguage = (lang) => { Ledger.set('LANG', lang); window.location.reload(); };