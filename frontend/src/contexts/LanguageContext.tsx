import React, { useEffect, useState, createContext, useContext } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (typeof translations)['en'];
}
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
export function LanguageProvider({
  children
}: {
  children: ReactNode;
}) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('relief-language');
    return saved as Language || 'en';
  });
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('relief-language', lang);
  };
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  const value: LanguageContextType = {
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