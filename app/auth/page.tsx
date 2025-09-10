"use client";

export default function AuthLanding() {
  return (
    <div className="container py-12">
      <h1 className="h1 mb-3">Account</h1>
      <p className="text-muted mb-6 max-w-xl">Choose how you want to continue.</p>
      <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
        <a href="/auth/signup" className="p-5 rounded-lg border border-border/60 bg-background hover:shadow-sm transition-shadow">
          <div className="h2 mb-2">Create your account</div>
          <p className="text-muted">Set up your profile to personalize recommendations and save favorites.</p>
        </a>
        <a href="/auth/login" className="p-5 rounded-lg border border-border/60 bg-background hover:shadow-sm transition-shadow">
          <div className="h2 mb-2">Sign in</div>
          <p className="text-muted">Access your saved places and continue where you left off.</p>
        </a>
      </div>
      <div className="mt-6 text-sm">
        <a href="/" className="underline underline-offset-4">Back to home</a>
      </div>
    </div>
  );
} 