import { ReactNode, useState, useEffect } from 'react';
import {
  FileCode,
  Terminal as TerminalIcon,
  BookOpen,
  Trophy,
  Play,
  Search,
  ChevronRight,
  Folder,
  File,
  Zap,
  Code2,
  GitBranch,
  Clock,
} from 'lucide-react';
import { useUser } from '@/context/UserContext';

interface ExpertLayoutProps {
  children: ReactNode;
  files?: Array<{ id: string; name: string; type: 'file' | 'folder' }>;
  onFileSelect?: (id: string) => void;
  onRunCode?: () => void;
  terminalOutput?: string;
  documentationContent?: ReactNode;
  performanceMetrics?: {
    executionTime?: number;
    memoryUsage?: number;
    complexity?: string;
  };
}

export default function ExpertLayout({
  children,
  files = [],
  onFileSelect,
  onRunCode,
  terminalOutput = '',
  documentationContent,
  performanceMetrics,
}: ExpertLayoutProps) {
  const { user } = useUser();
  const [activePanel, setActivePanel] = useState<'docs' | 'leaderboard'>('leaderboard');
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [terminalHeight, setTerminalHeight] = useState(200);
  const [commandSearch, setCommandSearch] = useState('');
  const [vimMode, setVimMode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command Palette: Ctrl/Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette((prev) => !prev);
      }
      // Run: F5
      if (e.key === 'F5') {
        e.preventDefault();
        onRunCode?.();
      }
      // Vim Mode: Ctrl/Cmd+Shift+V
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'V') {
        e.preventDefault();
        setVimMode((prev) => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onRunCode]);

  const commands = [
    { name: 'Run Code', shortcut: 'F5', action: onRunCode },
    { name: 'Toggle Terminal', shortcut: 'Ctrl+`' },
    { name: 'New File', shortcut: 'Ctrl+N' },
    { name: 'Format Code', shortcut: 'Shift+Alt+F' },
    { name: 'Toggle Vim Mode', shortcut: 'Ctrl+Shift+V' },
    { name: 'Git Commit', shortcut: 'Ctrl+Shift+G' },
    { name: 'Find in Files', shortcut: 'Ctrl+Shift+F' },
    { name: 'Go to Definition', shortcut: 'F12' },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(commandSearch.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#0d1117] text-gray-100">
      {/* Minimal Left Panel - File Explorer */}
      <div className="w-56 bg-[#161b22] border-r border-gray-800 flex flex-col">
        <div className="p-2 border-b border-gray-800 flex items-center justify-between">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Expert</span>
          <span className="text-[10px] font-mono text-purple-400">{user?.xp || 0}</span>
        </div>

        <div className="flex-1 overflow-y-auto p-1">
          <div className="text-[10px] font-mono text-gray-600 uppercase tracking-wide mb-1 px-2">Explorer</div>
          <div className="space-y-0.5">
            {files.map((file) => (
              <button
                key={file.id}
                onClick={() => onFileSelect?.(file.id)}
                className="w-full text-left px-2 py-1 rounded hover:bg-gray-800 transition-colors flex items-center gap-2 text-xs font-mono"
              >
                {file.type === 'folder' ? (
                  <Folder className="w-3 h-3 text-yellow-600" />
                ) : (
                  <File className="w-3 h-3 text-blue-500" />
                )}
                <span className="text-gray-300">{file.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-800 p-2 space-y-1">
          <button
            onClick={() => setShowCommandPalette(true)}
            className="w-full text-[11px] font-mono text-gray-500 hover:text-gray-300 flex items-center justify-between px-2 py-1 hover:bg-gray-800 rounded transition-colors"
          >
            <span>Palette</span>
            <kbd className="px-1 py-0.5 bg-gray-800 rounded text-[10px]">⌘K</kbd>
          </button>
          {vimMode && (
            <div className="text-[10px] font-mono text-green-400 px-2">VIM MODE</div>
          )}
        </div>
      </div>

      {/* Center Panel - Minimal Editor */}
      <div className="flex-1 flex flex-col">
        {/* Minimal Toolbar */}
        <div className="bg-[#161b22] border-b border-gray-800 px-3 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="px-2 py-1 bg-[#0d1117] rounded text-[11px] font-mono border border-gray-800">
              <FileCode className="w-3 h-3 inline mr-1" />
              main.cpp
            </div>
          </div>
          <div className="flex items-center gap-2">
            {performanceMetrics && (
              <div className="flex items-center gap-3 text-[10px] font-mono text-gray-500">
                {performanceMetrics.executionTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {performanceMetrics.executionTime}ms
                  </div>
                )}
                {performanceMetrics.complexity && (
                  <div className="flex items-center gap-1">
                    <Code2 className="w-3 h-3" />
                    O({performanceMetrics.complexity})
                  </div>
                )}
              </div>
            )}
            <button
              onClick={onRunCode}
              className="flex items-center gap-1.5 px-3 py-1 bg-green-700 hover:bg-green-600 text-white text-[11px] font-mono rounded transition-colors"
            >
              <Play className="w-3 h-3" />
              Run
              <span className="text-[9px] opacity-60">F5</span>
            </button>
          </div>
        </div>

        {/* Editor Content - Minimal UI */}
        <div
          className="flex-1 overflow-auto bg-[#0d1117] p-4"
          style={{ height: `calc(100% - ${terminalHeight}px)` }}
        >
          <style>{`
            .minimal-prose { font-family: 'Fira Code', monospace; font-size: 13px; line-height: 1.6; color: #c9d1d9; }
            .minimal-prose h1 { font-size: 16px; font-weight: 600; color: #f0f6fc; margin-bottom: 12px; border-bottom: 1px solid #21262d; padding-bottom: 6px; }
            .minimal-prose h2 { font-size: 14px; font-weight: 600; color: #f0f6fc; margin-top: 16px; margin-bottom: 8px; }
            .minimal-prose p { margin-bottom: 12px; color: #8b949e; }
            .minimal-prose code { background: #161b22; padding: 2px 6px; border-radius: 3px; font-size: 12px; color: #79c0ff; font-family: 'Fira Code', monospace; }
            .minimal-prose pre { background: #0d1117; border: 1px solid #30363d; padding: 12px; border-radius: 6px; font-size: 12px; overflow-x: auto; }
            .minimal-prose ul, .minimal-prose ol { margin-left: 20px; margin-bottom: 12px; }
            .minimal-prose li { margin-bottom: 4px; color: #8b949e; }
          `}</style>
          <div className="minimal-prose">
            {children}
          </div>
        </div>

        {/* Terminal - Compact */}
        <div
          className="bg-[#010409] border-t border-gray-800"
          style={{ height: `${terminalHeight}px` }}
        >
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#161b22] border-b border-gray-800">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-3 h-3 text-green-500" />
              <span className="text-[11px] font-mono text-gray-400">Terminal</span>
            </div>
            <button
              onMouseDown={(e) => {
                const startY = e.clientY;
                const startHeight = terminalHeight;
                const handleMouseMove = (moveEvent: MouseEvent) => {
                  const deltaY = startY - moveEvent.clientY;
                  setTerminalHeight(Math.max(80, Math.min(400, startHeight + deltaY)));
                };
                const handleMouseUp = () => {
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);
                };
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
              }}
              className="cursor-ns-resize p-0.5 hover:bg-gray-800 rounded"
            >
              <ChevronRight className="w-3 h-3 rotate-90 text-gray-600" />
            </button>
          </div>
          <div className="p-3 overflow-auto h-[calc(100%-32px)] font-mono text-[11px]">
            <pre className="text-green-500">
              {terminalOutput || '$ Ready'}
            </pre>
          </div>
        </div>
      </div>

      {/* Right Panel - Competitive Challenges & Code Reviews */}
      <div className="w-72 bg-[#161b22] border-l border-gray-800 flex flex-col">
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActivePanel('leaderboard')}
            className={`flex-1 px-3 py-2 text-[11px] font-mono transition-colors ${
              activePanel === 'leaderboard'
                ? 'bg-[#0d1117] text-purple-400 border-b border-purple-600'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <Trophy className="w-3 h-3 inline mr-1.5" />
            Ranks
          </button>
          <button
            onClick={() => setActivePanel('docs')}
            className={`flex-1 px-3 py-2 text-[11px] font-mono transition-colors ${
              activePanel === 'docs'
                ? 'bg-[#0d1117] text-purple-400 border-b border-purple-600'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <BookOpen className="w-3 h-3 inline mr-1.5" />
            Ref
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {activePanel === 'leaderboard' ? (
            <div className="space-y-2">
              <h3 className="text-[10px] font-mono font-semibold text-gray-400 uppercase mb-3">Rankings</h3>
              {[1, 2, 3, 4, 5].map((rank) => (
                <div
                  key={rank}
                  className="flex items-center gap-2 p-2 bg-[#0d1117] rounded border border-gray-800"
                >
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold font-mono ${
                      rank === 1
                        ? 'bg-yellow-600 text-black'
                        : rank === 2
                          ? 'bg-gray-500 text-black'
                          : rank === 3
                            ? 'bg-orange-700 text-white'
                            : 'bg-gray-800 text-gray-400'
                    }`}
                  >
                    {rank}
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-mono text-gray-200">
                      {rank === 1 ? 'You' : `Dev${rank}`}
                    </div>
                    <div className="text-[10px] font-mono text-gray-600">
                      {5000 - (rank - 1) * 500}
                    </div>
                  </div>
                  {rank === 1 && <Zap className="w-3 h-3 text-yellow-500" />}
                </div>
              ))}

              {/* Performance Metrics */}
              {performanceMetrics && (
                <div className="mt-4 p-3 bg-[#0d1117] rounded border border-gray-800">
                  <h4 className="text-[10px] font-mono text-gray-400 uppercase mb-2">Performance</h4>
                  <div className="space-y-1 text-[11px] font-mono">
                    {performanceMetrics.executionTime && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Time:</span>
                        <span className="text-green-400">{performanceMetrics.executionTime}ms</span>
                      </div>
                    )}
                    {performanceMetrics.memoryUsage && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Memory:</span>
                        <span className="text-blue-400">{performanceMetrics.memoryUsage}MB</span>
                      </div>
                    )}
                    {performanceMetrics.complexity && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Complexity:</span>
                        <span className="text-purple-400">O({performanceMetrics.complexity})</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-[11px] font-mono text-gray-400 space-y-3">
              {documentationContent || (
                <>
                  <h3 className="text-[12px] font-semibold text-gray-200">Reference</h3>
                  <p className="text-gray-500">Quick docs appear here.</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Command Palette - Power & Speed */}
      {showCommandPalette && (
        <div
          className="fixed inset-0 bg-black/70 flex items-start justify-center pt-32 z-50"
          onClick={() => setShowCommandPalette(false)}
        >
          <div
            className="bg-[#161b22] border border-gray-800 rounded-lg shadow-2xl w-full max-w-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-800">
              <Search className="w-4 h-4 text-gray-600" />
              <input
                type="text"
                placeholder="Command..."
                value={commandSearch}
                onChange={(e) => setCommandSearch(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-[12px] font-mono text-gray-100 placeholder-gray-600"
                autoFocus
              />
            </div>
            <div className="p-1 max-h-80 overflow-y-auto">
              {filteredCommands.map((cmd) => (
                <button
                  key={cmd.name}
                  onClick={() => {
                    cmd.action?.();
                    setShowCommandPalette(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-[#0d1117] rounded flex items-center justify-between transition-colors"
                >
                  <span className="text-[11px] font-mono text-gray-300">{cmd.name}</span>
                  <kbd className="px-2 py-0.5 bg-[#0d1117] border border-gray-800 rounded text-[10px] font-mono text-gray-500">
                    {cmd.shortcut}
                  </kbd>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
