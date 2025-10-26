import { cookies } from "next/headers";

// Check if Supabase is configured before importing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://yrqtlbuuhxrghoorjwyo.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycXRsYnV1aHhyZ2hvb3Jqd3lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjY5NjcsImV4cCI6MjA3MzQ0Mjk2N30.PYfMtnwbuHUpEfEDUgzsAE6hnsJHt2q3qMOt8xC9DQ8";
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl !== "https://placeholder.supabase.co";

// Only import Supabase if configured
let createServerClient: any = null;
let CookieOptions: any = null;
if (isSupabaseConfigured) {
  try {
    const { createServerClient: _createServerClient, type CookieOptions as _CookieOptions } = require("@supabase/ssr");
    createServerClient = _createServerClient;
    CookieOptions = _CookieOptions;
  } catch (error) {
    console.warn("Failed to import Supabase SSR:", error);
  }
}

// Mock client for server-side
const createMockClient = () => {
  const mockClient = {
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: { message: "Authentication service is temporarily unavailable. Please try again later." } }),
      signUp: () => Promise.resolve({ data: { user: null, session: null }, error: { message: "Registration service is temporarily unavailable. Please try again later." } }),
      signOut: () => Promise.resolve({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: [], error: null }),
      update: () => Promise.resolve({ data: [], error: null }),
      delete: () => Promise.resolve({ data: [], error: null })
    }),
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
        getPublicUrl: () => ({ data: { publicUrl: "" } })
      })
    }
  };
  return mockClient;
};

export function createClient() {
  // If env vars are missing or Supabase is not available, return a mock client
  if (!isSupabaseConfigured || !createServerClient) {
    return createMockClient();
  }

  try {
    return createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return cookies().get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookies().set({ name, value, ...options });
          } catch {}
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookies().set({ name, value: "", ...options });
          } catch {}
        },
      },
    });
  } catch (error) {
    console.warn("Failed to create Supabase server client:", error);
    return createMockClient();
  }
}


