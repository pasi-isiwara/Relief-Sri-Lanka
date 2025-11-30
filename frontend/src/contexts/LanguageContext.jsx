import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';
import './LanguageContext.css';
const LanguageContext = createContext(undefined);
export function LanguageProvider({
  children
}) {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('relief-language');
    return saved || 'en';
  });
  const setLanguage = lang => {
    setLanguageState(lang);
    localStorage.setItem('relief-language', lang);
  };
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  const value = {
    language,
    setLanguage,
    t: translations[language]
  };
  return <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>;
}
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}