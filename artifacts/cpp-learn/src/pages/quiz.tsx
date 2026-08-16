import { useState } from 'react';
import { useParams, Link } from 'wouter';
import { Brain, CheckCircle, XCircle, ArrowRight, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const quizzes: Record<string, { title: string; questions: QuizQuestion[] }> = {
  '2-4': {
    title: 'C++ Variables Quiz',
    questions: [
      {
        id: 1,
        question: 'Which keyword declares an integer in C++?',
        options: ['int', 'integer', 'num', 'var'],
        correct: 0,
        explanation: 'In C++, "int" is the keyword used to declare an integer variable. For example: int age = 25; The other options are not valid C++ keywords for declaring integers.',
      },
      {
        id: 2,
        question: 'What is the size of a char in C++?',
        options: ['1 byte', '2 bytes', '4 bytes', '8 bytes'],
        correct: 0,
        explanation: 'A char in C++ is guaranteed to be exactly 1 byte in size, which is defined as the smallest addressable unit of memory. It can store values from -128 to 127 (signed) or 0 to 255 (unsigned).',
      },
      {
        id: 3,
        question: 'Which type is used for decimal numbers in C++?',
        options: ['int', 'float', 'char', 'bool'],
        correct: 1,
        explanation: 'The "float" type is used for single-precision floating-point (decimal) numbers. For higher precision, "double" can be used. "int" is for integers, "char" for characters, and "bool" for true/false values.',
      },
      {
        id: 4,
        question: 'What does the "const" keyword mean in C++?',
        options: ['The value can change', 'The value cannot be changed after initialization', 'The variable is global', 'The variable is local only'],
        correct: 1,
        explanation: 'The "const" keyword makes a variable read-only. Once a const variable is initialized, its value cannot be modified. This is useful for defining constants like: const double PI = 3.14159;',
      },
      {
        id: 5,
        question: 'Which of the following is a valid C++ variable name?',
        options: ['2name', 'my-var', '_score', 'class'],
        correct: 2,
        explanation: '"_score" is valid because variable names can start with an underscore. "2name" is invalid (cannot start with a digit), "my-var" is invalid (hyphens not allowed), and "class" is invalid (it is a reserved C++ keyword).',
      },
    ],
  },
  'py-quiz-1': {
    title: 'Python Basics Quiz',
    questions: [
      {
        id: 1,
        question: 'How do you create a variable in Python?',
        options: ['var x = 5', 'x = 5', 'int x = 5', 'declare x = 5'],
        correct: 1,
        explanation: 'In Python, you simply assign a value to a name to create a variable: x = 5. Python is dynamically typed, so no type declaration is needed.',
      },
      {
        id: 2,
        question: 'What is the correct way to print "Hello World" in Python?',
        options: ['print("Hello World")', 'echo("Hello World")', 'console.log("Hello World")', 'printf("Hello World")'],
        correct: 0,
        explanation: 'The print() function is used to output text in Python. The correct syntax is: print("Hello World")',
      },
      {
        id: 3,
        question: 'Which data type is used for text in Python?',
        options: ['text', 'string', 'str', 'char[]'],
        correct: 2,
        explanation: 'In Python, the "str" (string) type is used for text. For example: name = "Alice" creates a string variable.',
      },
      {
        id: 4,
        question: 'What does the len() function do in Python?',
        options: ['Returns the largest item', 'Returns the length of an object', 'Returns the last item', 'Returns a list of numbers'],
        correct: 1,
        explanation: 'The len() function returns the number of items in an object. For example, len("hello") returns 5, and len([1, 2, 3]) returns 3.',
      },
      {
        id: 5,
        question: 'How do you start a comment in Python?',
        options: ['//', '/*', '#', '<!--'],
        correct: 2,
        explanation: 'In Python, comments start with the # symbol. Everything after # on that line is a comment. For multi-line comments, you can use triple quotes: """ ... """',
      },
    ],
  },
  'js-quiz-1': {
    title: 'JavaScript Fundamentals Quiz',
    questions: [
      {
        id: 1,
        question: 'Which keyword declares a block-scoped variable in JavaScript?',
        options: ['var', 'let', 'function', 'global'],
        correct: 1,
        explanation: 'The "let" keyword declares a block-scoped variable in JavaScript. "var" is function-scoped, while "let" and "const" are block-scoped.',
      },
      {
        id: 2,
        question: 'What is the output of: typeof null in JavaScript?',
        options: ['"null"', '"undefined"', '"object"', '"number"'],
        correct: 2,
        explanation: 'typeof null returns "object" in JavaScript. This is a well-known quirk/bug in JavaScript that has been preserved for backward compatibility.',
      },
      {
        id: 3,
        question: 'Which method converts a string to an integer in JavaScript?',
        options: ['parseInt()', 'toInt()', 'convertInt()', 'stringToInt()'],
        correct: 0,
        explanation: 'parseInt() is the built-in JavaScript function to convert a string to an integer. Example: parseInt("42") returns 42.',
      },
      {
        id: 4,
        question: 'What does "===" check in JavaScript?',
        options: ['Value only', 'Type only', 'Value and type', 'Reference only'],
        correct: 2,
        explanation: 'The "===" operator checks both value AND type (strict equality). For example, 5 === "5" is false because the types are different, while 5 == "5" is true (loose equality with type coercion).',
      },
      {
        id: 5,
        question: 'How do you define an arrow function in JavaScript?',
        options: ['function() => {}', '() => {}', 'func() {}', '=> () {}'],
        correct: 1,
        explanation: 'Arrow functions use the => syntax: () => {} for no parameters, (x) => {} for one parameter, and (x, y) => {} for multiple parameters.',
      },
    ],
  },
};

export default function QuizPage() {
  const { lessonId } = useParams();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const quiz = quizzes[lessonId as string] || quizzes['2-4'];
  const question = quiz.questions[current];
  const isLast = current === quiz.questions.length - 1;

  const handleSelect = (index: number) => {
    if (showExplanation) return;
    setSelected(index);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setShowExplanation(true);
  };

  const handleNext = () => {
    setAnswers([...answers, selected!]);
    setShowExplanation(false);
    if (isLast) {
      setShowResult(true);
    } else {
      setCurrent(current + 1);
      setSelected(null);
    }
  };

  const score = answers.filter((a, i) => a === quiz.questions[i].correct).length;
  const percentage = Math.round((score / quiz.questions.length) * 100);
  const passed = percentage >= 70;

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-8 text-center">
            <div className={`inline-flex h-20 w-20 items-center justify-center rounded-full mb-4 ${passed ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
              {passed ? <CheckCircle className="h-10 w-10 text-green-500" /> : <XCircle className="h-10 w-10 text-red-500" />}
            </div>
            <h1 className="text-3xl font-bold mb-2 text-white">{passed ? 'Congratulations!' : 'Keep Practicing!'}</h1>
            <p className="text-slate-400 mb-4">You scored {score} out of {quiz.questions.length}</p>
            <p className="text-4xl font-bold mb-6 text-white">{percentage}%</p>
            <Badge variant={passed ? 'success' : 'destructive'}>{passed ? 'PASSED' : 'FAILED'}</Badge>

            <div className="mt-8 space-y-3 text-left">
              <h3 className="text-lg font-semibold text-white mb-3">Review Your Answers</h3>
              {quiz.questions.map((q, i) => (
                <div key={q.id} className={`rounded-lg border p-4 ${answers[i] === q.correct ? 'border-green-700/40 bg-green-950/20' : 'border-red-700/40 bg-red-950/20'}`}>
                  <div className="flex items-start gap-2">
                    {answers[i] === q.correct ? (
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white mb-1">{q.question}</p>
                      <p className="text-xs text-slate-400">Your answer: {q.options[answers[i]]}</p>
                      {answers[i] !== q.correct && (
                        <p className="text-xs text-green-400 mt-1">Correct answer: {q.options[q.correct]}</p>
                      )}
                      <p className="text-xs text-slate-500 mt-2 flex items-start gap-1">
                        <Lightbulb className="h-3 w-3 text-yellow-500 flex-shrink-0 mt-0.5" />
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3 justify-center">
              <Link href="/lessons">
                <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">Back to Courses</Button>
              </Link>
              <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700 text-white">Retry Quiz</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-purple-400" />
          <h1 className="text-xl font-bold text-white">{quiz.title}</h1>
        </div>
        <Badge variant="secondary">Question {current + 1} of {quiz.questions.length}</Badge>
      </div>

      <Card className="border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {question.options.map((opt, i) => {
            const isSelected = selected === i;
            const isCorrect = i === question.correct;
            let className = 'border-slate-800 hover:border-slate-700 text-slate-300';
            if (showExplanation) {
              if (isCorrect) {
                className = 'border-green-500 bg-green-500/10 text-white';
              } else if (isSelected && !isCorrect) {
                className = 'border-red-500 bg-red-500/10 text-white';
              } else {
                className = 'border-slate-800 text-slate-400';
              }
            } else if (isSelected) {
              className = 'border-blue-500 bg-blue-500/10 text-white';
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={showExplanation}
                className={`w-full text-left rounded-lg border p-4 transition-colors ${className} ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                {opt}
                {showExplanation && isCorrect && <CheckCircle className="inline-block h-4 w-4 text-green-500 ml-2" />}
                {showExplanation && isSelected && !isCorrect && <XCircle className="inline-block h-4 w-4 text-red-500 ml-2" />}
              </button>
            );
          })}
        </CardContent>
      </Card>

      {showExplanation && (
        <Card className="border-yellow-500/30 bg-yellow-950/10">
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-yellow-400 mb-1">Explanation</p>
                <p className="text-sm text-slate-300">{question.explanation}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between items-center">
        <span className="text-sm text-slate-400">Question {current + 1} of {quiz.questions.length}</span>
        {!showExplanation ? (
          <Button onClick={handleSubmit} disabled={selected === null} className="bg-blue-600 hover:bg-blue-700 text-white">
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white">
            {isLast ? 'Finish Quiz' : 'Next Question'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}