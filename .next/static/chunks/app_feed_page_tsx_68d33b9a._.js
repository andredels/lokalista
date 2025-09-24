(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/feed/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FeedMapPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function FeedMapPage() {
    _s();
    const mapContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const userMarkerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [locating, setLocating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mood, setMood] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedCoords, setSelectedCoords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [styleName, setStyleName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("streets");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FeedMapPage.useEffect": ()=>{
            // Inject MapLibre CSS once
            const existing = document.querySelector('link[data-maplibre-css="true"]');
            if (!existing) {
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = "https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.css";
                link.setAttribute("data-maplibre-css", "true");
                document.head.appendChild(link);
            }
            // Load script if not present
            const hasScript = !!window.maplibregl;
            let removed = false;
            const ensure = {
                "FeedMapPage.useEffect.ensure": async ()=>{
                    if (!hasScript) {
                        await new Promise({
                            "FeedMapPage.useEffect.ensure": (resolve)=>{
                                const script = document.createElement("script");
                                script.src = "https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.js";
                                script.async = true;
                                script.onload = ({
                                    "FeedMapPage.useEffect.ensure": ()=>resolve()
                                })["FeedMapPage.useEffect.ensure"];
                                document.body.appendChild(script);
                                // Cleanup marker
                                script._addedByUs = true;
                            }
                        }["FeedMapPage.useEffect.ensure"]);
                    }
                    const maplibregl = window.maplibregl;
                    if (!mapContainerRef.current || !maplibregl) return;
                    // Philippines bounding box (approx): [minLng, minLat, maxLng, maxLat]
                    const philippinesBounds = [
                        116.0,
                        4.5,
                        127.0,
                        21.5 // North of Luzon
                    ];
                    // Initial center roughly near Manila
                    const initialCenter = [
                        121.0,
                        14.6
                    ];
                    // Create map (start with a realistic streets style; satellite available via toggle)
                    const MAPTILER_KEY = "get_your_own_OpIi9ZULNHzrESv6T2vL"; // demo key
                    const styles = {
                        streets: "https://api.maptiler.com/maps/streets-v2/style.json?key=".concat(MAPTILER_KEY),
                        satellite: "https://api.maptiler.com/maps/hybrid/style.json?key=".concat(MAPTILER_KEY)
                    };
                    mapRef.current = new maplibregl.Map({
                        container: mapContainerRef.current,
                        style: styles[styleName] || "https://demotiles.maplibre.org/style.json",
                        center: initialCenter,
                        zoom: 5.5,
                        maxBounds: philippinesBounds,
                        attributionControl: true
                    });
                    mapRef.current.addControl(new maplibregl.NavigationControl({
                        showZoom: true
                    }));
                    mapRef.current.fitBounds(philippinesBounds, {
                        padding: 40,
                        duration: 0
                    });
                    // Add a marker at Manila as a starting point
                    new maplibregl.Marker().setLngLat([
                        120.9842,
                        14.5995
                    ]).addTo(mapRef.current);
                    // Allow choosing a location by clicking (kept within PH bounds)
                    mapRef.current.on("click", {
                        "FeedMapPage.useEffect.ensure": (e)=>{
                            const lng = e.lngLat.lng;
                            const lat = e.lngLat.lat;
                            if (!isWithinPhilippines(lng, lat)) return;
                            setSelectedCoords([
                                lng,
                                lat
                            ]);
                            const gl = window.maplibregl;
                            if (userMarkerRef.current) {
                                userMarkerRef.current.setLngLat([
                                    lng,
                                    lat
                                ]);
                            } else {
                                userMarkerRef.current = new gl.Marker({
                                    color: "#ef4444"
                                }).setLngLat([
                                    lng,
                                    lat
                                ]).addTo(mapRef.current);
                            }
                        }
                    }["FeedMapPage.useEffect.ensure"]);
                    // Attach helpers on window for later access
                    window.__philippinesBounds = philippinesBounds;
                }
            }["FeedMapPage.useEffect.ensure"];
            ensure();
            return ({
                "FeedMapPage.useEffect": ()=>{
                    // Cleanup map instance
                    if (mapRef.current) {
                        mapRef.current.remove();
                        mapRef.current = null;
                    }
                    // Do not remove CSS; keep for SPA navigation
                    // Remove script only if we added it (optional)
                    const scripts = Array.from(document.querySelectorAll("script"));
                    const ours = scripts.find({
                        "FeedMapPage.useEffect.ours": (s)=>s._addedByUs
                    }["FeedMapPage.useEffect.ours"]);
                    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                    {
                        var _ours_parentNode;
                    }
                }
            })["FeedMapPage.useEffect"];
        }
    }["FeedMapPage.useEffect"], []);
    function isWithinPhilippines(lng, lat) {
        const b = window.__philippinesBounds;
        if (!b) return false;
        return lng >= b[0] && lng <= b[2] && lat >= b[1] && lat <= b[3];
    }
    async function findMyLocation() {
        if (!mapRef.current) return;
        if (!("geolocation" in navigator)) {
            alert("Geolocation is not supported by this browser.");
            return;
        }
        try {
            setLocating(true);
            const pos = await new Promise((resolve, reject)=>{
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    maximumAge: 10000,
                    timeout: 15000
                });
            });
            const lng = pos.coords.longitude;
            const lat = pos.coords.latitude;
            if (!isWithinPhilippines(lng, lat)) {
                alert("Your location is outside the Philippines. Map remains scoped to PH.");
                setLocating(false);
                return;
            }
            // Drop or move a marker to current position
            const maplibregl = window.maplibregl;
            if (userMarkerRef.current) {
                userMarkerRef.current.setLngLat([
                    lng,
                    lat
                ]);
            } else {
                userMarkerRef.current = new maplibregl.Marker({
                    color: "#8c52ff"
                }).setLngLat([
                    lng,
                    lat
                ]).addTo(mapRef.current);
            }
            // Center and zoom in
            mapRef.current.easeTo({
                center: [
                    lng,
                    lat
                ],
                zoom: 13,
                duration: 800
            });
            setSelectedCoords([
                lng,
                lat
            ]);
        } catch (err) {
            alert((err === null || err === void 0 ? void 0 : err.message) || "Unable to get your location.");
        } finally{
            setLocating(false);
        }
    }
    function switchStyle(name) {
        if (!mapRef.current || styleName === name) return;
        const MAPTILER_KEY = "get_your_own_OpIi9ZULNHzrESv6T2vL"; // demo key
        const styles = {
            streets: "https://api.maptiler.com/maps/streets-v2/style.json?key=".concat(MAPTILER_KEY),
            satellite: "https://api.maptiler.com/maps/hybrid/style.json?key=".concat(MAPTILER_KEY)
        };
        const center = mapRef.current.getCenter();
        const zoom = mapRef.current.getZoom();
        setStyleName(name);
        mapRef.current.setStyle(styles[name], {
            diff: true
        });
        mapRef.current.once("styledata", ()=>{
            mapRef.current.setCenter(center);
            mapRef.current.setZoom(zoom);
            const b = window.__philippinesBounds;
            if (b) mapRef.current.setMaxBounds(b);
            const gl = window.maplibregl;
            if (selectedCoords) {
                if (userMarkerRef.current) userMarkerRef.current.remove();
                userMarkerRef.current = new gl.Marker({
                    color: "#ef4444"
                }).setLngLat(selectedCoords).addTo(mapRef.current);
            }
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen",
        style: {
            backgroundColor: "#ffffff"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container py-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-2xl font-semibold",
                                    children: "Philippines Map"
                                }, void 0, false, {
                                    fileName: "[project]/app/feed/page.tsx",
                                    lineNumber: 206,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-600",
                                    children: "Explore places limited to the Philippines."
                                }, void 0, false, {
                                    fileName: "[project]/app/feed/page.tsx",
                                    lineNumber: 207,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/feed/page.tsx",
                            lineNumber: 205,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3 flex-wrap",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1 bg-white border border-gray-300 rounded-md p-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>switchStyle("streets"),
                                            className: "h-8 px-3 rounded ".concat(styleName === "streets" ? "bg-gray-200" : ""),
                                            children: "Streets"
                                        }, void 0, false, {
                                            fileName: "[project]/app/feed/page.tsx",
                                            lineNumber: 211,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>switchStyle("satellite"),
                                            className: "h-8 px-3 rounded ".concat(styleName === "satellite" ? "bg-gray-200" : ""),
                                            children: "Satellite"
                                        }, void 0, false, {
                                            fileName: "[project]/app/feed/page.tsx",
                                            lineNumber: 212,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/feed/page.tsx",
                                    lineNumber: 210,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    "aria-label": "Select mood",
                                    value: mood,
                                    onChange: (e)=>setMood(e.target.value),
                                    className: "h-10 px-3 rounded-md border border-gray-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "",
                                            children: "Mood: Any"
                                        }, void 0, false, {
                                            fileName: "[project]/app/feed/page.tsx",
                                            lineNumber: 220,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "chill",
                                            children: "Chill"
                                        }, void 0, false, {
                                            fileName: "[project]/app/feed/page.tsx",
                                            lineNumber: 221,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "adventurous",
                                            children: "Adventurous"
                                        }, void 0, false, {
                                            fileName: "[project]/app/feed/page.tsx",
                                            lineNumber: 222,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "romantic",
                                            children: "Romantic"
                                        }, void 0, false, {
                                            fileName: "[project]/app/feed/page.tsx",
                                            lineNumber: 223,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "social",
                                            children: "Social"
                                        }, void 0, false, {
                                            fileName: "[project]/app/feed/page.tsx",
                                            lineNumber: 224,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/feed/page.tsx",
                                    lineNumber: 214,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: findMyLocation,
                                    disabled: locating,
                                    className: "h-10 px-4 rounded-md bg-[#8c52ff] text-white hover:opacity-90 disabled:opacity-60",
                                    children: locating ? "Locating…" : "Use my location"
                                }, void 0, false, {
                                    fileName: "[project]/app/feed/page.tsx",
                                    lineNumber: 226,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/feed/page.tsx",
                            lineNumber: 209,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/feed/page.tsx",
                    lineNumber: 204,
                    columnNumber: 9
                }, this),
                selectedCoords && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-3 text-sm text-gray-700",
                    children: [
                        "Selected location: ",
                        selectedCoords[1].toFixed(5),
                        ", ",
                        selectedCoords[0].toFixed(5)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/feed/page.tsx",
                    lineNumber: 236,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: mapContainerRef,
                    style: {
                        width: "100%",
                        height: "70vh",
                        borderRadius: 12,
                        overflow: "hidden",
                        border: "1px solid #e5e7eb"
                    }
                }, void 0, false, {
                    fileName: "[project]/app/feed/page.tsx",
                    lineNumber: 240,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/feed/page.tsx",
            lineNumber: 203,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/feed/page.tsx",
        lineNumber: 202,
        columnNumber: 5
    }, this);
}
_s(FeedMapPage, "+g/zEi/o+0auKHU6qKIxbOXY094=");
_c = FeedMapPage;
var _c;
__turbopack_context__.k.register(_c, "FeedMapPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_feed_page_tsx_68d33b9a._.js.map