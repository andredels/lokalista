"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/browserClient";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<import("@supabase/supabase-js").User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

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
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      setUser(data.user ?? null);
      setLoadingUser(false);
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
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
    const meta = user?.user_metadata as Record<string, unknown> | undefined;
    const fullName = (meta?.full_name as string) || (meta?.name as string) || (meta?.first_name as string);
    if (fullName) return fullName.split(" ")[0];
    const email = user?.email || "";
    return email.includes("@") ? email.split("@")[0] : "";
  }, [user]);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    // user state will update via onAuthStateChange
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border/60 backdrop-blur supports-[backdrop-filter]:bg-background/70 ${
        isScrolled ? "bg-background/70" : "bg-background/50"
      }`}
    >
      <div className="container flex items-center justify-between h-14 md:h-16">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center" aria-label="Lokalista home">
            <Image src="/wordmark.svg" alt="Lokalista" width={112} height={20} />
          </Link>
        </div>
        <nav className="flex items-center gap-5 text-sm overflow-x-auto">
          <Link href="/feed" className="hover:underline underline-offset-4 whitespace-nowrap">
            Feed
          </Link>
          <Link href="/plan" className="hover:underline underline-offset-4 whitespace-nowrap">
            Start a plan
          </Link>
          <Link href="/journey" className="hover:underline underline-offset-4 whitespace-nowrap">
            Journey
          </Link>
          <Link href="/how-it-works" className="hover:underline underline-offset-4 whitespace-nowrap">
            How it works
          </Link>
        </nav>
        <div className="flex items-center gap-2 relative" ref={menuRef}>
          {loadingUser ? null : user ? (
            <div className="flex items-center gap-2">
              <button
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                className="h-9 pl-1 pr-2 rounded-md border border-border/60 inline-flex items-center gap-2 hover:bg-muted"
              >
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                  {(firstName || user.email || "?").slice(0, 1).toUpperCase()}
                </div>
                {firstName && <span className="text-sm font-medium hidden sm:inline">{firstName}</span>}
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {menuOpen && (
                <div role="menu" className="absolute right-0 top-[calc(100%+8px)] w-48 rounded-md border border-border/60 bg-background shadow-md p-1 text-sm">
                  <Link href="/account/profile" className="block px-3 py-2 rounded hover:bg-muted" role="menuitem" onClick={() => setMenuOpen(false)}>
                    Edit Profile
                  </Link>
                  <Link href="/account/settings" className="block px-3 py-2 rounded hover:bg-muted" role="menuitem" onClick={() => setMenuOpen(false)}>
                    Account Settings
                  </Link>
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-muted" role="menuitem" onClick={() => { setMenuOpen(false); handleSignOut(); }}>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/auth/login" className="hidden sm:inline-flex h-9 px-3 rounded-md border border-border/60 items-center">
                Login
              </Link>
              <Link href="/auth/signup" className="h-9 px-4 rounded-md bg-brand text-white hover:bg-brand-600 inline-flex items-center">
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}


