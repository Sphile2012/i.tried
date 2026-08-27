import { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Code,
  Bug,
  Play,
  CheckCircle,
  XCircle,
  RefreshCw,
  Lightbulb,
  Trophy,
  Clock,
  Target,
  Zap,
  AlertTriangle,
  ChevronRight,
  Terminal,
  FileCode,
  Cpu,
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';

// Challenge types
type ChallengeType = 'coding' | 'debug' | 'algorithm' | 'project';
type Difficulty = 'beginner' | 'easy' | 'medium' | 'hard' | 'expert';

interface TestCase {
  input: string;
  expectedOutput: string;
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  type: ChallengeType;
  difficulty: Difficulty;
  points: number;
  starterCode: string;
  testCases: TestCase[];
  hints: string[];
  solution?: string;
  tags: string[];
  timeLimit?: number; // seconds
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: 'Hello World',
    description: 'Write a program that prints "Hello, World!" to the console.',
    type: 'coding',
    difficulty: 'beginner',
    points: 10,
    starterCode: `#include <iostream>
using namespace std;

int main() {
    // Write your code here
    
    return 0;
}`,
    testCases: [
      { input: '', expectedOutput: 'Hello, World!' },
    ],
    hints: [
      'Use cout to print to the console',
      'Don\'t forget the newline character',
    ],
    tags: ['basics', 'output', 'iostream'],
  },
  {
    id: 2,
    title: 'Find the Bug: Average Calculator',
    description: 'This program should calculate the average of two numbers, but it has a bug. Find and fix it.',
    type: 'debug',
    difficulty: 'easy',
    points: 15,
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int a = 10, b = 20;
    int average = a + b / 2;  // Bug here!
    cout << "Average: " << average << endl;
    return 0;
}`,
    testCases: [
      { input: '', expectedOutput: 'Average: 15' },
    ],
    hints: [
      'Check the order of operations',
      'You need parentheses around (a + b)',
    ],
    tags: ['debug', 'operators', 'average'],
  },
  {
    id: 3,
    title: 'FizzBuzz',
    description: 'Print numbers from 1 to n. For multiples of 3 print "Fizz", for multiples of 5 print "Buzz", and for multiples of both print "FizzBuzz".',
    type: 'algorithm',
    difficulty: 'easy',
    points: 20,
    starterCode: `#include <iostream>
using namespace std;

void fizzBuzz(int n) {
    // Write your code here
    
}

int main() {
    int n = 15;
    fizzBuzz(n);
    return 0;
}`,
    testCases: [
      { input: '15', expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz' },
    ],
    hints: [
      'Use modulo operator (%) to check divisibility',
      'Check for divisibility by both 3 and 5 first',
    ],
    tags: ['algorithm', 'loops', 'conditions'],
  },
  {
    id: 4,
    title: 'Reverse a String',
    description: 'Write a function that reverses a given string without using built-in reverse functions.',
    type: 'coding',
    difficulty: 'easy',
    points: 20,
    starterCode: `#include <iostream>
#include <string>
using namespace std;

string reverseString(string s) {
    // Write your code here
    
}

int main() {
    string s = "hello";
    cout << reverseString(s) << endl;
    return 0;
}`,
    testCases: [
      { input: 'hello', expectedOutput: 'olleh' },
      { input: 'C++', expectedOutput: '++C' },
    ],
    hints: [
      'Use two pointers from start and end',
      'Swap characters moving towards the center',
    ],
    tags: ['strings', 'algorithms'],
  },
  {
    id: 5,
    title: 'Binary Search',
    description: 'Implement binary search on a sorted array. Return the index of the target, or -1 if not found.',
    type: 'algorithm',
    difficulty: 'medium',
    points: 30,
    starterCode: `#include <iostream>
#include <vector>
using namespace std;

int binarySearch(vector<int>& arr, int target) {
    // Write your code here
    
}

int main() {
    vector<int> arr = {1, 3, 5, 7, 9, 11, 13};
    int target = 7;
    cout << "Index: " << binarySearch(arr, target) << endl;
    return 0;
}`,
    testCases: [
      { input: '7', expectedOutput: 'Index: 3' },
      { input: '4', expectedOutput: 'Index: -1' },
    ],
    hints: [
      'Divide the search space in half each iteration',
      'Compare the middle element with the target',
    ],
    tags: ['algorithms', 'searching', 'arrays'],
  },
  {
    id: 6,
    title: 'Linked List Implementation',
    description: 'Implement a singly linked list with insert, delete, and display operations.',
    type: 'project',
    difficulty: 'hard',
    points: 50,
    starterCode: `#include <iostream>
using namespace std;

class Node {
public:
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedList {
private:
    Node* head;
public:
    LinkedList() : head(nullptr) {}
    
    void insert(int val) {
        // Implement insertion
    }
    
    void deleteNode(int val) {
        // Implement deletion
    }
    
    void display() {
        // Implement display
    }
};

int main() {
    LinkedList list;
    list.insert(1);
    list.insert(2);
    list.insert(3);
    list.display();
    return 0;
}`,
    testCases: [
      { input: 'insert:1,2,3 display', expectedOutput: '1 -> 2 -> 3 -> NULL' },
    ],
    hints: [
      'Keep track of the head pointer',
      'Handle edge cases: empty list, single node',
    ],
    tags: ['data-structures', 'linked-list', 'OOP'],
  },
];

export default function CodingChallenges() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<{ passed: boolean; input: string; expected: string; actual: string }[]>([]);
  const [showHint, setShowHint] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([1]);

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'easy': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'hard': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'expert': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getTypeIcon = (type: ChallengeType) => {
    switch (type) {
      case 'coding': return <Code className="h-4 w-4" />;
      case 'debug': return <Bug className="h-4 w-4" />;
      case 'algorithm': return <Cpu className="h-4 w-4" />;
      case 'project': return <FileCode className="h-4 w-4" />;
      default: return <Code className="h-4 w-4" />;
    }
  };

  const handleSelectChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setCode(challenge.starterCode);
    setOutput('');
    setTestResults([]);
    setShowHint(0);
  };

  const runCode = async () => {
    if (!selectedChallenge) return;
    
    setIsRunning(true);
    setOutput('Compiling...\n');
    
    // Simulate compilation and execution
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock test results (in real app, this would run on a backend)
    const results = selectedChallenge.testCases.map(tc => {
      // Simple mock - would actually run the code
      const passed = Math.random() > 0.3; // 70% chance of passing for demo
      return {
        passed,
        input: tc.input,
        expected: tc.expectedOutput,
        actual: passed ? tc.expectedOutput : 'Wrong output',
      };
    });
    
    setTestResults(results);
    
    const allPassed = results.every(r => r.passed);
    if (allPassed) {
      setOutput(prev => prev + '\nAll test cases passed!\n');
      toast({
        title: 'Challenge Completed!',
        description: `You earned ${selectedChallenge.points} XP!`,
      });
      if (!completedChallenges.includes(selectedChallenge.id)) {
        setCompletedChallenges([...completedChallenges, selectedChallenge.id]);
      }
    } else {
      setOutput(prev => prev + '\nSome test cases failed. Keep trying!\n');
    }
    
    setIsRunning(false);
  };

  const resetCode = () => {
    if (selectedChallenge) {
      setCode(selectedChallenge.starterCode);
      setOutput('');
      setTestResults([]);
    }
  };

  const completedCount = completedChallenges.length;
  const totalPoints = completedChallenges.reduce((sum, id) => {
    const challenge = challenges.find(c => c.id === id);
    return sum + (challenge?.points || 0);
  }, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/lessons" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to Lessons
        </Link>
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="flex items-center gap-2">
            <Trophy className="h-3 w-3" />
            {completedCount}/{challenges.length} Completed
          </Badge>
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 flex items-center gap-2">
            <Zap className="h-3 w-3" />
            {totalPoints} XP
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Challenge List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Coding Challenges</h2>
          <div className="space-y-2">
            {challenges.map((challenge) => (
              <Card
                key={challenge.id}
                className={`cursor-pointer transition-all ${
                  selectedChallenge?.id === challenge.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-800 hover:border-slate-700'
                } ${completedChallenges.includes(challenge.id) ? 'opacity-70' : ''}`}
                onClick={() => handleSelectChallenge(challenge)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(challenge.type)}
                      <h3 className="font-semibold text-white">{challenge.title}</h3>
                    </div>
                    {completedChallenges.includes(challenge.id) && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={getDifficultyColor(challenge.difficulty)} variant="outline">
                      {challenge.difficulty}
                    </Badge>
                    <span className="text-xs text-slate-400">{challenge.points} XP</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Code Editor & Output */}
        <div className="lg:col-span-2 space-y-4">
          {selectedChallenge ? (
            <>
              {/* Challenge Details */}
              <Card className="border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">{selectedChallenge.title}</CardTitle>
                      <p className="text-sm text-slate-400 mt-1">{selectedChallenge.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getDifficultyColor(selectedChallenge.difficulty)}>
                        {selectedChallenge.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-yellow-400 border-yellow-500/30">
                        {selectedChallenge.points} XP
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {selectedChallenge.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Hints */}
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowHint(Math.min(showHint + 1, selectedChallenge.hints.length))}
                      className="flex items-center gap-2"
                    >
                      <Lightbulb className="h-4 w-4" />
                      Show Hint ({showHint}/{selectedChallenge.hints.length})
                    </Button>
                    {showHint > 0 && (
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                        <p className="text-sm text-yellow-400">{selectedChallenge.hints[showHint - 1]}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Code Editor */}
              <Card className="border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-400">Code Editor</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={resetCode}
                        className="flex items-center gap-2"
                      >
                        <RefreshCw className="h-4 w-4" />
                        Reset
                      </Button>
                      <Button
                        onClick={runCode}
                        disabled={isRunning}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                        size="sm"
                      >
                        <Play className="h-4 w-4" />
                        {isRunning ? 'Running...' : 'Run Code'}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="font-mono text-sm bg-slate-950 border-slate-800 text-white min-h-[300px]"
                    rows={15}
                  />
                </CardContent>
              </Card>

              {/* Output */}
              <Card className="border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-400">Output</span>
                    </div>
                    {testResults.length > 0 && (
                      <Badge variant={testResults.every(r => r.passed) ? 'success' : 'destructive'}>
                        {testResults.filter(r => r.passed).length}/{testResults.length} Passed
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-sm">
                    <pre className="text-slate-300 whitespace-pre-wrap">{output || '// Click "Run Code" to see output'}</pre>
                  </div>

                  {/* Test Results */}
                  {testResults.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h4 className="text-sm font-semibold text-white">Test Cases:</h4>
                      {testResults.map((result, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border ${
                            result.passed
                              ? 'border-green-500/30 bg-green-500/10'
                              : 'border-red-500/30 bg-red-500/10'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {result.passed ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-sm font-medium text-white">Test Case {index + 1}</span>
                          </div>
                          <div className="text-xs text-slate-400 space-y-1">
                            <p>Input: <span className="text-slate-300">"{result.input}"</span></p>
                            <p>Expected: <span className="text-slate-300">"{result.expected}"</span></p>
                            {!result.passed && (
                              <p>Actual: <span className="text-red-400">"{result.actual}"</span></p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="border-slate-800">
              <CardContent className="p-12 text-center">
                <Code className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Select a Challenge</h3>
                <p className="text-slate-400">Choose a coding challenge from the list to get started.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}