/**
 * User Profile Page
 * Simple email-only auth with profile editing
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  User, 
  Mail, 
  Save, 
  LogOut, 
  CheckCircle,
  AlertCircle,
  Target,
  Globe,
  Trash2
} from 'lucide-react';

const LEARNING_GOALS = [
  { value: 'absolute-beginner', label: 'Absolute Beginner - Just starting out' },
  { value: 'daily-exerciser', label: 'Daily Exerciser - Practice every day' },
  { value: 'career-switcher', label: 'Career Switcher - Transitioning to tech' },
  { value: 'skill-builder', label: 'Skill Builder - Expanding my toolkit' },
  { value: 'interview-prep', label: 'Interview Prep - Preparing for interviews' },
];

export default function ProfilePage() {
  const [, navigate] = useLocation();
  
  // Check authentication
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const storedEmail = localStorage.getItem('userEmail') || '';
  
  // Profile fields
  const [name, setName] = useState(localStorage.getItem('userName') || '');
  const [bio, setBio] = useState(localStorage.getItem('userBio') || '');
  const [learningGoal, setLearningGoal] = useState(
    localStorage.getItem('userLearningGoal') || 'absolute-beginner'
  );
  const [publicPortfolio, setPublicPortfolio] = useState(
    localStorage.getItem('publicPortfolio') === 'true'
  );
  
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    
    // Save to localStorage
    localStorage.setItem('userName', name);
    localStorage.setItem('userBio', bio);
    localStorage.setItem('userLearningGoal', learningGoal);
    localStorage.setItem('publicPortfolio', String(publicPortfolio));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setMessage('Profile updated successfully');
    setMessageType('success');
    setIsSaving(false);
    
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeleteAccount = () => {
    // Clear all user data
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/80 p-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Profile</h1>
            <p className="mt-2 text-sm text-slate-400">Manage your learning profile</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-white hover:bg-slate-800 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>

        {/* Messages */}
        {message && (
          <div className={`mb-6 flex items-center gap-2 rounded-lg border p-3 text-sm ${
            messageType === 'success' 
              ? 'border-emerald-800 bg-emerald-950/40 text-emerald-300' 
              : 'border-red-800 bg-red-950/40 text-red-300'
          }`}>
            {messageType === 'success' ? (
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
            )}
            {message}
          </div>
        )}

        {/* Profile Form */}
        <div className="space-y-6">
          {/* Personal Information */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Personal Information</h2>
            <div className="space-y-4">
              {/* Email (read-only) */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-slate-800/30 border border-slate-700 rounded-lg">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-300">{storedEmail}</span>
                  </div>
                  <CheckCircle className="h-5 w-5 text-emerald-400" />
                </div>
                <p className="mt-1 text-xs text-slate-500">Email cannot be changed</p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell others about your learning journey..."
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                />
              </div>
            </div>
          </div>

          {/* Learning Goal */}
          <div className="pt-6 border-t border-slate-800">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-400" />
              Learning Goal
            </h2>
            <p className="text-sm text-slate-400 mb-4">
              Your learning goal helps us recommend the right content for you.
            </p>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Current Goal
              </label>
              <select
                value={learningGoal}
                onChange={(e) => setLearningGoal(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                {LEARNING_GOALS.map((goal) => (
                  <option key={goal.value} value={goal.value}>
                    {goal.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Preferences */}
          <div className="pt-6 border-t border-slate-800">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-400" />
              Preferences
            </h2>
            <div className="space-y-4">
              {/* Public Portfolio Toggle */}
              <div className="flex items-center justify-between p-4 rounded-lg border border-slate-700 bg-slate-800/30">
                <div>
                  <p className="text-sm font-medium text-white">Public Portfolio</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Share your portfolio projects with recruiters
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={publicPortfolio}
                  onClick={() => setPublicPortfolio(!publicPortfolio)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    publicPortfolio ? 'bg-blue-600' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      publicPortfolio ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                Save Profile
              </>
            )}
          </button>
        </div>

        {/* Danger Zone */}
        <div className="mt-10 pt-10 border-t border-slate-800">
          <h2 className="text-xl font-semibold text-white mb-4">Danger Zone</h2>
          
          {showDeleteConfirm ? (
            <div className="rounded-lg border border-red-800 bg-red-950/40 p-4">
              <p className="text-sm text-red-300 mb-4">
                Are you sure? This will permanently delete your account and all data. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={confirmDeleteAccount}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
                >
                  Yes, delete my account
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 border border-slate-700 text-white rounded-lg hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleDeleteAccount}
              className="text-sm text-slate-500 hover:text-red-400 transition-colors"
            >
              Delete account
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
