(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/map/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MapPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/browserClient.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function MapPage() {
    _s();
    const mapEl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const userMarkerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const searchMarkerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const initializingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [mood, setMood] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const moodRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])("");
    const [loadingLoc, setLoadingLoc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searching, setSearching] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [suggestions, setSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showSuggestions, setShowSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const debounceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingRecs, setLoadingRecs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedLatLng, setSelectedLatLng] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Inject Leaflet CSS/JS from CDN to avoid local install
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapPage.useEffect": ()=>{
            moodRef.current = mood;
        }
    }["MapPage.useEffect"], [
        mood
    ]);
    // Initialize Leaflet map once. Guard against double init in React StrictMode.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapPage.useEffect": ()=>{
            const ensureAssets = {
                "MapPage.useEffect.ensureAssets": async ()=>{
                    if (!document.querySelector('link[data-leaflet-css="true"]')) {
                        const link = document.createElement("link");
                        link.rel = "stylesheet";
                        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
                        link.setAttribute("data-leaflet-css", "true");
                        document.head.appendChild(link);
                    }
                    if (!window.L) {
                        await new Promise({
                            "MapPage.useEffect.ensureAssets": (resolve)=>{
                                const script = document.createElement("script");
                                script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
                                script.async = true;
                                script.onload = ({
                                    "MapPage.useEffect.ensureAssets": ()=>resolve()
                                })["MapPage.useEffect.ensureAssets"];
                                document.body.appendChild(script);
                            }
                        }["MapPage.useEffect.ensureAssets"]);
                    }
                }
            }["MapPage.useEffect.ensureAssets"];
            const init = {
                "MapPage.useEffect.init": async ()=>{
                    if (initializingRef.current || mapRef.current) return;
                    initializingRef.current = true;
                    await ensureAssets();
                    const L = window.L;
                    if (!mapEl.current) return;
                    // Default to Manila center if geolocation unavailable
                    const defaultCenter = [
                        14.5995,
                        120.9842
                    ];
                    mapRef.current = L.map(mapEl.current, {
                        center: defaultCenter,
                        zoom: 13
                    });
                    // Clean light basemap without POI labels (no dark mode)
                    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png", {
                        maxZoom: 19,
                        attribution: '&copy; OpenStreetMap contributors, &copy; CARTO'
                    }).addTo(mapRef.current);
                    // Ask for geolocation and center
                    locateUser();
                    // Click to set selection marker and popup placeholder
                    mapRef.current.on("click", {
                        "MapPage.useEffect.init": (e)=>{
                            const latlng = e.latlng;
                            const currentMood = moodRef.current;
                            dropSearchMarker(latlng, "This is where we'll recommend places for your mood".concat(currentMood ? " (".concat(currentMood, ")") : "", "."));
                            setSelectedLatLng([
                                latlng.lat,
                                latlng.lng
                            ]);
                            fetchRecommendations([
                                latlng.lat,
                                latlng.lng
                            ]);
                        }
                    }["MapPage.useEffect.init"]);
                    initializingRef.current = false;
                }
            }["MapPage.useEffect.init"];
            init();
            return ({
                "MapPage.useEffect": ()=>{
                    if (mapRef.current) {
                        mapRef.current.remove();
                        mapRef.current = null;
                    }
                }
            })["MapPage.useEffect"];
        }
    }["MapPage.useEffect"], []);
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
            const L = window.L;
            if (userMarkerRef.current) {
                userMarkerRef.current.setLatLng(latlng);
            } else {
                const youIcon = L.divIcon({
                    html: '<div style="background:#2563eb;color:#fff;border-radius:9999px;padding:6px 10px;box-shadow:0 2px 6px rgba(0,0,0,.25)">You</div>',
                    className: '',
                    iconSize: [
                        36,
                        24
                    ],
                    iconAnchor: [
                        18,
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
            // Auto-load nearby venues around current location
            setSelectedLatLng(latlng);
            fetchRecommendations(latlng);
        } catch (_) {
        // ignore; user may deny permission
        } finally{
            setLoadingLoc(false);
        }
    }
    function dropSearchMarker(latlng, popupText) {
        const L = window.L;
        const ll = Array.isArray(latlng) ? latlng : [
            latlng.lat,
            latlng.lng
        ];
        if (searchMarkerRef.current) {
            searchMarkerRef.current.setLatLng(ll);
        } else {
            searchMarkerRef.current = L.marker(ll);
            searchMarkerRef.current.addTo(mapRef.current);
        }
        if (popupText) searchMarkerRef.current.bindPopup(popupText).openPopup();
        mapRef.current.setView(ll, 16);
    }
    async function geocodeSearch(e) {
        e.preventDefault();
        if (!query.trim()) return;
        setSearching(true);
        try {
            // Restrict to Philippines results where possible
            const url = "https://nominatim.openstreetmap.org/search?format=json&countrycodes=ph&limit=5&q=".concat(encodeURIComponent(query));
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
                dropSearchMarker({
                    lat,
                    lng: lon
                }, "This is where we'll recommend places for your mood".concat(mood ? " (".concat(mood, ")") : "", "."));
                setSelectedLatLng([
                    lat,
                    lon
                ]);
                fetchRecommendations([
                    lat,
                    lon
                ]);
                setSuggestions(data.map((d)=>({
                        display: d.display_name,
                        lat: parseFloat(d.lat),
                        lon: parseFloat(d.lon)
                    })));
                setShowSuggestions(true);
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
                alert("No results found.");
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
                const url = "https://nominatim.openstreetmap.org/search?format=json&countrycodes=ph&limit=5&q=".concat(encodeURIComponent(v));
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
            } catch (e) {
            // ignore
            }
        }, 400);
    }
    async function fetchRecommendations(centerLatLng) {
        setLoadingRecs(true);
        try {
            const [lat, lon] = centerLatLng;
            // Define a rough bounding box around the point (~15km) for better coverage
            const delta = 0.15;
            const minLat = lat - delta;
            const maxLat = lat + delta;
            const minLon = lon - delta;
            const maxLon = lon + delta;
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$browserClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
            // Optional mood filter - matches category or name for demo
            let queryBuilder = supabase.from("places").select("id,name,description,latitude,longitude,category,price_range,rating,image_url").gte("latitude", minLat).lte("latitude", maxLat).gte("longitude", minLon).lte("longitude", maxLon).limit(50);
            if (mood) {
                // naive filter: category ilike mood OR name/description contains mood
                queryBuilder = queryBuilder.or("category.ilike.%".concat(mood, "%,name.ilike.%").concat(mood, "%,description.ilike.%").concat(mood, "%"));
            }
            const { data, error } = await queryBuilder;
            if (error) throw error;
            // filter to relevant venue types, but if filtering yields nothing, fall back to raw results
            const allowed = [
                "restaurant",
                "restaurants",
                "cafe",
                "coffee",
                "event",
                "events",
                "bar",
                "food",
                "eatery"
            ];
            let filtered = (data || []).filter((p)=>{
                const cat = (p.category || "").toLowerCase();
                const name = (p.name || "").toLowerCase();
                const desc = (p.description || "").toLowerCase();
                const categoryMatch = allowed.some((a)=>cat.includes(a));
                const moodMatch = !mood || cat.includes(mood.toLowerCase()) || name.includes(mood.toLowerCase()) || desc.includes(mood.toLowerCase());
                return categoryMatch && moodMatch;
            });
            if (filtered.length === 0) filtered = data || [];
            setResults(filtered);
            // Plot markers
            const L = window.L;
            // Remove old search marker popup text and re-add
            if (searchMarkerRef.current) {
                searchMarkerRef.current.bindPopup("Found ".concat(filtered.length, " places").concat(mood ? ' for "'.concat(mood, '"') : "", " near here."));
            }
            // Remove previous result markers
            if (!window.__resultMarkers) window.__resultMarkers = [];
            window.__resultMarkers.forEach((m)=>{
                try {
                    m.remove();
                } catch (e) {}
            });
            window.__resultMarkers = [];
            // Add individual markers
            filtered.forEach((p)=>{
                if (typeof p.latitude !== "number" || typeof p.longitude !== "number") return;
                const iconHtml = '\n          <div style="display:flex;align-items:center;gap:4px;background:#1f2937;color:#fff;border-radius:9999px;padding:4px 8px;box-shadow:0 2px 6px rgba(0,0,0,.25)">\n            <span style="font-size:12px">'.concat(typeof p.rating === "number" ? p.rating.toFixed(1) : "", '</span>\n            <span style="width:20px;height:20px;display:inline-grid;place-items:center;background:#ef4444;border-radius:9999px">☕</span>\n          </div>');
                const customIcon = L.divIcon({
                    html: iconHtml,
                    className: "",
                    iconSize: [
                        40,
                        24
                    ],
                    iconAnchor: [
                        20,
                        12
                    ]
                });
                const m = L.marker([
                    p.latitude,
                    p.longitude
                ], {
                    icon: customIcon
                });
                m.addTo(mapRef.current);
                m.bindPopup("<strong>".concat(p.name, "</strong><br/>").concat(p.category || "").concat(p.price_range ? " • ".concat(p.price_range) : ""));
                window.__resultMarkers.push(m);
            });
        } catch (_) {
            setResults([]);
        } finally{
            setLoadingRecs(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen",
        style: {
            backgroundColor: "#ffffff"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container py-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: geocodeSearch,
                            className: "relative flex-1 flex gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    value: query,
                                    onChange: (e)=>onQueryChange(e.target.value),
                                    onFocus: ()=>suggestions.length && setShowSuggestions(true),
                                    placeholder: "Search a place (restaurant, café, event space)",
                                    className: "h-10 w-full px-3 rounded-md border border-gray-300"
                                }, void 0, false, {
                                    fileName: "[project]/app/map/page.tsx",
                                    lineNumber: 278,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: "h-10 px-4 rounded-md bg-[#8c52ff] text-white",
                                    children: searching ? "Searching…" : "Search"
                                }, void 0, false, {
                                    fileName: "[project]/app/map/page.tsx",
                                    lineNumber: 285,
                                    columnNumber: 13
                                }, this),
                                showSuggestions && suggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute top-11 left-0 right-0 z-10 bg-white border border-gray-200 rounded-md shadow",
                                    children: suggestions.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>{
                                                dropSearchMarker({
                                                    lat: s.lat,
                                                    lng: s.lon
                                                }, "This is where we'll recommend places for your mood".concat(mood ? " (".concat(mood, ")") : "", "."));
                                                setSelectedLatLng([
                                                    s.lat,
                                                    s.lon
                                                ]);
                                                fetchRecommendations([
                                                    s.lat,
                                                    s.lon
                                                ]);
                                                setShowSuggestions(false);
                                            },
                                            className: "block w-full text-left px-3 py-2 hover:bg-gray-50 text-sm",
                                            children: s.display
                                        }, "".concat(s.lat, "-").concat(s.lon, "-").concat(i), false, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 289,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/map/page.tsx",
                                    lineNumber: 287,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/map/page.tsx",
                            lineNumber: 277,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: mood,
                                    onChange: (e)=>setMood(e.target.value),
                                    className: "h-10 px-3 rounded-md border border-gray-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "Mood: Any"
                                        }, void 0, false, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 308,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "chill",
                                            children: "Chill"
                                        }, void 0, false, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 309,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "adventurous",
                                            children: "Adventurous"
                                        }, void 0, false, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 310,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "romantic",
                                            children: "Romantic"
                                        }, void 0, false, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 311,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "social",
                                            children: "Social"
                                        }, void 0, false, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 312,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/map/page.tsx",
                                    lineNumber: 307,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: locateUser,
                                    disabled: loadingLoc,
                                    className: "h-10 px-4 rounded-md border border-gray-300",
                                    children: loadingLoc ? "Locating…" : "Use my location"
                                }, void 0, false, {
                                    fileName: "[project]/app/map/page.tsx",
                                    lineNumber: 314,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/map/page.tsx",
                            lineNumber: 306,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/map/page.tsx",
                    lineNumber: 276,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: mapEl,
                    style: {
                        width: "100%",
                        height: "60vh",
                        borderRadius: 12,
                        overflow: "hidden",
                        border: "1px solid #e5e7eb"
                    }
                }, void 0, false, {
                    fileName: "[project]/app/map/page.tsx",
                    lineNumber: 317,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-semibold mb-2",
                            children: [
                                "Recommendations ",
                                loadingRecs ? "(loading…)" : ""
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/map/page.tsx",
                            lineNumber: 320,
                            columnNumber: 11
                        }, this),
                        results.length === 0 && !loadingRecs && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm text-gray-600",
                            children: "Search a place or click the map to see nearby restaurants, cafes, and events."
                        }, void 0, false, {
                            fileName: "[project]/app/map/page.tsx",
                            lineNumber: 322,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid md:grid-cols-2 gap-3",
                            children: results.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-md border border-gray-200 p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-medium",
                                            children: r.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 327,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-600",
                                            children: [
                                                r.category || "",
                                                r.price_range ? " • ".concat(r.price_range) : ""
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 328,
                                            columnNumber: 17
                                        }, this),
                                        typeof r.rating === "number" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm",
                                            children: [
                                                "Rating: ",
                                                r.rating
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 330,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, r.id, true, {
                                    fileName: "[project]/app/map/page.tsx",
                                    lineNumber: 326,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/map/page.tsx",
                            lineNumber: 324,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/map/page.tsx",
                    lineNumber: 319,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/map/page.tsx",
            lineNumber: 275,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/map/page.tsx",
        lineNumber: 274,
        columnNumber: 5
    }, this);
}
_s(MapPage, "jPSiaKqiSLRAOQvyZKdkg8E7dt0=");
_c = MapPage;
var _c;
__turbopack_context__.k.register(_c, "MapPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_map_page_tsx_195568f7._.js.map