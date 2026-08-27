/**
 * Infinity Code - Developer Dashboard
 * Personalised dashboard with coding activity, progress, and recent activity
 */

import { Link } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { useState } from 'react';

export default function Dashboard() {
  const { user } = useAuth();
  const [streak] = useState(7);
  const [xp] = useState(2450);
  const [level] = useState(3);

  const stats = [
    { label: 'Lessons Completed', value: 24, color: 'from-blue-500 to-cyan-500' },
    { label: 'Challenges Solved', value: 18, color: 'from-green-500 to-emerald-500' },
    { label: 'Projects Created', value: 3, color: 'from-purple-500 to-pink-500' },
    { label: 'Coding Sessions', value: 45, color: 'from-orange-500 to-red-500' },
  ];

  const recentActivity = [
    { type: 'lesson', title: 'Completed: JavaScript Fundamentals', time: '2 hours ago' },
    { type: 'challenge', title: 'Solved: Two Sum (Easy)', time: '5 hours ago' },
    { type: 'achievement', title: 'Unlocked: Code Streak', time: '1 day ago' },
    { type: 'project', title: 'Updated: Portfolio Website', time: '2 days ago' },
    { type: 'lesson', title: 'Completed: React Hooks', time: '3 days ago' },
  ];

  const learningPaths = [
    { title: 'Web Development', progress: 65, lessons: 8, total: 12, color: 'from-blue-500 to-cyan-500' },
    { title: 'JavaScript Basics', progress: 100, lessons: 10, total: 10, color: 'from-green-500 to-emerald-500' },
    { title: 'Backend Development', progress: 25, lessons: 3, total: 12, color: 'from-purple-500 to-pink-500' },
  ];

  const levelName = ['Beginner', 'Explorer', 'Developer', 'Builder', 'Engineer', 'Expert'];
  const xpForNextLevel = (level + 1) * 1000;
  const xpProgress = (xp / xpForNextLevel) * 100;

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Welcome back, {user?.name || 'Developer'}
          </h1>
          <p className="text-gray-400">Ready to continue your coding journey?</p>
        </div>

        {/* Level & XP Bar */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] flex items-center justify-center text-white font-bold text-lg">
                {level}
              </div>
              <div>
                <div className="text-white font-semibold">Level {level} — {levelName[level - 1]}</div>
                <div className="text-sm text-gray-400">{xp.toLocaleString()} XP</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Next: {levelName[level]}</div>
              <div className="text-sm text-[#00d4ff]">{xpForNextLevel - xp} XP to go</div>
            </div>
          </div>
          <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-full transition-all duration-500"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
        </div>

        {/* Streak Banner */}
        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/20 rounded-2xl p-6 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-xl">
              {streak}
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{streak} Day Coding Streak</div>
              <div className="text-sm text-gray-400">Keep it up! Code today to maintain your streak.</div>
            </div>
          </div>
          <Link
            to="/playground"
            className="px-4 py-2 bg-orange-500/20 border border-orange-500/30 text-orange-400 rounded-lg text-sm font-medium hover:bg-orange-500/30 transition"
          >
            Code Now
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center text-xl font-bold text-white mb-3`}>
                {stat.value}
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Continue Learning */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Continue Learning</h2>
            <div className="space-y-4">
              {learningPaths.map((path) => (
                <div key={path.title} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white">{path.title}</h3>
                    <span className="text-sm text-gray-400">{path.lessons}/{path.total} lessons</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full bg-gradient-to-r ${path.color} rounded-full`}
                      style={{ width: `${path.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{path.progress}% complete</span>
                    <Link
                      to="/learning-hub"
                      className="text-sm text-[#00d4ff] hover:underline"
                    >
                      {path.progress === 100 ? 'Review' : 'Continue'}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="space-y-4">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-start gap-3 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#00d4ff]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/playground" className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition group">
            <div className="text-2xl mb-2 font-bold text-[#00d4ff]">CODE</div>
            <div className="text-sm font-medium text-white group-hover:text-[#00d4ff] transition">Code Studio</div>
          </Link>
          <Link to="/quiz" className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition group">
            <div className="text-2xl mb-2 font-bold text-green-400">TEST</div>
            <div className="text-sm font-medium text-white group-hover:text-[#00d4ff] transition">Challenges</div>
          </Link>
          <Link to="/achievements" className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition group">
            <div className="text-2xl mb-2 font-bold text-yellow-400">WIN</div>
            <div className="text-sm font-medium text-white group-hover:text-[#00d4ff] transition">Achievements</div>
          </Link>
          <Link to="/learning-hub" className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition group">
            <div className="text-2xl mb-2 font-bold text-purple-400">LEARN</div>
            <div className="text-sm font-medium text-white group-hover:text-[#00d4ff] transition">Learn</div>
          </Link>
        </div>
      </div>
    </div>
  );
}