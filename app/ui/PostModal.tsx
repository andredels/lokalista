"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/browserClient";

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

interface PostModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
  onLike: (post: Post) => void;
  onComment: (postId: string, content: string) => void;
  onDelete?: (postId: string) => void;
  onPostUpdate?: () => void;
}

export default function PostModal({ post, isOpen, onClose, userId, onLike, onComment, onDelete, onPostUpdate }: PostModalProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    if (isOpen && post) {
      loadComments();
    }
  }, [isOpen, post]);

  async function loadComments() {
    if (!post) return;
    
    setLoadingComments(true);
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("id, post_id, user_id, content, created_at, profiles:profiles!comments_user_id_fkey(id, first_name, last_name)")
        .eq("post_id", post.id)
        .order("created_at", { ascending: true });
      
      if (error) {
        console.error("Error loading comments:", error);
        return;
      }
      
      setComments((data as Comment[]) || []);
    } catch (error) {
      console.error("Error loading comments:", error);
    } finally {
      setLoadingComments(false);
    }
  }

  async function handleComment() {
    if (!post || !newComment.trim() || submittingComment) return;
    
    setSubmittingComment(true);
    try {
      await onComment(post.id, newComment.trim());
      setNewComment("");
      await loadComments();
      // Refresh post data to update comment count
      if (onPostUpdate) {
        onPostUpdate();
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Failed to post comment. Please try again.");
    } finally {
      setSubmittingComment(false);
    }
  }

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col lg:flex-row h-full">
          {/* Image Section */}
          <div className="lg:w-1/2 bg-gray-100 flex items-center justify-center">
            {post.image_url ? (
              <img 
                src={post.image_url} 
                alt="Post image" 
                className="max-h-[70vh] lg:max-h-full w-full object-contain"
              />
            ) : (
              <div className="text-gray-400 text-center p-8">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="mx-auto mb-4">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <p>No image available</p>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 flex items-center justify-center text-white font-medium">
                    {(((post.profiles?.first_name || "") + (post.profiles?.last_name ? ` ${post.profiles.last_name}` : "")) || post.user_id || "?").slice(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {(post.profiles?.first_name || "") + (post.profiles?.last_name ? ` ${post.profiles.last_name}` : "") || "Anonymous"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                {/* Delete button for post owner */}
                {userId === post.user_id && onDelete && (
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this post?")) {
                        onDelete(post.id);
                        onClose();
                      }
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete post"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M10 11v6M14 11v6"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Caption */}
            {post.content && (
              <div className="p-4 border-b border-gray-200">
                <p className="text-gray-900 whitespace-pre-wrap">{post.content}</p>
              </div>
            )}

            {/* Actions */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-6">
                <button 
                  onClick={async () => {
                    await onLike(post);
                    // Refresh post data to update like count
                    if (onPostUpdate) {
                      onPostUpdate();
                    }
                  }}
                  className={`flex items-center gap-2 transition-colors cursor-pointer hover:scale-105 ${post.liked_by_me ? "text-red-500" : "text-gray-600 hover:text-red-500"}`}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={post.liked_by_me ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  <span className="font-medium">{post.likes_count ?? 0}</span>
                </button>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15a2 2 0 01-2 2H8l-4 4V5a2 2 0 012-2h13a2 2 0 012 2v10z"/>
                  </svg>
                  <span className="font-medium">{post.comments_count ?? 0}</span>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="flex-1 flex flex-col min-h-0 flex-shrink-0">
              <div className="flex-1 overflow-y-auto p-4 min-h-0">
                {loadingComments ? (
                  <div className="text-center text-gray-500 py-4">Loading comments...</div>
                ) : comments.length === 0 ? (
                  <div className="text-center text-gray-500 py-4">No comments yet</div>
                ) : (
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                          {(((comment.profiles?.first_name || "") + (comment.profiles?.last_name ? ` ${comment.profiles.last_name}` : "")) || comment.user_id || "?").slice(0, 1).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm text-gray-900">
                              {(comment.profiles?.first_name || "") + (comment.profiles?.last_name ? ` ${comment.profiles.last_name}` : "") || "Anonymous"}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(comment.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-900 break-words">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Comment Input - Fixed positioning */}
              {userId && (
                <div className="p-4 border-t border-gray-200 flex-shrink-0">
                  <div className="flex gap-2 w-full">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none min-w-0"
                      onKeyPress={(e) => e.key === "Enter" && handleComment()}
                    />
                    <button
                      onClick={handleComment}
                      disabled={!newComment.trim() || submittingComment}
                      className="px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex-shrink-0"
                    >
                      {submittingComment ? "Posting..." : "Post"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
