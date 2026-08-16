import * as React from 'react';
import type { ReactNode } from 'react';

export type LanguageId = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja' | 'ko' | 'pt' | 'it' | 'ru';

interface LanguageContextType {
  language: LanguageId;
  setLanguage: (lang: LanguageId) => void;
}

const LanguageContext = React.createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = React.useState<LanguageId>('en');

  const setLanguage = React.useCallback((lang: LanguageId) => {
    setLanguageState(lang);
    // Store in localStorage for persistence
    try {
      localStorage.setItem('preferred-language', lang);
    } catch {
      // localStorage not available
    }
  }, []);

  // Load from localStorage on mount
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('preferred-language') as LanguageId | null;
      if (saved) {
        setLanguageState(saved);
      }
    } catch {
      // localStorage not available
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}