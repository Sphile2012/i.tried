/**
 * Infinity Code - Leaderboard Page
 * Weekly, Monthly, and All Time rankings
 * 
 * Note: This page is designed to display real user data from the backend.
 * Currently showing empty state until backend integration is complete.
 */

import { useState } from 'react';
import { Trophy, Users, Calendar, TrendingUp, AlertCircle } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  xp: number;
  challengesCompleted: number;
  projectsCompleted: number;
  level: number;
  avatarUrl?: string;
}

interface LeaderboardData {
  weekly: LeaderboardEntry[];
  monthly: LeaderboardEntry[];
  allTime: LeaderboardEntry[];
}

// Empty state - data will be fetched from backend
const EMPTY_LEADERBOARD: LeaderboardData = {
  weekly: [],
  monthly: [],
  allTime: [],
};

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'allTime'>('allTime');
  const [leaderboardData] = useState<LeaderboardData>(EMPTY_LEADERBOARD);

  const getCurrentData = () => {
    return leaderboardData[period] || [];
  };

  const getPeriodLabel = () => {
    switch (period) {
      case 'weekly': return 'This Week';
      case 'monthly': return 'This Month';
      case 'allTime': return 'All Time';
    }
  };

  const topThree = getCurrentData().slice(0, 3);
  const restOfList = getCurrentData().slice(3);

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-8 h-8 text-[#00d4ff]" />
            <h1 className="text-3xl lg:text-4xl font-bold text-white">Leaderboard</h1>
          </div>
          <p className="text-gray-400">
            Track your progress and compete with other developers.
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setPeriod('weekly')}
            className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition ${
              period === 'weekly'
                ? 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Weekly
          </button>
          <button
            onClick={() => setPeriod('monthly')}
            className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition ${
              period === 'monthly'
                ? 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Monthly
          </button>
          <button
            onClick={() => setPeriod('allTime')}
            className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition ${
              period === 'allTime'
                ? 'bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            All Time
          </button>
        </div>

        {/* Empty State */}
        {getCurrentData().length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-500" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Leaderboard Coming Soon
            </h2>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              The leaderboard for {getPeriodLabel()} will be available soon. 
              Start completing lessons and challenges to earn XP and climb the rankings!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 text-left">
                <h3 className="text-white font-medium mb-2">How to Earn XP:</h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Complete lessons (+10 XP)</li>
                  <li>• Solve challenges (+25-100 XP)</li>
                  <li>• Build projects (+200-500 XP)</li>
                  <li>• Maintain coding streaks (+50 XP)</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            {topThree.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mb-8">
                {/* 2nd Place */}
                {topThree[1] && (
                  <div className="bg-gradient-to-b from-gray-300/10 to-gray-400/5 border border-white/10 rounded-2xl p-6 text-center order-2">
                    <div className="text-3xl mb-2">&#129352;</div>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                      {topThree[1].username[0].toUpperCase()}
                    </div>
                    <div className="font-bold text-white">{topThree[1].username}</div>
                    <div className="text-sm text-gray-300">{topThree[1].xp.toLocaleString()} XP</div>
                    <div className="text-xs text-gray-400 mt-1">Level {topThree[1].level}</div>
                  </div>
                )}

                {/* 1st Place */}
                {topThree[0] && (
                  <div className="bg-gradient-to-b from-yellow-500/10 to-amber-500/5 border border-white/10 rounded-2xl p-6 text-center order-1 md:order-2 md:scale-105">
                    <div className="text-3xl mb-2">&#129351;</div>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                      {topThree[0].username[0].toUpperCase()}
                    </div>
                    <div className="font-bold text-white">{topThree[0].username}</div>
                    <div className="text-sm text-gray-300">{topThree[0].xp.toLocaleString()} XP</div>
                    <div className="text-xs text-gray-400 mt-1">Level {topThree[0].level}</div>
                  </div>
                )}

                {/* 3rd Place */}
                {topThree[2] && (
                  <div className="bg-gradient-to-b from-orange-600/10 to-orange-500/5 border border-white/10 rounded-2xl p-6 text-center order-3">
                    <div className="text-3xl mb-2">&#129353;</div>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-600 to-orange-500 flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                      {topThree[2].username[0].toUpperCase()}
                    </div>
                    <div className="font-bold text-white">{topThree[2].username}</div>
                    <div className="text-sm text-gray-300">{topThree[2].xp.toLocaleString()} XP</div>
                    <div className="text-xs text-gray-400 mt-1">Level {topThree[2].level}</div>
                  </div>
                )}
              </div>
            )}

            {/* Full Leaderboard Table */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-12 gap-2 px-6 py-3 border-b border-white/5 text-xs text-gray-500 font-medium uppercase">
                <div className="col-span-1">Rank</div>
                <div className="col-span-5">User</div>
                <div className="col-span-2 text-center">Level</div>
                <div className="col-span-2 text-center">Challenges</div>
                <div className="col-span-2 text-right">XP</div>
              </div>
              
              {getCurrentData().map((entry) => (
                <div
                  key={entry.userId}
                  className="grid grid-cols-12 gap-2 px-6 py-4 border-b border-white/5 last:border-0 items-center hover:bg-white/5 transition"
                >
                  <div className="col-span-1">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                        entry.rank <= 3
                          ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white'
                          : 'bg-white/5 text-gray-400'
                      }`}
                    >
                      {entry.rank}
                    </span>
                  </div>
                  <div className="col-span-5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] flex items-center justify-center text-white font-bold text-sm">
                      {entry.username[0].toUpperCase()}
                    </div>
                    <span className="text-white font-medium">{entry.username}</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="text-sm text-gray-300">Lv {entry.level}</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="text-sm text-gray-300">{entry.challengesCompleted}</span>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="text-sm font-bold text-[#00d4ff]">
                      {entry.xp.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Info Banner */}
        <div className="mt-8 bg-white/[0.03] border border-white/10 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#00d4ff] flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-white font-medium mb-1">Leaderboard Updates</h3>
            <p className="text-sm text-gray-400">
              Leaderboards are updated in real-time. XP is earned by completing lessons, 
              challenges, and projects. Weekly leaderboards reset every Monday, 
              monthly on the 1st of each month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}