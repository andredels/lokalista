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

function getDistanceKm(a: [number, number], b: [number, number]): number {
  const R = 6371; // Earth radius in km
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLon = ((b[1] - a[1]) * Math.PI) / 180;
  const lat1 = (a[0] * Math.PI) / 180;
  const lat2 = (b[0] * Math.PI) / 180;

  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);
  const aCalc =
    sinDLat * sinDLat +
    sinDLon * sinDLon * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(aCalc), Math.sqrt(1 - aCalc));
  return R * c;
}

// Fallback data for Cebu City when API fails
const getCebuFallbackPlaces = (centerLatLng: [number, number]): FoodPlace[] => {
  // Popular places in Cebu City with accurate fixed coordinates
  const basePlaces: FoodPlace[] = [
    {
      id: 'cebu_jollibee_it_park',
      name: 'Jollibee IT Park',
      category: 'Fast Food',
      rating: 4.2,
      price_range: '$',
      latitude: 10.330393,
      longitude: 123.903347,
      description: 'Skyrise 1, Cebu IT Park, Lahug',
      cuisine_type: 'Filipino',
      is_open: true,
      image_url: '/Landing.png'
    },
    {
      id: 'cebu_starbucks_ayala',
      name: 'Starbucks - Ayala Center Cebu',
      category: 'Cafe',
      rating: 4.5,
      price_range: '$$$',
      latitude: 10.317347,
      longitude: 123.905759,
      description: 'Level 3, The Terraces, Ayala Center Cebu',
      cuisine_type: 'Coffee',
      is_open: true,
      image_url: '/Landing.png'
    },
    {
      id: 'cebu_chowking_ayala',
      name: 'Chowking Ayala Center',
      category: 'Fast Food',
      rating: 4.0,
      price_range: '$',
      latitude: 10.316706,
      longitude: 123.905578,
      description: 'Ayala Center Cebu, Archbishop Reyes Ave',
      cuisine_type: 'Filipino',
      is_open: true,
      image_url: '/Landing.png'
    },
    {
      id: 'cebu_mcdo_fuente',
      name: "McDonald's Fuente Osmeña",
      category: 'Fast Food',
      rating: 4.1,
      price_range: '$',
      latitude: 10.310230,
      longitude: 123.893420,
      description: 'Fuente Osmeña Circle, Cebu City',
      cuisine_type: 'American',
      is_open: true,
      image_url: '/Landing.png'
    },
    {
      id: 'cebu_mang_inasal_sm',
      name: 'Mang Inasal SM City Cebu',
      category: 'Restaurant',
      rating: 4.3,
      price_range: '$$',
      latitude: 10.312200,
      longitude: 123.915400,
      description: 'Upper Ground Level, SM City Cebu',
      cuisine_type: 'Filipino',
      is_open: true,
      image_url: '/Landing.png'
    },
    {
      id: 'cebu_coffee_bean_ayala',
      name: 'Coffee Bean & Tea Leaf - Ayala Terraces',
      category: 'Cafe',
      rating: 4.4,
      price_range: '$$$',
      latitude: 10.318970,
      longitude: 123.905900,
      description: 'The Terraces, Ayala Center Cebu',
      cuisine_type: 'Coffee',
      is_open: true,
      image_url: '/Landing.png'
    },
    {
      id: 'cebu_kfc_robinsons',
      name: 'KFC Robinsons Galleria',
      category: 'Fast Food',
      rating: 4.0,
      price_range: '$',
      latitude: 10.308270,
      longitude: 123.917700,
      description: 'Robinsons Galleria Cebu, North Reclamation Area',
      cuisine_type: 'American',
      is_open: true,
      image_url: '/Landing.png'
    },
    {
      id: 'cebu_casa_verde',
      name: 'Casa Verde Ramos',
      category: 'Restaurant',
      rating: 4.2,
      price_range: '$$',
      latitude: 10.319399,
      longitude: 123.906757,
      description: 'Ramos St, Cebu City',
      cuisine_type: 'Filipino',
      is_open: true,
      image_url: '/Landing.png'
    },
    {
      id: 'cebu_emall_foodcourt',
      name: 'Elizabeth Mall Food Court',
      category: 'Food Court',
      rating: 4.1,
      price_range: '$$',
      latitude: 10.299830,
      longitude: 123.897980,
      description: 'E-Mall, N. Bacalso Ave, Cebu City',
      cuisine_type: 'Mixed',
      is_open: true,
      image_url: '/Landing.png'
    },
    {
      id: 'cebu_colonnade_foodcourt',
      name: 'Colonnade Foodcourt',
      category: 'Food Court',
      rating: 4.0,
      price_range: '$$',
      latitude: 10.300180,
      longitude: 123.896650,
      description: 'Colon St, Cebu City',
      cuisine_type: 'Filipino',
      is_open: true,
      image_url: '/Landing.png'
    },
    {
      id: 'cebu_larsian_fuente',
      name: 'Larsian BBQ Fuente',
      category: 'Restaurant',
      rating: 4.4,
      price_range: '$$',
      latitude: 10.309650,
      longitude: 123.894900,
      description: 'Baseline, Juana Osmeña St, Cebu City',
      cuisine_type: 'Filipino',
      is_open: true,
      image_url: '/Landing.png'
    },
    {
      id: 'cebu_cybergate_foodstrip',
      name: 'Robinsons Cybergate Food Strip',
      category: 'Restaurant',
      rating: 4.1,
      price_range: '$$',
      latitude: 10.309150,
      longitude: 123.892150,
      description: 'Don Mariano Cui St, Cebu City',
      cuisine_type: 'Mixed',
      is_open: true,
      image_url: '/Landing.png'
    },
    {
      id: 'cebu_sm_seaside_skyline',
      name: 'Skyline Bistro - SM Seaside',
      category: 'Restaurant',
      rating: 4.3,
      price_range: '$$$',
      latitude: 10.293470,
      longitude: 123.878280,
      description: 'Skypark, SM Seaside City Cebu',
      cuisine_type: 'International',
      is_open: true,
      image_url: '/Landing.png'
    }
  ];

  // Calculate distance from requested center and return closest ones first
  const placesWithDistance = basePlaces
    .map((place) => {
      const distance = getDistanceKm(centerLatLng, [place.latitude, place.longitude]);
      return {
        ...place,
        distance,
      };
    })
    // Keep only places within 12km to stay relevant to the selected area
    .filter((place) => place.distance === undefined || place.distance <= 12)
    .sort((a, b) => (a.distance || 0) - (b.distance || 0));

  return placesWithDistance;
};

