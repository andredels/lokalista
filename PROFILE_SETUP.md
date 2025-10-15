# Profile Edit Page Setup

This document explains how to set up the profile editing functionality for your Lokalista app.

## Features

The edit profile page includes:

- **Profile Picture Upload**: Users can upload and change their profile pictures
- **Personal Information**: Full name, location, website, and bio
- **Preferences**: Dietary restrictions, favorite cuisines, price range, and atmosphere preferences
- **Form Validation**: Client-side validation for all inputs
- **Responsive Design**: Works on desktop and mobile devices

## Database Setup

### 1. Run the SQL Setup Script

Execute the `supabase-setup.sql` file in your Supabase SQL editor:

```sql
-- The script creates:
-- - profiles table with user information
-- - Storage bucket for avatar images
-- - Row Level Security policies
-- - Triggers for automatic profile creation
```

### 2. Required Environment Variables

Make sure you have these environment variables set in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Storage Configuration

The setup script creates an `avatars` storage bucket. Make sure:

1. The bucket is set to public
2. Row Level Security policies are in place
3. File upload size limits are configured (default: 5MB max)

## File Structure

```
app/
├── profile/
│   └── edit/
│       └── page.tsx          # Main profile edit page
├── ui/
│   └── Header.tsx            # Updated with profile link
└── lib/
    └── supabase/
        └── browserClient.ts  # Supabase client
```

## Usage

### Accessing the Profile Edit Page

Users can access the profile edit page by:

1. Clicking on their profile avatar in the header
2. Selecting "Edit Profile" from the dropdown menu
3. Direct navigation to `/profile/edit`

### Profile Fields

#### Basic Information
- **Email**: Read-only (cannot be changed)
- **Full Name**: User's display name
- **Location**: City, Country format
- **Website**: Must start with http:// or https://
- **Bio**: Optional description (max 500 characters)

#### Preferences
- **Dietary Restrictions**: Multiple selection from predefined options
- **Favorite Cuisines**: Multiple selection from cuisine types
- **Price Range**: Single selection ($, $$, $$$, $$$$)
- **Atmosphere**: Multiple selection from atmosphere types

### Image Upload

- **Supported formats**: JPG, PNG
- **Maximum size**: 5MB
- **Storage**: Supabase Storage bucket `avatars`
- **Security**: Users can only upload/update their own avatars

## API Endpoints

The profile edit page interacts with:

### Supabase Tables
- `profiles`: Stores user profile information
- `auth.users`: Authentication user data

### Supabase Storage
- `avatars` bucket: Stores profile pictures

## Security Features

1. **Row Level Security**: Users can only access their own profile data
2. **File Upload Security**: Avatar uploads are restricted to the user's own files
3. **Input Validation**: Client-side validation for all form inputs
4. **Authentication**: Page redirects to login if user is not authenticated

## Customization

### Adding New Preference Categories

To add new preference categories:

1. Update the `UserProfile` interface in `page.tsx`
2. Add new form fields in the preferences section
3. Update the database schema if needed

### Styling Changes

The page uses Tailwind CSS classes consistent with the app's design system:
- Primary color: `#8c52ff` (purple)
- Background: `#eadbfd` (light purple)
- Form styling matches the login/signup pages

### Validation Rules

Current validation rules:
- Full name: minimum 2 characters
- Bio: maximum 500 characters
- Website: must be valid URL
- Image: max 5MB, image files only

## Troubleshooting

### Common Issues

1. **Image upload fails**: Check storage bucket permissions and file size
2. **Profile not loading**: Verify database table exists and RLS policies are correct
3. **Form validation errors**: Check input values meet requirements

### Debug Mode

Add console logging to debug issues:

```typescript
// In the profile edit page
console.log('Profile data:', profile);
console.log('Upload error:', error);
```

## Future Enhancements

Potential improvements:
- Profile picture cropping/resizing
- Social media links
- Notification preferences
- Privacy settings
- Profile completion progress
