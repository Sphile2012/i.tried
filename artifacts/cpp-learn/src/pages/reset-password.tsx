import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ResetPasswordPage() {
  const { updatePassword } = useAuth();
  const [, navigate] = useLocation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Check if we have a valid reset token in the URL (for Supabase)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      const type = params.get('type');
      
      if (type === 'recovery' && accessToken) {
        // Supabase will automatically handle the session with this token
        // The user is now authenticated and can update their password
      }
    }
  }, []);

  const validateForm = () => {
    if (!newPassword) {
      return 'New password is required.';
    }
    if (newPassword.length < 6) {
      return 'Password must be at least 6 characters.';
    }
    if (newPassword !== confirmPassword) {
      return 'Passwords do not match.';
    }
    return null;
  };

  const passwordStrength = () => {
    if (newPassword.length === 0) return null;
    if (newPassword.length < 6) return { strength: 'weak', text: 'Weak', color: 'text-red-400' };
    if (newPassword.length < 8) return { strength: 'medium', text: 'Medium', color: 'text-yellow-400' };
    if (/[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword)) {
      return { strength: 'strong', text: 'Strong', color: 'text-green-400' };
    }
    return { strength: 'medium', text: 'Medium', color: 'text-yellow-400' };
  };

  const strength = passwordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    const result = await updatePassword('', newPassword);
    if (result.success) {
      setSuccessMessage(result.message || 'Password updated successfully!');
      // Redirect to login after a delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setError(result.error || 'Failed to update password');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl"
      >
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white">Reset password</h1>
          <p className="mt-2 text-sm text-slate-400">
            Enter your new password below.
          </p>
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="newPassword" className="mb-2 block text-white">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input 
                  id="newPassword" 
                  type={showNewPassword ? 'text' : 'password'} 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  className="h-12 pl-10 pr-10 bg-slate-950 text-white" 
                  placeholder="••••••••" 
                  required 
                  minLength={6}
                  autoComplete="new-password"
                />
                <button 
                  type="button" 
                  onClick={() => setShowNewPassword(!showNewPassword)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                  aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {strength && (
                <p className={`mt-1 text-xs ${strength.color}`}>
                  Password strength: {strength.text}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="mb-2 block text-white">Confirm New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input 
                  id="confirmPassword" 
                  type={showConfirmPassword ? 'text' : 'password'} 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  className="h-12 pl-10 pr-10 bg-slate-950 text-white" 
                  placeholder="••••••••" 
                  required 
                  minLength={6}
                  autoComplete="new-password"
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="mt-1 text-xs text-red-400">
                  Passwords do not match.
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
                  Updating password...
                </>
              ) : (
                'Update password'
              )}
            </Button>
          </form>
        ) : (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-900/30 border border-emerald-700/50">
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Password Updated!</h2>
            <p className="text-slate-400 mb-6">
              Your password has been successfully reset. Redirecting to login...
            </p>
            <Link 
              href="/login" 
              className="text-blue-400 hover:text-blue-300 hover:underline"
            >
              Go to login now
            </Link>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-slate-400">
          Remember your password?{' '}
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