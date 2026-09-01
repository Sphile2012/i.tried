/**
 * Multi-Language Profile - Per-language stats and badges
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  LANGUAGES, 
  LANGUAGE_ORDER, 
  type LanguageId,
  type LanguageProgress,
  calculateLanguageLevel,
  calculateTotalLevel,
  LANGUAGE_BADGES
} from '@/data/languages';
import { 
  TrendingUp, 
  Award, 
  Target, 
  Code, 
  Calendar,
  LogOut,
  Edit3,
  Trash2
} from 'lucide-react';
import { useLocation } from 'wouter';

export default function ProfileMultiLang() {
  const [, setLocation] = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userBio, setUserBio] = useState('');
  const [userGoal, setUserGoal] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  
  // Mock language progress - in real app, this would come from backend
  const [languageProgresses, setLanguageProgresses] = useState<LanguageProgress[]>([
    {
      languageId: 'cpp',
      xp: 1200,
      level: 5,
      completedLessons: ['variables', 'loops', 'functions'],
      currentLesson: 'arrays',
      isPrimary: true,
      startedAt: new Date('2024-01-15'),
      lastActiveAt: new Date(),
    },
    {
      languageId: 'python',
      xp: 400,
      level: 3,
      completedLessons: ['variables', 'loops'],
      currentLesson: 'functions',
      isPrimary: false,
      startedAt: new Date('2024-02-01'),
      lastActiveAt: new Date(),
    },
  ]);

  useEffect(() => {
    const email = localStorage.getItem('userEmail') || '';
    const name = localStorage.getItem('userName') || 'Developer';
    const bio = localStorage.getItem('userBio') || '';
    const goal = localStorage.getItem('learningGoal') || 'Master programming';
    const publicProfile = localStorage.getItem('isPublicProfile') !== 'false';
    
    setUserEmail(email);
    setUserName(name);
    setUserBio(bio);
    setUserGoal(goal);
    setIsPublic(publicProfile);
  }, []);

  const handleSave = () => {
    localStorage.setItem('userName', userName);
    localStorage.setItem('userBio', userBio);
    localStorage.setItem('learningGoal', userGoal);
    localStorage.setItem('isPublicProfile', isPublic.toString());
    setIsEditing(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    setLocation('/login');
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      localStorage.clear();
      setLocation('/login');
    }
  };

  const totalLevel = calculateTotalLevel(languageProgresses);
  const totalXP = languageProgresses.reduce((sum, prog) => sum + prog.xp, 0);
  const totalLessons = languageProgresses.reduce((sum, prog) => sum + prog.completedLessons.length, 0);
  const activeLanguages = languageProgresses.filter(p => p.completedLessons.length > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-slate-400">Track your progress across all languages</p>
        </div>
        <Button
          variant="outline"
          onClick={handleSignOut}
          className="min-h-[44px]"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>

      {/* User Info Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-3xl font-bold text-white">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{userName}</h2>
                <p className="text-slate-400">{userEmail}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              className="min-h-[44px]"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </CardHeader>
        {isEditing && (
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea
                value={userBio}
                onChange={(e) => setUserBio(e.target.value)}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[88px] resize-none"
                rows={3}
                placeholder="Tell us about yourself..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Learning Goal</label>
              <input
                type="text"
                value={userGoal}
                onChange={(e) => setUserGoal(e.target.value)}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]"
                placeholder="What do you want to achieve?"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="public-profile"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="public-profile" className="text-sm">
                Make my profile public
              </label>
            </div>
            <Button onClick={handleSave} className="w-full min-h-[44px]">
              Save Changes
            </Button>
          </CardContent>
        )}
      </Card>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-blue-500/20">
                <TrendingUp className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-slate-400">Total Level</div>
                <div className="text-2xl font-bold">{totalLevel}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-purple-500/20">
                <Award className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-slate-400">Total XP</div>
                <div className="text-2xl font-bold">{totalXP.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-green-500/20">
                <Target className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <div className="text-sm text-slate-400">Lessons Done</div>
                <div className="text-2xl font-bold">{totalLessons}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-orange-500/20">
                <Code className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <div className="text-sm text-slate-400">Languages</div>
                <div className="text-2xl font-bold">{activeLanguages.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Language Progress Cards */}
      <div>
        <h2 className="text-xl font-bold mb-4">My Languages</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {languageProgresses.map((progress) => {
            const lang = LANGUAGES[progress.languageId];
            const progressPercent = (progress.xp % 500) / 5;
            
            return (
              <Card key={progress.languageId} className="relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{
                    background: `linear-gradient(to right, ${lang.color} ${progressPercent}%, transparent ${progressPercent}%)`,
                  }}
                />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold text-white"
                        style={{ backgroundColor: lang.color }}
                      >
                        {lang.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{lang.displayName}</div>
                        <div className="text-sm text-slate-400">{lang.useCase}</div>
                      </div>
                    </div>
                    {progress.isPrimary && (
                      <div className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                        Primary
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Level and XP */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold" style={{ color: lang.color }}>
                        Level {progress.level}
                      </div>
                      <div className="text-sm text-slate-400">
                        {progress.xp.toLocaleString()} XP
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-400">Lessons</div>
                      <div className="text-xl font-bold">{progress.completedLessons.length}</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-400">Progress to Level {progress.level + 1}</span>
                      <span className="text-slate-300">{Math.floor(progressPercent)}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${progressPercent}%`,
                          backgroundColor: lang.color,
                        }}
                      />
                    </div>
                  </div>

                  {/* Current Lesson */}
                  {progress.currentLesson && (
                    <div className="p-3 bg-slate-800/50 rounded-lg">
                      <div className="text-sm text-slate-400 mb-1">Currently Learning</div>
                      <div className="font-semibold capitalize">{progress.currentLesson}</div>
                    </div>
                  )}

                  {/* Last Active */}
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Calendar className="h-4 w-4" />
                    <span>Last active: {progress.lastActiveAt.toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Add New Language */}
        {activeLanguages.length < 6 && (
          <Card className="mt-4 border-dashed border-2 border-slate-700 hover:border-slate-600 transition-colors">
            <CardContent className="p-8 text-center">
              <div className="text-slate-400 mb-4">Add a new language to your learning path</div>
              <div className="flex flex-wrap gap-3 justify-center">
                {LANGUAGE_ORDER.filter(
                  langId => !languageProgresses.find(p => p.languageId === langId)
                ).map((langId) => {
                  const lang = LANGUAGES[langId];
                  return (
                    <button
                      key={langId}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors min-h-[44px] touch-target"
                    >
                      <div
                        className="w-8 h-8 rounded flex items-center justify-center text-sm font-bold text-white"
                        style={{ backgroundColor: lang.color }}
                      >
                        {lang.icon}
                      </div>
                      <span className="font-medium">{lang.displayName}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Language Badges */}
      <div>
        <h2 className="text-xl font-bold mb-4">Badges</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LANGUAGE_BADGES.map((badge) => {
            const lang = LANGUAGES[badge.languageId];
            const earned = false; // In real app, check if user earned this badge
            
            return (
              <Card
                key={badge.id}
                className={`${earned ? 'border-yellow-500/50' : 'opacity-50'}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                      style={{ backgroundColor: earned ? lang.color : '#334155' }}
                    >
                      {earned ? badge.icon : '🔒'}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{badge.name}</div>
                      <div className="text-sm text-slate-400 mt-1">{badge.description}</div>
                      <div className="text-xs text-slate-500 mt-2">{badge.requirement}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Danger Zone */}
      <Card className="border-red-500/30">
        <CardHeader>
          <h3 className="text-lg font-semibold text-red-400">Danger Zone</h3>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            onClick={handleDeleteAccount}
            className="border-red-500/50 text-red-400 hover:bg-red-500/10 min-h-[44px]"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
