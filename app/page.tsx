
export default function Home() {
  return (
    <div className="font-sans">
      {/* Hero */}
      <section className="relative" style={{ backgroundColor: "#eadbfd" }}>
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(closest-side,black,transparent)]">
          <div className="absolute -top-16 -left-16 size-[420px] rounded-full bg-brand/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 size-[480px] rounded-full bg-brand/10 blur-3xl" />
        </div>
        <div className="container relative pt-10 md:pt-14 pb-16 md:pb-20">
                       <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 h-7 rounded-full border border-border/60 bg-muted text-xs font-medium mb-4">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 2l2.39 4.84L20 8l-4 3.9L17 18l-5-2.6L7 18l1-6.1L4 8l5.61-1.16L12 2z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                </svg>
                AI-Powered Local Discovery
              </div>
              <h1 className="h1 mb-4 md:mb-5">
                Discover Your City's
                <br />
                <span className="bg-gradient-to-r from-fuchsia-500 to-violet-600 bg-clip-text text-transparent">Hidden Gems</span>
              </h1>
              <p className="text-muted mb-6 text-lg max-w-2xl">
                Let our AI recommend the perfect restaurants, cafes, and events based on your preferences and location. Explore like a local, discover like an explorer.
              </p>

              <ul className="space-y-3 mb-6">
                {[
                  { label: "AI-powered recommendations based on your preferences", icon: "/aipowered.png" },
                  { label: "Discover hidden gems near you", icon: "/gps.png" },
                  { label: "Smart search for restaurants, cafes & events", icon: "/search.png" },
                ].map((i) => (
                  <li key={i.label} className="flex items-start gap-3">
                    <span className="h-6 w-6 rounded-md bg-brand/15 grid place-items-center mt-0.5">
                      <img src={i.icon} alt="" className="h-4 w-4" />
                    </span>
                    <span className="text-sm md:text-base">{i.label}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="/auth/login" className="h-11 px-5 rounded-md bg-[#8c52ff] text-white hover:opacity-90 transition-colors inline-flex items-center justify-center">Get Started Free → </a>
                <a href="/map" className="h-11 px-5 rounded-md border border-border/60 bg-white text-[#8c52ff] inline-flex items-center justify-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Discover Now
                </a>
              </div>

              <div className="mt-6 flex items-center gap-3 text-sm text-muted md:mt-7">
                <div className="flex -space-x-1">
                  {[0,1,2,3].map((i) => (
                    <div key={i} className="size-6 rounded-full bg-brand/15 border border-border/60" />
                  ))}
                </div>
                10,000+ happy explorers
              </div>
            </div>

            {/* Right: replace with image */}
            <div className="relative">
              <img src="/Landing2.png" alt="Lokalista landing preview" className="w-full h-auto max-w-md md:max-w-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border/60 bg-muted/30">
        <div className="container py-16 md:py-20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="h2 mb-2">Discover Like Never Before</h2>
            <p className="text-muted">Our AI-powered platform combines intelligent recommendations with interactive discovery to help you find the perfect places for any occasion.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Recommendations",
                desc: "Get personalized suggestions based on your preferences and location. Our AI learns what you love.",
                bullets: ["Preference-based matching", "Learning preferences", "Real-time updates"],
                icon: "/brain.png",
              },
              {
                title: "Interactive Discovery Map",
                desc: "Explore your city with our smart map that shows hidden gems, ratings, and real-time availability.",
                bullets: ["Live location data", "Visual discovery", "Route planning"],
                icon: "/gps.png",
              },
              {
                title: "Smart Filters & Search",
                desc: "Find exactly what you're looking for with advanced filters for cuisine, price, and distance.",
                bullets: ["Advanced filtering", "Quick search", "Saved preferences"],
                icon: "/search.png",
              },
            ].map((card) => (
              <div key={card.title} className="rounded-xl border border-border/60 bg-background p-6 shadow-sm hover-lift">
                <div className="h-10 w-10 rounded-md bg-brand/15 grid place-items-center mb-4">
                  <img src={card.icon} alt="" className="h-5 w-5" />
                </div>
                <h3 className="h2 mb-2">{card.title}</h3>
                <p className="text-muted mb-4">{card.desc}</p>
                <ul className="space-y-2 mb-5">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm">
                      <span className="size-1.5 rounded-full bg-[#8c52ff] inline-block" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <a href="#" className="h-10 px-4 rounded-md border border-border/60 inline-flex items-center justify-center text-sm">Explore Feature</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini tiles */}
      <section className="container py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Personal Favorites", desc: "Save and organize your favorite places", icon: "/favorite.png" },
            { title: "Social Discovery", desc: "See what friends and locals recommend", icon: "/social.png" },
            { title: "Smart Reviews", desc: "AI-curated reviews and ratings", icon: "/star.png" },
            { title: "Real-time Info", desc: "Live hours, wait times, and availability", icon: "/clock.png" },
          ].map((t) => (
            <div key={t.title} className="rounded-xl border border-border/60 bg-background p-6 text-center">
              <div className="mx-auto mb-3 h-10 w-10 rounded-md bg-brand/15 grid place-items-center">
                <img src={t.icon} alt="" className="h-5 w-5" />
              </div>
              <div className="font-medium">{t.title}</div>
              <div className="text-sm text-muted mt-1">{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border/60 bg-muted/30">
        <div className="container py-16 text-center">
          <h3 className="h2 mb-2">Ready to Discover Your City?</h3>
          <p className="text-muted mb-6">Join thousands of explorers who use Lokalista to find amazing places every day.</p>
          <div className="flex items-center justify-center gap-3">
            <a href="/auth/login" className="h-11 px-5 rounded-md bg-[#8c52ff] text-white hover:opacity-90 inline-flex items-center">Start Exploring</a>
                          <a href="/feed" className="h-11 px-5 rounded-md border border-border/60 bg-white text-[#8c52ff] inline-flex items-center">Try AI Assistant</a>
          </div>
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
            <a href="/map" className="hover:underline underline-offset-4">Map</a>
            <a href="#" className="hover:underline underline-offset-4">Privacy</a>
            <a href="#" className="hover:underline underline-offset-4">Terms</a>
            <a href="#" className="hover:underline underline-offset-4">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
