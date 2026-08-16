import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { DEFAULT_LANGUAGE, normalizeLanguageId, type LanguageId } from '@/config/languages';
import { useLanguage } from '@/hooks/use-language';
import { 
  getCurrentSession, 
  loginUser, 
  loginWithGoogle, 
  logoutUser, 
  signupUser, 
  updateUserProfile,
  resetPassword,
  updatePassword,
  uploadAvatar,
  resendVerificationEmail,
  onAuthStateChange
} from '@/lib/auth-service';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar?: string | null;
  bio?: string | null;
  phone_number?: string | null;
  country?: string | null;
  learning_goals?: string | null;
  created_at: string;
  updated_at: string;
  last_login?: string | null;
  preferred_language: string;
  role: 'user' | 'admin';
  email_verified: boolean;
  theme: 'light' | 'dark' | 'system';
  notifications_enabled: boolean;
  subscription_status: 'free' | 'premium';
  subscription_expires_at?: string | null;
  courses_enrolled: number;
  courses_completed: number;
  lessons_completed: number;
  certificates_earned: number;
  streak: number;
  achievements_unlocked: number;
  projects_completed: number;
  total_xp: number;
  quizzes_passed: number;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signup: (email: string, password: string, name: string, username: string) => Promise<{ success: boolean; error?: string; needsEmailConfirmation?: boolean }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string; redirecting?: boolean }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  refreshProfile: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string; message?: string }>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string; message?: string }>;
  uploadAvatar: (file: File) => Promise<{ success: boolean; error?: string; avatarUrl?: string | null }>;
  resendVerificationEmail: (email: string) => Promise<{ success: boolean; error?: string; message?: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuthProvider() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { setLanguage } = useLanguage();

  useEffect(() => {
    const loadSession = async () => {
      try {
        const session = await getCurrentSession();
        if (session?.user) {
          setUser(session.user as UserProfile);
          const lang = normalizeLanguageId(session.user.preferred_language as LanguageId);
          if (lang) setLanguage(lang);
        }
      } catch (error) {
        console.error('❌ Error loading session:', error);
        // If Supabase is not configured, show a helpful error
        if (error instanceof Error && error.message.includes('not configured')) {
          console.error('⚠️ Supabase environment variables are missing. The app will work in demo mode.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadSession();

    // Listen for auth state changes (only if Supabase is configured)
    let subscription: any = null;
    try {
      const authListener = onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          // Fetch full profile on sign in
          const sessionData = await getCurrentSession();
          if (sessionData?.user) {
            setUser(sessionData.user as UserProfile);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      });
      subscription = authListener.data.subscription;
    } catch (error) {
      console.error('❌ Error setting up auth listener:', error);
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [setLanguage]);

  const signup = useCallback(async (email: string, password: string, name: string, username: string) => {
    const result = await signupUser({ email, password, name, username });
    if (result.success && result.user) {
      setUser(result.user);
      const lang = normalizeLanguageId(result.user.preferred_language as LanguageId);
      if (lang) setLanguage(lang);
      
      if (result.needsEmailConfirmation) {
        toast({ 
          title: 'Account created', 
          description: 'Please check your email to verify your account.',
          variant: 'default'
        });
      } else {
        toast({ 
          title: 'Account created', 
          description: 'You are signed in and ready to explore.' 
        });
      }
      
      return { success: true, needsEmailConfirmation: result.needsEmailConfirmation };
    }
    return { success: false, error: result.error };
  }, [setLanguage, toast]);

  const login = useCallback(async (email: string, password: string) => {
    const result = await loginUser({ email, password });
    if (result.success && result.user) {
      setUser(result.user);
      const lang = normalizeLanguageId(result.user.preferred_language as LanguageId);
      if (lang) setLanguage(lang);
      toast({ title: 'Welcome back', description: 'You have successfully signed in.' });
      return { success: true };
    }
    return { success: false, error: result.error };
  }, [setLanguage, toast]);

  const loginWithGoogleHandler = useCallback(async () => {
    const result = await loginWithGoogle();
    // loginWithGoogle is disabled and always returns { success: false, error: string }
    toast({
      title: 'Google Sign-In',
      description: result.error || 'Google Sign-In is not configured. Please use email/password.'
    });
    return { success: false, error: result.error };
  }, [setLanguage, toast]);

  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
    toast({ title: 'Signed out', description: 'You have been logged out.' });
  }, [toast]);

  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    if (!user) return { success: false, error: 'Not authenticated.' };
    const result = await updateUserProfile({ currentUser: user, updates });
    if (result.success && result.user) {
      setUser(result.user);
      const lang = normalizeLanguageId(result.user.preferred_language as LanguageId);
      if (lang) setLanguage(lang);
      toast({ title: 'Profile updated', description: 'Your profile changes have been saved.' });
      return { success: true };
    }
    return { success: false, error: result.error };
  }, [setLanguage, toast, user]);

  const refreshProfile = useCallback(async () => {
    const session = await getCurrentSession();
    if (session?.user) setUser(session.user as UserProfile);
  }, []);

  const resetPasswordHandler = useCallback(async (email: string) => {
    const result = await resetPassword({ email });
    if (result.success) {
      toast({ 
        title: 'Reset email sent', 
        description: result.message || 'Check your email for the reset link.' 
      });
      return { success: true, message: result.message };
    }
    return { success: false, error: result.error };
  }, [toast]);

  const updatePasswordHandler = useCallback(async (currentPassword: string, newPassword: string) => {
    const result = await updatePassword({ currentPassword, newPassword });
    if (result.success) {
      toast({ title: 'Password updated', description: result.message || 'Your password has been changed.' });
      return { success: true, message: result.message };
    }
    return { success: false, error: result.error };
  }, [toast]);

  const uploadAvatarHandler = useCallback(async (file: File) => {
    if (!user) return { success: false, error: 'Not authenticated.', avatarUrl: null };
    const result = await uploadAvatar({ currentUser: user, file });
    if (result.success && result.avatarUrl) {
      setUser(prev => prev ? { ...prev, avatar: result.avatarUrl } : null);
      toast({ title: 'Avatar updated', description: 'Your profile picture has been changed.' });
      return { success: true, avatarUrl: result.avatarUrl };
    }
    return { success: false, error: result.error, avatarUrl: null };
  }, [toast, user]);

  const resendVerificationEmailHandler = useCallback(async (email: string) => {
    const result = await resendVerificationEmail({ email });
    if (result.success) {
      toast({ title: 'Verification email sent', description: result.message || 'Check your email to verify your account.' });
      return { success: true, message: result.message };
    }
    return { success: false, error: result.error };
  }, [toast]);

  const value = useMemo(() => ({
    user,
    isLoading,
    isAuthenticated: !!user,
    signup,
    login,
    loginWithGoogle: loginWithGoogleHandler,
    logout,
    updateProfile,
    refreshProfile,
    resetPassword: resetPasswordHandler,
    updatePassword: updatePasswordHandler,
    uploadAvatar: uploadAvatarHandler,
    resendVerificationEmail: resendVerificationEmailHandler,
  }), [
    isLoading, 
    login, 
    loginWithGoogleHandler, 
    logout, 
    signup, 
    updateProfile, 
    user, 
    refreshProfile,
    resetPasswordHandler,
    updatePasswordHandler,
    uploadAvatarHandler,
    resendVerificationEmailHandler,
  ]);

  return value;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthProvider();

  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}