"use client";
/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-img-element, react/no-unescaped-entities */

import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";

const aiRecommendations = [
  {
    id: "emall-foodcourt",
    name: "Elizabeth Mall Food Court",
    description: "All-in-one Cebuano favorites inside E-Mall.",
    category: "Food Court · Filipino & Asian",
    rating: 4.1,
    distance: "0.2 km",
    image: "/ai/emall-foodcourt.jpg",
  },
  {
    id: "larsian",
    name: "Larsian Fuente",
    description: "Iconic late-night barbecue stalls with unlimited rice.",
    category: "Street BBQ · Filipino",
    rating: 4.4,
    distance: "0.8 km",
    image: "/ai/larsian.jpg",
  },
  {
    id: "skyline-bistro",
    name: "Skyline Bistro",
    description: "Skypark dining overlooking the SRP coastline.",
    category: "Casual Dining · International",
    rating: 4.3,
    distance: "2.4 km",
    image: "/ai/skyline-bistro.jpg",
  },
  {
    id: "ayala-coffee",
    name: "Coffee Bean at Terraces",
    description: "Cozy third-wave coffee with outdoor seating.",
    category: "Cafe · Coffee & Pastries",
    rating: 4.5,
    distance: "1.6 km",
    image: "/ai/coffee-bean.jpg",
  },
];

export default function Home() {
  const heroRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const featuresRef = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="font-sans animate-fade-in">
      {/* Hero */}
      <section className="relative" style={{ backgroundColor: "#eadbfd" }}>
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(closest-side,black,transparent)]">
          <div className="absolute -top-16 -left-16 size-[420px] rounded-full bg-brand/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 size-[480px] rounded-full bg-brand/10 blur-3xl" />
        </div>
        <div className="container relative pt-10 md:pt-14 pb-16 md:pb-20">
          <div 
            ref={heroRef.ref as any}
            className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${heroRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          >
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 h-7 rounded-full border border-border/60 bg-muted text-xs font-medium mb-4 animate-scale-in">
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
                <a href="/auth/login" className="h-11 px-5 rounded-md bg-[#8c52ff] text-white hover:opacity-90 transition-all hover-scale btn-press btn-ripple inline-flex items-center justify-center">Get Started Free → </a>
                <a href="/map" className="h-11 px-5 rounded-md border border-border/60 bg-white text-[#8c52ff] transition-all hover-scale btn-press inline-flex items-center justify-center gap-2">
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

      {/* AI Recommendation Strip */}
      <section className="relative border-t border-border/60" style={{ backgroundColor: "#f3e8ff" }}>
        <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to-bottom,black,transparent)]">
          <div className="absolute -top-24 left-1/3 w-80 h-80 rounded-full bg-fuchsia-200/40 blur-3xl" />
        </div>
        <div className="container relative py-16 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#8c52ff] mb-2">AI Picks Near You</p>
              <h2 className="h2 mb-1">Curated by Lokalista</h2>
              <p className="text-muted max-w-xl">
                Real places surfaced by our assistant based on Cebu City favorites. Updated live as you explore.
              </p>
            </div>
            <a
              href="/feed"
              className="h-10 px-5 rounded-full border border-[#8c52ff]/30 text-[#8c52ff] inline-flex items-center gap-2 bg-white/70 backdrop-blur hover:bg-white transition"
            >
              Ask the AI for more →
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {aiRecommendations.map((place) => (
              <article
                key={place.id}
                className="bg-white rounded-2xl border border-white/60 shadow-lg shadow-purple-200/25 overflow-hidden hover:-translate-y-1 transition-transform"
              >
                <div className="relative h-44">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/85 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-[#8c52ff]">
                    AI recommended
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 leading-snug">{place.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{place.category}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-yellow-500">
                      <span className="text-lg leading-none">⭐</span>
                      <span>{place.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{place.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-[#8c52ff]/70 inline-block" />
                      {place.distance} away
                    </span>
                    <a
                      href={`/map?search=${encodeURIComponent(place.name)}`}
                      className="text-[#8c52ff] font-medium hover:underline underline-offset-4"
                    >
                      View on map
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border/60 bg-muted/30">
        <div className="container py-16 md:py-20">
          <div 
            ref={featuresRef.ref as any}
            className={`text-center max-w-3xl mx-auto mb-10 ${featuresRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          >
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
            ].map((card, index) => (
              <div 
                key={card.title} 
                className={`rounded-xl border border-border/60 bg-background p-6 shadow-sm card-hover stagger-item`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
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
                <a href="#" className="h-10 px-4 rounded-md border border-border/60 inline-flex items-center justify-center text-sm transition-all hover-scale btn-press">Explore Feature</a>
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
