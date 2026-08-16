import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Code,
  Brain,
  MessageSquare,
  Lightbulb,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Target,
  TrendingUp,
  Users,
  BookOpen,
  Play,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Interview question categories
interface InterviewQuestion {
  id: number;
  question: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  answer: string;
  tips: string[];
  codeExample?: string;
}

const interviewQuestions: InterviewQuestion[] = [
  {
    id: 1,
    question: 'What is the difference between a pointer and a reference in C++?',
    category: 'C++ Fundamentals',
    difficulty: 'easy',
    answer: 'Pointers can be reassigned and can be null, while references must be initialized when declared and cannot be null. Pointers use the * operator for declaration and & for getting address, while references use & for declaration and act as aliases.',
    tips: [
      'Mention that pointers can be reseated',
      'Explain that references are aliases',
      'Discuss memory addresses vs direct access',
    ],
  },
  {
    id: 2,
    question: 'Explain the concept of virtual functions and polymorphism.',
    category: 'OOP',
    difficulty: 'medium',
    answer: 'Virtual functions enable runtime polymorphism. When a base class pointer points to a derived class object, virtual functions ensure the correct derived class method is called. This is achieved through the virtual table (vtable) mechanism.',
    tips: [
      'Explain vtable and vptr',
      'Discuss late binding vs early binding',
      'Mention pure virtual functions and abstract classes',
    ],
  },
  {
    id: 3,
    question: 'What is RAII and why is it important in C++?',
    category: 'Memory Management',
    difficulty: 'medium',
    answer: 'RAII (Resource Acquisition Is Initialization) is a programming idiom where resource management is tied to object lifetime. Resources are acquired in constructors and released in destructors, ensuring proper cleanup even during exceptions.',
    tips: [
      'Explain the connection between resource lifetime and object lifetime',
      'Give examples like smart pointers and file handles',
      'Discuss exception safety',
    ],
    codeExample: `class FileHandler {
    FILE* file;
public:
    FileHandler(const char* name) {
        file = fopen(name, "r");  // Acquire
    }
    ~FileHandler() {
        if (file) fclose(file);   // Release
    }
};`,
  },
  {
    id: 4,
    question: 'How does move semantics work in C++11?',
    category: 'Modern C++',
    difficulty: 'hard',
    answer: 'Move semantics allows transferring resources from one object to another without copying. Rvalue references (&&) enable move constructors and move assignment operators, which can "steal" resources from temporary objects.',
    tips: [
      'Explain lvalues vs rvalues',
      'Discuss std::move',
      'Mention the Rule of Five',
    ],
  },
  {
    id: 5,
    question: 'What are templates and how do they work?',
    category: 'Templates',
    difficulty: 'medium',
    answer: 'Templates enable generic programming by allowing functions and classes to work with any data type. The compiler generates specific implementations for each type used (template instantiation).',
    tips: [
      'Explain template specialization',
      'Discuss type deduction',
      'Mention SFINAE if asked about advanced topics',
    ],
  },
  {
    id: 6,
    question: 'Describe the difference between stack and heap memory.',
    category: 'Memory Management',
    difficulty: 'easy',
    answer: 'Stack memory is automatically managed, fast, and limited in size. It stores local variables and function call information. Heap memory is manually managed (new/delete), slower, but can be much larger and persists until explicitly freed.',
    tips: [
      'Discuss allocation speed',
      'Mention automatic vs manual management',
      'Explain scope and lifetime differences',
    ],
  },
];

// Behavioral questions
const behavioralQuestions = [
  {
    question: 'Tell me about a challenging project you worked on.',
    tips: [
      'Use the STAR method (Situation, Task, Action, Result)',
      'Focus on your specific contributions',
      'Highlight what you learned',
    ],
  },
  {
    question: 'How do you handle disagreements with team members?',
    tips: [
      'Emphasize communication and collaboration',
      'Show you value different perspectives',
      'Give a specific example if possible',
    ],
  },
  {
    question: 'Describe a time when you had to learn something new quickly.',
    tips: [
      'Show your learning process',
      'Demonstrate adaptability',
      'Highlight the successful outcome',
    ],
  },
];

// Technical topics to study
const technicalTopics = [
  { name: 'Data Structures', importance: 'High', questions: 45 },
  { name: 'Algorithms', importance: 'High', questions: 38 },
  { name: 'OOP Concepts', importance: 'High', questions: 32 },
  { name: 'Memory Management', importance: 'High', questions: 28 },
  { name: 'STL', importance: 'Medium', questions: 25 },
  { name: 'Templates', importance: 'Medium', questions: 18 },
  { name: 'Multithreading', importance: 'Medium', questions: 15 },
  { name: 'Design Patterns', importance: 'Low', questions: 12 },
];

