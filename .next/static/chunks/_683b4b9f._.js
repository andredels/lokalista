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
"[project]/app/map/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FoodMapPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, react-hooks/exhaustive-deps, react/no-unescaped-entities */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$restaurants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/restaurants.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const DEFAULT_CENTER = [
    10.3157,
    123.8854
];
// Cebu City bounding box (approximate)
const CEBU_BOUNDS = {
    north: 10.5,
    south: 10.2,
    east: 123.95,
    west: 123.8
};
// Maximum distance from Cebu center (in km) to filter results
const MAX_DISTANCE_FROM_CEBU = 25; // 25km radius from Cebu center
// FoodPlace interface is now imported from lib/restaurants
function FoodMapPageInner() {
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const mapEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const userMarkerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const foodMarkersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const restaurantMarkerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const searchMarkerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const initializingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [categoryFilter, setCategoryFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [featureFilter, setFeatureFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loadingLoc, setLoadingLoc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searching, setSearching] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [suggestions, setSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showSuggestions, setShowSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const debounceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [foodPlaces, setFoodPlaces] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filteredPlaces, setFilteredPlaces] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentZoom, setCurrentZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(14);
    const [loadingPlaces, setLoadingPlaces] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [userLocation, setUserLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedPlace, setSelectedPlace] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [nearbyPlaces, setNearbyPlaces] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [clickedLocation, setClickedLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [lastSearchCenter, setLastSearchCenter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_CENTER);
    const [showNearbyPlaces, setShowNearbyPlaces] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [clickMarker, setClickMarker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const clickMarkersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const calculateDistanceKm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FoodMapPageInner.useCallback[calculateDistanceKm]": (a, b)=>{
            const R = 6371;
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
    }["FoodMapPageInner.useCallback[calculateDistanceKm]"], []);
    // Function to scroll to the map container
    const scrollToMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FoodMapPageInner.useCallback[scrollToMap]": ()=>{
            if (mapContainerRef.current) {
                mapContainerRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }["FoodMapPageInner.useCallback[scrollToMap]"], []);
    // Helper function to add a restaurant marker on the map
    const addRestaurantMarker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FoodMapPageInner.useCallback[addRestaurantMarker]": (place)=>{
            const L = window.L;
            if (!mapRef.current || !L) return;
            // Remove existing restaurant marker
            if (restaurantMarkerRef.current) {
                try {
                    mapRef.current.removeLayer(restaurantMarkerRef.current);
                } catch (error) {
                    console.warn('Error removing restaurant marker:', error);
                }
                restaurantMarkerRef.current = null;
            }
            const placeLatLng = [
                place.latitude,
                place.longitude
            ];
            // Create a special marker for the selected restaurant
            const restaurantIcon = L.divIcon({
                html: '<div style="background:#8c52ff;color:#fff;border-radius:9999px;padding:8px 12px;box-shadow:0 2px 6px rgba(0,0,0,.25);font-weight:bold;font-size:12px;border:3px solid white">📍 '.concat(place.name, "</div>"),
                className: 'restaurant-marker',
                iconSize: [
                    120,
                    32
                ],
                iconAnchor: [
                    60,
                    16
                ]
            });
            const restaurantMarker = L.marker(placeLatLng, {
                icon: restaurantIcon
            });
            restaurantMarker.addTo(mapRef.current);
            // Show popup with restaurant info
            const popupContent = '\n      <div style="text-align: center; padding: 8px; min-width: 200px;">\n        <h3 style="margin: 0 0 8px 0; color: #8c52ff; font-weight: bold; font-size: 16px;">'.concat(place.name, '</h3>\n        <p style="margin: 4px 0; color: #666; font-size: 13px;">').concat(place.category, "</p>\n        ").concat(place.rating ? '<p style="margin: 4px 0; color: #666; font-size: 12px;">⭐ '.concat(place.rating.toFixed(1), "</p>") : '', "\n        ").concat(place.price_range ? '<p style="margin: 4px 0; color: #666; font-size: 12px;">'.concat(place.price_range, "</p>") : '', "\n        ").concat(place.distance ? '<p style="margin: 4px 0; color: #666; font-size: 12px;">📏 '.concat((place.distance * 1000).toFixed(0), "m away</p>") : '', '\n        <p style="margin: 8px 0 0 0; color: #999; font-size: 11px;">').concat(place.latitude.toFixed(6), ", ").concat(place.longitude.toFixed(6), "</p>\n      </div>\n    ");
            restaurantMarker.bindPopup(popupContent).openPopup();
            // Store marker reference
            restaurantMarkerRef.current = restaurantMarker;
            // Center map on the restaurant
            mapRef.current.setView(placeLatLng, 16);
            // Scroll to map so user can see the marker
            scrollToMap();
            return restaurantMarker;
        }
    }["FoodMapPageInner.useCallback[addRestaurantMarker]"], [
        scrollToMap
    ]);
    // Initialize Leaflet map with satellite view focused on food places
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FoodMapPageInner.useEffect": ()=>{
            const ensureAssets = {
                "FoodMapPageInner.useEffect.ensureAssets": async ()=>{
                    if (!document.querySelector('link[data-leaflet-css="true"]')) {
                        const link = document.createElement("link");
                        link.rel = "stylesheet";
                        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
                        link.setAttribute("data-leaflet-css", "true");
                        document.head.appendChild(link);
                    }
                    if (!window.L) {
                        await new Promise({
                            "FoodMapPageInner.useEffect.ensureAssets": (resolve)=>{
                                const script = document.createElement("script");
                                script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
                                script.async = true;
                                script.onload = ({
                                    "FoodMapPageInner.useEffect.ensureAssets": ()=>resolve()
                                })["FoodMapPageInner.useEffect.ensureAssets"];
                                document.body.appendChild(script);
                            }
                        }["FoodMapPageInner.useEffect.ensureAssets"]);
                    }
                }
            }["FoodMapPageInner.useEffect.ensureAssets"];
            const init = {
                "FoodMapPageInner.useEffect.init": async ()=>{
                    if (initializingRef.current || mapRef.current) return;
                    initializingRef.current = true;
                    await ensureAssets();
                    const L = window.L;
                    if (!mapEl.current) return;
                    // Default to Cebu City center (similar to your reference image)
                    const defaultCenter = DEFAULT_CENTER;
                    mapRef.current = L.map(mapEl.current, {
                        center: defaultCenter,
                        zoom: 14,
                        zoomControl: true,
                        zoomControlOptions: {
                            position: 'topleft'
                        },
                        // Modern map settings for better performance
                        preferCanvas: true,
                        zoomSnap: 0.25,
                        zoomDelta: 0.5,
                        wheelPxPerZoomLevel: 120,
                        // Enable smooth zooming
                        zoomAnimation: true,
                        fadeAnimation: true,
                        markerZoomAnimation: true,
                        // Modern attribution control
                        attributionControl: true,
                        attributionControlOptions: {
                            position: 'bottomright'
                        }
                    });
                    // Modern high-resolution satellite imagery with latest data
                    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
                        maxZoom: 22,
                        attribution: '&copy; Esri, Maxar, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community',
                        subdomains: [
                            'server',
                            'services'
                        ]
                    }).addTo(mapRef.current);
                    // Latest street overlay with high detail
                    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}", {
                        maxZoom: 22,
                        attribution: '&copy; Esri',
                        opacity: 0.7,
                        subdomains: [
                            'server',
                            'services'
                        ]
                    }).addTo(mapRef.current);
                    // Add modern OpenStreetMap layer as alternative (latest data)
                    const osmLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                        maxZoom: 19,
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                        subdomains: [
                            'a',
                            'b',
                            'c'
                        ]
                    });
                    // Add layer control for switching between map types
                    const baseMaps = {
                        "Satellite": L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
                            maxZoom: 22,
                            attribution: '&copy; Esri, Maxar, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community',
                            subdomains: [
                                'server',
                                'services'
                            ]
                        }),
                        "Street Map": L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                            maxZoom: 19,
                            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                            subdomains: [
                                'a',
                                'b',
                                'c'
                            ]
                        }),
                        "Hybrid": L.layerGroup([
                            L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
                                maxZoom: 22,
                                attribution: '&copy; Esri, Maxar, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community',
                                subdomains: [
                                    'server',
                                    'services'
                                ]
                            }),
                            L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}", {
                                maxZoom: 22,
                                attribution: '&copy; Esri',
                                opacity: 0.7,
                                subdomains: [
                                    'server',
                                    'services'
                                ]
                            })
                        ])
                    };
                    // Add layer control to map
                    // Place layer control away from the profile dropdown (move to bottom right)
                    L.control.layers(baseMaps, {}, {
                        position: 'bottomright',
                        collapsed: true
                    }).addTo(mapRef.current);
                    // Ask for geolocation and center
                    locateUser();
                    // Click anywhere on map to show nearby places
                    mapRef.current.on("click", {
                        "FoodMapPageInner.useEffect.init": async (e)=>{
                            const latlng = e.latlng;
                            let clickedLatLng = [
                                latlng.lat,
                                latlng.lng
                            ];
                            console.log('Map clicked at:', clickedLatLng);
                            // Check if clicked location is within Cebu bounds
                            const inCebuBounds = clickedLatLng[0] >= CEBU_BOUNDS.south && clickedLatLng[0] <= CEBU_BOUNDS.north && clickedLatLng[1] >= CEBU_BOUNDS.west && clickedLatLng[1] <= CEBU_BOUNDS.east;
                            const distanceFromCebu = calculateDistanceKm(DEFAULT_CENTER, clickedLatLng);
                            if (!inCebuBounds || distanceFromCebu > MAX_DISTANCE_FROM_CEBU) {
                                alert("Please click within Cebu area. The map is restricted to Cebu locations only.");
                                return;
                            }
                            // Remove ALL previous click markers
                            if (mapRef.current) {
                                clickMarkersRef.current.forEach({
                                    "FoodMapPageInner.useEffect.init": (marker)=>{
                                        try {
                                            mapRef.current.removeLayer(marker);
                                        } catch (error) {
                                            console.warn('Error removing click marker:', error);
                                        }
                                    }
                                }["FoodMapPageInner.useEffect.init"]);
                                clickMarkersRef.current = [];
                                setClickMarker(null);
                            }
                            // Add a visual marker for the clicked location
                            const L = window.L;
                            const clickIcon = L.divIcon({
                                html: '<div style="background:#ef4444;color:#fff;border-radius:9999px;padding:8px 12px;box-shadow:0 2px 6px rgba(0,0,0,.25);font-weight:bold;font-size:12px">📍 Clicked</div>',
                                className: '',
                                iconSize: [
                                    60,
                                    28
                                ],
                                iconAnchor: [
                                    30,
                                    14
                                ]
                            });
                            const newClickMarker = L.marker(clickedLatLng, {
                                icon: clickIcon
                            });
                            newClickMarker.addTo(mapRef.current);
                            newClickMarker.bindPopup("Clicked location<br>".concat(clickedLatLng[0].toFixed(6), ", ").concat(clickedLatLng[1].toFixed(6))).openPopup();
                            // Track the new marker
                            clickMarkersRef.current.push(newClickMarker);
                            setClickMarker(newClickMarker);
                            // Set loading state for nearby places
                            setLoadingPlaces(true);
                            setClickedLocation(clickedLatLng);
                            setShowNearbyPlaces(true);
                            setSelectedPlace(null); // Clear any selected place
                            try {
                                // Fetch new places around the clicked location using Places API
                                console.log('Fetching new places for clicked location...');
                                const newPlaces = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$restaurants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchRealFoodPlaces"])(clickedLatLng);
                                // Filter places to only show those within Cebu area
                                const referenceLocation = userLocation || DEFAULT_CENTER;
                                const filteredPlaces = newPlaces.filter({
                                    "FoodMapPageInner.useEffect.init.filteredPlaces": (place)=>{
                                        // Check if place is within Cebu bounds
                                        const placeInBounds = place.latitude >= CEBU_BOUNDS.south && place.latitude <= CEBU_BOUNDS.north && place.longitude >= CEBU_BOUNDS.west && place.longitude <= CEBU_BOUNDS.east;
                                        if (!placeInBounds) return false;
                                        // Check distance from reference location
                                        const distanceFromRef = calculateDistanceKm(referenceLocation, [
                                            place.latitude,
                                            place.longitude
                                        ]);
                                        return distanceFromRef <= MAX_DISTANCE_FROM_CEBU;
                                    }
                                }["FoodMapPageInner.useEffect.init.filteredPlaces"]);
                                console.log('Found', filteredPlaces.length, 'places within Cebu area for clicked location');
                                // Update the main food places state with the filtered places
                                setFoodPlaces(filteredPlaces);
                                // Filter places based on current zoom level
                                if (mapRef.current) {
                                    const zoom = mapRef.current.getZoom();
                                    filterPlacesByZoom(filteredPlaces, zoom);
                                } else {
                                    filterPlacesByZoom(filteredPlaces, currentZoom);
                                }
                                // Find nearby places around the clicked location from the filtered places
                                const nearby = findNearbyPlaces(clickedLatLng, filteredPlaces, 1); // 1km radius
                                console.log('Found nearby places from filtered data:', nearby.length);
                                setNearbyPlaces(nearby);
                            } catch (error) {
                                console.error("Error fetching places for clicked location:", error);
                                // Fallback: find nearby places from existing foodPlaces (already filtered)
                                const nearby = findNearbyPlaces(clickedLatLng, foodPlaces, 1);
                                console.log('Using fallback nearby places:', nearby.length);
                                setNearbyPlaces(nearby);
                            } finally{
                                setLoadingPlaces(false);
                            }
                        }
                    }["FoodMapPageInner.useEffect.init"]);
                    // Track zoom level changes
                    mapRef.current.on("zoomend", {
                        "FoodMapPageInner.useEffect.init": ()=>{
                            if (mapRef.current) {
                                const zoom = mapRef.current.getZoom();
                                setCurrentZoom(zoom);
                            }
                        }
                    }["FoodMapPageInner.useEffect.init"]);
                    // Set initial zoom level
                    setCurrentZoom(mapRef.current.getZoom());
                    // Load initial food places around default center
                    setTimeout({
                        "FoodMapPageInner.useEffect.init": ()=>{
                            searchFoodPlaces(DEFAULT_CENTER);
                        }
                    }["FoodMapPageInner.useEffect.init"], 1000);
                    initializingRef.current = false;
                }
            }["FoodMapPageInner.useEffect.init"];
            init();
            return ({
                "FoodMapPageInner.useEffect": ()=>{
                    if (mapRef.current) {
                        // Clean up ALL click markers
                        clickMarkersRef.current.forEach({
                            "FoodMapPageInner.useEffect": (marker)=>{
                                try {
                                    mapRef.current.removeLayer(marker);
                                } catch (error) {
                                    console.warn('Error removing click marker during cleanup:', error);
                                }
                            }
                        }["FoodMapPageInner.useEffect"]);
                        clickMarkersRef.current = [];
                        mapRef.current.remove();
                        mapRef.current = null;
                    }
                }
            })["FoodMapPageInner.useEffect"];
        }
    }["FoodMapPageInner.useEffect"], []);
    // Handle URL parameters for restaurant navigation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FoodMapPageInner.useEffect": ()=>{
            if (!mapRef.current) return;
            const lat = searchParams.get('lat');
            const lng = searchParams.get('lng');
            const restaurant = searchParams.get('restaurant');
            if (lat && lng) {
                const coordinates = [
                    parseFloat(lat),
                    parseFloat(lng)
                ];
                console.log('Centering map on restaurant:', restaurant, 'at', coordinates);
                // Center map on the restaurant location
                mapRef.current.setView(coordinates, 16);
                // Add a special marker for the restaurant
                const L = window.L;
                if (L) {
                    const restaurantIcon = L.divIcon({
                        html: '<div style="background:#8c52ff;color:#fff;border-radius:9999px;padding:8px 12px;box-shadow:0 2px 6px rgba(0,0,0,.25);font-weight:bold;font-size:12px;border:3px solid white">📍 '.concat(restaurant || 'Restaurant', "</div>"),
                        className: '',
                        iconSize: [
                            80,
                            32
                        ],
                        iconAnchor: [
                            40,
                            16
                        ]
                    });
                    const restaurantMarker = L.marker(coordinates, {
                        icon: restaurantIcon
                    });
                    restaurantMarker.addTo(mapRef.current);
                    // Show popup with restaurant info
                    restaurantMarker.bindPopup('\n          <div style="text-align: center; padding: 8px;">\n            <h3 style="margin: 0 0 8px 0; color: #8c52ff; font-weight: bold;">'.concat(restaurant || 'Selected Restaurant', '</h3>\n            <p style="margin: 0; color: #666; font-size: 14px;">Click on the map to explore nearby places!</p>\n          </div>\n        ')).openPopup();
                    // Clean up the marker when component unmounts or params change
                    return ({
                        "FoodMapPageInner.useEffect": ()=>{
                            try {
                                var _mapRef_current;
                                (_mapRef_current = mapRef.current) === null || _mapRef_current === void 0 ? void 0 : _mapRef_current.removeLayer(restaurantMarker);
                            } catch (error) {
                                console.warn('Error removing restaurant marker:', error);
                            }
                        }
                    })["FoodMapPageInner.useEffect"];
                }
            }
        }
    }["FoodMapPageInner.useEffect"], [
        searchParams,
        mapRef.current
    ]);
    async function locateUser() {
        if (!mapRef.current) return;
        if (!("geolocation" in navigator)) return;
        try {
            setLoadingLoc(true);
            const pos = await new Promise((resolve, reject)=>{
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 10000
                });
            });
            const latlng = [
                pos.coords.latitude,
                pos.coords.longitude
            ];
            setUserLocation(latlng);
            const L = window.L;
            if (userMarkerRef.current) {
                userMarkerRef.current.setLatLng(latlng);
            } else {
                const youIcon = L.divIcon({
                    html: '<div style="background:#ef4444;color:#fff;border-radius:9999px;padding:6px 10px;box-shadow:0 2px 6px rgba(0,0,0,.25);font-weight:bold">📍 You</div>',
                    className: '',
                    iconSize: [
                        50,
                        24
                    ],
                    iconAnchor: [
                        25,
                        12
                    ]
                });
                userMarkerRef.current = L.marker(latlng, {
                    icon: youIcon
                });
                userMarkerRef.current.addTo(mapRef.current);
            }
            mapRef.current.setView(latlng, 15);
            userMarkerRef.current.bindPopup("You are here").openPopup();
        // Don't auto-search - let user click "Search Food Places" button instead
        } catch (_) {
        // ignore; user may deny permission
        } finally{
            setLoadingLoc(false);
        }
    }
    // Fixed sample food places data for demonstration (Cebu City area)
    const getSampleFoodPlaces = (centerLatLng)=>{
        // Use fixed coordinates around Cebu City instead of relative to click
        const samplePlaces = [
            {
                id: "1",
                name: "Jollibee",
                category: "Fast Foods",
                rating: 4.2,
                price_range: "$$",
                latitude: 10.3157,
                longitude: 123.8854,
                description: "Popular Filipino fast food chain",
                cuisine_type: "Local Cuisine",
                is_open: true,
                features: [
                    "Budget-Friendly",
                    "Family-Friendly"
                ]
            },
            {
                id: "2",
                name: "McDonald's",
                category: "Fast Foods",
                rating: 4.0,
                price_range: "$$",
                latitude: 10.3167,
                longitude: 123.8864,
                description: "International fast food chain",
                cuisine_type: "International Cuisine",
                is_open: true,
                features: [
                    "Budget-Friendly",
                    "Family-Friendly",
                    "Open 24 Hours"
                ]
            },
            {
                id: "3",
                name: "Starbucks Coffee",
                category: "Cafes",
                rating: 4.3,
                price_range: "$$$",
                latitude: 10.3147,
                longitude: 123.8844,
                description: "Premium coffee and pastries",
                cuisine_type: "International Cuisine",
                is_open: true,
                features: [
                    "Pet-Friendly"
                ]
            },
            {
                id: "4",
                name: "Chowking",
                category: "Local Cuisine",
                rating: 4.1,
                price_range: "$$",
                latitude: 10.3177,
                longitude: 123.8874,
                description: "Chinese-Filipino cuisine",
                cuisine_type: "Local Cuisine",
                is_open: true,
                features: [
                    "Budget-Friendly",
                    "Family-Friendly"
                ]
            },
            {
                id: "5",
                name: "KFC",
                category: "Fast Foods",
                rating: 4.0,
                price_range: "$$",
                latitude: 10.3137,
                longitude: 123.8834,
                description: "Fried chicken and sides",
                cuisine_type: "International Cuisine",
                is_open: true,
                features: [
                    "Budget-Friendly",
                    "Family-Friendly"
                ]
            },
            {
                id: "6",
                name: "Greenwich Pizza",
                category: "Fast Foods",
                rating: 3.9,
                price_range: "$$",
                latitude: 10.3187,
                longitude: 123.8884,
                description: "Pizza and pasta",
                cuisine_type: "International Cuisine",
                is_open: true,
                features: [
                    "Budget-Friendly",
                    "Family-Friendly"
                ]
            },
            {
                id: "7",
                name: "Mang Inasal",
                category: "Local Cuisine",
                rating: 4.4,
                price_range: "$$",
                latitude: 10.3127,
                longitude: 123.8824,
                description: "Grilled chicken and Filipino dishes",
                cuisine_type: "Local Cuisine",
                is_open: true,
                features: [
                    "Budget-Friendly",
                    "Family-Friendly"
                ]
            },
            {
                id: "8",
                name: "Coffee Bean & Tea Leaf",
                category: "Cafes",
                rating: 4.2,
                price_range: "$$$",
                latitude: 10.3197,
                longitude: 123.8894,
                description: "Coffee, tea, and light meals",
                cuisine_type: "International Cuisine",
                is_open: true,
                features: [
                    "Pet-Friendly"
                ]
            },
            {
                id: "9",
                name: "Pizza Hut",
                category: "Fine Dining",
                rating: 4.1,
                price_range: "$$$",
                latitude: 10.3117,
                longitude: 123.8814,
                description: "Pizza, pasta, and wings",
                cuisine_type: "International Cuisine",
                is_open: true,
                features: [
                    "Family-Friendly"
                ]
            },
            {
                id: "10",
                name: "Subway",
                category: "Fast Foods",
                rating: 4.0,
                price_range: "$$",
                latitude: 10.3207,
                longitude: 123.8904,
                description: "Fresh sandwiches and salads",
                cuisine_type: "International Cuisine",
                is_open: true,
                features: [
                    "Budget-Friendly",
                    "Family-Friendly"
                ]
            },
            {
                id: "11",
                name: "Goldilocks",
                category: "Bakeries/Pastries",
                rating: 4.3,
                price_range: "$$",
                latitude: 10.3107,
                longitude: 123.8804,
                description: "Filipino bakery and cakes",
                cuisine_type: "Local Cuisine",
                is_open: true,
                features: [
                    "Budget-Friendly",
                    "Family-Friendly"
                ]
            },
            {
                id: "12",
                name: "Red Ribbon",
                category: "Bakeries/Pastries",
                rating: 4.1,
                price_range: "$$",
                latitude: 10.3217,
                longitude: 123.8914,
                description: "Cakes and pastries",
                cuisine_type: "Local Cuisine",
                is_open: true,
                features: [
                    "Budget-Friendly",
                    "Family-Friendly"
                ]
            },
            {
                id: "13",
                name: "Yellow Cab Pizza",
                category: "Fine Dining",
                rating: 4.2,
                price_range: "$$$",
                latitude: 10.3097,
                longitude: 123.8794,
                description: "New York style pizza",
                cuisine_type: "International Cuisine",
                is_open: true,
                features: [
                    "Family-Friendly"
                ]
            },
            {
                id: "14",
                name: "Tokyo Tokyo",
                category: "Fast Foods",
                rating: 4.0,
                price_range: "$$",
                latitude: 10.3227,
                longitude: 123.8924,
                description: "Japanese fast food",
                cuisine_type: "International Cuisine",
                is_open: true,
                features: [
                    "Budget-Friendly",
                    "Family-Friendly"
                ]
            },
            {
                id: "15",
                name: "Bonchon",
                category: "Fine Dining",
                rating: 4.4,
                price_range: "$$$",
                latitude: 10.3087,
                longitude: 123.8784,
                description: "Korean fried chicken",
                cuisine_type: "International Cuisine",
                is_open: true,
                features: [
                    "Family-Friendly"
                ]
            }
        ];
        // Filter by category if selected
        let filtered = samplePlaces;
        if (categoryFilter) {
            filtered = filtered.filter((place)=>place.category === categoryFilter);
        }
        // Filter by features if selected
        if (featureFilter) {
            filtered = filtered.filter((place)=>{
                var _place_features;
                return (_place_features = place.features) === null || _place_features === void 0 ? void 0 : _place_features.includes(featureFilter);
            });
        }
        return filtered.map((place)=>({
                ...place,
                distance: calculateDistanceKm(centerLatLng, [
                    place.latitude,
                    place.longitude
                ])
            }));
    };
    async function searchFoodPlaces(centerLatLng) {
        setLastSearchCenter(centerLatLng);
        setLoadingPlaces(true);
        try {
            console.log("Searching for real food places at:", centerLatLng);
            // Check if the search center is within Cebu bounds
            const inCebuBounds = centerLatLng[0] >= CEBU_BOUNDS.south && centerLatLng[0] <= CEBU_BOUNDS.north && centerLatLng[1] >= CEBU_BOUNDS.west && centerLatLng[1] <= CEBU_BOUNDS.east;
            const distanceFromCebu = calculateDistanceKm(DEFAULT_CENTER, centerLatLng);
            if (!inCebuBounds || distanceFromCebu > MAX_DISTANCE_FROM_CEBU) {
                console.warn("Search location is outside Cebu area. Restricting to Cebu center.");
                // Use Cebu center instead
                centerLatLng = DEFAULT_CENTER;
            }
            // Use OpenStreetMap Overpass API for real restaurant data
            const places = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$restaurants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchRealFoodPlaces"])(centerLatLng);
            // Filter places to only show those within max distance from user location or Cebu center
            const referenceLocation = userLocation || DEFAULT_CENTER;
            const placesWithDistance = places.map((place)=>{
                var _place_distance;
                return {
                    ...place,
                    distance: (_place_distance = place.distance) !== null && _place_distance !== void 0 ? _place_distance : calculateDistanceKm(centerLatLng, [
                        place.latitude,
                        place.longitude
                    ])
                };
            }).filter((place)=>{
                // Check if place is within Cebu bounds
                const inBounds = place.latitude >= CEBU_BOUNDS.south && place.latitude <= CEBU_BOUNDS.north && place.longitude >= CEBU_BOUNDS.west && place.longitude <= CEBU_BOUNDS.east;
                if (!inBounds) return false;
                // Check distance from reference location (user location or Cebu center)
                const distanceFromRef = calculateDistanceKm(referenceLocation, [
                    place.latitude,
                    place.longitude
                ]);
                return distanceFromRef <= MAX_DISTANCE_FROM_CEBU;
            });
            console.log("Found", placesWithDistance.length, "real places within Cebu area");
            setFoodPlaces(placesWithDistance);
            // Filter places based on current zoom level
            if (mapRef.current) {
                const zoom = mapRef.current.getZoom();
                filterPlacesByZoom(placesWithDistance, zoom);
            } else {
                // Fallback if map not ready
                filterPlacesByZoom(placesWithDistance, currentZoom);
            }
        } catch (error) {
            console.error("Error fetching food places:", error);
            // Fallback to sample data if real data fails
            console.log("Falling back to sample data");
            const fallbackPlaces = getSampleFoodPlaces(centerLatLng);
            // Filter fallback places to only show those within Cebu area
            const referenceLocation = userLocation || DEFAULT_CENTER;
            const filteredFallback = fallbackPlaces.filter((place)=>{
                const distanceFromRef = calculateDistanceKm(referenceLocation, [
                    place.latitude,
                    place.longitude
                ]);
                return distanceFromRef <= MAX_DISTANCE_FROM_CEBU;
            });
            setFoodPlaces(filteredFallback);
            // Filter places based on current zoom level
            if (mapRef.current) {
                const zoom = mapRef.current.getZoom();
                filterPlacesByZoom(filteredFallback, zoom);
            } else {
                filterPlacesByZoom(filteredFallback, currentZoom);
            }
        } finally{
            setLoadingPlaces(false);
        }
    }
    // Load initial food places only once
    const loadInitialFoodPlaces = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FoodMapPageInner.useMemo[loadInitialFoodPlaces]": ()=>{
            return ({
                "FoodMapPageInner.useMemo[loadInitialFoodPlaces]": ()=>{
                    searchFoodPlaces(DEFAULT_CENTER);
                }
            })["FoodMapPageInner.useMemo[loadInitialFoodPlaces]"];
        }
    }["FoodMapPageInner.useMemo[loadInitialFoodPlaces]"], []);
    const plotFoodMarkers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FoodMapPageInner.useCallback[plotFoodMarkers]": (places)=>{
            const L = window.L;
            // Check if Leaflet is loaded and map is ready
            if (!L || !mapRef.current) {
                console.log("Leaflet not loaded or map not ready yet");
                return;
            }
            // Clear existing food markers and custom popups
            foodMarkersRef.current.forEach({
                "FoodMapPageInner.useCallback[plotFoodMarkers]": (marker)=>{
                    try {
                        // Call cleanup function if it exists
                        if (marker.cleanup) {
                            marker.cleanup();
                        }
                        marker.remove();
                    } catch (e) {}
                }
            }["FoodMapPageInner.useCallback[plotFoodMarkers]"]);
            foodMarkersRef.current = [];
            // Also remove any remaining custom popups
            const customPopups = document.querySelectorAll('.custom-popup');
            customPopups.forEach({
                "FoodMapPageInner.useCallback[plotFoodMarkers]": (popup)=>popup.remove()
            }["FoodMapPageInner.useCallback[plotFoodMarkers]"]);
            console.log("Plotting", places.length, "food places");
            // Add markers for each food place with modern styling
            places.forEach({
                "FoodMapPageInner.useCallback[plotFoodMarkers]": (place)=>{
                    const getCategoryIcon = {
                        "FoodMapPageInner.useCallback[plotFoodMarkers].getCategoryIcon": (category)=>{
                            const cat = category.toLowerCase();
                            if (cat.includes("restaurant") || cat.includes("food")) return "🍽️";
                            if (cat.includes("cafe") || cat.includes("coffee")) return "☕";
                            if (cat.includes("bar")) return "🍺";
                            if (cat.includes("fast")) return "🍔";
                            if (cat.includes("pizza")) return "🍕";
                            if (cat.includes("bakery")) return "🥖";
                            return "🍴";
                        }
                    }["FoodMapPageInner.useCallback[plotFoodMarkers].getCategoryIcon"];
                    const getCategoryColor = {
                        "FoodMapPageInner.useCallback[plotFoodMarkers].getCategoryColor": (category)=>{
                            const cat = category.toLowerCase();
                            if (cat.includes("cafe") || cat.includes("coffee")) return "#059669";
                            if (cat.includes("fast")) return "#dc2626";
                            if (cat.includes("bar")) return "#7c3aed";
                            if (cat.includes("bakery")) return "#d97706";
                            return "#8c52ff";
                        }
                    }["FoodMapPageInner.useCallback[plotFoodMarkers].getCategoryColor"];
                    const iconHtml = '\n        <div style="\n          display: flex;\n          align-items: center;\n          gap: 6px;\n          background: linear-gradient(135deg, '.concat(getCategoryColor(place.category), ", ").concat(getCategoryColor(place.category), 'dd);\n          color: #fff;\n          border-radius: 25px;\n          padding: 8px 14px;\n          box-shadow: 0 6px 20px rgba(0,0,0,0.25);\n          font-size: 13px;\n          font-weight: 700;\n          border: 3px solid #fff;\n          cursor: pointer;\n          min-width: 60px;\n          justify-content: center;\n        ">\n          <span style="font-size: 16px;">').concat(getCategoryIcon(place.category), "</span>\n          <span>").concat(place.rating ? place.rating.toFixed(1) : "★", "</span>\n        </div>\n      ");
                    const customIcon = L.divIcon({
                        html: iconHtml,
                        className: "modern-food-marker",
                        iconSize: [
                            80,
                            35
                        ],
                        iconAnchor: [
                            40,
                            17.5
                        ],
                        popupAnchor: [
                            0,
                            -25
                        ]
                    });
                    const marker = L.marker([
                        place.latitude,
                        place.longitude
                    ], {
                        icon: customIcon
                    });
                    // Modern popup with better styling
                    const popupContent = '\n        <div style="min-width: 240px; font-family: system-ui, -apple-system, sans-serif; padding: 4px;">\n          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">\n            <span style="font-size: 20px;">'.concat(getCategoryIcon(place.category), '</span>\n            <div>\n              <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: #111827; line-height: 1.2;">').concat(place.name, '</h3>\n              <p style="margin: 2px 0 0 0; font-size: 13px; color: #6b7280; font-weight: 500;">').concat(place.category, '</p>\n            </div>\n          </div>\n          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 10px; flex-wrap: wrap;">\n            <div style="display: flex; align-items: center; gap: 2px; background: #fef3c7; padding: 3px 8px; border-radius: 12px;">\n              <span style="color: #f59e0b; font-size: 12px;">⭐</span>\n              <span style="font-weight: 600; font-size: 12px; color: #92400e;">').concat(place.rating ? place.rating.toFixed(1) : "N/A", "</span>\n            </div>\n            ").concat(place.price_range ? '\n            <div style="background: #e0e7ff; padding: 3px 8px; border-radius: 12px;">\n              <span style="color: #3730a3; font-size: 12px; font-weight: 500;">'.concat(place.price_range, "</span>\n            </div>\n            ") : '', "\n            ").concat(place.cuisine_type ? '\n            <div style="background: #f3f4f6; padding: 3px 8px; border-radius: 12px;">\n              <span style="color: #374151; font-size: 12px; font-weight: 500;">'.concat(place.cuisine_type, "</span>\n            </div>\n            ") : '', "\n          </div>\n          ").concat(place.description ? '\n          <p style="margin: 0; font-size: 14px; color: #4b5563; line-height: 1.4; margin-bottom: 10px;">'.concat(place.description, "</p>\n          ") : '', '\n          <div style="padding-top: 8px; border-top: 1px solid #e5e7eb;">\n            <div style="display: flex; align-items: center; gap: 4px; font-size: 11px; color: #9ca3af;">\n              <span>📍</span>\n              <span>').concat(place.latitude.toFixed(6), ", ").concat(place.longitude.toFixed(6), "</span>\n            </div>\n          </div>\n        </div>\n      ");
                    // Create a custom popup element that won't interfere with hover detection
                    const popupElement = document.createElement('div');
                    popupElement.innerHTML = popupContent;
                    popupElement.className = 'custom-popup';
                    popupElement.style.cssText = "\n        position: absolute;\n        background: white;\n        border: 1px solid #e5e7eb;\n        border-radius: 12px;\n        box-shadow: 0 10px 25px rgba(0,0,0,0.15);\n        padding: 0;\n        z-index: 1000;\n        pointer-events: none;\n        opacity: 0;\n        transform: translateY(10px);\n        transition: all 0.2s ease;\n        min-width: 240px;\n        max-width: 300px;\n      ";
                    // Add popup to map container
                    if (mapRef.current) {
                        mapRef.current.getContainer().appendChild(popupElement);
                    }
                    // Position popup relative to marker with improved accuracy
                    const updatePopupPosition = {
                        "FoodMapPageInner.useCallback[plotFoodMarkers].updatePopupPosition": ()=>{
                            if (mapRef.current && popupElement) {
                                try {
                                    const markerPoint = mapRef.current.latLngToContainerPoint([
                                        place.latitude,
                                        place.longitude
                                    ]);
                                    const containerRect = mapRef.current.getContainer().getBoundingClientRect();
                                    // Get actual popup dimensions
                                    const popupRect = popupElement.getBoundingClientRect();
                                    const popupWidth = popupRect.width || 240; // fallback to min-width
                                    const popupHeight = popupRect.height || 120; // fallback to estimated height
                                    // Calculate position relative to the map container
                                    const offsetX = markerPoint.x - popupWidth / 2;
                                    const offsetY = markerPoint.y - popupHeight - 25; // 25px above marker
                                    // Ensure popup stays within map bounds with padding
                                    const padding = 10;
                                    const left = Math.max(padding, Math.min(offsetX, containerRect.width - popupWidth - padding));
                                    const top = Math.max(padding, Math.min(offsetY, containerRect.height - popupHeight - padding));
                                    // Only update if position actually changed to avoid unnecessary reflows
                                    const currentLeft = parseFloat(popupElement.style.left) || 0;
                                    const currentTop = parseFloat(popupElement.style.top) || 0;
                                    if (Math.abs(currentLeft - left) > 1 || Math.abs(currentTop - top) > 1) {
                                        popupElement.style.left = left + 'px';
                                        popupElement.style.top = top + 'px';
                                    }
                                } catch (error) {
                                    console.warn('Error updating popup position:', error);
                                }
                            }
                        }
                    }["FoodMapPageInner.useCallback[plotFoodMarkers].updatePopupPosition"];
                    // Add hover effects with custom popup
                    let hoverTimeout;
                    let isHovering = false;
                    let isPopupVisible = false;
                    marker.on('mouseover', {
                        "FoodMapPageInner.useCallback[plotFoodMarkers]": function() {
                            clearTimeout(hoverTimeout);
                            isHovering = true;
                            if (!isPopupVisible) {
                                updatePopupPosition();
                                popupElement.style.opacity = '1';
                                popupElement.style.transform = 'translateY(0)';
                                isPopupVisible = true;
                            }
                        }
                    }["FoodMapPageInner.useCallback[plotFoodMarkers]"]);
                    marker.on('mouseout', {
                        "FoodMapPageInner.useCallback[plotFoodMarkers]": function() {
                            isHovering = false;
                            hoverTimeout = setTimeout({
                                "FoodMapPageInner.useCallback[plotFoodMarkers]": ()=>{
                                    if (!isHovering && isPopupVisible) {
                                        popupElement.style.opacity = '0';
                                        popupElement.style.transform = 'translateY(10px)';
                                        isPopupVisible = false;
                                    }
                                }
                            }["FoodMapPageInner.useCallback[plotFoodMarkers]"], 150);
                        }
                    }["FoodMapPageInner.useCallback[plotFoodMarkers]"]);
                    // Update popup position on map events with throttling
                    let positionUpdateTimeout;
                    const throttledUpdatePosition = {
                        "FoodMapPageInner.useCallback[plotFoodMarkers].throttledUpdatePosition": ()=>{
                            clearTimeout(positionUpdateTimeout);
                            positionUpdateTimeout = setTimeout({
                                "FoodMapPageInner.useCallback[plotFoodMarkers].throttledUpdatePosition": ()=>{
                                    if (isPopupVisible) {
                                        updatePopupPosition();
                                    }
                                }
                            }["FoodMapPageInner.useCallback[plotFoodMarkers].throttledUpdatePosition"], 16); // ~60fps
                        }
                    }["FoodMapPageInner.useCallback[plotFoodMarkers].throttledUpdatePosition"];
                    // Update popup position on map move/zoom
                    if (mapRef.current) {
                        mapRef.current.on('move', throttledUpdatePosition);
                        mapRef.current.on('zoom', throttledUpdatePosition);
                        mapRef.current.on('moveend', updatePopupPosition);
                        mapRef.current.on('zoomend', updatePopupPosition);
                    }
                    marker.on('click', {
                        "FoodMapPageInner.useCallback[plotFoodMarkers]": ()=>setSelectedPlace(place)
                    }["FoodMapPageInner.useCallback[plotFoodMarkers]"]);
                    // Store cleanup function for this marker
                    marker.cleanup = ({
                        "FoodMapPageInner.useCallback[plotFoodMarkers]": ()=>{
                            if (popupElement && popupElement.parentNode) {
                                popupElement.parentNode.removeChild(popupElement);
                            }
                            if (mapRef.current) {
                                mapRef.current.off('move', throttledUpdatePosition);
                                mapRef.current.off('zoom', throttledUpdatePosition);
                                mapRef.current.off('moveend', updatePopupPosition);
                                mapRef.current.off('zoomend', updatePopupPosition);
                            }
                        }
                    })["FoodMapPageInner.useCallback[plotFoodMarkers]"];
                    marker.addTo(mapRef.current);
                    foodMarkersRef.current.push(marker);
                }
            }["FoodMapPageInner.useCallback[plotFoodMarkers]"]);
        }
    }["FoodMapPageInner.useCallback[plotFoodMarkers]"], []);
    const filterPlacesByZoom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FoodMapPageInner.useCallback[filterPlacesByZoom]": (places, zoom)=>{
            console.log("Filtering ".concat(places.length, " places at zoom level ").concat(zoom));
            var _ref, _ref1;
            const center = (_ref1 = (_ref = clickedLocation !== null && clickedLocation !== void 0 ? clickedLocation : lastSearchCenter) !== null && _ref !== void 0 ? _ref : userLocation) !== null && _ref1 !== void 0 ? _ref1 : DEFAULT_CENTER;
            // Filter places to only include those within Cebu area
            const placesInCebu = places.filter({
                "FoodMapPageInner.useCallback[filterPlacesByZoom].placesInCebu": (place)=>{
                    // Check if place is within Cebu bounds
                    const inBounds = place.latitude >= CEBU_BOUNDS.south && place.latitude <= CEBU_BOUNDS.north && place.longitude >= CEBU_BOUNDS.west && place.longitude <= CEBU_BOUNDS.east;
                    if (!inBounds) return false;
                    // Check distance from reference location (user location or Cebu center)
                    const referenceLocation = userLocation || DEFAULT_CENTER;
                    const distanceFromRef = calculateDistanceKm(referenceLocation, [
                        place.latitude,
                        place.longitude
                    ]);
                    return distanceFromRef <= MAX_DISTANCE_FROM_CEBU;
                }
            }["FoodMapPageInner.useCallback[filterPlacesByZoom].placesInCebu"]);
            const placesWithDistance = placesInCebu.map({
                "FoodMapPageInner.useCallback[filterPlacesByZoom].placesWithDistance": (place)=>{
                    const distance = place.distance !== undefined ? place.distance : calculateDistanceKm(center, [
                        place.latitude,
                        place.longitude
                    ]);
                    return {
                        ...place,
                        distance
                    };
                }
            }["FoodMapPageInner.useCallback[filterPlacesByZoom].placesWithDistance"]);
            const sortByDistanceThenRating = {
                "FoodMapPageInner.useCallback[filterPlacesByZoom].sortByDistanceThenRating": (a, b)=>{
                    var _a_distance;
                    const distanceA = (_a_distance = a.distance) !== null && _a_distance !== void 0 ? _a_distance : calculateDistanceKm(center, [
                        a.latitude,
                        a.longitude
                    ]);
                    var _b_distance;
                    const distanceB = (_b_distance = b.distance) !== null && _b_distance !== void 0 ? _b_distance : calculateDistanceKm(center, [
                        b.latitude,
                        b.longitude
                    ]);
                    if (distanceA !== distanceB) return distanceA - distanceB;
                    var _a_rating;
                    const ratingA = (_a_rating = a.rating) !== null && _a_rating !== void 0 ? _a_rating : 0;
                    var _b_rating;
                    const ratingB = (_b_rating = b.rating) !== null && _b_rating !== void 0 ? _b_rating : 0;
                    return ratingB - ratingA;
                }
            }["FoodMapPageInner.useCallback[filterPlacesByZoom].sortByDistanceThenRating"];
            let limit = 12;
            if (zoom <= 13) {
                limit = 8;
            } else if (zoom > 16) {
                limit = 20;
            }
            const filtered = placesWithDistance.sort(sortByDistanceThenRating).slice(0, Math.min(limit, placesWithDistance.length));
            console.log("Zoom ".concat(zoom, ": showing ").concat(filtered.length, " closest places within Cebu area (limit ").concat(limit, ")"));
            setFilteredPlaces(filtered);
            setTimeout({
                "FoodMapPageInner.useCallback[filterPlacesByZoom]": ()=>{
                    plotFoodMarkers(filtered);
                }
            }["FoodMapPageInner.useCallback[filterPlacesByZoom]"], 100);
        }
    }["FoodMapPageInner.useCallback[filterPlacesByZoom]"], [
        calculateDistanceKm,
        clickedLocation,
        lastSearchCenter,
        plotFoodMarkers,
        userLocation
    ]);
    async function geocodeSearch(e) {
        e.preventDefault();
        if (!query.trim()) return;
        setSearching(true);
        try {
            // Restrict to Cebu area using bounding box
            const bbox = "".concat(CEBU_BOUNDS.west, ",").concat(CEBU_BOUNDS.south, ",").concat(CEBU_BOUNDS.east, ",").concat(CEBU_BOUNDS.north);
            const url = "https://nominatim.openstreetmap.org/search?format=json&countrycodes=ph&limit=5&q=".concat(encodeURIComponent(query), "&bounded=1&viewbox=").concat(bbox);
            const res = await fetch(url, {
                headers: {
                    "Accept-Language": "en"
                }
            });
            const data = await res.json();
            if (data && data.length > 0) {
                // Filter results to only include places within Cebu bounds and max distance
                const filteredData = data.map((d)=>({
                        display: d.display_name,
                        lat: parseFloat(d.lat),
                        lon: parseFloat(d.lon)
                    })).filter((d)=>{
                    // Check if within bounding box
                    const inBounds = d.lat >= CEBU_BOUNDS.south && d.lat <= CEBU_BOUNDS.north && d.lon >= CEBU_BOUNDS.west && d.lon <= CEBU_BOUNDS.east;
                    if (!inBounds) return false;
                    // Check distance from Cebu center
                    const distance = calculateDistanceKm(DEFAULT_CENTER, [
                        d.lat,
                        d.lon
                    ]);
                    return distance <= MAX_DISTANCE_FROM_CEBU;
                });
                if (filteredData.length > 0) {
                    const best = filteredData[0];
                    const latlng = [
                        best.lat,
                        best.lon
                    ];
                    // Center map on search result
                    mapRef.current.setView(latlng, 15);
                    // Only search for food places when explicitly searching for a location
                    searchFoodPlaces(latlng);
                    setSuggestions(filteredData);
                    setShowSuggestions(true);
                } else {
                    setSuggestions([]);
                    setShowSuggestions(false);
                    alert("No results found in Cebu area. Please search for locations within Cebu.");
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
                alert("No results found in Cebu area. Please search for locations within Cebu.");
            }
        } finally{
            setSearching(false);
        }
    }
    // Live suggestions with debounce on input change
    function onQueryChange(v) {
        setQuery(v);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (!v.trim()) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }
        debounceRef.current = setTimeout(async ()=>{
            try {
                // Restrict to Cebu area using bounding box
                const bbox = "".concat(CEBU_BOUNDS.west, ",").concat(CEBU_BOUNDS.south, ",").concat(CEBU_BOUNDS.east, ",").concat(CEBU_BOUNDS.north);
                const url = "https://nominatim.openstreetmap.org/search?format=json&countrycodes=ph&limit=10&q=".concat(encodeURIComponent(v), "&bounded=1&viewbox=").concat(bbox);
                const res = await fetch(url, {
                    headers: {
                        "Accept-Language": "en"
                    }
                });
                const data = await res.json();
                // Filter results to only include places within Cebu bounds and max distance
                const filteredData = (data || []).map((d)=>({
                        display: d.display_name,
                        lat: parseFloat(d.lat),
                        lon: parseFloat(d.lon)
                    })).filter((d)=>{
                    // Check if within bounding box
                    const inBounds = d.lat >= CEBU_BOUNDS.south && d.lat <= CEBU_BOUNDS.north && d.lon >= CEBU_BOUNDS.west && d.lon <= CEBU_BOUNDS.east;
                    if (!inBounds) return false;
                    // Check distance from Cebu center
                    const distance = calculateDistanceKm(DEFAULT_CENTER, [
                        d.lat,
                        d.lon
                    ]);
                    return distance <= MAX_DISTANCE_FROM_CEBU;
                }).slice(0, 5); // Limit to 5 suggestions
                setSuggestions(filteredData);
                setShowSuggestions(filteredData.length > 0);
            } catch (e) {
            // ignore
            }
        }, 400);
    }
    // Calculate distance between two points using Haversine formula
    const calculateDistance = (lat1, lon1, lat2, lon2)=>{
        const R = 6371; // Earth's radius in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in kilometers
    };
    // Find nearby places within a specified radius from a clicked location
    const findNearbyPlaces = function(clickedLatLng, allPlaces) {
        let radiusKm = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
        const [clickLat, clickLon] = clickedLatLng;
        return allPlaces.map((place)=>({
                ...place,
                distance: calculateDistance(clickLat, clickLon, place.latitude, place.longitude)
            })).filter((place)=>place.distance <= radiusKm).sort((a, b)=>a.distance - b.distance) // Sort by distance
        .slice(0, 15); // Limit to 15 nearby places
    };
    // Test function to verify sample data works
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FoodMapPageInner.useEffect": ()=>{
            console.log("Food places state:", foodPlaces);
        }
    }["FoodMapPageInner.useEffect"], [
        foodPlaces
    ]);
    // Re-filter places when zoom level or foodPlaces change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FoodMapPageInner.useEffect": ()=>{
            if (foodPlaces.length > 0) {
                filterPlacesByZoom(foodPlaces, currentZoom);
            }
        }
    }["FoodMapPageInner.useEffect"], [
        currentZoom,
        foodPlaces,
        filterPlacesByZoom
    ]);
    // Filter food places when filters change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FoodMapPageInner.useEffect": ()=>{
            if (mapRef.current && foodPlaces.length > 0) {
                const filteredPlaces = getSampleFoodPlaces([
                    10.3157,
                    123.8854
                ]);
                setFoodPlaces(filteredPlaces);
                plotFoodMarkers(filteredPlaces);
            }
        }
    }["FoodMapPageInner.useEffect"], [
        categoryFilter,
        featureFilter
    ]);
    // Scroll to food places section when hash is present
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FoodMapPageInner.useEffect": ()=>{
            const scrollToFoodPlaces = {
                "FoodMapPageInner.useEffect.scrollToFoodPlaces": ()=>{
                    const hash = window.location.hash;
                    if (hash === '#food-places') {
                        // Small delay to ensure the page has rendered
                        setTimeout({
                            "FoodMapPageInner.useEffect.scrollToFoodPlaces": ()=>{
                                const foodPlacesSection = document.getElementById('food-places');
                                if (foodPlacesSection) {
                                    foodPlacesSection.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start'
                                    });
                                }
                            }
                        }["FoodMapPageInner.useEffect.scrollToFoodPlaces"], 300);
                    }
                }
            }["FoodMapPageInner.useEffect.scrollToFoodPlaces"];
            // Check on mount
            if ("TURBOPACK compile-time truthy", 1) {
                scrollToFoodPlaces();
                // Listen for hash changes
                window.addEventListener('hashchange', scrollToFoodPlaces);
                return ({
                    "FoodMapPageInner.useEffect": ()=>{
                        window.removeEventListener('hashchange', scrollToFoodPlaces);
                    }
                })["FoodMapPageInner.useEffect"];
            }
        }
    }["FoodMapPageInner.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-45a80fbd985ccec3" + " " + "min-h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "45a80fbd985ccec3",
                children: ".modern-food-marker{transition:box-shadow .2s!important;position:relative!important}.modern-food-marker:hover{transform:none!important;box-shadow:0 8px 25px rgba(0,0,0,.35)!important}.leaflet-marker-icon{position:absolute!important}.leaflet-marker-icon:hover{z-index:1000!important}.custom-popup{font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif}.leaflet-control-layers{border-radius:8px!important;box-shadow:0 4px 12px rgba(0,0,0,.15)!important}.leaflet-control-layers-toggle{background:#fff!important;border-radius:8px!important;box-shadow:0 2px 8px rgba(0,0,0,.1)!important}.leaflet-control-zoom a{color:#374151!important;background:#fff!important;border-radius:6px!important;font-weight:600!important;box-shadow:0 2px 8px rgba(0,0,0,.1)!important}.leaflet-control-zoom a:hover{color:#111827!important;background:#f9fafb!important}"
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-45a80fbd985ccec3" + " " + "container py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: mapContainerRef,
                        className: "jsx-45a80fbd985ccec3" + " " + "mb-4 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: mapEl,
                            style: {
                                width: "100%",
                                height: "70vh"
                            },
                            className: "jsx-45a80fbd985ccec3"
                        }, void 0, false, {
                            fileName: "[project]/app/map/page.tsx",
                            lineNumber: 1372,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/map/page.tsx",
                        lineNumber: 1371,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-45a80fbd985ccec3" + " " + "mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "jsx-45a80fbd985ccec3" + " " + "text-2xl font-bold text-gray-900 mb-1",
                                children: "🍽️ Food Discovery Map"
                            }, void 0, false, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 1377,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "jsx-45a80fbd985ccec3" + " " + "text-gray-600 text-sm",
                                children: "Find the best restaurants, cafes, and food places in the Philippines"
                            }, void 0, false, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 1378,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/map/page.tsx",
                        lineNumber: 1376,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-45a80fbd985ccec3" + " " + "mb-4 bg-white rounded-lg shadow-sm border border-gray-200 p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-45a80fbd985ccec3" + " " + "flex flex-col lg:flex-row gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    onSubmit: geocodeSearch,
                                    className: "jsx-45a80fbd985ccec3" + " " + "relative flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-45a80fbd985ccec3" + " " + "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    value: query,
                                                    onChange: (e)=>onQueryChange(e.target.value),
                                                    onFocus: ()=>suggestions.length && setShowSuggestions(true),
                                                    placeholder: "Search for restaurants, cafes, or food places...",
                                                    className: "jsx-45a80fbd985ccec3" + " " + "h-12 w-full px-4 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent outline-none"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1387,
                                                    columnNumber: 13
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "submit",
                                                    className: "jsx-45a80fbd985ccec3" + " " + "absolute right-2 top-1/2 -translate-y-1/2 h-8 px-4 rounded-md bg-[#8c52ff] text-white text-sm hover:opacity-90",
                                                    children: searching ? "..." : "Search"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1394,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 1386,
                                            columnNumber: 15
                                        }, this),
                                        showSuggestions && suggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-45a80fbd985ccec3" + " " + "absolute top-14 left-0 right-0 z-20 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto",
                                            children: suggestions.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>{
                                                        const latlng = [
                                                            s.lat,
                                                            s.lon
                                                        ];
                                                        const L = window.L;
                                                        if (mapRef.current && L) {
                                                            // Remove existing search marker
                                                            if (searchMarkerRef.current) {
                                                                try {
                                                                    mapRef.current.removeLayer(searchMarkerRef.current);
                                                                } catch (error) {
                                                                    console.warn('Error removing search marker:', error);
                                                                }
                                                                searchMarkerRef.current = null;
                                                            }
                                                            // Create a marker for the searched location
                                                            const locationName = s.display.split(',')[0];
                                                            const searchIcon = L.divIcon({
                                                                html: '<div style="background:#10b981;color:#fff;border-radius:9999px;padding:8px 12px;box-shadow:0 2px 6px rgba(0,0,0,.25);font-weight:bold;font-size:12px;border:3px solid white">📍 '.concat(locationName, "</div>"),
                                                                className: 'search-location-marker',
                                                                iconSize: [
                                                                    150,
                                                                    32
                                                                ],
                                                                iconAnchor: [
                                                                    75,
                                                                    16
                                                                ]
                                                            });
                                                            const searchMarker = L.marker(latlng, {
                                                                icon: searchIcon
                                                            });
                                                            searchMarker.addTo(mapRef.current);
                                                            // Show popup with location info
                                                            const popupContent = '\n                            <div style="text-align: center; padding: 8px; min-width: 200px;">\n                              <h3 style="margin: 0 0 8px 0; color: #10b981; font-weight: bold; font-size: 14px;">'.concat(s.display, '</h3>\n                              <p style="margin: 8px 0 0 0; color: #999; font-size: 11px;">').concat(s.lat.toFixed(6), ", ").concat(s.lon.toFixed(6), "</p>\n                            </div>\n                          ");
                                                            searchMarker.bindPopup(popupContent).openPopup();
                                                            // Store marker reference
                                                            searchMarkerRef.current = searchMarker;
                                                            // Center map on selected location
                                                            mapRef.current.setView(latlng, 15);
                                                        }
                                                        // Search for food places at this location
                                                        searchFoodPlaces(latlng);
                                                        setShowSuggestions(false);
                                                        setQuery(s.display.split(',')[0]); // Update search input with location name
                                                        // Scroll to map so user can see the location
                                                        scrollToMap();
                                                    },
                                                    className: "jsx-45a80fbd985ccec3" + " " + "block w-full text-left px-4 py-3 hover:bg-gray-50 text-sm border-b border-gray-100 last:border-b-0",
                                                    children: s.display
                                                }, "".concat(s.lat, "-").concat(s.lon, "-").concat(i), false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1404,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 1402,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/map/page.tsx",
                                    lineNumber: 1385,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-45a80fbd985ccec3" + " " + "flex gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: categoryFilter,
                                            onChange: (e)=>setCategoryFilter(e.target.value),
                                            className: "jsx-45a80fbd985ccec3" + " " + "h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent outline-none",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    className: "jsx-45a80fbd985ccec3",
                                                    children: "All Categories"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1473,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Cafes",
                                                    className: "jsx-45a80fbd985ccec3",
                                                    children: "Cafes"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1474,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Bakeries/Pastries",
                                                    className: "jsx-45a80fbd985ccec3",
                                                    children: "Bakeries/Pastries"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1475,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Bars/Pubs",
                                                    className: "jsx-45a80fbd985ccec3",
                                                    children: "Bars/Pubs"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1476,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Fine Dining",
                                                    className: "jsx-45a80fbd985ccec3",
                                                    children: "Fine Dining"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1477,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Fast Foods",
                                                    className: "jsx-45a80fbd985ccec3",
                                                    children: "Fast Foods"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1478,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Local Cuisine",
                                                    className: "jsx-45a80fbd985ccec3",
                                                    children: "Local Cuisine"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1479,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "International Cuisine",
                                                    className: "jsx-45a80fbd985ccec3",
                                                    children: "International Cuisine"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1480,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 1468,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: featureFilter,
                                            onChange: (e)=>setFeatureFilter(e.target.value),
                                            className: "jsx-45a80fbd985ccec3" + " " + "h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent outline-none",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    className: "jsx-45a80fbd985ccec3",
                                                    children: "All Features"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1488,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Budget-Friendly",
                                                    className: "jsx-45a80fbd985ccec3",
                                                    children: "Budget-Friendly"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1489,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Family-Friendly",
                                                    className: "jsx-45a80fbd985ccec3",
                                                    children: "Family-Friendly"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1490,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Open 24 Hours",
                                                    className: "jsx-45a80fbd985ccec3",
                                                    children: "Open 24 Hours"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1491,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Pet-Friendly",
                                                    className: "jsx-45a80fbd985ccec3",
                                                    children: "Pet-Friendly"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1492,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 1483,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: locateUser,
                                            disabled: loadingLoc,
                                            className: "jsx-45a80fbd985ccec3" + " " + "h-12 px-6 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    className: "jsx-45a80fbd985ccec3" + " " + "w-4 h-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
                                                            className: "jsx-45a80fbd985ccec3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/map/page.tsx",
                                                            lineNumber: 1501,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z",
                                                            className: "jsx-45a80fbd985ccec3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/map/page.tsx",
                                                            lineNumber: 1502,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1500,
                                                    columnNumber: 17
                                                }, this),
                                                loadingLoc ? "Locating..." : "My Location"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 1495,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                if (mapRef.current) {
                                                    const center = mapRef.current.getCenter();
                                                    const centerLatLng = [
                                                        center.lat,
                                                        center.lng
                                                    ];
                                                    // Check if current map center is within Cebu bounds
                                                    const inCebuBounds = centerLatLng[0] >= CEBU_BOUNDS.south && centerLatLng[0] <= CEBU_BOUNDS.north && centerLatLng[1] >= CEBU_BOUNDS.west && centerLatLng[1] <= CEBU_BOUNDS.east;
                                                    const distanceFromCebu = calculateDistanceKm(DEFAULT_CENTER, centerLatLng);
                                                    if (!inCebuBounds || distanceFromCebu > MAX_DISTANCE_FROM_CEBU) {
                                                        // Center map on Cebu and search there
                                                        mapRef.current.setView(DEFAULT_CENTER, 14);
                                                        searchFoodPlaces(DEFAULT_CENTER);
                                                    } else {
                                                        searchFoodPlaces(centerLatLng);
                                                    }
                                                }
                                            },
                                            disabled: loadingPlaces,
                                            className: "jsx-45a80fbd985ccec3" + " " + "h-12 px-6 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    className: "jsx-45a80fbd985ccec3" + " " + "w-4 h-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
                                                        className: "jsx-45a80fbd985ccec3"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/map/page.tsx",
                                                        lineNumber: 1534,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1533,
                                                    columnNumber: 17
                                                }, this),
                                                loadingPlaces ? "Searching..." : "Search Food Places"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 1506,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/map/page.tsx",
                                    lineNumber: 1467,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/map/page.tsx",
                            lineNumber: 1383,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/map/page.tsx",
                        lineNumber: 1382,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                        className: "jsx-45a80fbd985ccec3" + " " + "mb-4 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                className: "jsx-45a80fbd985ccec3" + " " + "p-3 cursor-pointer hover:bg-gray-50 font-medium text-gray-700",
                                children: "ℹ️ Map Instructions & Tips"
                            }, void 0, false, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 1544,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-45a80fbd985ccec3" + " " + "px-3 pb-3 space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-45a80fbd985ccec3" + " " + "p-2 bg-green-50 border border-green-200 rounded",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-45a80fbd985ccec3" + " " + "text-xs text-green-700",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    className: "jsx-45a80fbd985ccec3",
                                                    children: "Real Data Mode:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1550,
                                                    columnNumber: 17
                                                }, this),
                                                ' Now showing real restaurants and cafes from OpenStreetMap! Use "My Location" to center the map, then click "Search Food Places" to find restaurants in the current view area.'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 1549,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1548,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-45a80fbd985ccec3" + " " + "p-2 bg-blue-50 border border-blue-200 rounded",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-45a80fbd985ccec3" + " " + "text-xs text-blue-700",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    className: "jsx-45a80fbd985ccec3",
                                                    children: "🗺️ Click to Explore:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1555,
                                                    columnNumber: 17
                                                }, this),
                                                " Click anywhere on the map to automatically find and display nearby restaurants and cafes! The map will refresh with new places from the Places API around your clicked location."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 1554,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1553,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-45a80fbd985ccec3" + " " + "p-2 bg-purple-50 border border-purple-200 rounded",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-45a80fbd985ccec3" + " " + "text-xs text-purple-700",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    className: "jsx-45a80fbd985ccec3",
                                                    children: "🔍 Smart Zoom Filtering:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1560,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                    className: "jsx-45a80fbd985ccec3"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1561,
                                                    columnNumber: 17
                                                }, this),
                                                "• ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    className: "jsx-45a80fbd985ccec3",
                                                    children: "Normal View (≤13):"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1561,
                                                    columnNumber: 25
                                                }, this),
                                                " Shows 5 most popular food places (well-known chains & highest rated)",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                    className: "jsx-45a80fbd985ccec3"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1562,
                                                    columnNumber: 17
                                                }, this),
                                                "• ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    className: "jsx-45a80fbd985ccec3",
                                                    children: "Slightly Zoomed (14-16):"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1562,
                                                    columnNumber: 25
                                                }, this),
                                                " Shows 10 top-rated places",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                    className: "jsx-45a80fbd985ccec3"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1563,
                                                    columnNumber: 17
                                                }, this),
                                                "• ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    className: "jsx-45a80fbd985ccec3",
                                                    children: "Max Zoom (17+):"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1563,
                                                    columnNumber: 25
                                                }, this),
                                                " Shows 20 top-rated places"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 1559,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1558,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 1547,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/map/page.tsx",
                        lineNumber: 1543,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: "food-places",
                        className: "jsx-45a80fbd985ccec3" + " " + "mt-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-45a80fbd985ccec3" + " " + "flex items-center justify-between mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "jsx-45a80fbd985ccec3" + " " + "text-xl font-semibold text-gray-900",
                                        children: [
                                            "🍴 Food Places ",
                                            loadingPlaces ? "(loading...)" : "(".concat(foodPlaces.length, ")")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1572,
                                        columnNumber: 13
                                    }, this),
                                    userLocation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-45a80fbd985ccec3" + " " + "text-sm text-gray-500",
                                        children: "📍 Showing places near your location"
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1576,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 1571,
                                columnNumber: 11
                            }, this),
                            foodPlaces.length === 0 && !loadingPlaces && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-45a80fbd985ccec3" + " " + "text-center py-12 bg-white rounded-lg border border-gray-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-45a80fbd985ccec3" + " " + "text-6xl mb-4",
                                        children: "🍽️"
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1584,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "jsx-45a80fbd985ccec3" + " " + "text-lg font-medium text-gray-900 mb-2",
                                        children: "No food places found"
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1585,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-45a80fbd985ccec3" + " " + "text-gray-600",
                                        children: "Try searching for a different area or adjust your filters"
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1586,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 1583,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-45a80fbd985ccec3" + " " + "grid md:grid-cols-2 lg:grid-cols-3 gap-4",
                                children: foodPlaces.map((place)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>{
                                            addRestaurantMarker(place);
                                            setSelectedPlace(place);
                                        },
                                        className: "jsx-45a80fbd985ccec3" + " " + "bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer ".concat((selectedPlace === null || selectedPlace === void 0 ? void 0 : selectedPlace.id) === place.id ? 'ring-2 ring-[#8c52ff]' : ''),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-45a80fbd985ccec3" + " " + "flex items-start justify-between mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "jsx-45a80fbd985ccec3" + " " + "font-semibold text-gray-900 text-lg",
                                                        children: place.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/map/page.tsx",
                                                        lineNumber: 1603,
                                                        columnNumber: 19
                                                    }, this),
                                                    place.rating && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-45a80fbd985ccec3" + " " + "flex items-center gap-1 text-yellow-500",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-45a80fbd985ccec3" + " " + "text-sm",
                                                                children: "⭐"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/map/page.tsx",
                                                                lineNumber: 1606,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-45a80fbd985ccec3" + " " + "text-sm font-medium",
                                                                children: place.rating.toFixed(1)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/map/page.tsx",
                                                                lineNumber: 1607,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/map/page.tsx",
                                                        lineNumber: 1605,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 1602,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-45a80fbd985ccec3" + " " + "text-gray-600 text-sm mb-2",
                                                children: place.category
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 1612,
                                                columnNumber: 17
                                            }, this),
                                            place.cuisine_type && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-45a80fbd985ccec3" + " " + "text-gray-500 text-xs mb-2",
                                                children: place.cuisine_type
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 1615,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-45a80fbd985ccec3" + " " + "flex items-center justify-between",
                                                children: [
                                                    place.price_range && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-45a80fbd985ccec3" + " " + "text-green-600 font-medium text-sm",
                                                        children: place.price_range
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/map/page.tsx",
                                                        lineNumber: 1620,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: (e)=>{
                                                            e.stopPropagation();
                                                            addRestaurantMarker(place);
                                                            setSelectedPlace(place);
                                                        },
                                                        className: "jsx-45a80fbd985ccec3" + " " + "text-[#8c52ff] text-sm font-medium hover:underline",
                                                        children: "View on Map"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/map/page.tsx",
                                                        lineNumber: 1622,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 1618,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, place.id, true, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1592,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 1590,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/map/page.tsx",
                        lineNumber: 1570,
                        columnNumber: 9
                    }, this),
                    showNearbyPlaces && clickedLocation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-45a80fbd985ccec3" + " " + "mt-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-45a80fbd985ccec3" + " " + "flex items-center justify-between mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "jsx-45a80fbd985ccec3" + " " + "text-xl font-semibold text-gray-900",
                                        children: [
                                            "🗺️ Food Places Near Clicked Location",
                                            loadingPlaces && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-45a80fbd985ccec3" + " " + "text-sm text-gray-500 ml-2",
                                                children: "(Loading...)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 1644,
                                                columnNumber: 35
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1642,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setShowNearbyPlaces(false);
                                            setNearbyPlaces([]);
                                            setClickedLocation(null);
                                            // Remove ALL click markers
                                            if (mapRef.current) {
                                                clickMarkersRef.current.forEach((marker)=>{
                                                    try {
                                                        mapRef.current.removeLayer(marker);
                                                    } catch (error) {
                                                        console.warn('Error removing click marker:', error);
                                                    }
                                                });
                                                clickMarkersRef.current = [];
                                                setClickMarker(null);
                                            }
                                        },
                                        className: "jsx-45a80fbd985ccec3" + " " + "text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                className: "jsx-45a80fbd985ccec3" + " " + "w-4 h-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M6 18L18 6M6 6l12 12",
                                                    className: "jsx-45a80fbd985ccec3"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1667,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 1666,
                                                columnNumber: 17
                                            }, this),
                                            "Close"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1646,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 1641,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-45a80fbd985ccec3" + " " + "bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-45a80fbd985ccec3" + " " + "text-sm text-blue-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                className: "jsx-45a80fbd985ccec3",
                                                children: "📍 Clicked Location:"
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 1675,
                                                columnNumber: 17
                                            }, this),
                                            " ",
                                            clickedLocation[0].toFixed(6),
                                            ", ",
                                            clickedLocation[1].toFixed(6)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1674,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-45a80fbd985ccec3" + " " + "text-xs text-blue-600 mt-1",
                                        children: loadingPlaces ? "Fetching nearby places from Places API..." : "Showing ".concat(nearbyPlaces.length, " food places within 1km radius • Places automatically fetched from Places API")
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1677,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 1673,
                                columnNumber: 13
                            }, this),
                            loadingPlaces ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-45a80fbd985ccec3" + " " + "text-center py-12 bg-white rounded-lg border border-gray-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-45a80fbd985ccec3" + " " + "text-4xl mb-4",
                                        children: "🔍"
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1688,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "jsx-45a80fbd985ccec3" + " " + "text-lg font-medium text-gray-900 mb-2",
                                        children: "Finding nearby places..."
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1689,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-45a80fbd985ccec3" + " " + "text-gray-600",
                                        children: "Searching for restaurants and cafes around the clicked location"
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1690,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-45a80fbd985ccec3" + " " + "mt-4 flex justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-45a80fbd985ccec3" + " " + "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
                                        }, void 0, false, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 1692,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1691,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 1687,
                                columnNumber: 15
                            }, this) : nearbyPlaces.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-45a80fbd985ccec3" + " " + "grid md:grid-cols-2 lg:grid-cols-3 gap-4",
                                children: nearbyPlaces.map((place)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>{
                                            addRestaurantMarker(place);
                                            setSelectedPlace(place);
                                            setShowNearbyPlaces(false); // Hide nearby places when selecting a specific place
                                        },
                                        className: "jsx-45a80fbd985ccec3" + " " + "bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-45a80fbd985ccec3" + " " + "flex items-start justify-between mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "jsx-45a80fbd985ccec3" + " " + "font-semibold text-gray-900 text-lg",
                                                        children: place.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/map/page.tsx",
                                                        lineNumber: 1708,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-45a80fbd985ccec3" + " " + "text-right",
                                                        children: [
                                                            place.rating && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-45a80fbd985ccec3" + " " + "flex items-center gap-1 text-yellow-500 mb-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-45a80fbd985ccec3" + " " + "text-sm",
                                                                        children: "⭐"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/map/page.tsx",
                                                                        lineNumber: 1712,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-45a80fbd985ccec3" + " " + "text-sm font-medium",
                                                                        children: place.rating.toFixed(1)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/map/page.tsx",
                                                                        lineNumber: 1713,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/map/page.tsx",
                                                                lineNumber: 1711,
                                                                columnNumber: 25
                                                            }, this),
                                                            place.distance && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-45a80fbd985ccec3" + " " + "text-xs text-gray-500",
                                                                children: [
                                                                    "📏 ",
                                                                    (place.distance * 1000).toFixed(0),
                                                                    "m away"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/map/page.tsx",
                                                                lineNumber: 1717,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/map/page.tsx",
                                                        lineNumber: 1709,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 1707,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-45a80fbd985ccec3" + " " + "text-gray-600 text-sm mb-2",
                                                children: place.category
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 1724,
                                                columnNumber: 19
                                            }, this),
                                            place.cuisine_type && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-45a80fbd985ccec3" + " " + "text-gray-500 text-xs mb-2",
                                                children: place.cuisine_type
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 1727,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-45a80fbd985ccec3" + " " + "flex items-center justify-between",
                                                children: [
                                                    place.price_range && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-45a80fbd985ccec3" + " " + "text-green-600 font-medium text-sm",
                                                        children: place.price_range
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/map/page.tsx",
                                                        lineNumber: 1732,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: (e)=>{
                                                            e.stopPropagation();
                                                            addRestaurantMarker(place);
                                                            setSelectedPlace(place);
                                                            setShowNearbyPlaces(false);
                                                        },
                                                        className: "jsx-45a80fbd985ccec3" + " " + "text-[#8c52ff] text-sm font-medium hover:underline",
                                                        children: "View on Map"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/map/page.tsx",
                                                        lineNumber: 1734,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 1730,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, place.id, true, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1698,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 1696,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-45a80fbd985ccec3" + " " + "text-center py-12 bg-white rounded-lg border border-gray-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-45a80fbd985ccec3" + " " + "text-6xl mb-4",
                                        children: "🗺️"
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1751,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "jsx-45a80fbd985ccec3" + " " + "text-lg font-medium text-gray-900 mb-2",
                                        children: "No food places found nearby"
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1752,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-45a80fbd985ccec3" + " " + "text-gray-600",
                                        children: "No food places found within 1km of the clicked location"
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1753,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-45a80fbd985ccec3" + " " + "text-sm text-gray-500 mt-2",
                                        children: 'Try clicking on a different area or use the "Search Food Places" button to load more places'
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1754,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 1750,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/map/page.tsx",
                        lineNumber: 1640,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/map/page.tsx",
                lineNumber: 1369,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/map/page.tsx",
        lineNumber: 1319,
        columnNumber: 5
    }, this);
}
_s(FoodMapPageInner, "o34yriLXCs636pDdfXVKXRR3Hjk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = FoodMapPageInner;
function FoodMapPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: "Loading map…"
        }, void 0, false, {
            fileName: "[project]/app/map/page.tsx",
            lineNumber: 1769,
            columnNumber: 25
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FoodMapPageInner, {}, void 0, false, {
            fileName: "[project]/app/map/page.tsx",
            lineNumber: 1770,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/map/page.tsx",
        lineNumber: 1769,
        columnNumber: 5
    }, this);
}
_c1 = FoodMapPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "FoodMapPageInner");
__turbopack_context__.k.register(_c1, "FoodMapPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_683b4b9f._.js.map