/**
 * Invite Landing Page
 * Shows when someone clicks an invite link like infinitycode.com/invite/phumeh
 * Displays install button if not logged in, or navigates to profile if logged in
 */

import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { Link } from 'wouter';
import { UserPlus, Code, Zap, Users, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export default function InvitePage() {
  const { username } = useParams();
  const [, navigate] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [inviterProfile, setInviterProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If user is already logged in, navigate to the inviter's profile
    if (isAuthenticated && username) {
      navigate(`/profile/${username}`);
      return;
    }

    // Fetch inviter profile info
    const fetchInviterProfile = async () => {
      try {
        const response = await fetch(`/api/users/profile/${username}`);
        if (response.ok) {
          const data = await response.json();
          setInviterProfile(data);
        }
      } catch (error) {
        console.error('Error fetching inviter profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchInviterProfile();
    } else {
      setLoading(false);
    }
  }, [username, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00d4ff]"></div>
          <p className="text-gray-400 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0d0d1a] to-[#0a0a0f]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00d4ff]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7c3aed]/10 rounded-full blur-[120px]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          {/* Invite Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#00d4ff]/10 to-[#7c3aed]/10 border-b border-white/10 p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] rounded-full mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              {inviterProfile ? (
                <>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {inviterProfile.displayName || inviterProfile.username} invited you!
                  </h1>
                  <p className="text-gray-400">
                    Join Infinity Code and connect with {inviterProfile.username}
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    You're invited to Infinity Code
                  </h1>
                  <p className="text-gray-400">
                    Start learning to code by building real projects
                  </p>
                </>
              )}
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              {inviterProfile && (
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {inviterProfile.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">
                      {inviterProfile.displayName || inviterProfile.username}
                    </h3>
                    <p className="text-sm text-gray-400">@{inviterProfile.username}</p>
                    {inviterProfile.level && (
                      <p className="text-xs text-[#00d4ff] mt-1">
                        Level {inviterProfile.level} Developer
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="space-y-4 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">What you'll get:</h3>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center flex-shrink-0">
                    <Code className="w-5 h-5 text-[#00d4ff]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Learn by building</h4>
                    <p className="text-sm text-gray-400">
                      Write real code from day one. No videos, just hands-on projects.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#7c3aed]/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-[#7c3aed]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Connect with friends</h4>
                    <p className="text-sm text-gray-400">
                      Add friends, see their progress, and learn together.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-[#00d4ff]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Track your growth</h4>
                    <p className="text-sm text-gray-400">
                      Earn XP, unlock achievements, and level up as you learn.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Link
                  href={`/signup?invite=${username || ''}`}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white rounded-xl font-semibold hover:opacity-90 transition"
                >
                  Create Account & Join
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/login"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 transition"
                >
                  Already have an account? Log in
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-400 transition">
              Learn more about Infinity Code
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
