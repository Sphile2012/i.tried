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
  { path: '/ai-tutor', label: 'AI Tutor', icon: MessageSquare },
  { path: '/leaderboard', label: 'Leaderboard', icon: Award },
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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Left: Logo + Mobile Menu Button */}
            <div className="flex items-center gap-3">
              {/* Mobile Hamburger */}
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              {/* Logo */}
              <Link href="/">
                <div className="flex items-center gap-2 cursor-pointer">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                    <Code2 className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hidden sm:block">
                    Infinity Code
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Desktop Navigation - Organized menu */}
            <nav className="hidden lg:flex items-center gap-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link key={item.path} href={item.path}>
                    <div
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        active
                          ? 'bg-blue-500/10 text-blue-400'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* Right: Language Selector + Auth */}
            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <LanguageSelector className="hidden md:block" />
              
              {/* Auth Button */}
              {isAuthenticated ? (
                <Link href="/profile">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors cursor-pointer">
                    <UserIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">Profile</span>
                  </div>
                </Link>
              ) : (
                <Link href="/login">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer">
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-slate-800 bg-slate-950"
            >
              <nav className="px-4 py-3 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
                {/* Main Navigation */}
                <div className="mb-4">
                  <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Main
                  </div>
                  {mainNavItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                      <Link key={item.path} href={item.path} onClick={() => setMobileOpen(false)}>
                        <div
                          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                            active
                              ? 'bg-blue-500/10 text-blue-400'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <div>
                            <div>{item.label}</div>
                            {item.description && (
                              <div className="text-xs text-slate-500">{item.description}</div>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>



                {/* More Section */}
                <div>
                  <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    More
                  </div>
                  {moreNavItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                      <Link key={item.path} href={item.path} onClick={() => setMobileOpen(false)}>
                        <div
                          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                            active
                              ? 'bg-blue-500/10 text-blue-400'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          {item.label}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <Code2 className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm text-slate-400">
                Infinity Code &copy; {new Date().getFullYear()}
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
              <Link href="/lessons">
                <span className="hover:text-white transition-colors cursor-pointer">Learn</span>
              </Link>
              <Link href="/challenges">
                <span className="hover:text-white transition-colors cursor-pointer">Challenges</span>
              </Link>
              <Link href="/playground">
                <span className="hover:text-white transition-colors cursor-pointer">Playground</span>
              </Link>
              <Link href="/community">
                <span className="hover:text-white transition-colors cursor-pointer">Community</span>
              </Link>
              <Link href="/resources">
                <span className="hover:text-white transition-colors cursor-pointer">Resources</span>
              </Link>
              <Link href="/ai-tutor">
                <span className="hover:text-white transition-colors cursor-pointer">AI Tutor</span>
              </Link>
              <Link href="/download">
                <span className="hover:text-white transition-colors cursor-pointer">Download Content</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}