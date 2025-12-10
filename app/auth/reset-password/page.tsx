"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/browserClient";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [validToken, setValidToken] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const supabase = createClient();
    
    const checkSession = async () => {
      try {
        // First, check URL hash for token (Supabase puts token in hash fragment)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const type = hashParams.get('type');
        
        if (accessToken && type === 'recovery') {
          // Token is in URL, exchange it for a session
          const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: hashParams.get('refresh_token') || '',
          });
          
          if (sessionError || !sessionData.session) {
            setMessage("Invalid or expired reset link. Please request a new password reset.");
            setValidToken(false);
            setLoading(false);
            return;
          }
          
          // Clear the hash from URL for cleaner UX
          window.history.replaceState(null, '', window.location.pathname);
          setValidToken(true);
          setLoading(false);
          return;
        }
        
        // If no token in hash, check if there's already a session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setMessage("Invalid or expired reset link. Please request a new password reset.");
          setLoading(false);
          setValidToken(false);
          return;
        }
        
        // If there's a session, the token was already processed
        if (data?.session) {
          setValidToken(true);
          setLoading(false);
        } else {
          setMessage("Invalid or expired reset link. Please request a new password reset.");
          setLoading(false);
          setValidToken(false);
        }
      } catch (err) {
        console.error('Error in checkSession:', err);
        setMessage("An error occurred. Please try again.");
        setLoading(false);
        setValidToken(false);
      }
    };

    checkSession();
  }, []);

  async function onSubmit() {
    const e: { [k: string]: string } = {};
    if (password.length < 6) e.password = "Password must be 6+ characters.";
    if (password !== confirmPassword) e.confirmPassword = "Passwords do not match.";
    setErrors(e);
    if (Object.keys(e).length !== 0) return;

    setSubmitting(true);
    setMessage(null);
    try {
      const supabase = createClient();
      
      // Update the password
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage("Password updated successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } catch (err: any) {
      setMessage(err.message || "Failed to update password");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#eadbfd" }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8c52ff] mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  if (!validToken) {
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
                  <h1 className="h1 mb-2">Reset Link Invalid</h1>
                </div>
                {message && (
                  <div className="mb-4 text-center text-sm p-3 rounded-md bg-red-50 text-red-700 border border-red-200">
                    {message}
                  </div>
                )}
                <div className="text-center space-y-4">
                  <Link 
                    href="/auth/login" 
                    className="inline-block mt-4 px-6 h-11 rounded-md bg-[#8c52ff] text-white hover:opacity-90 transition"
                  >
                    Back to Login
                  </Link>
                  <div className="text-sm text-muted">
                    Need a new reset link?{" "}
                    <Link href="/auth/login" className="text-[#8c52ff] hover:underline underline-offset-2">
                      Request one here
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
                <h1 className="h1 mb-2">Reset Password</h1>
                <p className="text-muted">Enter your new password below.</p>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium" htmlFor="password">New Password</label>
                <input 
                  id="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Enter new password" 
                  type="password" 
                  className="h-11 px-3 rounded-md border border-border/60 focus-ring" 
                />
                {errors.password && <div className="text-sm text-red-600">{errors.password}</div>}

                <label className="text-sm font-medium" htmlFor="confirmPassword">Confirm Password</label>
                <div className="relative">
                  <input 
                    id="confirmPassword" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    placeholder="Confirm new password" 
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

                <button 
                  onClick={onSubmit} 
                  disabled={submitting} 
                  className="mt-2 h-11 rounded-md bg-[#8c52ff] text-white hover:opacity-90 disabled:opacity-60"
                >
                  {submitting ? "Updating password…" : "Update Password"}
                </button>
              </div>
              {message && (
                <div className={`mt-3 text-sm text-center p-3 rounded-md ${
                  message.includes('successfully') 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {message}
                </div>
              )}
              <div className="mt-5 text-sm text-center">
                Remember your password? <Link href="/auth/login" className="underline underline-offset-4 text-[#8c52ff]">Log in</Link>
              </div>
            </div>
            <div className="mt-6 text-sm text-center">
              <Link href="/" className="underline underline-offset-4">Back to home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

