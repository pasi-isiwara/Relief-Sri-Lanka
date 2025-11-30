import { useState } from 'react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { RequestForm } from './components/RequestForm';
import { RequestFeed } from './components/RequestFeed';
import { DonationPage } from './components/DonationPage';
import { useRequests } from './hooks/useRequests';
import { HeartHandshakeIcon } from 'lucide-react';
import './App.css';
function AppContent() {
  const {
    t,
    language
  } = useLanguage();
  const {
    requests,
    loading,
    addRequest
  } = useRequests();
  const [activeTab, setActiveTab] = useState('request');
  const handleSubmit = async data => {
    return await addRequest({
      ...data,
      language
    });
  };
  return <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <HeartHandshakeIcon className="app-icon" />
            <h1 className="app-name">{t.appTitle}</h1>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="app-tabs">
        <div className="tabs-content">
          <div className="tabs-buttons">
            <button onClick={() => setActiveTab('request')} className={`tab-button ${activeTab === 'request' ? 'active' : ''}`}>
              {t.requestHelp}
              {activeTab === 'request' && <div className="tab-indicator" />}
            </button>
            <button onClick={() => setActiveTab('view')} className={`tab-button ${activeTab === 'view' ? 'active' : ''}`}>
              {t.viewRequests}
              {activeTab === 'view' && <div className="tab-indicator" />}
            </button>
            <button onClick={() => setActiveTab('donations')} className={`tab-button ${activeTab === 'donations' ? 'active' : ''}`}>
              {t.donations}
              {activeTab === 'donations' && <div className="tab-indicator" />}
            </button>
          </div>
        </div>
      </div>

      <main className="app-main">
        {activeTab === 'request' ? (
          <RequestForm onSubmit={handleSubmit} />
        ) : activeTab === 'view' ? (
          <RequestFeed requests={requests} loading={loading} />
        ) : (
          <DonationPage />
        )}
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p className="footer-text">Emergency Hotline: 117 | 119</p>
          <p className="footer-text">Disaster Management Centre: 011-2-136136</p>
        </div>
      </footer>
    </div>;
}
export function App() {
  return <LanguageProvider>
      <AppContent />
    </LanguageProvider>;
}