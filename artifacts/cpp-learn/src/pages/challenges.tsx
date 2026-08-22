/**
 * Infinity Code - Coding Challenges Page
 * Browse and solve programming challenges
 */

import { useState } from 'react';

const categories = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Algorithms', 'Data Structures', 'JavaScript', 'TypeScript', 'Mathematics', 'Interview Prep'];

const challenges = [
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
    if (d === 'Easy') return 'bg-green-500/20 text-green-400';
    if (d === 'Medium') return 'bg-yellow-500/20 text-yellow-400';
    return 'bg-red-500/20 text-red-400';
  };

  if (selected) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] pt-20 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => setSelectedChallenge(null)} className="text-sm text-gray-400 hover:text-white mb-6 transition">← Back to Challenges</button>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-white">{selected.title}</h1>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${difficultyColor(selected.difficulty)}`}>{selected.difficulty}</span>
                <span className="text-xs px-3 py-1 rounded-full bg-[#00d4ff]/20 text-[#00d4ff] font-medium">{selected.xp} XP</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6">{selected.description}</p>
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white mb-2">Example</h3>
              <div className="bg-[#0d0d1a] border border-white/10 rounded-lg p-4 font-mono text-sm text-gray-300">
                <div>Input: nums = [2, 7, 11, 15], target = 9</div>
                <div>Output: [0, 1]</div>
                <div>Explanation: nums[0] + nums[1] = 2 + 7 = 9</div>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white mb-2">Constraints</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• 2 ≤ nums.length ≤ 10⁴</li>
                <li>• -10⁹ ≤ nums[i] ≤ 10⁹</li>
                <li>• Only one valid answer exists</li>
              </ul>
            </div>
          </div>
          <div className="bg-[#0d0d1a] border border-white/10 rounded-2xl overflow-hidden mb-6">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#0a0a0f] border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs text-gray-500 ml-2">solution.ts</span>
            </div>
            <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto min-h-[200px]">
              <code>{`function solution(nums: number[], target: number): number[] {
  // Write your solution here
  
}`}</code>
            </pre>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white rounded-xl font-semibold hover:opacity-90 transition">▶ Run Code</button>
            <button className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition">Submit Solution</button>
            <button className="px-6 py-3 bg-white/5 border border-white/10 text-gray-400 rounded-xl font-semibold hover:bg-white/10 transition">Reset</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Coding Challenges</h1>
          <p className="text-gray-400">Solve problems, earn XP, and climb the leaderboard.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="text-2xl font-bold text-white">{challenges.filter(c => c.solved).length}</div>
            <div className="text-sm text-gray-400">Solved</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="text-2xl font-bold text-white">{challenges.length}</div>
            <div className="text-sm text-gray-400">Total</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="text-2xl font-bold text-white">{Math.round((challenges.filter(c => c.solved).length / challenges.length) * 100)}%</div>
            <div className="text-sm text-gray-400">Success Rate</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="text-2xl font-bold text-white">7</div>
            <div className="text-sm text-gray-400">Day Streak</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 text-sm rounded-lg transition ${activeCategory === cat ? 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white' : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'}`}>{cat}</button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((ch) => (
            <div key={ch.id} onClick={() => setSelectedChallenge(ch.id)} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition cursor-pointer group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {ch.solved && <span className="text-green-400">✓</span>}
                  <h3 className="font-semibold text-white group-hover:text-[#00d4ff] transition">{ch.title}</h3>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${difficultyColor(ch.difficulty)}`}>{ch.difficulty}</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">{ch.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{ch.category}</span>
                <span className="text-xs text-[#00d4ff]">{ch.xp} XP</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}