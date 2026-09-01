/**
 * Interactive Lessons Page
 * Language selector + clickable glossary terms
 */

import { useState, useEffect } from 'react';
import { ChevronDown, BookOpen, Code2, Info } from 'lucide-react';
import { lessonContent, glossaries, type LanguageId } from '@/data/lesson-content';

// Language configuration
const languages: Record<LanguageId, { name: string; color: string; icon: string }> = {
  typescript: { name: 'TypeScript', color: '#3178c6', icon: 'TS' },
  cpp: { name: 'C++', color: '#00599c', icon: 'C+' },
  python: { name: 'Python', color: '#3776ab', icon: 'PY' },
  java: { name: 'Java', color: '#f89820', icon: 'JV' },
  csharp: { name: 'C#', color: '#68217a', icon: 'C#' },
  react: { name: 'React', color: '#61dafb', icon: 'RX' },
};

export default function LessonsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageId>('python');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [hoveredTerm, setHoveredTerm] = useState<string | null>(null);

  const currentLessons = lessonContent[selectedLanguage];
  const currentGlossary = glossaries[selectedLanguage];
  const currentLang = languages[selectedLanguage];

  // Find selected topic
  const activeTopic = currentLessons
    .flatMap(cat => cat.topics)
    .find(topic => topic.id === selectedTopic);

  // Automatically select first topic when language changes
  useEffect(() => {
    if (currentLessons.length > 0 && currentLessons[0].topics.length > 0) {
      setSelectedTopic(currentLessons[0].topics[0].id);
    }
  }, [selectedLanguage]);

  // Render content with interactive glossary terms
  const renderInteractiveContent = (content: string) => {
    const words = content.split(/(\s+)/);
    return words.map((word, idx) => {
      const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
      const definition = currentGlossary[cleanWord];
      
      if (definition && cleanWord.length > 0) {
        return (
          <span
            key={idx}
            className="relative inline-block"
            onMouseEnter={() => setHoveredTerm(cleanWord)}
            onMouseLeave={() => setHoveredTerm(null)}
          >
            <span className="underline decoration-dotted decoration-blue-400 cursor-help text-blue-300 hover:text-blue-200 transition-colors">
              {word}
            </span>
            {hoveredTerm === cleanWord && (
              <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-10 pointer-events-none">
                <div className="text-xs font-semibold text-blue-400 mb-1 capitalize">{cleanWord}</div>
                <div className="text-xs text-slate-300">{definition}</div>
                <div className="absolute bottom-0 left-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-slate-900 border-r border-b border-slate-700"></div>
              </div>
            )}
          </span>
        );
      }
      return <span key={idx}>{word}</span>;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                <BookOpen className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Interactive Lessons</h1>
                <p className="text-sm text-slate-400">Hover over highlighted terms for definitions</p>
              </div>
            </div>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors w-full sm:w-auto"
              >
                <span className="text-2xl">{currentLang.icon}</span>
                <span className="font-semibold text-white">{currentLang.name}</span>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute top-full right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-40">
                    {(Object.keys(languages) as LanguageId[]).map((langId) => {
                      const lang = languages[langId];
                      return (
                        <button
                          key={langId}
                          onClick={() => {
                            setSelectedLanguage(langId);
                            setDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                            langId === selectedLanguage
                              ? 'bg-blue-500/20 text-white'
                              : 'hover:bg-slate-800 text-slate-300'
                          }`}
                        >
                          <span className="text-xl">{lang.icon}</span>
                          <span className="font-medium">{lang.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Sidebar - Topic List */}
          <div className="space-y-4">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 lg:sticky lg:top-24">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">Topics</h2>
              <div className="space-y-1 max-h-[70vh] overflow-y-auto">
                {currentLessons.map((category) => (
                  <div key={category.id} className="space-y-1">
                    <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-300">
                      <span>{category.icon}</span>
                      <span>{category.title}</span>
                    </div>
                    {category.topics.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => setSelectedTopic(topic.id)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                          selectedTopic === topic.id
                            ? 'bg-blue-500/20 text-blue-300 font-medium'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                        }`}
                      >
                        {topic.title}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="space-y-6">
            {activeTopic ? (
              <>
                {/* Topic Header */}
                <div className="bg-gradient-to-br from-slate-900/80 to-slate-900/50 border border-slate-800 rounded-xl p-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{activeTopic.title}</h2>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Info className="h-4 w-4" />
                    <span>Hover over highlighted terms to see definitions</span>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                  <div className="prose prose-invert prose-slate max-w-none">
                    <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                      {renderInteractiveContent(activeTopic.content)}
                    </div>
                  </div>
                </div>

                {/* Code Example */}
                {activeTopic.codeExample && (
                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/80 border-b border-slate-800">
                      <Code2 className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-medium text-slate-300">Code Example</span>
                    </div>
                    <pre className="p-6 overflow-x-auto">
                      <code className="text-sm text-slate-300 font-mono">{activeTopic.codeExample}</code>
                    </pre>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center">
                <BookOpen className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-400 mb-2">Select a Topic</h3>
                <p className="text-sm text-slate-500">Choose a lesson from the sidebar to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
