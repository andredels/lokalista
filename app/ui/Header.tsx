"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/browserClient";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<import("@supabase/supabase-js").User | null>(null);
  const [profile, setProfile] = useState<{ first_name?: string; avatar_url?: string } | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const menuRef = useRef<HTMLDivElement | null>(null);

  const applyTheme = useCallback((value: "light" | "dark") => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.dataset.theme = value;
    try {
      root.style.colorScheme = value;
      localStorage.setItem("lokalista-theme", value);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = (() => {
      try {
        return localStorage.getItem("lokalista-theme");
      } catch {
        return null;
      }
    })();

    if (stored === "dark" || stored === "light") {
      setTheme(stored);
      applyTheme(stored);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = prefersDark ? "dark" : "light";
      setTheme(initial);
      applyTheme(initial);
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (event: MediaQueryListEvent) => {
      const next = event.matches ? "dark" : "light";
      setTheme(next);
      applyTheme(next);
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [applyTheme]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 2);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;
    
    const loadProfileData = async (userId: string) => {
      try {
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('first_name, avatar_url')
          .eq('id', userId)
          .single();
        
        if (!mounted) return;
        
        if (error && error.code !== 'PGRST116') {
          console.error('Error loading profile:', error);
        }
        
        setProfile(profileData || null);
      } catch (error) {
        console.error('Error loading profile:', error);
        if (mounted) {
          setProfile(null);
          // Set loading to false even if profile loading fails
          setLoadingUser(false);
        }
      }
    };
    
    (async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (!mounted) return;
        setUser(data.user ?? null);
        // Do not block UI on profile fetch
        if (data.user) {
          loadProfileData(data.user.id);
        }
      } catch (error) {
        console.error('Error in auth initialization:', error);
      } finally {
        if (mounted) {
          setLoadingUser(false);
        }
      }
    })();
    
    const { data: sub } = supabase.auth.onAuthStateChange(
      async (_event: import("@supabase/supabase-js").AuthChangeEvent, session: import("@supabase/supabase-js").Session | null) => {
        if (!mounted) return;
        setUser(session?.user ?? null);
        if (session?.user) {
          // Fire and forget profile refresh
          loadProfileData(session.user.id);
        } else {
          setProfile(null);
        }
      }
    );
    
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    function onClickOutside(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    if (menuOpen) {
      document.addEventListener("keydown", onKeyDown);
      document.addEventListener("mousedown", onClickOutside);
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [menuOpen]);

  const firstName = useMemo(() => {
    // Use first_name from profile if available
    if (profile?.first_name) {
      return profile.first_name;
    }
    
    // Fallback to user metadata
    const meta = user?.user_metadata as Record<string, unknown> | undefined;
    const fullName = (meta?.full_name as string) || (meta?.name as string) || (meta?.first_name as string);
    if (fullName) {
      return fullName.split(" ")[0];
    }
    
    // Final fallback to email
    const email = user?.email || "";
    return email.includes("@") ? email.split("@")[0] : "";
  }, [user, profile]);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    // Redirect to landing page after sign out
    window.location.href = "/";
  }

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border/60 backdrop-blur supports-[backdrop-filter]:bg-background/70 ${
        isScrolled ? "bg-background/70" : "bg-background/50"
      }`}
    >
      <div className="container flex items-center justify-between h-14 md:h-16">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2" aria-label="Lokalista home">
            <span className="h-8 w-8 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 grid place-items-center text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 21s7-4.5 7-10a7 7 0 10-14 0c0 5.5 7 10 7 10z" stroke="currentColor" strokeWidth="1.6"/>
                <circle cx="12" cy="11" r="2" fill="currentColor" />
              </svg>
            </span>
            <span className="text-base font-semibold bg-gradient-to-r from-fuchsia-500 to-violet-600 bg-clip-text text-transparent">Lokalista</span>
          </Link>
        </div>
        <nav className="flex items-center gap-3 md:gap-5 text-sm overflow-x-auto">
          <Link
            href="/dashboard"
            className={`whitespace-nowrap px-3 h-8 rounded-full inline-flex items-center gap-2 transition-colors ${
              pathname?.startsWith("/dashboard")
                ? "bg-fuchsia-50 text-fuchsia-600"
                : "text-foreground/90 hover:bg-fuchsia-50 hover:text-fuchsia-600"
            }`}
            aria-current={pathname?.startsWith("/dashboard") ? "page" : undefined}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            Home
          </Link>
          <Link
            href="/feed"
            className={`whitespace-nowrap px-3 h-8 rounded-full inline-flex items-center gap-2 transition-colors ${
              pathname?.startsWith("/feed")
                ? "bg-fuchsia-50 text-fuchsia-600"
                : "text-foreground/90 hover:bg-fuchsia-50 hover:text-fuchsia-600"
            }`}
            aria-current={pathname?.startsWith("/feed") ? "page" : undefined}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 12h8m-8 4h12M4 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            AI Assistant
          </Link>
          <Link
            href="/map"
            className={`whitespace-nowrap px-3 h-8 rounded-full inline-flex items-center gap-2 transition-colors ${
              pathname?.startsWith("/map")
                ? "bg-fuchsia-50 text-fuchsia-600"
                : "text-foreground/90 hover:bg-fuchsia-50 hover:text-fuchsia-600"
            }`}
            aria-current={pathname?.startsWith("/map") ? "page" : undefined}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 2v4m0 12v4m8-8h-4M8 12H4m12.95-6.95l-2.83 2.83M7.05 16.95l-2.83 2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Food Map
          </Link>
          <Link
            href="/community"
            className={`whitespace-nowrap px-3 h-8 rounded-full inline-flex items-center gap-2 transition-colors ${
              pathname?.startsWith("/community")
                ? "bg-fuchsia-50 text-fuchsia-600"
                : "text-foreground/90 hover:bg-fuchsia-50 hover:text-fuchsia-600"
            }`}
            aria-current={pathname?.startsWith("/community") ? "page" : undefined}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 7a3 3 0 106 0 3 3 0 00-6 0zm0 0v10m6-10v10m10-5a3 3 0 11-6 0 3 3 0 016 0zm0 0v5m-6-5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Community
          </Link>
        </nav>
        <div className="flex items-center gap-2 relative" ref={menuRef}>
          {loadingUser ? (
            <div>Loading...</div>
          ) : user ? (
            <div className="flex items-center gap-2">
              <button
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                className="h-9 pl-1 pr-2 rounded-md border border-border/60 inline-flex items-center gap-2 hover:bg-muted"
              >
                {profile?.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt={`${firstName || 'User'}'s profile picture`}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                    {(firstName || user.email || "?").slice(0, 1).toUpperCase()}
                  </div>
                )}
                {firstName && <span className="text-sm font-medium hidden sm:inline">{firstName}</span>}
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {menuOpen && (
                <div role="menu" className="absolute right-0 top-[calc(100%+8px)] w-48 rounded-md border border-border/60 bg-background shadow-md p-1 text-sm">
                  <Link href="/profile/edit" className="block px-3 py-2 rounded hover:bg-muted" role="menuitem" onClick={() => setMenuOpen(false)}>
                    Edit Profile
                  </Link>
                  <Link href="/account/settings" className="block px-3 py-2 rounded hover:bg-muted" role="menuitem" onClick={() => setMenuOpen(false)}>
                    Account Settings
                  </Link>
                  <div className="px-3 py-2 rounded hover:bg-muted flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="font-medium">Dark Mode</span>
                      <span className="text-xs text-muted">{theme === "dark" ? "On" : "Off"}</span>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={theme === "dark"}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleTheme();
                      }}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        theme === "dark" ? "bg-fuchsia-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute top-[3px] left-[3px] h-4 w-4 rounded-full bg-white shadow transition-transform ${
                          theme === "dark" ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-muted" role="menuitem" onClick={() => { setMenuOpen(false); handleSignOut(); }}>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/feed" className="hidden sm:inline-flex h-9 px-3 rounded-md border border-brand text-brand items-center gap-2 hover:bg-brand/5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Find Places
              </Link>
              <Link href="/auth/login" className="h-9 px-4 rounded-md text-white inline-flex items-center bg-gradient-to-r from-fuchsia-500 to-violet-600 hover:opacity-95">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}


