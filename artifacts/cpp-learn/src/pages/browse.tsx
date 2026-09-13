import { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, Code2, Award, Clock } from 'lucide-react';
import { useUser } from '@/context/UserContext';

interface Lesson {
  id: string;
  title: string;
  description: string;
  language: string;
  difficulty: string;
  duration: number;
  xpReward: number;
  completed: boolean;
  locked: boolean;
}

type Language = 'all' | 'cpp' | 'python' | 'javascript' | 'typescript' | 'java';
type Difficulty = 'all' | 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';

const LANGUAGES: Record<Language, string> = {
  all: 'All Languages',
  cpp: 'C++',
  python: 'Python',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  java: 'Java',
};

const DIFFICULTIES: Record<Difficulty, string> = {
  all: 'All Levels',
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  EXPERT: 'Expert',
};

export default function BrowsePage() {
  const { user } = useUser();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [filteredLessons, setFilteredLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // Fetch lessons from backend with language filter
  const fetchLessons = async (language?: Language, difficulty?: Difficulty) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Not authenticated');
      }

      // Build query parameters for backend
      const params = new URLSearchParams();
      if (language && language !== 'all') {
        params.append('language', language);
      }
      if (difficulty && difficulty !== 'all') {
        params.append('difficulty', difficulty);
      }

      // Use curriculum endpoint filtered by user level
      const userLevel = user?.level || 'BEGINNER';
      const response = await fetch(`/api/curriculum/${userLevel}?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch lessons');
      }

      const data = await response.json();
      
      // Transform backend data to match our interface
      const transformedLessons: Lesson[] = [
        ...(data.lessons || []).map((lesson: any) => ({
          id: lesson.id,
          title: lesson.title,
          description: lesson.content?.substring(0, 150) || '',
          language: lesson.language || 'cpp',
          difficulty: lesson.difficulty || 'BEGINNER',
          duration: lesson.estimatedMinutes || 30,
          xpReward: lesson.xpReward || 50,
          completed: lesson.completed || false,
          locked: false,
        })),
        ...(data.challenges || []).map((challenge: any) => ({
          id: challenge.id,
          title: challenge.title,
          description: challenge.description?.substring(0, 150) || '',
          language: challenge.language || 'cpp',
          difficulty: challenge.difficulty || 'BEGINNER',
          duration: challenge.timeLimit || 60,
          xpReward: challenge.xpReward || 100,
          completed: challenge.completed || false,
          locked: false,
        })),
      ];

      setLessons(transformedLessons);
      setFilteredLessons(transformedLessons);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load lessons');
      console.error('Error fetching lessons:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchLessons(selectedLanguage, selectedDifficulty);
  }, []);

  // Handle language filter change
  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    setCurrentPage(1); // Reset pagination
    setSearchQuery(''); // Clear search
    
    // Fetch from backend with new language filter
    fetchLessons(language, selectedDifficulty);
  };

  // Handle difficulty filter change
  const handleDifficultyChange = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    setCurrentPage(1); // Reset pagination
    
    // Fetch from backend with new difficulty filter
    fetchLessons(selectedLanguage, difficulty);
  };

  // Handle search (frontend filtering)
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredLessons(lessons);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = lessons.filter(
        (lesson) =>
          lesson.title.toLowerCase().includes(query) ||
          lesson.description.toLowerCase().includes(query)
      );
      setFilteredLessons(filtered);
    }
    setCurrentPage(1); // Reset pagination on search
  }, [searchQuery, lessons]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLessons = filteredLessons.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLessons.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Browse Lessons</h1>
          <p className="text-slate-400">
            Explore our collection of programming lessons and challenges
          </p>
        </div>

        {/* Filters */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search lessons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Language Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                <Code2 className="inline w-4 h-4 mr-1" />
                Language
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value as Language)}
                className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {(Object.keys(LANGUAGES) as Language[]).map((lang) => (
                  <option key={lang} value={lang}>
                    {LANGUAGES[lang]}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                <Filter className="inline w-4 h-4 mr-1" />
                Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => handleDifficultyChange(e.target.value as Difficulty)}
                className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {(Object.keys(DIFFICULTIES) as Difficulty[]).map((diff) => (
                  <option key={diff} value={diff}>
                    {DIFFICULTIES[diff]}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <div className="px-4 py-2.5 bg-slate-800/30 border border-slate-700 rounded-lg text-slate-300 text-sm">
                {filteredLessons.length} result{filteredLessons.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-slate-400 mt-4">Loading lessons...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-900/20 border border-red-800 rounded-xl p-6 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Lessons Grid */}
        {!loading && !error && currentLessons.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all group"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                          <BookOpen className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-xs font-medium text-blue-400 uppercase">
                          {lesson.language}
                        </span>
                      </div>
                      {lesson.completed && (
                        <div className="px-2 py-1 bg-green-500/10 rounded text-xs font-medium text-green-400">
                          Completed
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {lesson.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                      {lesson.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration} min
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        {lesson.xpReward} XP
                      </div>
                      <div className="px-2 py-1 bg-slate-800 rounded">
                        {lesson.difficulty}
                      </div>
                    </div>

                    {/* Action */}
                    <button
                      disabled={lesson.locked}
                      className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
                    >
                      {lesson.locked ? 'Locked' : lesson.completed ? 'Review' : 'Start Lesson'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-800/50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        page === currentPage
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-800/50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && !error && currentLessons.length === 0 && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center">
            <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No lessons found</h3>
            <p className="text-slate-400 mb-4">
              Try adjusting your filters or search query
            </p>
            <button
              onClick={() => {
                setSelectedLanguage('all');
                setSelectedDifficulty('all');
                setSearchQuery('');
                fetchLessons('all', 'all');
              }}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
