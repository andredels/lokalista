"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/browserClient";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
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
    if (!fullName.trim()) e.fullName = "Enter your full name.";
    if (!isEmail(email)) e.email = "Enter a valid email.";
    if (password.length < 6) e.password = "Password must be 6+ characters.";
    if (password !== confirmPassword) e.confirmPassword = "Passwords do not match.";
    setErrors(e);
    if (Object.keys(e).length !== 0) return;

    setSubmitting(true);
    setMessage(null);
    try {
      const supabase = createClient();
      
      // Parse full_name into first_name and last_name
      const nameParts = fullName.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      
      const { data: signUpData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/login`,
          data: {
            full_name: fullName,
            first_name: firstName,
            last_name: lastName,
          }
        },
      });
      
      if (error) {
        setMessage(error.message);
        return;
      }
      
      // Try to create/update profile with parsed name (if user is already confirmed)
      if (signUpData.user) {
        try {
          await supabase
            .from("profiles")
            .upsert({
              id: signUpData.user.id,
              first_name: firstName || null,
              last_name: lastName || null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }, { onConflict: "id" });
        } catch (profileError) {
          // Profile creation might fail if user hasn't confirmed email yet
          // This is okay - it will be created by database trigger or on first login
          console.log("Profile creation attempted:", profileError);
        }
      }
      
      setMessage("Check your email to confirm your account, then sign in.");
      setTimeout(() => router.push("/auth/login"), 1200);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#eadbfd" }}>
      <div className="container py-12">
        <div className="min-h-[70dvh] flex items-center justify-center">
          <div className="w-full max-w-2xl">
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
                <h1 className="h1 mb-2">Join Lokalista</h1>
                <p className="text-muted">Create your account to discover amazing places in your city.</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium" htmlFor="fullName">Full Name</label>
                  <input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" className="h-11 px-3 rounded-md border border-border/60 focus-ring w-full" />
                  {errors.fullName && <div className="text-sm text-red-600">{errors.fullName}</div>}
                </div>

                <div>
                  <label className="text-sm font-medium" htmlFor="email">Email</label>
                  <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="h-11 px-3 rounded-md border border-border/60 focus-ring w-full" />
                  {errors.email && <div className="text-sm text-red-600">{errors.email}</div>}
                </div>

                <div>
                  <label className="text-sm font-medium" htmlFor="password">Password</label>
                  <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create password" type="password" className="h-11 px-3 rounded-md border border-border/60 focus-ring w-full" />
                  {errors.password && <div className="text-sm text-red-600">{errors.password}</div>}
                </div>

                <div>
                  <label className="text-sm font-medium" htmlFor="confirmPassword">Confirm Password</label>
                  <div className="relative">
                    <input 
                      id="confirmPassword" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      placeholder="Confirm password" 
                      type="password" 
                      className={`h-11 px-3 pr-10 rounded-md border focus-ring w-full ${
                        confirmPassword && password !== confirmPassword 
                          ? 'border-red-500' 
                          : confirmPassword && password === confirmPassword 
                          ? 'border-green-500' 
                          : 'border-border/60'
                      }`}
                    />
                    {confirmPassword && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {password === confirmPassword ? (
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                    )}
                  </div>
                  {errors.confirmPassword && <div className="text-sm text-red-600">{errors.confirmPassword}</div>}
                </div>
              </div>

              <button onClick={onSubmit} disabled={submitting} className="mt-6 w-full h-11 rounded-md bg-[#8c52ff] text-white hover:opacity-90 disabled:opacity-60">
                {submitting ? "Creating account…" : "Create account"}
              </button>
              
              {message && <div className="mt-3 text-sm text-center">{message}</div>}
              <div className="mt-5 text-sm text-center">
                Already have an account? <a href="/auth/login" className="underline underline-offset-4 text-[#8c52ff]">Log in</a>
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