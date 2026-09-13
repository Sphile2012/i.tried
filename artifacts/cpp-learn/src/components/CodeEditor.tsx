import { useEffect, useRef, useState } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: 'cpp' | 'javascript' | 'typescript' | 'python';
  onRun?: () => void;
  readOnly?: boolean;
  height?: string;
  darkMode?: boolean;
}

interface CompilerError {
  line: number;
  column: number;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

export default function CodeEditor({
  value,
  onChange,
  language = 'cpp',
  onRun,
  readOnly = false,
  height = '400px',
  darkMode = false,
}: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const [errors, setErrors] = useState<CompilerError[]>([]);

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Configure language-specific settings
    if (language === 'cpp') {
      monaco.languages.cpp.cppDefaults.setDiagnosticsOptions({
        validate: true,
        noSemanticValidation: false,
        noSyntaxValidation: false,
      });
    } else if (language === 'typescript' || language === 'javascript') {
      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false,
      });
      
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        allowNonTsExtensions: true,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        module: monaco.languages.typescript.ModuleKind.CommonJS,
        noEmit: true,
        esModuleInterop: true,
        jsx: monaco.languages.typescript.JsxEmit.React,
        reactNamespace: 'React',
        allowJs: true,
        typeRoots: ['node_modules/@types'],
      });
    } else if (language === 'python') {
      // Python validation via custom rules
      validatePython(value);
    }

    // Enable IntelliSense
    editor.updateOptions({
      quickSuggestions: true,
      suggestOnTriggerCharacters: true,
      acceptSuggestionOnEnter: 'on',
      tabCompletion: 'on',
      wordBasedSuggestions: true,
      parameterHints: { enabled: true },
      autoClosingBrackets: 'always',
      autoClosingQuotes: 'always',
      formatOnPaste: true,
      formatOnType: true,
    });

    // Add keyboard shortcut for running code
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onRun?.();
    });
  };

  const validatePython = (code: string) => {
    const errors: CompilerError[] = [];
    const lines = code.split('\n');

    lines.forEach((line, index) => {
      const lineNum = index + 1;
      const trimmed = line.trim();

      // Check for missing colons in control structures
      if (
        /^(if|elif|else|for|while|def|class|try|except|finally|with)\b/.test(trimmed) &&
        !trimmed.endsWith(':') &&
        !trimmed.endsWith('\\')
      ) {
        errors.push({
          line: lineNum,
          column: line.length + 1,
          message: `Missing colon at the end of ${trimmed.split(' ')[0]} statement`,
          severity: 'error',
        });
      }

      // Check for incorrect indentation
      if (line.length > 0 && line !== trimmed) {
        const spaces = line.length - trimmed.length;
        if (spaces % 4 !== 0) {
          errors.push({
            line: lineNum,
            column: 1,
            message: 'Indentation should be a multiple of 4 spaces',
            severity: 'warning',
          });
        }
      }

      // Check for missing parentheses in print statements
      if (/print\s+[^(]/.test(trimmed)) {
        errors.push({
          line: lineNum,
          column: trimmed.indexOf('print') + 1,
          message: 'Missing parentheses in print statement. Use print() in Python 3',
          severity: 'error',
        });
      }

      // Check for undefined variables (basic check)
      const assignmentMatch = trimmed.match(/^(\w+)\s*=/);
      if (assignmentMatch) {
        // Variable definition, add to known variables
      }
    });

    setErrors(errors);
    updateMarkers(errors);
  };

  const validateCpp = (code: string) => {
    const errors: CompilerError[] = [];
    const lines = code.split('\n');

    lines.forEach((line, index) => {
      const lineNum = index + 1;
      const trimmed = line.trim();

      // Check for missing semicolons
      if (
        trimmed.length > 0 &&
        !trimmed.endsWith(';') &&
        !trimmed.endsWith('{') &&
        !trimmed.endsWith('}') &&
        !trimmed.startsWith('//') &&
        !trimmed.startsWith('#') &&
        !trimmed.startsWith('*') &&
        !/^(if|else|for|while|do|switch|case|default|namespace|class|struct|enum|public|private|protected)/.test(
          trimmed
        )
      ) {
        errors.push({
          line: lineNum,
          column: line.length + 1,
          message: 'Missing semicolon at end of statement',
          severity: 'error',
        });
      }

      // Check for common mistakes
      if (trimmed.includes('cout') && !trimmed.includes('<<')) {
        errors.push({
          line: lineNum,
          column: trimmed.indexOf('cout') + 1,
          message: 'cout requires << operator to output values',
          severity: 'error',
        });
      }

      if (trimmed.includes('cin') && !trimmed.includes('>>')) {
        errors.push({
          line: lineNum,
          column: trimmed.indexOf('cin') + 1,
          message: 'cin requires >> operator to read input',
          severity: 'error',
        });
      }

      // Check for missing namespace
      if (
        (trimmed.includes('cout') || trimmed.includes('cin') || trimmed.includes('endl')) &&
        !code.includes('using namespace std') &&
        !trimmed.includes('std::')
      ) {
        errors.push({
          line: lineNum,
          column: 1,
          message: 'Add "using namespace std;" or use std::cout, std::cin',
          severity: 'error',
        });
      }

      // Check for main function
      if (trimmed.includes('main(') && !trimmed.includes('int main')) {
        errors.push({
          line: lineNum,
          column: trimmed.indexOf('main') + 1,
          message: 'main function should return int',
          severity: 'warning',
        });
      }
    });

    // Check for missing return in main
    if (code.includes('int main') && !code.includes('return')) {
      const mainLine = lines.findIndex((l) => l.includes('int main')) + 1;
      errors.push({
        line: mainLine,
        column: 1,
        message: 'main function should have a return statement (usually "return 0;")',
        severity: 'warning',
      });
    }

    setErrors(errors);
    updateMarkers(errors);
  };

  const validateJavaScript = (code: string) => {
    const errors: CompilerError[] = [];
    const lines = code.split('\n');

    lines.forEach((line, index) => {
      const lineNum = index + 1;
      const trimmed = line.trim();

      // Check for var usage
      if (/\bvar\s+\w+/.test(trimmed)) {
        errors.push({
          line: lineNum,
          column: trimmed.indexOf('var') + 1,
          message: 'Avoid using "var". Use "let" or "const" instead',
          severity: 'warning',
        });
      }

      // Check for == instead of ===
      if (trimmed.includes('==') && !trimmed.includes('===') && !trimmed.includes('!==')) {
        errors.push({
          line: lineNum,
          column: trimmed.indexOf('==') + 1,
          message: 'Use === for equality comparison instead of ==',
          severity: 'warning',
        });
      }

      // Check for missing semicolons in certain cases
      if (
        trimmed.length > 0 &&
        !trimmed.endsWith(';') &&
        !trimmed.endsWith('{') &&
        !trimmed.endsWith('}') &&
        !trimmed.endsWith(',') &&
        !trimmed.startsWith('//') &&
        (trimmed.startsWith('const ') ||
          trimmed.startsWith('let ') ||
          trimmed.startsWith('return ') ||
          trimmed.includes(' = '))
      ) {
        errors.push({
          line: lineNum,
          column: line.length + 1,
          message: 'Consider adding a semicolon here',
          severity: 'info',
        });
      }
    });

    setErrors(errors);
    updateMarkers(errors);
  };

  const updateMarkers = (errors: CompilerError[]) => {
    if (!editorRef.current || !monacoRef.current) return;

    const monaco = monacoRef.current;
    const model = editorRef.current.getModel();
    if (!model) return;

    const markers = errors.map((error) => ({
      startLineNumber: error.line,
      startColumn: error.column,
      endLineNumber: error.line,
      endColumn: error.column + 10,
      message: error.message,
      severity:
        error.severity === 'error'
          ? monaco.MarkerSeverity.Error
          : error.severity === 'warning'
            ? monaco.MarkerSeverity.Warning
            : monaco.MarkerSeverity.Info,
    }));

    monaco.editor.setModelMarkers(model, 'validation', markers);
  };

  useEffect(() => {
    // Validate on value change
    if (value && editorRef.current) {
      if (language === 'cpp') {
        validateCpp(value);
      } else if (language === 'javascript' || language === 'typescript') {
        validateJavaScript(value);
      } else if (language === 'python') {
        validatePython(value);
      }
    }
  }, [value, language]);

  const handleEditorChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      onChange(newValue);
    }
  };

  return (
    <div className="relative">
      <Editor
        height={height}
        language={language === 'cpp' ? 'cpp' : language}
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme={darkMode ? 'vs-dark' : 'vs-light'}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: language === 'python' ? 4 : 2,
          insertSpaces: true,
          wordWrap: 'on',
          folding: true,
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
          glyphMargin: true,
          fixedOverflowWidgets: true,
        }}
      />

      {/* Problems Panel */}
      {errors.length > 0 && (
        <div className="border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 max-h-40 overflow-y-auto">
          <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              PROBLEMS ({errors.length})
            </span>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {errors.map((error, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => {
                  if (editorRef.current) {
                    editorRef.current.setPosition({ lineNumber: error.line, column: error.column });
                    editorRef.current.focus();
                  }
                }}
              >
                <div className="flex items-start gap-2">
                  <span
                    className={`text-xs font-semibold ${
                      error.severity === 'error'
                        ? 'text-red-600 dark:text-red-400'
                        : error.severity === 'warning'
                          ? 'text-yellow-600 dark:text-yellow-400'
                          : 'text-blue-600 dark:text-blue-400'
                    }`}
                  >
                    {error.severity === 'error' ? 'ERROR' : error.severity === 'warning' ? 'WARNING' : 'INFO'}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-gray-100">{error.message}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Line {error.line}, Column {error.column}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
