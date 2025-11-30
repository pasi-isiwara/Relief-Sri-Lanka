import { useLanguage } from '../contexts/LanguageContext';
import './LanguageSwitcher.css';
export function LanguageSwitcher() {
  const {
    language,
    setLanguage
  } = useLanguage();
  const languages = [{
    code: 'en',
    label: 'EN'
  }, {
    code: 'si',
    label: 'සිං'
  }, {
    code: 'ta',
    label: 'த'
  }];
  return <div className="language-switcher">
      {languages.map(lang => <button key={lang.code} onClick={() => setLanguage(lang.code)} className={`language-btn ${language === lang.code ? 'active' : ''}`}>
          {lang.label}
        </button>)}
    </div>;
}