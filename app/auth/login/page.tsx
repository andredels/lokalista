"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/browserClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const supabase = createClient();
    
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setLoading(false);
          return;
        }
        
        if (data?.session) {
          router.push("/dashboard");
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error('Error in checkSession:', err);
        setLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push("/dashboard");
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#eadbfd" }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8c52ff] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  function isEmail(v: string) {
    return /.+@.+\..+/.test(v);
  }

  async function onSubmit() {
    const e: { [k: string]: string } = {};
    if (!isEmail(email)) e.email = "Enter a valid email.";
    if (password.length < 6) e.password = "Password must be 6+ characters.";
    setErrors(e);
    if (Object.keys(e).length !== 0) return;

    setSubmitting(true);
    setMessage(null);
    try {
      const supabase = createClient();
      const { data: signInData, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage(error.message);
        return;
      }
      
      // Ensure user's profile has first_name/last_name populated from metadata if missing
      if (signInData.user) {
        try {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("first_name, last_name")
            .eq("id", signInData.user.id)
            .single();
          
          // If profile doesn't have names, try to populate from auth metadata
          if (profileData && !profileData.first_name && !profileData.last_name) {
            const metadata = signInData.user.user_metadata as { full_name?: string; first_name?: string; last_name?: string };
            if (metadata?.full_name) {
              const nameParts = metadata.full_name.trim().split(/\s+/);
              const firstName = nameParts[0] || "";
              const lastName = nameParts.slice(1).join(" ") || "";
              
              if (firstName || lastName) {
                await supabase
                  .from("profiles")
                  .update({
                    first_name: firstName || null,
                    last_name: lastName || null,
                    updated_at: new Date().toISOString()
                  })
                  .eq("id", signInData.user.id);
              }
            } else if (metadata?.first_name || metadata?.last_name) {
              // Use first_name/last_name directly from metadata if available
              await supabase
                .from("profiles")
                .update({
                  first_name: metadata.first_name || null,
                  last_name: metadata.last_name || null,
                  updated_at: new Date().toISOString()
                })
                .eq("id", signInData.user.id);
            }
          }
        } catch (profileError) {
          // Ignore profile update errors - user can still log in
          console.log("Profile update attempted on login:", profileError);
        }
      }
      
      router.push("/dashboard");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#eadbfd" }}>
      <div className="container py-12">
        <div className="min-h-[70dvh] flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="p-6 md:p-7 rounded-xl border border-border/60 bg-background shadow-sm">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="h-8 w-8 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 grid place-items-center text-white">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M12 21s7-4.5 7-10a7 7 0 10-14 0c0 5.5 7 10 7 10z" stroke="currentColor" strokeWidth="1.6"/>
                      <circle cx="12" cy="11" r="2" fill="currentColor" />
                    </svg>
                  </span>
                  <span className="text-lg font-semibold bg-gradient-to-r from-fuchsia-500 to-violet-600 bg-clip-text text-transparent">Lokalista</span>
                </div>
                <h1 className="h1 mb-2">Welcome back</h1>
                <p className="text-muted">Access your saved favorites and personalized recommendations.</p>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium" htmlFor="email">Email</label>
                <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="h-11 px-3 rounded-md border border-border/60 focus-ring" />
                {errors.email && <div className="text-sm text-red-600">{errors.email}</div>}

                <label className="text-sm font-medium" htmlFor="password">Password</label>
                <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" type="password" className="h-11 px-3 rounded-md border border-border/60 focus-ring" />
                {errors.password && <div className="text-sm text-red-600">{errors.password}</div>}

                <button onClick={onSubmit} disabled={submitting} className="mt-2 h-11 rounded-md bg-[#8c52ff] text-white hover:opacity-90 disabled:opacity-60">
                  {submitting ? "Signing in…" : "Continue"}
                </button>
              </div>
              {message && <div className="mt-3 text-sm text-center">{message}</div>}
              <div className="mt-5 text-sm text-center">
                New here? <a href="/auth/signup" className="underline underline-offset-4 text-[#8c52ff]">Sign up</a>
              </div>
            </div>
            <div className="mt-6 text-sm text-center">
              <a href="/" className="underline underline-offset-4">Back to home</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 