export async function fetchRealFoodPlaces(centerLatLng: [number, number]): Promise<FoodPlace[]> {
  const [lat, lon] = centerLatLng;
  const radius = 2000; // Increased to 2km radius for better coverage

  // OpenStreetMap Overpass API query for restaurants, cafes, and fast food
  // Using way and relation in addition to node for better coverage
  const query = `
[out:json][timeout:10];
(
  node["amenity"~"^(restaurant|cafe|fast_food|bar|pub|food_court)$"](around:${radius},${lat},${lon});
  way["amenity"~"^(restaurant|cafe|fast_food|bar|pub|food_court)$"](around:${radius},${lat},${lon});
  node["shop"~"^(bakery|confectionery)$"](around:${radius},${lat},${lon});
  way["shop"~"^(bakery|confectionery)$"](around:${radius},${lat},${lon});
);
out center;
`;

  const overpassEndpoints = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://overpass.openstreetmap.ru/cgi/interpreter'
  ];

  const tryFetch = async (endpoint: string): Promise<FoodPlace[] | null> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: query,
        headers: {
          'Content-Type': 'text/plain',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.warn(`Overpass endpoint ${endpoint} returned status ${response.status}.`);
        return null;
      }

      const data = await response.json();
      if (!data || !data.elements || !Array.isArray(data.elements) || data.elements.length === 0) {
        console.warn(`Overpass endpoint ${endpoint} returned no places.`);
        return null;
      }

      const places: FoodPlace[] = data.elements
        .filter((element: any) => {
          if (element.type === 'node') {
            return element.lat && element.lon;
          } else if (element.type === 'way' || element.type === 'relation') {
            return element.center && element.center.lat && element.center.lon;
          }
          return false;
        })
        .map((element: any, index: number) => {
          const tags = element.tags || {};

          const elementLat =
            element.type === 'node'
              ? element.lat
              : element.center?.lat || element.lat;
          const elementLon =
            element.type === 'node'
              ? element.lon
              : element.center?.lon || element.lon;

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

          if (tags.cuisine) {
            cuisineType = tags.cuisine;
          } else if (tags.brand) {
            const brand = tags.brand.toLowerCase();
            if (
              brand.includes('jollibee') ||
              brand.includes('chowking') ||
              brand.includes('mang inasal')
            ) {
              cuisineType = 'Filipino';
            } else if (
              brand.includes('mcdonald') ||
              brand.includes('kfc') ||
              brand.includes('subway')
            ) {
              cuisineType = 'American';
            } else if (
              brand.includes('starbucks') ||
              brand.includes('coffee bean')
            ) {
              cuisineType = 'Coffee';
            }
          }

          const rating = 3.5 + Math.random() * 1.5;

          let priceRange = '$$';
          if (tags.amenity === 'cafe' && tags.brand && tags.brand.toLowerCase().includes('starbucks')) {
            priceRange = '$$$';
          } else if (tags.amenity === 'restaurant' && tags.amenity !== 'fast_food') {
            priceRange = Math.random() > 0.5 ? '$$$' : '$$';
          } else if (tags.amenity === 'fast_food') {
            priceRange = '$';
          }

          return {
            id: `osm_${element.type}_${element.id || index}`,
            name: tags.name || tags.brand || 'Unnamed Place',
            category,
            rating: Math.round(rating * 10) / 10,
            price_range: priceRange,
            latitude: elementLat,
            longitude: elementLon,
            description: tags.description || tags.cuisine || category,
            cuisine_type: cuisineType,
            is_open: true,
            image_url: '/Landing.png'
          };
        });

      return places.length > 0 ? places : null;
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        console.warn(`Overpass endpoint ${endpoint} timed out.`);
      } else {
        console.warn(`Error calling Overpass endpoint ${endpoint}:`, error?.message || error);
      }
      return null;
    }
  };

  for (const endpoint of overpassEndpoints) {
    const places = await tryFetch(endpoint);
    if (places && places.length > 0) {
      return places;
    }
  }

  console.warn('All Overpass endpoints failed or returned empty results. Using fallback data.');
  return getCebuFallbackPlaces(centerLatLng);
}

// Get trending restaurants from real data
export async function getTrendingRestaurants(centerLatLng: [number, number]): Promise<FoodPlace[]> {
  try {
    const places = await fetchRealFoodPlaces(centerLatLng);
    
    // If no places found, return empty array (don't throw error)
    if (!places || places.length === 0) {
      console.warn('No food places found. This may be due to API timeout or no places in the area.');
      return [];
    }
    
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
    // Return empty array instead of throwing to prevent app crashes
    return [];
  }
}
