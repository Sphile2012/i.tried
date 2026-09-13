import { useState } from 'react';
import { useParams } from 'wouter';
import CodeEditor from '../components/CodeEditor';
import { compilerService, CompilerError } from '../services/compilerService';
import { Play, RotateCcw, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function LessonCodeEditor() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [code, setCode] = useState(`#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
`);
  const [output, setOutput] = useState('');
  const [errors, setErrors] = useState<CompilerError[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Compiling...');
    setErrors([]);
    setExecutionTime(null);

    // Simulate compilation delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const result = await compilerService.compile(code, 'cpp');

    if (result.success) {
      setOutput(result.output || 'Execution completed');
      setExecutionTime(result.executionTime || null);
    } else {
      setOutput('Compilation failed. Check the problems below.');
      setErrors(result.errors || []);
    }

    setIsRunning(false);
  };

  const handleReset = () => {
    setCode(`#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
`);
    setOutput('');
    setErrors([]);
    setExecutionTime(null);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mb-6`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                C++ Code Editor
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                Write and test your code. Errors will appear with helpful messages.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  darkMode
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {darkMode ? '☀️ Light' : '🌙 Dark'}
              </button>
              <button
                onClick={handleReset}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  darkMode
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors shadow-md"
              >
                <Play className="w-4 h-4" />
                {isRunning ? 'Running...' : 'Run Code'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
            <div className={`px-4 py-3 border-b ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
              <h2 className={`text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                CODE EDITOR
              </h2>
            </div>
            <CodeEditor
              value={code}
              onChange={setCode}
              language="cpp"
              onRun={handleRun}
              height="600px"
              darkMode={darkMode}
            />
          </div>

          {/* Output Panel */}
          <div className="space-y-6">
            {/* Console Output */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
              <div className={`px-4 py-3 border-b ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center justify-between">
                  <h2 className={`text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    CONSOLE OUTPUT
                  </h2>
                  {executionTime !== null && (
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {executionTime.toFixed(2)}ms
                    </span>
                  )}
                </div>
              </div>
              <div 
                className={`p-4 min-h-[200px] font-mono text-sm ${
                  errors.length > 0
                    ? 'bg-red-950 text-red-300 border-2 border-[#38BDF8]'
                    : darkMode 
                      ? 'bg-gray-950 text-green-400' 
                      : 'bg-gray-900 text-green-300'
                }`}
              >
                <pre className="whitespace-pre-wrap">{output || '// Output will appear here...'}</pre>
              </div>
            </div>

            {/* Status Indicator */}
            {output && (
              <div
                className={`rounded-lg p-4 ${
                  errors.length === 0
                    ? darkMode
                      ? 'bg-green-900/20 border border-green-700'
                      : 'bg-green-50 border border-green-200'
                    : darkMode
                      ? 'bg-red-900/20 border border-red-700'
                      : 'bg-red-50 border border-red-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  {errors.length === 0 ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <p className={`font-semibold ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                          Compilation Successful
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-600'}`}>
                          Your code compiled and ran without errors.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-500" />
                      <div>
                        <p className={`font-semibold ${darkMode ? 'text-red-400' : 'text-red-700'}`}>
                          {errors.length} {errors.length === 1 ? 'Error' : 'Errors'} Found
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-red-300' : 'text-red-600'}`}>
                          Fix the issues highlighted in the editor.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Problems List */}
            {errors.length > 0 && (
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
                <div className={`px-4 py-3 border-b ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
                  <h2 className={`text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    PROBLEMS ({errors.length})
                  </h2>
                </div>
                <div className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {errors.map((error, index) => (
                    <div
                      key={index}
                      className={`p-4 ${darkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50'} cursor-pointer transition-colors`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {error.severity === 'error' ? (
                            <XCircle className="w-5 h-5 text-red-500" />
                          ) : error.severity === 'warning' ? (
                            <AlertTriangle className="w-5 h-5 text-yellow-500" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-blue-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-xs font-semibold uppercase ${
                                error.severity === 'error'
                                  ? 'text-red-600 dark:text-red-400'
                                  : error.severity === 'warning'
                                    ? 'text-yellow-600 dark:text-yellow-400'
                                    : 'text-blue-600 dark:text-blue-400'
                              }`}
                            >
                              {error.severity}
                            </span>
                            <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                              Line {error.line}, Column {error.column}
                            </span>
                          </div>
                          <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-900'} leading-relaxed`}>
                            {error.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Tips */}
            <div className={`${darkMode ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} border rounded-lg p-4`}>
              <h3 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                Quick Tips
              </h3>
              <ul className={`text-sm space-y-1 ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                <li>• Press Ctrl+Enter to run your code</li>
                <li>• Red underlines show errors with helpful messages</li>
                <li>• Click on a problem to jump to that line</li>
                <li>• Save your work before resetting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
