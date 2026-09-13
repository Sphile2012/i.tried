import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Home,
  Terminal,
  Target,
  Users,
  Library,
  Menu,
  X,
  GraduationCap,
  Briefcase,
  FileText,
  BookOpen,
  LayoutDashboard,
  TrendingUp,
  Award,
  MessageSquare,
  LogIn,
  User as UserIcon,
} from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';

interface NavItem {
  path: string;
  label: string;
  icon: typeof Home;
  description?: string;
}

// Organized navigation structure
const mainNavItems: NavItem[] = [
  { path: '/', label: 'Home', icon: Home, description: 'Platform overview' },
  { path: '/learn', label: 'Learn', icon: GraduationCap, description: 'Learning path' },
  { path: '/lesson-reader', label: 'Book', icon: BookOpen, description: 'Read lessons' },
  { path: '/lessons', label: 'Browse', icon: Library, description: 'Browse topics' },
  { path: '/playground', label: 'Playground', icon: Terminal, description: 'Code editor' },
  { path: '/code-comparison', label: 'Compare', icon: Code2, description: 'Compare languages' },
  { path: '/challenges', label: 'Challenges', icon: Target, description: 'Practice problems' },
  { path: '/friends', label: 'Friends', icon: Users, description: 'Connect with friends' },
  { path: '/inbox', label: 'Inbox', icon: MessageSquare, description: 'Messages' },
];

const userNavItems: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/achievements', label: 'Achievements', icon: Award },
  { path: '/portfolio', label: 'Portfolio', icon: FileText },
];

const moreNavItems: NavItem[] = [
  { path: '/resources', label: 'Resources', icon: Library },
  { path: '/community', label: 'Community', icon: Users },
  { path: '/learning-hub', label: 'Learning Hub', icon: BookOpen },
  { path: '/leaderboard', label: 'Leaderboard', icon: Award },
  { path: '/about', label: 'About', icon: BookOpen },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Check if user is logged in
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userEmail = localStorage.getItem('userEmail');

  const isActive = (path: string) => {
    if (path === '/') return location === '/';
    return location.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#0A1931] text-[#F5F7FF]">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-[#38BDF8]/20 bg-[#0A1931]/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Left: Logo */}
            <div className="flex items-center gap-3">
              {/* Logo */}
              <Link href="/">
                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#38BDF8]">
                    <Code2 className="h-5 w-5 text-[#0A1931]" />
                  </div>
                  <span className="text-lg font-bold text-[#F5F7FF] hidden sm:block">
                    Infinity Code
                  </span>
                </div>
              </Link>
            </div>

            {/* Right: Language Selector + Hamburger (ALWAYS VISIBLE) */}
            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <LanguageSelector className="hidden md:block" />

              {/* Hamburger Button - ALWAYS VISIBLE on ALL devices */}
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg text-[#F5F7FF] hover:text-[#38BDF8] hover:bg-[#F5F7FF]/10 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Dark Overlay */}
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/60 z-40"
                onClick={() => setMobileOpen(false)}
              />

              {/* Drawer from Right */}
              <motion.div
                key="drawer"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="fixed top-0 right-0 h-full w-[340px] max-w-[85vw] bg-[#F5F7FF] z-50 shadow-2xl overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => setMobileOpen(false)}
                  className="absolute top-6 right-6 text-[#0A1931] hover:text-[#38BDF8] transition"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Drawer Content */}
                <div className="p-8 pt-20">
                  {/* User Info */}
                  {isAuthenticated && userEmail && (
                    <div className="mb-8 pb-6 border-b border-[#0A1931]/10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-[#38BDF8] rounded-full flex items-center justify-center text-[#0A1931] font-bold text-lg">
                          {userEmail.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-[#0A1931]">{userEmail.split('@')[0]}</div>
                          <div className="text-sm text-[#0A1931]/60">Learner</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Main Navigation */}
                  <nav className="space-y-1 mb-6">
                    <div className="px-3 py-2 text-xs font-bold text-[#0A1931]/50 uppercase tracking-wider">
                      Main
                    </div>
                    {mainNavItems.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.path);
                      return (
                        <Link key={item.path} href={item.path} onClick={() => setMobileOpen(false)}>
                          <div
                            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                              active
                                ? 'bg-[#38BDF8] text-[#0A1931]'
                                : 'text-[#0A1931] hover:bg-[#38BDF8]/10'
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            <div>
                              <div>{item.label}</div>
                              {item.description && (
                                <div className="text-xs text-[#0A1931]/50">{item.description}</div>
                              )}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </nav>

                  {/* More Section */}
                  <nav className="space-y-1">
                    <div className="px-3 py-2 text-xs font-bold text-[#0A1931]/50 uppercase tracking-wider">
                      More
                    </div>
                    {moreNavItems.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.path);
                      return (
                        <Link key={item.path} href={item.path} onClick={() => setMobileOpen(false)}>
                          <div
                            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                              active
                                ? 'bg-[#38BDF8] text-[#0A1931]'
                                : 'text-[#0A1931] hover:bg-[#38BDF8]/10'
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            {item.label}
                          </div>
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Auth Section */}
                  <div className="mt-8 pt-6 border-t border-[#0A1931]/10">
                    {isAuthenticated ? (
                      <Link href="/profile" onClick={() => setMobileOpen(false)}>
                        <div className="flex items-center gap-2 px-4 py-3 text-[#0A1931] hover:bg-[#38BDF8]/10 rounded-lg font-medium transition cursor-pointer">
                          <UserIcon className="h-5 w-5" />
                          Profile
                        </div>
                      </Link>
                    ) : (
                      <>
                        <Link href="/login" onClick={() => setMobileOpen(false)}>
                          <div className="flex items-center gap-2 px-4 py-3 text-[#0A1931] hover:bg-[#38BDF8]/10 rounded-lg font-medium transition cursor-pointer mb-2">
                            <LogIn className="h-5 w-5" />
                            Sign In
                          </div>
                        </Link>
                        <Link href="/signup" onClick={() => setMobileOpen(false)}>
                          <div className="block px-4 py-3 bg-[#38BDF8] text-[#0A1931] hover:bg-[#38BDF8]/90 rounded-lg font-bold transition text-center cursor-pointer">
                            Get Started Free
                          </div>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#38BDF8]/20 mt-16">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#38BDF8]">
                <Code2 className="h-4 w-4 text-[#0A1931]" />
              </div>
              <span className="text-sm text-[#F5F7FF]/60">
                Infinity Code &copy; {new Date().getFullYear()}
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-[#F5F7FF]/60">
              <Link href="/lessons">
                <span className="hover:text-[#38BDF8] transition-colors cursor-pointer">Learn</span>
              </Link>
              <Link href="/challenges">
                <span className="hover:text-[#38BDF8] transition-colors cursor-pointer">Challenges</span>
              </Link>
              <Link href="/playground">
                <span className="hover:text-[#38BDF8] transition-colors cursor-pointer">Playground</span>
              </Link>
              <Link href="/community">
                <span className="hover:text-[#38BDF8] transition-colors cursor-pointer">Community</span>
              </Link>
              <Link href="/resources">
                <span className="hover:text-[#38BDF8] transition-colors cursor-pointer">Resources</span>
              </Link>
              <Link href="/about">
                <span className="hover:text-[#38BDF8] transition-colors cursor-pointer">About</span>
              </Link>
              <Link href="/download">
                <span className="hover:text-[#38BDF8] transition-colors cursor-pointer">Download Content</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}