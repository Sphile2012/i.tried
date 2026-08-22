/**
 * Infinity Code - Mobile Navigation Component
 * Bottom tab bar optimized for mobile devices with smooth animations
 */

import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  BookOpen,
  Code,
  Trophy,
  User,
  Menu,
  X,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronRight,
  Zap,
  Target,
  Calendar,
  Award,
  FileText,
  Users,
  Brain,
  BarChart3,
  Briefcase,
  FolderCode,
  GitBranch,
  FileSpreadsheet,
  Clock,
  Bookmark
} from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

const mainNavItems: NavItem[] = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/lessons', label: 'Learn', icon: BookOpen },
  { path: '/playground', label: 'Code', icon: Code },
  { path: '/achievements', label: 'Awards', icon: Trophy },
  { path: '/profile', label: 'Profile', icon: User },
];

const drawerNavItems: NavItem[] = [
  // Learning
  { path: '/learning-hub', label: 'Learning Hub', icon: Calendar },
  { path: '/lessons', label: 'Lessons', icon: BookOpen },
  { path: '/challenges', label: 'Coding Challenges', icon: Zap },
  { path: '/build-across-languages', label: 'Build an App', icon: Code },
  
  // Practice
  { path: '/playground', label: 'Code Editor', icon: Code },
  { path: '/quiz', label: 'Quizzes', icon: Brain },
  { path: '/flashcards', label: 'Flashcards', icon: FileText },
  
  // Progress
  { path: '/dashboard', label: 'Dashboard', icon: Target },
  { path: '/progress-tracker', label: 'Progress', icon: BarChart3 },
  { path: '/achievements', label: 'Achievements', icon: Trophy },
  { path: '/leaderboard', label: 'Leaderboard', icon: Award },
  
  // Resources
  { path: '/resources', label: 'Resources', icon: FileText },
  { path: '/glossary', label: 'Glossary', icon: BookOpen },
  { path: '/documentation', label: 'Documentation', icon: FileText },
  
  // Career
  { path: '/career', label: 'Career Development', icon: Briefcase },
  { path: '/portfolio', label: 'Portfolio', icon: FolderCode },
  { path: '/profile', label: 'Resume Builder', icon: FileSpreadsheet },
  
  // Community & AI
  { path: '/community', label: 'Community', icon: Users },
  { path: '/ai-tutor', label: 'AI Tutor', icon: Brain },
  
  // Account
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function MobileNav() {
  const [location] = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const isActive = (path: string) => location === path || location.startsWith(path + '/');

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0a0a0f]/95 backdrop-blur-lg border-t border-white/10 z-50 safe-area-bottom">
        <div className="flex items-center justify-around py-2">
          {mainNavItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative flex flex-col items-center justify-center w-full py-2 px-1"
              >
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#00d4ff]/20 to-[#7c3aed]/20 rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative z-10 flex flex-col items-center">
                  <Icon
                    className={`w-5 h-5 mb-1 ${
                      active
                        ? 'text-[#00d4ff]'
                        : 'text-gray-500'
                    }`}
                  />
                  <span
                    className={`text-[10px] ${
                      active ? 'text-[#00d4ff] font-medium' : 'text-gray-500'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                {item.badge && item.badge > 0 && (
                  <span className="absolute top-1 right-1/4 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Safe area for iOS home indicator */}
        <div className="h-safe-area-inset-bottom bg-[#0a0a0f]" />
      </nav>

      {/* Mobile Top Bar */}
      <header className="fixed top-0 left-0 right-0 bg-[#0a0a0f]/95 backdrop-blur-lg border-b border-white/10 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Menu Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors active:scale-95"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent">
              IC
            </span>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-400 hover:text-white transition-colors active:scale-95"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <Link
              to="/settings"
              className="p-2 text-gray-400 hover:text-white transition-colors active:scale-95"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Search Bar (visible on scroll) */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search topics, lessons, challenges..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors"
            />
          </div>
        </div>
      </header>

      {/* Drawer / Side Menu */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => setIsDrawerOpen(false)}
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-[#0d0d1a] border-r border-white/10 z-50 overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] flex items-center justify-center text-white font-bold text-lg">
                      JD
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">John Doe</h3>
                      <p className="text-sm text-gray-500">Free Plan</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-[#00d4ff]">12</div>
                    <div className="text-xs text-gray-500">Lessons</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-[#7c3aed]">450</div>
                    <div className="text-xs text-gray-500">XP</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-400">7</div>
                    <div className="text-xs text-gray-500">Streak</div>
                  </div>
                </div>
              </div>

              {/* Drawer Navigation */}
              <nav className="p-4">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Menu
                </h4>
                <div className="space-y-1">
                  {drawerNavItems.map((item) => {
                    const active = isActive(item.path);
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsDrawerOpen(false)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors active:scale-[0.98] ${
                          active
                            ? 'bg-gradient-to-r from-[#00d4ff]/20 to-[#7c3aed]/20 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          <span className="text-sm font-medium">{item.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    );
                  })}
                </div>
              </nav>

              {/* Upgrade Card */}
              <div className="p-4 mt-4">
                <div className="bg-gradient-to-r from-[#00d4ff]/20 to-[#7c3aed]/20 rounded-2xl p-4 border border-white/10">
                  <h4 className="text-white font-semibold mb-2">Go Pro</h4>
                  <p className="text-sm text-gray-400 mb-3">
                    Unlock unlimited access to all courses, projects, and AI features.
                  </p>
                  <button className="w-full py-2 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition">
                    Upgrade Now
                  </button>
                </div>
              </div>

              {/* Logout */}
              <div className="p-4 mt-4 border-t border-white/10">
                <button className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-300 transition-colors active:scale-[0.98]">
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {showNotifications && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setShowNotifications(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed top-20 right-4 w-80 max-w-[calc(100vw-2rem)] bg-[#0d0d1a] border border-white/10 rounded-2xl shadow-2xl z-50"
            >
              <div className="p-4 border-b border-white/10">
                <h3 className="text-white font-semibold">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-4 text-sm text-gray-500 text-center">
                  No new notifications
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Mobile-only wrapper that shows MobileNav on mobile and nothing on desktop
 */
export function MobileNavWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <MobileNav />
      </div>

      {/* Content with padding for fixed nav */}
      <main className="lg:pt-0 pt-16 pb-20 lg:pb-0">
        {children}
      </main>
    </div>
  );
}