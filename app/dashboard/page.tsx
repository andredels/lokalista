"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getTrendingRestaurants, type FoodPlace } from "@/lib/restaurants";
import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";

// Default Cebu City center coordinates
const CEBU_CENTER: [number, number] = [10.3157, 123.8854];

// Calculate distance between two coordinates using Haversine formula
function calculateDistanceKm(a: [number, number], b: [number, number]): number {
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

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [trendingRestaurants, setTrendingRestaurants] = useState<FoodPlace[]>([]);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const router = useRouter();
  
  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          // Use default Cebu City center if location access denied
          setUserLocation(CEBU_CENTER);
        }
      );
    } else {
      setUserLocation(CEBU_CENTER);
    }
  }, []);

  // Load real trending restaurants on component mount
  useEffect(() => {
    const loadTrendingRestaurants = async () => {
      setLoadingTrending(true);
      try {
        const center = userLocation || CEBU_CENTER;
        const trending = await getTrendingRestaurants(center);
        setTrendingRestaurants(trending);
      } catch (error) {
        console.error('Error loading trending restaurants:', error);
        setTrendingRestaurants([]);
      } finally {
        setLoadingTrending(false);
      }
    };

    if (userLocation !== null) {
      loadTrendingRestaurants();
    }
  }, [userLocation]);
  
  const handleTrendingClick = (item: FoodPlace) => {
    // Navigate to map page with real restaurant location
    const url = `/map?lat=${item.latitude}&lng=${item.longitude}&restaurant=${encodeURIComponent(item.name)}`;
    router.push(url);
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Cafe': '☕',
      'Japanese': '🍣',
      'Farm-to-Table': '🥗',
      'Mexican': '🌮',
      'Italian': '🍕',
      'Beverages': '🧋',
      'American': '🍔',
      'Asian': '🍜'
    };
    return icons[category] || '🍽️';
  };

  // Real Cebu City restaurant coordinates
  const restaurantData = [
    {
      id: 1,
      name: "Jollibee Colon",
      description: "Popular Filipino fast food chain serving crispy fried chicken and spaghetti.",
      latitude: 10.2975,
      longitude: 123.8994,
      status: "Open",
      price: "$",
      rating: 4.2,
      image: "/restaurants/jollibee.png"
    },
    {
      id: 2,
      name: "Starbucks IT Park",
      description: "Modern coffee shop perfect for work meetings and casual hangouts.",
      latitude: 10.3294,
      longitude: 123.9056,
      status: "Open",
      price: "$$$",
      rating: 4.5,
      image: "/restaurants/starbucks.png"
    },
    {
      id: 3,
      name: "Larsian Fuente",
      description: "Iconic late-night barbecue stalls with unlimited rice and grilled favorites.",
      latitude: 10.3097,
      longitude: 123.8949,
      status: "Open",
      price: "$$",
      rating: 4.4,
      image: "/restaurants/larsian.jpg"
    },
    {
      id: 4,
      name: "Mang Inasal Ayala",
      description: "Filipino grilled chicken restaurant with unlimited rice and sinigang soup.",
      latitude: 10.3157,
      longitude: 123.8854,
      status: "Open",
      price: "$$",
      rating: 4.3,
      image: "/restaurants/manginasal1.png"
    },
    {
      id: 5,
      name: "Chowking SM City",
      description: "Chinese-Filipino fast food known for dimsum and noodle dishes.",
      latitude: 10.3111,
      longitude: 123.9181,
      status: "Open",
      price: "$",
      rating: 4.0,
      image: "/restaurants/chowking.png"
    },
    {
      id: 6,
      name: "Coffee Bean & Tea Leaf",
      description: "Premium coffee and tea specialty cafe with cozy ambiance.",
      latitude: 10.3157,
      longitude: 123.8854,
      status: "Open",
      price: "$$$",
      rating: 4.4,
      image: "/restaurants/coffeebean1.jpg"
    }
  ];

  // Calculate distances and format recommendations (recalculate when location changes)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const recommendations = useMemo(() => {
    const center = userLocation || CEBU_CENTER;
    return restaurantData.map((restaurant) => {
      const distanceKm = calculateDistanceKm(center, [restaurant.latitude, restaurant.longitude]);
      const distance = distanceKm < 1 
        ? `${(distanceKm * 1000).toFixed(0)} m` 
        : `${distanceKm.toFixed(1)} km`;
      
      return {
        ...restaurant,
        distance,
        distanceKm, // Keep for sorting
      };
    }).sort((a, b) => a.distanceKm - b.distanceKm); // Sort by distance
  }, [userLocation]);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredRecommendations = normalizedQuery
    ? recommendations.filter((item) =>
        [
          item.name,
          item.description,
          item.price,
          item.status
        ].some((value) =>
          value.toLowerCase().includes(normalizedQuery)
        )
      )
    : recommendations;

  const filteredTrendingRestaurants = normalizedQuery
    ? trendingRestaurants.filter((item) =>
        [
          item.name,
          item.category ?? "",
          item.description ?? "",
          item.price_range ?? "",
          item.cuisine_type ?? ""
        ].some((value) =>
          value.toLowerCase().includes(normalizedQuery)
        )
      )
    : trendingRestaurants;


  // Scroll animations
  const heroRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const searchRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const recommendationsRef = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const trendingRef = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="min-h-screen bg-white animate-fade-in">
      {/* Top Bar */}
      <div className="h-1 bg-gray-300"></div>
      
      {/* Hero Section */}
      <section className="bg-white py-8">
        <div className="container">
          <div 
            ref={heroRef.ref as any}
            className={`text-center mb-8 ${heroRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Good evening!</h1>
            <p className="text-lg text-gray-600">Discover your next favorite spot</p>
          </div>
          
          {/* Search Bar */}
          <div 
            ref={searchRef.ref as any}
            className={`max-w-2xl mx-auto mb-6 ${searchRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ transitionDelay: '0.1s' }}
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    // Search is already live, just ensure focus stays
                  }
                }}
                placeholder="Search restaurants, cafes, events..."
                className="w-full pl-10 pr-10 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors"
                  aria-label="Clear search"
                >
                  <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center gap-3 mb-12">
            <a href="/feed" className="flex items-center gap-2 px-6 py-3 bg-[#8c52ff] text-white rounded-full hover:opacity-90 transition-all hover-scale btn-press btn-ripple">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Ask AI
            </a>
            <a href="/map" className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition-all hover-scale btn-press">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Map
            </a>
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition-all hover-scale btn-press">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* AI Recommendations Section */}
      <section className="bg-gray-50 py-12">
        <div className="container">
          <div 
            ref={recommendationsRef.ref as any}
            className={`flex justify-between items-center mb-8 ${recommendationsRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          >
            <h2 className="text-2xl font-bold text-gray-900">AI Recommendations</h2>
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium transition-colors hover-scale">See all</a>
          </div>
          
          <div className="space-y-4">
            {filteredRecommendations.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300 animate-fade-in">
                <p className="text-gray-600 font-medium mb-1">No matches found</p>
                <p className="text-sm text-gray-400">Try another dish, place, or landmark.</p>
              </div>
            ) : (
              filteredRecommendations.map((item, index) => (
              <div 
                key={item.id} 
                className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center gap-4 card-hover stagger-item`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 hover-brighten">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/Landing.png";
                    }}
                  />
                  <button className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-all hover-scale btn-press">
                    <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{item.distance}</span>
                        <span className={`font-medium ${item.status === 'Open' ? 'text-green-600' : 'text-red-600'}`}>
                          {item.status}
                        </span>
                        <span>{item.price}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span>{item.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="bg-gray-50 py-12">
        <div className="container">
          <div 
            ref={trendingRef.ref as any}
            className={`flex items-center justify-between mb-8 ${trendingRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Trending in your area</h2>
              <p className="text-sm text-gray-600 mt-1">Based on recent visits and ratings</p>
            </div>
            <button className="text-[#8c52ff] hover:text-[#7c42ef] font-medium transition-all hover-scale">
              View all →
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loadingTrending ? (
              // Loading skeleton
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden loading-skeleton">
                  <div className="aspect-video bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))
            ) : filteredTrendingRestaurants.length > 0 ? (
              filteredTrendingRestaurants.map((item, index) => (
              <div 
                key={item.id} 
                className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden card-hover cursor-pointer group stagger-item`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleTrendingClick(item)}
              >
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 mx-auto shadow-sm">
                      <span className="text-2xl">{getCategoryIcon(item.category)}</span>
                    </div>
                    <div className="text-xs font-medium text-gray-600">{item.category}</div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">
                      {item.trend}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm group-hover:text-[#8c52ff] transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1 ml-2">
                      <span className="text-yellow-400 text-xs">★</span>
                      <span className="text-xs font-medium text-gray-600">{item.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <div className="flex items-center gap-3">
                      <span>{item.distance ? `${item.distance.toFixed(1)} km` : 'Nearby'}</span>
                      <span className="font-medium text-green-600">{item.is_open ? 'Open' : 'Closed'}</span>
                    </div>
                    <span className="font-medium">{item.price_range}</span>
                  </div>
                  
                  <button 
                    className="w-full text-xs bg-[#8c52ff] text-white py-2 px-3 rounded-lg hover:bg-[#7c42ef] transition-colors font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTrendingClick(item);
                    }}
                  >
                    View on Map
                  </button>
                </div>
              </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No trending restaurants found in your area.</p>
                <p className="text-sm text-gray-400 mt-1">Try refreshing the page or check back later.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}


