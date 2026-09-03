/**
 * Passwordless Email Login
 * User enters email, receives magic link to sign in
 */

import { useState } from 'react';
import { Link } from 'wouter';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending magic link
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store email in localStorage for demo
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isAuthenticated', 'true');
    
    setSent(true);
    setLoading(false);

    // Redirect to dashboard after 2 seconds
    setTimeout(() => {
      window.location.href = '/profile';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0d0d1a] to-[#0a0a0f]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00d4ff]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7c3aed]/10 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Sign in to Infinity Code</h1>
            <p className="text-slate-400 text-sm">
              Enter your email to receive a magic link
            </p>
          </div>

          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@email.com"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending magic link...
                  </>
                ) : (
                  <>
                    Continue with email
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 mb-2">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">Check your email</h2>
              <p className="text-slate-400">
                We sent a magic link to <span className="text-blue-400">{email}</span>
              </p>
              <p className="text-sm text-slate-500">
                Click the link to sign in instantly. No password needed.
              </p>
            </div>
          )}

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-900/80 text-slate-500">
                No account needed
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="text-center space-y-2">
            <p className="text-sm text-slate-400">
              Signing in will create an account automatically
            </p>
            <Link href="/">
              <span className="text-sm text-blue-400 hover:text-blue-300 transition cursor-pointer">
                Back to home
              </span>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="text-slate-400">
            <div className="text-sm font-semibold mb-1 text-white">Secure</div>
            <div className="text-xs">No passwords</div>
          </div>
          <div className="text-slate-400">
            <div className="text-sm font-semibold mb-1 text-white">Instant</div>
            <div className="text-xs">One-click access</div>
          </div>
          <div className="text-slate-400">
            <div className="text-sm font-semibold mb-1 text-white">Simple</div>
            <div className="text-xs">Email only</div>
          </div>
        </div>
      </div>
    </div>
  );
}
