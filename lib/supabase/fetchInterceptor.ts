// Global fetch interceptor to prevent Supabase requests when not configured
if (typeof window !== "undefined") {
  const originalFetch = window.fetch;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://yrqtlbuuhxrghoorjwyo.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycXRsYnV1aHhyZ2hvb3Jqd3lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjY5NjcsImV4cCI6MjA3MzQ0Mjk2N30.PYfMtnwbuHUpEfEDUgzsAE6hnsJHt2q3qMOt8xC9DQ8";
  const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl !== "https://placeholder.supabase.co";

  // Only intercept fetch if Supabase is not properly configured
  if (!isSupabaseConfigured) {
    window.fetch = ((...args) => {
      const url = args[0]?.toString() || "";
      
      // Block all Supabase-related requests
      if (url.includes("supabase.co") || url.includes("supabase") || url.includes("yrqtlbuuhxrghoorjwyo")) {
        console.warn("Blocked Supabase request:", url);
        return Promise.resolve(new Response(JSON.stringify({ 
          error: "Supabase not configured",
          message: "Supabase is not configured. Please set environment variables."
        }), {
          status: 200,
          statusText: "OK",
          headers: { "Content-Type": "application/json" }
        }));
      }
      
      return originalFetch.apply(window, args);
    }) as typeof fetch;
  }
}
