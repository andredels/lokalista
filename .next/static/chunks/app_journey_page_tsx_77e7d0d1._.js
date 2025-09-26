(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/journey/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>JourneyPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/browserClient.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function JourneyPage() {
    _s();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "JourneyPage.useMemo[supabase]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])()
    }["JourneyPage.useMemo[supabase]"], []);
    const [userId, setUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [expandedPostIds, setExpandedPostIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [commentsByPost, setCommentsByPost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [newCommentContent, setNewCommentContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "JourneyPage.useEffect": ()=>{
            let mounted = true;
            ({
                "JourneyPage.useEffect": async ()=>{
                    var _data_user;
                    const { data } = await supabase.auth.getUser();
                    if (!mounted) return;
                    var _data_user_id;
                    setUserId((_data_user_id = (_data_user = data.user) === null || _data_user === void 0 ? void 0 : _data_user.id) !== null && _data_user_id !== void 0 ? _data_user_id : null);
                    await loadPosts();
                    setLoading(false);
                }
            })["JourneyPage.useEffect"]();
            const { data: sub } = supabase.auth.onAuthStateChange({
                "JourneyPage.useEffect": (_e, session)=>{
                    var _session_user;
                    var _session_user_id;
                    setUserId((_session_user_id = session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.id) !== null && _session_user_id !== void 0 ? _session_user_id : null);
                }
            }["JourneyPage.useEffect"]);
            return ({
                "JourneyPage.useEffect": ()=>{
                    mounted = false;
                    sub.subscription.unsubscribe();
                }
            })["JourneyPage.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["JourneyPage.useEffect"], []);
    async function loadPosts() {
        // Note: This assumes you have tables: posts, likes, comments, profiles
        // with RLS allowing read for anon and write for auth users.
        const { data, error } = await supabase.from("posts").select("id, user_id, content, created_at, profiles:profiles!posts_user_id_fkey(id, full_name),\n         likes_count:likes(count), comments_count:comments(count)").order("created_at", {
            ascending: false
        });
        if (error) {
            console.error(error);
            return;
        }
        const normalized = data.map((row)=>{
            var _row_likes_count_, _row_comments_count_;
            var _row_likes_count__count, _row_likes_count, _row_comments_count__count, _row_comments_count;
            return {
                ...row,
                likes_count: Array.isArray(row.likes_count) ? (_row_likes_count__count = (_row_likes_count_ = row.likes_count[0]) === null || _row_likes_count_ === void 0 ? void 0 : _row_likes_count_.count) !== null && _row_likes_count__count !== void 0 ? _row_likes_count__count : 0 : (_row_likes_count = row.likes_count) !== null && _row_likes_count !== void 0 ? _row_likes_count : 0,
                comments_count: Array.isArray(row.comments_count) ? (_row_comments_count__count = (_row_comments_count_ = row.comments_count[0]) === null || _row_comments_count_ === void 0 ? void 0 : _row_comments_count_.count) !== null && _row_comments_count__count !== void 0 ? _row_comments_count__count : 0 : (_row_comments_count = row.comments_count) !== null && _row_comments_count !== void 0 ? _row_comments_count : 0,
                liked_by_me: false
            };
        });
        // Mark liked_by_me for current user
        if (userId && normalized.length) {
            const postIds = normalized.map((p)=>p.id);
            const { data: myLikes, error: likesErr } = await supabase.from("likes").select("post_id").eq("user_id", userId).in("post_id", postIds);
            if (!likesErr && myLikes) {
                const likedSet = new Set(myLikes.map((l)=>l.post_id));
                for (const p of normalized)p.liked_by_me = likedSet.has(p.id);
            }
        }
        setPosts(normalized);
    }
    async function submitPost(e) {
        e.preventDefault();
        if (!userId) {
            window.location.href = "/auth/login?next=/journey";
            return;
        }
        if (!content.trim()) return;
        setSubmitting(true);
        const { error } = await supabase.from("posts").insert({
            content
        });
        setSubmitting(false);
        if (error) {
            alert(error.message);
            return;
        }
        setContent("");
        await loadPosts();
    }
    async function toggleLike(post) {
        if (!userId) {
            window.location.href = "/auth/login?next=/journey";
            return;
        }
        if (post.liked_by_me) {
            const { error } = await supabase.from("likes").delete().match({
                post_id: post.id,
                user_id: userId
            });
            if (error) return alert(error.message);
        } else {
            const { error } = await supabase.from("likes").insert({
                post_id: post.id,
                user_id: userId
            });
            if (error) return alert(error.message);
        }
        await loadPosts();
    }
    async function loadComments(postId) {
        const { data, error } = await supabase.from("comments").select("id, post_id, user_id, content, created_at, profiles:profiles!comments_user_id_fkey(id, full_name)").eq("post_id", postId).order("created_at", {
            ascending: true
        });
        if (error) return alert(error.message);
        setCommentsByPost((prev)=>({
                ...prev,
                [postId]: data || []
            }));
    }
    async function submitComment(postId) {
        if (!userId) {
            window.location.href = "/auth/login?next=/journey";
            return;
        }
        const text = (newCommentContent[postId] || "").trim();
        if (!text) return;
        const { error } = await supabase.from("comments").insert({
            post_id: postId,
            content: text,
            user_id: userId
        });
        if (error) return alert(error.message);
        setNewCommentContent((p)=>({
                ...p,
                [postId]: ""
            }));
        await loadComments(postId);
        await loadPosts();
    }
    function toggleExpanded(postId) {
        setExpandedPostIds((prev)=>{
            const next = new Set(prev);
            if (next.has(postId)) next.delete(postId);
            else next.add(postId);
            return next;
        });
        if (!commentsByPost[postId]) void loadComments(postId);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container max-w-2xl py-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-2xl font-semibold mb-4",
                    children: "Community"
                }, void 0, false, {
                    fileName: "[project]/app/journey/page.tsx",
                    lineNumber: 171,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: submitPost,
                    className: "bg-white border border-gray-200 rounded-xl p-4 mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            value: content,
                            onChange: (e)=>setContent(e.target.value),
                            placeholder: userId ? "Share something with the community..." : "Sign in to post",
                            className: "w-full resize-none outline-none min-h-[90px]",
                            disabled: !userId || submitting
                        }, void 0, false, {
                            fileName: "[project]/app/journey/page.tsx",
                            lineNumber: 175,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mt-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-gray-500",
                                    children: [
                                        content.length,
                                        "/280"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/journey/page.tsx",
                                    lineNumber: 183,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: !userId || submitting || !content.trim() || content.length > 280,
                                    className: "px-4 h-9 rounded-full bg-[#8c52ff] text-white disabled:opacity-50",
                                    children: submitting ? "Posting..." : "Post"
                                }, void 0, false, {
                                    fileName: "[project]/app/journey/page.tsx",
                                    lineNumber: 184,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/journey/page.tsx",
                            lineNumber: 182,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/journey/page.tsx",
                    lineNumber: 174,
                    columnNumber: 9
                }, this),
                loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center text-gray-500",
                    children: "Loading…"
                }, void 0, false, {
                    fileName: "[project]/app/journey/page.tsx",
                    lineNumber: 196,
                    columnNumber: 11
                }, this) : posts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center text-gray-500",
                    children: "No posts yet. Be the first!"
                }, void 0, false, {
                    fileName: "[project]/app/journey/page.tsx",
                    lineNumber: 198,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "space-y-3",
                    children: posts.map((post)=>{
                        var _post_profiles, _post_profiles1;
                        var _post_likes_count, _post_comments_count;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "bg-white border border-gray-200 rounded-xl p-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium",
                                        children: (((_post_profiles = post.profiles) === null || _post_profiles === void 0 ? void 0 : _post_profiles.full_name) || post.user_id || "?").slice(0, 1).toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/app/journey/page.tsx",
                                        lineNumber: 204,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 text-sm text-gray-600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium text-gray-900",
                                                        children: ((_post_profiles1 = post.profiles) === null || _post_profiles1 === void 0 ? void 0 : _post_profiles1.full_name) || "Anonymous"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/journey/page.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "·"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/journey/page.tsx",
                                                        lineNumber: 210,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                                        dateTime: post.created_at,
                                                        children: new Date(post.created_at).toLocaleString()
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/journey/page.tsx",
                                                        lineNumber: 211,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/journey/page.tsx",
                                                lineNumber: 208,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 whitespace-pre-wrap break-words",
                                                children: post.content
                                            }, void 0, false, {
                                                fileName: "[project]/app/journey/page.tsx",
                                                lineNumber: 213,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 flex items-center gap-4 text-sm text-gray-600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>toggleLike(post),
                                                        className: "inline-flex items-center gap-1 ".concat(post.liked_by_me ? "text-fuchsia-600" : "hover:text-gray-900"),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                width: "16",
                                                                height: "16",
                                                                viewBox: "0 0 24 24",
                                                                fill: "none",
                                                                "aria-hidden": true,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M12 21s-7-4.5-7-10a7 7 0 0114 0c0 5.5-7 10-7 10z",
                                                                    stroke: "currentColor",
                                                                    strokeWidth: "1.6"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/journey/page.tsx",
                                                                    lineNumber: 217,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/journey/page.tsx",
                                                                lineNumber: 216,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: (_post_likes_count = post.likes_count) !== null && _post_likes_count !== void 0 ? _post_likes_count : 0
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/journey/page.tsx",
                                                                lineNumber: 219,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/journey/page.tsx",
                                                        lineNumber: 215,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>toggleExpanded(post.id),
                                                        className: "inline-flex items-center gap-1 hover:text-gray-900",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                width: "16",
                                                                height: "16",
                                                                viewBox: "0 0 24 24",
                                                                fill: "none",
                                                                "aria-hidden": true,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M21 15a2 2 0 01-2 2H8l-4 4V5a2 2 0 012-2h13a2 2 0 012 2v10z",
                                                                    stroke: "currentColor",
                                                                    strokeWidth: "1.6"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/journey/page.tsx",
                                                                    lineNumber: 223,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/journey/page.tsx",
                                                                lineNumber: 222,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: (_post_comments_count = post.comments_count) !== null && _post_comments_count !== void 0 ? _post_comments_count : 0
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/journey/page.tsx",
                                                                lineNumber: 225,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/journey/page.tsx",
                                                        lineNumber: 221,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/journey/page.tsx",
                                                lineNumber: 214,
                                                columnNumber: 21
                                            }, this),
                                            expandedPostIds.has(post.id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 border-t border-gray-200 pt-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-3",
                                                        children: (commentsByPost[post.id] || []).map((c)=>{
                                                            var _c_profiles, _c_profiles1;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-start gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium",
                                                                        children: (((_c_profiles = c.profiles) === null || _c_profiles === void 0 ? void 0 : _c_profiles.full_name) || c.user_id || "?").slice(0, 1).toUpperCase()
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/journey/page.tsx",
                                                                        lineNumber: 234,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center gap-2 text-xs text-gray-600",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "font-medium text-gray-900",
                                                                                        children: ((_c_profiles1 = c.profiles) === null || _c_profiles1 === void 0 ? void 0 : _c_profiles1.full_name) || "Anonymous"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/journey/page.tsx",
                                                                                        lineNumber: 239,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        children: "·"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/journey/page.tsx",
                                                                                        lineNumber: 240,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                                                                        dateTime: c.created_at,
                                                                                        children: new Date(c.created_at).toLocaleString()
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/journey/page.tsx",
                                                                                        lineNumber: 241,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/journey/page.tsx",
                                                                                lineNumber: 238,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "mt-1 whitespace-pre-wrap break-words text-sm",
                                                                                children: c.content
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/journey/page.tsx",
                                                                                lineNumber: 243,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/journey/page.tsx",
                                                                        lineNumber: 237,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, c.id, true, {
                                                                fileName: "[project]/app/journey/page.tsx",
                                                                lineNumber: 233,
                                                                columnNumber: 29
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/journey/page.tsx",
                                                        lineNumber: 231,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-3 flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                placeholder: userId ? "Write a comment…" : "Sign in to comment",
                                                                value: newCommentContent[post.id] || "",
                                                                onChange: (e)=>setNewCommentContent((p)=>({
                                                                            ...p,
                                                                            [post.id]: e.target.value
                                                                        })),
                                                                className: "flex-1 h-9 px-3 rounded-md border border-gray-300",
                                                                disabled: !userId
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/journey/page.tsx",
                                                                lineNumber: 250,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>submitComment(post.id),
                                                                disabled: !userId || !(newCommentContent[post.id] || "").trim(),
                                                                className: "px-3 h-9 rounded-md bg-gray-900 text-white disabled:opacity-50",
                                                                children: "Post"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/journey/page.tsx",
                                                                lineNumber: 258,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/journey/page.tsx",
                                                        lineNumber: 249,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/journey/page.tsx",
                                                lineNumber: 230,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/journey/page.tsx",
                                        lineNumber: 207,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/journey/page.tsx",
                                lineNumber: 203,
                                columnNumber: 17
                            }, this)
                        }, post.id, false, {
                            fileName: "[project]/app/journey/page.tsx",
                            lineNumber: 202,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/app/journey/page.tsx",
                    lineNumber: 200,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/journey/page.tsx",
            lineNumber: 170,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/journey/page.tsx",
        lineNumber: 169,
        columnNumber: 5
    }, this);
}
_s(JourneyPage, "xbHD5b6jDUol45jaI7j3OkzRvo4=");
_c = JourneyPage;
var _c;
__turbopack_context__.k.register(_c, "JourneyPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_journey_page_tsx_77e7d0d1._.js.map