import { ReactNode, useState, useEffect } from 'react';
import { Play, RotateCcw, Settings, ChevronRight, Terminal, Flame, Sun, Moon, Command } from 'lucide-react';
import { useUser } from '@/context/UserContext';

interface IntermediateLayoutProps {
  children: ReactNode;
  lessonsList?: Array<{ id: string; title: string; completed: boolean }>;
  onLessonSelect?: (id: string) => void;
  currentLessonId?: string;
  onRunCode?: () => void;
  onResetCode?: () => void;
  consoleOutput?: string;
}

export default function IntermediateLayout({
  children,
  lessonsList = [],
  onLessonSelect,
  currentLessonId,
  onRunCode,
  onResetCode,
  consoleOutput = '',
}: IntermediateLayoutProps) {
  const { user } = useUser();
  const [consoleExpanded, setConsoleExpanded] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [docsCollapsed, setDocsCollapsed] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showKeyboardHint, setShowKeyboardHint] = useState(false);

  useEffect(() => {
    // Load dark mode preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) setDarkMode(savedMode === 'true');

    // Calculate streak (mock for now)
    const lastActive = localStorage.getItem('lastActiveDate');
    const today = new Date().toDateString();
    if (lastActive === today) {
      const savedStreak = parseInt(localStorage.getItem('streak') || '0');
      setStreak(savedStreak);
    }

    // Keyboard shortcuts
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'Enter') {
          e.preventDefault();
          onRunCode?.();
        } else if (e.key === 'k') {
          e.preventDefault();
          setShowKeyboardHint(true);
          setTimeout(() => setShowKeyboardHint(false), 3000);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onRunCode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-900';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const hoverBg = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100';

  return (
    <div className={`flex h-screen ${bgColor}`}>
      {/* Left Sidebar - Lessons List with Collapsible Docs */}
      <div className={`${docsCollapsed ? 'w-16' : 'w-80'} ${cardBg} border-r ${borderColor} flex flex-col transition-all duration-300`}>
        {!docsCollapsed && (
          <>
            {/* Sidebar Header with Streak */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-white font-bold text-lg">INTERMEDIATE</h2>
                  <p className="text-cyan-100 text-sm mt-1">{user?.xp || 0} XP</p>
                </div>
                {streak > 0 && (
                  <div className="flex items-center gap-1 bg-orange-500 px-3 py-1 rounded-full">
                    <Flame className="w-4 h-4 text-white" />
                    <span className="text-white font-bold text-sm">{streak}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Lessons List */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wide`}>
                  Lessons
                </h3>
                <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {lessonsList.filter((l) => l.completed).length}/{lessonsList.length}
                </span>
              </div>
              <div className="space-y-1">
                {lessonsList.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => onLessonSelect?.(lesson.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                      currentLessonId === lesson.id
                        ? 'bg-cyan-500 text-white font-semibold'
                        : `${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'} ${hoverBg}`
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          lesson.completed ? 'bg-green-400' : darkMode ? 'bg-gray-600' : 'bg-gray-400'
                        }`}
                      />
                      <span>{lesson.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Progress Summary */}
            <div className={`border-t ${borderColor} p-4`}>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Overall Progress</div>
              <div className="flex items-center gap-2">
                <div className={`flex-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        (lessonsList.filter((l) => l.completed).length /
                          Math.max(lessonsList.length, 1)) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Collapse Button */}
        <button
          onClick={() => setDocsCollapsed(!docsCollapsed)}
          className={`p-4 border-t ${borderColor} ${hoverBg} ${textColor} transition-colors`}
        >
          <ChevronRight className={`w-5 h-5 mx-auto transition-transform ${docsCollapsed ? '' : 'rotate-180'}`} />
        </button>
      </div>

      {/* Right Panel - Split Editor and Console */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar with Dark Mode & Keyboard Shortcuts */}
        <div className={`${cardBg} border-b ${borderColor} px-6 py-3 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <button
              onClick={onRunCode}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg"
              title="Ctrl/Cmd + Enter"
            >
              <Play className="w-4 h-4" />
              Run
              <span className="text-xs opacity-75">⌘↵</span>
            </button>
            <button
              onClick={onResetCode}
              className={`flex items-center gap-2 px-4 py-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} font-semibold rounded-lg transition-colors`}
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Streak Display */}
            {streak > 0 && (
              <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Flame className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <span className={`text-sm font-bold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  {streak} day streak
                </span>
              </div>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 ${hoverBg} rounded-lg transition-colors`}
              title="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>

            {/* Settings */}
            <button className={`p-2 ${hoverBg} rounded-lg transition-colors`}>
              <Settings className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            </button>
          </div>
        </div>

        {/* Keyboard Shortcuts Hint */}
        {showKeyboardHint && (
          <div className="absolute top-20 right-6 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl z-50 animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <Command className="w-4 h-4" />
              <span className="font-bold text-sm">Keyboard Shortcuts</span>
            </div>
            <div className="text-xs space-y-1">
              <div><kbd className="px-2 py-1 bg-gray-800 rounded">Ctrl</kbd> + <kbd className="px-2 py-1 bg-gray-800 rounded">Enter</kbd> Run code</div>
              <div><kbd className="px-2 py-1 bg-gray-800 rounded">Ctrl</kbd> + <kbd className="px-2 py-1 bg-gray-800 rounded">K</kbd> Show shortcuts</div>
            </div>
          </div>
        )}

        {/* Editor Area */}
        <div
          className={`flex-1 overflow-auto ${cardBg} ${
            consoleExpanded ? 'h-1/2' : 'h-full'
          }`}
        >
          <div className="p-6">
            <style>{`
              ${darkMode ? `
                .prose { color: #e5e7eb; }
                .prose h1, .prose h2, .prose h3 { color: #f3f4f6; }
                .prose code { background: #374151; color: #60a5fa; }
                .prose pre { background: #1f2937; }
              ` : ''}
            `}</style>
            <div className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}>
              {children}
            </div>
          </div>
        </div>

        {/* Console/Output Section - Faster Feedback */}
        <div
          className={`${darkMode ? 'bg-gray-950' : 'bg-gray-900'} text-gray-100 border-t ${darkMode ? 'border-gray-800' : 'border-gray-700'} transition-all ${
            consoleExpanded ? 'h-1/2' : 'h-12'
          }`}
        >
          <div className={`flex items-center justify-between px-4 py-2 border-b ${darkMode ? 'border-gray-800' : 'border-gray-700'}`}>
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold">Output</span>
              {consoleOutput && (
                <span className="text-xs text-gray-500">Ready</span>
              )}
            </div>
            <button
              onClick={() => setConsoleExpanded(!consoleExpanded)}
              className="p-1 hover:bg-gray-800 rounded transition-colors"
            >
              <ChevronRight
                className={`w-4 h-4 transition-transform ${
                  consoleExpanded ? 'rotate-90' : '-rotate-90'
                }`}
              />
            </button>
          </div>
          {consoleExpanded && (
            <div className="p-4 overflow-auto h-[calc(100%-40px)] font-mono text-sm">
              <pre className="text-green-400">
                {consoleOutput || '// Press Ctrl+Enter to run your code...'}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
