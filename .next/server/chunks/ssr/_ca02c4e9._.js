module.exports = [
"[project]/lib/restaurants.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Shared restaurant data fetching utilities
__turbopack_context__.s([
    "fetchRealFoodPlaces",
    ()=>fetchRealFoodPlaces,
    "getTrendingRestaurants",
    ()=>getTrendingRestaurants
]);
// Fallback data for Cebu City when API fails
const getCebuFallbackPlaces = (centerLatLng)=>{
    const [lat, lon] = centerLatLng;
    // Popular places in Cebu City with slight variations based on location
    const basePlaces = [
        {
            id: 'cebu_1',
            name: 'Jollibee',
            category: 'Fast Food',
            rating: 4.2,
            price_range: '$',
            latitude: lat + (Math.random() - 0.5) * 0.01,
            longitude: lon + (Math.random() - 0.5) * 0.01,
            description: 'Popular Filipino fast food chain',
            cuisine_type: 'Filipino',
            is_open: true,
            image_url: '/Landing.png'
        },
        {
            id: 'cebu_2',
            name: 'Starbucks',
            category: 'Cafe',
            rating: 4.5,
            price_range: '$$$',
            latitude: lat + (Math.random() - 0.5) * 0.01,
            longitude: lon + (Math.random() - 0.5) * 0.01,
            description: 'Coffee shop and cafe',
            cuisine_type: 'Coffee',
            is_open: true,
            image_url: '/Landing.png'
        },
        {
            id: 'cebu_3',
            name: 'Chowking',
            category: 'Fast Food',
            rating: 4.0,
            price_range: '$',
            latitude: lat + (Math.random() - 0.5) * 0.01,
            longitude: lon + (Math.random() - 0.5) * 0.01,
            description: 'Chinese-Filipino fast food',
            cuisine_type: 'Filipino',
            is_open: true,
            image_url: '/Landing.png'
        },
        {
            id: 'cebu_4',
            name: 'McDonald\'s',
            category: 'Fast Food',
            rating: 4.1,
            price_range: '$',
            latitude: lat + (Math.random() - 0.5) * 0.01,
            longitude: lon + (Math.random() - 0.5) * 0.01,
            description: 'International fast food chain',
            cuisine_type: 'American',
            is_open: true,
            image_url: '/Landing.png'
        },
        {
            id: 'cebu_5',
            name: 'Mang Inasal',
            category: 'Restaurant',
            rating: 4.3,
            price_range: '$$',
            latitude: lat + (Math.random() - 0.5) * 0.01,
            longitude: lon + (Math.random() - 0.5) * 0.01,
            description: 'Filipino grilled chicken restaurant',
            cuisine_type: 'Filipino',
            is_open: true,
            image_url: '/Landing.png'
        },
        {
            id: 'cebu_6',
            name: 'Coffee Bean & Tea Leaf',
            category: 'Cafe',
            rating: 4.4,
            price_range: '$$$',
            latitude: lat + (Math.random() - 0.5) * 0.01,
            longitude: lon + (Math.random() - 0.5) * 0.01,
            description: 'Coffee and tea specialty cafe',
            cuisine_type: 'Coffee',
            is_open: true,
            image_url: '/Landing.png'
        },
        {
            id: 'cebu_7',
            name: 'KFC',
            category: 'Fast Food',
            rating: 4.0,
            price_range: '$',
            latitude: lat + (Math.random() - 0.5) * 0.01,
            longitude: lon + (Math.random() - 0.5) * 0.01,
            description: 'Fried chicken restaurant',
            cuisine_type: 'American',
            is_open: true,
            image_url: '/Landing.png'
        },
        {
            id: 'cebu_8',
            name: 'Local Restaurant',
            category: 'Restaurant',
            rating: 4.2,
            price_range: '$$',
            latitude: lat + (Math.random() - 0.5) * 0.01,
            longitude: lon + (Math.random() - 0.5) * 0.01,
            description: 'Local Filipino cuisine',
            cuisine_type: 'Filipino',
            is_open: true,
            image_url: '/Landing.png'
        }
    ];
    return basePlaces;
};
async function fetchRealFoodPlaces(centerLatLng) {
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
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(()=>controller.abort(), 15000); // 15 second timeout
    try {
        const response = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: query,
            headers: {
                'Content-Type': 'text/plain'
            },
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (!response.ok) {
            console.warn(`OpenStreetMap API responded with status ${response.status}. Using fallback data.`);
            return getCebuFallbackPlaces(centerLatLng);
        }
        const data = await response.json();
        // Check if data has elements
        if (!data || !data.elements || !Array.isArray(data.elements) || data.elements.length === 0) {
            console.warn('OpenStreetMap API returned no results. Using fallback data.');
            return getCebuFallbackPlaces(centerLatLng);
        }
        // Transform OpenStreetMap data to our format
        const places = data.elements.filter((element)=>{
            // Filter out elements without location data
            if (element.type === 'node') {
                return element.lat && element.lon;
            } else if (element.type === 'way' || element.type === 'relation') {
                return element.center && element.center.lat && element.center.lon;
            }
            return false;
        }).map((element, index)=>{
            const tags = element.tags || {};
            // Get coordinates based on element type
            let elementLat;
            let elementLon;
            if (element.type === 'node') {
                elementLat = element.lat;
                elementLon = element.lon;
            } else {
                // For ways and relations, use center
                elementLat = element.center?.lat || element.lat;
                elementLon = element.center?.lon || element.lon;
            }
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
            // Determine price range - Fixed the logic bug here
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
                category: category,
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
        // If we got results, return them; otherwise use fallback
        if (places.length > 0) {
            return places;
        } else {
            console.warn('No valid places found from OpenStreetMap. Using fallback data.');
            return getCebuFallbackPlaces(centerLatLng);
        }
    } catch (error) {
        clearTimeout(timeoutId);
        // Handle abort (timeout)
        if (error.name === 'AbortError') {
            console.warn('Request to OpenStreetMap API timed out. Using fallback data.');
            return getCebuFallbackPlaces(centerLatLng);
        }
        // Handle other errors
        if (error.message?.includes('504') || error.message?.includes('timeout') || error.message?.includes('429')) {
            console.warn('OpenStreetMap API error. Using fallback data.');
            return getCebuFallbackPlaces(centerLatLng);
        }
        console.error('Error fetching food places from OpenStreetMap:', error);
        // Return fallback data instead of empty array
        return getCebuFallbackPlaces(centerLatLng);
    }
}
async function getTrendingRestaurants(centerLatLng) {
    try {
        const places = await fetchRealFoodPlaces(centerLatLng);
        // If no places found, return empty array (don't throw error)
        if (!places || places.length === 0) {
            console.warn('No food places found. This may be due to API timeout or no places in the area.');
            return [];
        }
        // Sort by rating and take top 8 as trending
        const trending = places.sort((a, b)=>b.rating - a.rating).slice(0, 8).map((place, index)=>({
                ...place,
                // Add trend indicators based on position
                trend: index === 0 ? '🔥 Hot' : index === 1 ? '📈 Rising' : index === 2 ? '⭐ Popular' : index === 3 ? '🚀 Trending' : index === 4 ? '👑 Top' : index === 5 ? '💫 New' : index === 6 ? '🏆 Classic' : '🎯 Trending'
            }));
        return trending;
    } catch (error) {
        console.error('Error fetching trending restaurants:', error);
        // Return empty array instead of throwing to prevent app crashes
        return [];
    }
}
}),
"[project]/app/feed/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AIAssistantPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$restaurants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/restaurants.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function AIAssistantPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [inputMessage, setInputMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [userLocation, setUserLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [chatHistory, setChatHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const scrollToBottom = ()=>{
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        scrollToBottom();
    }, [
        messages
    ]);
    const [locationReady, setLocationReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [locationError, setLocationError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Get user's current location on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{
                const coords = [
                    position.coords.latitude,
                    position.coords.longitude
                ];
                setUserLocation(coords);
                setLocationReady(true);
                console.log('Location detected:', coords);
                // Add welcome message once location is ready
                setMessages([
                    {
                        id: "1",
                        content: `Hello! I'm your AI assistant for Lokalista. I've detected your location and I can help you find the perfect restaurants, cafes, and events near you. What would you like to discover?`,
                        isUser: false,
                        timestamp: new Date()
                    }
                ]);
                setChatHistory([
                    {
                        role: "assistant",
                        content: `Hello! I'm your AI assistant for Lokalista. I've detected your location and can help you find the perfect spots nearby. What would you like to discover?`
                    }
                ]);
            }, (error)=>{
                console.warn('Geolocation error:', error);
                // If permission denied or error, use default location
                setUserLocation([
                    10.3157,
                    123.8854
                ]); // Cebu City, Philippines
                setLocationReady(true);
                setLocationError(true);
                // Add welcome message with error notice
                setMessages([
                    {
                        id: "1",
                        content: "Hello! I'm your AI assistant for Lokalista. I couldn't access your location, so I'll focus on Cebu City for now. Allow location access for hyper-local picks around you. What would you like to discover?",
                        isUser: false,
                        timestamp: new Date()
                    }
                ]);
                setChatHistory([
                    {
                        role: "assistant",
                        content: "Hello! I'm your AI assistant for Lokalista. I couldn't access your location, so I'll use Cebu City as our base. What would you like to discover around here?"
                    }
                ]);
            });
        } else {
            // Fallback if geolocation not supported
            setUserLocation([
                10.3157,
                123.8854
            ]);
            setLocationReady(true);
            setLocationError(true);
            setMessages([
                {
                    id: "1",
                    content: "Hello! I'm your AI assistant for Lokalista. Location services aren't available, so we'll explore Cebu City by default. What would you like to discover?",
                    isUser: false,
                    timestamp: new Date()
                }
            ]);
            setChatHistory([
                {
                    role: "assistant",
                    content: "Hello! I'm your AI assistant for Lokalista. Location services aren't available, so let's explore Cebu City by default. What would you like to discover?"
                }
            ]);
        }
    }, []);
    // Convert FoodPlace to Restaurant format
    const convertToRestaurant = (place)=>{
        // Generate vibe based on category and name
        const getVibe = (category, name)=>{
            const lowerName = name.toLowerCase();
            if (category.includes("Cafe") || lowerName.includes("coffee")) {
                return lowerName.includes("cozy") || lowerName.includes("quiet") ? "Cozy and quiet, perfect for work or relaxation" : "Modern and welcoming, great for meetings";
            }
            if (category.includes("Fast Food")) {
                return "Quick and convenient, family-friendly";
            }
            if (category.includes("Local")) {
                return "Authentic Filipino experience";
            }
            return "Welcoming atmosphere, great for dining";
        };
        // Generate tip based on place
        const getTip = (category, name)=>{
            if (category.includes("Cafe")) return "Visit during off-peak hours for a more peaceful experience.";
            if (category.includes("Fast Food")) return "Most locations are open until late, great for quick meals.";
            if (name.toLowerCase().includes("starbucks")) return "Peak hours are lunch and afternoon, try early morning.";
            return "Check hours before visiting to avoid disappointment.";
        };
        return {
            id: place.id,
            name: place.name,
            category: place.category,
            rating: place.rating,
            price_range: place.price_range,
            location: place.description || `Near your location`,
            vibe: getVibe(place.category, place.name),
            image: place.image_url || "/Landing.png",
            tip: getTip(place.category, place.name),
            latitude: place.latitude,
            longitude: place.longitude
        };
    };
    const generateRecommendations = async (userInput)=>{
        if (!userLocation) {
            return [];
        }
        const input = userInput.toLowerCase();
        try {
            // Fetch real food places near user location
            const foodPlaces = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$restaurants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchRealFoodPlaces"])(userLocation);
            // Filter based on keywords
            let matches = [];
            if (input.includes("coffee") || input.includes("cafe") || input.includes("cozy")) {
                matches = foodPlaces.filter((p)=>p.category.toLowerCase().includes("cafe") || p.name.toLowerCase().includes("coffee") || p.name.toLowerCase().includes("cafe"));
            } else if (input.includes("fast food") || input.includes("quick") || input.includes("cheap")) {
                matches = foodPlaces.filter((p)=>p.category.toLowerCase().includes("fast") || p.price_range === "$");
            } else if (input.includes("budget") || input.includes("affordable")) {
                matches = foodPlaces.filter((p)=>p.price_range === "$");
            } else if (input.includes("local") || input.includes("filipino")) {
                matches = foodPlaces.filter((p)=>p.category.toLowerCase().includes("local") || p.cuisine_type?.toLowerCase().includes("filipino"));
            } else {
                matches = foodPlaces.slice(0, 3);
            }
            // Limit to 3 results
            const limited = matches.slice(0, 3);
            // Convert to Restaurant format
            return limited.map(convertToRestaurant);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            return [];
        }
    };
    const handleSendMessage = async ()=>{
        if (!inputMessage.trim() || isLoading) return;
        const rawInput = inputMessage.trim();
        const userMessage = {
            id: Date.now().toString(),
            content: rawInput,
            isUser: true,
            timestamp: new Date()
        };
        setMessages((prev)=>[
                ...prev,
                userMessage
            ]);
        setInputMessage("");
        setIsLoading(true);
        const historyWithUser = [
            ...chatHistory,
            {
                role: "user",
                content: rawInput
            }
        ];
        const locationContext = userLocation ? `Approximate user coordinates: ${userLocation[0].toFixed(3)}, ${userLocation[1].toFixed(3)}.` : locationError ? "User location not available. Using Cebu City, Philippines as fallback." : "User location currently loading.";
        const systemPrompt = [
            "You are Lokalista, an upbeat culinary concierge focusing on Cebu City, Philippines.",
            "Assume Cebu City context unless the user explicitly confirms they are in another city.",
            "Whenever the user mentions a specific neighborhood or landmark (e.g., IT Park, SM Seaside), restrict recommendations to that immediate area and mention the neighborhood in your reply.",
            "Always acknowledge the user's request, ask follow-up questions when helpful, and keep answers to about 4-6 sentences.",
            "Provide helpful recommendations and information about restaurants, cafes, and food places in Cebu City.",
            locationContext
        ].join(" ");
        const payloadMessages = [
            {
                role: "system",
                content: systemPrompt
            },
            ...chatHistory.map((m)=>({
                    role: m.role,
                    content: m.content
                })),
            {
                role: "user",
                content: rawInput
            }
        ];
        let assistantContent = "Sorry, I couldn't fetch a response from our AI right now. Please try again in a moment.";
        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    messages: payloadMessages
                })
            });
            if (!response.ok) {
                const errorPayload = await response.json().catch(()=>null);
                throw new Error(errorPayload?.error || `Groq API error (${response.status})`);
            }
            const data = await response.json();
            const content = data?.choices?.[0]?.message?.content?.trim();
            if (content) {
                assistantContent = content;
            }
        } catch (error) {
            console.error("Chat completion error:", error);
        }
        const assistantMessage = {
            id: (Date.now() + 1).toString(),
            content: assistantContent,
            isUser: false,
            timestamp: new Date()
        };
        setMessages((prev)=>[
                ...prev,
                assistantMessage
            ]);
        setChatHistory([
            ...historyWithUser,
            {
                role: "assistant",
                content: assistantContent
            }
        ]);
        setIsLoading(false);
    };
    const handleViewOnMap = (restaurant)=>{
        if (restaurant.latitude && restaurant.longitude) {
            router.push(`/map?lat=${restaurant.latitude}&lng=${restaurant.longitude}&restaurant=${encodeURIComponent(restaurant.name)}`);
        }
    };
    const handleKeyPress = (e)=>{
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    const quickActions = [
        "Good coffee spot near me",
        "Budget-friendly places near me",
        "Fast food near me",
        "Cozy cafes for working",
        "Quick meals nearby",
        "Popular restaurants near me"
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ai-assistant-bg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-ai-surface border-b border-ai shadow-ai",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-4xl mx-auto px-4 py-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-6 h-6 text-white",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    }, void 0, false, {
                                        fileName: "[project]/app/feed/page.tsx",
                                        lineNumber: 310,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/feed/page.tsx",
                                    lineNumber: 309,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/feed/page.tsx",
                                lineNumber: 308,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-2xl font-bold text-gray-900",
                                        children: "AI Assistant"
                                    }, void 0, false, {
                                        fileName: "[project]/app/feed/page.tsx",
                                        lineNumber: 314,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600",
                                        children: "Your personal food discovery companion"
                                    }, void 0, false, {
                                        fileName: "[project]/app/feed/page.tsx",
                                        lineNumber: 315,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/feed/page.tsx",
                                lineNumber: 313,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/feed/page.tsx",
                        lineNumber: 307,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/feed/page.tsx",
                    lineNumber: 306,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/feed/page.tsx",
                lineNumber: 305,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-4xl mx-auto px-4 py-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-ai-surface rounded-2xl shadow-ai border border-ai overflow-hidden backdrop-blur",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-[600px] overflow-y-auto p-6 space-y-4",
                                children: [
                                    messages.map((message)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4",
                                            children: [
                                                message.isUser && message.content && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-end",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "max-w-xs lg:max-w-md px-4 py-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm whitespace-pre-wrap",
                                                                children: message.content
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/feed/page.tsx",
                                                                lineNumber: 331,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs mt-1 text-purple-100",
                                                                children: message.timestamp.toLocaleTimeString([], {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/feed/page.tsx",
                                                                lineNumber: 332,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/feed/page.tsx",
                                                        lineNumber: 330,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/feed/page.tsx",
                                                    lineNumber: 329,
                                                    columnNumber: 19
                                                }, this),
                                                !message.isUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-4",
                                                    children: message.content && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-start",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "max-w-xs lg:max-w-md px-4 py-3 rounded-2xl bg-gray-100 text-gray-900",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm whitespace-pre-wrap",
                                                                    children: message.content
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/feed/page.tsx",
                                                                    lineNumber: 345,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs mt-1 text-gray-500",
                                                                    children: message.timestamp.toLocaleTimeString([], {
                                                                        hour: '2-digit',
                                                                        minute: '2-digit'
                                                                    })
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/feed/page.tsx",
                                                                    lineNumber: 346,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/feed/page.tsx",
                                                            lineNumber: 344,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/feed/page.tsx",
                                                        lineNumber: 343,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/feed/page.tsx",
                                                    lineNumber: 341,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, message.id, true, {
                                            fileName: "[project]/app/feed/page.tsx",
                                            lineNumber: 326,
                                            columnNumber: 15
                                        }, this)),
                                    isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-start",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-3 rounded-2xl",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-4 h-4 text-white",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/feed/page.tsx",
                                                                lineNumber: 363,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/feed/page.tsx",
                                                            lineNumber: 362,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/feed/page.tsx",
                                                        lineNumber: 361,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex space-x-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/feed/page.tsx",
                                                                lineNumber: 367,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce",
                                                                style: {
                                                                    animationDelay: '0.1s'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/feed/page.tsx",
                                                                lineNumber: 368,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-2 h-2 bg-gray-400 rounded-full animate-bounce",
                                                                style: {
                                                                    animationDelay: '0.2s'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/feed/page.tsx",
                                                                lineNumber: 369,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/feed/page.tsx",
                                                        lineNumber: 366,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/feed/page.tsx",
                                                lineNumber: 360,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/feed/page.tsx",
                                            lineNumber: 359,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/feed/page.tsx",
                                        lineNumber: 358,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: messagesEndRef
                                    }, void 0, false, {
                                        fileName: "[project]/app/feed/page.tsx",
                                        lineNumber: 375,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/feed/page.tsx",
                                lineNumber: 324,
                                columnNumber: 11
                            }, this),
                            locationReady && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-6 py-4 bg-ai-muted border-t border-ai",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-600 mb-3",
                                        children: "Quick actions:"
                                    }, void 0, false, {
                                        fileName: "[project]/app/feed/page.tsx",
                                        lineNumber: 381,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: quickActions.map((action, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setInputMessage(action),
                                                className: "px-3 py-1.5 text-xs bg-ai-card border border-ai rounded-full hover:bg-muted transition-colors",
                                                children: action
                                            }, index, false, {
                                                fileName: "[project]/app/feed/page.tsx",
                                                lineNumber: 384,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/feed/page.tsx",
                                        lineNumber: 382,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/feed/page.tsx",
                                lineNumber: 380,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-6 bg-ai-surface border-t border-ai",
                                children: !locationReady ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center gap-3 py-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "animate-spin rounded-full h-5 w-5 border-b-2 border-purple-500"
                                        }, void 0, false, {
                                            fileName: "[project]/app/feed/page.tsx",
                                            lineNumber: 400,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600",
                                            children: "Getting your location..."
                                        }, void 0, false, {
                                            fileName: "[project]/app/feed/page.tsx",
                                            lineNumber: 401,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/feed/page.tsx",
                                    lineNumber: 399,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        locationError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-4 p-3 bg-yellow-50/80 border border-yellow-200 rounded-lg",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-yellow-800 dark:text-yellow-100",
                                                children: "⚠️ Location permission denied. Showing results for Manila area. Allow location access for better recommendations."
                                            }, void 0, false, {
                                                fileName: "[project]/app/feed/page.tsx",
                                                lineNumber: 407,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/feed/page.tsx",
                                            lineNumber: 406,
                                            columnNumber: 19
                                        }, this),
                                        userLocation && !locationError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-4 p-3 bg-green-50/80 border border-green-200 rounded-lg",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-green-800 dark:text-green-100",
                                                children: "✓ Location detected! Finding places near you."
                                            }, void 0, false, {
                                                fileName: "[project]/app/feed/page.tsx",
                                                lineNumber: 414,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/feed/page.tsx",
                                            lineNumber: 413,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 relative",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: inputMessage,
                                                        onChange: (e)=>setInputMessage(e.target.value),
                                                        onKeyPress: handleKeyPress,
                                                        placeholder: "Ask anything about places, restaurants, or cafes...",
                                                        className: "w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
                                                        disabled: isLoading || !locationReady
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/feed/page.tsx",
                                                        lineNumber: 421,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/feed/page.tsx",
                                                    lineNumber: 420,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleSendMessage,
                                                    disabled: !inputMessage.trim() || isLoading || !locationReady,
                                                    className: "px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2",
                                                    children: [
                                                        isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/feed/page.tsx",
                                                            lineNumber: 437,
                                                            columnNumber: 23
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-4 h-4",
                                                            fill: "none",
                                                            stroke: "currentColor",
                                                            viewBox: "0 0 24 24",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/feed/page.tsx",
                                                                lineNumber: 440,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/feed/page.tsx",
                                                            lineNumber: 439,
                                                            columnNumber: 23
                                                        }, this),
                                                        "Send"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/feed/page.tsx",
                                                    lineNumber: 431,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/feed/page.tsx",
                                            lineNumber: 419,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/app/feed/page.tsx",
                                lineNumber: 397,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/feed/page.tsx",
                        lineNumber: 322,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 grid grid-cols-1 md:grid-cols-3 gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-ai-card p-6 rounded-xl shadow-lg border border-ai",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-6 h-6 text-white",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/feed/page.tsx",
                                                    lineNumber: 456,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/feed/page.tsx",
                                                    lineNumber: 457,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/feed/page.tsx",
                                            lineNumber: 455,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/feed/page.tsx",
                                        lineNumber: 454,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-gray-900 mb-2",
                                        children: "Location-Based"
                                    }, void 0, false, {
                                        fileName: "[project]/app/feed/page.tsx",
                                        lineNumber: 460,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-ai-muted text-sm",
                                        children: "Find restaurants and cafes near your current location with precise recommendations."
                                    }, void 0, false, {
                                        fileName: "[project]/app/feed/page.tsx",
                                        lineNumber: 461,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/feed/page.tsx",
                                lineNumber: 453,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-ai-card p-6 rounded-xl shadow-lg border border-ai",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-6 h-6 text-white",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            }, void 0, false, {
                                                fileName: "[project]/app/feed/page.tsx",
                                                lineNumber: 467,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/feed/page.tsx",
                                            lineNumber: 466,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/feed/page.tsx",
                                        lineNumber: 465,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-gray-900 mb-2",
                                        children: "Smart Filtering"
                                    }, void 0, false, {
                                        fileName: "[project]/app/feed/page.tsx",
                                        lineNumber: 470,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-ai-muted text-sm",
                                        children: "Filter by cuisine, price range, features, and preferences to find exactly what you want."
                                    }, void 0, false, {
                                        fileName: "[project]/app/feed/page.tsx",
                                        lineNumber: 471,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/feed/page.tsx",
                                lineNumber: 464,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-ai-card p-6 rounded-xl shadow-lg border border-ai",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-6 h-6 text-white",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                            }, void 0, false, {
                                                fileName: "[project]/app/feed/page.tsx",
                                                lineNumber: 477,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/feed/page.tsx",
                                            lineNumber: 476,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/feed/page.tsx",
                                        lineNumber: 475,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-gray-900 mb-2",
                                        children: "Personalized"
                                    }, void 0, false, {
                                        fileName: "[project]/app/feed/page.tsx",
                                        lineNumber: 480,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-ai-muted text-sm",
                                        children: "Get recommendations tailored to your preferences, budget, and dining preferences."
                                    }, void 0, false, {
                                        fileName: "[project]/app/feed/page.tsx",
                                        lineNumber: 481,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/feed/page.tsx",
                                lineNumber: 474,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/feed/page.tsx",
                        lineNumber: 452,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/feed/page.tsx",
                lineNumber: 321,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/feed/page.tsx",
        lineNumber: 303,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_ca02c4e9._.js.map