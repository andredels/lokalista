(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/ui/Modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Modal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function Modal(param) {
    let { open, onClose, title, children, className = "", showCloseButton = true } = param;
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Modal.useEffect": ()=>{
            function onKey(e) {
                if (e.key === "Escape") onClose();
            }
            if (open) {
                document.addEventListener("keydown", onKey);
                document.body.style.overflow = "hidden";
            }
            return ({
                "Modal.useEffect": ()=>{
                    document.removeEventListener("keydown", onKey);
                    document.body.style.overflow = "";
                }
            })["Modal.useEffect"];
        }
    }["Modal.useEffect"], [
        open,
        onClose
    ]);
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/50",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/app/ui/Modal.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "dialog",
                "aria-modal": "true",
                className: "relative z-10 w-full rounded-lg border border-border/60 bg-background shadow-xl ".concat(className || 'max-w-md p-5'),
                children: [
                    title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h2 mb-2",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/app/ui/Modal.tsx",
                        lineNumber: 35,
                        columnNumber: 19
                    }, this),
                    children,
                    showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex justify-end",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "h-9 px-4 rounded-md border border-border/60",
                            children: "Close"
                        }, void 0, false, {
                            fileName: "[project]/app/ui/Modal.tsx",
                            lineNumber: 39,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/ui/Modal.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/ui/Modal.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/ui/Modal.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_s(Modal, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = Modal;
var _c;
__turbopack_context__.k.register(_c, "Modal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/community/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CommunityPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// Clone of journey page but with /community redirects
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/browserClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/ui/Modal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function CommunityPage() {
    var _selectedPost_profiles, _selectedPost_profiles1, _selectedPost_profiles2, _selectedPost_profiles3;
    _s();
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CommunityPage.useMemo[supabase]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])()
    }["CommunityPage.useMemo[supabase]"], []);
    const [userId, setUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [expandedPostIds, setExpandedPostIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [commentsByPost, setCommentsByPost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [newCommentContent, setNewCommentContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [imageFile, setImageFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [imagePreview, setImagePreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedPost, setSelectedPost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deletingPost, setDeletingPost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deletingComment, setDeletingComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CommunityPage.useEffect": ()=>{
            let mounted = true;
            ({
                "CommunityPage.useEffect": async ()=>{
                    var _data_user;
                    const { data } = await supabase.auth.getUser();
                    if (!mounted) return;
                    var _data_user_id;
                    const uid = (_data_user_id = (_data_user = data.user) === null || _data_user === void 0 ? void 0 : _data_user.id) !== null && _data_user_id !== void 0 ? _data_user_id : null;
                    setUserId(uid);
                    await loadPosts(uid);
                    setLoading(false);
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
    }["CommunityPage.useEffect"], []);
    async function loadPosts() {
        let currentUserId = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : userId;
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
        if (!userId) {
            window.location.href = "/auth/login?next=/community";
            return;
        }
        // Validate that we have either content or image
        if (!content.trim() && !imageFile) {
            alert("Please add a caption or an image to post.");
            return;
        }
        // Require image for community page
        if (!imageFile) {
            alert("Please add an image to post in the community page.");
            return;
        }
        setSubmitting(true);
        let imageUrl = null;
        console.log("Submitting post...");
        try {
            // Ensure user has a profile before posting (to satisfy foreign key constraint)
            const { data: profileData, error: profileError } = await supabase.from("profiles").select("id").eq("id", userId).maybeSingle();
            if (profileError && profileError.code !== 'PGRST116') {
                console.error("Error checking profile:", profileError);
            }
            // Create a basic profile if it doesn't exist
            if (!profileData) {
                const { error: createProfileError } = await supabase.from("profiles").upsert({
                    id: userId,
                    first_name: null,
                    last_name: null,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }, {
                    onConflict: "id"
                });
                if (createProfileError) {
                    console.error("Error creating profile:", createProfileError);
                // Continue anyway - might work if RLS allows it
                }
            }
            // Upload image if provided
            if (imageFile) {
                try {
                    var _imageFile_name_split_pop;
                    console.log("Uploading image...");
                    const ext = ((_imageFile_name_split_pop = imageFile.name.split(".").pop()) === null || _imageFile_name_split_pop === void 0 ? void 0 : _imageFile_name_split_pop.toLowerCase()) || "jpg";
                    const path = "".concat(userId, "/").concat(Date.now(), "-").concat(Math.random().toString(36).slice(2), ".").concat(ext);
                    const { error: upErr, data: uploadData } = await supabase.storage.from("post-images").upload(path, imageFile, {
                        cacheControl: "3600",
                        upsert: false,
                        contentType: imageFile.type || "image/jpeg"
                    });
                    if (upErr) {
                        console.error("Upload error:", upErr);
                        throw new Error("Failed to upload image: ".concat(upErr.message));
                    }
                    const { data: pub } = supabase.storage.from("post-images").getPublicUrl(path);
                    imageUrl = pub.publicUrl;
                } catch (uploadErr) {
                    console.error("Image upload failed:", uploadErr);
                    throw new Error("Image upload failed: ".concat(uploadErr.message || "Unknown error"));
                }
            }
            // Insert post
            console.log("Inserting post...");
            const { error: insertError, data: insertData } = await supabase.from("posts").insert({
                content: content.trim() || "",
                image_url: imageUrl,
                user_id: userId
            }).select().single();
            if (insertError) {
                console.error("Insert error:", insertError);
                // Better error logging
                const errorDetails = insertError.details || insertError.hint || insertError.message || JSON.stringify(insertError);
                throw new Error("Failed to create post: ".concat(errorDetails));
            }
            // Success - clear form and reload posts
            setContent("");
            // Revoke object URL to prevent memory leaks
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
            setImageFile(null);
            setImagePreview(null);
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            // Reload posts
            console.log("Post created successfully. Reloading posts...");
            await loadPosts(userId);
        } catch (err) {
            var _err_error;
            console.error("Error in submitPost:", err);
            const errorMessage = (err === null || err === void 0 ? void 0 : err.message) || (err === null || err === void 0 ? void 0 : (_err_error = err.error) === null || _err_error === void 0 ? void 0 : _err_error.message) || "Failed to post. Please try again.";
            alert(errorMessage);
            // Don't clear form on error - let user retry with same content/image
            // But still revoke object URL if there was an upload attempt
            if (imagePreview && imageUrl) {
            // Only revoke if we successfully uploaded but failed to insert
            // Otherwise keep the preview so user can retry
            }
        } finally{
            // Always reset submitting state
            setSubmitting(false);
        }
    }
    async function toggleLike(post) {
        if (!userId) {
            window.location.href = "/auth/login?next=/community";
            return;
        }
        const wasLiked = post.liked_by_me;
        // Optimistic update first
        if (selectedPost && selectedPost.id === post.id) {
            var _selectedPost_likes_count;
            setSelectedPost({
                ...selectedPost,
                liked_by_me: !wasLiked,
                likes_count: Math.max(0, ((_selectedPost_likes_count = selectedPost.likes_count) !== null && _selectedPost_likes_count !== void 0 ? _selectedPost_likes_count : 0) + (wasLiked ? -1 : 1))
            });
        }
        try {
            if (wasLiked) {
                const { error } = await supabase.from("likes").delete().match({
                    post_id: post.id,
                    user_id: userId
                });
                if (error) {
                    console.error("Error unliking post:", error);
                    alert(error.message);
                    // Revert optimistic update on error
                    if (selectedPost && selectedPost.id === post.id) {
                        var _selectedPost_likes_count1;
                        setSelectedPost({
                            ...selectedPost,
                            liked_by_me: wasLiked,
                            likes_count: (_selectedPost_likes_count1 = selectedPost.likes_count) !== null && _selectedPost_likes_count1 !== void 0 ? _selectedPost_likes_count1 : 0
                        });
                    }
                    return;
                }
            } else {
                // Check if like already exists to avoid duplicate key errors
                const { data: existingLike } = await supabase.from("likes").select("id").eq("post_id", post.id).eq("user_id", userId).maybeSingle();
                if (!existingLike) {
                    const { error } = await supabase.from("likes").insert({
                        post_id: post.id,
                        user_id: userId
                    });
                    if (error) {
                        console.error("Error liking post:", error);
                        alert(error.message);
                        // Revert optimistic update on error
                        if (selectedPost && selectedPost.id === post.id) {
                            var _selectedPost_likes_count2;
                            setSelectedPost({
                                ...selectedPost,
                                liked_by_me: wasLiked,
                                likes_count: (_selectedPost_likes_count2 = selectedPost.likes_count) !== null && _selectedPost_likes_count2 !== void 0 ? _selectedPost_likes_count2 : 0
                            });
                        }
                        return;
                    }
                }
            }
            // Reload posts to get accurate counts
            await loadPosts(userId);
            // Update selectedPost with fresh data
            const updatedPosts = await supabase.from("posts").select("id, user_id, content, image_url, created_at, profiles:profiles!posts_user_id_fkey(id, first_name, last_name),\n           likes_count:likes(count), comments_count:comments(count)").eq("id", post.id).single();
            if (updatedPosts.data && selectedPost && selectedPost.id === post.id) {
                var _updatedPosts_data_likes_count_, _updatedPosts_data_comments_count_;
                var _updatedPosts_data_likes_count__count, _updatedPosts_data_likes_count, _updatedPosts_data_comments_count__count, _updatedPosts_data_comments_count;
                const normalized = {
                    ...updatedPosts.data,
                    likes_count: Array.isArray(updatedPosts.data.likes_count) ? (_updatedPosts_data_likes_count__count = (_updatedPosts_data_likes_count_ = updatedPosts.data.likes_count[0]) === null || _updatedPosts_data_likes_count_ === void 0 ? void 0 : _updatedPosts_data_likes_count_.count) !== null && _updatedPosts_data_likes_count__count !== void 0 ? _updatedPosts_data_likes_count__count : 0 : (_updatedPosts_data_likes_count = updatedPosts.data.likes_count) !== null && _updatedPosts_data_likes_count !== void 0 ? _updatedPosts_data_likes_count : 0,
                    comments_count: Array.isArray(updatedPosts.data.comments_count) ? (_updatedPosts_data_comments_count__count = (_updatedPosts_data_comments_count_ = updatedPosts.data.comments_count[0]) === null || _updatedPosts_data_comments_count_ === void 0 ? void 0 : _updatedPosts_data_comments_count_.count) !== null && _updatedPosts_data_comments_count__count !== void 0 ? _updatedPosts_data_comments_count__count : 0 : (_updatedPosts_data_comments_count = updatedPosts.data.comments_count) !== null && _updatedPosts_data_comments_count !== void 0 ? _updatedPosts_data_comments_count : 0,
                    liked_by_me: false
                };
                // Check if user liked this post
                const { data: myLike } = await supabase.from("likes").select("post_id").eq("post_id", post.id).eq("user_id", userId).maybeSingle();
                normalized.liked_by_me = !!myLike;
                setSelectedPost(normalized);
            }
        } catch (error) {
            console.error("Error in toggleLike:", error);
            alert((error === null || error === void 0 ? void 0 : error.message) || "Failed to update like. Please try again.");
        }
    }
    async function loadComments(postId) {
        const { data, error } = await supabase.from("comments").select("id, post_id, user_id, content, created_at, profiles:profiles!comments_user_id_fkey(id, first_name, last_name)").eq("post_id", postId).order("created_at", {
            ascending: true
        });
        if (error) return alert(error.message);
        setCommentsByPost((prev)=>({
                ...prev,
                [postId]: data || []
            }));
    }
    async function deletePost(postId) {
        if (!userId) {
            alert("You must be logged in to delete a post.");
            return;
        }
        if (deletingPost === postId) {
            return; // Already deleting
        }
        console.log("Attempting to delete post:", postId, "User ID:", userId);
        if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
            return;
        }
        setDeletingPost(postId);
        try {
            // First, delete all related data (likes and comments)
            const { error: likesError } = await supabase.from("likes").delete().eq("post_id", postId);
            if (likesError) {
                console.warn("Error deleting likes (continuing anyway):", likesError);
            }
            const { error: commentsError } = await supabase.from("comments").delete().eq("post_id", postId);
            if (commentsError) {
                console.warn("Error deleting comments (continuing anyway):", commentsError);
            }
            // Delete the post image from storage if it exists
            const { data: postData, error: fetchError } = await supabase.from("posts").select("image_url, user_id").eq("id", postId).single();
            if (fetchError) {
                console.error("Error fetching post data:", fetchError);
                throw new Error("Failed to fetch post: ".concat(fetchError.message));
            }
            // Verify ownership
            if (postData.user_id !== userId) {
                alert("You can only delete your own posts.");
                return;
            }
            if (postData === null || postData === void 0 ? void 0 : postData.image_url) {
                // Extract path from URL
                const urlParts = postData.image_url.split("/post-images/");
                if (urlParts.length > 1) {
                    const filePath = urlParts[1].split("?")[0];
                    const { error: storageError } = await supabase.storage.from("post-images").remove([
                        filePath
                    ]);
                    if (storageError) {
                        console.warn("Error deleting image from storage (continuing anyway):", storageError);
                    }
                }
            }
            // Delete the post
            const { error, data } = await supabase.from("posts").delete().eq("id", postId).eq("user_id", userId).select();
            if (error) {
                console.error("Error deleting post:", error);
                throw new Error("Failed to delete post: ".concat(error.message));
            }
            if (!data || data.length === 0) {
                throw new Error("Post not found or you don't have permission to delete it.");
            }
            console.log("Post deleted successfully");
            // Close modal if the deleted post was open
            if (selectedPost && selectedPost.id === postId) {
                closeModal();
            }
            // Reload posts
            await loadPosts(userId);
        } catch (error) {
            console.error("Error deleting post:", error);
            alert((error === null || error === void 0 ? void 0 : error.message) || "Failed to delete post. Please try again.");
        } finally{
            setDeletingPost(null);
        }
    }
    async function deleteComment(commentId, postId) {
        if (!userId) {
            alert("You must be logged in to delete a comment.");
            return;
        }
        if (deletingComment === commentId) {
            return; // Already deleting
        }
        console.log("Attempting to delete comment:", commentId, "User ID:", userId);
        if (!confirm("Are you sure you want to delete this comment?")) {
            return;
        }
        setDeletingComment(commentId);
        try {
            // First verify ownership
            const { data: commentData, error: fetchError } = await supabase.from("comments").select("id, user_id").eq("id", commentId).single();
            if (fetchError) {
                console.error("Error fetching comment:", fetchError);
                throw new Error("Failed to fetch comment: ".concat(fetchError.message));
            }
            if (!commentData) {
                throw new Error("Comment not found.");
            }
            // Verify ownership
            if (commentData.user_id !== userId) {
                alert("You can only delete your own comments.");
                return;
            }
            // Delete the comment
            const { error, data } = await supabase.from("comments").delete().eq("id", commentId).eq("user_id", userId).select();
            if (error) {
                console.error("Error deleting comment:", error);
                throw new Error("Failed to delete comment: ".concat(error.message));
            }
            if (!data || data.length === 0) {
                throw new Error("Comment not found or you don't have permission to delete it.");
            }
            console.log("Comment deleted successfully");
            // Reload comments and update post count
            await loadComments(postId);
            await loadPosts(userId);
            // Update selectedPost if it's the same post
            if (selectedPost && selectedPost.id === postId) {
                const updatedPost = posts.find((p)=>p.id === postId);
                if (updatedPost) {
                    var _updatedPost_comments_count;
                    setSelectedPost({
                        ...updatedPost,
                        comments_count: Math.max(0, ((_updatedPost_comments_count = updatedPost.comments_count) !== null && _updatedPost_comments_count !== void 0 ? _updatedPost_comments_count : 0) - 1)
                    });
                }
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
            alert((error === null || error === void 0 ? void 0 : error.message) || "Failed to delete comment. Please try again.");
        } finally{
            setDeletingComment(null);
        }
    }
    async function submitComment(postId) {
        if (!userId) {
            window.location.href = "/auth/login?next=/community";
            return;
        }
        const text = (newCommentContent[postId] || "").trim();
        if (!text) {
            alert("Please enter a comment");
            return;
        }
        var _selectedPost_comments_count;
        // Optimistic update
        const previousCount = (_selectedPost_comments_count = selectedPost === null || selectedPost === void 0 ? void 0 : selectedPost.comments_count) !== null && _selectedPost_comments_count !== void 0 ? _selectedPost_comments_count : 0;
        if (selectedPost && selectedPost.id === postId) {
            setSelectedPost({
                ...selectedPost,
                comments_count: previousCount + 1
            });
        }
        // Clear input immediately
        setNewCommentContent((p)=>({
                ...p,
                [postId]: ""
            }));
        try {
            const { error, data } = await supabase.from("comments").insert({
                post_id: postId,
                content: text,
                user_id: userId
            }).select().single();
            if (error) {
                console.error("Error submitting comment:", error);
                alert(error.message);
                // Revert optimistic update on error
                if (selectedPost && selectedPost.id === postId) {
                    setSelectedPost({
                        ...selectedPost,
                        comments_count: previousCount
                    });
                }
                // Restore input text
                setNewCommentContent((p)=>({
                        ...p,
                        [postId]: text
                    }));
                return;
            }
            // Reload comments to show the new one
            await loadComments(postId);
            // Reload posts to get accurate comment count
            await loadPosts(userId);
            // Update selectedPost with fresh data
            const updatedPosts = await supabase.from("posts").select("id, user_id, content, image_url, created_at, profiles:profiles!posts_user_id_fkey(id, first_name, last_name),\n           likes_count:likes(count), comments_count:comments(count)").eq("id", postId).single();
            if (updatedPosts.data && selectedPost && selectedPost.id === postId) {
                var _updatedPosts_data_likes_count_, _updatedPosts_data_comments_count_;
                var _updatedPosts_data_likes_count__count, _updatedPosts_data_likes_count, _updatedPosts_data_comments_count__count, _updatedPosts_data_comments_count;
                const normalized = {
                    ...updatedPosts.data,
                    likes_count: Array.isArray(updatedPosts.data.likes_count) ? (_updatedPosts_data_likes_count__count = (_updatedPosts_data_likes_count_ = updatedPosts.data.likes_count[0]) === null || _updatedPosts_data_likes_count_ === void 0 ? void 0 : _updatedPosts_data_likes_count_.count) !== null && _updatedPosts_data_likes_count__count !== void 0 ? _updatedPosts_data_likes_count__count : 0 : (_updatedPosts_data_likes_count = updatedPosts.data.likes_count) !== null && _updatedPosts_data_likes_count !== void 0 ? _updatedPosts_data_likes_count : 0,
                    comments_count: Array.isArray(updatedPosts.data.comments_count) ? (_updatedPosts_data_comments_count__count = (_updatedPosts_data_comments_count_ = updatedPosts.data.comments_count[0]) === null || _updatedPosts_data_comments_count_ === void 0 ? void 0 : _updatedPosts_data_comments_count_.count) !== null && _updatedPosts_data_comments_count__count !== void 0 ? _updatedPosts_data_comments_count__count : 0 : (_updatedPosts_data_comments_count = updatedPosts.data.comments_count) !== null && _updatedPosts_data_comments_count !== void 0 ? _updatedPosts_data_comments_count : 0,
                    liked_by_me: selectedPost.liked_by_me
                };
                setSelectedPost(normalized);
            }
        } catch (error) {
            console.error("Error in submitComment:", error);
            alert((error === null || error === void 0 ? void 0 : error.message) || "Failed to post comment. Please try again.");
            // Revert optimistic update on error
            if (selectedPost && selectedPost.id === postId) {
                setSelectedPost({
                    ...selectedPost,
                    comments_count: previousCount
                });
            }
            // Restore input text
            setNewCommentContent((p)=>({
                    ...p,
                    [postId]: text
                }));
        }
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
    function openPostModal(post) {
        setSelectedPost(post);
        setIsModalOpen(true);
        if (!commentsByPost[post.id]) {
            void loadComments(post.id);
        }
    }
    function closeModal() {
        setIsModalOpen(false);
        setSelectedPost(null);
    }
    // Filter posts to only show those with images
    const postsWithImages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CommunityPage.useMemo[postsWithImages]": ()=>{
            return posts.filter({
                "CommunityPage.useMemo[postsWithImages]": (post)=>post.image_url
            }["CommunityPage.useMemo[postsWithImages]"]);
        }
    }["CommunityPage.useMemo[postsWithImages]"], [
        posts
    ]);
    // Sync selectedPost with updated posts when posts change (for accurate counts)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CommunityPage.useEffect": ()=>{
            if (selectedPost && isModalOpen && posts.length > 0) {
                const updatedPost = posts.find({
                    "CommunityPage.useEffect.updatedPost": (p)=>p.id === selectedPost.id
                }["CommunityPage.useEffect.updatedPost"]);
                if (updatedPost) {
                    // Only update if the post data has actually changed (to avoid unnecessary re-renders)
                    if (updatedPost.likes_count !== selectedPost.likes_count || updatedPost.comments_count !== selectedPost.comments_count || updatedPost.liked_by_me !== selectedPost.liked_by_me) {
                        setSelectedPost(updatedPost);
                    }
                }
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["CommunityPage.useEffect"], [
        posts,
        isModalOpen
    ]);
    // Handle paste image functionality
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CommunityPage.useEffect": ()=>{
            const handlePaste = {
                "CommunityPage.useEffect.handlePaste": async (e)=>{
                    var _e_clipboardData;
                    if (!userId || submitting) return;
                    const items = (_e_clipboardData = e.clipboardData) === null || _e_clipboardData === void 0 ? void 0 : _e_clipboardData.items;
                    if (!items) return;
                    // Look for image in clipboard
                    for(let i = 0; i < items.length; i++){
                        const item = items[i];
                        // Check if the item is an image
                        if (item.type.indexOf('image') !== -1) {
                            e.preventDefault();
                            const file = item.getAsFile();
                            if (file) {
                                // Validate file type
                                if (!file.type.startsWith('image/')) {
                                    alert('Please paste an image file');
                                    return;
                                }
                                // Validate file size (max 10MB)
                                if (file.size > 10 * 1024 * 1024) {
                                    alert('Image is too large. Maximum size is 10MB');
                                    return;
                                }
                                // Revoke old object URL to prevent memory leaks
                                setImagePreview({
                                    "CommunityPage.useEffect.handlePaste": (prev)=>{
                                        if (prev) {
                                            URL.revokeObjectURL(prev);
                                        }
                                        return URL.createObjectURL(file);
                                    }
                                }["CommunityPage.useEffect.handlePaste"]);
                                // Set the image file
                                setImageFile(file);
                                // Reset file input if it exists
                                if (fileInputRef.current) {
                                    fileInputRef.current.value = "";
                                }
                            }
                            break;
                        }
                    }
                }
            }["CommunityPage.useEffect.handlePaste"];
            // Add paste event listener to the document
            document.addEventListener('paste', handlePaste);
            return ({
                "CommunityPage.useEffect": ()=>{
                    document.removeEventListener('paste', handlePaste);
                }
            })["CommunityPage.useEffect"];
        }
    }["CommunityPage.useEffect"], [
        userId,
        submitting
    ]);
    // Cleanup object URLs on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CommunityPage.useEffect": ()=>{
            return ({
                "CommunityPage.useEffect": ()=>{
                    if (imagePreview) {
                        URL.revokeObjectURL(imagePreview);
                    }
                }
            })["CommunityPage.useEffect"];
        }
    }["CommunityPage.useEffect"], [
        imagePreview
    ]);
    var _selectedPost_likes_count, _selectedPost_comments_count;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container max-w-7xl py-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold mb-6 text-gray-900",
                    children: "Community"
                }, void 0, false, {
                    fileName: "[project]/app/community/page.tsx",
                    lineNumber: 738,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: submitPost,
                    className: "bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            value: content,
                            onChange: (e)=>setContent(e.target.value),
                            placeholder: userId ? "Share something with the community... (You can paste an image here!)" : "Sign in to post",
                            className: "w-full resize-none outline-none min-h-[90px] bg-transparent text-gray-900 placeholder:text-gray-500",
                            disabled: !userId || submitting,
                            onPaste: (e)=>{
                                var _e_clipboardData;
                                // Let the global paste handler handle images
                                // This prevents default text paste behavior for images
                                const items = (_e_clipboardData = e.clipboardData) === null || _e_clipboardData === void 0 ? void 0 : _e_clipboardData.items;
                                if (items) {
                                    for(let i = 0; i < items.length; i++){
                                        if (items[i].type.indexOf('image') !== -1) {
                                            e.preventDefault();
                                            return;
                                        }
                                    }
                                }
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/community/page.tsx",
                            lineNumber: 742,
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
                                lineNumber: 764,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/community/page.tsx",
                            lineNumber: 763,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mt-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            ref: fileInputRef,
                                            type: "file",
                                            accept: "image/*",
                                            className: "hidden",
                                            disabled: !userId || submitting,
                                            onChange: (e)=>{
                                                var _e_target_files;
                                                const file = ((_e_target_files = e.target.files) === null || _e_target_files === void 0 ? void 0 : _e_target_files[0]) || null;
                                                // Revoke old object URL to prevent memory leaks
                                                if (imagePreview) {
                                                    URL.revokeObjectURL(imagePreview);
                                                }
                                                setImageFile(file);
                                                setImagePreview(file ? URL.createObjectURL(file) : null);
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/page.tsx",
                                            lineNumber: 769,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-3 h-9 inline-flex items-center rounded-md border border-gray-300 hover:bg-gray-50 text-gray-700",
                                            children: "📷 Add image"
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/page.tsx",
                                            lineNumber: 787,
                                            columnNumber: 15
                                        }, this),
                                        imageFile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-gray-500 text-sm",
                                            children: imageFile.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/page.tsx",
                                            lineNumber: 788,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/community/page.tsx",
                                    lineNumber: 768,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-gray-500",
                                            children: [
                                                content.length,
                                                "/280"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/community/page.tsx",
                                            lineNumber: 791,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            disabled: !userId || submitting || content.length > 280 || !imageFile,
                                            className: "px-4 h-9 rounded-full bg-[#8c52ff] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity",
                                            children: submitting ? "Posting..." : "Post"
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/page.tsx",
                                            lineNumber: 792,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/community/page.tsx",
                                    lineNumber: 790,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/community/page.tsx",
                            lineNumber: 767,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/community/page.tsx",
                    lineNumber: 741,
                    columnNumber: 9
                }, this),
                loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center text-gray-500 py-12",
                    children: "Loading…"
                }, void 0, false, {
                    fileName: "[project]/app/community/page.tsx",
                    lineNumber: 805,
                    columnNumber: 11
                }, this) : postsWithImages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center text-gray-500 py-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg mb-2",
                            children: "No posts with images yet."
                        }, void 0, false, {
                            fileName: "[project]/app/community/page.tsx",
                            lineNumber: 808,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm",
                            children: "Be the first to share a photo!"
                        }, void 0, false, {
                            fileName: "[project]/app/community/page.tsx",
                            lineNumber: 809,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/community/page.tsx",
                    lineNumber: 807,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4",
                    style: {
                        columnFill: 'balance'
                    },
                    children: postsWithImages.map((post)=>{
                        var _post_likes_count, _post_comments_count;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "break-inside-avoid mb-4 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200",
                            onClick: ()=>openPostModal(post),
                            children: post.image_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: post.image_url,
                                        alt: post.content || "Post image",
                                        className: "w-full h-auto object-cover",
                                        loading: "lazy"
                                    }, void 0, false, {
                                        fileName: "[project]/app/community/page.tsx",
                                        lineNumber: 824,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-4 text-white text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            width: "16",
                                                            height: "16",
                                                            viewBox: "0 0 24 24",
                                                            fill: post.liked_by_me ? "currentColor" : "none",
                                                            stroke: "currentColor",
                                                            strokeWidth: "2",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 835,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/community/page.tsx",
                                                            lineNumber: 834,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: (_post_likes_count = post.likes_count) !== null && _post_likes_count !== void 0 ? _post_likes_count : 0
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/community/page.tsx",
                                                            lineNumber: 837,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/community/page.tsx",
                                                    lineNumber: 833,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            width: "16",
                                                            height: "16",
                                                            viewBox: "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            strokeWidth: "2",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M21 15a2 2 0 01-2 2H8l-4 4V5a2 2 0 012-2h13a2 2 0 012 2v10z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 841,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/community/page.tsx",
                                                            lineNumber: 840,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: (_post_comments_count = post.comments_count) !== null && _post_comments_count !== void 0 ? _post_comments_count : 0
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/community/page.tsx",
                                                            lineNumber: 843,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/community/page.tsx",
                                                    lineNumber: 839,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/community/page.tsx",
                                            lineNumber: 832,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/community/page.tsx",
                                        lineNumber: 831,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/community/page.tsx",
                                lineNumber: 823,
                                columnNumber: 19
                            }, this)
                        }, post.id, false, {
                            fileName: "[project]/app/community/page.tsx",
                            lineNumber: 817,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/app/community/page.tsx",
                    lineNumber: 812,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    open: isModalOpen,
                    onClose: closeModal,
                    title: "",
                    className: "max-w-5xl p-0",
                    showCloseButton: false,
                    children: selectedPost && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full bg-white rounded-lg overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: closeModal,
                                className: "absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors",
                                "aria-label": "Close modal",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "20",
                                    height: "20",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M18 6L6 18M6 6l12 12"
                                    }, void 0, false, {
                                        fileName: "[project]/app/community/page.tsx",
                                        lineNumber: 865,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/community/page.tsx",
                                    lineNumber: 864,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/community/page.tsx",
                                lineNumber: 859,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col md:flex-row max-h-[90vh]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:w-1/2 bg-black flex items-center justify-center",
                                        children: selectedPost.image_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: selectedPost.image_url,
                                            alt: "Post image",
                                            className: "w-full h-auto max-h-[90vh] object-contain"
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/page.tsx",
                                            lineNumber: 873,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/community/page.tsx",
                                        lineNumber: 871,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:w-1/2 flex flex-col max-h-[90vh] overflow-hidden relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 border-b border-gray-200 flex items-start gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium flex-shrink-0 text-gray-900",
                                                        children: ((((_selectedPost_profiles = selectedPost.profiles) === null || _selectedPost_profiles === void 0 ? void 0 : _selectedPost_profiles.first_name) || "") + (((_selectedPost_profiles1 = selectedPost.profiles) === null || _selectedPost_profiles1 === void 0 ? void 0 : _selectedPost_profiles1.last_name) ? " ".concat(selectedPost.profiles.last_name) : "") || selectedPost.user_id || "?").slice(0, 1).toUpperCase()
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 885,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 mb-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold text-gray-900 text-sm",
                                                                        children: (((_selectedPost_profiles2 = selectedPost.profiles) === null || _selectedPost_profiles2 === void 0 ? void 0 : _selectedPost_profiles2.first_name) || "").toString() + (((_selectedPost_profiles3 = selectedPost.profiles) === null || _selectedPost_profiles3 === void 0 ? void 0 : _selectedPost_profiles3.last_name) ? " ".concat(selectedPost.profiles.last_name) : "") || "Anonymous"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/community/page.tsx",
                                                                        lineNumber: 890,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-400",
                                                                        children: "·"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/community/page.tsx",
                                                                        lineNumber: 891,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                                                        dateTime: selectedPost.created_at,
                                                                        className: "text-gray-500 text-xs",
                                                                        children: new Date(selectedPost.created_at).toLocaleDateString()
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/community/page.tsx",
                                                                        lineNumber: 892,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    userId === selectedPost.user_id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: async (e)=>{
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                            await deletePost(selectedPost.id);
                                                                        },
                                                                        disabled: deletingPost === selectedPost.id,
                                                                        className: "text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed",
                                                                        title: "Delete post",
                                                                        children: deletingPost === selectedPost.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                            className: "animate-spin",
                                                                            width: "16",
                                                                            height: "16",
                                                                            viewBox: "0 0 24 24",
                                                                            fill: "none",
                                                                            stroke: "currentColor",
                                                                            strokeWidth: "2",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                d: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/community/page.tsx",
                                                                                lineNumber: 909,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/community/page.tsx",
                                                                            lineNumber: 908,
                                                                            columnNumber: 31
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                            width: "16",
                                                                            height: "16",
                                                                            viewBox: "0 0 24 24",
                                                                            fill: "none",
                                                                            stroke: "currentColor",
                                                                            strokeWidth: "2",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                d: "M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/community/page.tsx",
                                                                                lineNumber: 913,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/community/page.tsx",
                                                                            lineNumber: 912,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/community/page.tsx",
                                                                        lineNumber: 896,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 889,
                                                                columnNumber: 23
                                                            }, this),
                                                            selectedPost.content ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "whitespace-pre-wrap break-words text-gray-800 text-sm",
                                                                children: selectedPost.content
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 920,
                                                                columnNumber: 25
                                                            }, this) : null
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 888,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 884,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-4 py-3 border-b border-gray-200",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-6",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: (e)=>{
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                toggleLike(selectedPost);
                                                            },
                                                            className: "flex items-center gap-2 transition-colors cursor-pointer hover:scale-105 ".concat(selectedPost.liked_by_me ? "text-red-500" : "text-gray-600 hover:text-red-500"),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    width: "24",
                                                                    height: "24",
                                                                    viewBox: "0 0 24 24",
                                                                    fill: selectedPost.liked_by_me ? "currentColor" : "none",
                                                                    stroke: "currentColor",
                                                                    strokeWidth: "2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/community/page.tsx",
                                                                        lineNumber: 938,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/community/page.tsx",
                                                                    lineNumber: 937,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-sm",
                                                                    children: [
                                                                        (_selectedPost_likes_count = selectedPost.likes_count) !== null && _selectedPost_likes_count !== void 0 ? _selectedPost_likes_count : 0,
                                                                        " ",
                                                                        selectedPost.likes_count === 1 ? 'like' : 'likes'
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/community/page.tsx",
                                                                    lineNumber: 940,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/community/page.tsx",
                                                            lineNumber: 928,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 text-gray-600",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    width: "24",
                                                                    height: "24",
                                                                    viewBox: "0 0 24 24",
                                                                    fill: "none",
                                                                    stroke: "currentColor",
                                                                    strokeWidth: "2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M21 15a2 2 0 01-2 2H8l-4 4V5a2 2 0 012-2h13a2 2 0 012 2v10z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/community/page.tsx",
                                                                        lineNumber: 944,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/community/page.tsx",
                                                                    lineNumber: 943,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-sm",
                                                                    children: [
                                                                        (_selectedPost_comments_count = selectedPost.comments_count) !== null && _selectedPost_comments_count !== void 0 ? _selectedPost_comments_count : 0,
                                                                        " ",
                                                                        selectedPost.comments_count === 1 ? 'comment' : 'comments'
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/community/page.tsx",
                                                                    lineNumber: 946,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/community/page.tsx",
                                                            lineNumber: 942,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/community/page.tsx",
                                                    lineNumber: 927,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 926,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 overflow-y-auto p-4 space-y-4 min-h-0",
                                                children: (commentsByPost[selectedPost.id] || []).length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center text-gray-400 py-8",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm",
                                                        children: "No comments yet. Be the first to comment!"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 955,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/community/page.tsx",
                                                    lineNumber: 954,
                                                    columnNumber: 23
                                                }, this) : (commentsByPost[selectedPost.id] || []).map((c)=>{
                                                    var _c_profiles, _c_profiles1, _c_profiles2, _c_profiles3;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start gap-3 group",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium flex-shrink-0 text-gray-900",
                                                                children: ((((_c_profiles = c.profiles) === null || _c_profiles === void 0 ? void 0 : _c_profiles.first_name) || "") + (((_c_profiles1 = c.profiles) === null || _c_profiles1 === void 0 ? void 0 : _c_profiles1.last_name) ? " ".concat(c.profiles.last_name) : "") || c.user_id || "?").slice(0, 1).toUpperCase()
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 960,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1 min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2 mb-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "font-semibold text-gray-900 text-sm",
                                                                                children: (((_c_profiles2 = c.profiles) === null || _c_profiles2 === void 0 ? void 0 : _c_profiles2.first_name) || "") + (((_c_profiles3 = c.profiles) === null || _c_profiles3 === void 0 ? void 0 : _c_profiles3.last_name) ? " ".concat(c.profiles.last_name) : "") || "Anonymous"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/community/page.tsx",
                                                                                lineNumber: 965,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-gray-400",
                                                                                children: "·"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/community/page.tsx",
                                                                                lineNumber: 966,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                                                                dateTime: c.created_at,
                                                                                className: "text-gray-500 text-xs",
                                                                                children: new Date(c.created_at).toLocaleDateString()
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/community/page.tsx",
                                                                                lineNumber: 967,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/community/page.tsx",
                                                                        lineNumber: 964,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "whitespace-pre-wrap break-words text-sm text-gray-800",
                                                                        children: c.content
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/community/page.tsx",
                                                                        lineNumber: 971,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 963,
                                                                columnNumber: 27
                                                            }, this),
                                                            userId === c.user_id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: async (e)=>{
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    await deleteComment(c.id, selectedPost.id);
                                                                },
                                                                disabled: deletingComment === c.id,
                                                                className: "opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed",
                                                                title: "Delete comment",
                                                                children: deletingComment === c.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    className: "animate-spin",
                                                                    width: "16",
                                                                    height: "16",
                                                                    viewBox: "0 0 24 24",
                                                                    fill: "none",
                                                                    stroke: "currentColor",
                                                                    strokeWidth: "2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/community/page.tsx",
                                                                        lineNumber: 987,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/community/page.tsx",
                                                                    lineNumber: 986,
                                                                    columnNumber: 33
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    width: "16",
                                                                    height: "16",
                                                                    viewBox: "0 0 24 24",
                                                                    fill: "none",
                                                                    stroke: "currentColor",
                                                                    strokeWidth: "2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/community/page.tsx",
                                                                        lineNumber: 991,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/community/page.tsx",
                                                                    lineNumber: 990,
                                                                    columnNumber: 33
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 974,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, c.id, true, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 959,
                                                        columnNumber: 25
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 952,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 border-t border-gray-200 bg-white",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            placeholder: userId ? "Add a comment…" : "Sign in to comment",
                                                            value: newCommentContent[selectedPost.id] || "",
                                                            onChange: (e)=>setNewCommentContent((p)=>({
                                                                        ...p,
                                                                        [selectedPost.id]: e.target.value
                                                                    })),
                                                            className: "flex-1 h-10 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent outline-none text-sm",
                                                            disabled: !userId,
                                                            onKeyDown: (e)=>{
                                                                if (e.key === "Enter" && !e.shiftKey && userId && (newCommentContent[selectedPost.id] || "").trim()) {
                                                                    e.preventDefault();
                                                                    submitComment(selectedPost.id);
                                                                }
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/community/page.tsx",
                                                            lineNumber: 1004,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: (e)=>{
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                submitComment(selectedPost.id);
                                                            },
                                                            disabled: !userId || !(newCommentContent[selectedPost.id] || "").trim(),
                                                            className: "px-4 h-10 rounded-md bg-[#8c52ff] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 text-sm font-medium",
                                                            children: "Post"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/community/page.tsx",
                                                            lineNumber: 1018,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/community/page.tsx",
                                                    lineNumber: 1003,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 1002,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/community/page.tsx",
                                        lineNumber: 882,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/community/page.tsx",
                                lineNumber: 869,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/community/page.tsx",
                        lineNumber: 857,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/community/page.tsx",
                    lineNumber: 855,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/community/page.tsx",
            lineNumber: 737,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/community/page.tsx",
        lineNumber: 736,
        columnNumber: 5
    }, this);
}
_s(CommunityPage, "VwARHHN3whGGYIf0Tcpf2SW6vLc=");
_c = CommunityPage;
var _c;
__turbopack_context__.k.register(_c, "CommunityPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_ec43585b._.js.map