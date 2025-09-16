import MoodLocationCard from "./ui/MoodLocationCard";

export default function Home() {
  return (
    <div className="font-sans">
      {/* Global header now lives in app/layout.tsx */}

      {/* Hero */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(closest-side,black,transparent)]">
          <div className="absolute -top-16 -left-16 size-[420px] rounded-full bg-brand/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 size-[480px] rounded-full bg-brand/10 blur-3xl" />
        </div>
        <div className="container relative py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 h-7 rounded-full border border-border/60 bg-muted text-xs font-medium mb-3">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                Open access — AI-powered suggestions
              </div>
              <h1 className="h1 mb-4">Find places that match your mood</h1>
              <p className="text-muted mb-6">Lokalista recommends nearby restaurants, cafes, and events using AI — tailored to your vibe and location. Available to everyone; no payment needed.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="/auth/signup" className="h-11 px-5 rounded-md bg-brand text-white hover:bg-brand-600 transition-colors inline-flex items-center justify-center">Create your account</a>
                <a href="/auth/login" className="h-11 px-5 rounded-md border border-border/60 inline-flex items-center justify-center">Sign in</a>
              </div>
            </div>
            <div className="relative">
              <MoodLocationCard />
            </div>
          </div>
        </div>
      </section>

      {/* Logo strip & Stats */}
      <section className="border-t border-border/60 bg-muted/30">
        <div className="container py-12">
          <div className="text-center text-sm text-muted mb-6">Spots from places like</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 items-center justify-items-center opacity-80">
            {["Cafe A","Venue B","Diner C","Parlor D","Market E","Bar F"].map((n) => (
              <div key={n} className="h-8 w-28 bg-dots rounded" aria-label={n} />
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            {[
              {label:"Cities", value:"120+"},
              {label:"Places indexed", value:"50k+"},
              {label:"Avg. match time", value:"< 5s"},
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border/60 bg-background p-5 text-center">
                <div className="text-2xl font-semibold">{s.value}</div>
                <div className="text-muted text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border/60 bg-muted/30">
        <div className="container py-16 md:py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="hover-lift">
              <div className="h-10 w-10 rounded-md bg-brand/15 grid place-items-center mb-3">
                <span className="h-5 w-5 rounded-sm bg-brand block" />
              </div>
              <h3 className="h2 mb-2">Mood-matched picks</h3>
              <p className="text-muted">Tell us how you feel and we’ll surface spots with the right vibe — from candlelit to high-energy.</p>
            </div>
            <div className="hover-lift">
              <div className="h-10 w-10 rounded-md bg-brand/15 grid place-items-center mb-3">
                <span className="h-5 w-5 rounded-sm bg-brand block" />
              </div>
              <h3 className="h2 mb-2">Local and timely</h3>
              <p className="text-muted">We consider distance, hours, and what’s happening now so suggestions feel timely and close.</p>
            </div>
            <div className="hover-lift">
              <div className="h-10 w-10 rounded-md bg-brand/15 grid place-items-center mb-3">
                <span className="h-5 w-5 rounded-sm bg-brand block" />
              </div>
              <h3 className="h2 mb-2">Hidden gems</h3>
              <p className="text-muted">Break out of the top-10 lists. Find indie cafes, neighborhood venues, and under-the-radar events.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations preview */}
      <section className="container py-16">
        <div className="mb-8">
          <h2 className="h2">Recommended near you</h2>
          <p className="text-muted">A quick look at the kind of places you might see.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map((i) => (
            <a key={i} href="#" className="group rounded-xl border border-border/60 bg-background overflow-hidden shadow-sm hover:shadow-md transition-shadow hover-lift focus-ring">
              <div className="aspect-[16/10] bg-muted" />
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium">Spot {i}</div>
                  <div className="text-xs px-2 py-1 rounded-full bg-brand/10 text-brand">Cafe</div>
                </div>
                <div className="text-sm text-muted">Cozy • 0.{i} mi • Open now</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border/60 bg-muted/30">
        <div className="container py-16">
          <div className="mb-8">
            <h2 className="h2">What people say</h2>
            <p className="text-muted">Early users on finding places faster with Lokalista.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1,2,3].map((i) => (
              <div key={i} className="rounded-xl border border-border/60 bg-background p-5 hover-lift">
                <div className="text-sm text-muted mb-3">“Found a cozy cafe five minutes away without scrolling for 30 minutes.”</div>
                <div className="font-medium">Alex {i}</div>
                <div className="text-xs text-muted">NYC</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-16">
        <div className="mb-8">
          <h2 className="h2">FAQ</h2>
          <p className="text-muted">Common questions about using Lokalista.</p>
        </div>
        <div className="space-y-3">
          {[
            {q:"Do I need an account?", a:"You can explore the demo, but to see personalized recommendations and save places, you'll need an account."},
            {q:"How do you get my location?", a:"With your permission, we use your device location or a neighborhood you provide."},
            {q:"What does AI do here?", a:"We match your mood and context with places and events, and explain the why."},
          ].map((item, idx) => (
            <details key={idx} className="rounded-lg border border-border/60 bg-background p-4">
              <summary className="cursor-pointer font-medium">{item.q}</summary>
              <div className="mt-2 text-muted text-sm">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border/60">
        <div className="container py-8 text-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-brand/15 grid place-items-center">
              <span className="h-3 w-3 rounded-sm bg-brand block" />
            </div>
            <span className="font-medium">Lokalista</span>
            <span className="text-muted">Open access</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/how-it-works" className="hover:underline underline-offset-4">How it works</a>
            <a href="/auth/login" className="hover:underline underline-offset-4">Login</a>
            <a href="/auth/signup" className="hover:underline underline-offset-4">Create account</a>
            <a href="#" className="hover:underline underline-offset-4">Privacy</a>
            <a href="#" className="hover:underline underline-offset-4">Terms</a>
            <a href="#" className="hover:underline underline-offset-4">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
