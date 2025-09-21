(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/auth/signup/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SignupPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/browserClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function SignupPage() {
    _s();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [confirmPassword, setConfirmPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [fullName, setFullName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [country, setCountry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [city, setCity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Check if user is already logged in
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SignupPage.useEffect": ()=>{
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
            const checkSession = {
                "SignupPage.useEffect.checkSession": async ()=>{
                    try {
                        const { data, error } = await supabase.auth.getSession();
                        if (error) {
                            console.error('Error getting session:', error);
                            setLoading(false);
                            return;
                        }
                        if (data === null || data === void 0 ? void 0 : data.session) {
                            router.push("/dashboard");
                        } else {
                            setLoading(false);
                        }
                    } catch (err) {
                        console.error('Error in checkSession:', err);
                        setLoading(false);
                    }
                }
            }["SignupPage.useEffect.checkSession"];
            checkSession();
            const { data: { subscription } } = supabase.auth.onAuthStateChange({
                "SignupPage.useEffect": (_event, session)=>{
                    if (session) {
                        router.push("/dashboard");
                    } else {
                        setLoading(false);
                    }
                }
            }["SignupPage.useEffect"]);
            return ({
                "SignupPage.useEffect": ()=>subscription.unsubscribe()
            })["SignupPage.useEffect"];
        }
    }["SignupPage.useEffect"], [
        router
    ]);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            style: {
                backgroundColor: "#eadbfd"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-8 w-8 border-b-2 border-[#8c52ff] mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/app/auth/signup/page.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "Loading..."
                    }, void 0, false, {
                        fileName: "[project]/app/auth/signup/page.tsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/auth/signup/page.tsx",
                lineNumber: 61,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/auth/signup/page.tsx",
            lineNumber: 60,
            columnNumber: 7
        }, this);
    }
    function isEmail(v) {
        return /.+@.+\..+/.test(v);
    }
    async function onSubmit() {
        const e = {};
        if (!fullName.trim()) e.fullName = "Enter your full name.";
        if (!isEmail(email)) e.email = "Enter a valid email.";
        if (password.length < 6) e.password = "Password must be 6+ characters.";
        if (password !== confirmPassword) e.confirmPassword = "Passwords do not match.";
        if (!country.trim()) e.country = "Enter your country.";
        if (!city.trim()) e.city = "Enter your city.";
        setErrors(e);
        if (Object.keys(e).length !== 0) return;
        setSubmitting(true);
        setMessage(null);
        try {
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: "".concat(("TURBOPACK compile-time value", "http://localhost:3000") || "http://localhost:3000", "/auth/login"),
                    data: {
                        full_name: fullName,
                        country: country,
                        city: city
                    }
                }
            });
            if (error) {
                setMessage(error.message);
                return;
            }
            setMessage("Check your email to confirm your account, then sign in.");
            setTimeout(()=>router.push("/auth/login"), 1200);
        } finally{
            setSubmitting(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen",
        style: {
            backgroundColor: "#eadbfd"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container py-12",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-[70dvh] flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 md:p-7 rounded-xl border border-border/60 bg-background shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center mb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "inline-flex items-center gap-2 mb-4",
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
                                                                fileName: "[project]/app/auth/signup/page.tsx",
                                                                lineNumber: 121,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "12",
                                                                cy: "11",
                                                                r: "2",
                                                                fill: "currentColor"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/auth/signup/page.tsx",
                                                                lineNumber: 122,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/auth/signup/page.tsx",
                                                        lineNumber: 120,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/signup/page.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-lg font-semibold bg-gradient-to-r from-fuchsia-500 to-violet-600 bg-clip-text text-transparent",
                                                    children: "Lokalista"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/signup/page.tsx",
                                                    lineNumber: 125,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/auth/signup/page.tsx",
                                            lineNumber: 118,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "h1 mb-2",
                                            children: "Join Lokalista"
                                        }, void 0, false, {
                                            fileName: "[project]/app/auth/signup/page.tsx",
                                            lineNumber: 127,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-muted",
                                            children: "Create your account to discover amazing places in your city."
                                        }, void 0, false, {
                                            fileName: "[project]/app/auth/signup/page.tsx",
                                            lineNumber: 128,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/auth/signup/page.tsx",
                                    lineNumber: 117,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-sm font-medium",
                                                    htmlFor: "fullName",
                                                    children: "Full Name"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/signup/page.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "fullName",
                                                    value: fullName,
                                                    onChange: (e)=>setFullName(e.target.value),
                                                    placeholder: "John Doe",
                                                    className: "h-11 px-3 rounded-md border border-border/60 focus-ring w-full"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/signup/page.tsx",
                                                    lineNumber: 134,
                                                    columnNumber: 19
                                                }, this),
                                                errors.fullName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-red-600",
                                                    children: errors.fullName
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/signup/page.tsx",
                                                    lineNumber: 135,
                                                    columnNumber: 39
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/auth/signup/page.tsx",
                                            lineNumber: 132,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-sm font-medium",
                                                    htmlFor: "email",
                                                    children: "Email"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/signup/page.tsx",
                                                    lineNumber: 139,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "email",
                                                    value: email,
                                                    onChange: (e)=>setEmail(e.target.value),
                                                    placeholder: "you@example.com",
                                                    className: "h-11 px-3 rounded-md border border-border/60 focus-ring w-full"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/signup/page.tsx",
                                                    lineNumber: 140,
                                                    columnNumber: 19
                                                }, this),
                                                errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-red-600",
                                                    children: errors.email
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/signup/page.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 36
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/auth/signup/page.tsx",
                                            lineNumber: 138,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-sm font-medium",
                                                    htmlFor: "password",
                                                    children: "Password"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/signup/page.tsx",
                                                    lineNumber: 145,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "password",
                                                    value: password,
                                                    onChange: (e)=>setPassword(e.target.value),
                                                    placeholder: "Create password",
                                                    type: "password",
                                                    className: "h-11 px-3 rounded-md border border-border/60 focus-ring w-full"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/signup/page.tsx",
                                                    lineNumber: 146,
                                                    columnNumber: 19
                                                }, this),
                                                errors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-red-600",
                                                    children: errors.password
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/signup/page.tsx",
                                                    lineNumber: 147,
                                                    columnNumber: 39
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/auth/signup/page.tsx",
                                            lineNumber: 144,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-sm font-medium",
                                                    htmlFor: "confirmPassword",
                                                    children: "Confirm Password"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/signup/page.tsx",
                                                    lineNumber: 151,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "confirmPassword",
                                                    value: confirmPassword,
                                                    onChange: (e)=>setConfirmPassword(e.target.value),
                                                    placeholder: "Confirm password",
                                                    type: "password",
                                                    className: "h-11 px-3 rounded-md border border-border/60 focus-ring w-full"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/signup/page.tsx",
                                                    lineNumber: 152,
                                                    columnNumber: 19
                                                }, this),
                                                errors.confirmPassword && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-red-600",
                                                    children: errors.confirmPassword
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/signup/page.tsx",
                                                    lineNumber: 153,
                                                    columnNumber: 46
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/auth/signup/page.tsx",
                                            lineNumber: 150,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-sm font-medium",
                                                    htmlFor: "country",
                                                    children: "Country"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/signup/page.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "country",
                                                    value: country,
                                                    onChange: (e)=>setCountry(e.target.value),
                                                    placeholder: "United States",
                                                    className: "h-11 px-3 rounded-md border border-border/60 focus-ring w-full"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/signup/page.tsx",
                                                    lineNumber: 158,
                                                    columnNumber: 19
                                                }, this),
                                                errors.country && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-red-600",
                                                    children: errors.country
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/signup/page.tsx",
                                                    lineNumber: 159,
                                                    columnNumber: 38
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/auth/signup/page.tsx",
                                            lineNumber: 156,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-sm font-medium",
                                                    htmlFor: "city",
                                                    children: "City"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/signup/page.tsx",
                                                    lineNumber: 163,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "city",
                                                    value: city,
                                                    onChange: (e)=>setCity(e.target.value),
                                                    placeholder: "New York, NY",
                                                    className: "h-11 px-3 rounded-md border border-border/60 focus-ring w-full"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/signup/page.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 19
                                                }, this),
                                                errors.city && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-red-600",
                                                    children: errors.city
                                                }, void 0, false, {
                                                    fileName: "[project]/app/auth/signup/page.tsx",
                                                    lineNumber: 165,
                                                    columnNumber: 35
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/auth/signup/page.tsx",
                                            lineNumber: 162,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/auth/signup/page.tsx",
                                    lineNumber: 131,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onSubmit,
                                    disabled: submitting,
                                    className: "mt-6 w-full h-11 rounded-md bg-[#8c52ff] text-white hover:opacity-90 disabled:opacity-60",
                                    children: submitting ? "Creating account…" : "Create account"
                                }, void 0, false, {
                                    fileName: "[project]/app/auth/signup/page.tsx",
                                    lineNumber: 169,
                                    columnNumber: 15
                                }, this),
                                message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 text-sm text-center",
                                    children: message
                                }, void 0, false, {
                                    fileName: "[project]/app/auth/signup/page.tsx",
                                    lineNumber: 173,
                                    columnNumber: 27
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-5 text-sm text-center",
                                    children: [
                                        "Already have an account? ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "/auth/login",
                                            className: "underline underline-offset-4 text-[#8c52ff]",
                                            children: "Log in"
                                        }, void 0, false, {
                                            fileName: "[project]/app/auth/signup/page.tsx",
                                            lineNumber: 175,
                                            columnNumber: 42
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/auth/signup/page.tsx",
                                    lineNumber: 174,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/auth/signup/page.tsx",
                            lineNumber: 116,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 text-sm text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/",
                                className: "underline underline-offset-4",
                                children: "Back to home"
                            }, void 0, false, {
                                fileName: "[project]/app/auth/signup/page.tsx",
                                lineNumber: 179,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/auth/signup/page.tsx",
                            lineNumber: 178,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/auth/signup/page.tsx",
                    lineNumber: 115,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/auth/signup/page.tsx",
                lineNumber: 114,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/auth/signup/page.tsx",
            lineNumber: 113,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/auth/signup/page.tsx",
        lineNumber: 112,
        columnNumber: 5
    }, this);
}
_s(SignupPage, "ouAyfUHptn+f4X9WyMfOuOoxIwI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = SignupPage;
var _c;
__turbopack_context__.k.register(_c, "SignupPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_auth_signup_page_tsx_cdc2a309._.js.map