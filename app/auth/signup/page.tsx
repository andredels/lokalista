"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/browserClient";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
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
    if (!country.trim()) e.country = "Enter your country.";
    if (!city.trim()) e.city = "Enter your city.";
    setErrors(e);
    if (Object.keys(e).length !== 0) return;

    setSubmitting(true);
    setMessage(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/login`,
          data: {
            full_name: fullName,
            country: country,
            city: city,
          }
        },
      });
      if (error) {
        setMessage(error.message);
        return;
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
                  <input id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" type="password" className="h-11 px-3 rounded-md border border-border/60 focus-ring w-full" />
                  {errors.confirmPassword && <div className="text-sm text-red-600">{errors.confirmPassword}</div>}
                </div>

                <div>
                  <label className="text-sm font-medium" htmlFor="country">Country</label>
                  <input id="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="United States" className="h-11 px-3 rounded-md border border-border/60 focus-ring w-full" />
                  {errors.country && <div className="text-sm text-red-600">{errors.country}</div>}
                </div>

                <div>
                  <label className="text-sm font-medium" htmlFor="city">City</label>
                  <input id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="New York, NY" className="h-11 px-3 rounded-md border border-border/60 focus-ring w-full" />
                  {errors.city && <div className="text-sm text-red-600">{errors.city}</div>}
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