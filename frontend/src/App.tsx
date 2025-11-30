import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { RequestForm } from './components/RequestForm';
import { RequestFeed } from './components/RequestFeed';
import { useRequests } from './hooks/useRequests';
import { HeartHandshakeIcon } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'request' | 'view'>('request');
  const handleSubmit = async (data: any) => {
    return await addRequest({
      ...data,
      language
    });
  };
  return <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HeartHandshakeIcon className="w-8 h-8 text-emerald-500" />
            <h1 className="text-xl font-bold">{t.appTitle}</h1>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-1">
            <button onClick={() => setActiveTab('request')} className={`flex-1 py-4 font-medium transition-colors relative ${activeTab === 'request' ? 'text-emerald-400' : 'text-gray-400 hover:text-white'}`}>
              {t.requestHelp}
              {activeTab === 'request' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />}
            </button>
            <button onClick={() => setActiveTab('view')} className={`flex-1 py-4 font-medium transition-colors relative ${activeTab === 'view' ? 'text-emerald-400' : 'text-gray-400 hover:text-white'}`}>
              {t.viewRequests}
              {activeTab === 'view' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === 'request' ? <RequestForm onSubmit={handleSubmit} /> : <RequestFeed requests={requests} loading={loading} />}
      </main>

      {/* Emergency Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-400">
          <p className="mb-2">Emergency Hotline: 117 | 119</p>
          <p>Disaster Management Centre: 011-2-136136</p>
        </div>
      </footer>
    </div>;
}
export function App() {
  return <LanguageProvider>
      <AppContent />
    </LanguageProvider>;
}