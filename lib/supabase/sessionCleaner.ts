// Clean up any existing Supabase session data to prevent refresh token attempts
if (typeof window !== "undefined") {
  // Extend window type to include potential Supabase client
  (window as any).__supabaseClient = undefined;
  // Always clean up Supabase data to prevent any cached sessions from causing issues
  try {
    // Clear all Supabase-related localStorage items
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes('supabase') || key.includes('sb-') || key.includes('yrqtlbuuhxrghoorjwyo'))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));

    // Clear all Supabase-related sessionStorage items
    const sessionKeysToRemove = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && (key.includes('supabase') || key.includes('sb-') || key.includes('yrqtlbuuhxrghoorjwyo'))) {
        sessionKeysToRemove.push(key);
      }
    }
    sessionKeysToRemove.forEach(key => sessionStorage.removeItem(key));

    // Clear any Supabase cookies
    document.cookie.split(";").forEach(cookie => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      if (name.includes('supabase') || name.includes('sb-') || name.includes('yrqtlbuuhxrghoorjwyo')) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
      }
    });

    // Clear any cached Supabase instances in memory
    if (window.__supabaseClient) {
      delete window.__supabaseClient;
    }
  } catch (error) {
    console.warn("Error cleaning up Supabase session data:", error);
  }
}
