import { useState } from 'react';
import { Play, RotateCcw, Code as CodeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const defaultCode = `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}\n`;

export default function Playground() {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');
  const runCode = () => { setOutput('Running code...\n\n[Simulated Output]\nHello, World!\n\n--- Program finished with exit code: 0 ---'); };
  const resetCode = () => { setCode(defaultCode); setOutput(''); };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold mb-1">Code Playground</h1><p className="text-slate-400 text-sm">Write and test C++ code directly in your browser</p></div>
        <div className="flex gap-2"><Button variant="outline" size="sm" onClick={resetCode}><RotateCcw className="h-4 w-4 mr-2" />Reset</Button><Button size="sm" onClick={runCode}><Play className="h-4 w-4 mr-2" />Run Code</Button></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card><CardContent className="p-4"><div className="flex items-center gap-2 mb-3 text-sm text-slate-400"><CodeIcon className="h-4 w-4" /> editor.cpp</div><textarea value={code} onChange={(e) => setCode(e.target.value)} className="w-full h-96 bg-slate-950 text-slate-100 font-mono text-sm rounded-lg border border-slate-800 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" spellCheck={false} /></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-2 mb-3 text-sm text-slate-400"><Play className="h-4 w-4" /> Output</div><pre className="w-full h-96 bg-slate-950 text-green-400 font-mono text-sm rounded-lg border border-slate-800 p-4 overflow-auto whitespace-pre-wrap">{output || 'Click Run Code to see output...'}</pre></CardContent></Card>
      </div>
    </div>
  );
}
