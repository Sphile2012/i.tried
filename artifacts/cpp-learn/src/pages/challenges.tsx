/**
 * Infinity Code - Coding Challenges Page
 * Browse and solve programming challenges
 * 
 * All buttons are optimized for mobile with:
 * - Minimum 44px touch targets
 * - Active states for visual feedback
 * - Proper spacing and sizing
 */

import { useState } from 'react';
import { ChevronLeft, Play, Send, RotateCcw, CheckCircle, Clock, Award, Flame } from 'lucide-react';

interface Challenge {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  solved: boolean;
  xp: number;
  description: string;
}

const categories = [
  'All',
  'Beginner',
  'Intermediate',
  'Advanced',
  'Algorithms',
  'Data Structures',
  'JavaScript',
  'TypeScript',
  'Mathematics',
  'Interview Prep'
];

const challenges: Challenge[] = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy', category: 'Algorithms', solved: true, xp: 50, description: 'Find two numbers in an array that add up to a target.' },
  { id: 2, title: 'Reverse String', difficulty: 'Easy', category: 'JavaScript', solved: true, xp: 30, description: 'Reverse a string without using built-in methods.' },
  { id: 3, title: 'Valid Parentheses', difficulty: 'Medium', category: 'Data Structures', solved: false, xp: 100, description: 'Check if a string of brackets is valid.' },
  { id: 4, title: 'Binary Search', difficulty: 'Medium', category: 'Algorithms', solved: false, xp: 100, description: 'Implement binary search on a sorted array.' },
  { id: 5, title: 'Merge Sorted Arrays', difficulty: 'Medium', category: 'Algorithms', solved: false, xp: 120, description: 'Merge two sorted arrays into one.' },
  { id: 6, title: 'Maximum Subarray', difficulty: 'Hard', category: 'Algorithms', solved: false, xp: 200, description: 'Find the contiguous subarray with the largest sum.' },
  { id: 7, title: 'Fibonacci Sequence', difficulty: 'Easy', category: 'Mathematics', solved: true, xp: 50, description: 'Generate the nth Fibonacci number.' },
  { id: 8, title: 'Palindrome Checker', difficulty: 'Easy', category: 'JavaScript', solved: false, xp: 40, description: 'Check if a string is a palindrome.' },
  { id: 9, title: 'Binary Tree Traversal', difficulty: 'Hard', category: 'Data Structures', solved: false, xp: 200, description: 'Traverse a binary tree in-order.' },
  { id: 10, title: 'TypeScript Generics', difficulty: 'Medium', category: 'TypeScript', solved: false, xp: 100, description: 'Create a generic type-safe function.' },
  { id: 11, title: 'Array Chunking', difficulty: 'Easy', category: 'JavaScript', solved: false, xp: 40, description: 'Split an array into chunks of a given size.' },
  { id: 12, title: 'Graph BFS', difficulty: 'Hard', category: 'Algorithms', solved: false, xp: 250, description: 'Implement breadth-first search on a graph.' },
];

