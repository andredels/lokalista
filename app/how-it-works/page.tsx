export default function HowItWorks() {
  return (
    <div className="container py-12">
      <h1 className="h1 mb-3">How recommendations work</h1>
      <p className="text-muted mb-8 max-w-2xl">We surface nearby restaurants, cafes, and events that match your preferences and context. To personalize results and save your preferences, you'll need an account. No payment is required.</p>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="p-5 rounded-lg border border-border/60 bg-background">
          <div className="text-xs font-mono text-muted mb-2">Step 1</div>
          <div className="h2 mb-1">Capture your vibe</div>
          <p className="text-muted">Choose your preferences or describe what you're looking for. We encode this into intent signals.</p>
        </div>
        <div className="p-5 rounded-lg border border-border/60 bg-background">
          <div className="text-xs font-mono text-muted mb-2">Step 2</div>
          <div className="h2 mb-1">Understand context</div>
          <p className="text-muted">We consider your location, time, distance, and venue hours to ensure options are practical now.</p>
        </div>
        <div className="p-5 rounded-lg border border-border/60 bg-background">
          <div className="text-xs font-mono text-muted mb-2">Step 3</div>
          <div className="h2 mb-1">Rank and explain</div>
          <p className="text-muted">Our AI ranks places and events and shares short reasons like vibe fit, ambiance, and popularity windows.</p>
        </div>
      </div>

      <div className="mb-12">
        <svg width="100%" height="130" viewBox="0 0 800 130" className="max-w-4xl">
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0%" stopColor="var(--color-brand)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--color-brand)" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <rect x="10" y="30" width="220" height="70" rx="10" fill="url(#g)" stroke="var(--color-border)" />
          <text x="120" y="70" textAnchor="middle" dominantBaseline="middle" fontSize="14">Preferences & intent</text>

          <rect x="290" y="30" width="220" height="70" rx="10" fill="url(#g)" stroke="var(--color-border)" />
          <text x="400" y="70" textAnchor="middle" dominantBaseline="middle" fontSize="14">Context (time • location)</text>

          <rect x="570" y="30" width="220" height="70" rx="10" fill="url(#g)" stroke="var(--color-border)" />
          <text x="680" y="65" textAnchor="middle" dominantBaseline="middle" fontSize="14">Ranking & reasons</text>

          <path d="M230,65 L290,65" stroke="var(--color-border)" strokeWidth="2" />
          <path d="M510,65 L570,65" stroke="var(--color-border)" strokeWidth="2" />
          <polygon points="570,65 560,60 560,70" fill="var(--color-border)" />
          <polygon points="290,65 280,60 280,70" fill="var(--color-border)" />
        </svg>
      </div>

      <div className="rounded-lg border border-border/60 p-5 bg-muted/40 max-w-2xl">
        <div className="h2 mb-2">Accounts required</div>
        <p className="text-muted">Accounts let us personalize recommendations, sync your favorites, and improve suggestions over time. You can browse the demo without signing in, but to get recommendations tailored to you and save them, please create an account.</p>
        <div className="mt-4 flex gap-3">
          <a href="/auth" className="h-10 px-4 rounded-md bg-brand text-white inline-flex items-center justify-center hover:bg-brand-600">Create an account</a>
          <a href="/" className="h-10 px-4 rounded-md border border-border/60 inline-flex items-center justify-center">Back to home</a>
        </div>
      </div>
    </div>
  );
} 