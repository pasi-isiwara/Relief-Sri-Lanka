import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../types';
export function LanguageSwitcher() {
  const {
    language,
    setLanguage
  } = useLanguage();
  const languages: {
    code: Language;
    label: string;
  }[] = [{
    code: 'en',
    label: 'EN'
  }, {
    code: 'si',
    label: 'සිං'
  }, {
    code: 'ta',
    label: 'த'
  }];
  return <div className="flex gap-1 bg-gray-800 rounded-lg p-1">
      {languages.map(lang => <button key={lang.code} onClick={() => setLanguage(lang.code)} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${language === lang.code ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}>
          {lang.label}
        </button>)}
    </div>;
}