# Lokalista AI Assistant - Gemini-Style Implementation Guide

## Overview
Your AI assistant has been transformed into a **Gemini-style conversational interface** that provides visual restaurant recommendation cards instead of plain text responses.

## How It Works

### 1. **User Input Processing**
When a user types a query like "suggest me good coffee spot that has cozy vibes in cebu city", the system:
- Analyzes keywords in the query
- Searches through a restaurant database
- Returns matching recommendations with rich visual cards

### 2. **Restaurant Database**
Located in `app/feed/page.tsx`, the database contains:
```typescript
interface Restaurant {
  id: string;
  name: string;
  category: string;
  rating: number;
  price_range: string;
  location: string;
  vibe: string;
  menu?: string[];
  image: string;
  tip?: string;
  latitude?: number;
  longitude?: number;
}
```

### 3. **Smart Recommendations**
The `generateRecommendations()` function:
- **Coffee/Cafe**: Finds cafes and cozy places
- **Budget**: Filters by price range ($)
- **Fast Food**: Shows quick meal options
- **Local/Filipino**: Displays authentic Filipino restaurants
- **General**: Returns top 3 recommendations by default

### 4. **Visual Card Display**
Each restaurant card shows:
- **Image**: Visual preview of the location
- **Rating**: Star rating (e.g., 4.4)
- **Category**: Type of establishment
- **Location**: Full address
- **Vibe**: Atmosphere description
- **Price Range**: $, $$, or $$$
- **Menu Highlights**: Sample items (up to 3)
- **Pro Tip**: Helpful tip in a highlighted box
- **View on Map**: Button to navigate to the location

### 5. **Features**
- ✅ **Keyword Matching**: Recognizes intent from natural language
- ✅ **Multiple Recommendations**: Shows 2-3 options in grid layout
- ✅ **Rich Information**: Location, vibe, menu, tips
- ✅ **Visual Elements**: Images and structured data
- ✅ **Map Integration**: "View on Map" button routes to map page
- ✅ **Responsive Design**: Works on mobile and desktop

## Example Queries & Responses

### Query: "Good coffee spot with cozy vibes"
**Response:** 
- Bintana Coffee House (4.4 ⭐, Filipino Restaurant)
  - Location: 181 K Elizabeth Pond St.
  - Vibe: Art-filled and quiet
  - Menu: Cold Coffee, Sagada Beans
  - Tip: Visit during off-peak hours

### Query: "Budget-friendly restaurants"
**Response:**
- Shows restaurants with price_range = "$"
- Includes Jollibee, Chowking, Mang Inasal

### Query: "Fast food"
**Response:**
- Filters by category = "Fast Food"
- Shows quick meal options with $ pricing

## UI Components

### Chat Interface
- **Blue bubbles**: User messages
- **Gray bubbles**: AI responses
- **Restaurant Cards**: Visual recommendation cards with images

### Restaurant Card Layout
```
┌─────────────────────────────────┐
│  [Restaurant Image]            │
│                                 │
├─────────────────────────────────┤
│  Name        Rating ⭐          │
│  Category                       │
│                                 │
│  📍 Location: Full Address      │
│  ✨ Vibe: Description           │
│  💰 Price: $/$$/$$$            │
│  🍽️ Menu: Items                │
│  💡 Tip: Helpful advice        │
│                                 │
│  [View on Map Button]           │
└─────────────────────────────────┘
```

## Implementation Details

### Message Interface
```typescript
interface Message {
  id: string;
  content?: string;
  isUser: boolean;
  timestamp: Date;
  restaurants?: Restaurant[];
  isTyping?: boolean;
}
```

### Key Functions
1. **handleSendMessage()**: Processes user query and generates response
2. **generateRecommendations()**: Finds matching restaurants
3. **handleViewOnMap()**: Routes to map with restaurant coordinates

## Future Enhancements

### Option 1: Real AI Integration
Replace keyword matching with:
- Google Gemini API
- OpenAI GPT-4
- Anthropic Claude

**Implementation:**
```typescript
const aiResponse = await fetch('/api/ai', {
  method: 'POST',
  body: JSON.stringify({ query: userInput })
});
```

### Option 2: Connect to Real Restaurant Data
Instead of hardcoded database, use:
- OpenStreetMap API (already in your map)
- Google Places API
- Supabase database

### Option 3: Add Features
- Image search for restaurants
- Voice input
- Favorite saving
- History tracking
- Price alerts

## Technical Architecture

```
User Query
    ↓
handleSendMessage()
    ↓
generateRecommendations()
    ↓
Keyword Analysis
    ↓
Filter Database
    ↓
Return Matching Restaurants
    ↓
Display Visual Cards
```

## Testing Different Queries

Try these in your app:

1. **"Good coffee spot that has cozy vibes in Cebu"**
   → Returns: Bintana Coffee House, Starbucks, Coffee Bean

2. **"Budget-friendly fast food"**
   → Returns: Jollibee, Chowking, Mang Inasal

3. **"Local Filipino cuisine"**
   → Returns: Bintana, Mang Inasal, Chowking

4. **"Expensive restaurants"**
   → Returns: Starbucks, Coffee Bean ($$$ category)

## File Structure

```
app/feed/page.tsx           # Main AI assistant component
├── Restaurant interface     # Data model
├── restaurantDatabase        # Hardcoded data (6 restaurants)
├── generateRecommendations() # Keyword matching logic
├── handleSendMessage()      # Query processing
└── handleViewOnMap()        # Map navigation

lib/restaurants.ts           # Can be integrated for real data
```

## Next Steps

1. **Add More Restaurants**: Expand `restaurantDatabase` array
2. **Integrate Real AI**: Connect to Gemini/OpenAI API
3. **Add Images**: Upload actual restaurant photos to `/public`
4. **Connect to Map**: Ensure coordinates match map markers
5. **User Preferences**: Save favorite recommendations in Supabase

---

**Current Status**: ✅ Working with hardcoded data
**Next Goal**: Integrate with real AI API or expand to use map restaurant data


