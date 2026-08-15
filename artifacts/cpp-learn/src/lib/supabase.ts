/**
 * Supabase Client Configuration
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Helper function to check if a value is a valid Supabase URL
function isValidSupabaseUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  // Check for placeholder values
  const placeholders = ['your_supabase_project_url_here', 'your-project-url', 'https://xxx.supabase.co'];
  if (placeholders.some(p => url.toLowerCase().includes(p) || url === p)) return false;
  // Must be a valid URL starting with https:// and containing supabase.co
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && parsed.hostname.includes('supabase.co');
  } catch {
    return false;
  }
}

// Helper function to check if a value is a valid Supabase Anon Key
function isValidSupabaseAnonKey(key: string): boolean {
  if (!key || typeof key !== 'string') return false;
  // Check for placeholder values
  const placeholders = ['your_supabase_anon_key_here', 'your-anon-key', 'eyJ'];
  if (placeholders.some(p => key.toLowerCase().includes(p) || key === p)) return false;
  // Supabase anon keys are typically JWT tokens starting with 'eyJ'
  return key.length > 20 && (key.startsWith('eyJ') || key.startsWith('sb_'));
}

const isSupabaseUrlValid = supabaseUrl ? isValidSupabaseUrl(supabaseUrl) : false;
const isSupabaseKeyValid = supabaseAnonKey ? isValidSupabaseAnonKey(supabaseAnonKey) : false;
const isConfigured = isSupabaseUrlValid && isSupabaseKeyValid;

// Log configuration status for debugging in production
console.log('🔧 Supabase Configuration Check:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  isUrlValid: isSupabaseUrlValid,
  isKeyValid: isSupabaseKeyValid,
  isConfigured,
  mode: import.meta.env.MODE
});

let supabaseClient = null;
if (isConfigured && supabaseUrl && supabaseAnonKey) {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = supabaseClient;

export function isSupabaseConfigured(): boolean {
  return supabase !== null;
}

// Type-safe helper to get supabase client (throws if not configured)
export function getSupabaseClient() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
  }
  return supabase;
}
