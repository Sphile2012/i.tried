/**
 * Infinity Code - Community Page
 * Developer posts, discussions, questions, and answers
 */

import { useState } from 'react';

const posts = [
  { id: 1, type: 'Discussion', title: 'Best practices for React state management in 2026?', author: 'Phumeh', avatar: 'P', time: '2 hours ago', likes: 24, comments: 8, tags: ['React', 'State Management'] },
  { id: 2, type: 'Question', title: 'How to handle async errors in TypeScript properly?', author: 'CodeMaster', avatar: 'C', time: '5 hours ago', likes: 15, comments: 12, tags: ['TypeScript', 'Async'] },
  { id: 3, type: 'Showcase', title: 'I built a full-stack chat app with React and Supabase!', author: 'JaneDoe', avatar: 'J', time: '1 day ago', likes: 45, comments: 20, tags: ['React', 'Supabase', 'Full-Stack'] },
  { id: 4, type: 'Discussion', title: 'TypeScript vs JavaScript: When to use which?', author: 'MLDev', avatar: 'M', time: '2 days ago', likes: 32, comments: 25, tags: ['TypeScript', 'JavaScript'] },
  { id: 5, type: 'Question', title: 'Why is my useEffect running twice in development?', author: 'GameDev', avatar: 'G', time: '3 days ago', likes: 18, comments: 6, tags: ['React', 'Hooks'] },
  { id: 6, type: 'Tutorial', title: 'A complete guide to CSS Grid for beginners', author: 'DataSci', avatar: 'D', time: '4 days ago', likes: 56, comments: 15, tags: ['CSS', 'Tutorial'] },
];

const typeColor = (t: string) => {
  if (t === 'Question') return 'bg-blue-500/20 text-blue-400';
  if (t === 'Showcase') return 'bg-purple-500/20 text-purple-400';
  if (t === 'Tutorial') return 'bg-green-500/20 text-green-400';
  return 'bg-[#00d4ff]/20 text-[#00d4ff]';
};

export default function CommunityPage() {
  const [showNewPost, setShowNewPost] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Discussion', 'Question', 'Showcase', 'Tutorial'];
  const filtered = activeFilter === 'All' ? posts : posts.filter(p => p.type === activeFilter);

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Community</h1>
            <p className="text-gray-400">Ask questions, share projects, and connect with developers.</p>
          </div>
          <button onClick={() => setShowNewPost(!showNewPost)} className="px-4 py-2 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white rounded-lg font-medium hover:opacity-90 transition">+ New Post</button>
        </div>

        {showNewPost && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Create New Post</h2>
            <select className="w-full bg-[#0d0d1a] border border-white/10 rounded-lg px-4 py-2 text-white mb-3 focus:outline-none focus:border-[#00d4ff]">
              <option>Discussion</option>
              <option>Question</option>
              <option>Showcase</option>
              <option>Tutorial</option>
            </select>
            <input type="text" placeholder="Post title" className="w-full bg-[#0d0d1a] border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 mb-3 focus:outline-none focus:border-[#00d4ff]" />
            <textarea placeholder="Write your post..." rows={5} className="w-full bg-[#0d0d1a] border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 mb-3 focus:outline-none focus:border-[#00d4ff]" />
            <input type="text" placeholder="Tags (comma separated)" className="w-full bg-[#0d0d1a] border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 mb-4 focus:outline-none focus:border-[#00d4ff]" />
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white rounded-lg font-medium hover:opacity-90 transition">Publish Post</button>
              <button onClick={() => setShowNewPost(false)} className="px-6 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-lg font-medium hover:bg-white/10 transition">Cancel</button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)} className={`px-4 py-2 text-sm rounded-lg transition ${activeFilter === f ? 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white' : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'}`}>{f}</button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((post) => (
            <div key={post.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition cursor-pointer group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {post.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${typeColor(post.type)}`}>{post.type}</span>
                    <span className="text-xs text-gray-500">by {post.author}</span>
                    <span className="text-xs text-gray-600">• {post.time}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-[#00d4ff] transition mb-2">{post.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-400">#{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <span className="hover:text-white transition cursor-pointer">👍 {post.likes}</span>
                    <span className="hover:text-white transition cursor-pointer">💬 {post.comments} comments</span>
                    <span className="hover:text-white transition cursor-pointer">🔖 Save</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}