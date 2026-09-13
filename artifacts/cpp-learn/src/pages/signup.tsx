import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Mail, User, Loader2, CheckCircle, AlertCircle, Github, UserPlus } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Google icon as inline SVG (no external dependency)
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="20" height="20">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

export default function SignupPage() {
  const [, navigate] = useLocation();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inviteUsername, setInviteUsername] = useState<string>('');

  // Check for invite parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const invite = params.get('invite');
    if (invite) {
      setInviteUsername(invite);
    }
  }, []);

  const validateForm = () => {
    if (!name.trim()) {
      return 'Full name is required.';
    }
    if (!username.trim()) {
      return 'Username is required.';
    }
    if (username.length < 3) {
      return 'Username must be at least 3 characters.';
    }
    if (!email.trim()) {
      return 'Email is required.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Please enter a valid email address.';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    // Check if user already exists (simulate with localStorage check)
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = existingUsers.some((u: any) => u.email === email || u.username === username);

    if (userExists) {
      setError('You already have an account. Please sign in instead.');
      setIsLoading(false);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    // Create account
    const newUser = {
      name,
      username,
      email,
      createdAt: new Date().toISOString(),
    };

    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', name);

    setIsLoading(false);
    navigate('/dashboard');
  };

  const handleGoogleSignIn = () => {
    setError('Google Sign-In coming soon!');
  };

  const handleGitHubSignIn = () => {
    setError('GitHub Sign-In coming soon!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl"
      >
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white">Start coding in minutes</h1>
          <p className="mt-2 text-sm text-slate-400">Your first working program is just a few clicks away.</p>
        </div>

        {/* Invite Banner */}
        {inviteUsername && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-blue-700/40 bg-blue-950/40 p-3 text-sm text-blue-300">
            <UserPlus className="h-4 w-4 flex-shrink-0" />
            <span>You were invited by <strong>@{inviteUsername}</strong></span>
          </div>
        )}

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-700/40 bg-red-950/40 p-3 text-sm text-red-300">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Social Sign-In Options */}
        <div className="space-y-3 mb-6">
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              className="h-12 bg-slate-950 border-slate-700 text-white hover:bg-slate-800 font-medium"
            >
              <GoogleIcon className="mr-2" />
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleGitHubSignIn}
              className="h-12 bg-slate-950 border-slate-700 text-white hover:bg-slate-800 font-medium"
            >
              <Github className="mr-2 h-5 w-5" />
              GitHub
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-slate-900 px-3 text-slate-400">or continue with email</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="mb-2 block text-white">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input 
                id="name" 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="h-12 pl-10 bg-slate-950 text-white" 
                placeholder="Your name" 
                required 
                autoComplete="name"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="username" className="mb-2 block text-white">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input 
                id="username" 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))} 
                className="h-12 pl-10 bg-slate-950 text-white" 
                placeholder="username" 
                required 
                minLength={3} 
                maxLength={20}
                autoComplete="username"
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">3-20 characters, letters, numbers, and underscores only.</p>
          </div>

          <div>
            <Label htmlFor="email" className="mb-2 block text-white">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="h-12 pl-10 bg-slate-950 text-white" 
                placeholder="your@email.com" 
                required 
                autoComplete="email"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading} 
            className="h-12 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              'Create account'
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link 
            href="/login" 
            className="font-semibold text-blue-400 hover:text-blue-300 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}