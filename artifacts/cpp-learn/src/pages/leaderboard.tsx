/**
 * Infinity Code - Leaderboard Page
 * Weekly, Monthly, and All Time rankings
 */

import { useState } from 'react';

const leaderboard = [
  { rank: 1, username: 'CodeMaster', xp: 12450, challenges: 87, projects: 12, level: 6, avatar: 'C' },
  { rank: 2, username: 'JaneDoe', xp: 9800, challenges: 65, projects: 8, level: 5, avatar: 'J' },
  { rank: 3, username: 'MLDev', xp: 8200, challenges: 54, projects: 6, level: 5, avatar: 'M' },
  { rank: 4, username: 'Phumeh', xp: 2450, challenges: 18, projects: 3, level: 3, avatar: 'P' },
  { rank: 5, username: 'GameDev', xp: 2100, challenges: 22, projects: 2, level: 3, avatar: 'G' },
  { rank: 6, username: 'DataSci', xp: 1850, challenges: 15, projects: 4, level: 2, avatar: 'D' },
  { rank: 7, username: 'WebDev', xp: 1200, challenges: 10, projects: 1, level: 2, avatar: 'W' },
  { rank: 8, username: 'Pythonista', xp: 950, challenges: 8, projects: 2, level: 1, avatar: 'P' },
  { rank: 9, username: 'ReactNinja', xp: 750, challenges: 6, projects: 1, level: 1, avatar: 'R' },
  { rank: 10, username: 'NewCoder', xp: 500, challenges: 4, projects: 0, level: 1, avatar: 'N' },
];

const levelColors = ['from-gray-500 to-gray-400', 'from-green-500 to-emerald-500', 'from-blue-500 to-cyan-500', 'from-purple-500 to-pink-500', 'from-orange-500 to-red-500', 'from-yellow-500 to-amber-500'];

export default function LeaderboardPage() {
  const [period, setPeriod] = useState('All Time');
  const periods = ['Weekly', 'Monthly', 'All Time'];

  const rankColor = (r: number) => {
    if (r === 1) return 'from-yellow-500 to-amber-500';
    if (r === 2) return 'from-gray-300 to-gray-400';
    if (r === 3) return 'from-orange-600 to-orange-500';
    return 'from-white/10 to-white/5';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Leaderboard</h1>
          <p className="text-gray-400">Top developers ranked by XP and activity.</p>
        </div>

        <div className="flex gap-2 mb-8">
          {periods.map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-4 py-2 text-sm rounded-lg transition ${period === p ? 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white' : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'}`}>{p}</button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {leaderboard.slice(0, 3).map((user, i) => (
            <div key={user.rank} className={`bg-gradient-to-b ${rankColor(user.rank)} bg-opacity-10 border border-white/10 rounded-2xl p-6 text-center ${i === 0 ? 'md:scale-105' : ''}`}>
              <div className="text-3xl mb-2">{user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}</div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">{user.avatar}</div>
              <div className="font-bold text-white">{user.username}</div>
              <div className="text-sm text-gray-300">{user.xp.toLocaleString()} XP</div>
              <div className="text-xs text-gray-400 mt-1">Level {user.level}</div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 gap-2 px-6 py-3 border-b border-white/5 text-xs text-gray-500 font-medium uppercase">
            <div className="col-span-1">Rank</div>
            <div className="col-span-5">User</div>
            <div className="col-span-2 text-center">Level</div>
            <div className="col-span-2 text-center">Challenges</div>
            <div className="col-span-2 text-right">XP</div>
          </div>
          {leaderboard.map((user) => (
            <div key={user.rank} className={`grid grid-cols-12 gap-2 px-6 py-4 border-b border-white/5 last:border-0 items-center hover:bg-white/5 transition ${user.username === 'Phumeh' ? 'bg-[#00d4ff]/5' : ''}`}>
              <div className="col-span-1">
                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${user.rank <= 3 ? `bg-gradient-to-r ${rankColor(user.rank)} text-white` : 'bg-white/5 text-gray-400'}`}>{user.rank}</span>
              </div>
              <div className="col-span-5 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${levelColors[user.level - 1]} flex items-center justify-center text-white font-bold text-sm`}>{user.avatar}</div>
                <span className="text-white font-medium">{user.username}</span>
                {user.username === 'Phumeh' && <span className="text-xs text-[#00d4ff]">(You)</span>}
              </div>
              <div className="col-span-2 text-center"><span className="text-sm text-gray-300">Lv {user.level}</span></div>
              <div className="col-span-2 text-center"><span className="text-sm text-gray-300">{user.challenges}</span></div>
              <div className="col-span-2 text-right"><span className="text-sm font-bold text-[#00d4ff]">{user.xp.toLocaleString()}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}