"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browserClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

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
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage(error.message);
        return;
      }
      router.push("/");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container py-12">
      <div className="min-h-[70dvh] flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="p-6 md:p-7 rounded-xl border border-border/60 bg-background shadow-sm">
            <div className="text-center mb-6">
              <h1 className="h1 mb-2">Sign in</h1>
              <p className="text-muted">Access your saved favorites and personalized recommendations.</p>
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-sm" htmlFor="email">Email</label>
              <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="h-10 px-3 rounded-md border border-border/60 focus-ring" />
              {errors.email && <div className="text-sm text-red-600">{errors.email}</div>}

              <label className="text-sm" htmlFor="password">Password</label>
              <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" type="password" className="h-10 px-3 rounded-md border border-border/60 focus-ring" />
              {errors.password && <div className="text-sm text-red-600">{errors.password}</div>}

              <button onClick={onSubmit} disabled={submitting} className="mt-2 h-10 rounded-md bg-brand text-white hover:bg-brand-600 disabled:opacity-60">
                {submitting ? "Signing in…" : "Continue"}
              </button>
            </div>
            {message && <div className="mt-3 text-sm text-center">{message}</div>}
            <div className="mt-5 text-sm text-center">
              New here? <a href="/auth/signup" className="underline underline-offset-4">Create your account</a>
            </div>
          </div>
          <div className="mt-6 text-sm text-center">
            <a href="/" className="underline underline-offset-4">Back to home</a>
          </div>
        </div>
      </div>
    </div>
  );
} 