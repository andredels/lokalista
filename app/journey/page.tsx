"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/browserClient";

type Profile = {
  id: string;
  full_name?: string | null;
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
};

type Comment = {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles?: Profile | null;
};

export default function JourneyPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && supabaseUrl !== "https://placeholder.supabase.co";
  
  const supabase = useMemo(() => isSupabaseConfigured ? createClient() : null, [isSupabaseConfigured]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [expandedPostIds, setExpandedPostIds] = useState<Set<string>>(new Set());
  const [commentsByPost, setCommentsByPost] = useState<Record<string, Comment[]>>({});
  const [newCommentContent, setNewCommentContent] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    
    let mounted = true;
    (async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (!mounted) return;
        setUserId(data.user?.id ?? null);
        await loadPosts();
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserId(session?.user?.id ?? null);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSupabaseConfigured]);

  async function loadPosts() {
    if (!supabase || !isSupabaseConfigured) {
      return;
    }
    
    // Note: This assumes you have tables: posts, likes, comments, profiles
    // with RLS allowing read for anon and write for auth users.
    const { data, error } = await supabase
      .from("posts")
      .select(
        `id, user_id, content, created_at, profiles:profiles!posts_user_id_fkey(id, full_name),
         likes_count:likes(count), comments_count:comments(count)`
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    const normalized = (data as any[]).map((row) => ({
      ...row,
      likes_count: Array.isArray(row.likes_count) ? row.likes_count[0]?.count ?? 0 : row.likes_count ?? 0,
      comments_count: Array.isArray(row.comments_count) ? row.comments_count[0]?.count ?? 0 : row.comments_count ?? 0,
      liked_by_me: false,
    })) as Post[];

    // Mark liked_by_me for current user
    if (userId && normalized.length) {
      const postIds = normalized.map((p) => p.id);
      const { data: myLikes, error: likesErr } = await supabase
        .from("likes")
        .select("post_id")
        .eq("user_id", userId)
        .in("post_id", postIds);
      if (!likesErr && myLikes) {
        const likedSet = new Set(myLikes.map((l: any) => l.post_id));
        for (const p of normalized) p.liked_by_me = likedSet.has(p.id);
      }
    }

    setPosts(normalized);
  }

  async function submitPost(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase || !isSupabaseConfigured) {
      alert("Supabase is not configured. Please set environment variables.");
      return;
    }
    if (!userId) {
      window.location.href = "/auth/login?next=/journey";
      return;
    }
    if (!content.trim()) return;
    setSubmitting(true);
    
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

      const { error } = await supabase.from("posts").insert({ content, user_id: userId });
      if (error) {
        alert(error.message);
        return;
      }
      setContent("");
      await loadPosts();
    } catch (err: any) {
      alert(err?.message || "Failed to post.");
    } finally {
      setSubmitting(false);
    }
  }

  async function toggleLike(post: Post) {
    if (!supabase || !isSupabaseConfigured) {
      alert("Supabase is not configured. Please set environment variables.");
      return;
    }
    if (!userId) {
      window.location.href = "/auth/login?next=/journey";
      return;
    }
    
    try {
      if (post.liked_by_me) {
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
          await loadPosts();
          return;
        }

        // Now try to insert the like
        const { error } = await supabase.from("likes").insert({ post_id: post.id, user_id: userId });
        if (error) {
          console.error("Error adding like:", error);
          if (error.message.includes("duplicate key") || error.message.includes("unique constraint")) {
            // Like already exists, just refresh the data
            await loadPosts();
            return;
          } else if (error.message.includes("row-level security") || error.message.includes("USING expression")) {
            alert("Unable to like this post due to security restrictions. Please contact support.");
          } else {
            alert("Failed to like post: " + error.message);
          }
          return;
        }
      }
      await loadPosts();
    } catch (err: any) {
      console.error("Error in toggleLike:", err);
      alert("An error occurred while liking the post.");
    }
  }

  async function loadComments(postId: string) {
    if (!supabase || !isSupabaseConfigured) {
      return;
    }
    const { data, error } = await supabase
      .from("comments")
      .select("id, post_id, user_id, content, created_at, profiles:profiles!comments_user_id_fkey(id, full_name)")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    if (error) return alert(error.message);
    setCommentsByPost((prev) => ({ ...prev, [postId]: (data as Comment[]) || [] }));
  }

  async function submitComment(postId: string) {
    if (!supabase || !isSupabaseConfigured) {
      alert("Supabase is not configured. Please set environment variables.");
      return;
    }
    if (!userId) {
      window.location.href = "/auth/login?next=/journey";
      return;
    }
    const text = (newCommentContent[postId] || "").trim();
    if (!text) return;
    
    try {
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

      // Now try to insert the comment
      const { error } = await supabase.from("comments").insert({ post_id: postId, content: text, user_id: userId });
      if (error) {
        console.error("Error adding comment:", error);
        if (error.message.includes("row-level security") || error.message.includes("USING expression")) {
          alert("Unable to comment due to security restrictions. Please contact support.");
        } else {
          alert("Failed to add comment: " + error.message);
        }
        return;
      }
      setNewCommentContent((p) => ({ ...p, [postId]: "" }));
      await loadComments(postId);
      await loadPosts();
    } catch (err: any) {
      console.error("Error in submitComment:", err);
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

  function toggleExpanded(postId: string) {
    setExpandedPostIds((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
    if (!commentsByPost[postId]) void loadComments(postId);
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-2xl py-6">
        <h1 className="text-2xl font-semibold mb-4">Community</h1>

        {/* Composer */}
        <form onSubmit={submitPost} className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={userId ? "Share something with the community..." : "Sign in to post"}
            className="w-full resize-none outline-none min-h-[90px]"
            disabled={!userId || submitting}
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-sm text-gray-500">{content.length}/280</span>
            <button
              type="submit"
              disabled={!userId || submitting || !content.trim() || content.length > 280}
              className="px-4 h-9 rounded-full bg-[#8c52ff] text-white disabled:opacity-50"
            >
              {submitting ? "Posting..." : "Post"}
            </button>
          </div>
        </form>

        {/* Feed */}
        {loading ? (
          <div className="text-center text-gray-500">Loading…</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-500">No posts yet. Be the first!</div>
        ) : (
          <ul className="space-y-3">
            {posts.map((post) => (
              <li key={post.id} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                    {(post.profiles?.full_name || post.user_id || "?").slice(0, 1).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium text-gray-900">{post.profiles?.full_name || "Anonymous"}</span>
                        <span>·</span>
                        <time dateTime={post.created_at}>{new Date(post.created_at).toLocaleString()}</time>
                      </div>
                      
                      {/* Delete button for post owner */}
                      {userId === post.user_id && (
                        <button
                          onClick={() => {
                            if (confirm("Are you sure you want to delete this post?")) {
                              handleDeletePost(post.id);
                            }
                          }}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete post"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M10 11v6M14 11v6"/>
                          </svg>
                        </button>
                      )}
                    </div>
                    <p className="mt-2 whitespace-pre-wrap break-words">{post.content}</p>
                    <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                      <button onClick={() => toggleLike(post)} className={`inline-flex items-center gap-1 ${post.liked_by_me ? "text-fuchsia-600" : "hover:text-gray-900"}`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill={post.liked_by_me ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        <span>{post.likes_count ?? 0}</span>
                      </button>
                      <button onClick={() => toggleExpanded(post.id)} className="inline-flex items-center gap-1 hover:text-gray-900">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M21 15a2 2 0 01-2 2H8l-4 4V5a2 2 0 012-2h13a2 2 0 012 2v10z" stroke="currentColor" strokeWidth="1.6"/>
                        </svg>
                        <span>{post.comments_count ?? 0}</span>
                      </button>
                    </div>

                    {expandedPostIds.has(post.id) && (
                      <div className="mt-3 border-t border-gray-200 pt-3">
                        <div className="space-y-3">
                          {(commentsByPost[post.id] || []).map((c) => (
                            <div key={c.id} className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium">
                                {(c.profiles?.full_name || c.user_id || "?").slice(0, 1).toUpperCase()}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                  <span className="font-medium text-gray-900">{c.profiles?.full_name || "Anonymous"}</span>
                                  <span>·</span>
                                  <time dateTime={c.created_at}>{new Date(c.created_at).toLocaleString()}</time>
                                </div>
                                <p className="mt-1 whitespace-pre-wrap break-words text-sm">{c.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                          <input
                            type="text"
                            placeholder={userId ? "Write a comment…" : "Sign in to comment"}
                            value={newCommentContent[post.id] || ""}
                            onChange={(e) => setNewCommentContent((p) => ({ ...p, [post.id]: e.target.value }))}
                            className="flex-1 h-9 px-3 rounded-md border border-gray-300"
                            disabled={!userId}
                          />
                          <button onClick={() => submitComment(post.id)} disabled={!userId || !(newCommentContent[post.id] || "").trim()} className="px-3 h-9 rounded-md bg-gray-900 text-white disabled:opacity-50">Post</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}


