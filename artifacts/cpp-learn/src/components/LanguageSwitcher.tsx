/**
 * Language Switcher Component
 * Responsive dropdown for switching between 6 languages
 */

import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { LANGUAGES, LANGUAGE_ORDER, type LanguageId } from '@/data/languages';

interface LanguageSwitcherProps {
  value: LanguageId;
  onChange: (languageId: LanguageId) => void;
  className?: string;
  showLabel?: boolean;
}

export default function LanguageSwitcher({ 
  value, 
  onChange, 
  className = '',
  showLabel = false 
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLang = LANGUAGES[value];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (langId: LanguageId) => {
    onChange(langId);
    setIsOpen(false);
    // Save to localStorage
    localStorage.setItem('currentLanguage', langId);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors w-full sm:w-auto min-h-[44px] touch-target"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Language Badge */}
        <div 
          className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded text-xs sm:text-sm font-bold text-white"
          style={{ backgroundColor: currentLang.color }}
        >
          {currentLang.icon}
        </div>
        
        {/* Language Name */}
        <span className="font-semibold text-white text-sm sm:text-base">
          {currentLang.displayName}
        </span>
        
        {/* Use Case (hidden on mobile) */}
        {showLabel && (
          <span className="hidden md:inline text-xs text-slate-400">
            {currentLang.useCase}
          </span>
        )}
        
        {/* Dropdown Icon */}
        <ChevronDown 
          className={`h-4 w-4 text-slate-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <div 
            className="fixed inset-0 z-40 sm:hidden" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown content */}
          <div className="absolute top-full left-0 right-0 sm:right-auto mt-2 w-full sm:w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 max-h-[70vh] overflow-y-auto">
            {LANGUAGE_ORDER.map((langId) => {
              const lang = LANGUAGES[langId];
              const isActive = langId === value;
              
              return (
                <button
                  key={langId}
                  onClick={() => handleSelect(langId)}
                  className={`w-full flex items-center gap-3 px-4 py-3 sm:py-3.5 text-left transition-colors min-h-[56px] touch-target ${
                    isActive
                      ? 'bg-blue-500/20 text-white border-l-4 border-blue-500'
                      : 'hover:bg-slate-800 text-slate-300 border-l-4 border-transparent'
                  }`}
                >
                  {/* Language Badge */}
                  <div 
                    className="flex items-center justify-center w-10 h-10 rounded-lg text-sm font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: lang.color }}
                  >
                    {lang.icon}
                  </div>
                  
                  {/* Language Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm sm:text-base">
                        {lang.displayName}
                      </span>
                      <span 
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          lang.difficulty === 'easy' 
                            ? 'bg-green-500/20 text-green-400'
                            : lang.difficulty === 'medium'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {lang.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                      {lang.useCase}
                    </p>
                  </div>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// Compact version for mobile nav
export function CompactLanguageSwitcher({ value, onChange }: LanguageSwitcherProps) {
  const currentLang = LANGUAGES[value];
  
  return (
    <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
      {LANGUAGE_ORDER.map((langId) => {
        const lang = LANGUAGES[langId];
        const isActive = langId === value;
        
        return (
          <button
            key={langId}
            onClick={() => {
              onChange(langId);
              localStorage.setItem('currentLanguage', langId);
            }}
            className={`flex-shrink-0 w-10 h-10 rounded-lg text-xs font-bold text-white transition-all touch-target ${
              isActive 
                ? 'ring-2 ring-blue-400 scale-110' 
                : 'opacity-50 hover:opacity-100'
            }`}
            style={{ backgroundColor: lang.color }}
            aria-label={lang.displayName}
          >
            {lang.icon}
          </button>
        );
      })}
    </div>
  );
}
