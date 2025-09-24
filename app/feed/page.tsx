"use client";

import { useEffect, useRef, useState } from "react";

// Using CDN MapLibre to avoid local install issues
// eslint-disable-next-line @next/next/no-sync-scripts
// Note: Next.js app router pages can include external CSS via link tag in Head-like usage,
// but inside client components we'll imperatively inject if missing.

export default function FeedMapPage() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const [locating, setLocating] = useState(false);
  const [mood, setMood] = useState<string>("");
  const [selectedCoords, setSelectedCoords] = useState<[number, number] | null>(null);
  const [styleName, setStyleName] = useState<"streets" | "satellite">("streets");

  useEffect(() => {
    // Inject MapLibre CSS once
    const existing = document.querySelector(
      'link[data-maplibre-css="true"]'
    ) as HTMLLinkElement | null;
    if (!existing) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.css";
      link.setAttribute("data-maplibre-css", "true");
      document.head.appendChild(link);
    }

    // Load script if not present
    const hasScript = !!(window as any).maplibregl;
    let removed = false;
    const ensure = async () => {
      if (!hasScript) {
        await new Promise<void>((resolve) => {
          const script = document.createElement("script");
          script.src = "https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.js";
          script.async = true;
          script.onload = () => resolve();
          document.body.appendChild(script);
          // Cleanup marker
          (script as any)._addedByUs = true;
        });
      }

      const maplibregl = (window as any).maplibregl;
      if (!mapContainerRef.current || !maplibregl) return;

      // Philippines bounding box (approx): [minLng, minLat, maxLng, maxLat]
      const philippinesBounds: [number, number, number, number] = [
        116.0, // West of Palawan
        4.5,   // South of Mindanao
        127.0, // East of PH
        21.5   // North of Luzon
      ];

      // Initial center roughly near Manila
      const initialCenter: [number, number] = [121.0, 14.6];

      // Create map (start with a realistic streets style; satellite available via toggle)
      const MAPTILER_KEY = "get_your_own_OpIi9ZULNHzrESv6T2vL"; // demo key
      const styles = {
        streets: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`,
        satellite: `https://api.maptiler.com/maps/hybrid/style.json?key=${MAPTILER_KEY}`,
      } as const;

      mapRef.current = new maplibregl.Map({
        container: mapContainerRef.current,
        style: styles[styleName] || "https://demotiles.maplibre.org/style.json",
        center: initialCenter,
        zoom: 5.5,
        maxBounds: philippinesBounds,
        attributionControl: true,
      });

      mapRef.current.addControl(new maplibregl.NavigationControl({ showZoom: true }));
      mapRef.current.fitBounds(philippinesBounds, { padding: 40, duration: 0 });

      // Add a marker at Manila as a starting point
      new maplibregl.Marker().setLngLat([120.9842, 14.5995]).addTo(mapRef.current);

      // Allow choosing a location by clicking (kept within PH bounds)
      mapRef.current.on("click", (e: any) => {
        const lng = e.lngLat.lng as number;
        const lat = e.lngLat.lat as number;
        if (!isWithinPhilippines(lng, lat)) return;
        setSelectedCoords([lng, lat]);
        const gl = (window as any).maplibregl;
        if (userMarkerRef.current) {
          userMarkerRef.current.setLngLat([lng, lat]);
        } else {
          userMarkerRef.current = new gl.Marker({ color: "#ef4444" })
            .setLngLat([lng, lat])
            .addTo(mapRef.current);
        }
      });

      // Attach helpers on window for later access
      (window as any).__philippinesBounds = philippinesBounds;
    };

    ensure();

    return () => {
      // Cleanup map instance
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      // Do not remove CSS; keep for SPA navigation
      // Remove script only if we added it (optional)
      const scripts = Array.from(document.querySelectorAll("script")) as any[];
      const ours = scripts.find((s) => s._addedByUs);
      if (ours && removed) {
        ours.parentNode?.removeChild(ours);
      }
    };
  }, []);

  function isWithinPhilippines(lng: number, lat: number) {
    const b = (window as any).__philippinesBounds as
      | [number, number, number, number]
      | undefined;
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
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          maximumAge: 10000,
          timeout: 15000,
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
      const maplibregl = (window as any).maplibregl;
      if (userMarkerRef.current) {
        userMarkerRef.current.setLngLat([lng, lat]);
      } else {
        userMarkerRef.current = new maplibregl.Marker({ color: "#8c52ff" })
          .setLngLat([lng, lat])
          .addTo(mapRef.current);
      }

      // Center and zoom in
      mapRef.current.easeTo({ center: [lng, lat], zoom: 13, duration: 800 });
      setSelectedCoords([lng, lat]);
    } catch (err: any) {
      alert(err?.message || "Unable to get your location.");
    } finally {
      setLocating(false);
    }
  }

  function switchStyle(name: "streets" | "satellite") {
    if (!mapRef.current || styleName === name) return;
    const MAPTILER_KEY = "get_your_own_OpIi9ZULNHzrESv6T2vL"; // demo key
    const styles = {
      streets: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`,
      satellite: `https://api.maptiler.com/maps/hybrid/style.json?key=${MAPTILER_KEY}`,
    } as const;
    const center = mapRef.current.getCenter();
    const zoom = mapRef.current.getZoom();
    setStyleName(name);
    mapRef.current.setStyle(styles[name], { diff: true });
    mapRef.current.once("styledata", () => {
      mapRef.current.setCenter(center);
      mapRef.current.setZoom(zoom);
      const b = (window as any).__philippinesBounds;
      if (b) mapRef.current.setMaxBounds(b);
      const gl = (window as any).maplibregl;
      if (selectedCoords) {
        if (userMarkerRef.current) userMarkerRef.current.remove();
        userMarkerRef.current = new gl.Marker({ color: "#ef4444" })
          .setLngLat(selectedCoords)
          .addTo(mapRef.current);
      }
    });
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#ffffff" }}>
      <div className="container py-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Philippines Map</h1>
            <p className="text-sm text-gray-600">Explore places limited to the Philippines.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-md p-1">
              <button onClick={() => switchStyle("streets")} className={`h-8 px-3 rounded ${styleName === "streets" ? "bg-gray-200" : ""}`}>Streets</button>
              <button onClick={() => switchStyle("satellite")} className={`h-8 px-3 rounded ${styleName === "satellite" ? "bg-gray-200" : ""}`}>Satellite</button>
            </div>
            <select
              aria-label="Select mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="h-10 px-3 rounded-md border border-gray-300"
            >
              <option value="">Mood: Any</option>
              <option value="chill">Chill</option>
              <option value="adventurous">Adventurous</option>
              <option value="romantic">Romantic</option>
              <option value="social">Social</option>
            </select>
            <button
              onClick={findMyLocation}
              disabled={locating}
              className="h-10 px-4 rounded-md bg-[#8c52ff] text-white hover:opacity-90 disabled:opacity-60"
            >
              {locating ? "Locating…" : "Use my location"}
            </button>
          </div>
        </div>
        {selectedCoords && (
          <div className="mb-3 text-sm text-gray-700">
            Selected location: {selectedCoords[1].toFixed(5)}, {selectedCoords[0].toFixed(5)}
          </div>
        )}
        <div
          ref={mapContainerRef}
          style={{ width: "100%", height: "70vh", borderRadius: 12, overflow: "hidden", border: "1px solid #e5e7eb" }}
        />
      </div>
    </div>
  );
}


