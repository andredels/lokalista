"use client";

// Clone of journey page but with /community redirects
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/browserClient";
import Modal from "@/app/ui/Modal";

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
  const supabase = useMemo(() => createClient(), []);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [expandedPostIds, setExpandedPostIds] = useState<Set<string>>(new Set());
  const [commentsByPost, setCommentsByPost] = useState<Record<string, Comment[]>>({});
  const [newCommentContent, setNewCommentContent] = useState<Record<string, string>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingPost, setDeletingPost] = useState<string | null>(null);
  const [deletingComment, setDeletingComment] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      const uid = data.user?.id ?? null;
      setUserId(uid);
      await loadPosts(uid);
      setLoading(false);
    })();
    const { data: sub } = supabase.auth.onAuthStateChange(async (_e, session) => {
      const uid = session?.user?.id ?? null;
      setUserId(uid);
      await loadPosts(uid);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadPosts(currentUserId: string | null = userId) {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `id, user_id, content, image_url, created_at, profiles:profiles!posts_user_id_fkey(id, first_name, last_name),
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

    if (currentUserId && normalized.length) {
      const postIds = normalized.map((p) => p.id);
      const { data: myLikes, error: likesErr } = await supabase
        .from("likes")
        .select("post_id")
        .eq("user_id", currentUserId)
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
    let imageUrl: string | null = null;
    console.log("Submitting post...");

    try {
      // Ensure user has a profile before posting (to satisfy foreign key constraint)
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", userId)
        .maybeSingle();
      
      if (profileError && profileError.code !== 'PGRST116') {
        console.error("Error checking profile:", profileError);
      }
      
      // Create a basic profile if it doesn't exist
      if (!profileData) {
        const { error: createProfileError } = await supabase
          .from("profiles")
          .upsert({
            id: userId,
            first_name: null,
            last_name: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }, { onConflict: "id" });
        
        if (createProfileError) {
          console.error("Error creating profile:", createProfileError);
          // Continue anyway - might work if RLS allows it
        }
      }
      
      // Upload image if provided
      if (imageFile) {
        try {
          console.log("Uploading image...");
          const ext = imageFile.name.split(".").pop()?.toLowerCase() || "jpg";
          const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
          
          const { error: upErr, data: uploadData } = await supabase
            .storage
            .from("post-images")
            .upload(path, imageFile, {
              cacheControl: "3600",
              upsert: false,
              contentType: imageFile.type || "image/jpeg",
            });
          
          if (upErr) {
            console.error("Upload error:", upErr);
            throw new Error(`Failed to upload image: ${upErr.message}`);
          }
          
          const { data: pub } = supabase.storage.from("post-images").getPublicUrl(path);
          imageUrl = pub.publicUrl;
        } catch (uploadErr: any) {
          console.error("Image upload failed:", uploadErr);
          throw new Error(`Image upload failed: ${uploadErr.message || "Unknown error"}`);
        }
      }
      
      // Insert post
      console.log("Inserting post...");
      const { error: insertError, data: insertData } = await supabase
        .from("posts")
        .insert({ 
          content: content.trim() || null, 
          image_url: imageUrl, 
          user_id: userId 
        })
        .select()
        .single();
      
      if (insertError) {
        console.error("Insert error:", insertError);
        throw new Error(`Failed to create post: ${insertError.message}`);
      }
      
      // Success - clear form and reload posts
      setContent("");
      setImageFile(null);
      setImagePreview(null);
      
      // Reload posts
      console.log("Post created successfully. Reloading posts...");
      await loadPosts(userId);
      
    } catch (err: any) {
      console.error("Error in submitPost:", err);
      const errorMessage = err?.message || err?.error?.message || "Failed to post. Please try again.";
      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  }

  async function toggleLike(post: Post) {
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
        const { error } = await supabase.from("likes").delete().match({ post_id: post.id, user_id: userId });
        if (error) {
          console.error("Error unliking post:", error);
          alert(error.message);
          // Revert optimistic update on error
          if (selectedPost && selectedPost.id === post.id) {
            setSelectedPost({
              ...selectedPost,
              liked_by_me: wasLiked,
              likes_count: (selectedPost.likes_count ?? 0)
            });
          }
          return;
        }
      } else {
        // Check if like already exists to avoid duplicate key errors
        const { data: existingLike } = await supabase
          .from("likes")
          .select("id")
          .eq("post_id", post.id)
          .eq("user_id", userId)
          .maybeSingle();
        
        if (!existingLike) {
          const { error } = await supabase
            .from("likes")
            .insert({ post_id: post.id, user_id: userId });
          if (error) {
            console.error("Error liking post:", error);
            alert(error.message);
            // Revert optimistic update on error
            if (selectedPost && selectedPost.id === post.id) {
              setSelectedPost({
                ...selectedPost,
                liked_by_me: wasLiked,
                likes_count: (selectedPost.likes_count ?? 0)
              });
            }
            return;
          }
        }
      }
      
      // Reload posts to get accurate counts
      await loadPosts(userId);
      
      // Update selectedPost with fresh data
      const updatedPosts = await supabase
        .from("posts")
        .select(
          `id, user_id, content, image_url, created_at, profiles:profiles!posts_user_id_fkey(id, first_name, last_name),
           likes_count:likes(count), comments_count:comments(count)`
        )
        .eq("id", post.id)
        .single();
      
      if (updatedPosts.data && selectedPost && selectedPost.id === post.id) {
        const normalized = {
          ...updatedPosts.data,
          likes_count: Array.isArray(updatedPosts.data.likes_count) ? updatedPosts.data.likes_count[0]?.count ?? 0 : updatedPosts.data.likes_count ?? 0,
          comments_count: Array.isArray(updatedPosts.data.comments_count) ? updatedPosts.data.comments_count[0]?.count ?? 0 : updatedPosts.data.comments_count ?? 0,
          liked_by_me: false,
        } as Post;
        
        // Check if user liked this post
        const { data: myLike } = await supabase
          .from("likes")
          .select("post_id")
          .eq("post_id", post.id)
          .eq("user_id", userId)
          .maybeSingle();
        
        normalized.liked_by_me = !!myLike;
        setSelectedPost(normalized);
      }
    } catch (error: any) {
      console.error("Error in toggleLike:", error);
      alert(error?.message || "Failed to update like. Please try again.");
    }
  }

  async function loadComments(postId: string) {
    const { data, error } = await supabase
      .from("comments")
      .select("id, post_id, user_id, content, created_at, profiles:profiles!comments_user_id_fkey(id, first_name, last_name)")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    if (error) return alert(error.message);
    setCommentsByPost((prev) => ({ ...prev, [postId]: (data as Comment[]) || [] }));
  }

  async function deletePost(postId: string) {
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
      const { data: postData, error: fetchError } = await supabase
        .from("posts")
        .select("image_url, user_id")
        .eq("id", postId)
        .single();
      
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
        // Extract path from URL
        const urlParts = postData.image_url.split("/post-images/");
        if (urlParts.length > 1) {
          const filePath = urlParts[1].split("?")[0];
          const { error: storageError } = await supabase.storage.from("post-images").remove([filePath]);
          if (storageError) {
            console.warn("Error deleting image from storage (continuing anyway):", storageError);
          }
        }
      }
      
      // Delete the post
      const { error, data } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId)
        .eq("user_id", userId)
        .select();
      
      if (error) {
        console.error("Error deleting post:", error);
        throw new Error(`Failed to delete post: ${error.message}`);
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
    } catch (error: any) {
      console.error("Error deleting post:", error);
      alert(error?.message || "Failed to delete post. Please try again.");
    } finally {
      setDeletingPost(null);
    }
  }

  async function deleteComment(commentId: string, postId: string) {
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
      const { data: commentData, error: fetchError } = await supabase
        .from("comments")
        .select("id, user_id")
        .eq("id", commentId)
        .single();
      
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
      const { error, data } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId)
        .eq("user_id", userId)
        .select();
      
      if (error) {
        console.error("Error deleting comment:", error);
        throw new Error(`Failed to delete comment: ${error.message}`);
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
        const updatedPost = posts.find(p => p.id === postId);
        if (updatedPost) {
          setSelectedPost({
            ...updatedPost,
            comments_count: Math.max(0, (updatedPost.comments_count ?? 0) - 1)
          });
        }
      }
    } catch (error: any) {
      console.error("Error deleting comment:", error);
      alert(error?.message || "Failed to delete comment. Please try again.");
    } finally {
      setDeletingComment(null);
    }
  }

  async function submitComment(postId: string) {
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
    setNewCommentContent((p) => ({ ...p, [postId]: "" }));
    
    try {
      const { error, data } = await supabase
        .from("comments")
        .insert({ post_id: postId, content: text, user_id: userId })
        .select()
        .single();
      
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
        setNewCommentContent((p) => ({ ...p, [postId]: text }));
        return;
      }
      
      // Reload comments to show the new one
      await loadComments(postId);
      
      // Reload posts to get accurate comment count
      await loadPosts(userId);
      
      // Update selectedPost with fresh data
      const updatedPosts = await supabase
        .from("posts")
        .select(
          `id, user_id, content, image_url, created_at, profiles:profiles!posts_user_id_fkey(id, first_name, last_name),
           likes_count:likes(count), comments_count:comments(count)`
        )
        .eq("id", postId)
        .single();
      
      if (updatedPosts.data && selectedPost && selectedPost.id === postId) {
        const normalized = {
          ...updatedPosts.data,
          likes_count: Array.isArray(updatedPosts.data.likes_count) ? updatedPosts.data.likes_count[0]?.count ?? 0 : updatedPosts.data.likes_count ?? 0,
          comments_count: Array.isArray(updatedPosts.data.comments_count) ? updatedPosts.data.comments_count[0]?.count ?? 0 : updatedPosts.data.comments_count ?? 0,
          liked_by_me: selectedPost.liked_by_me, // Preserve like status
        } as Post;
        
        setSelectedPost(normalized);
      }
    } catch (error: any) {
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
      setNewCommentContent((p) => ({ ...p, [postId]: text }));
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

  function openPostModal(post: Post) {
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
  const postsWithImages = useMemo(() => {
    return posts.filter(post => post.image_url);
  }, [posts]);

  // Sync selectedPost with updated posts when posts change (for accurate counts)
  useEffect(() => {
    if (selectedPost && isModalOpen && posts.length > 0) {
      const updatedPost = posts.find(p => p.id === selectedPost.id);
      if (updatedPost) {
        // Only update if the post data has actually changed (to avoid unnecessary re-renders)
        if (updatedPost.likes_count !== selectedPost.likes_count || 
            updatedPost.comments_count !== selectedPost.comments_count ||
            updatedPost.liked_by_me !== selectedPost.liked_by_me) {
          setSelectedPost(updatedPost);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts, isModalOpen]);

  // Handle paste image functionality
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      if (!userId || submitting) return;
      
      const items = e.clipboardData?.items;
      if (!items) return;

      // Look for image in clipboard
      for (let i = 0; i < items.length; i++) {
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
            
            // Set the image file and preview
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
          }
          break;
        }
      }
    };

    // Add paste event listener to the document
    document.addEventListener('paste', handlePaste);
    
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [userId, submitting]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-7xl py-6">
        <h1 className="text-3xl font-bold mb-6">Community</h1>

        {/* Composer */}
        <form onSubmit={submitPost} className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={userId ? "Share something with the community... (You can paste an image here!)" : "Sign in to post"}
            className="w-full resize-none outline-none min-h-[90px]"
            disabled={!userId || submitting}
            onPaste={(e) => {
              // Let the global paste handler handle images
              // This prevents default text paste behavior for images
              const items = e.clipboardData?.items;
              if (items) {
                for (let i = 0; i < items.length; i++) {
                  if (items[i].type.indexOf('image') !== -1) {
                    e.preventDefault();
                    return;
                  }
                }
              }
            }}
          />
          {imagePreview && (
            <div className="mt-3">
              <img src={imagePreview} alt="Selected" className="max-h-64 rounded-lg border" />
            </div>
          )}
          <div className="flex items-center justify-between mt-3">
            <label className="inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={!userId || submitting}
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setImageFile(file);
                  setImagePreview(file ? URL.createObjectURL(file) : null);
                }}
              />
              <span className="px-3 h-9 inline-flex items-center rounded-md border border-gray-300 hover:bg-gray-50">📷 Add image</span>
              {imageFile && <span className="text-gray-500 text-sm">{imageFile.name}</span>}
            </label>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">{content.length}/280</span>
              <button
                type="submit"
                disabled={!userId || submitting || content.length > 280 || !imageFile}
                className="px-4 h-9 rounded-full bg-[#8c52ff] text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </form>

        {/* Pinterest-style Masonry Grid */}
        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading…</div>
        ) : postsWithImages.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p className="text-lg mb-2">No posts with images yet.</p>
            <p className="text-sm">Be the first to share a photo!</p>
          </div>
        ) : (
          <div 
            className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4"
            style={{ columnFill: 'balance' }}
          >
            {postsWithImages.map((post) => (
              <div
                key={post.id}
                className="break-inside-avoid mb-4 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
                onClick={() => openPostModal(post)}
              >
                {post.image_url && (
                  <div className="relative w-full">
                    <img
                      src={post.image_url}
                      alt={post.content || "Post image"}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                    {/* Overlay with likes and comments count */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <div className="flex items-center gap-4 text-white text-sm">
                        <div className="flex items-center gap-1">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill={post.liked_by_me ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                          </svg>
                          <span>{post.likes_count ?? 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 01-2 2H8l-4 4V5a2 2 0 012-2h13a2 2 0 012 2v10z"/>
                          </svg>
                          <span>{post.comments_count ?? 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Post Detail Modal */}
        <Modal open={isModalOpen} onClose={closeModal} title="" className="max-w-5xl p-0" showCloseButton={false}>
          {selectedPost && (
            <div className="w-full bg-white rounded-lg overflow-hidden">
              {/* Close button in top right */}
              <button 
                onClick={closeModal} 
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>

              <div className="flex flex-col md:flex-row max-h-[90vh]">
                {/* Image Section */}
                <div className="md:w-1/2 bg-black flex items-center justify-center">
                  {selectedPost.image_url && (
                    <img 
                      src={selectedPost.image_url} 
                      alt="Post image" 
                      className="w-full h-auto max-h-[90vh] object-contain" 
                    />
                  )}
                </div>

                {/* Content Section */}
                <div className="md:w-1/2 flex flex-col max-h-[90vh] overflow-hidden relative">
                  {/* Author and Caption Section - Combined */}
                  <div className="p-4 border-b border-gray-200 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {(((selectedPost.profiles?.first_name || "") + (selectedPost.profiles?.last_name ? ` ${selectedPost.profiles.last_name}` : "")) || selectedPost.user_id || "?").slice(0, 1).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-900 text-sm">{(selectedPost.profiles?.first_name || "").toString() + (selectedPost.profiles?.last_name ? ` ${selectedPost.profiles.last_name}` : "") || "Anonymous"}</span>
                        <span className="text-gray-400">·</span>
                        <time dateTime={selectedPost.created_at} className="text-gray-500 text-xs">
                          {new Date(selectedPost.created_at).toLocaleDateString()}
                        </time>
                        {userId === selectedPost.user_id && (
                          <button
                            type="button"
                            onClick={async (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              await deletePost(selectedPost.id);
                            }}
                            disabled={deletingPost === selectedPost.id}
                            className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete post"
                          >
                            {deletingPost === selectedPost.id ? (
                              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                              </svg>
                            ) : (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/>
                              </svg>
                            )}
                          </button>
                        )}
                      </div>
                      {selectedPost.content ? (
                        <p className="whitespace-pre-wrap break-words text-gray-800 text-sm">{selectedPost.content}</p>
                      ) : null}
                    </div>
                  </div>

                  {/* Likes and Comments Actions */}
                  <div className="px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center gap-6">
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleLike(selectedPost);
                        }} 
                        className={`flex items-center gap-2 transition-colors cursor-pointer hover:scale-105 ${selectedPost.liked_by_me ? "text-red-500" : "text-gray-600 hover:text-red-500"}`}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill={selectedPost.liked_by_me ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        <span className="font-semibold text-sm">{selectedPost.likes_count ?? 0} {selectedPost.likes_count === 1 ? 'like' : 'likes'}</span>
                      </button>
                      <div className="flex items-center gap-2 text-gray-600">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 01-2 2H8l-4 4V5a2 2 0 012-2h13a2 2 0 012 2v10z"/>
                        </svg>
                        <span className="font-semibold text-sm">{selectedPost.comments_count ?? 0} {selectedPost.comments_count === 1 ? 'comment' : 'comments'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Comments Section - Scrollable */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                    {(commentsByPost[selectedPost.id] || []).length === 0 ? (
                      <div className="text-center text-gray-400 py-8">
                        <p className="text-sm">No comments yet. Be the first to comment!</p>
                      </div>
                    ) : (
                      (commentsByPost[selectedPost.id] || []).map((c) => (
                        <div key={c.id} className="flex items-start gap-3 group">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium flex-shrink-0">
                            {(((c.profiles?.first_name || "") + (c.profiles?.last_name ? ` ${c.profiles.last_name}` : "")) || c.user_id || "?").slice(0, 1).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-gray-900 text-sm">{(c.profiles?.first_name || "") + (c.profiles?.last_name ? ` ${c.profiles.last_name}` : "") || "Anonymous"}</span>
                              <span className="text-gray-400">·</span>
                              <time dateTime={c.created_at} className="text-gray-500 text-xs">
                                {new Date(c.created_at).toLocaleDateString()}
                              </time>
                            </div>
                            <p className="whitespace-pre-wrap break-words text-sm text-gray-800">{c.content}</p>
                          </div>
                          {userId === c.user_id && (
                            <button
                              type="button"
                              onClick={async (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                await deleteComment(c.id, selectedPost.id);
                              }}
                              disabled={deletingComment === c.id}
                              className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Delete comment"
                            >
                              {deletingComment === c.id ? (
                                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                                </svg>
                              ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/>
                                </svg>
                              )}
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Comment Input - Fixed at bottom */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder={userId ? "Add a comment…" : "Sign in to comment"}
                        value={newCommentContent[selectedPost.id] || ""}
                        onChange={(e) => setNewCommentContent((p) => ({ ...p, [selectedPost.id]: e.target.value }))}
                        className="flex-1 h-10 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent outline-none text-sm"
                        disabled={!userId}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey && userId && (newCommentContent[selectedPost.id] || "").trim()) {
                            e.preventDefault();
                            submitComment(selectedPost.id);
                          }
                        }}
                      />
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          submitComment(selectedPost.id);
                        }} 
                        disabled={!userId || !(newCommentContent[selectedPost.id] || "").trim()} 
                        className="px-4 h-10 rounded-md bg-[#8c52ff] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 text-sm font-medium"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}