export default function ChallengesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null);

  const filtered = activeCategory === 'All'
    ? challenges
    : challenges.filter(c => c.category === activeCategory || c.difficulty === activeCategory);

  const selected = challenges.find(c => c.id === selectedChallenge);

  const difficultyColor = (d: string) => {
    if (d === 'Easy') return 'bg-green-500/20 text-green-400 border border-green-500/30';
    if (d === 'Medium') return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
    return 'bg-red-500/20 text-red-400 border border-red-500/30';
  };

  // Challenge detail view
  if (selected) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] pt-16 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button - Mobile optimized */}
          <button
            onClick={() => setSelectedChallenge(null)}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white active:scale-95 transition-all min-h-[44px] px-4 py-2 -ml-2 mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Challenges</span>
          </button>

          {/* Challenge Header */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h1 className="text-xl sm:text-2xl font-bold text-white">{selected.title}</h1>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${difficultyColor(selected.difficulty)}`}>
                  {selected.difficulty}
                </span>
                <span className="text-xs px-3 py-1.5 rounded-full bg-[#00d4ff]/20 text-[#00d4ff] font-medium border border-[#00d4ff]/30">
                  {selected.xp} XP
                </span>
              </div>
            </div>
            <p className="text-gray-400 mb-4">{selected.description}</p>

            {/* Example */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-white mb-2">Example</h3>
              <div className="bg-[#0d0d1a] border border-white/10 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm text-gray-300 overflow-x-auto">
                <div>Input: nums = [2, 7, 11, 15], target = 9</div>
                <div>Output: [0, 1]</div>
                <div>Explanation: nums[0] + nums[1] = 2 + 7 = 9</div>
              </div>
            </div>

            {/* Constraints */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-2">Constraints</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• 2 ≤ nums.length ≤ 10⁴</li>
                <li>• -10⁹ ≤ nums[i] ≤ 10⁹</li>
                <li>• Only one valid answer exists</li>
              </ul>
            </div>
          </div>

          {/* Code Editor */}
          <div className="bg-[#0d0d1a] border border-white/10 rounded-2xl overflow-hidden mb-4">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#0a0a0f] border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs text-gray-500 ml-2">solution.ts</span>
            </div>
            <pre className="p-3 sm:p-4 text-sm font-mono text-gray-300 overflow-x-auto min-h-[200px]">
              <code>{`function solution(nums: number[], target: number): number[] {
  // Write your solution here
  
}`}</code>
            </pre>
          </div>

          {/* Action Buttons - Mobile optimized with proper touch targets */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              className="flex-1 flex items-center justify-center gap-2 min-h-[48px] px-4 sm:px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white rounded-xl font-semibold hover:opacity-90 active:scale-[0.98] transition-all"
            >
              <Play className="w-4 h-4" />
              Run Code
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 min-h-[48px] px-4 sm:px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 active:scale-[0.98] transition-all"
            >
              <Send className="w-4 h-4" />
              Submit Solution
            </button>
            <button
              className="flex items-center justify-center gap-2 min-h-[48px] px-4 sm:px-6 py-3 bg-white/5 border border-white/10 text-gray-400 rounded-xl font-semibold hover:bg-white/10 hover:text-white active:scale-[0.98] transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Challenge list view
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">Coding Challenges</h1>
          <p className="text-gray-400">Solve problems, earn XP, and climb the leaderboard.</p>
        </div>

        {/* Stats Grid - Mobile responsive */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4">
            <div className="text-xl sm:text-2xl font-bold text-white">
              {challenges.filter(c => c.solved).length}
            </div>
            <div className="text-xs sm:text-sm text-gray-400 flex items-center gap-1 mt-1">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Solved
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4">
            <div className="text-xl sm:text-2xl font-bold text-white">
              {challenges.length}
            </div>
            <div className="text-xs sm:text-sm text-gray-400 flex items-center gap-1 mt-1">
              <Award className="w-4 h-4 text-[#00d4ff]" />
              Total
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4">
            <div className="text-xl sm:text-2xl font-bold text-white">
              {Math.round((challenges.filter(c => c.solved).length / challenges.length) * 100)}%
            </div>
            <div className="text-xs sm:text-sm text-gray-400 flex items-center gap-1 mt-1">
              <Clock className="w-4 h-4 text-purple-400" />
              Success Rate
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4">
            <div className="text-xl sm:text-2xl font-bold text-white">
              7
            </div>
            <div className="text-xs sm:text-sm text-gray-400 flex items-center gap-1 mt-1">
              <Flame className="w-4 h-4 text-orange-400" />
              Day Streak
            </div>
          </div>
        </div>

        {/* Category Filter - Mobile optimized horizontal scroll */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 text-sm rounded-lg transition min-h-[44px] active:scale-[0.95] ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Challenges Grid - Mobile responsive */}
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          {filtered.map((ch) => (
            <div
              key={ch.id}
              onClick={() => setSelectedChallenge(ch.id)}
              className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 hover:border-white/20 active:bg-white/[0.07] transition-all cursor-pointer group min-h-[120px] active:scale-[0.98]"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {ch.solved && (
                    <span className="text-green-400 flex-shrink-0">
                      <CheckCircle className="w-5 h-5" />
                    </span>
                  )}
                  <h3 className="font-semibold text-white group-hover:text-[#00d4ff] transition line-clamp-1">
                    {ch.title}
                  </h3>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${difficultyColor(ch.difficulty)}`}>
                  {ch.difficulty}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">{ch.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{ch.category}</span>
                <span className="text-xs text-[#00d4ff] font-medium">{ch.xp} XP</span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <p className="text-gray-400">No challenges found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}