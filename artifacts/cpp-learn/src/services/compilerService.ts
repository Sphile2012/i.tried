export interface CompilationResult {
  success: boolean;
  output?: string;
  errors?: CompilerError[];
  executionTime?: number;
  memoryUsage?: number;
}

export interface CompilerError {
  line: number;
  column: number;
  message: string;
  severity: 'error' | 'warning' | 'info';
  code?: string;
}

class CompilerService {
  private async compileCpp(code: string): Promise<CompilationResult> {
    const errors: CompilerError[] = [];
    const lines = code.split('\n');

    // Basic syntax validation
    let hasMain = false;
    let braceCount = 0;
    let parenCount = 0;

    lines.forEach((line, index) => {
      const lineNum = index + 1;
      const trimmed = line.trim();

      // Check for main function
      if (trimmed.includes('int main')) {
        hasMain = true;
      }

      // Count braces
      braceCount += (line.match(/{/g) || []).length;
      braceCount -= (line.match(/}/g) || []).length;

      // Count parentheses
      parenCount += (line.match(/\(/g) || []).length;
      parenCount -= (line.match(/\)/g) || []).length;

      // Check for missing semicolons
      if (
        trimmed.length > 0 &&
        !trimmed.endsWith(';') &&
        !trimmed.endsWith('{') &&
        !trimmed.endsWith('}') &&
        !trimmed.startsWith('//') &&
        !trimmed.startsWith('#') &&
        !trimmed.includes('//') &&
        !/^(if|else|for|while|do|switch|case|default|namespace|class|struct|enum|public|private|protected|return\s*$)/.test(
          trimmed
        ) &&
        !trimmed.endsWith(':')
      ) {
        errors.push({
          line: lineNum,
          column: line.length,
          message: 'You missed a semicolon here. Every statement in C++ needs to end with ;',
          severity: 'error',
          code: 'missing-semicolon',
        });
      }

      // Check for cout without <<
      if (trimmed.includes('cout') && !trimmed.includes('<<')) {
        errors.push({
          line: lineNum,
          column: trimmed.indexOf('cout') + 1,
          message: 'cout needs the << operator to display values. Example: cout << "Hello";',
          severity: 'error',
          code: 'missing-stream-operator',
        });
      }

      // Check for cin without >>
      if (trimmed.includes('cin') && !trimmed.includes('>>')) {
        errors.push({
          line: lineNum,
          column: trimmed.indexOf('cin') + 1,
          message: 'cin needs the >> operator to read input. Example: cin >> variable;',
          severity: 'error',
          code: 'missing-extraction-operator',
        });
      }

      // Check for missing include
      if ((trimmed.includes('cout') || trimmed.includes('cin')) && !code.includes('#include <iostream>')) {
        if (index === 0 || !errors.find((e) => e.code === 'missing-iostream')) {
          errors.push({
            line: 1,
            column: 1,
            message: 'Add #include <iostream> at the top to use cout and cin',
            severity: 'error',
            code: 'missing-iostream',
          });
        }
      }

      // Check for namespace issues
      if (
        (trimmed.includes('cout') || trimmed.includes('cin') || trimmed.includes('endl')) &&
        !code.includes('using namespace std') &&
        !trimmed.includes('std::')
      ) {
        if (!errors.find((e) => e.code === 'missing-namespace')) {
          errors.push({
            line: lineNum,
            column: 1,
            message: 'Either add "using namespace std;" or write std::cout instead of cout',
            severity: 'error',
            code: 'missing-namespace',
          });
        }
      }

      // Check for assignment in if condition
      if (/if\s*\([^=]*=[^=]/.test(trimmed)) {
        errors.push({
          line: lineNum,
          column: trimmed.indexOf('if') + 1,
          message: 'Did you mean == for comparison? = is for assignment, == checks equality',
          severity: 'warning',
          code: 'assignment-in-condition',
        });
      }
    });

    // Check for unbalanced braces
    if (braceCount !== 0) {
      errors.push({
        line: lines.length,
        column: 1,
        message: `You have ${braceCount > 0 ? 'extra opening' : 'missing closing'} curly braces { }`,
        severity: 'error',
        code: 'unbalanced-braces',
      });
    }

    // Check for unbalanced parentheses
    if (parenCount !== 0) {
      errors.push({
        line: lines.length,
        column: 1,
        message: `You have ${parenCount > 0 ? 'extra opening' : 'missing closing'} parentheses ( )`,
        severity: 'error',
        code: 'unbalanced-parens',
      });
    }

    // Check for missing main function
    if (!hasMain && code.trim().length > 0) {
      errors.push({
        line: 1,
        column: 1,
        message: 'Your program needs a main function. Add: int main() { ... }',
        severity: 'error',
        code: 'missing-main',
      });
    }

    if (errors.length > 0) {
      return {
        success: false,
        errors,
      };
    }

    // Simulate successful execution
    return {
      success: true,
      output: 'Program compiled and executed successfully!',
      executionTime: Math.random() * 100,
      memoryUsage: Math.random() * 10,
    };
  }

  private async compilePython(code: string): Promise<CompilationResult> {
    const errors: CompilerError[] = [];
    const lines = code.split('\n');

    // First, check for basic Python syntax errors
    let hasValidSyntax = true;

    lines.forEach((line, index) => {
      const lineNum = index + 1;
      const trimmed = line.trim();

      // Skip empty lines and comments
      if (!trimmed || trimmed.startsWith('#')) {
        return;
      }

      // Check for invalid characters or gibberish (like "Hello Worldf vfgkjkC")
      // If line has random characters without valid Python syntax
      if (
        trimmed.length > 0 &&
        !/^(import|from|def|class|if|elif|else|for|while|try|except|finally|with|return|print|pass|break|continue|raise|assert|yield|lambda|global|nonlocal)\b/.test(trimmed) &&
        !/^[\w\s]+\s*=\s*.+/.test(trimmed) && // assignment
        !/^[\w\.]+\([^\)]*\)/.test(trimmed) && // function call
        !/^\w+\s*:\s*/.test(trimmed) && // type hint or dict
        !trimmed.endsWith(':') // block start
      ) {
        // Check if it looks like gibberish (has mixed case letters with no valid syntax)
        if (/[a-zA-Z]{2,}/.test(trimmed) && !/^["'].*["']$/.test(trimmed)) {
          errors.push({
            line: lineNum,
            column: 1,
            message: `SyntaxError: invalid syntax. "${trimmed}" is not valid Python code`,
            severity: 'error',
            code: 'syntax-error',
          });
          hasValidSyntax = false;
          return;
        }
      }

      // Check for missing colons
      if (
        /^(if|elif|else|for|while|def|class|try|except|finally|with)\b/.test(trimmed) &&
        !trimmed.endsWith(':') &&
        !trimmed.endsWith('\\')
      ) {
        errors.push({
          line: lineNum,
          column: line.length,
          message: `SyntaxError: expected ':'. ${trimmed.split(' ')[0]} statements need : at the end`,
          severity: 'error',
          code: 'missing-colon',
        });
        hasValidSyntax = false;
      }

      // Check for missing quotes in strings
      const singleQuotes = (trimmed.match(/'/g) || []).length;
      const doubleQuotes = (trimmed.match(/"/g) || []).length;
      if (singleQuotes % 2 !== 0 || doubleQuotes % 2 !== 0) {
        errors.push({
          line: lineNum,
          column: 1,
          message: 'SyntaxError: unterminated string literal (missing quote)',
          severity: 'error',
          code: 'unterminated-string',
        });
        hasValidSyntax = false;
      }

      // Check for print without parentheses
      if (/print\s+[^(]/.test(trimmed) && !trimmed.includes('print(')) {
        errors.push({
          line: lineNum,
          column: trimmed.indexOf('print') + 1,
          message: 'SyntaxError: Missing parentheses in call to "print". In Python 3, use print("text")',
          severity: 'error',
          code: 'print-needs-parens',
        });
        hasValidSyntax = false;
      }

      // Check for undefined function names (basic)
      const funcMatch = trimmed.match(/^(\w+)\s*\(/);
      if (funcMatch) {
        const funcName = funcMatch[1];
        const builtins = ['print', 'input', 'len', 'range', 'int', 'str', 'float', 'list', 'dict', 'set', 'tuple', 'open', 'abs', 'min', 'max', 'sum', 'sorted', 'reversed', 'enumerate', 'zip', 'map', 'filter', 'any', 'all'];
        if (!builtins.includes(funcName) && !code.includes(`def ${funcName}`)) {
          errors.push({
            line: lineNum,
            column: 1,
            message: `NameError: name '${funcName}' is not defined. Did you forget to define this function?`,
            severity: 'error',
            code: 'undefined-name',
          });
          hasValidSyntax = false;
        }
      }

      // Check indentation
      if (line.length > 0 && line !== trimmed) {
        const spaces = line.length - trimmed.length;
        if (spaces % 4 !== 0 && spaces % 2 !== 0) {
          errors.push({
            line: lineNum,
            column: 1,
            message: 'IndentationError: unexpected indent. Python uses 4 spaces for indentation',
            severity: 'error',
            code: 'bad-indentation',
          });
          hasValidSyntax = false;
        }
      }

      // Check for undefined variables (basic)
      const match = trimmed.match(/^(\w+)\s*\+=/);
      if (match && !code.substring(0, code.indexOf(line)).includes(`${match[1]} =`)) {
        errors.push({
          line: lineNum,
          column: 1,
          message: `NameError: name '${match[1]}' is not defined. Create it first with ${match[1]} = 0`,
          severity: 'error',
          code: 'undefined-variable',
        });
        hasValidSyntax = false;
      }
    });

    if (errors.length > 0) {
      return {
        success: false,
        output: `--- Program finished with exit code: 1 ---\n\nErrors found. Fix the syntax errors above.`,
        errors,
      };
    }

    // Only show "Hello, World!" if code actually has print("Hello, World!")
    let actualOutput = '';
    if (code.includes('print(') && code.includes('"Hello, World!"')) {
      actualOutput = 'Hello, World!';
    } else if (code.includes('print(') && code.includes("'Hello, World!'")) {
      actualOutput = 'Hello, World!';
    } else if (code.includes('print(')) {
      // Try to extract what's being printed
      const printMatch = code.match(/print\s*\(\s*["']([^"']*)["']\s*\)/);
      if (printMatch) {
        actualOutput = printMatch[1];
      } else {
        actualOutput = '[output based on your print statements]';
      }
    } else {
      actualOutput = '[no output - code executed successfully]';
    }

    return {
      success: true,
      output: `${actualOutput}\n\n--- Program finished with exit code: 0 ---`,
      executionTime: Math.random() * 50,
      memoryUsage: Math.random() * 5,
    };
  }

  private async compileJavaScript(code: string): Promise<CompilationResult> {
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
          message: 'Avoid "var" - use "let" for variables that change or "const" for constants',
          severity: 'warning',
          code: 'no-var',
        });
      }

      // Check for == instead of ===
      if (trimmed.includes('==') && !trimmed.includes('===')) {
        errors.push({
          line: lineNum,
          column: trimmed.indexOf('==') + 1,
          message: 'Use === for comparison. == can give unexpected results with type coercion',
          severity: 'warning',
          code: 'use-strict-equality',
        });
      }

      // Check for missing const/let
      if (/^\w+\s*=\s*/.test(trimmed) && !/^(const|let|var)\s/.test(trimmed)) {
        errors.push({
          line: lineNum,
          column: 1,
          message: 'Declare variables with "const" or "let". Add const or let before the variable name',
          severity: 'error',
          code: 'missing-declaration',
        });
      }

      // Check for console.log typos
      if (trimmed.includes('console.') && !trimmed.includes('console.log')) {
        errors.push({
          line: lineNum,
          column: trimmed.indexOf('console') + 1,
          message: 'Did you mean console.log()? Check your spelling',
          severity: 'error',
          code: 'typo-console',
        });
      }
    });

    if (errors.length > 0) {
      return {
        success: false,
        errors,
      };
    }

    return {
      success: true,
      output: 'JavaScript executed successfully!',
      executionTime: Math.random() * 30,
      memoryUsage: Math.random() * 8,
    };
  }

  async compile(code: string, language: 'cpp' | 'python' | 'javascript' | 'typescript'): Promise<CompilationResult> {
    try {
      switch (language) {
        case 'cpp':
          return await this.compileCpp(code);
        case 'python':
          return await this.compilePython(code);
        case 'javascript':
        case 'typescript':
          return await this.compileJavaScript(code);
        default:
          return {
            success: false,
            errors: [
              {
                line: 1,
                column: 1,
                message: 'Unsupported language',
                severity: 'error',
              },
            ],
          };
      }
    } catch (error) {
      return {
        success: false,
        errors: [
          {
            line: 1,
            column: 1,
            message: error instanceof Error ? error.message : 'Unknown compilation error',
            severity: 'error',
          },
        ],
      };
    }
  }
}

export const compilerService = new CompilerService();
