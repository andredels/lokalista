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
async function fetchRealFoodPlaces(centerLatLng) {
    const [lat, lon] = centerLatLng;
    const radius = 1000; // 1km radius
    // OpenStreetMap Overpass API query for restaurants, cafes, and fast food
    const query = `
[out:json][timeout:15];
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
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(()=>controller.abort(), 20000); // 20 second timeout
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
            // Handle 504 Gateway Timeout specifically
            if (response.status === 504) {
                console.warn('OpenStreetMap API timeout (504). Returning empty results.');
                return [];
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Check if data has elements
        if (!data || !data.elements || !Array.isArray(data.elements)) {
            console.warn('OpenStreetMap API returned unexpected format. Returning empty results.');
            return [];
        }
        // Transform OpenStreetMap data to our format
        const places = data.elements.map((element, index)=>{
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
    } catch (error) {
        clearTimeout(timeoutId);
        // Handle abort (timeout)
        if (error.name === 'AbortError') {
            console.warn('Request to OpenStreetMap API timed out. Returning empty results.');
            return [];
        }
        // Handle other errors
        if (error.message?.includes('504') || error.message?.includes('timeout')) {
            console.warn('OpenStreetMap API timeout. Returning empty results.');
            return [];
        }
        console.error('Error fetching food places from OpenStreetMap:', error);
        // Return empty array instead of throwing to prevent app crashes
        return [];
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
"[project]/app/map/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FoodMapPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$restaurants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/restaurants.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function FoodMapPage() {
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const mapEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const userMarkerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const foodMarkersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const initializingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [categoryFilter, setCategoryFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [featureFilter, setFeatureFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [loadingLoc, setLoadingLoc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searching, setSearching] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [suggestions, setSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showSuggestions, setShowSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const debounceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [foodPlaces, setFoodPlaces] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filteredPlaces, setFilteredPlaces] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentZoom, setCurrentZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(14);
    const [loadingPlaces, setLoadingPlaces] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [userLocation, setUserLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedPlace, setSelectedPlace] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [nearbyPlaces, setNearbyPlaces] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [clickedLocation, setClickedLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showNearbyPlaces, setShowNearbyPlaces] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [clickMarker, setClickMarker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const clickMarkersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    // Initialize Leaflet map with satellite view focused on food places
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const ensureAssets = async ()=>{
            if (!document.querySelector('link[data-leaflet-css="true"]')) {
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
                link.setAttribute("data-leaflet-css", "true");
                document.head.appendChild(link);
            }
            if (!window.L) {
                await new Promise((resolve)=>{
                    const script = document.createElement("script");
                    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
                    script.async = true;
                    script.onload = ()=>resolve();
                    document.body.appendChild(script);
                });
            }
        };
        const init = async ()=>{
            if (initializingRef.current || mapRef.current) return;
            initializingRef.current = true;
            await ensureAssets();
            const L = window.L;
            if (!mapEl.current) return;
            // Default to Cebu City center (similar to your reference image)
            const defaultCenter1 = [
                10.3157,
                123.8854
            ];
            mapRef.current = L.map(mapEl.current, {
                center: defaultCenter1,
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
            L.control.layers(baseMaps, {}, {
                position: 'topright',
                collapsed: true
            }).addTo(mapRef.current);
            // Ask for geolocation and center
            locateUser();
            // Click anywhere on map to show nearby places
            mapRef.current.on("click", async (e)=>{
                const latlng = e.latlng;
                const clickedLatLng = [
                    latlng.lat,
                    latlng.lng
                ];
                console.log('Map clicked at:', clickedLatLng);
                // Remove ALL previous click markers
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
                newClickMarker.bindPopup(`Clicked location<br>${clickedLatLng[0].toFixed(6)}, ${clickedLatLng[1].toFixed(6)}`).openPopup();
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
                    const newPlaces = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$restaurants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchRealFoodPlaces"])(clickedLatLng);
                    console.log('Found', newPlaces.length, 'new places for clicked location');
                    // Update the main food places state with the new places
                    setFoodPlaces(newPlaces);
                    // Filter places based on current zoom level
                    if (mapRef.current) {
                        const zoom = mapRef.current.getZoom();
                        filterPlacesByZoom(newPlaces, zoom);
                    } else {
                        filterPlacesByZoom(newPlaces, currentZoom);
                    }
                    // Find nearby places around the clicked location from the newly fetched places
                    const nearby = findNearbyPlaces(clickedLatLng, newPlaces, 1); // 1km radius
                    console.log('Found nearby places from new data:', nearby.length);
                    setNearbyPlaces(nearby);
                } catch (error) {
                    console.error("Error fetching places for clicked location:", error);
                    // Fallback: find nearby places from existing foodPlaces
                    const nearby = findNearbyPlaces(clickedLatLng, foodPlaces, 1);
                    console.log('Using fallback nearby places:', nearby.length);
                    setNearbyPlaces(nearby);
                } finally{
                    setLoadingPlaces(false);
                }
            });
            // Track zoom level changes
            mapRef.current.on("zoomend", ()=>{
                if (mapRef.current) {
                    const zoom = mapRef.current.getZoom();
                    setCurrentZoom(zoom);
                }
            });
            // Set initial zoom level
            setCurrentZoom(mapRef.current.getZoom());
            // Load initial food places around default center
            setTimeout(()=>{
                searchFoodPlaces(defaultCenter1);
            }, 1000);
            initializingRef.current = false;
        };
        init();
        return ()=>{
            if (mapRef.current) {
                // Clean up ALL click markers
                clickMarkersRef.current.forEach((marker)=>{
                    try {
                        mapRef.current.removeLayer(marker);
                    } catch (error) {
                        console.warn('Error removing click marker during cleanup:', error);
                    }
                });
                clickMarkersRef.current = [];
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);
    // Handle URL parameters for restaurant navigation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
                    html: `<div style="background:#8c52ff;color:#fff;border-radius:9999px;padding:8px 12px;box-shadow:0 2px 6px rgba(0,0,0,.25);font-weight:bold;font-size:12px;border:3px solid white">📍 ${restaurant || 'Restaurant'}</div>`,
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
                restaurantMarker.bindPopup(`
          <div style="text-align: center; padding: 8px;">
            <h3 style="margin: 0 0 8px 0; color: #8c52ff; font-weight: bold;">${restaurant || 'Selected Restaurant'}</h3>
            <p style="margin: 0; color: #666; font-size: 14px;">Click on the map to explore nearby places!</p>
          </div>
        `).openPopup();
                // Clean up the marker when component unmounts or params change
                return ()=>{
                    try {
                        mapRef.current?.removeLayer(restaurantMarker);
                    } catch (error) {
                        console.warn('Error removing restaurant marker:', error);
                    }
                };
            }
        }
    }, [
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
            filtered = filtered.filter((place)=>place.features?.includes(featureFilter));
        }
        return filtered;
    };
    // Filter food places based on zoom level
    const filterPlacesByZoom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((places, zoom)=>{
        console.log(`Filtering ${places.length} places at zoom level ${zoom}`);
        let filtered;
        // Determine zoom thresholds
        // Normal view (zoomed out): zoom <= 13
        // Slightly zoomed: 13 < zoom <= 16
        // Max zoom: zoom > 16
        if (zoom <= 13) {
            // Normal view: Show only the 5 most popular food places
            // Most popular = well-known chains OR highest rated places
            const wellKnownChains = [
                'jollibee',
                'mcdonald',
                'kfc',
                'starbucks',
                'chowking',
                'pizza hut',
                'subway',
                'mang inasal',
                'greenwich',
                'tokyo tokyo',
                'bonchon',
                'goldilocks',
                'red ribbon',
                'yellow cab',
                'coffee bean',
                'burger king',
                'wendy\'s',
                'domino',
                'papa john',
                'shakey'
            ];
            // Score places by popularity (well-known chains get priority, then by rating)
            const scoredPlaces = places.map((place)=>{
                const name = place.name?.toLowerCase() || '';
                const isWellKnown = wellKnownChains.some((chain)=>name.includes(chain));
                const rating = place.rating || 0;
                // Higher score = more popular
                // Well-known chains get base score of 100, then add rating * 10
                // Other places get score based on rating only
                const score = isWellKnown ? 100 + rating * 10 : rating * 10;
                return {
                    place,
                    score,
                    isWellKnown,
                    rating
                };
            });
            // Sort by score (highest first) and take top 5
            filtered = scoredPlaces.sort((a, b)=>b.score - a.score).slice(0, 5).map((item)=>item.place);
            console.log(`Normal view (zoom ${zoom}): Showing ${filtered.length} most popular places`);
        } else if (zoom <= 16) {
            // Slightly zoomed: Show top 10 places by rating
            filtered = places.sort((a, b)=>(b.rating || 0) - (a.rating || 0)).slice(0, 10);
            console.log(`Slightly zoomed (zoom ${zoom}): Showing ${filtered.length} top-rated places`);
        } else {
            // Max zoom: Show top 20 places by rating
            filtered = places.sort((a, b)=>(b.rating || 0) - (a.rating || 0)).slice(0, 20);
            console.log(`Max zoom (zoom ${zoom}): Showing ${filtered.length} top-rated places`);
        }
        setFilteredPlaces(filtered);
        // Update markers on map
        setTimeout(()=>{
            plotFoodMarkers(filtered);
        }, 100);
    }, []);
    async function searchFoodPlaces(centerLatLng) {
        setLoadingPlaces(true);
        try {
            console.log("Searching for real food places at:", centerLatLng);
            // Use OpenStreetMap Overpass API for real restaurant data
            const places = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$restaurants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchRealFoodPlaces"])(centerLatLng);
            console.log("Found", places.length, "real places");
            setFoodPlaces(places);
            // Filter places based on current zoom level
            if (mapRef.current) {
                const zoom = mapRef.current.getZoom();
                filterPlacesByZoom(places, zoom);
            } else {
                // Fallback if map not ready
                filterPlacesByZoom(places, currentZoom);
            }
        } catch (error) {
            console.error("Error fetching food places:", error);
            // Fallback to sample data if real data fails
            console.log("Falling back to sample data");
            const places = getSampleFoodPlaces(centerLatLng);
            setFoodPlaces(places);
            // Filter places based on current zoom level
            if (mapRef.current) {
                const zoom = mapRef.current.getZoom();
                filterPlacesByZoom(places, zoom);
            } else {
                filterPlacesByZoom(places, currentZoom);
            }
        } finally{
            setLoadingPlaces(false);
        }
    }
    // Load initial food places only once
    const loadInitialFoodPlaces = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return ()=>{
            searchFoodPlaces(defaultCenter);
        };
    }, []);
    function plotFoodMarkers(places) {
        const L = window.L;
        // Check if Leaflet is loaded and map is ready
        if (!L || !mapRef.current) {
            console.log("Leaflet not loaded or map not ready yet");
            return;
        }
        // Clear existing food markers and custom popups
        foodMarkersRef.current.forEach((marker)=>{
            try {
                // Call cleanup function if it exists
                if (marker.cleanup) {
                    marker.cleanup();
                }
                marker.remove();
            } catch  {}
        });
        foodMarkersRef.current = [];
        // Also remove any remaining custom popups
        const customPopups = document.querySelectorAll('.custom-popup');
        customPopups.forEach((popup)=>popup.remove());
        console.log("Plotting", places.length, "food places");
        // Add markers for each food place with modern styling
        places.forEach((place)=>{
            const getCategoryIcon = (category)=>{
                const cat = category.toLowerCase();
                if (cat.includes("restaurant") || cat.includes("food")) return "🍽️";
                if (cat.includes("cafe") || cat.includes("coffee")) return "☕";
                if (cat.includes("bar")) return "🍺";
                if (cat.includes("fast")) return "🍔";
                if (cat.includes("pizza")) return "🍕";
                if (cat.includes("bakery")) return "🥖";
                return "🍴";
            };
            const getCategoryColor = (category)=>{
                const cat = category.toLowerCase();
                if (cat.includes("cafe") || cat.includes("coffee")) return "#059669";
                if (cat.includes("fast")) return "#dc2626";
                if (cat.includes("bar")) return "#7c3aed";
                if (cat.includes("bakery")) return "#d97706";
                return "#8c52ff";
            };
            const iconHtml = `
        <div style="
          display: flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, ${getCategoryColor(place.category)}, ${getCategoryColor(place.category)}dd);
          color: #fff;
          border-radius: 25px;
          padding: 8px 14px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
          font-size: 13px;
          font-weight: 700;
          border: 3px solid #fff;
          cursor: pointer;
          min-width: 60px;
          justify-content: center;
        ">
          <span style="font-size: 16px;">${getCategoryIcon(place.category)}</span>
          <span>${place.rating ? place.rating.toFixed(1) : "★"}</span>
        </div>
      `;
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
            const popupContent = `
        <div style="min-width: 240px; font-family: system-ui, -apple-system, sans-serif; padding: 4px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <span style="font-size: 20px;">${getCategoryIcon(place.category)}</span>
            <div>
              <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: #111827; line-height: 1.2;">${place.name}</h3>
              <p style="margin: 2px 0 0 0; font-size: 13px; color: #6b7280; font-weight: 500;">${place.category}</p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 10px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 2px; background: #fef3c7; padding: 3px 8px; border-radius: 12px;">
              <span style="color: #f59e0b; font-size: 12px;">⭐</span>
              <span style="font-weight: 600; font-size: 12px; color: #92400e;">${place.rating ? place.rating.toFixed(1) : "N/A"}</span>
            </div>
            ${place.price_range ? `
            <div style="background: #e0e7ff; padding: 3px 8px; border-radius: 12px;">
              <span style="color: #3730a3; font-size: 12px; font-weight: 500;">${place.price_range}</span>
            </div>
            ` : ''}
            ${place.cuisine_type ? `
            <div style="background: #f3f4f6; padding: 3px 8px; border-radius: 12px;">
              <span style="color: #374151; font-size: 12px; font-weight: 500;">${place.cuisine_type}</span>
            </div>
            ` : ''}
          </div>
          ${place.description ? `
          <p style="margin: 0; font-size: 14px; color: #4b5563; line-height: 1.4; margin-bottom: 10px;">${place.description}</p>
          ` : ''}
          <div style="padding-top: 8px; border-top: 1px solid #e5e7eb;">
            <div style="display: flex; align-items: center; gap: 4px; font-size: 11px; color: #9ca3af;">
              <span>📍</span>
              <span>${place.latitude.toFixed(6)}, ${place.longitude.toFixed(6)}</span>
            </div>
          </div>
        </div>
      `;
            // Create a custom popup element that won't interfere with hover detection
            const popupElement = document.createElement('div');
            popupElement.innerHTML = popupContent;
            popupElement.className = 'custom-popup';
            popupElement.style.cssText = `
        position: absolute;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        padding: 0;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.2s ease;
        min-width: 240px;
        max-width: 300px;
      `;
            // Add popup to map container
            if (mapRef.current) {
                mapRef.current.getContainer().appendChild(popupElement);
            }
            // Position popup relative to marker with improved accuracy
            const updatePopupPosition = ()=>{
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
            };
            // Add hover effects with custom popup
            let hoverTimeout;
            let isHovering = false;
            let isPopupVisible = false;
            marker.on('mouseover', function() {
                clearTimeout(hoverTimeout);
                isHovering = true;
                if (!isPopupVisible) {
                    updatePopupPosition();
                    popupElement.style.opacity = '1';
                    popupElement.style.transform = 'translateY(0)';
                    isPopupVisible = true;
                }
            });
            marker.on('mouseout', function() {
                isHovering = false;
                hoverTimeout = setTimeout(()=>{
                    if (!isHovering && isPopupVisible) {
                        popupElement.style.opacity = '0';
                        popupElement.style.transform = 'translateY(10px)';
                        isPopupVisible = false;
                    }
                }, 150);
            });
            // Update popup position on map events with throttling
            let positionUpdateTimeout;
            const throttledUpdatePosition = ()=>{
                clearTimeout(positionUpdateTimeout);
                positionUpdateTimeout = setTimeout(()=>{
                    if (isPopupVisible) {
                        updatePopupPosition();
                    }
                }, 16); // ~60fps
            };
            // Update popup position on map move/zoom
            if (mapRef.current) {
                mapRef.current.on('move', throttledUpdatePosition);
                mapRef.current.on('zoom', throttledUpdatePosition);
                mapRef.current.on('moveend', updatePopupPosition);
                mapRef.current.on('zoomend', updatePopupPosition);
            }
            marker.on('click', ()=>setSelectedPlace(place));
            // Store cleanup function for this marker
            marker.cleanup = ()=>{
                if (popupElement && popupElement.parentNode) {
                    popupElement.parentNode.removeChild(popupElement);
                }
                if (mapRef.current) {
                    mapRef.current.off('move', throttledUpdatePosition);
                    mapRef.current.off('zoom', throttledUpdatePosition);
                    mapRef.current.off('moveend', updatePopupPosition);
                    mapRef.current.off('zoomend', updatePopupPosition);
                }
            };
            marker.addTo(mapRef.current);
            foodMarkersRef.current.push(marker);
        });
    }
    async function geocodeSearch(e) {
        e.preventDefault();
        if (!query.trim()) return;
        setSearching(true);
        try {
            // Restrict to Philippines results where possible
            const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=ph&limit=5&q=${encodeURIComponent(query)}`;
            const res = await fetch(url, {
                headers: {
                    "Accept-Language": "en"
                }
            });
            const data = await res.json();
            if (data && data.length > 0) {
                const best = data[0];
                const lat = parseFloat(best.lat);
                const lon = parseFloat(best.lon);
                const latlng = [
                    lat,
                    lon
                ];
                // Center map on search result
                mapRef.current.setView(latlng, 15);
                // Only search for food places when explicitly searching for a location
                searchFoodPlaces(latlng);
                setSuggestions(data.map((d)=>({
                        display: d.display_name,
                        lat: parseFloat(d.lat),
                        lon: parseFloat(d.lon)
                    })));
                setShowSuggestions(true);
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
                alert("No results found in the Philippines.");
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
                const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=ph&limit=5&q=${encodeURIComponent(v)}`;
                const res = await fetch(url, {
                    headers: {
                        "Accept-Language": "en"
                    }
                });
                const data = await res.json();
                setSuggestions((data || []).map((d)=>({
                        display: d.display_name,
                        lat: parseFloat(d.lat),
                        lon: parseFloat(d.lon)
                    })));
                setShowSuggestions(true);
            } catch  {
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
    const findNearbyPlaces = (clickedLatLng, allPlaces, radiusKm = 1)=>{
        const [clickLat, clickLon] = clickedLatLng;
        return allPlaces.map((place)=>({
                ...place,
                distance: calculateDistance(clickLat, clickLon, place.latitude, place.longitude)
            })).filter((place)=>place.distance <= radiusKm).sort((a, b)=>a.distance - b.distance) // Sort by distance
        .slice(0, 15); // Limit to 15 nearby places
    };
    // Test function to verify sample data works
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        console.log("Food places state:", foodPlaces);
    }, [
        foodPlaces
    ]);
    // Re-filter places when zoom level or foodPlaces change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (foodPlaces.length > 0) {
            filterPlacesByZoom(foodPlaces, currentZoom);
        }
    }, [
        currentZoom,
        foodPlaces,
        filterPlacesByZoom
    ]);
    // Filter food places when filters change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (mapRef.current && foodPlaces.length > 0) {
            const filteredPlaces = getSampleFoodPlaces([
                10.3157,
                123.8854
            ]);
            setFoodPlaces(filteredPlaces);
            plotFoodMarkers(filteredPlaces);
        }
    }, [
        categoryFilter,
        featureFilter
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-f4eca385f45045ad" + " " + "min-h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "f4eca385f45045ad",
                children: ".modern-food-marker{transition:box-shadow .2s!important;position:relative!important}.modern-food-marker:hover{transform:none!important;box-shadow:0 8px 25px #00000059!important}.leaflet-marker-icon{position:absolute!important}.leaflet-marker-icon:hover{z-index:1000!important}.custom-popup{font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif}.leaflet-control-layers{border-radius:8px!important;box-shadow:0 4px 12px #00000026!important}.leaflet-control-layers-toggle{background:#fff!important;border-radius:8px!important;box-shadow:0 2px 8px #0000001a!important}.leaflet-control-zoom a{color:#374151!important;background:#fff!important;border-radius:6px!important;font-weight:600!important;box-shadow:0 2px 8px #0000001a!important}.leaflet-control-zoom a:hover{color:#111827!important;background:#f9fafb!important}"
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-f4eca385f45045ad" + " " + "container py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-f4eca385f45045ad" + " " + "mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "jsx-f4eca385f45045ad" + " " + "text-3xl font-bold text-gray-900 mb-2",
                                children: "🍽️ Food Discovery Map"
                            }, void 0, false, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 1089,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "jsx-f4eca385f45045ad" + " " + "text-gray-600",
                                children: "Find the best restaurants, cafes, and food places in the Philippines"
                            }, void 0, false, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 1090,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-f4eca385f45045ad" + " " + "mt-2 p-3 bg-green-50 border border-green-200 rounded-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-f4eca385f45045ad" + " " + "text-sm text-green-700",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            className: "jsx-f4eca385f45045ad",
                                            children: "Real Data Mode:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 1093,
                                            columnNumber: 15
                                        }, this),
                                        ' Now showing real restaurants and cafes from OpenStreetMap! Use "My Location" to center the map, then click "Search Food Places" to find restaurants in the current view area.'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/map/page.tsx",
                                    lineNumber: 1092,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 1091,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-f4eca385f45045ad" + " " + "mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-f4eca385f45045ad" + " " + "text-sm text-blue-700",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            className: "jsx-f4eca385f45045ad",
                                            children: "🗺️ Click to Explore:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 1098,
                                            columnNumber: 15
                                        }, this),
                                        " Click anywhere on the map to automatically find and display nearby restaurants and cafes! The map will refresh with new places from the Places API around your clicked location."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/map/page.tsx",
                                    lineNumber: 1097,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 1096,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-f4eca385f45045ad" + " " + "mt-2 p-3 bg-purple-50 border border-purple-200 rounded-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "jsx-f4eca385f45045ad" + " " + "text-sm text-purple-700",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            className: "jsx-f4eca385f45045ad",
                                            children: "🔍 Smart Zoom Filtering:"
                                        }, void 0, false, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 1103,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                            className: "jsx-f4eca385f45045ad"
                                        }, void 0, false, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 1104,
                                            columnNumber: 15
                                        }, this),
                                        "• ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            className: "jsx-f4eca385f45045ad",
                                            children: "Normal View (≤13):"
                                        }, void 0, false, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 1104,
                                            columnNumber: 23
                                        }, this),
                                        " Shows 5 most popular food places (well-known chains & highest rated)",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                            className: "jsx-f4eca385f45045ad"
                                        }, void 0, false, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 1105,
                                            columnNumber: 15
                                        }, this),
                                        "• ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            className: "jsx-f4eca385f45045ad",
                                            children: "Slightly Zoomed (14-16):"
                                        }, void 0, false, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 1105,
                                            columnNumber: 23
                                        }, this),
                                        " Shows 10 top-rated places",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                            className: "jsx-f4eca385f45045ad"
                                        }, void 0, false, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 1106,
                                            columnNumber: 15
                                        }, this),
                                        "• ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            className: "jsx-f4eca385f45045ad",
                                            children: "Max Zoom (17+):"
                                        }, void 0, false, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 1106,
                                            columnNumber: 23
                                        }, this),
                                        " Shows 20 top-rated places"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/map/page.tsx",
                                    lineNumber: 1102,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 1101,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/map/page.tsx",
                        lineNumber: 1088,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-f4eca385f45045ad" + " " + "mb-4 bg-white rounded-lg shadow-sm border border-gray-200 p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-f4eca385f45045ad" + " " + "flex flex-col lg:flex-row gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    onSubmit: geocodeSearch,
                                    className: "jsx-f4eca385f45045ad" + " " + "relative flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-f4eca385f45045ad" + " " + "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    value: query,
                                                    onChange: (e)=>onQueryChange(e.target.value),
                                                    onFocus: ()=>suggestions.length && setShowSuggestions(true),
                                                    placeholder: "Search for restaurants, cafes, or food places...",
                                                    className: "jsx-f4eca385f45045ad" + " " + "h-12 w-full px-4 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent outline-none"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1117,
                                                    columnNumber: 13
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "submit",
                                                    className: "jsx-f4eca385f45045ad" + " " + "absolute right-2 top-1/2 -translate-y-1/2 h-8 px-4 rounded-md bg-[#8c52ff] text-white text-sm hover:opacity-90",
                                                    children: searching ? "..." : "Search"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1124,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 1116,
                                            columnNumber: 15
                                        }, this),
                                        showSuggestions && suggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-f4eca385f45045ad" + " " + "absolute top-14 left-0 right-0 z-20 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto",
                                            children: suggestions.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>{
                                                        const latlng = [
                                                            s.lat,
                                                            s.lon
                                                        ];
                                                        mapRef.current.setView(latlng, 15);
                                                        searchFoodPlaces(latlng);
                                                        setShowSuggestions(false);
                                                    },
                                                    className: "jsx-f4eca385f45045ad" + " " + "block w-full text-left px-4 py-3 hover:bg-gray-50 text-sm border-b border-gray-100 last:border-b-0",
                                                    children: s.display
                                                }, `${s.lat}-${s.lon}-${i}`, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1134,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 1132,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/map/page.tsx",
                                    lineNumber: 1115,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-f4eca385f45045ad" + " " + "flex gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: categoryFilter,
                                            onChange: (e)=>setCategoryFilter(e.target.value),
                                            className: "jsx-f4eca385f45045ad" + " " + "h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent outline-none",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    className: "jsx-f4eca385f45045ad",
                                                    children: "All Categories"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1159,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Cafes",
                                                    className: "jsx-f4eca385f45045ad",
                                                    children: "Cafes"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1160,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Bakeries/Pastries",
                                                    className: "jsx-f4eca385f45045ad",
                                                    children: "Bakeries/Pastries"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1161,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Bars/Pubs",
                                                    className: "jsx-f4eca385f45045ad",
                                                    children: "Bars/Pubs"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1162,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Fine Dining",
                                                    className: "jsx-f4eca385f45045ad",
                                                    children: "Fine Dining"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1163,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Fast Foods",
                                                    className: "jsx-f4eca385f45045ad",
                                                    children: "Fast Foods"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1164,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Local Cuisine",
                                                    className: "jsx-f4eca385f45045ad",
                                                    children: "Local Cuisine"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1165,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "International Cuisine",
                                                    className: "jsx-f4eca385f45045ad",
                                                    children: "International Cuisine"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1166,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 1154,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: featureFilter,
                                            onChange: (e)=>setFeatureFilter(e.target.value),
                                            className: "jsx-f4eca385f45045ad" + " " + "h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent outline-none",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    className: "jsx-f4eca385f45045ad",
                                                    children: "All Features"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1174,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Budget-Friendly",
                                                    className: "jsx-f4eca385f45045ad",
                                                    children: "Budget-Friendly"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1175,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Family-Friendly",
                                                    className: "jsx-f4eca385f45045ad",
                                                    children: "Family-Friendly"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1176,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Open 24 Hours",
                                                    className: "jsx-f4eca385f45045ad",
                                                    children: "Open 24 Hours"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1177,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Pet-Friendly",
                                                    className: "jsx-f4eca385f45045ad",
                                                    children: "Pet-Friendly"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1178,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 1169,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: locateUser,
                                            disabled: loadingLoc,
                                            className: "jsx-f4eca385f45045ad" + " " + "h-12 px-6 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    className: "jsx-f4eca385f45045ad" + " " + "w-4 h-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
                                                            className: "jsx-f4eca385f45045ad"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/map/page.tsx",
                                                            lineNumber: 1187,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z",
                                                            className: "jsx-f4eca385f45045ad"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/map/page.tsx",
                                                            lineNumber: 1188,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1186,
                                                    columnNumber: 17
                                                }, this),
                                                loadingLoc ? "Locating..." : "My Location"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 1181,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                if (mapRef.current) {
                                                    const center = mapRef.current.getCenter();
                                                    searchFoodPlaces([
                                                        center.lat,
                                                        center.lng
                                                    ]);
                                                }
                                            },
                                            disabled: loadingPlaces,
                                            className: "jsx-f4eca385f45045ad" + " " + "h-12 px-6 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    className: "jsx-f4eca385f45045ad" + " " + "w-4 h-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
                                                        className: "jsx-f4eca385f45045ad"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/map/page.tsx",
                                                        lineNumber: 1203,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1202,
                                                    columnNumber: 17
                                                }, this),
                                                loadingPlaces ? "Searching..." : "Search Food Places"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 1192,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/map/page.tsx",
                                    lineNumber: 1153,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/map/page.tsx",
                            lineNumber: 1113,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/map/page.tsx",
                        lineNumber: 1112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-f4eca385f45045ad" + " " + "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: mapEl,
                            style: {
                                width: "100%",
                                height: "70vh"
                            },
                            className: "jsx-f4eca385f45045ad"
                        }, void 0, false, {
                            fileName: "[project]/app/map/page.tsx",
                            lineNumber: 1213,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/map/page.tsx",
                        lineNumber: 1212,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-f4eca385f45045ad" + " " + "mt-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-f4eca385f45045ad" + " " + "flex items-center justify-between mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "jsx-f4eca385f45045ad" + " " + "text-xl font-semibold text-gray-900",
                                        children: [
                                            "🍴 Food Places ",
                                            loadingPlaces ? "(loading...)" : `(${foodPlaces.length})`
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1219,
                                        columnNumber: 13
                                    }, this),
                                    userLocation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-f4eca385f45045ad" + " " + "text-sm text-gray-500",
                                        children: "📍 Showing places near your location"
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1223,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 1218,
                                columnNumber: 11
                            }, this),
                            foodPlaces.length === 0 && !loadingPlaces && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-f4eca385f45045ad" + " " + "text-center py-12 bg-white rounded-lg border border-gray-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-f4eca385f45045ad" + " " + "text-6xl mb-4",
                                        children: "🍽️"
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1231,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "jsx-f4eca385f45045ad" + " " + "text-lg font-medium text-gray-900 mb-2",
                                        children: "No food places found"
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1232,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-f4eca385f45045ad" + " " + "text-gray-600",
                                        children: "Try searching for a different area or adjust your filters"
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1233,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 1230,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-f4eca385f45045ad" + " " + "grid md:grid-cols-2 lg:grid-cols-3 gap-4",
                                children: foodPlaces.map((place)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>setSelectedPlace(place),
                                        className: "jsx-f4eca385f45045ad" + " " + `bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer ${selectedPlace?.id === place.id ? 'ring-2 ring-[#8c52ff]' : ''}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-f4eca385f45045ad" + " " + "flex items-start justify-between mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "jsx-f4eca385f45045ad" + " " + "font-semibold text-gray-900 text-lg",
                                                        children: place.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/map/page.tsx",
                                                        lineNumber: 1247,
                                                        columnNumber: 19
                                                    }, this),
                                                    place.rating && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-f4eca385f45045ad" + " " + "flex items-center gap-1 text-yellow-500",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-f4eca385f45045ad" + " " + "text-sm",
                                                                children: "⭐"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/map/page.tsx",
                                                                lineNumber: 1250,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "jsx-f4eca385f45045ad" + " " + "text-sm font-medium",
                                                                children: place.rating.toFixed(1)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/map/page.tsx",
                                                                lineNumber: 1251,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/map/page.tsx",
                                                        lineNumber: 1249,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 1246,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-f4eca385f45045ad" + " " + "text-gray-600 text-sm mb-2",
                                                children: place.category
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 1256,
                                                columnNumber: 17
                                            }, this),
                                            place.cuisine_type && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-f4eca385f45045ad" + " " + "text-gray-500 text-xs mb-2",
                                                children: place.cuisine_type
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 1259,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-f4eca385f45045ad" + " " + "flex items-center justify-between",
                                                children: [
                                                    place.price_range && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-f4eca385f45045ad" + " " + "text-green-600 font-medium text-sm",
                                                        children: place.price_range
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/map/page.tsx",
                                                        lineNumber: 1264,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: (e)=>{
                                                            e.stopPropagation();
                                                            // Center map on this place
                                                            mapRef.current.setView([
                                                                place.latitude,
                                                                place.longitude
                                                            ], 16);
                                                        },
                                                        className: "jsx-f4eca385f45045ad" + " " + "text-[#8c52ff] text-sm font-medium hover:underline",
                                                        children: "View on Map"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/map/page.tsx",
                                                        lineNumber: 1266,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 1262,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, place.id, true, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1239,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 1237,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/map/page.tsx",
                        lineNumber: 1217,
                        columnNumber: 9
                    }, this),
                    showNearbyPlaces && clickedLocation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-f4eca385f45045ad" + " " + "mt-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-f4eca385f45045ad" + " " + "flex items-center justify-between mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "jsx-f4eca385f45045ad" + " " + "text-xl font-semibold text-gray-900",
                                        children: [
                                            "🗺️ Food Places Near Clicked Location",
                                            loadingPlaces && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-f4eca385f45045ad" + " " + "text-sm text-gray-500 ml-2",
                                                children: "(Loading...)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 1288,
                                                columnNumber: 35
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1286,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                        className: "jsx-f4eca385f45045ad" + " " + "text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                className: "jsx-f4eca385f45045ad" + " " + "w-4 h-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M6 18L18 6M6 6l12 12",
                                                    className: "jsx-f4eca385f45045ad"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 1311,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 1310,
                                                columnNumber: 17
                                            }, this),
                                            "Close"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1290,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 1285,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-f4eca385f45045ad" + " " + "bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-f4eca385f45045ad" + " " + "text-sm text-blue-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                className: "jsx-f4eca385f45045ad",
                                                children: "📍 Clicked Location:"
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 1319,
                                                columnNumber: 17
                                            }, this),
                                            " ",
                                            clickedLocation[0].toFixed(6),
                                            ", ",
                                            clickedLocation[1].toFixed(6)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1318,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-f4eca385f45045ad" + " " + "text-xs text-blue-600 mt-1",
                                        children: loadingPlaces ? "Fetching nearby places from Places API..." : `Showing ${nearbyPlaces.length} food places within 1km radius • Places automatically fetched from Places API`
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1321,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 1317,
                                columnNumber: 13
                            }, this),
                            loadingPlaces ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-f4eca385f45045ad" + " " + "text-center py-12 bg-white rounded-lg border border-gray-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-f4eca385f45045ad" + " " + "text-4xl mb-4",
                                        children: "🔍"
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1332,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "jsx-f4eca385f45045ad" + " " + "text-lg font-medium text-gray-900 mb-2",
                                        children: "Finding nearby places..."
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1333,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-f4eca385f45045ad" + " " + "text-gray-600",
                                        children: "Searching for restaurants and cafes around the clicked location"
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1334,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-f4eca385f45045ad" + " " + "mt-4 flex justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-f4eca385f45045ad" + " " + "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
                                        }, void 0, false, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 1336,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1335,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 1331,
                                columnNumber: 15
                            }, this) : nearbyPlaces.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-f4eca385f45045ad" + " " + "grid md:grid-cols-2 lg:grid-cols-3 gap-4",
                                children: nearbyPlaces.map((place)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>{
                                            // Center map on this nearby place and select it
                                            mapRef.current.setView([
                                                place.latitude,
                                                place.longitude
                                            ], 16);
                                            setSelectedPlace(place);
                                            setShowNearbyPlaces(false); // Hide nearby places when selecting a specific place
                                        },
                                        className: "jsx-f4eca385f45045ad" + " " + "bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-f4eca385f45045ad" + " " + "flex items-start justify-between mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "jsx-f4eca385f45045ad" + " " + "font-semibold text-gray-900 text-lg",
                                                        children: place.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/map/page.tsx",
                                                        lineNumber: 1353,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-f4eca385f45045ad" + " " + "text-right",
                                                        children: [
                                                            place.rating && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-f4eca385f45045ad" + " " + "flex items-center gap-1 text-yellow-500 mb-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-f4eca385f45045ad" + " " + "text-sm",
                                                                        children: "⭐"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/map/page.tsx",
                                                                        lineNumber: 1357,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-f4eca385f45045ad" + " " + "text-sm font-medium",
                                                                        children: place.rating.toFixed(1)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/map/page.tsx",
                                                                        lineNumber: 1358,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/map/page.tsx",
                                                                lineNumber: 1356,
                                                                columnNumber: 25
                                                            }, this),
                                                            place.distance && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-f4eca385f45045ad" + " " + "text-xs text-gray-500",
                                                                children: [
                                                                    "📏 ",
                                                                    (place.distance * 1000).toFixed(0),
                                                                    "m away"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/map/page.tsx",
                                                                lineNumber: 1362,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/map/page.tsx",
                                                        lineNumber: 1354,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 1352,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-f4eca385f45045ad" + " " + "text-gray-600 text-sm mb-2",
                                                children: place.category
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 1369,
                                                columnNumber: 19
                                            }, this),
                                            place.cuisine_type && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-f4eca385f45045ad" + " " + "text-gray-500 text-xs mb-2",
                                                children: place.cuisine_type
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 1372,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-f4eca385f45045ad" + " " + "flex items-center justify-between",
                                                children: [
                                                    place.price_range && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "jsx-f4eca385f45045ad" + " " + "text-green-600 font-medium text-sm",
                                                        children: place.price_range
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/map/page.tsx",
                                                        lineNumber: 1377,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: (e)=>{
                                                            e.stopPropagation();
                                                            // Center map on this place and select it
                                                            mapRef.current.setView([
                                                                place.latitude,
                                                                place.longitude
                                                            ], 16);
                                                            setSelectedPlace(place);
                                                            setShowNearbyPlaces(false);
                                                        },
                                                        className: "jsx-f4eca385f45045ad" + " " + "text-[#8c52ff] text-sm font-medium hover:underline",
                                                        children: "View on Map"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/map/page.tsx",
                                                        lineNumber: 1379,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 1375,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, place.id, true, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1342,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 1340,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-f4eca385f45045ad" + " " + "text-center py-12 bg-white rounded-lg border border-gray-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-f4eca385f45045ad" + " " + "text-6xl mb-4",
                                        children: "🗺️"
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1397,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "jsx-f4eca385f45045ad" + " " + "text-lg font-medium text-gray-900 mb-2",
                                        children: "No food places found nearby"
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1398,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-f4eca385f45045ad" + " " + "text-gray-600",
                                        children: "No food places found within 1km of the clicked location"
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1399,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-f4eca385f45045ad" + " " + "text-sm text-gray-500 mt-2",
                                        children: 'Try clicking on a different area or use the "Search Food Places" button to load more places'
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 1400,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 1396,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/map/page.tsx",
                        lineNumber: 1284,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/map/page.tsx",
                lineNumber: 1086,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/map/page.tsx",
        lineNumber: 1036,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_8605c5e3._.js.map