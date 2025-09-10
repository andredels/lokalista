"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  function isEmail(v: string) {
    return /.+@.+\..+/.test(v);
  }

  function onSubmit() {
    const e: { [k: string]: string } = {};
    if (!isEmail(email)) e.email = "Enter a valid email.";
    if (password.length < 6) e.password = "Password must be 6+ characters.";
    setErrors(e);
    if (Object.keys(e).length === 0) {
      alert("Placeholder: implement login backend.");
    }
  }

  return (
    <div className="container py-12">
      <h1 className="h1 mb-3">Sign in</h1>
      <p className="text-muted mb-6 max-w-xl">Access your saved favorites and personalized recommendations.</p>
      <div className="max-w-md p-5 rounded-lg border border-border/60 bg-background">
        <div className="flex flex-col gap-3">
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="h-10 px-3 rounded-md border border-border/60" />
          {errors.email && <div className="text-sm text-red-600">{errors.email}</div>}
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="h-10 px-3 rounded-md border border-border/60" />
          {errors.password && <div className="text-sm text-red-600">{errors.password}</div>}
          <button onClick={onSubmit} className="h-10 rounded-md bg-brand text-white hover:bg-brand-600">Continue</button>
        </div>
        <div className="mt-4 text-sm">
          New here? <a href="/auth/signup" className="underline underline-offset-4">Create your account</a>
        </div>
      </div>
      <div className="mt-6 text-sm">
        <a href="/" className="underline underline-offset-4">Back to home</a>
      </div>
    </div>
  );
} 