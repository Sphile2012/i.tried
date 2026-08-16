import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
        // Don't navigate, let them know to check email
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
          <h1 className="text-3xl font-bold text-white">Create your account</h1>
          <p className="mt-2 text-sm text-slate-400">Start your coding journey today.</p>
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