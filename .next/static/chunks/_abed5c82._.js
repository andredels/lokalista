(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/restaurants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ // Shared restaurant data fetching utilities
__turbopack_context__.s([
    "fetchRealFoodPlaces",
    ()=>fetchRealFoodPlaces,
    "getTrendingRestaurants",
    ()=>getTrendingRestaurants
]);
function getDistanceKm(a, b) {
    const R = 6371; // Earth radius in km
    const dLat = (b[0] - a[0]) * Math.PI / 180;
    const dLon = (b[1] - a[1]) * Math.PI / 180;
    const lat1 = a[0] * Math.PI / 180;
    const lat2 = b[0] * Math.PI / 180;
    const sinDLat = Math.sin(dLat / 2);
    const sinDLon = Math.sin(dLon / 2);
    const aCalc = sinDLat * sinDLat + sinDLon * sinDLon * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(aCalc), Math.sqrt(1 - aCalc));
    return R * c;
}
// Fallback data for Cebu City when API fails
const getCebuFallbackPlaces = (centerLatLng)=>{
    // Popular places in Cebu City with accurate fixed coordinates
    const basePlaces = [
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
    const placesWithDistance = basePlaces.map((place)=>{
        const distance = getDistanceKm(centerLatLng, [
            place.latitude,
            place.longitude
        ]);
        return {
            ...place,
            distance
        };
    })// Keep only places within 12km to stay relevant to the selected area
    .filter((place)=>place.distance === undefined || place.distance <= 12).sort((a, b)=>(a.distance || 0) - (b.distance || 0));
    return placesWithDistance;
};
async function fetchRealFoodPlaces(centerLatLng) {
    const [lat, lon] = centerLatLng;
    const radius = 2000; // Increased to 2km radius for better coverage
    // OpenStreetMap Overpass API query for restaurants, cafes, and fast food
    // Using way and relation in addition to node for better coverage
    const query = '\n[out:json][timeout:10];\n(\n  node["amenity"~"^(restaurant|cafe|fast_food|bar|pub|food_court)$"](around:'.concat(radius, ",").concat(lat, ",").concat(lon, ');\n  way["amenity"~"^(restaurant|cafe|fast_food|bar|pub|food_court)$"](around:').concat(radius, ",").concat(lat, ",").concat(lon, ');\n  node["shop"~"^(bakery|confectionery)$"](around:').concat(radius, ",").concat(lat, ",").concat(lon, ');\n  way["shop"~"^(bakery|confectionery)$"](around:').concat(radius, ",").concat(lat, ",").concat(lon, ");\n);\nout center;\n");
    const overpassEndpoints = [
        'https://overpass-api.de/api/interpreter',
        'https://overpass.kumi.systems/api/interpreter',
        'https://overpass.openstreetmap.ru/cgi/interpreter'
    ];
    const tryFetch = async (endpoint)=>{
        const controller = new AbortController();
        const timeoutId = setTimeout(()=>controller.abort(), 15000);
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: query,
                headers: {
                    'Content-Type': 'text/plain'
                },
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (!response.ok) {
                console.warn("Overpass endpoint ".concat(endpoint, " returned status ").concat(response.status, "."));
                return null;
            }
            const data = await response.json();
            if (!data || !data.elements || !Array.isArray(data.elements) || data.elements.length === 0) {
                console.warn("Overpass endpoint ".concat(endpoint, " returned no places."));
                return null;
            }
            const places = data.elements.filter((element)=>{
                if (element.type === 'node') {
                    return element.lat && element.lon;
                } else if (element.type === 'way' || element.type === 'relation') {
                    return element.center && element.center.lat && element.center.lon;
                }
                return false;
            }).map((element, index)=>{
                var _element_center, _element_center1;
                const tags = element.tags || {};
                const elementLat = element.type === 'node' ? element.lat : ((_element_center = element.center) === null || _element_center === void 0 ? void 0 : _element_center.lat) || element.lat;
                const elementLon = element.type === 'node' ? element.lon : ((_element_center1 = element.center) === null || _element_center1 === void 0 ? void 0 : _element_center1.lon) || element.lon;
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
                    if (brand.includes('jollibee') || brand.includes('chowking') || brand.includes('mang inasal')) {
                        cuisineType = 'Filipino';
                    } else if (brand.includes('mcdonald') || brand.includes('kfc') || brand.includes('subway')) {
                        cuisineType = 'American';
                    } else if (brand.includes('starbucks') || brand.includes('coffee bean')) {
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
                    id: "osm_".concat(element.type, "_").concat(element.id || index),
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
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                console.warn("Overpass endpoint ".concat(endpoint, " timed out."));
            } else {
                console.warn("Error calling Overpass endpoint ".concat(endpoint, ":"), (error === null || error === void 0 ? void 0 : error.message) || error);
            }
            return null;
        }
    };
    for (const endpoint of overpassEndpoints){
        const places = await tryFetch(endpoint);
        if (places && places.length > 0) {
            return places;
        }
    }
    console.warn('All Overpass endpoints failed or returned empty results. Using fallback data.');
    return getCebuFallbackPlaces(centerLatLng);
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/hooks/useScrollAnimation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useScrollAnimation",
    ()=>useScrollAnimation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function useScrollAnimation(options) {
    _s();
    const elementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useScrollAnimation.useEffect": ()=>{
            const element = elementRef.current;
            if (!element) return;
            const observer = new IntersectionObserver({
                "useScrollAnimation.useEffect": (param)=>{
                    let [entry] = param;
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        if (options === null || options === void 0 ? void 0 : options.triggerOnce) {
                            observer.unobserve(element);
                        }
                    } else if (!(options === null || options === void 0 ? void 0 : options.triggerOnce)) {
                        setIsVisible(false);
                    }
                }
            }["useScrollAnimation.useEffect"], {
                threshold: (options === null || options === void 0 ? void 0 : options.threshold) || 0.1,
                rootMargin: (options === null || options === void 0 ? void 0 : options.rootMargin) || "0px"
            });
            observer.observe(element);
            return ({
                "useScrollAnimation.useEffect": ()=>{
                    observer.disconnect();
                }
            })["useScrollAnimation.useEffect"];
        }
    }["useScrollAnimation.useEffect"], [
        options === null || options === void 0 ? void 0 : options.threshold,
        options === null || options === void 0 ? void 0 : options.rootMargin,
        options === null || options === void 0 ? void 0 : options.triggerOnce
    ]);
    return {
        ref: elementRef,
        isVisible
    };
}
_s(useScrollAnimation, "kj0+AkzNuhJENTgfnnAkIQJQPhA=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/dashboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-img-element */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$restaurants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/restaurants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useScrollAnimation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useScrollAnimation.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// Default Cebu City center coordinates
const CEBU_CENTER = [
    10.3157,
    123.8854
];
// Calculate distance between two coordinates using Haversine formula
function calculateDistanceKm(a, b) {
    const R = 6371; // Earth radius in km
    const dLat = (b[0] - a[0]) * Math.PI / 180;
    const dLon = (b[1] - a[1]) * Math.PI / 180;
    const lat1 = a[0] * Math.PI / 180;
    const lat2 = b[0] * Math.PI / 180;
    const sinDLat = Math.sin(dLat / 2);
    const sinDLon = Math.sin(dLon / 2);
    const aCalc = sinDLat * sinDLat + sinDLon * sinDLon * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(aCalc), Math.sqrt(1 - aCalc));
    return R * c;
}
function DashboardPage() {
    _s();
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [trendingRestaurants, setTrendingRestaurants] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingTrending, setLoadingTrending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [userLocation, setUserLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    // Get user location
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition({
                    "DashboardPage.useEffect": (position)=>{
                        setUserLocation([
                            position.coords.latitude,
                            position.coords.longitude
                        ]);
                    }
                }["DashboardPage.useEffect"], {
                    "DashboardPage.useEffect": ()=>{
                        // Use default Cebu City center if location access denied
                        setUserLocation(CEBU_CENTER);
                    }
                }["DashboardPage.useEffect"]);
            } else {
                setUserLocation(CEBU_CENTER);
            }
        }
    }["DashboardPage.useEffect"], []);
    // Load real trending restaurants on component mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            const loadTrendingRestaurants = {
                "DashboardPage.useEffect.loadTrendingRestaurants": async ()=>{
                    setLoadingTrending(true);
                    try {
                        const center = userLocation || CEBU_CENTER;
                        const trending = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$restaurants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTrendingRestaurants"])(center);
                        setTrendingRestaurants(trending);
                    } catch (error) {
                        console.error('Error loading trending restaurants:', error);
                        setTrendingRestaurants([]);
                    } finally{
                        setLoadingTrending(false);
                    }
                }
            }["DashboardPage.useEffect.loadTrendingRestaurants"];
            if (userLocation !== null) {
                loadTrendingRestaurants();
            }
        }
    }["DashboardPage.useEffect"], [
        userLocation
    ]);
    const handleTrendingClick = (item)=>{
        // Navigate to map page with real restaurant location
        const url = "/map?lat=".concat(item.latitude, "&lng=").concat(item.longitude, "&restaurant=").concat(encodeURIComponent(item.name));
        router.push(url);
    };
    const handleRecommendationClick = (item)=>{
        // Navigate to map page with restaurant location
        const url = "/map?lat=".concat(item.latitude, "&lng=").concat(item.longitude, "&restaurant=").concat(encodeURIComponent(item.name));
        router.push(url);
    };
    const getCategoryIcon = (category)=>{
        const icons = {
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
    const restaurantData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardPage.useMemo[restaurantData]": ()=>[
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
            ]
    }["DashboardPage.useMemo[restaurantData]"], []);
    // Calculate distances and format recommendations (recalculate when location changes)
    const recommendations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardPage.useMemo[recommendations]": ()=>{
            const center = userLocation || CEBU_CENTER;
            return restaurantData.map({
                "DashboardPage.useMemo[recommendations]": (restaurant)=>{
                    const distanceKm = calculateDistanceKm(center, [
                        restaurant.latitude,
                        restaurant.longitude
                    ]);
                    const distance = distanceKm < 1 ? "".concat((distanceKm * 1000).toFixed(0), " m") : "".concat(distanceKm.toFixed(1), " km");
                    return {
                        ...restaurant,
                        distance,
                        distanceKm
                    };
                }
            }["DashboardPage.useMemo[recommendations]"]).sort({
                "DashboardPage.useMemo[recommendations]": (a, b)=>a.distanceKm - b.distanceKm
            }["DashboardPage.useMemo[recommendations]"]); // Sort by distance
        }
    }["DashboardPage.useMemo[recommendations]"], [
        restaurantData,
        userLocation
    ]);
    // Get greeting based on time of day
    const getGreeting = ()=>{
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
            return "Good morning!";
        } else if (hour >= 12 && hour < 17) {
            return "Good afternoon!";
        } else if (hour >= 17 && hour < 22) {
            return "Good evening!";
        } else {
            return "Good night!";
        }
    };
    // Improved search function that handles partial matches and multiple words
    const searchMatches = (text, query)=>{
        if (!text || !query) return false;
        const normalizedText = String(text).toLowerCase().trim();
        const normalizedQuery = query.toLowerCase().trim();
        if (normalizedText.length === 0 || normalizedQuery.length === 0) return false;
        // Check for exact match or contains match
        if (normalizedText.includes(normalizedQuery)) return true;
        // Check if all words in query are present in text (for multi-word searches)
        const queryWords = normalizedQuery.split(/\s+/).filter((w)=>w.length > 0);
        if (queryWords.length > 1) {
            return queryWords.every((word)=>normalizedText.includes(word));
        }
        return false;
    };
    const normalizedQuery = searchQuery.trim().toLowerCase();
    // Filter recommendations with improved search
    const filteredRecommendations = normalizedQuery ? recommendations.filter((item)=>{
        const searchFields = [
            item.name,
            item.description,
            item.price,
            item.status
        ].filter(Boolean); // Remove null/undefined values
        return searchFields.length > 0 && searchFields.some((value)=>searchMatches(String(value), normalizedQuery));
    }) : recommendations;
    // Filter trending restaurants with improved search
    const filteredTrendingRestaurants = normalizedQuery ? trendingRestaurants.filter((item)=>{
        const searchFields = [
            item.name,
            item.category,
            item.description,
            item.price_range,
            item.cuisine_type
        ].filter(Boolean); // Remove null/undefined values
        return searchFields.length > 0 && searchFields.some((value)=>searchMatches(String(value), normalizedQuery));
    }) : trendingRestaurants;
    // Scroll animations
    const heroRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useScrollAnimation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollAnimation"])({
        threshold: 0.2,
        triggerOnce: true
    });
    const searchRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useScrollAnimation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollAnimation"])({
        threshold: 0.2,
        triggerOnce: true
    });
    const recommendationsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useScrollAnimation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollAnimation"])({
        threshold: 0.1,
        triggerOnce: true
    });
    const trendingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useScrollAnimation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollAnimation"])({
        threshold: 0.1,
        triggerOnce: true
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-white animate-fade-in",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-1 bg-gray-300"
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 266,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-white py-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: heroRef.ref,
                            className: "text-center mb-8 ".concat(heroRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl font-bold text-gray-900 mb-2",
                                    children: getGreeting()
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 275,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg text-gray-600",
                                    children: "Discover your next favorite spot"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 276,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 271,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: searchRef.ref,
                            className: "max-w-2xl mx-auto mb-6 ".concat(searchRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'),
                            style: {
                                transitionDelay: '0.1s'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "h-5 w-5 text-gray-400",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 288,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 287,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 286,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: searchQuery,
                                        onChange: (e)=>setSearchQuery(e.target.value),
                                        onKeyDown: (e)=>{
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                            // Search is already live, just ensure focus stays
                                            }
                                        },
                                        placeholder: "Search restaurants, cafes, events...",
                                        className: "w-full pl-10 pr-10 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 291,
                                        columnNumber: 15
                                    }, this),
                                    searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setSearchQuery(""),
                                        className: "absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-lg transition-colors",
                                        "aria-label": "Clear search",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "h-5 w-5 text-gray-400 hover:text-gray-600",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M6 18L18 6M6 6l12 12"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 311,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 310,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 305,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 285,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 280,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center gap-3 mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/feed",
                                    className: "flex items-center gap-2 px-6 py-3 bg-[#8c52ff] text-white rounded-full hover:opacity-90 transition-all hover-scale btn-press btn-ripple",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "h-5 w-5",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 322,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 321,
                                            columnNumber: 15
                                        }, this),
                                        "Ask AI"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 320,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/map",
                                    className: "flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50 transition-all hover-scale btn-press",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "h-5 w-5",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 328,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 329,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 327,
                                            columnNumber: 15
                                        }, this),
                                        "Map"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 326,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 319,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/page.tsx",
                    lineNumber: 270,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 269,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-gray-50 py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: recommendationsRef.ref,
                            className: "flex justify-between items-center mb-8 ".concat(recommendationsRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-bold text-gray-900",
                                    children: [
                                        "AI Recommendations",
                                        normalizedQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-normal text-gray-500 ml-2",
                                            children: [
                                                "(",
                                                filteredRecommendations.length,
                                                " ",
                                                filteredRecommendations.length === 1 ? 'result' : 'results',
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 347,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 344,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>router.push('/map#food-places'),
                                    className: "text-blue-600 hover:text-blue-800 font-medium transition-colors hover-scale",
                                    children: "See all"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 352,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 340,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: normalizedQuery && filteredRecommendations.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-10 bg-white rounded-xl border border-dashed border-gray-300 animate-fade-in",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600 font-medium mb-1",
                                        children: [
                                            'No matches found for "',
                                            searchQuery,
                                            '"'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 363,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-400",
                                        children: "Try searching for: Jollibee, Starbucks, Coffee, Fast Food, etc."
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 364,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 362,
                                columnNumber: 15
                            }, this) : filteredRecommendations.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-10 bg-white rounded-xl border border-dashed border-gray-300 animate-fade-in",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600 font-medium mb-1",
                                        children: "No recommendations available"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 368,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-400",
                                        children: "Check back later for new recommendations."
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 369,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 367,
                                columnNumber: 15
                            }, this) : filteredRecommendations.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center gap-4 card-hover stagger-item cursor-pointer",
                                    style: {
                                        animationDelay: "".concat(index * 0.1, "s")
                                    },
                                    onClick: ()=>handleRecommendationClick(item),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 hover-brighten",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: item.image,
                                                    alt: item.name,
                                                    className: "absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110",
                                                    loading: "lazy",
                                                    onError: (e)=>{
                                                        const target = e.target;
                                                        target.src = "/Landing.png";
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 380,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-all hover-scale btn-press",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "h-4 w-4 text-gray-600",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 392,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 391,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 390,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 379,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start justify-between",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-semibold text-gray-900 text-lg",
                                                            children: item.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 400,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-600 text-sm mb-2",
                                                            children: item.description
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 401,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-4 text-sm text-gray-500",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: item.distance
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 403,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-medium ".concat(item.status === 'Open' ? 'text-green-600' : 'text-red-600'),
                                                                    children: item.status
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 404,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: item.price
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 407,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-yellow-400",
                                                                            children: "★"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                                            lineNumber: 409,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: item.rating
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                                            lineNumber: 410,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 408,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 402,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 399,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 398,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 397,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 373,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 360,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/page.tsx",
                    lineNumber: 339,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 338,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-gray-50 py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: trendingRef.ref,
                            className: "flex items-center justify-between mb-8 ".concat(trendingRef.isVisible ? 'animate-fade-in-up' : 'opacity-0'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-2xl font-bold text-gray-900",
                                            children: [
                                                "Trending in your area",
                                                normalizedQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-normal text-gray-500 ml-2",
                                                    children: [
                                                        "(",
                                                        filteredTrendingRestaurants.length,
                                                        " ",
                                                        filteredTrendingRestaurants.length === 1 ? 'result' : 'results',
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 434,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 431,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-600 mt-1",
                                            children: normalizedQuery ? 'Search results for "'.concat(searchQuery, '"') : 'Based on recent visits and ratings'
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 439,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 430,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>router.push('/map#food-places'),
                                    className: "text-[#8c52ff] hover:text-[#7c42ef] font-medium transition-all hover-scale",
                                    children: "View all →"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 443,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 426,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
                            children: loadingTrending ? // Loading skeleton
                            Array.from({
                                length: 8
                            }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden loading-skeleton",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "aspect-video bg-gray-200"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 456,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-4 bg-gray-200 rounded mb-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 458,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-3 bg-gray-200 rounded mb-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 459,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-3 bg-gray-200 rounded mb-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 460,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-8 bg-gray-200 rounded"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 461,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 457,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 455,
                                    columnNumber: 17
                                }, this)) : normalizedQuery && filteredTrendingRestaurants.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-gray-300",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600 font-medium mb-1",
                                        children: [
                                            'No trending restaurants found for "',
                                            searchQuery,
                                            '"'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 467,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-400 mt-1",
                                        children: "Try searching for: Cafe, Restaurant, Fast Food, Pizza, etc."
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 468,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 466,
                                columnNumber: 15
                            }, this) : filteredTrendingRestaurants.length > 0 ? filteredTrendingRestaurants.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden card-hover cursor-pointer group stagger-item",
                                    style: {
                                        animationDelay: "".concat(index * 0.1, "s")
                                    },
                                    onClick: ()=>handleTrendingClick(item),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "aspect-video bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 mx-auto shadow-sm",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-2xl",
                                                                children: getCategoryIcon(item.category)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 481,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 480,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs font-medium text-gray-600",
                                                            children: item.category
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 483,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 479,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute top-2 right-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm",
                                                        children: item.trend
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 486,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 485,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 478,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start justify-between mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-semibold text-gray-900 text-sm group-hover:text-[#8c52ff] transition-colors",
                                                            children: item.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 494,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-1 ml-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-yellow-400 text-xs",
                                                                    children: "★"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 498,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs font-medium text-gray-600",
                                                                    children: item.rating
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 499,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 497,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 493,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-gray-600 mb-3 line-clamp-2",
                                                    children: item.description
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 503,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between text-xs text-gray-500 mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: item.distance ? "".concat(item.distance.toFixed(1), " km") : 'Nearby'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 507,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-medium text-green-600",
                                                                    children: item.is_open ? 'Open' : 'Closed'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 508,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 506,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium",
                                                            children: item.price_range
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 510,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 505,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "w-full text-xs bg-[#8c52ff] text-white py-2 px-3 rounded-lg hover:bg-[#7c42ef] transition-colors font-medium",
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        handleTrendingClick(item);
                                                    },
                                                    children: "View on Map"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 513,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 492,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 472,
                                    columnNumber: 15
                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-span-full text-center py-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-500",
                                        children: "No trending restaurants found in your area."
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 527,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-400 mt-1",
                                        children: "Try refreshing the page or check back later."
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 528,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 526,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 451,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/page.tsx",
                    lineNumber: 425,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 424,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/page.tsx",
        lineNumber: 264,
        columnNumber: 5
    }, this);
}
_s(DashboardPage, "ocG1qjNT3kfLcOnDU7Ymmmw9T4Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useScrollAnimation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollAnimation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useScrollAnimation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollAnimation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useScrollAnimation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollAnimation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useScrollAnimation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollAnimation"]
    ];
});
_c = DashboardPage;
var _c;
__turbopack_context__.k.register(_c, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_abed5c82._.js.map