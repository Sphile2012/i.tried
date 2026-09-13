import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useUser } from '../context/UserContext';
import { CheckCircle2, XCircle, Award, Loader2 } from 'lucide-react';

interface QuizQuestion {
  id: string;
  questionText: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
}

interface QuizAnswer {
  questionId: string;
  selectedAnswer: 'A' | 'B' | 'C' | 'D';
}

type ProficiencyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';

export default function OnboardingQuiz() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    assignedLevel: ProficiencyLevel;
    correctAnswers: number;
    totalQuestions: number;
  } | null>(null);
  const [, setLocation] = useLocation();
  const { setUser, user } = useUser();

  useEffect(() => {
    fetchQuizQuestions();
  }, []);

  const fetchQuizQuestions = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLocation('/auth/login');
        return;
      }

      const response = await fetch('http://localhost:3000/api/onboarding/quiz', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setQuestions(data.questions);
      } else {
        console.error('Failed to fetch quiz questions');
      }
    } catch (error) {
      console.error('Error fetching quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answer: 'A' | 'B' | 'C' | 'D') => {
    const currentQuestion = questions[currentQuestionIndex];
    const existingAnswerIndex = answers.findIndex(
      (a) => a.questionId === currentQuestion.id,
    );

    if (existingAnswerIndex >= 0) {
      const newAnswers = [...answers];
      newAnswers[existingAnswerIndex] = {
        questionId: currentQuestion.id,
        selectedAnswer: answer,
      };
      setAnswers(newAnswers);
    } else {
      setAnswers([
        ...answers,
        { questionId: currentQuestion.id, selectedAnswer: answer },
      ]);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (answers.length !== questions.length) {
      alert('Please answer all questions before submitting');
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        'http://localhost:3000/api/onboarding/quiz/submit',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ answers }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        setResult(data);

        // Update user context with new level
        if (user) {
          setUser({
            ...user,
            level: data.assignedLevel,
          });
        }
      } else {
        console.error('Failed to submit quiz');
        alert('Failed to submit quiz. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleContinue = () => {
    setLocation('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Congratulations!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            You've been assigned to the <span className="font-bold text-amber-600">{result.assignedLevel}</span> level
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {result.correctAnswers}/{result.totalQuestions}
                </div>
                <div className="text-sm text-gray-600">Correct Answers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {Math.round(result.score)}%
                </div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-blue-900 mb-2">
              What does {result.assignedLevel} level mean?
            </h3>
            {result.assignedLevel === 'BEGINNER' && (
              <p className="text-sm text-blue-800">
                You'll get a focused, step-by-step learning experience with helpful hints and visual explanations to build a strong foundation.
              </p>
            )}
            {result.assignedLevel === 'INTERMEDIATE' && (
              <p className="text-sm text-blue-800">
                You'll have access to a flexible workspace with standard development tools and intermediate challenges to advance your skills.
              </p>
            )}
            {result.assignedLevel === 'EXPERT' && (
              <p className="text-sm text-blue-800">
                You'll get full IDE-style features, advanced debugging tools, and access to all expert-level challenges for maximum growth.
              </p>
            )}
          </div>

          <button
            onClick={handleContinue}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers.find(
    (a) => a.questionId === currentQuestion?.id,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Programming Skills Assessment
          </h1>
          <p className="text-gray-600">
            Help us understand your level to personalize your learning experience
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span>{answers.length} answered</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQuestion?.questionText}
            </h2>

            <div className="space-y-3">
              {currentQuestion &&
                Object.entries(currentQuestion.options).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() =>
                      handleAnswerSelect(key as 'A' | 'B' | 'C' | 'D')
                    }
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      currentAnswer?.selectedAnswer === key
                        ? 'border-amber-600 bg-amber-50'
                        : 'border-gray-200 hover:border-amber-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          currentAnswer?.selectedAnswer === key
                            ? 'border-amber-600 bg-amber-600'
                            : 'border-gray-300'
                        }`}
                      >
                        {currentAnswer?.selectedAnswer === key && (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="font-medium text-gray-700">{key}.</span>
                      <span className="text-gray-800">{value}</span>
                    </div>
                  </button>
                ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-2 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={submitting || answers.length !== questions.length}
                className="px-8 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Quiz'
                )}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
