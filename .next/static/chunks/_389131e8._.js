(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/supabase/fetchInterceptor.ts [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Global fetch interceptor to prevent Supabase requests when not configured
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
if ("TURBOPACK compile-time truthy", 1) {
    const originalFetch = window.fetch;
    const supabaseUrl = ("TURBOPACK compile-time value", "https://yrqtlbuuhxrghoorjwyo.supabase.co") || "https://yrqtlbuuhxrghoorjwyo.supabase.co";
    const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycXRsYnV1aHhyZ2hvb3Jqd3lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjY5NjcsImV4cCI6MjA3MzQ0Mjk2N30.PYfMtnwbuHUpEfEDUgzsAE6hnsJHt2q3qMOt8xC9DQ8") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycXRsYnV1aHhyZ2hvb3Jqd3lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjY5NjcsImV4cCI6MjA3MzQ0Mjk2N30.PYfMtnwbuHUpEfEDUgzsAE6hnsJHt2q3qMOt8xC9DQ8";
    const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl !== "https://placeholder.supabase.co";
    // Only intercept fetch if Supabase is not properly configured
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/supabase/sessionCleaner.ts [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Clean up any existing Supabase session data to prevent refresh token attempts
if ("TURBOPACK compile-time truthy", 1) {
    // Extend window type to include potential Supabase client
    window.__supabaseClient = undefined;
    // Always clean up Supabase data to prevent any cached sessions from causing issues
    try {
        // Clear all Supabase-related localStorage items
        const keysToRemove = [];
        for(let i = 0; i < localStorage.length; i++){
            const key = localStorage.key(i);
            if (key && (key.includes('supabase') || key.includes('sb-') || key.includes('yrqtlbuuhxrghoorjwyo'))) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach((key)=>localStorage.removeItem(key));
        // Clear all Supabase-related sessionStorage items
        const sessionKeysToRemove = [];
        for(let i = 0; i < sessionStorage.length; i++){
            const key = sessionStorage.key(i);
            if (key && (key.includes('supabase') || key.includes('sb-') || key.includes('yrqtlbuuhxrghoorjwyo'))) {
                sessionKeysToRemove.push(key);
            }
        }
        sessionKeysToRemove.forEach((key)=>sessionStorage.removeItem(key));
        // Clear any Supabase cookies
        document.cookie.split(";").forEach((cookie)=>{
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
            if (name.includes('supabase') || name.includes('sb-') || name.includes('yrqtlbuuhxrghoorjwyo')) {
                document.cookie = "".concat(name, "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/");
                document.cookie = "".concat(name, "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=").concat(window.location.hostname);
                document.cookie = "".concat(name, "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.").concat(window.location.hostname);
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/supabase/browserClient.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// Import fetch interceptor to block Supabase requests when not configured
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$fetchInterceptor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/fetchInterceptor.ts [app-client] (ecmascript)");
// Clean up any existing session data
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$sessionCleaner$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/sessionCleaner.ts [app-client] (ecmascript)");
"use client";
;
;
// Check if Supabase is configured before importing
const supabaseUrl = ("TURBOPACK compile-time value", "https://yrqtlbuuhxrghoorjwyo.supabase.co") || "https://yrqtlbuuhxrghoorjwyo.supabase.co";
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycXRsYnV1aHhyZ2hvb3Jqd3lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjY5NjcsImV4cCI6MjA3MzQ0Mjk2N30.PYfMtnwbuHUpEfEDUgzsAE6hnsJHt2q3qMOt8xC9DQ8") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycXRsYnV1aHhyZ2hvb3Jqd3lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjY5NjcsImV4cCI6MjA3MzQ0Mjk2N30.PYfMtnwbuHUpEfEDUgzsAE6hnsJHt2q3qMOt8xC9DQ8";
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl !== "https://placeholder.supabase.co";
// Only import Supabase if configured
let createBrowserClient = null;
if ("TURBOPACK compile-time truthy", 1) {
    try {
        const { createBrowserClient: _createBrowserClient } = __turbopack_context__.r("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-client] (ecmascript)");
        createBrowserClient = _createBrowserClient;
    } catch (error) {
        console.warn("Failed to import Supabase SSR:", error);
    }
}
// Store the client instance to avoid re-creating it
let cachedClient = null;
// Mock client that doesn't make any network requests
const createMockClient = ()=>{
    const mockClient = {
        auth: {
            getUser: ()=>Promise.resolve({
                    data: {
                        user: null
                    },
                    error: null
                }),
            getSession: ()=>Promise.resolve({
                    data: {
                        session: null
                    },
                    error: null
                }),
            signInWithPassword: ()=>Promise.resolve({
                    data: {
                        user: null,
                        session: null
                    },
                    error: {
                        message: "Authentication service is temporarily unavailable. Please try again later."
                    }
                }),
            signUp: ()=>Promise.resolve({
                    data: {
                        user: null,
                        session: null
                    },
                    error: {
                        message: "Registration service is temporarily unavailable. Please try again later."
                    }
                }),
            signOut: ()=>Promise.resolve({
                    error: null
                }),
            onAuthStateChange: ()=>({
                    data: {
                        subscription: {
                            unsubscribe: ()=>{}
                        }
                    }
                })
        },
        from: ()=>({
                select: ()=>Promise.resolve({
                        data: [],
                        error: null
                    }),
                insert: ()=>Promise.resolve({
                        data: [],
                        error: null
                    }),
                update: ()=>Promise.resolve({
                        data: [],
                        error: null
                    }),
                delete: ()=>Promise.resolve({
                        data: [],
                        error: null
                    })
            }),
        storage: {
            from: ()=>({
                    upload: ()=>Promise.resolve({
                            data: null,
                            error: {
                                message: "Supabase not configured"
                            }
                        }),
                    getPublicUrl: ()=>({
                            data: {
                                publicUrl: ""
                            }
                        })
                })
        }
    };
    return mockClient;
};
function createClient() {
    // If client is already created, return it
    if (cachedClient) {
        return cachedClient;
    }
    // If env vars are missing or Supabase is not available, return a mock client
    if (!isSupabaseConfigured || !createBrowserClient) {
        cachedClient = createMockClient();
        return cachedClient;
    }
    try {
        cachedClient = createBrowserClient(supabaseUrl, supabaseAnonKey);
        return cachedClient;
    } catch (error) {
        console.warn("Failed to create Supabase client:", error);
        cachedClient = createMockClient();
        return cachedClient;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/ui/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/browserClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function Header() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [isScrolled, setIsScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadingUser, setLoadingUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            function onScroll() {
                setIsScrolled(window.scrollY > 2);
            }
            onScroll();
            window.addEventListener("scroll", onScroll, {
                passive: true
            });
            return ({
                "Header.useEffect": ()=>window.removeEventListener("scroll", onScroll)
            })["Header.useEffect"];
        }
    }["Header.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            let mounted = true;
            // Check if Supabase is configured
            const supabaseUrl = ("TURBOPACK compile-time value", "https://yrqtlbuuhxrghoorjwyo.supabase.co");
            const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycXRsYnV1aHhyZ2hvb3Jqd3lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjY5NjcsImV4cCI6MjA3MzQ0Mjk2N30.PYfMtnwbuHUpEfEDUgzsAE6hnsJHt2q3qMOt8xC9DQ8");
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            try {
                const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                const loadProfileData = {
                    "Header.useEffect.loadProfileData": async (userId)=>{
                        try {
                            const { data: profileData, error } = await supabase.from('profiles').select('first_name, avatar_url').eq('id', userId).single();
                            if (!mounted) return;
                            if (error && error.code !== 'PGRST116') {
                                console.error('Error loading profile:', error);
                            }
                            setProfile(profileData || null);
                        } catch (error) {
                            console.error('Error loading profile:', error);
                            if (mounted) {
                                setProfile(null);
                                setLoadingUser(false);
                            }
                        }
                    }
                }["Header.useEffect.loadProfileData"];
                ({
                    "Header.useEffect": async ()=>{
                        try {
                            const { data } = await supabase.auth.getUser();
                            if (!mounted) return;
                            var _data_user;
                            setUser((_data_user = data.user) !== null && _data_user !== void 0 ? _data_user : null);
                            if (data.user) {
                                loadProfileData(data.user.id);
                            }
                        } catch (error) {
                            console.error('Error in auth initialization:', error);
                        } finally{
                            if (mounted) {
                                setLoadingUser(false);
                            }
                        }
                    }
                })["Header.useEffect"]();
                const { data: sub } = supabase.auth.onAuthStateChange({
                    "Header.useEffect": async (_event, session)=>{
                        if (!mounted) return;
                        var _session_user;
                        setUser((_session_user = session === null || session === void 0 ? void 0 : session.user) !== null && _session_user !== void 0 ? _session_user : null);
                        if (session === null || session === void 0 ? void 0 : session.user) {
                            loadProfileData(session.user.id);
                        } else {
                            setProfile(null);
                        }
                    }
                }["Header.useEffect"]);
                return ({
                    "Header.useEffect": ()=>{
                        mounted = false;
                        sub.subscription.unsubscribe();
                    }
                })["Header.useEffect"];
            } catch (error) {
                console.error('Error initializing Supabase client:', error);
                if (mounted) {
                    setLoadingUser(false);
                }
            }
        }
    }["Header.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            function onKeyDown(e) {
                if (e.key === "Escape") setMenuOpen(false);
            }
            function onClickOutside(e) {
                if (!menuRef.current) return;
                if (!menuRef.current.contains(e.target)) setMenuOpen(false);
            }
            if (menuOpen) {
                document.addEventListener("keydown", onKeyDown);
                document.addEventListener("mousedown", onClickOutside);
            }
            return ({
                "Header.useEffect": ()=>{
                    document.removeEventListener("keydown", onKeyDown);
                    document.removeEventListener("mousedown", onClickOutside);
                }
            })["Header.useEffect"];
        }
    }["Header.useEffect"], [
        menuOpen
    ]);
    const firstName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Header.useMemo[firstName]": ()=>{
            // Use first_name from profile if available
            if (profile === null || profile === void 0 ? void 0 : profile.first_name) {
                return profile.first_name;
            }
            // Fallback to user metadata
            const meta = user === null || user === void 0 ? void 0 : user.user_metadata;
            const fullName = (meta === null || meta === void 0 ? void 0 : meta.full_name) || (meta === null || meta === void 0 ? void 0 : meta.name) || (meta === null || meta === void 0 ? void 0 : meta.first_name);
            if (fullName) {
                return fullName.split(" ")[0];
            }
            // Final fallback to email
            const email = (user === null || user === void 0 ? void 0 : user.email) || "";
            return email.includes("@") ? email.split("@")[0] : "";
        }
    }["Header.useMemo[firstName]"], [
        user,
        profile
    ]);
    async function handleSignOut() {
        const supabaseUrl = ("TURBOPACK compile-time value", "https://yrqtlbuuhxrghoorjwyo.supabase.co");
        const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycXRsYnV1aHhyZ2hvb3Jqd3lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjY5NjcsImV4cCI6MjA3MzQ0Mjk2N30.PYfMtnwbuHUpEfEDUgzsAE6hnsJHt2q3qMOt8xC9DQ8");
        if ("TURBOPACK compile-time truthy", 1) {
            try {
                const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
                await supabase.auth.signOut();
            } catch (error) {
                console.error('Error signing out:', error);
            }
        }
        // Redirect to landing page after sign out
        window.location.href = "/";
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-50 border-b border-border/60 backdrop-blur supports-[backdrop-filter]:bg-background/70 ".concat(isScrolled ? "bg-background/70" : "bg-background/50"),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container flex items-center justify-between h-14 md:h-16",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/dashboard",
                        className: "flex items-center gap-2",
                        "aria-label": "Lokalista home",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "h-8 w-8 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 grid place-items-center text-white",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "18",
                                    height: "18",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    "aria-hidden": true,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M12 21s7-4.5 7-10a7 7 0 10-14 0c0 5.5 7 10 7 10z",
                                            stroke: "currentColor",
                                            strokeWidth: "1.6"
                                        }, void 0, false, {
                                            fileName: "[project]/app/ui/Header.tsx",
                                            lineNumber: 171,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "12",
                                            cy: "11",
                                            r: "2",
                                            fill: "currentColor"
                                        }, void 0, false, {
                                            fileName: "[project]/app/ui/Header.tsx",
                                            lineNumber: 172,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/ui/Header.tsx",
                                    lineNumber: 170,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/ui/Header.tsx",
                                lineNumber: 169,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-base font-semibold bg-gradient-to-r from-fuchsia-500 to-violet-600 bg-clip-text text-transparent",
                                children: "Lokalista"
                            }, void 0, false, {
                                fileName: "[project]/app/ui/Header.tsx",
                                lineNumber: 175,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/ui/Header.tsx",
                        lineNumber: 168,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/ui/Header.tsx",
                    lineNumber: 167,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "flex items-center gap-3 md:gap-5 text-sm overflow-x-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/dashboard",
                            className: "whitespace-nowrap px-3 h-8 rounded-full inline-flex items-center gap-2 transition-colors ".concat((pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/dashboard")) ? "bg-fuchsia-50 text-fuchsia-600" : "text-foreground/90 hover:bg-fuchsia-50 hover:text-fuchsia-600"),
                            "aria-current": (pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/dashboard")) ? "page" : undefined,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "16",
                                    height: "16",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    "aria-hidden": true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9z",
                                        stroke: "currentColor",
                                        strokeWidth: "1.5"
                                    }, void 0, false, {
                                        fileName: "[project]/app/ui/Header.tsx",
                                        lineNumber: 189,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/ui/Header.tsx",
                                    lineNumber: 188,
                                    columnNumber: 13
                                }, this),
                                "Home"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/ui/Header.tsx",
                            lineNumber: 179,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/feed",
                            className: "whitespace-nowrap px-3 h-8 rounded-full inline-flex items-center gap-2 transition-colors ".concat((pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/feed")) ? "bg-fuchsia-50 text-fuchsia-600" : "text-foreground/90 hover:bg-fuchsia-50 hover:text-fuchsia-600"),
                            "aria-current": (pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/feed")) ? "page" : undefined,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "16",
                                    height: "16",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    "aria-hidden": true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M4 12h8m-8 4h12M4 8h12",
                                        stroke: "currentColor",
                                        strokeWidth: "1.5",
                                        strokeLinecap: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/app/ui/Header.tsx",
                                        lineNumber: 203,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/ui/Header.tsx",
                                    lineNumber: 202,
                                    columnNumber: 13
                                }, this),
                                "AI Assistant"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/ui/Header.tsx",
                            lineNumber: 193,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/map",
                            className: "whitespace-nowrap px-3 h-8 rounded-full inline-flex items-center gap-2 transition-colors ".concat((pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/map")) ? "bg-fuchsia-50 text-fuchsia-600" : "text-foreground/90 hover:bg-fuchsia-50 hover:text-fuchsia-600"),
                            "aria-current": (pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/map")) ? "page" : undefined,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "16",
                                    height: "16",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    "aria-hidden": true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M12 2v4m0 12v4m8-8h-4M8 12H4m12.95-6.95l-2.83 2.83M7.05 16.95l-2.83 2.83",
                                        stroke: "currentColor",
                                        strokeWidth: "1.5",
                                        strokeLinecap: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/app/ui/Header.tsx",
                                        lineNumber: 217,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/ui/Header.tsx",
                                    lineNumber: 216,
                                    columnNumber: 13
                                }, this),
                                "Food Map"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/ui/Header.tsx",
                            lineNumber: 207,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/community",
                            className: "whitespace-nowrap px-3 h-8 rounded-full inline-flex items-center gap-2 transition-colors ".concat((pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/community")) ? "bg-fuchsia-50 text-fuchsia-600" : "text-foreground/90 hover:bg-fuchsia-50 hover:text-fuchsia-600"),
                            "aria-current": (pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/community")) ? "page" : undefined,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "16",
                                    height: "16",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    "aria-hidden": true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M4 7a3 3 0 106 0 3 3 0 00-6 0zm0 0v10m6-10v10m10-5a3 3 0 11-6 0 3 3 0 016 0zm0 0v5m-6-5v5",
                                        stroke: "currentColor",
                                        strokeWidth: "1.5",
                                        strokeLinecap: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/app/ui/Header.tsx",
                                        lineNumber: 231,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/ui/Header.tsx",
                                    lineNumber: 230,
                                    columnNumber: 13
                                }, this),
                                "Community"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/ui/Header.tsx",
                            lineNumber: 221,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/ui/Header.tsx",
                    lineNumber: 178,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 relative",
                    ref: menuRef,
                    children: loadingUser ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: "Loading..."
                    }, void 0, false, {
                        fileName: "[project]/app/ui/Header.tsx",
                        lineNumber: 238,
                        columnNumber: 13
                    }, this) : user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                "aria-haspopup": "menu",
                                "aria-expanded": menuOpen,
                                onClick: ()=>setMenuOpen((v)=>!v),
                                className: "h-9 pl-1 pr-2 rounded-md border border-border/60 inline-flex items-center gap-2 hover:bg-muted",
                                children: [
                                    (profile === null || profile === void 0 ? void 0 : profile.avatar_url) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: profile.avatar_url,
                                        alt: "".concat(firstName || 'User', "'s profile picture"),
                                        width: 32,
                                        height: 32,
                                        className: "w-8 h-8 rounded-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/app/ui/Header.tsx",
                                        lineNumber: 248,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium",
                                        children: (firstName || user.email || "?").slice(0, 1).toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/app/ui/Header.tsx",
                                        lineNumber: 256,
                                        columnNumber: 19
                                    }, this),
                                    firstName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium hidden sm:inline",
                                        children: firstName
                                    }, void 0, false, {
                                        fileName: "[project]/app/ui/Header.tsx",
                                        lineNumber: 260,
                                        columnNumber: 31
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "16",
                                        height: "16",
                                        viewBox: "0 0 20 20",
                                        fill: "none",
                                        "aria-hidden": true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M6 8l4 4 4-4",
                                            stroke: "currentColor",
                                            strokeWidth: "1.5",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round"
                                        }, void 0, false, {
                                            fileName: "[project]/app/ui/Header.tsx",
                                            lineNumber: 262,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/ui/Header.tsx",
                                        lineNumber: 261,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/ui/Header.tsx",
                                lineNumber: 241,
                                columnNumber: 15
                            }, this),
                            menuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                role: "menu",
                                className: "absolute right-0 top-[calc(100%+8px)] w-48 rounded-md border border-border/60 bg-background shadow-md p-1 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/profile/edit",
                                        className: "block px-3 py-2 rounded hover:bg-muted",
                                        role: "menuitem",
                                        onClick: ()=>setMenuOpen(false),
                                        children: "Edit Profile"
                                    }, void 0, false, {
                                        fileName: "[project]/app/ui/Header.tsx",
                                        lineNumber: 267,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/account/settings",
                                        className: "block px-3 py-2 rounded hover:bg-muted",
                                        role: "menuitem",
                                        onClick: ()=>setMenuOpen(false),
                                        children: "Account Settings"
                                    }, void 0, false, {
                                        fileName: "[project]/app/ui/Header.tsx",
                                        lineNumber: 270,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "w-full text-left px-3 py-2 rounded hover:bg-muted",
                                        role: "menuitem",
                                        onClick: ()=>{
                                            setMenuOpen(false);
                                            handleSignOut();
                                        },
                                        children: "Sign out"
                                    }, void 0, false, {
                                        fileName: "[project]/app/ui/Header.tsx",
                                        lineNumber: 273,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/ui/Header.tsx",
                                lineNumber: 266,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/ui/Header.tsx",
                        lineNumber: 240,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/feed",
                                className: "hidden sm:inline-flex h-9 px-3 rounded-md border border-brand text-brand items-center gap-2 hover:bg-brand/5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "16",
                                        height: "16",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        "aria-hidden": true,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                cx: "11",
                                                cy: "11",
                                                r: "7",
                                                stroke: "currentColor",
                                                strokeWidth: "1.5"
                                            }, void 0, false, {
                                                fileName: "[project]/app/ui/Header.tsx",
                                                lineNumber: 283,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M20 20l-3.5-3.5",
                                                stroke: "currentColor",
                                                strokeWidth: "1.5",
                                                strokeLinecap: "round"
                                            }, void 0, false, {
                                                fileName: "[project]/app/ui/Header.tsx",
                                                lineNumber: 284,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/ui/Header.tsx",
                                        lineNumber: 282,
                                        columnNumber: 17
                                    }, this),
                                    "Find Places"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/ui/Header.tsx",
                                lineNumber: 281,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/auth/login",
                                className: "h-9 px-4 rounded-md text-white inline-flex items-center bg-gradient-to-r from-fuchsia-500 to-violet-600 hover:opacity-95",
                                children: "Get Started"
                            }, void 0, false, {
                                fileName: "[project]/app/ui/Header.tsx",
                                lineNumber: 288,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                }, void 0, false, {
                    fileName: "[project]/app/ui/Header.tsx",
                    lineNumber: 236,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/ui/Header.tsx",
            lineNumber: 166,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/ui/Header.tsx",
        lineNumber: 161,
        columnNumber: 5
    }, this);
}
_s(Header, "v8XwvW5ephYT+99qsZxKucYPO20=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/ui/ConditionalHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConditionalHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/ui/Header.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ConditionalHeader() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConditionalHeader.useEffect": ()=>{
            setMounted(true);
        }
    }["ConditionalHeader.useEffect"], []);
    // Don't render header on landing page
    if (!mounted || pathname === "/") {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/app/ui/ConditionalHeader.tsx",
        lineNumber: 20,
        columnNumber: 10
    }, this);
}
_s(ConditionalHeader, "qIOWh+H4KANmZw/Ng5wnr7tzXF0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = ConditionalHeader;
var _c;
__turbopack_context__.k.register(_c, "ConditionalHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_389131e8._.js.map