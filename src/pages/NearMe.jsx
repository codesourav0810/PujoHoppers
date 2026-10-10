import React, { useState, useEffect, useMemo } from "react";
import { Navigation, Search, MapPin, X, Sparkles, Layers } from "lucide-react";
import { pandals } from "../data/pandals";
import { getPandalsSortedByDistance, formatDistance } from "../utils/distance";
import { detectUserLocation, SILIGURI_DEFAULT } from "../utils/geolocation";
import PandalCard from "../components/PandalCard";
import MapView from "../components/MapView";

const POPULAR_HUBS = [
  { name: "Airview More", lat: 26.7153, lng: 88.4239 },
  { name: "Sevoke Road", lat: 26.7301, lng: 88.4355 },
  { name: "Bidhan Market", lat: 26.7118, lng: 88.4282 },
  { name: "Siliguri Junction", lat: 26.7275, lng: 88.4067 },
  { name: "Ashrampara", lat: 26.7205, lng: 88.4312 },
  { name: "Hakimpara", lat: 26.7161, lng: 88.4278 },
];

export default function NearMe() {
  const [userLocation, setUserLocation] = useState(SILIGURI_DEFAULT);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [locationMessage, setLocationMessage] = useState("Siliguri Central");
  const [gpsSuccess, setGpsSuccess] = useState(false);
  const [locationSource, setLocationSource] = useState("default");
  const [activeTab, setActiveTab] = useState("list"); // "list" or "map"
  const [tileTheme, setTileTheme] = useState("satellite"); // Default Satellite view

  // On mount, auto-detect location gently in background
  useEffect(() => {
    detectUserLocation((msg) => setLocationMessage(msg)).then((loc) => {
      setUserLocation(loc);
      setLocationSource(loc.source);
      if (loc.source === "gps") {
        setGpsSuccess(true);
        const accuracy = loc.accuracy ? ` (±${Math.round(loc.accuracy)}m)` : "";
        setLocationMessage(`GPS Active: ${loc.lat.toFixed(4)}°, ${loc.lng.toFixed(4)}°${accuracy}`);
      } else if (loc.source === "ip") {
        setGpsSuccess(false);
        setLocationMessage(`${loc.name} (IP-based, ~50km accuracy)`);
      } else {
        setGpsSuccess(false);
        setLocationMessage(loc.name);
      }
    });
  }, []);

  // Geolocation handler with GPS + IP fallback
  const handleGetGpsLocation = async () => {
    setIsLocating(true);
    setLocationMessage("Locating...");
    const loc = await detectUserLocation((msg) => setLocationMessage(msg));
    setUserLocation(loc);
    setLocationSource(loc.source);
    setIsLocating(false);
    if (loc.source === "gps") {
      setGpsSuccess(true);
      const accuracy = loc.accuracy ? ` (±${Math.round(loc.accuracy)}m)` : "";
      setLocationMessage(`GPS Active: ${loc.lat.toFixed(4)}°, ${loc.lng.toFixed(4)}°${accuracy}`);
    } else if (loc.source === "ip") {
      setGpsSuccess(false);
      setLocationMessage(`${loc.name} (IP-based, ~50km accuracy)`);
    } else {
      setGpsSuccess(false);
      setLocationMessage(loc.name);
    }
  };

  const handleSelectHub = (hub) => {
    setUserLocation({
      lat: hub.lat,
      lng: hub.lng,
      source: "hub",
      name: hub.name,
    });
    setGpsSuccess(false);
    setLocationMessage(hub.name);
  };

  // Sort pandals from current location
  const allSortedPandals = useMemo(() => {
    return getPandalsSortedByDistance(pandals, userLocation.lat, userLocation.lng);
  }, [userLocation]);

  // Filter sorted pandals by search query if user searches, strictly limited to 10 closest
  const filteredPandals = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) {
      // Top 10 closest pandals to user's location
      return allSortedPandals.slice(0, 10);
    }
    return allSortedPandals
      .filter((p) => {
        return (
          p.pandal_name.toLowerCase().includes(q) ||
          p.area.toLowerCase().includes(q) ||
          p.zone.toLowerCase().includes(q) ||
          (p.theme || "").toLowerCase().includes(q)
        );
      })
      .slice(0, 10);
  }, [allSortedPandals, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FFF4DC] text-[#181313] pt-14 md:pt-16 pb-24 md:pb-16">
      {/* Mobile-centric header */}
      <section className="bg-[#181313] text-[#FFF4DC] py-4 px-4 sm:px-6 border-b border-[#D4A84F]/20">
        <div className="max-w-5xl mx-auto space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-[2px] uppercase text-[#D4A84F]">
              Nearby Pandals
            </span>
            <span className="text-[10px] text-white/60">Live Distance</span>
          </div>

          <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#FFF4DC]">
            Pandals Near Me
          </h1>

          {/* GPS Button + Hub Pills */}
          <div className="pt-1.5 flex flex-wrap items-center gap-1.5">
            <button
              onClick={handleGetGpsLocation}
              disabled={isLocating}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-xs active:scale-95 transition ${
                locationSource === "gps"
                  ? "bg-emerald-700 text-white border border-emerald-500"
                  : locationSource === "ip"
                  ? "bg-blue-700 text-white border border-blue-500"
                  : "bg-[#1A73E8] hover:bg-[#1557B0] text-white"
              }`}
            >
              <Navigation
                size={12}
                className={isLocating ? "animate-spin" : locationSource === "gps" ? "text-emerald-200" : locationSource === "ip" ? "text-blue-200" : ""}
              />
              <span>{isLocating ? "Locating..." : locationSource === "gps" ? "GPS Active" : locationSource === "ip" ? "IP Location" : "Use Current Location"}</span>
            </button>

            {/* Location source badge */}
            {locationSource !== "default" && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                locationSource === "gps"
                  ? "bg-emerald-700/20 text-emerald-400 border border-emerald-500/50"
                  : "bg-blue-700/20 text-blue-400 border border-blue-500/50"
              }`}>
                {locationSource === "gps" ? "📍 GPS" : "🌐 IP"}
              </span>
            )}

            {/* Quick Hub Switchers */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
              {POPULAR_HUBS.map((hub) => (
                <button
                  key={hub.name}
                  onClick={() => handleSelectHub(hub)}
                  className={`px-2 py-0.5 rounded-full text-[10px] whitespace-nowrap transition active:scale-95 ${
                    userLocation.name === hub.name
                      ? "bg-[#5A0909] text-[#FFF4DC] border border-[#D4A84F] font-bold"
                      : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/10"
                  }`}
                >
                  {hub.name}
                </button>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-[#D4A84F] font-medium truncate pt-0.5">
            📍 {locationMessage}
            {locationSource === "gps" && userLocation.accuracy && (
              <span className="ml-2 text-[9px] text-white/60">Accuracy: ±{Math.round(userLocation.accuracy)}m</span>
            )}
          </p>
        </div>
      </section>

      {/* Sticky Search & View Switcher */}
      <section className="sticky top-14 md:top-16 z-30 bg-[#FFF4DC]/95 backdrop-blur-md border-b border-[#D4A84F]/20 py-2 px-4 sm:px-6 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
          {/* Live Search Bar */}
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A0909]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search nearest pandals (Sevoke, Agrani...)"
              className="w-full h-9 pl-8 pr-7 rounded-xl bg-white border border-[#D4A84F]/40 text-xs sm:text-sm text-[#181313] placeholder-[#181313]/50 focus:outline-none focus:border-[#A50000] shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* List / Map view toggle */}
          <div className="flex items-center rounded-lg bg-white border border-[#D4A84F]/40 p-0.5">
            <button
              onClick={() => setActiveTab("list")}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                activeTab === "list" ? "bg-[#5A0909] text-[#FFF4DC]" : "text-[#181313]/70"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setActiveTab("map")}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                activeTab === "map" ? "bg-[#5A0909] text-[#FFF4DC]" : "text-[#181313]/70"
              }`}
            >
              Map
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-1 flex items-center justify-between text-[11px] text-[#181313]/70">
          <span>
            {searchQuery
              ? `Found ${filteredPandals.length} closest pandals matching search`
              : `Showing 10 closest pandals to your location`}
          </span>
          <span className="font-semibold text-[#A50000]">
            Closest: {allSortedPandals[0]?.formattedDistance || "0 km"}
          </span>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-3">
        {activeTab === "map" ? (
          <div className="h-[440px] sm:h-[540px] w-full rounded-2xl overflow-hidden border border-[#D4A84F]/30 shadow-md bg-[#181313]">
            <MapView
              pandals={filteredPandals}
              userLocation={userLocation}
              center={[userLocation.lat, userLocation.lng]}
              zoom={14}
              tileTheme={tileTheme}
              className="w-full h-full"
            />
          </div>
        ) : (
          <div>
            {filteredPandals.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-xl bg-white border border-[#D4A84F]/20 max-w-sm mx-auto shadow-xs">
                <p className="font-serif text-sm font-bold text-[#181313]">No matching nearby pandals</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-2 px-3 py-1 rounded-full bg-[#D62828] text-white text-xs font-bold"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredPandals.map((pandal) => (
                  <PandalCard
                    key={pandal.id}
                    pandal={pandal}
                    showDistance={true}
                    distanceText={`${pandal.formattedDistance} (${pandal.walkingMinutes} min)`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
