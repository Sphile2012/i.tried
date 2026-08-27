import { useState, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export type ProgrammingLanguage = 'python' | 'cpp' | 'javascript' | 'typescript' | 'java' | 'csharp';

interface Language {
  id: ProgrammingLanguage;
  name: string;
  icon: string;
  color: string;
}

const languages: Language[] = [
  { id: 'python', name: 'Python', icon: 'PY', color: '#3776ab' },
  { id: 'cpp', name: 'C++', icon: 'C++', color: '#00599c' },
  { id: 'javascript', name: 'JavaScript', icon: 'JS', color: '#f7df1e' },
  { id: 'typescript', name: 'TypeScript', icon: 'TS', color: '#3178c6' },
  { id: 'java', name: 'Java', icon: 'JV', color: '#f89820' },
  { id: 'csharp', name: 'C#', icon: 'C#', color: '#68217a' },
];

const STORAGE_KEY = 'infinity-code-language-preference';

interface LanguageSelectorProps {
  onLanguageChange?: (language: ProgrammingLanguage) => void;
  className?: string;
}

export default function LanguageSelector({ onLanguageChange, className = '' }: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>('python');
  const [isOpen, setIsOpen] = useState(false);

  // Load saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && languages.some(lang => lang.id === saved)) {
      setSelectedLanguage(saved as ProgrammingLanguage);
    }
  }, []);

  // Notify parent component when language changes
  useEffect(() => {
    if (onLanguageChange) {
      onLanguageChange(selectedLanguage);
    }
  }, [selectedLanguage, onLanguageChange]);

  const handleSelect = (languageId: ProgrammingLanguage) => {
    setSelectedLanguage(languageId);
    localStorage.setItem(STORAGE_KEY, languageId);
    setIsOpen(false);
  };

  const selected = languages.find(lang => lang.id === selectedLanguage) || languages[0];

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
      >
        <div
          className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold text-white"
          style={{ backgroundColor: selected.color }}
        >
          {selected.icon}
        </div>
        <span className="text-sm font-medium text-slate-200">{selected.name}</span>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute top-full mt-2 left-0 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Select Language
              </div>
              {languages.map((language) => (
                <button
                  key={language.id}
                  type="button"
                  onClick={() => handleSelect(language.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                    selectedLanguage === language.id
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: language.color }}
                  >
                    {language.icon}
                  </div>
                  <span className="text-sm font-medium flex-1">{language.name}</span>
                  {selectedLanguage === language.id && (
                    <Check className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="border-t border-slate-700 p-2 bg-slate-800/30">
              <div className="px-3 py-2 text-xs text-slate-400">
                Your language preference is saved locally
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Hook to use language preference in components
export function useLanguagePreference() {
  const [language, setLanguage] = useState<ProgrammingLanguage>('python');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && languages.some(lang => lang.id === saved)) {
      setLanguage(saved as ProgrammingLanguage);
    }
  }, []);

  const updateLanguage = (newLanguage: ProgrammingLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem(STORAGE_KEY, newLanguage);
  };

  return { language, updateLanguage };
}

// Helper to get language metadata
export function getLanguageMetadata(languageId: ProgrammingLanguage) {
  return languages.find(lang => lang.id === languageId) || languages[0];
}

// Export types and constants
export { languages };
export type { Language };
