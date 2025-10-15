"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/browserClient";
import { useRouter } from "next/navigation";

interface UserProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  age?: number;
  sex?: string;
  bio?: string;
  avatar_url?: string;
}

export default function EditProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const supabase = createClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        router.push("/auth/login");
        return;
      }

      // Get user profile from profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error loading profile:', profileError);
      }

      const userProfile: UserProfile = {
        id: user.id,
        email: user.email || '',
        first_name: profileData?.first_name || '',
        last_name: profileData?.last_name || '',
        age: profileData?.age || undefined,
        sex: profileData?.sex || '',
        bio: profileData?.bio || '',
        avatar_url: profileData?.avatar_url || ''
      };

      setProfile(userProfile);
      setImagePreview(userProfile.avatar_url || null);
    } catch (error) {
      console.error('Error loading profile:', error);
      setMessage('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (!profile) return;
    
    setProfile(prev => ({
      ...prev!,
      [field]: field === 'age' ? (value ? parseInt(value) : undefined) : value
    }));
    setErrors(prev => ({
      ...prev,
      [field]: ''
    }));
  };


  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, avatar: 'Please select a valid image file' }));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, avatar: 'Image size must be less than 5MB' }));
      return;
    }

    try {
      setSaving(true);
      const supabase = createClient();
      
      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${profile!.id}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: profile!.id,
          avatar_url: publicUrl,
          updated_at: new Date().toISOString()
        });

      if (updateError) {
        throw updateError;
      }

      setProfile(prev => ({ ...prev!, avatar_url: publicUrl }));
      setImagePreview(publicUrl);
      setErrors(prev => ({ ...prev, avatar: '' }));
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrors(prev => ({ ...prev, avatar: 'Failed to upload image' }));
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    // Validate form
    const newErrors: { [key: string]: string } = {};
    
    if (profile.first_name && profile.first_name.length < 1) {
      newErrors.first_name = 'First name is required';
    }
    
    if (profile.last_name && profile.last_name.length < 1) {
      newErrors.last_name = 'Last name is required';
    }
    
    if (profile.bio && profile.bio.length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters';
    }

    if (profile.age && (profile.age < 13 || profile.age > 120)) {
      newErrors.age = 'Age must be between 13 and 120';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setSaving(true);
      setMessage(null);
      const supabase = createClient();

      // Update profile in database
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: profile.id,
          first_name: profile.first_name,
          last_name: profile.last_name,
          age: profile.age,
          sex: profile.sex,
          bio: profile.bio,
          updated_at: new Date().toISOString()
        });

      if (error) {
        throw error;
      }

      setMessage('Profile updated successfully!');
      setTimeout(() => router.push('/dashboard'), 1500);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#eadbfd" }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8c52ff] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#eadbfd" }}>
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load profile</p>
          <button 
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 bg-[#8c52ff] text-white rounded-md hover:opacity-90"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen" style={{ backgroundColor: "#eadbfd" }}>
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-8 w-8 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 grid place-items-center text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 21s7-4.5 7-10a7 7 0 10-14 0c0 5.5 7 10 7 10z" stroke="currentColor" strokeWidth="1.6"/>
                  <circle cx="12" cy="11" r="2" fill="currentColor" />
                </svg>
              </span>
              <span className="text-lg font-semibold bg-gradient-to-r from-fuchsia-500 to-violet-600 bg-clip-text text-transparent">Lokalista</span>
            </div>
            <h1 className="h1 mb-2">Edit Profile</h1>
            <p className="text-muted">Update your personal information and preferences</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-6 md:p-7 rounded-xl border border-border/60 bg-background shadow-sm">
              
              {/* Profile Picture Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Profile Picture</label>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {imagePreview ? (
                        <img 
                          src={imagePreview} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={saving}
                      className="px-4 py-2 bg-[#8c52ff] text-white rounded-md hover:opacity-90 disabled:opacity-60 text-sm"
                    >
                      {saving ? 'Uploading...' : 'Change Photo'}
                    </button>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {errors.avatar && <div className="text-sm text-red-600 mt-2">{errors.avatar}</div>}
              </div>

              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full h-11 px-3 rounded-md border border-border/60 bg-gray-50 text-gray-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="first_name">First Name</label>
                    <input
                      id="first_name"
                      type="text"
                      value={profile.first_name || ''}
                      onChange={(e) => handleInputChange('first_name', e.target.value)}
                      placeholder="Enter your first name"
                      className="w-full h-11 px-3 rounded-md border border-border/60 focus-ring"
                    />
                    {errors.first_name && <div className="text-sm text-red-600 mt-1">{errors.first_name}</div>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="last_name">Last Name</label>
                    <input
                      id="last_name"
                      type="text"
                      value={profile.last_name || ''}
                      onChange={(e) => handleInputChange('last_name', e.target.value)}
                      placeholder="Enter your last name"
                      className="w-full h-11 px-3 rounded-md border border-border/60 focus-ring"
                    />
                    {errors.last_name && <div className="text-sm text-red-600 mt-1">{errors.last_name}</div>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="age">Age</label>
                    <input
                      id="age"
                      type="number"
                      value={profile.age || ''}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      placeholder="Your age"
                      min="13"
                      max="120"
                      className="w-full h-11 px-3 rounded-md border border-border/60 focus-ring"
                    />
                    {errors.age && <div className="text-sm text-red-600 mt-1">{errors.age}</div>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="sex">Gender</label>
                    <select
                      id="sex"
                      value={profile.sex || ''}
                      onChange={(e) => handleInputChange('sex', e.target.value)}
                      className="w-full h-11 px-3 rounded-md border border-border/60 focus-ring"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    value={profile.bio || ''}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={3}
                    maxLength={500}
                    className="w-full px-3 py-2 rounded-md border border-border/60 focus-ring resize-none"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Optional</span>
                    <span>{(profile.bio || '').length}/500</span>
                  </div>
                  {errors.bio && <div className="text-sm text-red-600 mt-1">{errors.bio}</div>}
                </div>
              </div>
            </div>


            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 h-11 rounded-md bg-[#8c52ff] text-white hover:opacity-90 disabled:opacity-60"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/dashboard')}
                className="px-6 h-11 rounded-md border border-border/60 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>

            {message && (
              <div className={`text-center text-sm p-3 rounded-md ${
                message.includes('success') 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message}
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <a href="/dashboard" className="text-sm underline underline-offset-4 text-[#8c52ff]">
              Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
