import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MigrationWelcomeModal } from '@/components/MigrationWelcomeModal';

type ProficiencyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';

export interface User {
  id: string;
  email: string;
  name: string;
  level: ProficiencyLevel | null;
  xp: number;
  completionRate: number;
  progressionEligible: boolean;
  role?: string;
  avatar?: string;
  levelSystemMigrated?: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateLevel: (level: ProficiencyLevel) => void;
  refreshUserData: () => Promise<void>;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMigrationModal, setShowMigrationModal] = useState(false);

  const updateLevel = (level: ProficiencyLevel) => {
    setUser((prev) => (prev ? { ...prev, level } : null));
  };

  const refreshUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/user/level-status', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser((prev) =>
          prev
            ? {
                ...prev,
                level: data.currentLevel,
                xp: data.totalXp,
                completionRate: data.completionRate,
                progressionEligible: data.progressionEligible,
              }
            : null,
        );
      } else {
        // Token might be invalid
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        
        // Check if user was migrated and hasn't seen the modal
        const hasSeenMigrationModal = localStorage.getItem('hasSeenMigrationModal');
        if (parsed.levelSystemMigrated && !hasSeenMigrationModal && parsed.level) {
          setShowMigrationModal(true);
        }
        
        // Fetch fresh data in background
        refreshUserData();
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  // Persist user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const handleCloseMigrationModal = () => {
    setShowMigrationModal(false);
    localStorage.setItem('hasSeenMigrationModal', 'true');
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, updateLevel, refreshUserData, loading }}
    >
      {children}
      
      {/* Migration Welcome Modal */}
      {showMigrationModal && user?.level && (
        <MigrationWelcomeModal
          assignedLevel={user.level}
          xp={user.xp || 0}
          onClose={handleCloseMigrationModal}
        />
      )}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
