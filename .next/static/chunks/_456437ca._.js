(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/supabase/browserClient.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
"use client";
;
function createClient() {
    const supabaseUrl = ("TURBOPACK compile-time value", "https://yrqtlbuuhxrghoorjwyo.supabase.co");
    const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycXRsYnV1aHhyZ2hvb3Jqd3lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjY5NjcsImV4cCI6MjA3MzQ0Mjk2N30.PYfMtnwbuHUpEfEDUgzsAE6hnsJHt2q3qMOt8xC9DQ8");
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(supabaseUrl, supabaseAnonKey);
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
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("light");
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const applyTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Header.useCallback[applyTheme]": (value)=>{
            if (typeof document === "undefined") return;
            const root = document.documentElement;
            root.dataset.theme = value;
            root.classList.toggle("dark", value === "dark");
            try {
                root.style.colorScheme = value;
                localStorage.setItem("lokalista-theme", value);
            } catch (e) {
            /* ignore */ }
        }
    }["Header.useCallback[applyTheme]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const stored = ({
                "Header.useEffect.stored": ()=>{
                    try {
                        return localStorage.getItem("lokalista-theme");
                    } catch (e) {
                        return null;
                    }
                }
            })["Header.useEffect.stored"]();
            if (stored === "dark" || stored === "light") {
                setTheme(stored);
                applyTheme(stored);
            } else {
                const initial = "light";
                setTheme(initial);
                applyTheme(initial);
            }
            const media = window.matchMedia("(prefers-color-scheme: dark)");
            const listener = {
                "Header.useEffect.listener": (event)=>{
                    const next = event.matches ? "dark" : "light";
                    setTheme(next);
                    applyTheme(next);
                }
            }["Header.useEffect.listener"];
            media.addEventListener("change", listener);
            return ({
                "Header.useEffect": ()=>media.removeEventListener("change", listener)
            })["Header.useEffect"];
        }
    }["Header.useEffect"], [
        applyTheme
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            applyTheme(theme);
        }
    }["Header.useEffect"], [
        theme,
        applyTheme
    ]);
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
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
            let mounted = true;
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
                            // Set loading to false even if profile loading fails
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
                        // Do not block UI on profile fetch
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
                        // Fire and forget profile refresh
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
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
        await supabase.auth.signOut();
        // Redirect to landing page after sign out
        window.location.href = "/";
    }
    const toggleTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Header.useCallback[toggleTheme]": ()=>{
            setTheme({
                "Header.useCallback[toggleTheme]": (prev)=>prev === "dark" ? "light" : "dark"
            }["Header.useCallback[toggleTheme]"]);
        }
    }["Header.useCallback[toggleTheme]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-[500] border-b border-border/60 backdrop-blur supports-[backdrop-filter]:bg-background/70 ".concat(isScrolled ? "bg-background/70" : "bg-background/50"),
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
                                            lineNumber: 199,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "12",
                                            cy: "11",
                                            r: "2",
                                            fill: "currentColor"
                                        }, void 0, false, {
                                            fileName: "[project]/app/ui/Header.tsx",
                                            lineNumber: 200,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/ui/Header.tsx",
                                    lineNumber: 198,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/ui/Header.tsx",
                                lineNumber: 197,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-base font-semibold bg-gradient-to-r from-fuchsia-500 to-violet-600 bg-clip-text text-transparent",
                                children: "Lokalista"
                            }, void 0, false, {
                                fileName: "[project]/app/ui/Header.tsx",
                                lineNumber: 203,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/ui/Header.tsx",
                        lineNumber: 196,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/ui/Header.tsx",
                    lineNumber: 195,
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/lokalista.png",
                                    alt: "Home icon",
                                    width: 16,
                                    height: 16,
                                    className: "h-4 w-4 object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/app/ui/Header.tsx",
                                    lineNumber: 216,
                                    columnNumber: 13
                                }, this),
                                "Home"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/ui/Header.tsx",
                            lineNumber: 207,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/feed",
                            className: "whitespace-nowrap px-3 h-8 rounded-full inline-flex items-center gap-2 transition-colors ".concat((pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/feed")) ? "bg-fuchsia-50 text-fuchsia-600" : "text-foreground/90 hover:bg-fuchsia-50 hover:text-fuchsia-600"),
                            "aria-current": (pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/feed")) ? "page" : undefined,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/brain.png",
                                    alt: "AI assistant icon",
                                    width: 16,
                                    height: 16,
                                    className: "h-4 w-4 object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/app/ui/Header.tsx",
                                    lineNumber: 234,
                                    columnNumber: 13
                                }, this),
                                "AI Assistant"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/ui/Header.tsx",
                            lineNumber: 225,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/map",
                            className: "whitespace-nowrap px-3 h-8 rounded-full inline-flex items-center gap-2 transition-colors ".concat((pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/map")) ? "bg-fuchsia-50 text-fuchsia-600" : "text-foreground/90 hover:bg-fuchsia-50 hover:text-fuchsia-600"),
                            "aria-current": (pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/map")) ? "page" : undefined,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/gps.png",
                                    alt: "Food map icon",
                                    width: 16,
                                    height: 16,
                                    className: "h-4 w-4 object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/app/ui/Header.tsx",
                                    lineNumber: 252,
                                    columnNumber: 13
                                }, this),
                                "Food Map"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/ui/Header.tsx",
                            lineNumber: 243,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/community",
                            className: "whitespace-nowrap px-3 h-8 rounded-full inline-flex items-center gap-2 transition-colors ".concat((pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/community")) ? "bg-fuchsia-50 text-fuchsia-600" : "text-foreground/90 hover:bg-fuchsia-50 hover:text-fuchsia-600"),
                            "aria-current": (pathname === null || pathname === void 0 ? void 0 : pathname.startsWith("/community")) ? "page" : undefined,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/social.png",
                                    alt: "Community icon",
                                    width: 16,
                                    height: 16,
                                    className: "h-4 w-4 object-contain"
                                }, void 0, false, {
                                    fileName: "[project]/app/ui/Header.tsx",
                                    lineNumber: 270,
                                    columnNumber: 13
                                }, this),
                                "Community"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/ui/Header.tsx",
                            lineNumber: 261,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/ui/Header.tsx",
                    lineNumber: 206,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 relative",
                    ref: menuRef,
                    children: loadingUser ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: "Loading..."
                    }, void 0, false, {
                        fileName: "[project]/app/ui/Header.tsx",
                        lineNumber: 282,
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
                                        lineNumber: 292,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium",
                                        children: (firstName || user.email || "?").slice(0, 1).toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/app/ui/Header.tsx",
                                        lineNumber: 300,
                                        columnNumber: 19
                                    }, this),
                                    firstName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium hidden sm:inline",
                                        children: firstName
                                    }, void 0, false, {
                                        fileName: "[project]/app/ui/Header.tsx",
                                        lineNumber: 304,
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
                                            lineNumber: 306,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/ui/Header.tsx",
                                        lineNumber: 305,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/ui/Header.tsx",
                                lineNumber: 285,
                                columnNumber: 15
                            }, this),
                            menuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                role: "menu",
                                className: "absolute right-0 top-[calc(100%+8px)] w-48 rounded-md border border-border/60 bg-background shadow-md p-1 text-sm z-50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/profile/edit",
                                        className: "block px-3 py-2 rounded hover:bg-muted",
                                        role: "menuitem",
                                        onClick: ()=>setMenuOpen(false),
                                        children: "Edit Profile"
                                    }, void 0, false, {
                                        fileName: "[project]/app/ui/Header.tsx",
                                        lineNumber: 314,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-3 py-2 rounded hover:bg-muted flex items-center justify-between gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium",
                                                        children: "Dark Mode"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/ui/Header.tsx",
                                                        lineNumber: 319,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-muted",
                                                        children: theme === "dark" ? "On" : "Off"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/ui/Header.tsx",
                                                        lineNumber: 320,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/ui/Header.tsx",
                                                lineNumber: 318,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                role: "switch",
                                                "aria-checked": theme === "dark",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    toggleTheme();
                                                },
                                                className: "w-12 h-6 rounded-full transition-colors relative ".concat(theme === "dark" ? "bg-fuchsia-500" : "bg-gray-300"),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "absolute top-[3px] left-[3px] h-4 w-4 rounded-full bg-white shadow transition-transform ".concat(theme === "dark" ? "translate-x-6" : "translate-x-0")
                                                }, void 0, false, {
                                                    fileName: "[project]/app/ui/Header.tsx",
                                                    lineNumber: 335,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/ui/Header.tsx",
                                                lineNumber: 322,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/ui/Header.tsx",
                                        lineNumber: 317,
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
                                        lineNumber: 342,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/ui/Header.tsx",
                                lineNumber: 310,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/ui/Header.tsx",
                        lineNumber: 284,
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
                                                lineNumber: 352,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M20 20l-3.5-3.5",
                                                stroke: "currentColor",
                                                strokeWidth: "1.5",
                                                strokeLinecap: "round"
                                            }, void 0, false, {
                                                fileName: "[project]/app/ui/Header.tsx",
                                                lineNumber: 353,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/ui/Header.tsx",
                                        lineNumber: 351,
                                        columnNumber: 17
                                    }, this),
                                    "Find Places"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/ui/Header.tsx",
                                lineNumber: 350,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/auth/login",
                                className: "h-9 px-4 rounded-md text-white inline-flex items-center bg-gradient-to-r from-fuchsia-500 to-violet-600 hover:opacity-95",
                                children: "Get Started"
                            }, void 0, false, {
                                fileName: "[project]/app/ui/Header.tsx",
                                lineNumber: 357,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                }, void 0, false, {
                    fileName: "[project]/app/ui/Header.tsx",
                    lineNumber: 280,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/ui/Header.tsx",
            lineNumber: 194,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/ui/Header.tsx",
        lineNumber: 189,
        columnNumber: 5
    }, this);
}
_s(Header, "SAXI7RyCe4OKBwCdRVJPg8g6TzM=", false, function() {
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
"[project]/app/ui/AuthErrorHandler.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthErrorHandler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/browserClient.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function AuthErrorHandler() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthErrorHandler.useEffect": ()=>{
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
            // Set up auth state change listener
            const { data: { subscription } } = supabase.auth.onAuthStateChange({
                "AuthErrorHandler.useEffect": async (event, session)=>{
                    // When session is cleared due to invalid refresh token,
                    // the app will handle it through the auth state change
                    if (event === "SIGNED_OUT" && !session) {
                    // Session was cleared - this is expected when refresh token is invalid
                    }
                }
            }["AuthErrorHandler.useEffect"]);
            // Suppress specific refresh token errors in console
            // These are expected when sessions expire
            if ("TURBOPACK compile-time truthy", 1) {
                const originalError = console.error;
                const errorFilter = {
                    "AuthErrorHandler.useEffect.errorFilter": (message)=>{
                        return message.includes("Invalid Refresh Token") || message.includes("Refresh Token Not Found") || message.includes("AuthApiError") && message.includes("refresh");
                    }
                }["AuthErrorHandler.useEffect.errorFilter"];
                // Override console.error to filter refresh token errors
                console.error = ({
                    "AuthErrorHandler.useEffect": function() {
                        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                            args[_key] = arguments[_key];
                        }
                        const firstArg = args[0];
                        const message = typeof firstArg === "string" ? firstArg : (firstArg === null || firstArg === void 0 ? void 0 : firstArg.message) || (firstArg === null || firstArg === void 0 ? void 0 : firstArg.toString()) || "";
                        // Skip logging expected refresh token errors
                        if (errorFilter(message)) {
                            return;
                        }
                        // Log all other errors normally
                        originalError.apply(console, args);
                    }
                })["AuthErrorHandler.useEffect"];
                return ({
                    "AuthErrorHandler.useEffect": ()=>{
                        subscription.unsubscribe();
                        console.error = originalError;
                    }
                })["AuthErrorHandler.useEffect"];
            }
            //TURBOPACK unreachable
            ;
        }
    }["AuthErrorHandler.useEffect"], []);
    return null;
}
_s(AuthErrorHandler, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = AuthErrorHandler;
var _c;
__turbopack_context__.k.register(_c, "AuthErrorHandler");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_456437ca._.js.map