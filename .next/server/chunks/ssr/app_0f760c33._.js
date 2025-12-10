module.exports = [
"[project]/app/ui/Modal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Modal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function Modal({ open, onClose, title, children, className = "", showCloseButton = true }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        function onKey(e) {
            if (e.key === "Escape") onClose();
        }
        if (open) {
            document.addEventListener("keydown", onKey);
            document.body.style.overflow = "hidden";
        }
        return ()=>{
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [
        open,
        onClose
    ]);
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/50",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/app/ui/Modal.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "dialog",
                "aria-modal": "true",
                className: `relative z-10 w-full rounded-lg border border-border/60 bg-background shadow-xl ${className || 'max-w-md p-5'}`,
                children: [
                    title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h2 mb-2",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/app/ui/Modal.tsx",
                        lineNumber: 35,
                        columnNumber: 19
                    }, this),
                    children,
                    showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex justify-end",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
}),
"[project]/app/community/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CommunityPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/* eslint-disable @typescript-eslint/no-explicit-any */ // Clone of journey page but with /community redirects
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/browserClient.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/ui/Modal.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const extractProfile = (profile)=>{
    if (!profile) return null;
    // Handle array case (from Supabase joins)
    if (Array.isArray(profile)) {
        return profile[0] ?? null;
    }
    // Handle object case
    if (typeof profile === 'object') {
        return profile;
    }
    return null;
};
// Helper function to get display name from profile - ONLY uses profiles table data
const getDisplayName = (profile, userId)=>{
    // Use first_name and last_name from profiles table
    if (profile?.first_name || profile?.last_name) {
        const firstName = profile.first_name || "";
        const lastName = profile.last_name || "";
        const fullName = `${firstName}${lastName ? ` ${lastName}` : ""}`.trim();
        if (fullName) return fullName;
    }
    // Fallback: use first 8 characters of user_id if no name in profile
    return userId ? `User ${userId.slice(0, 8)}` : "User";
};
function CommunityPage() {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])(), []);
    const [userId, setUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [expandedPostIds, setExpandedPostIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [commentsByPost, setCommentsByPost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [newCommentContent, setNewCommentContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [imageFiles, setImageFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [imagePreviews, setImagePreviews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentImageIndex, setCurrentImageIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [selectedPost, setSelectedPost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isComposerOpen, setIsComposerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deletingPost, setDeletingPost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deletingComment, setDeletingComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentPostImageIndex, setCurrentPostImageIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let mounted = true;
        (async ()=>{
            const { data } = await supabase.auth.getUser();
            if (!mounted) return;
            const uid = data.user?.id ?? null;
            setUserId(uid);
            // Ensure current user's profile has first_name/last_name populated from metadata if missing
            if (uid && data.user) {
                try {
                    const { data: profileData } = await supabase.from("profiles").select("first_name, last_name").eq("id", uid).single();
                    // If profile doesn't have names, try to populate from auth metadata
                    if (profileData && !profileData.first_name && !profileData.last_name) {
                        const metadata = data.user.user_metadata;
                        if (metadata?.full_name) {
                            const nameParts = metadata.full_name.trim().split(/\s+/);
                            const firstName = nameParts[0] || "";
                            const lastName = nameParts.slice(1).join(" ") || "";
                            if (firstName || lastName) {
                                await supabase.from("profiles").update({
                                    first_name: firstName || null,
                                    last_name: lastName || null,
                                    updated_at: new Date().toISOString()
                                }).eq("id", uid);
                            }
                        }
                    }
                } catch (e) {
                // Ignore - profile might not exist yet or RLS might prevent update
                }
            }
            await loadPosts(uid);
            setLoading(false);
        })();
        const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session)=>{
            const uid = session?.user?.id ?? null;
            setUserId(uid);
            // Ensure profile is populated when user logs in
            if (uid && session?.user) {
                try {
                    const { data: profileData } = await supabase.from("profiles").select("first_name, last_name").eq("id", uid).single();
                    // If profile doesn't have names, populate from auth metadata
                    if (profileData && !profileData.first_name && !profileData.last_name) {
                        const metadata = session.user.user_metadata;
                        if (metadata?.full_name) {
                            const nameParts = metadata.full_name.trim().split(/\s+/);
                            const firstName = nameParts[0] || "";
                            const lastName = nameParts.slice(1).join(" ") || "";
                            if (firstName || lastName) {
                                await supabase.from("profiles").update({
                                    first_name: firstName || null,
                                    last_name: lastName || null,
                                    updated_at: new Date().toISOString()
                                }).eq("id", uid);
                            }
                        } else if (metadata?.first_name || metadata?.last_name) {
                            await supabase.from("profiles").update({
                                first_name: metadata.first_name || null,
                                last_name: metadata.last_name || null,
                                updated_at: new Date().toISOString()
                            }).eq("id", uid);
                        }
                    }
                } catch (e) {
                // Ignore - profile might not exist yet or RLS might prevent update
                }
            }
            await loadPosts(uid);
        });
        return ()=>{
            mounted = false;
            sub.subscription.unsubscribe();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    async function loadPosts(currentUserId = userId) {
        const { data, error } = await supabase.from("posts").select(`id, user_id, content, image_url, created_at, profiles(id, first_name, last_name, avatar_url),
         likes_count:likes(count), comments_count:comments(count)`).order("created_at", {
            ascending: false
        });
        if (error) {
            console.error("Error loading posts:", error);
            return;
        }
        const normalized = data.map((row)=>({
                ...row,
                profiles: extractProfile(row.profiles),
                likes_count: Array.isArray(row.likes_count) ? row.likes_count[0]?.count ?? 0 : row.likes_count ?? 0,
                comments_count: Array.isArray(row.comments_count) ? row.comments_count[0]?.count ?? 0 : row.comments_count ?? 0,
                liked_by_me: false
            }));
        // If profiles are missing (likely due to RLS), try to fetch them separately
        const missingProfileUserIds = normalized.filter((p)=>!p.profiles || !p.profiles.first_name && !p.profiles.last_name).map((p)=>p.user_id).filter((id, index, self)=>self.indexOf(id) === index); // unique IDs
        if (missingProfileUserIds.length > 0) {
            const { data: profilesData, error: profilesError } = await supabase.from("profiles").select("id, first_name, last_name, avatar_url").in("id", missingProfileUserIds);
            if (!profilesError && profilesData) {
                const profilesMap = new Map(profilesData.map((p)=>[
                        p.id,
                        p
                    ]));
                for (const post of normalized){
                    if (!post.profiles || !post.profiles.first_name && !post.profiles.last_name) {
                        const profile = profilesMap.get(post.user_id);
                        if (profile) {
                            post.profiles = profile;
                        }
                    }
                }
            } else if (profilesError) {
                console.error("Error fetching profiles separately:", profilesError);
            }
        }
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
        // Prevent double submission
        if (submitting) {
            return;
        }
        // Validate that we have either content or images
        if (!content.trim() && imageFiles.length === 0) {
            alert("Please add a caption or an image to post.");
            return;
        }
        // Require image for community page
        if (imageFiles.length === 0) {
            alert("Please add at least one image to post in the community page.");
            return;
        }
        setSubmitting(true);
        const imageUrls = [];
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
            // Upload all images
            if (imageFiles.length > 0) {
                try {
                    for (const imageFile of imageFiles){
                        const ext = imageFile.name.split(".").pop()?.toLowerCase() || "jpg";
                        const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
                        const { error: upErr } = await supabase.storage.from("post-images").upload(path, imageFile, {
                            cacheControl: "3600",
                            upsert: false,
                            contentType: imageFile.type || "image/jpeg"
                        });
                        if (upErr) {
                            console.error("Upload error:", upErr);
                            throw new Error(`Failed to upload image: ${upErr.message}`);
                        }
                        const { data: pub } = supabase.storage.from("post-images").getPublicUrl(path);
                        imageUrls.push(pub.publicUrl);
                    }
                } catch (uploadErr) {
                    console.error("Image upload failed:", uploadErr);
                    throw new Error(`Image upload failed: ${uploadErr.message || "Unknown error"}`);
                }
            }
            // Insert post with JSON array of image URLs (or single URL for backward compatibility)
            const imageUrlValue = imageUrls.length === 1 ? imageUrls[0] : JSON.stringify(imageUrls);
            const { error: insertError, data: _insertData } = await supabase.from("posts").insert({
                content: content.trim() || "",
                image_url: imageUrlValue,
                user_id: userId
            }).select().single();
            if (insertError) {
                console.error("Insert error:", insertError);
                // Better error logging
                const errorDetails = insertError.details || insertError.hint || insertError.message || JSON.stringify(insertError);
                throw new Error(`Failed to create post: ${errorDetails}`);
            }
            // Success - clear form and reload posts
            setContent("");
            // Revoke object URLs to prevent memory leaks
            imagePreviews.forEach((preview)=>{
                URL.revokeObjectURL(preview);
            });
            setImageFiles([]);
            setImagePreviews([]);
            setCurrentImageIndex(0);
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            // Reload posts
            await loadPosts(userId);
            setIsComposerOpen(false);
        } catch (err) {
            console.error("Error in submitPost:", err);
            const errorMessage = err?.message || err?.error?.message || "Failed to post. Please try again.";
            alert(errorMessage);
        // Don't clear form on error - let user retry with same content/images
        // Keep the previews so user can retry
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
            setSelectedPost({
                ...selectedPost,
                liked_by_me: !wasLiked,
                likes_count: Math.max(0, (selectedPost.likes_count ?? 0) + (wasLiked ? -1 : 1))
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
                        setSelectedPost({
                            ...selectedPost,
                            liked_by_me: wasLiked,
                            likes_count: selectedPost.likes_count ?? 0
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
                            setSelectedPost({
                                ...selectedPost,
                                liked_by_me: wasLiked,
                                likes_count: selectedPost.likes_count ?? 0
                            });
                        }
                        return;
                    }
                }
            }
            // Reload posts to get accurate counts
            await loadPosts(userId);
            // Update selectedPost with fresh data
            const updatedPosts = await supabase.from("posts").select(`id, user_id, content, image_url, created_at, profiles(id, first_name, last_name, avatar_url),
           likes_count:likes(count), comments_count:comments(count)`).eq("id", post.id).single();
            if (updatedPosts.data && selectedPost && selectedPost.id === post.id) {
                const normalized = {
                    ...updatedPosts.data,
                    profiles: extractProfile(updatedPosts.data.profiles),
                    likes_count: Array.isArray(updatedPosts.data.likes_count) ? updatedPosts.data.likes_count[0]?.count ?? 0 : updatedPosts.data.likes_count ?? 0,
                    comments_count: Array.isArray(updatedPosts.data.comments_count) ? updatedPosts.data.comments_count[0]?.count ?? 0 : updatedPosts.data.comments_count ?? 0,
                    liked_by_me: false
                };
                // Check if user liked this post
                const { data: myLike } = await supabase.from("likes").select("post_id").eq("post_id", post.id).eq("user_id", userId).maybeSingle();
                normalized.liked_by_me = !!myLike;
                setSelectedPost(normalized);
            }
        } catch (error) {
            console.error("Error in toggleLike:", error);
            alert(error?.message || "Failed to update like. Please try again.");
        }
    }
    async function loadComments(postId) {
        const { data, error } = await supabase.from("comments").select("id, post_id, user_id, content, created_at, profiles(id, first_name, last_name, avatar_url)").eq("post_id", postId).order("created_at", {
            ascending: true
        });
        if (error) {
            console.error("Error loading comments:", error);
            return alert(error.message);
        }
        const normalizedComments = data.map((comment)=>({
                ...comment,
                profiles: extractProfile(comment.profiles)
            }));
        // If profiles are missing, try to fetch them separately
        const missingProfileUserIds = normalizedComments.filter((c)=>!c.profiles || !c.profiles.first_name && !c.profiles.last_name).map((c)=>c.user_id).filter((id, index, self)=>self.indexOf(id) === index); // unique IDs
        if (missingProfileUserIds.length > 0) {
            const { data: profilesData, error: profilesError } = await supabase.from("profiles").select("id, first_name, last_name, avatar_url").in("id", missingProfileUserIds);
            if (!profilesError && profilesData) {
                const profilesMap = new Map(profilesData.map((p)=>[
                        p.id,
                        p
                    ]));
                for (const comment of normalizedComments){
                    if (!comment.profiles || !comment.profiles.first_name && !comment.profiles.last_name) {
                        const profile = profilesMap.get(comment.user_id);
                        if (profile) {
                            comment.profiles = profile;
                        }
                    }
                }
            }
        }
        setCommentsByPost((prev)=>({
                ...prev,
                [postId]: normalizedComments || []
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
                throw new Error(`Failed to fetch post: ${fetchError.message}`);
            }
            // Verify ownership
            if (postData.user_id !== userId) {
                alert("You can only delete your own posts.");
                return;
            }
            if (postData?.image_url) {
                // Handle both single URL and JSON array of URLs
                let imageUrls = [];
                try {
                    const parsed = JSON.parse(postData.image_url);
                    if (Array.isArray(parsed)) {
                        imageUrls = parsed;
                    } else {
                        imageUrls = [
                            postData.image_url
                        ];
                    }
                } catch  {
                    imageUrls = [
                        postData.image_url
                    ];
                }
                // Delete all images from storage
                const filePaths = [];
                for (const imageUrl of imageUrls){
                    const urlParts = imageUrl.split("/post-images/");
                    if (urlParts.length > 1) {
                        const filePath = urlParts[1].split("?")[0];
                        filePaths.push(filePath);
                    }
                }
                if (filePaths.length > 0) {
                    const { error: storageError } = await supabase.storage.from("post-images").remove(filePaths);
                    if (storageError) {
                        console.warn("Error deleting images from storage (continuing anyway):", storageError);
                    }
                }
            }
            // Delete the post
            const { error, data } = await supabase.from("posts").delete().eq("id", postId).eq("user_id", userId).select();
            if (error) {
                console.error("Error deleting post:", error);
                throw new Error(`Failed to delete post: ${error.message}`);
            }
            if (!data || data.length === 0) {
                throw new Error("Post not found or you don't have permission to delete it.");
            }
            // Close modal if the deleted post was open
            if (selectedPost && selectedPost.id === postId) {
                closeModal();
            }
            // Reload posts
            await loadPosts(userId);
        } catch (error) {
            console.error("Error deleting post:", error);
            alert(error?.message || "Failed to delete post. Please try again.");
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
        if (!confirm("Are you sure you want to delete this comment?")) {
            return;
        }
        setDeletingComment(commentId);
        try {
            // First verify ownership
            const { data: commentData, error: fetchError } = await supabase.from("comments").select("id, user_id").eq("id", commentId).single();
            if (fetchError) {
                console.error("Error fetching comment:", fetchError);
                throw new Error(`Failed to fetch comment: ${fetchError.message}`);
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
                throw new Error(`Failed to delete comment: ${error.message}`);
            }
            if (!data || data.length === 0) {
                throw new Error("Comment not found or you don't have permission to delete it.");
            }
            // Reload comments and update post count
            await loadComments(postId);
            await loadPosts(userId);
            // Update selectedPost if it's the same post
            if (selectedPost && selectedPost.id === postId) {
                const updatedPost = posts.find((p)=>p.id === postId);
                if (updatedPost) {
                    setSelectedPost({
                        ...updatedPost,
                        comments_count: Math.max(0, (updatedPost.comments_count ?? 0) - 1)
                    });
                }
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
            alert(error?.message || "Failed to delete comment. Please try again.");
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
        // Optimistic update
        const previousCount = selectedPost?.comments_count ?? 0;
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
            const updatedPosts = await supabase.from("posts").select(`id, user_id, content, image_url, created_at, profiles(id, first_name, last_name, avatar_url),
           likes_count:likes(count), comments_count:comments(count)`).eq("id", postId).single();
            if (updatedPosts.data && selectedPost && selectedPost.id === postId) {
                const normalized = {
                    ...updatedPosts.data,
                    profiles: extractProfile(updatedPosts.data.profiles),
                    likes_count: Array.isArray(updatedPosts.data.likes_count) ? updatedPosts.data.likes_count[0]?.count ?? 0 : updatedPosts.data.likes_count ?? 0,
                    comments_count: Array.isArray(updatedPosts.data.comments_count) ? updatedPosts.data.comments_count[0]?.count ?? 0 : updatedPosts.data.comments_count ?? 0,
                    liked_by_me: selectedPost.liked_by_me
                };
                setSelectedPost(normalized);
            }
        } catch (error) {
            console.error("Error in submitComment:", error);
            alert(error?.message || "Failed to post comment. Please try again.");
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        // Reset image index when opening modal
        setCurrentPostImageIndex((prev)=>({
                ...prev,
                [post.id]: 0
            }));
        if (!commentsByPost[post.id]) {
            void loadComments(post.id);
        }
    }
    function closeModal() {
        setIsModalOpen(false);
        setSelectedPost(null);
    }
    // Helper function to get image URLs from a post (handles both single URL and JSON array)
    const getPostImages = (post)=>{
        if (!post.image_url) return [];
        try {
            // Try to parse as JSON array
            const parsed = JSON.parse(post.image_url);
            if (Array.isArray(parsed)) {
                return parsed;
            }
        } catch  {
        // If not JSON, treat as single URL string
        }
        return [
            post.image_url
        ];
    };
    // Filter posts to only show those with images
    const postsWithImages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return posts.filter((post)=>post.image_url);
    }, [
        posts
    ]);
    // Sync selectedPost with updated posts when posts change (for accurate counts)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (selectedPost && isModalOpen && posts.length > 0) {
            const updatedPost = posts.find((p)=>p.id === selectedPost.id);
            if (updatedPost) {
                // Only update if the post data has actually changed (to avoid unnecessary re-renders)
                if (updatedPost.likes_count !== selectedPost.likes_count || updatedPost.comments_count !== selectedPost.comments_count || updatedPost.liked_by_me !== selectedPost.liked_by_me) {
                    setSelectedPost(updatedPost);
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        posts,
        isModalOpen
    ]);
    // Handle paste image functionality
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handlePaste = async (e)=>{
            if (!userId || submitting) return;
            const items = e.clipboardData?.items;
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
                        // Add to images array
                        setImageFiles((prev)=>[
                                ...prev,
                                file
                            ]);
                        setImagePreviews((prev)=>[
                                ...prev,
                                URL.createObjectURL(file)
                            ]);
                        // Reset file input if it exists
                        if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                        }
                    }
                    break;
                }
            }
        };
        // Add paste event listener to the document
        document.addEventListener('paste', handlePaste);
        return ()=>{
            document.removeEventListener('paste', handlePaste);
        };
    }, [
        userId,
        submitting
    ]);
    // Cleanup object URLs on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            imagePreviews.forEach((preview)=>{
                URL.revokeObjectURL(preview);
            });
        };
    }, [
        imagePreviews
    ]);
    const handleOpenComposer = ()=>{
        if (!userId) {
            window.location.href = "/auth/login?next=/community";
            return;
        }
        setIsComposerOpen(true);
    };
    const handleCloseComposer = ()=>{
        // Clean up previews when closing
        imagePreviews.forEach((preview)=>{
            URL.revokeObjectURL(preview);
        });
        setImageFiles([]);
        setImagePreviews([]);
        setCurrentImageIndex(0);
        setIsComposerOpen(false);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const nextImage = ()=>{
        setCurrentImageIndex((prev)=>(prev + 1) % imagePreviews.length);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const prevImage = ()=>{
        setCurrentImageIndex((prev)=>(prev - 1 + imagePreviews.length) % imagePreviews.length);
    };
    const nextPostImage = (postId, totalImages)=>{
        setCurrentPostImageIndex((prev)=>({
                ...prev,
                [postId]: ((prev[postId] || 0) + 1) % totalImages
            }));
    };
    const prevPostImage = (postId, totalImages)=>{
        setCurrentPostImageIndex((prev)=>({
                ...prev,
                [postId]: ((prev[postId] || 0) - 1 + totalImages) % totalImages
            }));
    };
    const removeImage = (index)=>{
        setImageFiles((prev)=>prev.filter((_, i)=>i !== index));
        URL.revokeObjectURL(imagePreviews[index]);
        setImagePreviews((prev)=>prev.filter((_, i)=>i !== index));
        if (currentImageIndex >= imagePreviews.length - 1 && currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 animate-fade-in",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container max-w-7xl py-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl font-bold mb-6 text-gray-900 animate-fade-in-down",
                    children: "Community"
                }, void 0, false, {
                    fileName: "[project]/app/community/page.tsx",
                    lineNumber: 992,
                    columnNumber: 9
                }, this),
                loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center text-gray-500 py-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "loading-spinner mx-auto mb-4"
                        }, void 0, false, {
                            fileName: "[project]/app/community/page.tsx",
                            lineNumber: 997,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Loading…"
                        }, void 0, false, {
                            fileName: "[project]/app/community/page.tsx",
                            lineNumber: 998,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/community/page.tsx",
                    lineNumber: 996,
                    columnNumber: 11
                }, this) : postsWithImages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center text-gray-500 py-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg mb-2",
                            children: "No posts with images yet."
                        }, void 0, false, {
                            fileName: "[project]/app/community/page.tsx",
                            lineNumber: 1002,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm",
                            children: "Be the first to share a photo!"
                        }, void 0, false, {
                            fileName: "[project]/app/community/page.tsx",
                            lineNumber: 1003,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/community/page.tsx",
                    lineNumber: 1001,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4",
                    style: {
                        columnFill: 'balance'
                    },
                    children: postsWithImages.map((post, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `break-inside-avoid mb-4 bg-white rounded-lg overflow-hidden shadow-sm card-hover cursor-pointer border border-gray-200 stagger-item group`,
                            style: {
                                animationDelay: `${index * 0.05}s`
                            },
                            onClick: ()=>openPostModal(post),
                            children: (()=>{
                                const postImages = getPostImages(post);
                                // Always show first image in grid view (no navigation)
                                const currentIndex = 0;
                                return postImages.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative w-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative bg-gray-100 overflow-hidden",
                                            children: postImages.map((imgUrl, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: imgUrl,
                                                    alt: post.content || `Post image ${index + 1}`,
                                                    className: `w-full h-auto transition-opacity duration-300 ${index === currentIndex ? 'opacity-100 block' : 'opacity-0 hidden'}`,
                                                    loading: "lazy"
                                                }, index, false, {
                                                    fileName: "[project]/app/community/page.tsx",
                                                    lineNumber: 1025,
                                                    columnNumber: 27
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/page.tsx",
                                            lineNumber: 1023,
                                            columnNumber: 23
                                        }, this),
                                        postImages.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute top-2 right-2 flex items-center gap-1.5 z-10",
                                            children: postImages.map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `h-1.5 rounded-full transition-all ${index === currentIndex ? 'bg-white w-4' : 'bg-white/50 w-1.5'}`
                                                }, index, false, {
                                                    fileName: "[project]/app/community/page.tsx",
                                                    lineNumber: 1041,
                                                    columnNumber: 29
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/page.tsx",
                                            lineNumber: 1039,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 pointer-events-none",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-4 text-white text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                width: "16",
                                                                height: "16",
                                                                viewBox: "0 0 24 24",
                                                                fill: post.liked_by_me ? "currentColor" : "none",
                                                                stroke: "currentColor",
                                                                strokeWidth: "2",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/community/page.tsx",
                                                                    lineNumber: 1058,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 1057,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: post.likes_count ?? 0
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 1060,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 1056,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                width: "16",
                                                                height: "16",
                                                                viewBox: "0 0 24 24",
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                strokeWidth: "2",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M21 15a2 2 0 01-2 2H8l-4 4V5a2 2 0 012-2h13a2 2 0 012 2v10z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/community/page.tsx",
                                                                    lineNumber: 1064,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 1063,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: post.comments_count ?? 0
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 1066,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 1062,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 1055,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/page.tsx",
                                            lineNumber: 1054,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/community/page.tsx",
                                    lineNumber: 1022,
                                    columnNumber: 21
                                }, this);
                            })()
                        }, post.id, false, {
                            fileName: "[project]/app/community/page.tsx",
                            lineNumber: 1011,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/community/page.tsx",
                    lineNumber: 1006,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: handleOpenComposer,
                    className: "fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#8c52ff] text-white shadow-lg hover:scale-105 transition-transform z-50 flex items-center justify-center",
                    "aria-label": "Create community post",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        width: "24",
                        height: "24",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M12 5v14M5 12h14"
                        }, void 0, false, {
                            fileName: "[project]/app/community/page.tsx",
                            lineNumber: 1086,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/community/page.tsx",
                        lineNumber: 1085,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/community/page.tsx",
                    lineNumber: 1079,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    open: isComposerOpen,
                    onClose: handleCloseComposer,
                    title: "Share something",
                    className: "max-w-2xl",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: submitPost,
                        className: "bg-white space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 shadow-inner",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: content,
                                        onChange: (e)=>setContent(e.target.value),
                                        placeholder: userId ? "Share something with the community... (You can paste an image here!)" : "Sign in to post",
                                        className: "w-full resize-none rounded-xl border border-transparent bg-white/80 p-4 text-gray-900 placeholder:text-gray-500 focus:border-[#c9adff] focus:ring-2 focus:ring-[#d9c5ff] min-h-[160px]",
                                        disabled: !userId || submitting,
                                        onPaste: (e)=>{
                                            const items = e.clipboardData?.items;
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
                                        lineNumber: 1094,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 text-right text-xs text-gray-500",
                                        children: [
                                            content.length,
                                            "/280"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/community/page.tsx",
                                        lineNumber: 1112,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/community/page.tsx",
                                lineNumber: 1093,
                                columnNumber: 13
                            }, this),
                            imagePreviews.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-gray-200 bg-gray-50 p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mb-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-medium text-gray-700",
                                            children: [
                                                imagePreviews.length,
                                                " image",
                                                imagePreviews.length > 1 ? 's' : '',
                                                " selected"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/community/page.tsx",
                                            lineNumber: 1117,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/community/page.tsx",
                                        lineNumber: 1116,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: imagePreviews.map((preview, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-300 bg-gray-100 group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: preview,
                                                        alt: `Preview ${index + 1}`,
                                                        className: "w-full h-full object-cover"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 1125,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: (e)=>{
                                                            e.stopPropagation();
                                                            removeImage(index);
                                                        },
                                                        className: "absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100",
                                                        "aria-label": "Remove image",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            width: "12",
                                                            height: "12",
                                                            viewBox: "0 0 24 24",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            strokeWidth: "3",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M18 6L6 18M6 6l12 12"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 1141,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/community/page.tsx",
                                                            lineNumber: 1140,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 1131,
                                                        columnNumber: 23
                                                    }, this),
                                                    imagePreviews.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute bottom-0.5 left-0.5 px-1.5 py-0.5 rounded bg-black/50 text-white text-xs font-medium",
                                                        children: index + 1
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 1146,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, index, true, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 1121,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/community/page.tsx",
                                        lineNumber: 1119,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/community/page.tsx",
                                lineNumber: 1115,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "inline-flex items-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 cursor-pointer transition",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                ref: fileInputRef,
                                                type: "file",
                                                accept: "image/*",
                                                multiple: true,
                                                className: "hidden",
                                                disabled: !userId || submitting,
                                                onChange: (e)=>{
                                                    const files = Array.from(e.target.files || []);
                                                    if (files.length > 0) {
                                                        const newPreviews = files.map((file)=>URL.createObjectURL(file));
                                                        setImageFiles((prev)=>[
                                                                ...prev,
                                                                ...files
                                                            ]);
                                                        setImagePreviews((prev)=>[
                                                                ...prev,
                                                                ...newPreviews
                                                            ]);
                                                    }
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 1157,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                width: "18",
                                                height: "18",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M4 16l6-6 4 4 6-6"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 1174,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M2 12l2-2 4 4 4-4 6 6 4-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 1175,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 1173,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: imageFiles.length > 0 ? `${imageFiles.length} image${imageFiles.length > 1 ? 's' : ''}` : "Add images"
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 1177,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/community/page.tsx",
                                        lineNumber: 1156,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: handleCloseComposer,
                                                className: "px-4 h-10 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50",
                                                children: "Cancel"
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 1180,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                disabled: !userId || submitting || content.length > 280 || imageFiles.length === 0,
                                                className: "px-6 h-10 rounded-full bg-[#8c52ff] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#7a46e5] transition-all btn-press btn-ripple",
                                                children: submitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "loading-spinner",
                                                            style: {
                                                                width: '16px',
                                                                height: '16px',
                                                                borderWidth: '2px'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/community/page.tsx",
                                                            lineNumber: 1194,
                                                            columnNumber: 23
                                                        }, this),
                                                        "Posting..."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/community/page.tsx",
                                                    lineNumber: 1193,
                                                    columnNumber: 21
                                                }, this) : "Post"
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 1187,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/community/page.tsx",
                                        lineNumber: 1179,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/community/page.tsx",
                                lineNumber: 1155,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/community/page.tsx",
                        lineNumber: 1092,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/community/page.tsx",
                    lineNumber: 1091,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    open: isModalOpen,
                    onClose: closeModal,
                    title: "",
                    className: "max-w-5xl p-0",
                    showCloseButton: false,
                    children: selectedPost && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full bg-white rounded-lg overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: closeModal,
                                className: "absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors",
                                "aria-label": "Close modal",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "20",
                                    height: "20",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M18 6L6 18M6 6l12 12"
                                    }, void 0, false, {
                                        fileName: "[project]/app/community/page.tsx",
                                        lineNumber: 1215,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/community/page.tsx",
                                    lineNumber: 1214,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/community/page.tsx",
                                lineNumber: 1209,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col md:flex-row max-h-[90vh]",
                                children: [
                                    (()=>{
                                        const postImages = getPostImages(selectedPost);
                                        const currentIndex = currentPostImageIndex[selectedPost.id] || 0;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "md:w-1/2 bg-white flex items-center justify-center relative",
                                            style: {
                                                minHeight: '400px',
                                                maxHeight: '90vh'
                                            },
                                            children: postImages.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative w-full h-full flex items-center justify-center p-4",
                                                        children: [
                                                            postImages.map((imgUrl, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: imgUrl,
                                                                    alt: `Post image ${index + 1}`,
                                                                    className: `max-w-full max-h-full w-auto h-auto object-contain transition-opacity duration-300 ${index === currentIndex ? 'opacity-100' : 'opacity-0 absolute'}`,
                                                                    style: {
                                                                        maxHeight: 'calc(90vh - 32px)'
                                                                    }
                                                                }, index, false, {
                                                                    fileName: "[project]/app/community/page.tsx",
                                                                    lineNumber: 1230,
                                                                    columnNumber: 31
                                                                }, this)),
                                                            postImages.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: (e)=>{
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                            prevPostImage(selectedPost.id, postImages.length);
                                                                        },
                                                                        className: "absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-10",
                                                                        "aria-label": "Previous image",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                            width: "24",
                                                                            height: "24",
                                                                            viewBox: "0 0 24 24",
                                                                            fill: "none",
                                                                            stroke: "currentColor",
                                                                            strokeWidth: "2",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                d: "M15 18l-6-6 6-6"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/community/page.tsx",
                                                                                lineNumber: 1255,
                                                                                columnNumber: 37
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/community/page.tsx",
                                                                            lineNumber: 1254,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/community/page.tsx",
                                                                        lineNumber: 1244,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: (e)=>{
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                            nextPostImage(selectedPost.id, postImages.length);
                                                                        },
                                                                        className: "absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-10",
                                                                        "aria-label": "Next image",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                            width: "24",
                                                                            height: "24",
                                                                            viewBox: "0 0 24 24",
                                                                            fill: "none",
                                                                            stroke: "currentColor",
                                                                            strokeWidth: "2",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                d: "M9 18l6-6-6-6"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/community/page.tsx",
                                                                                lineNumber: 1269,
                                                                                columnNumber: 37
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/community/page.tsx",
                                                                            lineNumber: 1268,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/community/page.tsx",
                                                                        lineNumber: 1258,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 1228,
                                                        columnNumber: 27
                                                    }, this),
                                                    postImages.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10",
                                                        children: postImages.map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: (e)=>{
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    setCurrentPostImageIndex((prev)=>({
                                                                            ...prev,
                                                                            [selectedPost.id]: index
                                                                        }));
                                                                },
                                                                className: `h-2 rounded-full transition-all ${index === currentIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75 w-2'}`,
                                                                "aria-label": `Go to image ${index + 1}`
                                                            }, index, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 1280,
                                                                columnNumber: 33
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 1278,
                                                        columnNumber: 29
                                                    }, this)
                                                ]
                                            }, void 0, true)
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/page.tsx",
                                            lineNumber: 1225,
                                            columnNumber: 21
                                        }, this);
                                    })(),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "md:w-1/2 flex flex-col max-h-[90vh] overflow-hidden relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 border-b border-gray-200 flex items-start gap-3",
                                                children: [
                                                    selectedPost.profiles?.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: selectedPost.profiles.avatar_url,
                                                        alt: getDisplayName(selectedPost.profiles, selectedPost.user_id),
                                                        className: "w-10 h-10 rounded-full object-cover flex-shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 1309,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium flex-shrink-0 text-gray-900",
                                                        children: getDisplayName(selectedPost.profiles, selectedPost.user_id).slice(0, 1).toUpperCase()
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 1315,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2 mb-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-semibold text-gray-900 text-sm",
                                                                        children: getDisplayName(selectedPost.profiles, selectedPost.user_id)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/community/page.tsx",
                                                                        lineNumber: 1321,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-gray-400",
                                                                        children: "·"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/community/page.tsx",
                                                                        lineNumber: 1322,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                                                        dateTime: selectedPost.created_at,
                                                                        className: "text-gray-500 text-xs",
                                                                        children: new Date(selectedPost.created_at).toLocaleDateString()
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/community/page.tsx",
                                                                        lineNumber: 1323,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    userId === selectedPost.user_id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: async (e)=>{
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                            await deletePost(selectedPost.id);
                                                                        },
                                                                        disabled: deletingPost === selectedPost.id,
                                                                        className: "text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed",
                                                                        title: "Delete post",
                                                                        children: deletingPost === selectedPost.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                            className: "animate-spin",
                                                                            width: "16",
                                                                            height: "16",
                                                                            viewBox: "0 0 24 24",
                                                                            fill: "none",
                                                                            stroke: "currentColor",
                                                                            strokeWidth: "2",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                d: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/community/page.tsx",
                                                                                lineNumber: 1340,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/community/page.tsx",
                                                                            lineNumber: 1339,
                                                                            columnNumber: 31
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                            width: "16",
                                                                            height: "16",
                                                                            viewBox: "0 0 24 24",
                                                                            fill: "none",
                                                                            stroke: "currentColor",
                                                                            strokeWidth: "2",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                d: "M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/community/page.tsx",
                                                                                lineNumber: 1344,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/community/page.tsx",
                                                                            lineNumber: 1343,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/community/page.tsx",
                                                                        lineNumber: 1327,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 1320,
                                                                columnNumber: 23
                                                            }, this),
                                                            selectedPost.content ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "whitespace-pre-wrap break-words text-gray-800 text-sm",
                                                                children: selectedPost.content
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 1351,
                                                                columnNumber: 25
                                                            }, this) : null
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 1319,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 1307,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-4 py-3 border-b border-gray-200",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-6",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: (e)=>{
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                toggleLike(selectedPost);
                                                            },
                                                            className: `flex items-center gap-2 transition-colors cursor-pointer hover:scale-105 ${selectedPost.liked_by_me ? "text-red-500" : "text-gray-600 hover:text-red-500"}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    width: "24",
                                                                    height: "24",
                                                                    viewBox: "0 0 24 24",
                                                                    fill: selectedPost.liked_by_me ? "currentColor" : "none",
                                                                    stroke: "currentColor",
                                                                    strokeWidth: "2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/community/page.tsx",
                                                                        lineNumber: 1369,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/community/page.tsx",
                                                                    lineNumber: 1368,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-sm",
                                                                    children: [
                                                                        selectedPost.likes_count ?? 0,
                                                                        " ",
                                                                        selectedPost.likes_count === 1 ? 'like' : 'likes'
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/community/page.tsx",
                                                                    lineNumber: 1371,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/community/page.tsx",
                                                            lineNumber: 1359,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 text-gray-600",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    width: "24",
                                                                    height: "24",
                                                                    viewBox: "0 0 24 24",
                                                                    fill: "none",
                                                                    stroke: "currentColor",
                                                                    strokeWidth: "2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M21 15a2 2 0 01-2 2H8l-4 4V5a2 2 0 012-2h13a2 2 0 012 2v10z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/community/page.tsx",
                                                                        lineNumber: 1375,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/community/page.tsx",
                                                                    lineNumber: 1374,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-sm",
                                                                    children: [
                                                                        selectedPost.comments_count ?? 0,
                                                                        " ",
                                                                        selectedPost.comments_count === 1 ? 'comment' : 'comments'
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/community/page.tsx",
                                                                    lineNumber: 1377,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/community/page.tsx",
                                                            lineNumber: 1373,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/community/page.tsx",
                                                    lineNumber: 1358,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 1357,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 overflow-y-auto p-4 space-y-4 min-h-0",
                                                children: (commentsByPost[selectedPost.id] || []).length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center text-gray-400 py-8",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm",
                                                        children: "No comments yet. Be the first to comment!"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 1386,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/community/page.tsx",
                                                    lineNumber: 1385,
                                                    columnNumber: 23
                                                }, this) : (commentsByPost[selectedPost.id] || []).map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-start gap-3 group",
                                                        children: [
                                                            c.profiles?.avatar_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: c.profiles.avatar_url,
                                                                alt: getDisplayName(c.profiles, c.user_id),
                                                                className: "w-8 h-8 rounded-full object-cover flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 1392,
                                                                columnNumber: 29
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium flex-shrink-0 text-gray-900",
                                                                children: getDisplayName(c.profiles, c.user_id).slice(0, 1).toUpperCase()
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 1398,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1 min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2 mb-1",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "font-semibold text-gray-900 text-sm",
                                                                                children: getDisplayName(c.profiles, c.user_id)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/community/page.tsx",
                                                                                lineNumber: 1404,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-gray-400",
                                                                                children: "·"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/community/page.tsx",
                                                                                lineNumber: 1405,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                                                                dateTime: c.created_at,
                                                                                className: "text-gray-500 text-xs",
                                                                                children: new Date(c.created_at).toLocaleDateString()
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/community/page.tsx",
                                                                                lineNumber: 1406,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/community/page.tsx",
                                                                        lineNumber: 1403,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "whitespace-pre-wrap break-words text-sm text-gray-800",
                                                                        children: c.content
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/community/page.tsx",
                                                                        lineNumber: 1410,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 1402,
                                                                columnNumber: 27
                                                            }, this),
                                                            userId === c.user_id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: async (e)=>{
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    await deleteComment(c.id, selectedPost.id);
                                                                },
                                                                disabled: deletingComment === c.id,
                                                                className: "opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed",
                                                                title: "Delete comment",
                                                                children: deletingComment === c.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    className: "animate-spin",
                                                                    width: "16",
                                                                    height: "16",
                                                                    viewBox: "0 0 24 24",
                                                                    fill: "none",
                                                                    stroke: "currentColor",
                                                                    strokeWidth: "2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/community/page.tsx",
                                                                        lineNumber: 1426,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/community/page.tsx",
                                                                    lineNumber: 1425,
                                                                    columnNumber: 33
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    width: "16",
                                                                    height: "16",
                                                                    viewBox: "0 0 24 24",
                                                                    fill: "none",
                                                                    stroke: "currentColor",
                                                                    strokeWidth: "2",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/community/page.tsx",
                                                                        lineNumber: 1430,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/community/page.tsx",
                                                                    lineNumber: 1429,
                                                                    columnNumber: 33
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 1413,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, c.id, true, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 1390,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 1383,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-4 border-t border-gray-200 bg-white",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                                            lineNumber: 1443,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                                            lineNumber: 1457,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/community/page.tsx",
                                                    lineNumber: 1442,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 1441,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/community/page.tsx",
                                        lineNumber: 1305,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/community/page.tsx",
                                lineNumber: 1219,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/community/page.tsx",
                        lineNumber: 1207,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/community/page.tsx",
                    lineNumber: 1205,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/community/page.tsx",
            lineNumber: 991,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/community/page.tsx",
        lineNumber: 990,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=app_0f760c33._.js.map