export default function InterviewPrep() {
  const { user } = useAuth();
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  const toggleQuestion = (id: number) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  const markComplete = (id: number) => {
    if (!completedQuestions.includes(id)) {
      setCompletedQuestions([...completedQuestions, id]);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
          <Briefcase className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Interview Preparation</h1>
        <p className="text-slate-400">Ace your next coding interview with comprehensive preparation materials</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-slate-800">
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{interviewQuestions.length}</p>
            <p className="text-sm text-slate-400">Technical Questions</p>
          </CardContent>
        </Card>
        <Card className="border-slate-800">
          <CardContent className="p-4 text-center">
            <MessageSquare className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{behavioralQuestions.length}</p>
            <p className="text-sm text-slate-400">Behavioral Questions</p>
          </CardContent>
        </Card>
        <Card className="border-slate-800">
          <CardContent className="p-4 text-center">
            <BookOpen className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{technicalTopics.length}</p>
            <p className="text-sm text-slate-400">Topics Covered</p>
          </CardContent>
        </Card>
        <Card className="border-slate-800">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">
              {Math.round((completedQuestions.length / interviewQuestions.length) * 100)}%
            </p>
            <p className="text-sm text-slate-400">Prepared</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="technical" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full md:w-auto md:inline-grid">
          <TabsTrigger value="technical">Technical Questions</TabsTrigger>
          <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
          <TabsTrigger value="topics">Study Topics</TabsTrigger>
        </TabsList>

        {/* Technical Questions */}
        <TabsContent value="technical" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Common Interview Questions</h2>
            <Badge variant="secondary">
              {completedQuestions.length}/{interviewQuestions.length} Mastered
            </Badge>
          </div>

          {interviewQuestions.map((q) => (
            <Card key={q.id} className="border-slate-800">
              <CardContent className="p-4">
                <div
                  className="flex items-start justify-between cursor-pointer"
                  onClick={() => toggleQuestion(q.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getDifficultyColor(q.difficulty)}>
                        {q.difficulty}
                      </Badge>
                      <span className="text-xs text-slate-400">{q.category}</span>
                    </div>
                    <h3 className="font-semibold text-white">{q.question}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {completedQuestions.includes(q.id) && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {expandedQuestion === q.id ? (
                      <ChevronUp className="h-5 w-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    )}
                  </div>
                </div>

                {expandedQuestion === q.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-slate-800 space-y-4"
                  >
                    <div>
                      <h4 className="font-semibold text-white mb-2">Answer:</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">{q.answer}</p>
                    </div>

                    {q.codeExample && (
                      <div>
                        <h4 className="font-semibold text-white mb-2">Code Example:</h4>
                        <pre className="bg-slate-950 border border-slate-800 rounded-lg p-4 overflow-x-auto">
                          <code className="text-sm text-slate-300 font-mono whitespace-pre">
                            {q.codeExample}
                          </code>
                        </pre>
                      </div>
                    )}

                    <div>
                      <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-yellow-400" />
                        Tips:
                      </h4>
                      <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                        {q.tips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => markComplete(q.id)}
                        disabled={completedQuestions.includes(q.id)}
                        className={completedQuestions.includes(q.id) ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}
                      >
                        {completedQuestions.includes(q.id) ? 'Mastered' : 'Mark as Studied'}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Behavioral Questions */}
        <TabsContent value="behavioral" className="space-y-4">
          <h2 className="text-xl font-bold text-white">Behavioral Interview Questions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {behavioralQuestions.map((q, index) => (
              <Card key={index} className="border-slate-800">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-400" />
                    <h3 className="font-semibold text-white">{q.question}</h3>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-400 mb-2">Tips:</h4>
                    <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                      {q.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Tips */}
          <Card className="border-slate-800 bg-blue-500/10 border-blue-500/30">
            <CardContent className="p-6">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-blue-400" />
                General Interview Tips
              </h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Research the company and role beforehand</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Practice coding problems on a whiteboard or paper</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Think out loud during problem-solving</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Ask clarifying questions before diving into solutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Prepare questions to ask the interviewer</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Study Topics */}
        <TabsContent value="topics" className="space-y-4">
          <h2 className="text-xl font-bold text-white">Technical Topics to Master</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {technicalTopics.map((topic) => (
              <Card key={topic.name} className="border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{topic.name}</h3>
                    <Badge className={getImportanceColor(topic.importance)}>
                      {topic.importance} Priority
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Target className="h-4 w-4" />
                    <span>{topic.questions} practice questions available</span>
                  </div>
                  <div className="mt-3">
                    <Button size="sm" variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800">
                      <Play className="h-3 w-3 mr-1" />
                      Practice Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Study Plan */}
          <Card className="border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recommended Study Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Week 1-2: Fundamentals</h4>
                    <p className="text-sm text-slate-400">Focus on data structures, basic algorithms, and OOP concepts.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Week 3-4: Advanced Topics</h4>
                    <p className="text-sm text-slate-400">Study memory management, templates, and STL in depth.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Week 5-6: Practice</h4>
                    <p className="text-sm text-slate-400">Solve coding challenges and mock interviews.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Week 7-8: Review & Mock</h4>
                    <p className="text-sm text-slate-400">Review weak areas and take full mock interviews.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}