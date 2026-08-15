/**
 * Infinity Code - Resources Page
 * Documentation, cheat sheets, tutorials, and developer references
 */

import { useState } from 'react';

const categories = ['All', 'Documentation', 'Cheat Sheets', 'Tutorials', 'References', 'Git/GitHub', 'APIs', 'Tools', 'Career', 'Interview Prep'];

const resources = [
  { id: 1, title: 'JavaScript Complete Reference', category: 'Documentation', type: 'Docs', description: 'Comprehensive JavaScript reference covering all language features.', icon: '📘' },
  { id: 2, title: 'React Hooks Cheat Sheet', category: 'Cheat Sheets', type: 'PDF', description: 'Quick reference for all React hooks with examples.', icon: '📋' },
  { id: 3, title: 'TypeScript Tutorial for Beginners', category: 'Tutorials', type: 'Video', description: 'Learn TypeScript from scratch with practical examples.', icon: '🎥' },
  { id: 4, title: 'CSS Flexbox Guide', category: 'References', type: 'Article', description: 'Complete guide to CSS Flexbox with interactive demos.', icon: '📐' },
  { id: 5, title: 'Git Commands Cheat Sheet', category: 'Git/GitHub', type: 'PDF', description: 'All essential Git commands in one place.', icon: '🔀' },
  { id: 6, title: 'REST API Design Best Practices', category: 'APIs', type: 'Article', description: 'How to design RESTful APIs that scale.', icon: '🔌' },
  { id: 7, title: 'VS Code Productivity Tips', category: 'Tools', type: 'Video', description: 'Boost your coding speed with VS Code shortcuts and extensions.', icon: '⚡' },
  { id: 8, title: 'System Design Interview Guide', category: 'Interview Prep', type: 'Docs', description: 'Complete guide to ace your system design interviews.', icon: '🎯' },
  { id: 9, title: 'HTML5 Element Reference', category: 'References', type: 'Docs', description: 'All HTML5 elements with attributes and examples.', icon: '📄' },
  { id: 10, title: 'Developer Portfolio Guide', category: 'Career', type: 'Article', description: 'How to build a standout developer portfolio.', icon: '💼' },
  { id: 11, title: 'Node.js Documentation', category: 'Documentation', type: 'Docs', description: 'Official Node.js documentation and API reference.', icon: '📗' },
  { id: 12, title: 'SQL Cheat Sheet', category: 'Cheat Sheets', type: 'PDF', description: 'Common SQL queries and commands for quick reference.', icon: '🗃️' },
];

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = resources.filter(r => {
    const matchesCategory = activeCategory === 'All' || r.category === activeCategory;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const typeColor = (t: string) => {
    if (t === 'Video') return 'bg-red-500/20 text-red-400';
    if (t === 'PDF') return 'bg-orange-500/20 text-orange-400';
    if (t === 'Article') return 'bg-blue-500/20 text-blue-400';
    return 'bg-green-500/20 text-green-400';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Resources</h1>
          <p className="text-gray-400">Documentation, cheat sheets, tutorials, and developer references.</p>
        </div>
        <div className="mb-6">
          <input type="text" placeholder="Search resources..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#0d0d1a] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]" />
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 text-sm rounded-lg transition ${activeCategory === cat ? 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white' : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'}`}>{cat}</button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((resource) => (
            <div key={resource.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{resource.icon}</div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${typeColor(resource.type)}`}>{resource.type}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00d4ff] transition">{resource.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{resource.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xs text-gray-500">{resource.category}</span>
                <span className="text-xs text-[#00d4ff]">View →</span>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-gray-400">No resources found. Try a different search or category.</p>
          </div>
        )}
      </div>
    </div>
  );
}