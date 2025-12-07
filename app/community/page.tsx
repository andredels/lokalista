"use client";

// Clone of journey page but with /community redirects
import { useEffect, useMemo, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/browserClient";
import Modal from "@/app/ui/Modal";

type Profile = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  avatar_url?: string | null;
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

const extractProfile = (profile: any): Profile | null => {
  if (!profile) return null;
  // Handle array case (from Supabase joins)
  if (Array.isArray(profile)) {
    return profile[0] ?? null;
  }
  // Handle object case
  if (typeof profile === 'object') {
    return profile as Profile;
  }
  return null;
};

// Helper function to get display name from profile - ONLY uses profiles table data
const getDisplayName = (profile: Profile | null | undefined, userId: string): string => {
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
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [deletingPost, setDeletingPost] = useState<string | null>(null);
  const [deletingComment, setDeletingComment] = useState<string | null>(null);
  const [currentPostImageIndex, setCurrentPostImageIndex] = useState<Record<string, number>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      const uid = data.user?.id ?? null;
      setUserId(uid);
      
      // Ensure current user's profile has first_name/last_name populated from metadata if missing
      if (uid && data.user) {
        try {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("first_name, last_name")
            .eq("id", uid)
            .single();
          
          // If profile doesn't have names, try to populate from auth metadata
          if (profileData && !profileData.first_name && !profileData.last_name) {
            const metadata = data.user.user_metadata as { full_name?: string; first_name?: string; last_name?: string };
            if (metadata?.full_name) {
              const nameParts = metadata.full_name.trim().split(/\s+/);
              const firstName = nameParts[0] || "";
              const lastName = nameParts.slice(1).join(" ") || "";
              
              if (firstName || lastName) {
                await supabase
                  .from("profiles")
                  .update({
                    first_name: firstName || null,
                    last_name: lastName || null,
                    updated_at: new Date().toISOString()
                  })
                  .eq("id", uid);
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
    const { data: sub } = supabase.auth.onAuthStateChange(async (_e, session) => {
      const uid = session?.user?.id ?? null;
      setUserId(uid);
      
      // Ensure profile is populated when user logs in
      if (uid && session?.user) {
        try {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("first_name, last_name")
            .eq("id", uid)
            .single();
          
          // If profile doesn't have names, populate from auth metadata
          if (profileData && !profileData.first_name && !profileData.last_name) {
            const metadata = session.user.user_metadata as { full_name?: string; first_name?: string; last_name?: string };
            if (metadata?.full_name) {
              const nameParts = metadata.full_name.trim().split(/\s+/);
              const firstName = nameParts[0] || "";
              const lastName = nameParts.slice(1).join(" ") || "";
              
              if (firstName || lastName) {
                await supabase
                  .from("profiles")
                  .update({
                    first_name: firstName || null,
                    last_name: lastName || null,
                    updated_at: new Date().toISOString()
                  })
                  .eq("id", uid);
              }
            } else if (metadata?.first_name || metadata?.last_name) {
              await supabase
                .from("profiles")
                .update({
                  first_name: metadata.first_name || null,
                  last_name: metadata.last_name || null,
                  updated_at: new Date().toISOString()
                })
                .eq("id", uid);
            }
          }
        } catch (e) {
          // Ignore - profile might not exist yet or RLS might prevent update
        }
      }
      
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
        `id, user_id, content, image_url, created_at, profiles(id, first_name, last_name, avatar_url),
         likes_count:likes(count), comments_count:comments(count)`
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    const normalized = (data as any[]).map((row) => ({
      ...row,
      profiles: extractProfile(row.profiles),
      likes_count: Array.isArray(row.likes_count) ? row.likes_count[0]?.count ?? 0 : row.likes_count ?? 0,
      comments_count: Array.isArray(row.comments_count) ? row.comments_count[0]?.count ?? 0 : row.comments_count ?? 0,
      liked_by_me: false,
    })) as Post[];

    // Profile data (first_name, last_name, avatar_url) is already fetched from profiles table in the query above
    // We use this data directly - if profiles don't have first_name/last_name, they need to be populated
    // Profiles are automatically populated when users log in (see login page and community page useEffect)

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
    let imageUrls: string[] = [];
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
      
      // Upload all images
      if (imageFiles.length > 0) {
        try {
          console.log(`Uploading ${imageFiles.length} image(s)...`);
          for (const imageFile of imageFiles) {
            const ext = imageFile.name.split(".").pop()?.toLowerCase() || "jpg";
            const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
            
            const { error: upErr } = await supabase
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
            imageUrls.push(pub.publicUrl);
          }
        } catch (uploadErr: any) {
          console.error("Image upload failed:", uploadErr);
          throw new Error(`Image upload failed: ${uploadErr.message || "Unknown error"}`);
        }
      }
      
      // Insert post with JSON array of image URLs (or single URL for backward compatibility)
      console.log("Inserting post...");
      const imageUrlValue = imageUrls.length === 1 ? imageUrls[0] : JSON.stringify(imageUrls);
      const { error: insertError, data: insertData } = await supabase
        .from("posts")
        .insert({ 
          content: content.trim() || "", // Use empty string instead of null to satisfy NOT NULL constraint
          image_url: imageUrlValue, 
          user_id: userId 
        })
        .select()
        .single();
      
      if (insertError) {
        console.error("Insert error:", insertError);
        // Better error logging
        const errorDetails = insertError.details || insertError.hint || insertError.message || JSON.stringify(insertError);
        throw new Error(`Failed to create post: ${errorDetails}`);
      }
      
      // Success - clear form and reload posts
      setContent("");
      
      // Revoke object URLs to prevent memory leaks
      imagePreviews.forEach(preview => {
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
      console.log("Post created successfully. Reloading posts...");
      await loadPosts(userId);
      setIsComposerOpen(false);
      
    } catch (err: any) {
      console.error("Error in submitPost:", err);
      const errorMessage = err?.message || err?.error?.message || "Failed to post. Please try again.";
      alert(errorMessage);
      
      // Don't clear form on error - let user retry with same content/images
      // Keep the previews so user can retry
    } finally {
      // Always reset submitting state
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
          `id, user_id, content, image_url, created_at, profiles(id, first_name, last_name, avatar_url),
           likes_count:likes(count), comments_count:comments(count)`
        )
        .eq("id", post.id)
        .single();
      
      if (updatedPosts.data && selectedPost && selectedPost.id === post.id) {
        const normalized = {
          ...updatedPosts.data,
          profiles: extractProfile(updatedPosts.data.profiles),
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
      .select("id, post_id, user_id, content, created_at, profiles(id, first_name, last_name, avatar_url)")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    if (error) return alert(error.message);
    const normalizedComments = (data as any[]).map((comment) => ({
      ...comment,
      profiles: extractProfile(comment.profiles),
    })) as Comment[];
    
    setCommentsByPost((prev) => ({ ...prev, [postId]: normalizedComments || [] }));
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
        // Handle both single URL and JSON array of URLs
        let imageUrls: string[] = [];
        try {
          const parsed = JSON.parse(postData.image_url);
          if (Array.isArray(parsed)) {
            imageUrls = parsed;
          } else {
            imageUrls = [postData.image_url];
          }
        } catch {
          imageUrls = [postData.image_url];
        }
        
        // Delete all images from storage
        const filePaths: string[] = [];
        for (const imageUrl of imageUrls) {
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
          `id, user_id, content, image_url, created_at, profiles(id, first_name, last_name, avatar_url),
           likes_count:likes(count), comments_count:comments(count)`
        )
        .eq("id", postId)
        .single();
      
      if (updatedPosts.data && selectedPost && selectedPost.id === postId) {
        const normalized = {
          ...updatedPosts.data,
          profiles: extractProfile(updatedPosts.data.profiles),
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
    // Reset image index when opening modal
    setCurrentPostImageIndex(prev => ({ ...prev, [post.id]: 0 }));
    if (!commentsByPost[post.id]) {
      void loadComments(post.id);
    }
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedPost(null);
  }

  // Helper function to get image URLs from a post (handles both single URL and JSON array)
  const getPostImages = (post: Post): string[] => {
    if (!post.image_url) return [];
    try {
      // Try to parse as JSON array
      const parsed = JSON.parse(post.image_url);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      // If not JSON, treat as single URL string
    }
    return [post.image_url];
  };

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
            
            // Add to images array
            setImageFiles(prev => [...prev, file]);
            setImagePreviews(prev => [...prev, URL.createObjectURL(file)]);
            
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
    
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [userId, submitting]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      imagePreviews.forEach(preview => {
        URL.revokeObjectURL(preview);
      });
    };
  }, [imagePreviews]);

  const handleOpenComposer = () => {
    if (!userId) {
      window.location.href = "/auth/login?next=/community";
      return;
    }
    setIsComposerOpen(true);
  };

  const handleCloseComposer = () => {
    // Clean up previews when closing
    imagePreviews.forEach(preview => {
      URL.revokeObjectURL(preview);
    });
    setImageFiles([]);
    setImagePreviews([]);
    setCurrentImageIndex(0);
    setIsComposerOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imagePreviews.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imagePreviews.length) % imagePreviews.length);
  };

  const nextPostImage = (postId: string, totalImages: number) => {
    setCurrentPostImageIndex((prev) => ({
      ...prev,
      [postId]: ((prev[postId] || 0) + 1) % totalImages
    }));
  };

  const prevPostImage = (postId: string, totalImages: number) => {
    setCurrentPostImageIndex((prev) => ({
      ...prev,
      [postId]: ((prev[postId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(imagePreviews[index]);
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    if (currentImageIndex >= imagePreviews.length - 1 && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 animate-fade-in">
      <div className="container max-w-7xl py-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 animate-fade-in-down">Community</h1>

        {/* Pinterest-style Masonry Grid */}
        {loading ? (
          <div className="text-center text-gray-500 py-12">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p>Loading…</p>
          </div>
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
            {postsWithImages.map((post, index) => (
              <div
                key={post.id}
                className={`break-inside-avoid mb-4 bg-white rounded-lg overflow-hidden shadow-sm card-hover cursor-pointer border border-gray-200 stagger-item group`}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => openPostModal(post)}
              >
                {(() => {
                  const postImages = getPostImages(post);
                  // Always show first image in grid view (no navigation)
                  const currentIndex = 0;
                  return postImages.length > 0 && (
                    <div className="relative w-full">
                      <div className="relative bg-gray-100 overflow-hidden">
                        {postImages.map((imgUrl, index) => (
                          <img
                            key={index}
                            src={imgUrl}
                            alt={post.content || `Post image ${index + 1}`}
                            className={`w-full h-auto transition-opacity duration-300 ${
                              index === currentIndex ? 'opacity-100 block' : 'opacity-0 hidden'
                            }`}
                            loading="lazy"
                          />
                        ))}
                      </div>
                      
                      {/* Dots Indicator - Only show if multiple images */}
                      {postImages.length > 1 && (
                        <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10">
                          {postImages.map((_, index) => (
                            <div
                              key={index}
                              className={`h-1.5 rounded-full transition-all ${
                                index === currentIndex
                                  ? 'bg-white w-4'
                                  : 'bg-white/50 w-1.5'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      
                      {/* Overlay with likes and comments count */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 pointer-events-none">
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
                  );
                })()}
              </div>
            ))}
          </div>
        )}

        {/* Floating Create Button */}
        <button
          type="button"
          onClick={handleOpenComposer}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#8c52ff] text-white shadow-lg hover:scale-105 transition-transform z-50 flex items-center justify-center"
          aria-label="Create community post"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </button>

        {/* Composer Modal */}
        <Modal open={isComposerOpen} onClose={handleCloseComposer} title="Share something" className="max-w-2xl">
          <form onSubmit={submitPost} className="bg-white space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 shadow-inner">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={userId ? "Share something with the community... (You can paste an image here!)" : "Sign in to post"}
                className="w-full resize-none rounded-xl border border-transparent bg-white/80 p-4 text-gray-900 placeholder:text-gray-500 focus:border-[#c9adff] focus:ring-2 focus:ring-[#d9c5ff] min-h-[160px]"
                disabled={!userId || submitting}
                onPaste={(e) => {
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
              <div className="mt-2 text-right text-xs text-gray-500">{content.length}/280</div>
            </div>
            {imagePreviews.length > 0 && (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-700">{imagePreviews.length} image{imagePreviews.length > 1 ? 's' : ''} selected</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-300 bg-gray-100 group"
                    >
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                        className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Remove image"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                      </button>
                      {/* Image number badge */}
                      {imagePreviews.length > 1 && (
                        <div className="absolute bottom-0.5 left-0.5 px-1.5 py-0.5 rounded bg-black/50 text-white text-xs font-medium">
                          {index + 1}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label className="inline-flex items-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 cursor-pointer transition">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  disabled={!userId || submitting}
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length > 0) {
                      const newPreviews = files.map(file => URL.createObjectURL(file));
                      setImageFiles(prev => [...prev, ...files]);
                      setImagePreviews(prev => [...prev, ...newPreviews]);
                    }
                  }}
                />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 16l6-6 4 4 6-6"/>
                  <path d="M2 12l2-2 4 4 4-4 6 6 4-4"/>
                </svg>
                <span>{imageFiles.length > 0 ? `${imageFiles.length} image${imageFiles.length > 1 ? 's' : ''}` : "Add images"}</span>
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCloseComposer}
                  className="px-4 h-10 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!userId || submitting || content.length > 280 || imageFiles.length === 0}
                  className="px-6 h-10 rounded-full bg-[#8c52ff] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#7a46e5] transition-all btn-press btn-ripple"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <div className="loading-spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></div>
                      Posting...
                    </span>
                  ) : "Post"}
                </button>
              </div>
            </div>
          </form>
        </Modal>

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
                {(() => {
                  const postImages = getPostImages(selectedPost);
                  const currentIndex = currentPostImageIndex[selectedPost.id] || 0;
                  return (
                    <div className="md:w-1/2 bg-white flex items-center justify-center relative" style={{ minHeight: '400px', maxHeight: '90vh' }}>
                      {postImages.length > 0 && (
                        <>
                          <div className="relative w-full h-full flex items-center justify-center p-4">
                            {postImages.map((imgUrl, index) => (
                              <img
                                key={index}
                                src={imgUrl}
                                alt={`Post image ${index + 1}`}
                                className={`max-w-full max-h-full w-auto h-auto object-contain transition-opacity duration-300 ${
                                  index === currentIndex ? 'opacity-100' : 'opacity-0 absolute'
                                }`}
                                style={{ maxHeight: 'calc(90vh - 32px)' }}
                              />
                            ))}
                            
                            {/* Navigation Arrows */}
                            {postImages.length > 1 && (
                              <>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    prevPostImage(selectedPost.id, postImages.length);
                                  }}
                                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-10"
                                  aria-label="Previous image"
                                >
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6"/>
                                  </svg>
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    nextPostImage(selectedPost.id, postImages.length);
                                  }}
                                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-10"
                                  aria-label="Next image"
                                >
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6"/>
                                  </svg>
                                </button>
                              </>
                            )}
                          </div>
                          
                          {/* Dots Indicator */}
                          {postImages.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                              {postImages.map((_, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setCurrentPostImageIndex(prev => ({ ...prev, [selectedPost.id]: index }));
                                  }}
                                  className={`h-2 rounded-full transition-all ${
                                    index === currentIndex
                                      ? 'bg-white w-8'
                                      : 'bg-white/50 hover:bg-white/75 w-2'
                                  }`}
                                  aria-label={`Go to image ${index + 1}`}
                                />
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })()}

                {/* Content Section */}
                <div className="md:w-1/2 flex flex-col max-h-[90vh] overflow-hidden relative">
                  {/* Author and Caption Section - Combined */}
                  <div className="p-4 border-b border-gray-200 flex items-start gap-3">
                    {selectedPost.profiles?.avatar_url ? (
                      <img
                        src={selectedPost.profiles.avatar_url}
                        alt={getDisplayName(selectedPost.profiles, selectedPost.user_id)}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium flex-shrink-0 text-gray-900">
                        {getDisplayName(selectedPost.profiles, selectedPost.user_id).slice(0, 1).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-900 text-sm">{getDisplayName(selectedPost.profiles, selectedPost.user_id)}</span>
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
                          {c.profiles?.avatar_url ? (
                            <img
                              src={c.profiles.avatar_url}
                              alt={getDisplayName(c.profiles, c.user_id)}
                              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium flex-shrink-0 text-gray-900">
                              {getDisplayName(c.profiles, c.user_id).slice(0, 1).toUpperCase()}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-gray-900 text-sm">{getDisplayName(c.profiles, c.user_id)}</span>
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


