/**
 * Infinity Code - Supabase Auth Service
 * Production-ready authentication using Supabase
 */

import { getSupabaseClient } from './supabase';
import type { UserProfile } from '@/hooks/use-auth';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'poomeigh503@gmail.com';

/**
 * Map Supabase user + profile data to UserProfile format
 */
function mapSupabaseUser(authUser: any, profileData?: any): UserProfile {
  const email = authUser.email || '';
  const username = profileData?.username || email.split('@')[0];
  
  return {
    id: authUser.id,
    email,
    name: profileData?.name || authUser.user_metadata?.name || username,
    username,
    avatar: profileData?.avatar || authUser.user_metadata?.avatar_url || null,
    bio: profileData?.bio || null,
    phone_number: authUser.phone || profileData?.phone || null,
    country: profileData?.country || null,
    learning_goals: profileData?.learning_goals || null,
    created_at: authUser.created_at || new Date().toISOString(),
    updated_at: profileData?.updated_at || new Date().toISOString(),
    last_login: authUser.last_sign_in_at || new Date().toISOString(),
    preferred_language: profileData?.preferred_language || 'en',
    role: email === ADMIN_EMAIL ? 'admin' : (profileData?.role || 'user'),
    email_verified: authUser.email_confirmed_at !== null,
    theme: profileData?.theme || 'system',
    notifications_enabled: profileData?.notifications_enabled ?? true,
    subscription_status: profileData?.subscription_status || 'free',
    subscription_expires_at: profileData?.subscription_expires_at || null,
    courses_enrolled: profileData?.courses_enrolled || 0,
    courses_completed: profileData?.courses_completed || 0,
    lessons_completed: profileData?.lessons_completed || 0,
    certificates_earned: profileData?.certificates_earned || 0,
    streak: profileData?.current_streak || 0,
    achievements_unlocked: profileData?.achievements_unlocked || 0,
    projects_completed: profileData?.projects_completed || 0,
    total_xp: profileData?.total_xp || 0,
    quizzes_passed: profileData?.quizzes_passed || 0,
  };
}

/**
 * Get error message from Supabase error
 */
function getErrorMessage(error: any): string {
  if (!error) return 'An unknown error occurred';
  
  const message = error.message || String(error);

  if (message.includes('Invalid login credentials')) {
    return 'Invalid email or password. Please try again.';
  }
  if (message.includes('Email not confirmed')) {
    return 'Please verify your email address before logging in.';
  }
  if (message.includes('User already registered')) {
    return 'An account with this email already exists. Please login instead.';
  }
  if (message.includes('Password should be at least')) {
    return 'Password must be at least 6 characters long.';
  }
  if (message.includes('Unable to validate email address')) {
    return 'Please enter a valid email address.';
  }
  if (message.includes('Signup not allowed')) {
    return 'Signups are currently disabled. Please contact support.';
  }

  return message;
}

/**
 * Sign up a new user
 */
export async function signupUser(payload: {
  email: string;
  password: string;
  name: string;
  username: string;
}) {
  const { email, password, name, username } = payload;
  const supabase = getSupabaseClient();

  if (!email || !password || !name || !username) {
    return { success: false, error: 'All fields are required.' };
  }

  if (password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters.' };
  }

  try {
    // Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          username,
        },
        emailRedirectTo: window.location.origin,
      },
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('No user returned from signup');

    // Check if email confirmation is required
    const needsEmailConfirmation = !authData.session;

    // Create user profile in database
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: authData.user.id,
        total_xp: 0,
        current_streak: 0,
        longest_streak: 0,
        courses_enrolled: 0,
        courses_completed: 0,
        lessons_completed: 0,
        certificates_earned: 0,
        achievements_unlocked: 0,
        projects_completed: 0,
        quizzes_passed: 0,
        code_exercises_completed: 0,
        level: 1,
        xp_to_next_level: 100,
      });

    if (profileError) {
      console.error('Error creating profile:', profileError);
    }

    // Create user settings
    const { error: settingsError } = await supabase
      .from('user_settings')
      .insert({
        id: authData.user.id,
      });

    if (settingsError) {
      console.error('Error creating settings:', settingsError);
    }

    // Update users table with additional info
    const { error: updateError } = await supabase
      .from('users')
      .update({
        name,
        username,
        role: email === ADMIN_EMAIL ? 'admin' : 'user',
        last_login: new Date().toISOString(),
      })
      .eq('id', authData.user.id);

    if (updateError) {
      console.error('Error updating user:', updateError);
    }

    const user = mapSupabaseUser(authData.user, { name, username, role: email === ADMIN_EMAIL ? 'admin' : 'user' });

    return { 
      success: true, 
      user, 
      needsEmailConfirmation 
    };
  } catch (error: any) {
    return { success: false, error: getErrorMessage(error) };
  }
}

/**
 * Login user with email/password
 */
export async function loginUser(payload: {
  email: string;
  password: string;
}) {
  const { email, password } = payload;
  const supabase = getSupabaseClient();

  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    if (!data.user) throw new Error('No user returned from login');

    // Update last login
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', data.user.id);

    // Fetch user profile
    const { data: profileData } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    // Fetch user data from users table
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    const user = mapSupabaseUser(data.user, { ...userData, ...profileData });

    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: getErrorMessage(error) };
  }
}

/**
 * Login with Google (disabled)
 */
export async function loginWithGoogle() {
  return {
    success: false,
    error: 'Google Sign-In is not configured. Please use email/password login.',
  };
}

/**
 * Get current session
 */
