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
  typescript: `// TypeScript Hello World\nconsole.log("Hello, World!");\n`,
  csharp: `using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}\n`,
};

const variableExamples: Record<LanguageId, string> = {
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int age = 25;\n    string name = "Alice";\n    double price = 19.99;\n    \n    cout << "Name: " << name << endl;\n    cout << "Age: " << age << endl;\n    cout << "Price: $" << price << endl;\n    return 0;\n}\n`,
  python: `# Python Variables\nage = 25\nname = "Alice"\nprice = 19.99\n\nprint(f"Name: ${'${name}'}")\nprint(f"Age: ${'${age}'}")\nprint(f"Price: $${'${price}'}")\n`,
  java: `public class Main {\n    public static void main(String[] args) {\n        int age = 25;\n        String name = "Alice";\n        double price = 19.99;\n        \n        System.out.println("Name: " + name);\n        System.out.println("Age: " + age);\n        System.out.println("Price: $" + price);\n    }\n}\n`,
  javascript: `// JavaScript Variables\nconst age = 25;\nconst name = "Alice";\nconst price = 19.99;\n\nconsole.log(\`Name: \${name}\`);\nconsole.log(\`Age: \${age}\`);\nconsole.log(\`Price: $\${price}\`);\n`,
  typescript: `// TypeScript Variables\nconst age: number = 25;\nconst name: string = "Alice";\nconst price: number = 19.99;\n\nconsole.log(\`Name: \${name}\`);\nconsole.log(\`Age: \${age}\`);\nconsole.log(\`Price: $\${price}\`);\n`,
  csharp: `using System;\n\nclass Program {\n    static void Main() {\n        int age = 25;\n        string name = "Alice";\n        double price = 19.99;\n        \n        Console.WriteLine($"Name: ${'${name}'}");\n        Console.WriteLine($"Age: ${'${age}'}");\n        Console.WriteLine($"Price: $${'${price}'}");\n    }\n}\n`,
};

const loopExamples: Record<LanguageId, string> = {
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Count from 1 to 5\n    for(int i = 1; i <= 5; i++) {\n        cout << "Count: " << i << endl;\n    }\n    return 0;\n}\n`,
  python: `# Python For Loop\n# Count from 1 to 5\nfor i in range(1, 6):\n    print(f"Count: {i}")\n`,
  java: `public class Main {\n    public static void main(String[] args) {\n        // Count from 1 to 5\n        for(int i = 1; i <= 5; i++) {\n            System.out.println("Count: " + i);\n        }\n    }\n}\n`,
  javascript: `// JavaScript For Loop\n// Count from 1 to 5\nfor(let i = 1; i <= 5; i++) {\n    console.log(\`Count: \${i}\`);\n}\n`,
  typescript: `// TypeScript For Loop\n// Count from 1 to 5\nfor(let i: number = 1; i <= 5; i++) {\n    console.log(\`Count: \${i}\`);\n}\n`,
  csharp: `using System;\n\nclass Program {\n    static void Main() {\n        // Count from 1 to 5\n        for(int i = 1; i <= 5; i++) {\n            Console.WriteLine($"Count: {i}");\n        }\n    }\n}\n`,
};

