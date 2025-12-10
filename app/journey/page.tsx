"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

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
  const supabase = useMemo(() => createClient(), []);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [expandedPostIds, setExpandedPostIds] = useState<Set<string>>(new Set());
  const [commentsByPost, setCommentsByPost] = useState<Record<string, Comment[]>>({});
  const [newCommentContent, setNewCommentContent] = useState<Record<string, string>>({});

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      setUserId(data.user?.id ?? null);
      await loadPosts();
      setLoading(false);
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserId(session?.user?.id ?? null);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadPosts() {
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
    if (!userId) {
      window.location.href = "/auth/login?next=/journey";
      return;
    }
    if (!content.trim()) return;
    setSubmitting(true);
    const { error } = await supabase.from("posts").insert({ content });
    setSubmitting(false);
    if (error) {
      alert(error.message);
      return;
    }
    setContent("");
    await loadPosts();
  }

  async function toggleLike(post: Post) {
    if (!userId) {
      window.location.href = "/auth/login?next=/journey";
      return;
    }
    if (post.liked_by_me) {
      const { error } = await supabase.from("likes").delete().match({ post_id: post.id, user_id: userId });
      if (error) return alert(error.message);
    } else {
      const { error } = await supabase.from("likes").insert({ post_id: post.id, user_id: userId });
      if (error) return alert(error.message);
    }
    await loadPosts();
  }

  async function loadComments(postId: string) {
    const { data, error } = await supabase
      .from("comments")
      .select("id, post_id, user_id, content, created_at, profiles:profiles!comments_user_id_fkey(id, full_name)")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    if (error) return alert(error.message);
    const normalized: Comment[] =
      (data || []).map((row) => ({
        ...row,
        // Supabase sometimes returns relational selects as an array; take the first profile.
        profiles: Array.isArray(row.profiles) ? row.profiles[0] ?? null : row.profiles ?? null,
      })) ?? [];
    setCommentsByPost((prev) => ({ ...prev, [postId]: normalized }));
  }

  async function submitComment(postId: string) {
    if (!userId) {
      window.location.href = "/auth/login?next=/journey";
      return;
    }
    const text = (newCommentContent[postId] || "").trim();
    if (!text) return;
    const { error } = await supabase.from("comments").insert({ post_id: postId, content: text, user_id: userId });
    if (error) return alert(error.message);
    setNewCommentContent((p) => ({ ...p, [postId]: "" }));
    await loadComments(postId);
    await loadPosts();
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
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-medium text-gray-900">{post.profiles?.full_name || "Anonymous"}</span>
                      <span>·</span>
                      <time dateTime={post.created_at}>{new Date(post.created_at).toLocaleString()}</time>
                    </div>
                    <p className="mt-2 whitespace-pre-wrap break-words">{post.content}</p>
                    <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                      <button onClick={() => toggleLike(post)} className={`inline-flex items-center gap-1 ${post.liked_by_me ? "text-fuchsia-600" : "hover:text-gray-900"}`}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M12 21s-7-4.5-7-10a7 7 0 0114 0c0 5.5-7 10-7 10z" stroke="currentColor" strokeWidth="1.6"/>
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