export async function getCurrentSession() {
  try {
    const supabase = getSupabaseClient();

    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) throw error;
    if (!session?.user) return null;

    // Fetch user profile
    const { data: profileData } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    // Fetch user data from users table
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();

    const user = mapSupabaseUser(session.user, { ...userData, ...profileData });

    return { user };
  } catch (error) {
    console.error('Error getting session:', error);
    // If Supabase is not configured, return null instead of throwing
    if (error instanceof Error && error.message.includes('not configured')) {
      console.warn('Supabase not configured - running without authentication');
      return null;
    }
    return null;
  }
}

/**
 * Logout user
 */
export async function logoutUser() {
  const supabase = getSupabaseClient();

  try {
    await supabase.auth.signOut();
    return { success: true };
  } catch (error) {
    console.error('Error logging out:', error);
    return { success: true }; // Return success anyway to clear local state
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(payload: {
  currentUser: UserProfile;
  updates: Partial<UserProfile>;
}) {
  const { currentUser, updates } = payload;
  const supabase = getSupabaseClient();

  if (!currentUser) {
    return { success: false, error: 'Not authenticated.' };
  }

  try {
    // Update users table
    const usersUpdates: any = {};
    if (updates.name !== undefined) usersUpdates.name = updates.name;
    if (updates.username !== undefined) usersUpdates.username = updates.username;
    if (updates.avatar !== undefined) usersUpdates.avatar = updates.avatar;
    if (updates.bio !== undefined) usersUpdates.bio = updates.bio;
    if (updates.role !== undefined) usersUpdates.role = updates.role;
    if (updates.preferred_language !== undefined) usersUpdates.preferred_language = updates.preferred_language;
    if (updates.theme !== undefined) usersUpdates.theme = updates.theme;
    if (updates.notifications_enabled !== undefined) usersUpdates.notifications_enabled = updates.notifications_enabled;
    if (updates.subscription_status !== undefined) usersUpdates.subscription_status = updates.subscription_status;

    if (Object.keys(usersUpdates).length > 0) {
      usersUpdates.updated_at = new Date().toISOString();
      const { error: usersError } = await supabase
        .from('users')
        .update(usersUpdates)
        .eq('id', currentUser.id);

      if (usersError) throw usersError;
    }

    // Update user_profiles table
    const profileUpdates: any = {};
    if (updates.phone_number !== undefined) profileUpdates.phone = updates.phone_number;
    if (updates.country !== undefined) profileUpdates.country = updates.country;
    if (updates.learning_goals !== undefined) profileUpdates.learning_goals = updates.learning_goals;

    if (Object.keys(profileUpdates).length > 0) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .update(profileUpdates)
        .eq('id', currentUser.id);

      if (profileError) throw profileError;
    }

    // Fetch updated profile
    const session = await getCurrentSession();
    if (!session?.user) {
      return { success: false, error: 'Failed to fetch updated profile.' };
    }

    return { success: true, user: session.user };
  } catch (error: any) {
    return { success: false, error: getErrorMessage(error) };
  }
}

/**
 * Reset password (request reset email)
 */
export async function resetPassword(payload: { email: string }) {
  const { email } = payload;
  const supabase = getSupabaseClient();

  if (!email) {
    return { success: false, error: 'Email is required.' };
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;

    return { 
      success: true, 
      message: 'If an account exists with this email, you will receive a password reset link.' 
    };
  } catch (error: any) {
    return { success: false, error: getErrorMessage(error) };
  }
}

/**
 * Update password
 */
export async function updatePassword(payload: {
  currentPassword: string;
  newPassword: string;
}) {
  const { newPassword } = payload;
  const supabase = getSupabaseClient();

  if (!newPassword) {
    return { success: false, error: 'New password is required.' };
  }

  if (newPassword.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters.' };
  }

  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;

    return { success: true, message: 'Password updated successfully.' };
  } catch (error: any) {
    return { success: false, error: getErrorMessage(error) };
  }
}

/**
 * Upload avatar using Supabase Storage
 */
export async function uploadAvatar(payload: {
  currentUser: UserProfile;
  file: File;
}) {
  const { currentUser, file } = payload;
  const supabase = getSupabaseClient();

  if (!currentUser) {
    return { success: false, error: 'Not authenticated.', avatarUrl: null };
  }

  if (!file) {
    return { success: false, error: 'No file provided.', avatarUrl: null };
  }

  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${currentUser.id}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('user-uploads')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('user-uploads')
      .getPublicUrl(filePath);

    // Update user profile with avatar URL
    const result = await updateUserProfile({
      currentUser,
      updates: { avatar: publicUrl },
    });

    if (!result.success) {
      return { success: false, error: result.error, avatarUrl: null };
    }

    return { success: true, avatarUrl: publicUrl };
  } catch (error: any) {
    console.error('Error uploading avatar:', error);
    return { 
      success: false, 
      error: 'Failed to upload avatar. Using default instead.', 
      avatarUrl: null 
    };
  }
}

/**
 * Resend verification email
 */
export async function resendVerificationEmail(payload: { email: string }) {
  const { email } = payload;
  const supabase = getSupabaseClient();

  if (!email) {
    return { success: false, error: 'Email is required.' };
  }

  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });

    if (error) throw error;

    return { 
      success: true, 
      message: 'Verification email sent. Please check your inbox.' 
    };
  } catch (error: any) {
    return { success: false, error: getErrorMessage(error) };
  }
}

/**
 * Auth state change listener
 */
export function onAuthStateChange(callback: (event: string, session: any) => void) {
  try {
    const supabase = getSupabaseClient();

    return supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  } catch (error) {
    console.error('Error setting up auth state listener:', error);
    // Return a dummy subscription if Supabase is not configured
    return {
      data: {
        subscription: {
          unsubscribe: () => console.log('No auth listener to unsubscribe')
        }
      }
    };
  }
}
