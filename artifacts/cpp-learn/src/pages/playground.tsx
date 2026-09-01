import { useState, useEffect } from 'react';
import { Play, RotateCcw, Code as CodeIcon, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { LANGUAGES, type LanguageId } from '@/data/languages';

const defaultCodeExamples: Record<LanguageId, string> = {
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}\n`,
  python: `# Python Hello World\nprint("Hello, World!")\n`,
  java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}\n`,
  javascript: `// JavaScript Hello World\nconsole.log("Hello, World!");\n`,
  c: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}\n`,
  go: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}\n`,
};

const outputSimulations: Record<LanguageId, string> = {
  cpp: 'Running C++ code...\n\n[Simulated Output]\nHello, World!\n\n--- Program finished with exit code: 0 ---',
  python: 'Running Python code...\n\n[Simulated Output]\nHello, World!\n\n--- Program finished with exit code: 0 ---',
  java: 'Running Java code...\n\n[Simulated Output]\nHello, World!\n\n--- Program finished with exit code: 0 ---',
  javascript: 'Running JavaScript code...\n\n[Simulated Output]\nHello, World!\n\n--- Program finished with exit code: 0 ---',
  c: 'Running C code...\n\n[Simulated Output]\nHello, World!\n\n--- Program finished with exit code: 0 ---',
  go: 'Running Go code...\n\n[Simulated Output]\nHello, World!\n\n--- Program finished with exit code: 0 ---',
};

export default function Playground() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageId>(() => {
    return (localStorage.getItem('currentLanguage') as LanguageId) || 'cpp';
  });
  const [code, setCode] = useState(defaultCodeExamples[currentLanguage]);
  const [output, setOutput] = useState('');

  // Update code when language changes
  useEffect(() => {
    setCode(defaultCodeExamples[currentLanguage]);
    setOutput('');
  }, [currentLanguage]);

  const runCode = () => { 
    setOutput(outputSimulations[currentLanguage]); 
  };
  
  const resetCode = () => { 
    setCode(defaultCodeExamples[currentLanguage]); 
    setOutput(''); 
  };
  const lang = LANGUAGES[currentLanguage];
  const fileExtension = lang.fileExtension;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Code Playground</h1>
          <p className="text-slate-400 text-sm">
            Write and test {lang.displayName} code directly in your browser
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetCode}
            className="min-h-[44px]"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button 
            size="sm" 
            onClick={runCode}
            className="min-h-[44px]"
          >
            <Play className="h-4 w-4 mr-2" />
            Run Code
          </Button>
        </div>
      </div>

      {/* Language Switcher */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <BookOpen className="h-5 w-5" />
              <span className="font-medium">Select Language:</span>
            </div>
            <LanguageSwitcher 
              value={currentLanguage} 
              onChange={setCurrentLanguage}
              showLabel={true}
            />
          </div>
        </CardContent>
      </Card>

      {/* Code Editor and Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Editor */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: lang.color }}
              >
                {lang.icon}
              </div>
              <span className="text-sm text-slate-400">
                editor{fileExtension}
              </span>
            </div>
            <textarea 
              value={code} 
              onChange={(e) => setCode(e.target.value)} 
              className="w-full h-96 bg-slate-950 text-slate-100 font-mono text-sm rounded-lg border border-slate-800 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" 
              spellCheck={false} 
            />
          </CardContent>
        </Card>

        {/* Output */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3 text-sm text-slate-400">
              <Play className="h-4 w-4" /> 
              Output
            </div>
            <pre className="w-full h-96 bg-slate-950 text-green-400 font-mono text-sm rounded-lg border border-slate-800 p-4 overflow-auto whitespace-pre-wrap">
              {output || 'Click Run Code to see output...'}
            </pre>
          </CardContent>
        </Card>
      </div>

      {/* Code Examples */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Quick Start Examples</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <button
              onClick={() => setCode(defaultCodeExamples[currentLanguage])}
              className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-left transition-colors min-h-[44px] touch-target"
            >
              <div className="font-medium text-sm">Hello World</div>
              <div className="text-xs text-slate-400 mt-1">Basic output example</div>
            </button>
            <button
              className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-left transition-colors min-h-[44px] touch-target"
            >
              <div className="font-medium text-sm">Variables</div>
              <div className="text-xs text-slate-400 mt-1">Variable declaration</div>
            </button>
            <button
              className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-left transition-colors min-h-[44px] touch-target"
            >
              <div className="font-medium text-sm">Loops</div>
              <div className="text-xs text-slate-400 mt-1">For loop example</div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
