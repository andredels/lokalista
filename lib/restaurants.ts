// Shared restaurant data fetching utilities

export interface FoodPlace {
  id: string;
  name: string;
  category: string;
  rating: number;
  price_range: string;
  latitude: number;
  longitude: number;
  description: string;
  image_url?: string;
  cuisine_type?: string;
  is_open?: boolean;
  features?: string[];
  distance?: number;
  trend?: string; // For trending indicators
}

export async function fetchRealFoodPlaces(centerLatLng: [number, number]): Promise<FoodPlace[]> {
  const [lat, lon] = centerLatLng;
  const radius = 1000; // 1km radius
  
  // OpenStreetMap Overpass API query for restaurants, cafes, and fast food
  const query = `
[out:json][timeout:25];
(
  node["amenity"="restaurant"](around:${radius},${lat},${lon});
  node["amenity"="cafe"](around:${radius},${lat},${lon});
  node["amenity"="fast_food"](around:${radius},${lat},${lon});
  node["amenity"="bar"](around:${radius},${lat},${lon});
  node["amenity"="pub"](around:${radius},${lat},${lon});
  node["amenity"="food_court"](around:${radius},${lat},${lon});
  node["shop"="bakery"](around:${radius},${lat},${lon});
  node["shop"="confectionery"](around:${radius},${lat},${lon});
);
out;
`;

  const response = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: query,
    headers: {
      'Content-Type': 'text/plain',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  // Transform OpenStreetMap data to our format
  const places: FoodPlace[] = data.elements.map((element: any, index: number) => {
    const tags = element.tags || {};
    
    // Determine category and cuisine type
    let category = 'Restaurant';
    let cuisineType = 'International';
    
    if (tags.amenity === 'cafe') {
      category = 'Cafe';
      cuisineType = 'Coffee';
    } else if (tags.amenity === 'fast_food') {
      category = 'Fast Food';
      cuisineType = 'Fast Food';
    } else if (tags.amenity === 'bar' || tags.amenity === 'pub') {
      category = 'Bar';
      cuisineType = 'International';
    } else if (tags.shop === 'bakery') {
      category = 'Bakery';
      cuisineType = 'Bakery';
    }
    
    // Determine cuisine type from tags
    if (tags.cuisine) {
      cuisineType = tags.cuisine;
    } else if (tags.brand) {
      const brand = tags.brand.toLowerCase();
      if (brand.includes('jollibee') || brand.includes('chowking') || brand.includes('mang inasal')) {
        cuisineType = 'Filipino';
      } else if (brand.includes('mcdonalds') || brand.includes('kfc') || brand.includes('subway')) {
        cuisineType = 'American';
      } else if (brand.includes('starbucks') || brand.includes('coffee bean')) {
        cuisineType = 'Coffee';
      }
    }
    
    // Generate random rating (since OSM doesn't have ratings)
    const rating = 3.5 + Math.random() * 1.5; // 3.5 to 5.0
    
    // Determine price range
    let priceRange = '$$';
    if (tags.amenity === 'cafe' && tags.brand && tags.brand.toLowerCase().includes('starbucks')) {
      priceRange = '$$$';
    } else if (tags.amenity === 'restaurant' && !tags.amenity === 'fast_food') {
      priceRange = Math.random() > 0.5 ? '$$$' : '$$';
    }
    
    return {
      id: `osm_${element.id || index}`,
      name: tags.name || tags.brand || 'Unnamed Place',
      category: category,
      rating: Math.round(rating * 10) / 10,
      price_range: priceRange,
      latitude: element.lat,
      longitude: element.lon,
      description: tags.description || tags.cuisine || category,
      cuisine_type: cuisineType,
      is_open: true
    };
  });

  return places;
}

// Get trending restaurants from real data
export async function getTrendingRestaurants(centerLatLng: [number, number]): Promise<FoodPlace[]> {
  try {
    const places = await fetchRealFoodPlaces(centerLatLng);
    
    // Sort by rating and take top 8 as trending
    const trending = places
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8)
      .map((place, index) => ({
        ...place,
        // Add trend indicators based on position
        trend: index === 0 ? '🔥 Hot' : 
               index === 1 ? '📈 Rising' : 
               index === 2 ? '⭐ Popular' : 
               index === 3 ? '🚀 Trending' : 
               index === 4 ? '👑 Top' : 
               index === 5 ? '💫 New' : 
               index === 6 ? '🏆 Classic' : 
               '🎯 Trending'
      }));
    
    return trending;
  } catch (error) {
    console.error('Error fetching trending restaurants:', error);
    return [];
  }
}