const outputSimulations: Record<LanguageId, string> = {
  cpp: 'Running C++ code...\n\n[Simulated Output]\nHello, World!\n\n--- Program finished with exit code: 0 ---',
  python: 'Running Python code...\n\n[Simulated Output]\nHello, World!\n\n--- Program finished with exit code: 0 ---',
  java: 'Running Java code...\n\n[Simulated Output]\nHello, World!\n\n--- Program finished with exit code: 0 ---',
  javascript: 'Running JavaScript code...\n\n[Simulated Output]\nHello, World!\n\n--- Program finished with exit code: 0 ---',
  typescript: 'Running TypeScript code...\n\n[Simulated Output]\nHello, World!\n\n--- Program finished with exit code: 0 ---',
  csharp: 'Running C# code...\n\n[Simulated Output]\nHello, World!\n\n--- Program finished with exit code: 0 ---',
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
    // Basic syntax checking for common errors
    const errors: string[] = [];
    const trimmedCode = code.trim();
    
    // Check if code is empty
    if (!trimmedCode) {
      setOutput('❌ Error: No code to execute\n\nPlease write some code and try again.');
      return;
    }

    // Language-specific error checking
    switch (currentLanguage) {
      case 'cpp':
        // Check for missing semicolons (basic check)
        if (!trimmedCode.includes(';') && trimmedCode.length > 20) {
          errors.push('Missing semicolons (;)');
        }
        // Check for missing main function
        if (!trimmedCode.includes('main')) {
          errors.push('Missing main() function');
        }
        // Check for missing includes
        if (!trimmedCode.includes('#include')) {
          errors.push('Missing #include statements');
        }
        // Check for common syntax errors
        if (trimmedCode.includes('cout') && !trimmedCode.includes('#include <iostream>')) {
          errors.push('Missing #include <iostream> for cout');
        }
        // Check for unmatched braces
        const openBraces = (trimmedCode.match(/{/g) || []).length;
        const closeBraces = (trimmedCode.match(/}/g) || []).length;
        if (openBraces !== closeBraces) {
          errors.push(`Unmatched braces: ${openBraces} opening, ${closeBraces} closing`);
        }
        break;

      case 'csharp':
        // Check for missing Main
        if (!trimmedCode.includes('Main')) {
          errors.push('Missing Main() method');
        }
        // Check for Console without using System
        if (trimmedCode.includes('Console') && !trimmedCode.includes('using System')) {
          errors.push('Missing using System; for Console');
        }
        // Check for missing semicolons
        if (!trimmedCode.includes(';') && trimmedCode.length > 20) {
          errors.push('Missing semicolons (;)');
        }
        // Check for unmatched braces
        const csOpenBraces = (trimmedCode.match(/{/g) || []).length;
        const csCloseBraces = (trimmedCode.match(/}/g) || []).length;
        if (csOpenBraces !== csCloseBraces) {
          errors.push(`Unmatched braces: ${csOpenBraces} opening, ${csCloseBraces} closing`);
        }
        break;

      case 'python':
        // Check for common Python syntax errors
        if (trimmedCode.includes('print') && trimmedCode.match(/print\s+[^(]/)) {
          errors.push('Python 3 requires parentheses: print()');
        }
        // Check for tabs and spaces mixing (basic check)
        if (trimmedCode.includes('\t') && trimmedCode.match(/^ +/m)) {
          errors.push('Mixed tabs and spaces (use consistent indentation)');
        }
        // Check for missing colons after control structures
        const lines = trimmedCode.split('\n');
        lines.forEach((line, idx) => {
          const trimmed = line.trim();
          if (trimmed.startsWith('if ') || trimmed.startsWith('elif ') || trimmed.startsWith('else') || 
              trimmed.startsWith('for ') || trimmed.startsWith('while ') || 
              trimmed.startsWith('def ') || trimmed.startsWith('class ')) {
            if (!trimmed.endsWith(':') && trimmed.length > 3) {
              errors.push(`Line ${idx + 1}: Missing colon (:) after ${trimmed.split(' ')[0]} statement`);
            }
          }
        });
        break;

      case 'java':
        // Check for missing class
        if (!trimmedCode.includes('class')) {
          errors.push('Missing class definition');
        }
        // Check for missing main method
        if (!trimmedCode.includes('public static void main')) {
          errors.push('Missing public static void main method');
        }
        // Check for missing semicolons
        if (!trimmedCode.includes(';') && trimmedCode.length > 20) {
          errors.push('Missing semicolons (;)');
        }
        // Check for unmatched braces
        const javaOpenBraces = (trimmedCode.match(/{/g) || []).length;
        const javaCloseBraces = (trimmedCode.match(/}/g) || []).length;
        if (javaOpenBraces !== javaCloseBraces) {
          errors.push(`Unmatched braces: ${javaOpenBraces} opening, ${javaCloseBraces} closing`);
        }
        break;

      case 'javascript':
        // Check for common JS errors
        if (trimmedCode.includes('console.log') && !trimmedCode.match(/console\.log\s*\(/)) {
          errors.push('console.log requires parentheses');
        }
        // Check for var usage
        if (trimmedCode.match(/\bvar\s+/)) {
          errors.push('Consider using let or const instead of var');
        }
        // Check for unmatched braces
        const jsOpenBraces = (trimmedCode.match(/{/g) || []).length;
        const jsCloseBraces = (trimmedCode.match(/}/g) || []).length;
        if (jsOpenBraces !== jsCloseBraces) {
          errors.push(`Unmatched braces: ${jsOpenBraces} opening, ${jsCloseBraces} closing`);
        }
        break;

      case 'typescript':
        // Check for common TS errors
        if (trimmedCode.includes('console.log') && !trimmedCode.match(/console\.log\s*\(/)) {
          errors.push('console.log requires parentheses');
        }
        // Check for unmatched braces
        const tsOpenBraces = (trimmedCode.match(/{/g) || []).length;
        const tsCloseBraces = (trimmedCode.match(/}/g) || []).length;
        if (tsOpenBraces !== tsCloseBraces) {
          errors.push(`Unmatched braces: ${tsOpenBraces} opening, ${tsCloseBraces} closing`);
        }
        break;
    }

    // Display errors or success output
    if (errors.length > 0) {
      const errorOutput = `❌ Compilation/Syntax Errors:\n\n${errors.map((err, idx) => `${idx + 1}. ${err}`).join('\n')}\n\n--- Fix these errors and try again ---`;
      setOutput(errorOutput);
    } else {
      setOutput(outputSimulations[currentLanguage]); 
    }
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
            <pre className="w-full h-96 bg-slate-950 font-mono text-sm rounded-lg border border-slate-800 p-4 overflow-auto whitespace-pre-wrap">
              <span className={output.includes('❌') ? 'text-red-400' : 'text-green-400'}>
                {output || 'Click Run Code to see output...'}
              </span>
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
              onClick={() => setCode(variableExamples[currentLanguage])}
              className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-left transition-colors min-h-[44px] touch-target"
            >
              <div className="font-medium text-sm">Variables</div>
              <div className="text-xs text-slate-400 mt-1">Variable declaration</div>
            </button>
            <button
              onClick={() => setCode(loopExamples[currentLanguage])}
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
