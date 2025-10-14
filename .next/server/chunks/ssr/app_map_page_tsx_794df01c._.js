module.exports = [
"[project]/app/map/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FoodMapPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function FoodMapPage() {
    const mapEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const userMarkerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const foodMarkersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const initializingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [cuisineFilter, setCuisineFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [priceFilter, setPriceFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [loadingLoc, setLoadingLoc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searching, setSearching] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [suggestions, setSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showSuggestions, setShowSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const debounceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [foodPlaces, setFoodPlaces] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingPlaces, setLoadingPlaces] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [userLocation, setUserLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedPlace, setSelectedPlace] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
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
            // Click to show coordinates (but don't search automatically to prevent markers from moving)
            mapRef.current.on("click", (e)=>{
                const latlng = e.latlng;
                console.log('Map clicked at:', [
                    latlng.lat,
                    latlng.lng
                ]);
            // Don't automatically search on click to prevent markers from moving
            });
            // Load initial food places around default center
            setTimeout(()=>{
                searchFoodPlaces(defaultCenter1);
            }, 1000);
            initializingRef.current = false;
        };
        init();
        return ()=>{
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);
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
                category: "Fast Food",
                rating: 4.2,
                price_range: "$$",
                latitude: 10.3157,
                longitude: 123.8854,
                description: "Popular Filipino fast food chain",
                cuisine_type: "Filipino",
                is_open: true
            },
            {
                id: "2",
                name: "McDonald's",
                category: "Fast Food",
                rating: 4.0,
                price_range: "$$",
                latitude: 10.3167,
                longitude: 123.8864,
                description: "International fast food chain",
                cuisine_type: "American",
                is_open: true
            },
            {
                id: "3",
                name: "Starbucks Coffee",
                category: "Cafe",
                rating: 4.3,
                price_range: "$$$",
                latitude: 10.3147,
                longitude: 123.8844,
                description: "Premium coffee and pastries",
                cuisine_type: "International",
                is_open: true
            },
            {
                id: "4",
                name: "Chowking",
                category: "Restaurant",
                rating: 4.1,
                price_range: "$$",
                latitude: 10.3177,
                longitude: 123.8874,
                description: "Chinese-Filipino cuisine",
                cuisine_type: "Chinese",
                is_open: true
            },
            {
                id: "5",
                name: "KFC",
                category: "Fast Food",
                rating: 4.0,
                price_range: "$$",
                latitude: 10.3137,
                longitude: 123.8834,
                description: "Fried chicken and sides",
                cuisine_type: "American",
                is_open: true
            },
            {
                id: "6",
                name: "Greenwich Pizza",
                category: "Restaurant",
                rating: 3.9,
                price_range: "$$",
                latitude: 10.3187,
                longitude: 123.8884,
                description: "Pizza and pasta",
                cuisine_type: "Italian",
                is_open: true
            },
            {
                id: "7",
                name: "Mang Inasal",
                category: "Restaurant",
                rating: 4.4,
                price_range: "$$",
                latitude: 10.3127,
                longitude: 123.8824,
                description: "Grilled chicken and Filipino dishes",
                cuisine_type: "Filipino",
                is_open: true
            },
            {
                id: "8",
                name: "Coffee Bean & Tea Leaf",
                category: "Cafe",
                rating: 4.2,
                price_range: "$$$",
                latitude: 10.3197,
                longitude: 123.8894,
                description: "Coffee, tea, and light meals",
                cuisine_type: "International",
                is_open: true
            },
            {
                id: "9",
                name: "Pizza Hut",
                category: "Restaurant",
                rating: 4.1,
                price_range: "$$$",
                latitude: 10.3117,
                longitude: 123.8814,
                description: "Pizza, pasta, and wings",
                cuisine_type: "Italian",
                is_open: true
            },
            {
                id: "10",
                name: "Subway",
                category: "Fast Food",
                rating: 4.0,
                price_range: "$$",
                latitude: 10.3207,
                longitude: 123.8904,
                description: "Fresh sandwiches and salads",
                cuisine_type: "American",
                is_open: true
            },
            {
                id: "11",
                name: "Goldilocks",
                category: "Bakery",
                rating: 4.3,
                price_range: "$$",
                latitude: 10.3107,
                longitude: 123.8804,
                description: "Filipino bakery and cakes",
                cuisine_type: "Filipino",
                is_open: true
            },
            {
                id: "12",
                name: "Red Ribbon",
                category: "Bakery",
                rating: 4.1,
                price_range: "$$",
                latitude: 10.3217,
                longitude: 123.8914,
                description: "Cakes and pastries",
                cuisine_type: "Filipino",
                is_open: true
            },
            {
                id: "13",
                name: "Yellow Cab Pizza",
                category: "Restaurant",
                rating: 4.2,
                price_range: "$$$",
                latitude: 10.3097,
                longitude: 123.8794,
                description: "New York style pizza",
                cuisine_type: "Italian",
                is_open: true
            },
            {
                id: "14",
                name: "Tokyo Tokyo",
                category: "Restaurant",
                rating: 4.0,
                price_range: "$$",
                latitude: 10.3227,
                longitude: 123.8924,
                description: "Japanese fast food",
                cuisine_type: "Japanese",
                is_open: true
            },
            {
                id: "15",
                name: "Bonchon",
                category: "Restaurant",
                rating: 4.4,
                price_range: "$$$",
                latitude: 10.3087,
                longitude: 123.8784,
                description: "Korean fried chicken",
                cuisine_type: "Korean",
                is_open: true
            }
        ];
        // Filter by cuisine if selected
        let filtered = samplePlaces;
        if (cuisineFilter) {
            filtered = filtered.filter((place)=>place.cuisine_type?.toLowerCase().includes(cuisineFilter.toLowerCase()));
        }
        // Filter by price if selected
        if (priceFilter) {
            filtered = filtered.filter((place)=>place.price_range === priceFilter);
        }
        return filtered;
    };
    async function searchFoodPlaces(centerLatLng) {
        setLoadingPlaces(true);
        try {
            console.log("Searching for real food places at:", centerLatLng);
            // Use OpenStreetMap Overpass API for real restaurant data
            const places = await fetchRealFoodPlaces(centerLatLng);
            console.log("Found", places.length, "real places");
            setFoodPlaces(places);
            // Wait a bit to ensure map is ready
            setTimeout(()=>{
                plotFoodMarkers(places);
            }, 100);
        } catch (error) {
            console.error("Error fetching food places:", error);
            // Fallback to sample data if real data fails
            console.log("Falling back to sample data");
            const places = getSampleFoodPlaces(centerLatLng);
            setFoodPlaces(places);
            setTimeout(()=>{
                plotFoodMarkers(places);
            }, 100);
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
    async function fetchRealFoodPlaces(centerLatLng) {
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
                'Content-Type': 'text/plain'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
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
        // Filter by cuisine if selected
        let filtered = places;
        if (cuisineFilter) {
            filtered = filtered.filter((place)=>place.cuisine_type?.toLowerCase().includes(cuisineFilter.toLowerCase()));
        }
        // Filter by price if selected
        if (priceFilter) {
            filtered = filtered.filter((place)=>place.price_range === priceFilter);
        }
        return filtered;
    }
    function plotFoodMarkers(places) {
        const L = window.L;
        // Check if Leaflet is loaded and map is ready
        if (!L || !mapRef.current) {
            console.log("Leaflet not loaded or map not ready yet");
            return;
        }
        // Clear existing food markers
        foodMarkersRef.current.forEach((marker)=>{
            try {
                marker.remove();
            } catch  {}
        });
        foodMarkersRef.current = [];
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
          transition: transform 0.2s ease;
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
                    -17.5
                ]
            });
            const marker = L.marker([
                place.latitude,
                place.longitude
            ], {
                icon: customIcon,
                riseOnHover: true
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
            marker.bindPopup(popupContent, {
                maxWidth: 300,
                className: 'modern-popup',
                closeButton: true,
                autoClose: false,
                closeOnClick: false
            });
            // Add hover effects
            marker.on('mouseover', function() {
                this.openPopup();
            });
            marker.on('click', ()=>setSelectedPlace(place));
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
    // Filter food places when filters change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (foodPlaces.length > 0) {
            const filtered = foodPlaces.filter((place)=>{
                const cuisineMatch = !cuisineFilter || (place.cuisine_type || "").toLowerCase().includes(cuisineFilter.toLowerCase());
                const priceMatch = !priceFilter || place.price_range === priceFilter;
                return cuisineMatch && priceMatch;
            });
            plotFoodMarkers(filtered);
        }
    }, [
        cuisineFilter,
        priceFilter,
        foodPlaces
    ]);
    // Test function to verify sample data works
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        console.log("Food places state:", foodPlaces);
    }, [
        foodPlaces
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container py-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-bold text-gray-900 mb-2",
                            children: "🍽️ Food Discovery Map"
                        }, void 0, false, {
                            fileName: "[project]/app/map/page.tsx",
                            lineNumber: 774,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600",
                            children: "Find the best restaurants, cafes, and food places in the Philippines"
                        }, void 0, false, {
                            fileName: "[project]/app/map/page.tsx",
                            lineNumber: 775,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2 p-3 bg-green-50 border border-green-200 rounded-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-green-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Real Data Mode:"
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 778,
                                        columnNumber: 15
                                    }, this),
                                    ' Now showing real restaurants and cafes from OpenStreetMap! Use "My Location" to center the map, then click "Search Food Places" to find restaurants in the current view area.'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 777,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/map/page.tsx",
                            lineNumber: 776,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/map/page.tsx",
                    lineNumber: 773,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4 bg-white rounded-lg shadow-sm border border-gray-200 p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col lg:flex-row gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: geocodeSearch,
                                className: "relative flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: query,
                                                onChange: (e)=>onQueryChange(e.target.value),
                                                onFocus: ()=>suggestions.length && setShowSuggestions(true),
                                                placeholder: "Search for restaurants, cafes, or food places...",
                                                className: "h-12 w-full px-4 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent outline-none"
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 789,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                className: "absolute right-2 top-1/2 -translate-y-1/2 h-8 px-4 rounded-md bg-[#8c52ff] text-white text-sm hover:opacity-90",
                                                children: searching ? "..." : "Search"
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 796,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 788,
                                        columnNumber: 15
                                    }, this),
                                    showSuggestions && suggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-14 left-0 right-0 z-20 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto",
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
                                                className: "block w-full text-left px-4 py-3 hover:bg-gray-50 text-sm border-b border-gray-100 last:border-b-0",
                                                children: s.display
                                            }, `${s.lat}-${s.lon}-${i}`, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 806,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 804,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 787,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: cuisineFilter,
                                        onChange: (e)=>setCuisineFilter(e.target.value),
                                        className: "h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent outline-none",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "All Cuisines"
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 831,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "filipino",
                                                children: "Filipino"
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 832,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "chinese",
                                                children: "Chinese"
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 833,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "japanese",
                                                children: "Japanese"
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 834,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "korean",
                                                children: "Korean"
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 835,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "italian",
                                                children: "Italian"
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 836,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "american",
                                                children: "American"
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 837,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "thai",
                                                children: "Thai"
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 838,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "indian",
                                                children: "Indian"
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 839,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 826,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: priceFilter,
                                        onChange: (e)=>setPriceFilter(e.target.value),
                                        className: "h-12 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#8c52ff] focus:border-transparent outline-none",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "All Prices"
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 847,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "$",
                                                children: "$ Budget"
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 848,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "$$",
                                                children: "$$ Moderate"
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 849,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "$$$",
                                                children: "$$$ Expensive"
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 850,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "$$$$",
                                                children: "$$$$ Very Expensive"
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 851,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 842,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: locateUser,
                                        disabled: loadingLoc,
                                        className: "h-12 px-6 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-4 h-4",
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
                                                        fileName: "[project]/app/map/page.tsx",
                                                        lineNumber: 860,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/map/page.tsx",
                                                        lineNumber: 861,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 859,
                                                columnNumber: 17
                                            }, this),
                                            loadingLoc ? "Locating..." : "My Location"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 854,
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
                                        className: "h-12 px-6 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-4 h-4",
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 876,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 875,
                                                columnNumber: 17
                                            }, this),
                                            loadingPlaces ? "Searching..." : "Search Food Places"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 865,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 825,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/map/page.tsx",
                        lineNumber: 785,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/map/page.tsx",
                    lineNumber: 784,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: mapEl,
                        style: {
                            width: "100%",
                            height: "70vh"
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/map/page.tsx",
                        lineNumber: 886,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/map/page.tsx",
                    lineNumber: 885,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-semibold text-gray-900",
                                    children: [
                                        "🍴 Food Places ",
                                        loadingPlaces ? "(loading...)" : `(${foodPlaces.length})`
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/map/page.tsx",
                                    lineNumber: 892,
                                    columnNumber: 13
                                }, this),
                                userLocation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-500",
                                    children: "📍 Showing places near your location"
                                }, void 0, false, {
                                    fileName: "[project]/app/map/page.tsx",
                                    lineNumber: 896,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/map/page.tsx",
                            lineNumber: 891,
                            columnNumber: 11
                        }, this),
                        foodPlaces.length === 0 && !loadingPlaces && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-12 bg-white rounded-lg border border-gray-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-6xl mb-4",
                                    children: "🍽️"
                                }, void 0, false, {
                                    fileName: "[project]/app/map/page.tsx",
                                    lineNumber: 904,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-medium text-gray-900 mb-2",
                                    children: "No food places found"
                                }, void 0, false, {
                                    fileName: "[project]/app/map/page.tsx",
                                    lineNumber: 905,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600",
                                    children: "Try searching for a different area or adjust your filters"
                                }, void 0, false, {
                                    fileName: "[project]/app/map/page.tsx",
                                    lineNumber: 906,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/map/page.tsx",
                            lineNumber: 903,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4",
                            children: foodPlaces.map((place)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer ${selectedPlace?.id === place.id ? 'ring-2 ring-[#8c52ff]' : ''}`,
                                    onClick: ()=>setSelectedPlace(place),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start justify-between mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-semibold text-gray-900 text-lg",
                                                    children: place.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 920,
                                                    columnNumber: 19
                                                }, this),
                                                place.rating && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1 text-yellow-500",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm",
                                                            children: "⭐"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/map/page.tsx",
                                                            lineNumber: 923,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-medium",
                                                            children: place.rating.toFixed(1)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/map/page.tsx",
                                                            lineNumber: 924,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 922,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 919,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-600 text-sm mb-2",
                                            children: place.category
                                        }, void 0, false, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 929,
                                            columnNumber: 17
                                        }, this),
                                        place.cuisine_type && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-500 text-xs mb-2",
                                            children: place.cuisine_type
                                        }, void 0, false, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 932,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                place.price_range && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-green-600 font-medium text-sm",
                                                    children: place.price_range
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 937,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "text-[#8c52ff] text-sm font-medium hover:underline",
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        // Center map on this place
                                                        mapRef.current.setView([
                                                            place.latitude,
                                                            place.longitude
                                                        ], 16);
                                                    },
                                                    children: "View on Map"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 939,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 935,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, place.id, true, {
                                    fileName: "[project]/app/map/page.tsx",
                                    lineNumber: 912,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/map/page.tsx",
                            lineNumber: 910,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/map/page.tsx",
                    lineNumber: 890,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/map/page.tsx",
            lineNumber: 771,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/map/page.tsx",
        lineNumber: 770,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=app_map_page_tsx_794df01c._.js.map