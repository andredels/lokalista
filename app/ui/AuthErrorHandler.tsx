"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/browserClient";

/**
 * Component that handles Supabase auth errors globally.
 * Specifically handles refresh token errors that occur when sessions expire.
 * 
 * This error occurs when:
 * - User's session has expired
 * - Refresh token cookie is missing or invalid
 * - User hasn't logged in for a while
 * 
 * It's safe to ignore this error as Supabase will automatically clear the invalid session.
 */
export default function AuthErrorHandler() {
  useEffect(() => {
    const supabase = createClient();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // When session is cleared due to invalid refresh token,
        // the app will handle it through the auth state change
        if (event === "SIGNED_OUT" && !session) {
          // Session was cleared - this is expected when refresh token is invalid
        }
      }
    );

    // Suppress specific refresh token errors in console
    // These are expected when sessions expire
    if (typeof window !== "undefined") {
      const originalError = console.error;
      const errorFilter = (message: string) => {
        return (
          message.includes("Invalid Refresh Token") ||
          message.includes("Refresh Token Not Found") ||
          (message.includes("AuthApiError") && message.includes("refresh"))
        );
      };

      // Override console.error to filter refresh token errors
      console.error = (...args: any[]) => {
        const firstArg = args[0];
        const message = typeof firstArg === "string" 
          ? firstArg 
          : firstArg?.message || firstArg?.toString() || "";
        
        // Skip logging expected refresh token errors
        if (errorFilter(message)) {
          return;
        }
        
        // Log all other errors normally
        originalError.apply(console, args);
      };

      return () => {
        subscription.unsubscribe();
        console.error = originalError;
      };
    }

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return null;
}

