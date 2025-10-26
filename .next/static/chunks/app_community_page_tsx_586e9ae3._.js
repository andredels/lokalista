(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/community/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CommunityPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/browserClient.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function CommunityPage() {
    _s();
    const supabaseUrl = ("TURBOPACK compile-time value", "https://yrqtlbuuhxrghoorjwyo.supabase.co") || "";
    const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycXRsYnV1aHhyZ2hvb3Jqd3lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjY5NjcsImV4cCI6MjA3MzQ0Mjk2N30.PYfMtnwbuHUpEfEDUgzsAE6hnsJHt2q3qMOt8xC9DQ8") || "";
    const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl !== "https://placeholder.supabase.co";
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CommunityPage.useMemo[supabase]": ()=>("TURBOPACK compile-time truthy", 1) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])() : "TURBOPACK unreachable"
    }["CommunityPage.useMemo[supabase]"], [
        isSupabaseConfigured
    ]);
    const [userId, setUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedPost, setSelectedPost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [imageFile, setImageFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [imagePreview, setImagePreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CommunityPage.useEffect": ()=>{
            if (!supabase || !isSupabaseConfigured) {
                setLoading(false);
                return;
            }
            let mounted = true;
            ({
                "CommunityPage.useEffect": async ()=>{
                    try {
                        var _data_user;
                        const { data } = await supabase.auth.getUser();
                        if (!mounted) return;
                        var _data_user_id;
                        const uid = (_data_user_id = (_data_user = data.user) === null || _data_user === void 0 ? void 0 : _data_user.id) !== null && _data_user_id !== void 0 ? _data_user_id : null;
                        setUserId(uid);
                        await loadPosts(uid);
                    } catch (error) {
                        console.error('Error loading user data:', error);
                    } finally{
                        if (mounted) {
                            setLoading(false);
                        }
                    }
                }
            })["CommunityPage.useEffect"]();
            const { data: sub } = supabase.auth.onAuthStateChange({
                "CommunityPage.useEffect": async (_e, session)=>{
                    var _session_user;
                    var _session_user_id;
                    const uid = (_session_user_id = session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.id) !== null && _session_user_id !== void 0 ? _session_user_id : null;
                    setUserId(uid);
                    await loadPosts(uid);
                }
            }["CommunityPage.useEffect"]);
            return ({
                "CommunityPage.useEffect": ()=>{
                    mounted = false;
                    sub.subscription.unsubscribe();
                }
            })["CommunityPage.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["CommunityPage.useEffect"], [
        isSupabaseConfigured
    ]);
    async function loadPosts() {
        let currentUserId = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : userId;
        if (!supabase || !isSupabaseConfigured) {
            return;
        }
        const { data, error } = await supabase.from("posts").select("id, user_id, content, image_url, created_at, profiles:profiles!posts_user_id_fkey(id, first_name, last_name),\n         likes_count:likes(count), comments_count:comments(count)").order("created_at", {
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
        if (currentUserId && normalized.length) {
            const postIds = normalized.map((p)=>p.id);
            const { data: myLikes, error: likesErr } = await supabase.from("likes").select("post_id").eq("user_id", currentUserId).in("post_id", postIds);
            if (!likesErr && myLikes) {
                const likedSet = new Set(myLikes.map((l)=>l.post_id));
                for (const p of normalized)p.liked_by_me = likedSet.has(p.id);
            }
        }
        setPosts(normalized);
    }
    async function submitPost(e) {
        e.preventDefault();
        if (!supabase || !isSupabaseConfigured) {
            alert("Supabase is not configured. Please set environment variables.");
            return;
        }
        if (!userId) {
            window.location.href = "/auth/login?next=/community";
            return;
        }
        if (!content.trim()) return;
        setSubmitting(true);
        let imageUrl = null;
        try {
            if (imageFile) {
                var _imageFile_name_split_pop;
                const ext = ((_imageFile_name_split_pop = imageFile.name.split(".").pop()) === null || _imageFile_name_split_pop === void 0 ? void 0 : _imageFile_name_split_pop.toLowerCase()) || "jpg";
                const path = "".concat(userId, "/").concat(Date.now(), "-").concat(Math.random().toString(36).slice(2), ".").concat(ext);
                const { error: upErr } = await supabase.storage.from("post-images").upload(path, imageFile, {
                    cacheControl: "3600",
                    upsert: false,
                    contentType: imageFile.type || "image/jpeg"
                });
                if (upErr) throw upErr;
                const { data: pub } = supabase.storage.from("post-images").getPublicUrl(path);
                imageUrl = pub.publicUrl;
            }
            const { error } = await supabase.from("posts").insert({
                content,
                image_url: imageUrl
            });
            if (error) throw error;
            setContent("");
            setImageFile(null);
            setImagePreview(null);
            await loadPosts();
        } catch (err) {
            alert((err === null || err === void 0 ? void 0 : err.message) || "Failed to post.");
        } finally{
            setSubmitting(false);
        }
    }
    async function toggleLike(post) {
        if (!supabase || !isSupabaseConfigured) {
            alert("Supabase is not configured. Please set environment variables.");
            return;
        }
        if (!userId) {
            window.location.href = "/auth/login?next=/community";
            return;
        }
        if (post.liked_by_me) {
            const { error } = await supabase.from("likes").delete().match({
                post_id: post.id,
                user_id: userId
            });
            if (error) return alert(error.message);
        } else {
            // Upsert to avoid duplicate key conflicts on refresh/race conditions
            const { error } = await supabase.from("likes").upsert({
                post_id: post.id,
                user_id: userId
            }, {
                onConflict: "post_id,user_id"
            });
            if (error) return alert(error.message);
        }
        await loadPosts(userId);
    }
    async function handleComment(postId, content) {
        if (!supabase || !isSupabaseConfigured) {
            alert("Supabase is not configured. Please set environment variables.");
            return;
        }
        if (!userId) {
            window.location.href = "/auth/login?next=/community";
            return;
        }
        const { error } = await supabase.from("comments").insert({
            post_id: postId,
            content,
            user_id: userId
        });
        if (error) throw new Error(error.message);
        await loadPosts();
    }
    function openModal(post) {
        setSelectedPost(post);
        setIsModalOpen(true);
    }
    function closeModal() {
        setIsModalOpen(false);
        setSelectedPost(null);
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
                    fileName: "[project]/app/community/page.tsx",
                    lineNumber: 215,
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
                            fileName: "[project]/app/community/page.tsx",
                            lineNumber: 219,
                            columnNumber: 11
                        }, this),
                        imagePreview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: imagePreview,
                                alt: "Selected",
                                className: "max-h-64 rounded-lg border"
                            }, void 0, false, {
                                fileName: "[project]/app/community/page.tsx",
                                lineNumber: 228,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/community/page.tsx",
                            lineNumber: 227,
                            columnNumber: 13
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
                                    fileName: "[project]/app/community/page.tsx",
                                    lineNumber: 232,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: !userId || submitting || !content.trim() || content.length > 280,
                                    className: "px-4 h-9 rounded-full bg-[#8c52ff] text-white disabled:opacity-50",
                                    children: submitting ? "Posting..." : "Post"
                                }, void 0, false, {
                                    fileName: "[project]/app/community/page.tsx",
                                    lineNumber: 233,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/community/page.tsx",
                            lineNumber: 231,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "file",
                                        accept: "image/*",
                                        className: "hidden",
                                        disabled: !userId || submitting,
                                        onChange: (e)=>{
                                            var _e_target_files;
                                            const file = ((_e_target_files = e.target.files) === null || _e_target_files === void 0 ? void 0 : _e_target_files[0]) || null;
                                            setImageFile(file);
                                            setImagePreview(file ? URL.createObjectURL(file) : null);
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/community/page.tsx",
                                        lineNumber: 243,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "px-3 h-9 inline-flex items-center rounded-md border border-gray-300 hover:bg-gray-50",
                                        children: "Add image"
                                    }, void 0, false, {
                                        fileName: "[project]/app/community/page.tsx",
                                        lineNumber: 254,
                                        columnNumber: 15
                                    }, this),
                                    imageFile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-gray-500",
                                        children: imageFile.name
                                    }, void 0, false, {
                                        fileName: "[project]/app/community/page.tsx",
                                        lineNumber: 255,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/community/page.tsx",
                                lineNumber: 242,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/community/page.tsx",
                            lineNumber: 241,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/community/page.tsx",
                    lineNumber: 218,
                    columnNumber: 9
                }, this),
                loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center text-gray-500",
                    children: "Loading…"
                }, void 0, false, {
                    fileName: "[project]/app/community/page.tsx",
                    lineNumber: 262,
                    columnNumber: 11
                }, this) : posts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center text-gray-500",
                    children: "No posts yet. Be the first!"
                }, void 0, false, {
                    fileName: "[project]/app/community/page.tsx",
                    lineNumber: 264,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "space-y-3",
                    children: posts.map((post)=>{
                        var _post_profiles, _post_profiles1, _post_profiles2, _post_profiles3;
                        var _post_likes_count, _post_comments_count;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "bg-white border border-gray-200 rounded-xl p-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium",
                                        children: ((((_post_profiles = post.profiles) === null || _post_profiles === void 0 ? void 0 : _post_profiles.first_name) || "") + (((_post_profiles1 = post.profiles) === null || _post_profiles1 === void 0 ? void 0 : _post_profiles1.last_name) ? " ".concat(post.profiles.last_name) : "") || post.user_id || "?").slice(0, 1).toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/app/community/page.tsx",
                                        lineNumber: 270,
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
                                                        children: (((_post_profiles2 = post.profiles) === null || _post_profiles2 === void 0 ? void 0 : _post_profiles2.first_name) || "").toString() + (((_post_profiles3 = post.profiles) === null || _post_profiles3 === void 0 ? void 0 : _post_profiles3.last_name) ? " ".concat(post.profiles.last_name) : "") || "Anonymous"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 275,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "·"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 276,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                                        dateTime: post.created_at,
                                                        children: new Date(post.created_at).toLocaleString()
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 277,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 274,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 whitespace-pre-wrap break-words",
                                                children: post.content
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 279,
                                                columnNumber: 21
                                            }, this),
                                            post.image_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: post.image_url,
                                                    alt: "Post image",
                                                    className: "rounded-lg border max-h-96"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/community/page.tsx",
                                                    lineNumber: 282,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 281,
                                                columnNumber: 23
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
                                                                    fileName: "[project]/app/community/page.tsx",
                                                                    lineNumber: 288,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 287,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: (_post_likes_count = post.likes_count) !== null && _post_likes_count !== void 0 ? _post_likes_count : 0
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 290,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 286,
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
                                                                    fileName: "[project]/app/community/page.tsx",
                                                                    lineNumber: 294,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 293,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: (_post_comments_count = post.comments_count) !== null && _post_comments_count !== void 0 ? _post_comments_count : 0
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 296,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 292,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 285,
                                                columnNumber: 21
                                            }, this),
                                            expandedPostIds.has(post.id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 border-t border-gray-200 pt-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-3",
                                                        children: (commentsByPost[post.id] || []).map((c)=>{
                                                            var _c_profiles, _c_profiles1, _c_profiles2, _c_profiles3;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-start gap-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium",
                                                                        children: ((((_c_profiles = c.profiles) === null || _c_profiles === void 0 ? void 0 : _c_profiles.first_name) || "") + (((_c_profiles1 = c.profiles) === null || _c_profiles1 === void 0 ? void 0 : _c_profiles1.last_name) ? " ".concat(c.profiles.last_name) : "") || c.user_id || "?").slice(0, 1).toUpperCase()
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/community/page.tsx",
                                                                        lineNumber: 305,
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
                                                                                        children: (((_c_profiles2 = c.profiles) === null || _c_profiles2 === void 0 ? void 0 : _c_profiles2.first_name) || "") + (((_c_profiles3 = c.profiles) === null || _c_profiles3 === void 0 ? void 0 : _c_profiles3.last_name) ? " ".concat(c.profiles.last_name) : "") || "Anonymous"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/community/page.tsx",
                                                                                        lineNumber: 310,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        children: "·"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/community/page.tsx",
                                                                                        lineNumber: 311,
                                                                                        columnNumber: 35
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                                                                        dateTime: c.created_at,
                                                                                        children: new Date(c.created_at).toLocaleString()
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/community/page.tsx",
                                                                                        lineNumber: 312,
                                                                                        columnNumber: 35
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/app/community/page.tsx",
                                                                                lineNumber: 309,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "mt-1 whitespace-pre-wrap break-words text-sm",
                                                                                children: c.content
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/community/page.tsx",
                                                                                lineNumber: 314,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/community/page.tsx",
                                                                        lineNumber: 308,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, c.id, true, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 304,
                                                                columnNumber: 29
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 302,
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
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 321,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>submitComment(post.id),
                                                                disabled: !userId || !(newCommentContent[post.id] || "").trim(),
                                                                className: "px-3 h-9 rounded-md bg-gray-900 text-white disabled:opacity-50",
                                                                children: "Post"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 329,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 320,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 301,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/community/page.tsx",
                                        lineNumber: 273,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/community/page.tsx",
                                lineNumber: 269,
                                columnNumber: 17
                            }, this)
                        }, post.id, false, {
                            fileName: "[project]/app/community/page.tsx",
                            lineNumber: 268,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/app/community/page.tsx",
                    lineNumber: 266,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/community/page.tsx",
            lineNumber: 214,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/community/page.tsx",
        lineNumber: 213,
        columnNumber: 5
    }, this);
}
_s(CommunityPage, "scqaYDyA+Ebd6LQPgO2gvfRbews=");
_c = CommunityPage;
var _c;
__turbopack_context__.k.register(_c, "CommunityPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_community_page_tsx_586e9ae3._.js.map