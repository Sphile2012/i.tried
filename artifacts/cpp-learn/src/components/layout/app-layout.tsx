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
  User,
  Menu,
  X,
  LogOut,
  LogIn,
  UserPlus,
  Crown,
  Shield,
  Settings,
  GraduationCap,
  Briefcase,
  FileText,
  Sparkles,
  LayoutDashboard,
  Info,
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';

interface NavItem {
  path: string;
  label: string;
  icon: typeof Home;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/lessons', label: 'Learn', icon: GraduationCap },
  { path: '/playground', label: 'Code', icon: Terminal },
  { path: '/challenges', label: 'Challenges', icon: Target },
  { path: '/community', label: 'Community', icon: Users },
  { path: '/resources', label: 'Resources', icon: Library },
  { path: '/about', label: 'About', icon: Info },
  { path: '/career', label: 'Career', icon: Briefcase },
  { path: '/portfolio', label: 'Portfolio', icon: FileText },
  { path: '/ai-tutor', label: 'AI Tutor', icon: Sparkles },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, logout } = useAuth();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location === '/';
    return location.startsWith(path);
  };

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
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

            {/* Center: Desktop Navigation - Only show key items */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.slice(0, 6).map((item) => {
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

            {/* Right: Auth Buttons or User Menu */}
            <div className="flex items-center gap-3">
              {isAuthenticated && user ? (
                <>
                  {/* Premium Badge */}
                  {user.subscription_status === 'premium' && (
                    <span className="hidden sm:flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 px-3 py-1 text-xs font-semibold text-black">
                      <Crown className="h-3 w-3" />
                      Premium
                    </span>
                  )}

                  {/* Admin Badge */}
                  {user.role === 'admin' && (
                    <Link href="/admin">
                      <span className="hidden sm:flex items-center gap-1 rounded-full bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-300 hover:bg-purple-500/30 transition-colors cursor-pointer">
                        <Shield className="h-3 w-3" />
                        Admin
                      </span>
                    </Link>
                  )}

                  {/* User Menu */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-slate-800/50 transition-colors"
                    >
                      <img
                        src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3898FF&color=fff&size=80`}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover border-2 border-slate-700"
                      />
                      <span className="hidden md:block text-sm text-slate-300 max-w-[100px] truncate">
                        {user.name?.split(' ')[0] || 'User'}
                      </span>
                    </button>

                    {/* User Dropdown */}
                    <AnimatePresence>
                      {userMenuOpen && (
                        <>
                          <div
                            key="backdrop"
                            className="fixed inset-0 z-40"
                            onClick={() => setUserMenuOpen(false)}
                          />
                          <motion.div
                            key="dropdown-menu"
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-800 bg-slate-900 shadow-2xl z-[60] overflow-hidden"
                          >
                            <div className="p-3 border-b border-slate-800">
                              <p className="text-sm font-medium text-white truncate">{user.name}</p>
                              <p className="text-xs text-slate-400 truncate">{user.email}</p>
                            </div>
                            <div className="p-2">
                              <Link href="/profile" onClick={() => setUserMenuOpen(false)}>
                                <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer">
                                  <User className="h-4 w-4" />
                                  Profile
                                </div>
                              </Link>
                              <Link href="/dashboard" onClick={() => setUserMenuOpen(false)}>
                                <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer">
                                  <LayoutDashboard className="h-4 w-4" />
                                  Dashboard
                                </div>
                              </Link>
                              {user.subscription_status !== 'premium' && (
                                <Link href="/subscription" onClick={() => setUserMenuOpen(false)}>
                                  <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer">
                                    <Crown className="h-4 w-4" />
                                    Upgrade to Premium
                                  </div>
                                </Link>
                              )}
                              <Link href="/settings" onClick={() => setUserMenuOpen(false)}>
                                <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer">
                                  <Settings className="h-4 w-4" />
                                  Settings
                                </div>
                              </Link>
                              {user.role === 'admin' && (
                                <Link href="/admin" onClick={() => setUserMenuOpen(false)}>
                                  <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer">
                                    <Shield className="h-4 w-4" />
                                    Admin Dashboard
                                  </div>
                                </Link>
                              )}
                              <button
                                onClick={handleLogout}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-950/40 transition-colors"
                              >
                                <LogOut className="h-4 w-4" />
                                Log out
                              </button>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <Button variant="outline" size="sm" className="text-slate-300 hover:text-white border-slate-700">
                      <LogIn className="h-4 w-4 sm:mr-1" />
                      <span className="hidden sm:inline">Log In</span>
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      <UserPlus className="h-4 w-4 sm:mr-1" />
                      <span className="hidden sm:inline">Sign Up</span>
                    </Button>
                  </Link>
                </div>
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
                {navItems.map((item) => {
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
                
                {/* Mobile: Additional Links */}
                {isAuthenticated && (
                  <>
                    <Link href="/profile" onClick={() => setMobileOpen(false)}>
                      <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 cursor-pointer">
                        <User className="h-5 w-5" />
                        Profile
                      </div>
                    </Link>
                    <Link href="/settings" onClick={() => setMobileOpen(false)}>
                      <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 cursor-pointer">
                        <Settings className="h-5 w-5" />
                        Settings
                      </div>
                    </Link>
                    {user?.role === 'admin' && (
                      <Link href="/admin" onClick={() => setMobileOpen(false)}>
                        <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 cursor-pointer">
                          <Shield className="h-5 w-5" />
                          Admin Dashboard
                        </div>
                      </Link>
                    )}
                  </>
                )}
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}