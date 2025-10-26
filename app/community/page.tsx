"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/browserClient";
import PostModal from "../ui/PostModal";

type Profile = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
};

type Post = {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles?: Profile | null;
  likes_count?: number;
  comments_count?: number;
  liked_by_me?: boolean;
  image_url?: string | null;
};

type Comment = {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles?: Profile | null;
};

export default function CommunityPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl !== "https://placeholder.supabase.co";
  
  const supabase = useMemo(() => isSupabaseConfigured ? createClient() : null, [isSupabaseConfigured]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    
    let mounted = true;
    
    // Add a timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (mounted) {
        console.warn("Loading timeout reached, setting loading to false");
        setLoading(false);
      }
    }, 10000); // 10 second timeout
    
    (async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (!mounted) return;
        const uid = data.user?.id ?? null;
        setUserId(uid);
        await loadPosts(uid);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    })();
    
    const { data: sub } = supabase.auth.onAuthStateChange(async (_e, session) => {
      const uid = session?.user?.id ?? null;
      setUserId(uid);
      await loadPosts(uid);
    });
    
    return () => {
      mounted = false;
      clearTimeout(timeout);
      sub.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSupabaseConfigured]);

  async function loadPosts(currentUserId: string | null = userId) {
    if (!supabase || !isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    
    try {
      console.log("Loading posts for user:", currentUserId);
      
      // Get posts with proper counts and like status
      const { data, error } = await supabase
        .from("posts")
        .select(`
          id, 
          user_id, 
          content, 
          image_url, 
          created_at,
          profiles:profiles!posts_user_id_fkey(id, first_name, last_name)
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading posts:", error);
        setPosts([]);
        setLoading(false);
        return;
      }

      console.log("Posts loaded:", data?.length || 0);

      // Get like counts for each post
      const postsWithCounts = await Promise.all((data || []).map(async (post) => {
        // Get like count
        const { count: likesCount } = await supabase
          .from("likes")
          .select("*", { count: "exact", head: true })
          .eq("post_id", post.id);

        // Get comment count
        const { count: commentsCount } = await supabase
          .from("comments")
          .select("*", { count: "exact", head: true })
          .eq("post_id", post.id);

        // Check if current user liked this post
        let likedByMe = false;
        if (currentUserId) {
          const { data: likeData } = await supabase
            .from("likes")
            .select("id")
            .eq("post_id", post.id)
            .eq("user_id", currentUserId)
            .single();
          likedByMe = !!likeData;
        }

        return {
          ...post,
          likes_count: likesCount || 0,
          comments_count: commentsCount || 0,
          liked_by_me: likedByMe,
        };
      }));

      console.log("Posts with counts:", postsWithCounts);
      setPosts(postsWithCounts as Post[]);
    } catch (err) {
      console.error("Error in loadPosts:", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

      async function submitPost(e: React.FormEvent) {
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
        let imageUrl: string | null = null;
        try {
          // First, ensure the user has a profile
          const { data: existingProfile } = await supabase
            .from("profiles")
            .select("id")
            .eq("id", userId)
            .single();

          if (!existingProfile) {
            // Create a basic profile for the user
            const { error: profileError } = await supabase
              .from("profiles")
              .insert({
                id: userId,
                first_name: "User",
                last_name: "User"
              });
            
            if (profileError) {
              console.warn("Could not create profile:", profileError);
              // Continue anyway, the post might still work
            }
          }

          if (imageFile) {
            const ext = imageFile.name.split(".").pop()?.toLowerCase() || "jpg";
            const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
            const { error: upErr } = await supabase.storage.from("post-images").upload(path, imageFile, {
              cacheControl: "3600",
              upsert: false,
              contentType: imageFile.type || "image/jpeg",
            });
            if (upErr) throw upErr;
            const { data: pub } = supabase.storage.from("post-images").getPublicUrl(path);
            imageUrl = pub.publicUrl;
          }
          const { error } = await supabase.from("posts").insert({ 
            content, 
            image_url: imageUrl, 
            user_id: userId 
          });
          if (error) throw error;
          setContent("");
          setImageFile(null);
          setImagePreview(null);
          await loadPosts();
        } catch (err: any) {
          alert(err?.message || "Failed to post.");
        } finally {
          setSubmitting(false);
        }
      }

  async function toggleLike(post: Post) {
    console.log("toggleLike called for post:", post.id, "liked_by_me:", post.liked_by_me);
    
    if (!supabase || !isSupabaseConfigured) {
      alert("Supabase is not configured. Please set environment variables.");
      return;
    }
    if (!userId) {
      window.location.href = "/auth/login?next=/community";
      return;
    }
    
    try {
      if (post.liked_by_me) {
        console.log("Removing like for post:", post.id);
        const { error } = await supabase.from("likes").delete().eq("post_id", post.id).eq("user_id", userId);
        if (error) {
          console.error("Error removing like:", error);
          return;
        }
      } else {
        // First ensure user has a profile (required for RLS)
        const { data: existingProfile } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", userId)
          .single();

        if (!existingProfile) {
          const { error: profileError } = await supabase
            .from("profiles")
            .insert({
              id: userId,
              first_name: "User",
              last_name: "User"
            });
          
          if (profileError) {
            console.warn("Could not create profile:", profileError);
            alert("Please complete your profile setup first.");
            return;
          }
        }

        // Check if like already exists to avoid duplicate key error
        const { data: existingLike } = await supabase
          .from("likes")
          .select("id")
          .eq("post_id", post.id)
          .eq("user_id", userId)
          .single();

        if (existingLike) {
          // Like already exists, just refresh the data
          await loadPosts(userId);
          return;
        }

        // Now try to insert the like
        const { error } = await supabase.from("likes").insert({ post_id: post.id, user_id: userId });
        if (error) {
          console.error("Error adding like:", error);
          if (error.message.includes("duplicate key") || error.message.includes("unique constraint")) {
            // Like already exists, just refresh the data
            await loadPosts(userId);
            return;
          } else if (error.message.includes("row-level security") || error.message.includes("USING expression")) {
            alert("Unable to like this post due to security restrictions. Please contact support.");
          } else {
            alert("Failed to like post: " + error.message);
          }
          return;
        }
      }
      await loadPosts(userId);
    } catch (err: any) {
      console.error("Error in toggleLike:", err);
      alert("An error occurred while liking the post.");
    }
  }

  async function handleComment(postId: string, content: string) {
    console.log("handleComment called with:", { postId, content, userId });
    
    if (!supabase || !isSupabaseConfigured) {
      alert("Supabase is not configured. Please set environment variables.");
      return;
    }
    if (!userId) {
      window.location.href = "/auth/login?next=/community";
      return;
    }
    
    try {
      // First ensure user has a profile (required for RLS)
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", userId)
        .single();

      if (!existingProfile) {
        console.log("Creating profile for user:", userId);
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({
            id: userId,
            first_name: "User",
            last_name: "User"
          });
        
        if (profileError) {
          console.warn("Could not create profile:", profileError);
          alert("Please complete your profile setup first.");
          return;
        }
      }

      console.log("Inserting comment:", { post_id: postId, content, user_id: userId });
      // Now try to insert the comment
      const { error } = await supabase.from("comments").insert({ post_id: postId, content, user_id: userId });
      if (error) {
        console.error("Error adding comment:", error);
        if (error.message.includes("row-level security") || error.message.includes("USING expression")) {
          alert("Unable to comment due to security restrictions. Please contact support.");
        } else {
          alert("Failed to add comment: " + error.message);
        }
        return;
      }
      console.log("Comment added successfully");
      await loadPosts();
    } catch (err: any) {
      console.error("Error in handleComment:", err);
      alert("An error occurred while adding the comment.");
    }
  }

  async function handleDeletePost(postId: string) {
    if (!supabase || !isSupabaseConfigured) {
      alert("Supabase is not configured. Please set environment variables.");
      return;
    }
    if (!userId) {
      return;
    }
    
    try {
      // Delete associated comments first
      await supabase.from("comments").delete().eq("post_id", postId);
      
      // Delete associated likes
      await supabase.from("likes").delete().eq("post_id", postId);
      
      // Delete the post
      const { error } = await supabase.from("posts").delete().eq("id", postId);
      if (error) throw error;
      
      // Reload posts
      await loadPosts();
    } catch (error: any) {
      alert(error?.message || "Failed to delete post.");
    }
  }

  function openModal(post: Post) {
    setSelectedPost(post);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedPost(null);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-fuchsia-500 to-violet-600 bg-clip-text text-transparent">
              Community
            </h1>
            {userId && (
              <button
                onClick={() => document.getElementById('post-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Create Post
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container py-6">
        {/* Post Form */}
        {userId && (
          <div id="post-form" className="mb-8">
            <form onSubmit={submitPost} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 flex items-center justify-center text-white font-medium">
                  {(((userId || "").slice(0, 1)).toUpperCase())}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Share with the community</h3>
                  <p className="text-sm text-gray-500">What's on your mind?</p>
                </div>
              </div>
              
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share something amazing..."
                className="w-full resize-none outline-none min-h-[120px] text-gray-900 placeholder-gray-500"
                disabled={submitting}
              />
              
              {imagePreview && (
                <div className="mt-4">
                  <img src={imagePreview} alt="Selected" className="max-h-64 rounded-lg border object-cover w-full" />
                </div>
              )}
              
              <div className="flex items-center justify-between mt-4">
                <label className="inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer hover:text-fuchsia-600 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={submitting}
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setImageFile(file);
                      setImagePreview(file ? URL.createObjectURL(file) : null);
                    }}
                  />
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <span>Add image</span>
                  {imageFile && <span className="text-gray-500">• {imageFile.name}</span>}
                </label>
                
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">{content.length}/280</span>
                  <button
                    type="submit"
                    disabled={submitting || !content.trim() || content.length > 280}
                    className="px-6 py-2 bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
                  >
                    {submitting ? "Posting..." : "Post"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Pinterest Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fuchsia-500 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading posts...</p>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
                <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-500 mb-4">Be the first to share something amazing with the community!</p>
            {!userId && (
              <a href="/auth/login" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white rounded-lg hover:opacity-90 transition-opacity">
                Sign in to post
              </a>
            )}
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="break-inside-avoid mb-6 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => openModal(post)}
              >
                {/* Image */}
                {post.image_url ? (
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image_url}
                      alt="Post image"
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      style={{ aspectRatio: 'auto' }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-400">
                      <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                )}

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 flex items-center justify-center text-white text-sm font-medium">
                      {(((post.profiles?.first_name || "") + (post.profiles?.last_name ? ` ${post.profiles.last_name}` : "")) || post.user_id || "?").slice(0, 1).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900 truncate">
                        {(post.profiles?.first_name || "") + (post.profiles?.last_name ? ` ${post.profiles.last_name}` : "") || "Anonymous"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {post.content && (
                    <p className="text-sm text-gray-700 line-clamp-3 mb-3">
                      {post.content}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill={post.liked_by_me ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" className={post.liked_by_me ? "text-red-500" : ""}>
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                            <span>{post.likes_count ?? 0}</span>
                          </div>
                      <div className="flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M21 15a2 2 0 01-2 2H8l-4 4V5a2 2 0 012-2h13a2 2 0 012 2v10z"/>
                        </svg>
                        <span>{post.comments_count ?? 0}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      Click to view
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

          {/* Modal */}
          <PostModal
            post={selectedPost}
            isOpen={isModalOpen}
            onClose={closeModal}
            userId={userId}
            onLike={toggleLike}
            onComment={handleComment}
            onDelete={handleDeletePost}
            onPostUpdate={() => loadPosts(userId)}
          />
    </div>
  );
}


