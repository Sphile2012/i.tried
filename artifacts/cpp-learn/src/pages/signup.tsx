import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Loader2, CheckCircle, AlertCircle, Github } from 'lucide-react';
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
  const { signup } = useAuth();
  const [, navigate] = useLocation();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [needsEmailConfirmation, setNeedsEmailConfirmation] = useState(false);

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
    if (!password) {
      return 'Password is required.';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters.';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    setNeedsEmailConfirmation(false);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    const result = await signup(email, password, name, username);
    if (result.success) {
      setNeedsEmailConfirmation(result.needsEmailConfirmation || false);
      if (result.needsEmailConfirmation) {
        setSuccessMessage('Account created! Please check your email to verify your account before logging in.');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(result.error || 'Signup failed');
    }
    setIsLoading(false);
  };

  const passwordStrength = () => {
    if (password.length === 0) return null;
    if (password.length < 6) return { strength: 'weak', text: 'Weak', color: 'text-red-400' };
    if (password.length < 8) return { strength: 'medium', text: 'Medium', color: 'text-yellow-400' };
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return { strength: 'strong', text: 'Strong', color: 'text-green-400' };
    }
    return { strength: 'medium', text: 'Medium', color: 'text-yellow-400' };
  };

  const strength = passwordStrength();

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

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-700/40 bg-red-950/40 p-3 text-sm text-red-300">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-700/40 bg-emerald-950/40 p-3 text-sm text-emerald-300">
            <CheckCircle className="h-4 w-4 flex-shrink-0" />
            {successMessage}
          </div>
        )}

        {!successMessage ? (
          <>
            {/* Social Sign-In Options - Above Form */}
            <div className="space-y-3 mb-6">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setError('Google Sign-In is not configured. Please use email/password signup.')}
                  className="h-12 bg-slate-950 border-slate-700 text-white hover:bg-slate-800 font-medium"
                >
                  <GoogleIcon className="mr-2" />
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setError('GitHub Sign-In is not configured. Please use email/password signup.')}
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
                  <span className="bg-slate-900 px-3 text-slate-400">or sign up with email</span>
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

              <div>
                <Label htmlFor="password" className="mb-2 block text-white">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input 
                    id="password" 
                    type={showPassword ? 'text' : 'password'} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="h-12 pl-10 pr-10 bg-slate-950 text-white" 
                    placeholder="••••••••" 
                    required 
                    minLength={6}
                    autoComplete="new-password"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {strength && (
                  <p className={`mt-1 text-xs ${strength.color}`}>
                    Password strength: {strength.text}
                  </p>
                )}
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
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-900/30 border border-emerald-700/50">
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Account Created!</h2>
            <p className="text-slate-400 mb-6">
              {needsEmailConfirmation 
                ? 'Please check your email to verify your account before logging in.'
                : 'You can now access your dashboard.'
              }
            </p>
            {!needsEmailConfirmation && (
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                Go to Dashboard
              </Button>
            )}
            <Link 
              href="/login" 
              className="mt-4 block text-sm text-blue-400 hover:text-blue-300 hover:underline"
            >
              Go to login
            </Link>
          </div>
        )}

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