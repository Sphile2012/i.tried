import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { useLocation } from 'wouter';
import {
  Users,
  TrendingUp,
  Award,
  BarChart3,
  Search,
  Shield,
  ArrowUpRight,
} from 'lucide-react';

interface LevelStatistics {
  usersByLevel: {
    BEGINNER: number;
    INTERMEDIATE: number;
    EXPERT: number;
  };
  averageProgressionTimes: {
    beginnerToIntermediate: number | null;
    intermediateToExpert: number | null;
  };
  quizScoreDistribution: Array<{
    scoreRange: string;
    count: number;
  }>;
}

export default function AdminDashboard() {
  const { user } = useUser();
  const [, setLocation] = useLocation();
  const [statistics, setStatistics] = useState<LevelStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    // Check if user is admin
    if (!user || user.role !== 'ADMIN') {
      setLocation('/dashboard');
      return;
    }

    fetchStatistics();
  }, [user]);

  const fetchStatistics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        'http://localhost:3000/api/admin/statistics/levels',
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setStatistics(data);
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:3000/api/admin/users/search?q=${encodeURIComponent(searchQuery)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      }
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const totalUsers = statistics
    ? statistics.usersByLevel.BEGINNER +
      statistics.usersByLevel.INTERMEDIATE +
      statistics.usersByLevel.EXPERT
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600">
                  Level-Based Progression Management
                </p>
              </div>
            </div>
            <button
              onClick={() => setLocation('/dashboard')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {totalUsers}
            </div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8 text-amber-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {statistics?.usersByLevel.BEGINNER || 0}
            </div>
            <div className="text-sm text-gray-600">Beginner Level</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {statistics?.usersByLevel.INTERMEDIATE || 0}
            </div>
            <div className="text-sm text-gray-600">Intermediate Level</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {statistics?.usersByLevel.EXPERT || 0}
            </div>
            <div className="text-sm text-gray-600">Expert Level</div>
          </div>
        </div>

        {/* Progression Times */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ArrowUpRight className="w-5 h-5 text-green-600" />
              Average Progression Times
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">
                    Beginner → Intermediate
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {statistics?.averageProgressionTimes.beginnerToIntermediate
                      ? `${statistics.averageProgressionTimes.beginnerToIntermediate} days`
                      : 'N/A'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-2/3" />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">
                    Intermediate → Expert
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {statistics?.averageProgressionTimes.intermediateToExpert
                      ? `${statistics.averageProgressionTimes.intermediateToExpert} days`
                      : 'N/A'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full w-4/5" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">
              Quiz Score Distribution
            </h3>
            <div className="space-y-3">
              {statistics?.quizScoreDistribution.map((range) => (
                <div key={range.scoreRange}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">
                      {range.scoreRange}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {range.count} users
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min((range.count / totalUsers) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">Search Users</h3>
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search by email or name..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Search
            </button>
          </div>

          {searchResults.length > 0 && (
            <div className="space-y-2">
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <div className="font-semibold text-gray-900">
                      {user.name}
                    </div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {user.proficiencyLevel || 'No Level'}
                      </div>
                      <div className="text-xs text-gray-600">
                        {user.totalXp} XP
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setLocation(`/admin/users/${user.id}/manage`)
                      }
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
