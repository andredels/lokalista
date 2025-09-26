"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/browserClient";

export default function MapPage() {
  const mapEl = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const searchMarkerRef = useRef<any>(null);
  const initializingRef = useRef<boolean>(false);
  const [query, setQuery] = useState("");
  const [mood, setMood] = useState("");
  const moodRef = useRef<string>("");
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [searching, setSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{ display: string; lat: number; lon: number }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<any>(null);
  const [results, setResults] = useState<Array<any>>([]);
  const [loadingRecs, setLoadingRecs] = useState(false);
  const [selectedLatLng, setSelectedLatLng] = useState<[number, number] | null>(null);

  // Inject Leaflet CSS/JS from CDN to avoid local install
  useEffect(() => {
    moodRef.current = mood;
  }, [mood]);

  // Initialize Leaflet map once. Guard against double init in React StrictMode.
  useEffect(() => {
    const ensureAssets = async () => {
      if (!document.querySelector('link[data-leaflet-css="true"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        link.setAttribute("data-leaflet-css", "true");
        document.head.appendChild(link);
      }
      if (!(window as any).L) {
        await new Promise<void>((resolve) => {
          const script = document.createElement("script");
          script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
          script.async = true;
          script.onload = () => resolve();
          document.body.appendChild(script);
        });
      }
    };

    const init = async () => {
      if (initializingRef.current || mapRef.current) return;
      initializingRef.current = true;
      await ensureAssets();
      const L = (window as any).L;
      if (!mapEl.current) return;

      // Default to Manila center if geolocation unavailable
      const defaultCenter: [number, number] = [14.5995, 120.9842];
      mapRef.current = L.map(mapEl.current, {
        center: defaultCenter,
        zoom: 13,
      });

      // Clean light basemap without POI labels (no dark mode)
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors, &copy; CARTO',
      }).addTo(mapRef.current);

      // Ask for geolocation and center
      locateUser();

      // Click to set selection marker and popup placeholder
      mapRef.current.on("click", (e: any) => {
        const latlng = e.latlng;
        const currentMood = moodRef.current;
        dropSearchMarker(latlng, `This is where we'll recommend places for your mood${currentMood ? ` (${currentMood})` : ""}.`);
        setSelectedLatLng([latlng.lat, latlng.lng]);
        fetchRecommendations([latlng.lat, latlng.lng]);
      });
      initializingRef.current = false;
    };

    init();

    return () => {
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
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        });
      });
      const latlng: [number, number] = [pos.coords.latitude, pos.coords.longitude];
      const L = (window as any).L;
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng(latlng);
      } else {
        const youIcon = L.divIcon({
          html: '<div style="background:#2563eb;color:#fff;border-radius:9999px;padding:6px 10px;box-shadow:0 2px 6px rgba(0,0,0,.25)">You</div>',
          className: '', iconSize: [36, 24], iconAnchor: [18, 12]
        });
        userMarkerRef.current = L.marker(latlng, { icon: youIcon });
        userMarkerRef.current.addTo(mapRef.current);
      }
      mapRef.current.setView(latlng, 15);
      userMarkerRef.current.bindPopup("You are here").openPopup();
      // Auto-load nearby venues around current location
      setSelectedLatLng(latlng);
      fetchRecommendations(latlng);
    } catch (_) {
      // ignore; user may deny permission
    } finally {
      setLoadingLoc(false);
    }
  }

  function dropSearchMarker(latlng: { lat: number; lng: number } | [number, number], popupText?: string) {
    const L = (window as any).L;
    const ll = Array.isArray(latlng) ? latlng : [latlng.lat, latlng.lng];
    if (searchMarkerRef.current) {
      searchMarkerRef.current.setLatLng(ll);
    } else {
      searchMarkerRef.current = L.marker(ll);
      searchMarkerRef.current.addTo(mapRef.current);
    }
    if (popupText) searchMarkerRef.current.bindPopup(popupText).openPopup();
    mapRef.current.setView(ll, 16);
  }

  async function geocodeSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setSearching(true);
    try {
      // Restrict to Philippines results where possible
      const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=ph&limit=5&q=${encodeURIComponent(query)}`;
      const res = await fetch(url, { headers: { "Accept-Language": "en" } });
      const data = await res.json();
      if (data && data.length > 0) {
        const best = data[0];
        const lat = parseFloat(best.lat);
        const lon = parseFloat(best.lon);
        dropSearchMarker({ lat, lng: lon }, `This is where we'll recommend places for your mood${mood ? ` (${mood})` : ""}.`);
        setSelectedLatLng([lat, lon]);
        fetchRecommendations([lat, lon]);
        setSuggestions(
          data.map((d: any) => ({ display: d.display_name, lat: parseFloat(d.lat), lon: parseFloat(d.lon) }))
        );
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
        alert("No results found.");
      }
    } finally {
      setSearching(false);
    }
  }

  // Live suggestions with debounce on input change
  function onQueryChange(v: string) {
    setQuery(v);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!v.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=ph&limit=5&q=${encodeURIComponent(v)}`;
        const res = await fetch(url, { headers: { "Accept-Language": "en" } });
        const data = await res.json();
        setSuggestions((data || []).map((d: any) => ({ display: d.display_name, lat: parseFloat(d.lat), lon: parseFloat(d.lon) })));
        setShowSuggestions(true);
      } catch {
        // ignore
      }
    }, 400);
  }

  async function fetchRecommendations(centerLatLng: [number, number]) {
    setLoadingRecs(true);
    try {
      const [lat, lon] = centerLatLng;
      // Define a rough bounding box around the point (~15km) for better coverage
      const delta = 0.15;
      const minLat = lat - delta;
      const maxLat = lat + delta;
      const minLon = lon - delta;
      const maxLon = lon + delta;

      const supabase = createClient();

      // Optional mood filter - matches category or name for demo
      let queryBuilder = supabase
        .from("places")
        .select("id,name,description,latitude,longitude,category,price_range,rating,image_url")
        .gte("latitude", minLat)
        .lte("latitude", maxLat)
        .gte("longitude", minLon)
        .lte("longitude", maxLon)
        .limit(50);

      if (mood) {
        // naive filter: category ilike mood OR name/description contains mood
        queryBuilder = queryBuilder.or(
          `category.ilike.%${mood}%,name.ilike.%${mood}%,description.ilike.%${mood}%`
        );
      }

      const { data, error } = await queryBuilder;
      if (error) throw error;
      // filter to relevant venue types, but if filtering yields nothing, fall back to raw results
      const allowed = ["restaurant","restaurants","cafe","coffee","event","events","bar","food","eatery"]; 
      let filtered = (data || []).filter((p: any) => {
        const cat = (p.category || "").toLowerCase();
        const name = (p.name || "").toLowerCase();
        const desc = (p.description || "").toLowerCase();
        const categoryMatch = allowed.some((a) => cat.includes(a));
        const moodMatch = !mood || cat.includes(mood.toLowerCase()) || name.includes(mood.toLowerCase()) || desc.includes(mood.toLowerCase());
        return categoryMatch && moodMatch;
      });
      if (filtered.length === 0) filtered = data || [];
      setResults(filtered);

      // Plot markers
      const L = (window as any).L;
      // Remove old search marker popup text and re-add
      if (searchMarkerRef.current) {
        searchMarkerRef.current.bindPopup(`Found ${filtered.length} places${mood ? ` for "${mood}"` : ""} near here.`);
      }

      // Remove previous result markers
      if (!(window as any).__resultMarkers) (window as any).__resultMarkers = [];
      ((window as any).__resultMarkers as any[]).forEach((m) => { try { m.remove(); } catch {} });
      (window as any).__resultMarkers = [];

      // Add individual markers
      filtered.forEach((p: any) => {
        if (typeof p.latitude !== "number" || typeof p.longitude !== "number") return;
        const iconHtml = `
          <div style="display:flex;align-items:center;gap:4px;background:#1f2937;color:#fff;border-radius:9999px;padding:4px 8px;box-shadow:0 2px 6px rgba(0,0,0,.25)">
            <span style="font-size:12px">${typeof p.rating === "number" ? p.rating.toFixed(1) : ""}</span>
            <span style="width:20px;height:20px;display:inline-grid;place-items:center;background:#ef4444;border-radius:9999px">☕</span>
          </div>`;
        const customIcon = L.divIcon({ html: iconHtml, className: "", iconSize: [40, 24], iconAnchor: [20, 12] });
        const m = L.marker([p.latitude, p.longitude], { icon: customIcon });
        m.addTo(mapRef.current);
        m.bindPopup(`<strong>${p.name}</strong><br/>${p.category || ""}${p.price_range ? ` • ${p.price_range}` : ""}`);
        (window as any).__resultMarkers.push(m);
      });
    } catch (_) {
      setResults([]);
    } finally {
      setLoadingRecs(false);
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#ffffff" }}>
      <div className="container py-4">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <form onSubmit={geocodeSearch} className="relative flex-1 flex gap-2">
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onFocus={() => suggestions.length && setShowSuggestions(true)}
              placeholder="Search a place (restaurant, café, event space)"
              className="h-10 w-full px-3 rounded-md border border-gray-300"
            />
            <button type="submit" className="h-10 px-4 rounded-md bg-[#8c52ff] text-white">{searching ? "Searching…" : "Search"}</button>
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-11 left-0 right-0 z-10 bg-white border border-gray-200 rounded-md shadow">
                {suggestions.map((s, i) => (
                  <button
                    type="button"
                    key={`${s.lat}-${s.lon}-${i}`}
                    onClick={() => {
                      dropSearchMarker({ lat: s.lat, lng: s.lon }, `This is where we'll recommend places for your mood${mood ? ` (${mood})` : ""}.`);
                      setSelectedLatLng([s.lat, s.lon]);
                      fetchRecommendations([s.lat, s.lon]);
                      setShowSuggestions(false);
                    }}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
                  >
                    {s.display}
                  </button>
                ))}
              </div>
            )}
          </form>
          <div className="flex gap-2">
            <select value={mood} onChange={(e) => setMood(e.target.value)} className="h-10 px-3 rounded-md border border-gray-300">
              <option value="">Mood: Any</option>
              <option value="chill">Chill</option>
              <option value="adventurous">Adventurous</option>
              <option value="romantic">Romantic</option>
              <option value="social">Social</option>
            </select>
            <button onClick={locateUser} disabled={loadingLoc} className="h-10 px-4 rounded-md border border-gray-300">{loadingLoc ? "Locating…" : "Use my location"}</button>
          </div>
        </div>
        <div ref={mapEl} style={{ width: "100%", height: "60vh", borderRadius: 12, overflow: "hidden", border: "1px solid #e5e7eb" }} />

        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Recommendations {loadingRecs ? "(loading…)" : ""}</h2>
          {results.length === 0 && !loadingRecs && (
            <div className="text-sm text-gray-600">Search a place or click the map to see nearby restaurants, cafes, and events.</div>
          )}
          <div className="grid md:grid-cols-2 gap-3">
            {results.map((r: any) => (
              <div key={r.id} className="rounded-md border border-gray-200 p-3">
                <div className="font-medium">{r.name}</div>
                <div className="text-sm text-gray-600">{r.category || ""}{r.price_range ? ` • ${r.price_range}` : ""}</div>
                {typeof r.rating === "number" && (
                  <div className="text-sm">Rating: {r.rating}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


