import { useState, useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  Clock,
  Award,
  TrendingUp,
  RefreshCw,
  Code,
  HelpCircle,
  Brain,
  Target,
  Zap,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';

// Question types
type QuestionType = 'mcq' | 'truefalse' | 'fillcode' | 'debug' | 'ordering';

interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[]; // For MCQ
  correctAnswer: string | string[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  codeSnippet?: string; // For fill-in-code and debug
  blanks?: number[]; // For fill-in-code
}

interface QuizResult {
  score: number;
  totalPoints: number;
  correctAnswers: number;
  totalQuestions: number;
  xpEarned: number;
  passed: boolean;
  timeSpent: number;
}

// Sample quiz data
const sampleQuiz: Question[] = [
  {
    id: 1,
    type: 'mcq',
    question: 'What is the correct way to declare a pointer to an integer in C++?',
    options: [
      'int ptr;',
      'int* ptr;',
      'ptr int;',
      'pointer<int> ptr;'
    ],
    correctAnswer: 'int* ptr;',
    explanation: 'In C++, a pointer to an integer is declared using the syntax `int* ptr;` or `int *ptr;`. The asterisk (*) indicates that the variable is a pointer.',
    difficulty: 'easy',
    points: 10,
  },
  {
    id: 2,
    type: 'truefalse',
    question: 'A destructor can be virtual in C++. Is this statement true or false?',
    correctAnswer: 'true',
    explanation: 'Yes, destructors can and often should be virtual in base classes when you have polymorphism. This ensures the correct destructor is called when deleting through a base class pointer.',
    difficulty: 'medium',
    points: 15,
  },
  {
    id: 3,
    type: 'fillcode',
    question: 'Complete the code to print "Hello World" using cout:',
    codeSnippet: `#include <iostream>
using namespace std;

int main() {
    ___ << "Hello World" << endl;
    return 0;
}`,
    blanks: [4],
    correctAnswer: 'cout',
    explanation: 'The `cout` object from the iostream library is used with the insertion operator (<<) to output text to the console.',
    difficulty: 'easy',
    points: 10,
  },
  {
    id: 4,
    type: 'debug',
    question: 'Find and fix the bug in this code that should calculate the sum of two numbers:',
    codeSnippet: `int add(int a, int b) {
    return a - b;  // Bug here
}`,
    correctAnswer: 'return a + b;',
    explanation: 'The function should return the sum (a + b), not the difference (a - b). The operator was incorrect.',
    difficulty: 'easy',
    points: 15,
  },
  {
    id: 5,
    type: 'mcq',
    question: 'Which of the following is NOT a valid access specifier in C++?',
    options: [
      'public',
      'private',
      'protected',
      'internal'
    ],
    correctAnswer: 'internal',
    explanation: 'C++ has three access specifiers: public, private, and protected. "internal" is not a valid C++ access specifier (though it exists in C#).',
    difficulty: 'medium',
    points: 15,
  },
  {
    id: 6,
    type: 'ordering',
    question: 'Arrange the following in the correct order of execution in a C++ program:',
    options: [
      'Main function executes',
      'Preprocessor directives processed',
      'Compilation and linking',
      'Program terminates'
    ],
    correctAnswer: ['Preprocessor directives processed', 'Compilation and linking', 'Main function executes', 'Program terminates'],
    explanation: 'The C++ compilation process follows this order: preprocessing (handling #include, #define), compilation and linking, then execution starting from main(), and finally program termination.',
    difficulty: 'medium',
    points: 20,
  },
];

export default function QuizEnhanced() {
  const { id } = useParams();
  const { user, refreshProfile } = useAuth();
  const { toast } = useToast();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [orderedItems, setOrderedItems] = useState<string[]>([]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (quizStarted && !quizCompleted) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, quizCompleted]);

  const question = sampleQuiz[currentQuestion];
  const totalQuestions = sampleQuiz.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswer = (answer: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [question.id]: answer }));
  };

  const checkAnswer = () => {
    const userAnswer = answers[question.id];
    if (!userAnswer) return;

    let isCorrect = false;
    
    if (question.type === 'ordering') {
      isCorrect = JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer);
    } else if (Array.isArray(question.correctAnswer)) {
      isCorrect = JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer);
    } else {
      isCorrect = (userAnswer as string).toLowerCase().trim() === (question.correctAnswer as string).toLowerCase().trim();
    }

    // Calculate XP
    const xpMultiplier = question.difficulty === 'easy' ? 1 : question.difficulty === 'medium' ? 1.5 : 2;
    const xpEarned = Math.round(question.points * xpMultiplier);

    // Update user XP (in real app, this would be an API call)
    if (isCorrect && user) {
      toast({
        title: 'Correct! 🎉',
        description: `You earned ${xpEarned} XP!`,
      });
    }

    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowExplanation(false);
      setOrderedItems([]);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    let correctCount = 0;
    let totalPoints = 0;
    let earnedPoints = 0;

    sampleQuiz.forEach((q) => {
      const userAnswer = answers[q.id];
      if (!userAnswer) return;

      let isCorrect = false;
      if (q.type === 'ordering') {
        isCorrect = JSON.stringify(userAnswer) === JSON.stringify(q.correctAnswer);
      } else if (Array.isArray(q.correctAnswer)) {
        isCorrect = JSON.stringify(userAnswer) === JSON.stringify(q.correctAnswer);
      } else {
        isCorrect = (userAnswer as string).toLowerCase().trim() === (q.correctAnswer as string).toLowerCase().trim();
      }

      if (isCorrect) {
        correctCount++;
        const multiplier = q.difficulty === 'easy' ? 1 : q.difficulty === 'medium' ? 1.5 : 2;
        earnedPoints += Math.round(q.points * multiplier);
      }
      totalPoints += q.points;
    });

    const quizResult: QuizResult = {
      score: Math.round((earnedPoints / totalPoints) * 100),
      totalPoints,
      correctAnswers: correctCount,
      totalQuestions,
      xpEarned: earnedPoints,
      passed: (correctCount / totalQuestions) >= 0.7, // 70% passing
      timeSpent: timeElapsed,
    };

    setResult(quizResult);
    setQuizCompleted(true);
    setQuizStarted(false);

    // Show completion toast
    toast({
      title: quizResult.passed ? 'Quiz Completed! 🎉' : 'Quiz Completed',
      description: `You scored ${quizResult.score}% and earned ${quizResult.xpEarned} XP!`,
    });
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowExplanation(false);
    setQuizCompleted(false);
    setQuizStarted(true);
    setResult(null);
    setTimeElapsed(0);
    setOrderedItems([]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getQuestionTypeIcon = (type: QuestionType) => {
    switch (type) {
      case 'mcq': return <Target className="h-4 w-4" />;
      case 'truefalse': return <HelpCircle className="h-4 w-4" />;
      case 'fillcode': return <Code className="h-4 w-4" />;
      case 'debug': return <AlertTriangle className="h-4 w-4" />;
      case 'ordering': return <Brain className="h-4 w-4" />;
      default: return <HelpCircle className="h-4 w-4" />;
    }
  };

  // Quiz completion screen
  if (quizCompleted && result) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Link href="/lessons" className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300">
          <ArrowLeft className="h-4 w-4" />
          Back to Lessons
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="overflow-hidden">
            <div className={`h-32 flex items-center justify-center ${result.passed ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-orange-500 to-red-500'}`}>
              {result.passed ? (
                <Award className="h-16 w-16 text-white" />
              ) : (
                <RefreshCw className="h-16 w-16 text-white" />
              )}
            </div>
            <CardContent className="p-8 text-center space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {result.passed ? 'Congratulations!' : 'Keep Practicing!'}
                </h1>
                <p className="text-slate-400">
                  {result.passed
                    ? 'You passed the quiz with flying colors!'
                    : 'You need 70% or higher to pass. Try again!'}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <p className="text-3xl font-bold text-white">{result.score}%</p>
                  <p className="text-sm text-slate-400">Score</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <p className="text-3xl font-bold text-white">{result.correctAnswers}/{result.totalQuestions}</p>
                  <p className="text-sm text-slate-400">Correct</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <p className="text-3xl font-bold text-yellow-400">+{result.xpEarned}</p>
                  <p className="text-sm text-slate-400">XP Earned</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <p className="text-3xl font-bold text-white">{formatTime(result.timeSpent)}</p>
                  <p className="text-sm text-slate-400">Time</p>
                </div>
              </div>

              <div className="flex gap-3 justify-center flex-wrap">
                <Button onClick={restartQuiz} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                <Link href="/lessons">
                  <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                    Continue Learning
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Quiz start screen
  if (!quizStarted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Link href="/lessons" className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300">
          <ArrowLeft className="h-4 w-4" />
          Back to Lessons
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-slate-800">
            <CardContent className="p-8 text-center space-y-6">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">C++ Fundamentals Quiz</h1>
                <p className="text-slate-400">Test your knowledge with {totalQuestions} questions</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <p className="text-sm text-slate-400">Questions</p>
                  <p className="text-xl font-bold text-white">{totalQuestions}</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <p className="text-sm text-slate-400">Passing Score</p>
                  <p className="text-xl font-bold text-white">70%</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <p className="text-sm text-slate-400">Question Types</p>
                  <p className="text-xl font-bold text-white">5 types</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <p className="text-sm text-slate-400">Time Limit</p>
                  <p className="text-xl font-bold text-white">No limit</p>
                </div>
              </div>

              <Button
                onClick={() => setQuizStarted(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
                size="lg"
              >
                Start Quiz
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Quiz in progress
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/lessons" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Exit Quiz
        </Link>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            {formatTime(timeElapsed)}
          </Badge>
          <Badge className={getDifficultyColor(question.difficulty)}>
            {question.difficulty.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Question {currentQuestion + 1} of {totalQuestions}</span>
          <span className="text-slate-400">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-slate-800">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                {getQuestionTypeIcon(question.type)}
                <span className="text-sm text-slate-400 capitalize">{question.type === 'mcq' ? 'Multiple Choice' : question.type === 'truefalse' ? 'True/False' : question.type === 'fillcode' ? 'Fill in Code' : question.type === 'debug' ? 'Debug Code' : 'Order Items'}</span>
              </div>
              <CardTitle className="text-xl text-white">{question.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Code snippet for fill-in-code and debug */}
              {question.codeSnippet && (
                <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto">
                  <code className="text-sm text-slate-300 font-mono whitespace-pre">
                    {question.codeSnippet}
                  </code>
                </pre>
              )}

              {/* MCQ Options */}
              {question.type === 'mcq' && question.options && (
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => !showExplanation && handleAnswer(option)}
                      disabled={showExplanation}
                      className={`w-full p-4 rounded-lg border text-left transition-all ${
                        showExplanation
                          ? option === question.correctAnswer
                            ? 'border-green-500 bg-green-500/10 text-green-400'
                            : answers[question.id] === option
                            ? 'border-red-500 bg-red-500/10 text-red-400'
                            : 'border-slate-800 text-slate-400'
                          : answers[question.id] === option
                          ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                          : 'border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                      }`}
                    >
                      <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                      {showExplanation && option === question.correctAnswer && (
                        <CheckCircle className="inline ml-2 h-4 w-4 text-green-500" />
                      )}
                      {showExplanation && answers[question.id] === option && option !== question.correctAnswer && (
                        <XCircle className="inline ml-2 h-4 w-4 text-red-500" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* True/False */}
              {question.type === 'truefalse' && (
                <div className="space-y-3">
                  {['true', 'false'].map((option) => (
                    <button
                      key={option}
                      onClick={() => !showExplanation && handleAnswer(option)}
                      disabled={showExplanation}
                      className={`w-full p-4 rounded-lg border text-left transition-all capitalize ${
                        showExplanation
                          ? option === question.correctAnswer
                            ? 'border-green-500 bg-green-500/10 text-green-400'
                            : answers[question.id] === option
                            ? 'border-red-500 bg-red-500/10 text-red-400'
                            : 'border-slate-800 text-slate-400'
                          : answers[question.id] === option
                          ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                          : 'border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                      }`}
                    >
                      {option}
                      {showExplanation && option === question.correctAnswer && (
                        <CheckCircle className="inline ml-2 h-4 w-4 text-green-500" />
                      )}
                      {showExplanation && answers[question.id] === option && option !== question.correctAnswer && (
                        <XCircle className="inline ml-2 h-4 w-4 text-red-500" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Fill in Code */}
              {question.type === 'fillcode' && (
                <div className="space-y-4">
                  <Textarea
                    placeholder="Type your answer here..."
                    value={(answers[question.id] as string) || ''}
                    onChange={(e) => handleAnswer(e.target.value)}
                    disabled={showExplanation}
                    className="bg-slate-950 border-slate-800 text-white font-mono"
                    rows={2}
                  />
                  {showExplanation && (
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <p className="text-green-400 font-medium">Correct answer: {question.correctAnswer as string}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Debug */}
              {question.type === 'debug' && (
                <div className="space-y-4">
                  <Textarea
                    placeholder="Write the corrected line of code..."
                    value={(answers[question.id] as string) || ''}
                    onChange={(e) => handleAnswer(e.target.value)}
                    disabled={showExplanation}
                    className="bg-slate-950 border-slate-800 text-white font-mono"
                    rows={2}
                  />
                  {showExplanation && (
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <p className="text-green-400 font-medium">Correct answer: {question.correctAnswer as string}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Ordering */}
              {question.type === 'ordering' && question.options && (
                <div className="space-y-3">
                  <p className="text-sm text-slate-400">Click items to arrange them in the correct order:</p>
                  <div className="space-y-2">
                    {orderedItems.length === 0 && question.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setOrderedItems([option])}
                        className="w-full p-3 rounded-lg border border-slate-800 text-left text-slate-300 hover:bg-slate-800/50 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                    {orderedItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <span className="flex-1 p-3 rounded-lg border border-slate-800 bg-slate-900/50 text-slate-300">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                  {showExplanation && (
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <p className="text-green-400 font-medium">Correct order:</p>
                      <ol className="list-decimal list-inside text-green-300 mt-2">
                        {(question.correctAnswer as string[]).map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              )}

              {/* Explanation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg"
                >
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    Explanation
                  </h4>
                  <p className="text-slate-300">{question.explanation}</p>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                {!showExplanation ? (
                  <Button
                    onClick={checkAnswer}
                    disabled={!answers[question.id]}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Check Answer
                  </Button>
                ) : (
                  <Button
                    onClick={nextQuestion}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {currentQuestion < totalQuestions - 1 ? 'Next Question' : 'See Results'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}