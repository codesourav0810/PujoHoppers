import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Route as RouteIcon,
  Trash2,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Navigation,
  Plus,
  Loader2,
  Clock,
  Timer,
} from "lucide-react";
import { useRoute } from "../context/RouteContext";
import { pandals } from "../data/pandals";
import MapView from "../components/MapView";
import { buildNearestNeighborRoute, formatDuration } from "../utils/distance";
import { detectUserLocation, SILIGURI_DEFAULT } from "../utils/geolocation";

const PRESET_TRAILS = [
  {
    name: "Central Heritage Walk",
    pandalNames: [
      "Abahani Chakra Sports & Cultural Club",
      "Agragami Sangha",
      "Agrani Sangha",
      "Amtala Yuba Samity",
    ],
  },
  {
    name: "Sevoke Road Night Lights",
    pandalNames: [
      "Arunoday Sangha",
      "Bidhan Market Byabsayee Samity",
      "Central Colony Durga Puja",
      "College Para Club",
    ],
  },
  {
    name: "South Siliguri Grand Trail",
    pandalNames: [
      "Aurobinda Inter Union",
      "Babupara Sarbojanin",
      "Baghajatin Athletic Club",
      "Bandhab Samity",
    ],
  },
];

export default function RoutePlanner() {
  const {
    route,
    stats,
    removeFromRoute,
    moveUp,
    moveDown,
    clearRoute,
    loadCuratedTrail,
  } = useRoute();

  const [isLocatingTop20, setIsLocatingTop20] = useState(false);
  const [top20UserLocation, setTop20UserLocation] = useState(null);

  // Build the map polyline — if we have a user location (top-20 trail), prepend it
  // so the blue line starts from the user's own pin
  const routePolyline = useMemo(() => {
    const stops = route
      .filter((p) => p.latitude && p.longitude)
      .map((p) => [p.latitude, p.longitude]);

    if (top20UserLocation && stops.length > 0) {
      return [[top20UserLocation.lat, top20UserLocation.lng], ...stops];
    }
    return stops;
  }, [route, top20UserLocation]);


  const mapCenter = useMemo(() => {
    // When top-20 trail active, centre on user's location
    if (top20UserLocation) return [top20UserLocation.lat, top20UserLocation.lng];
    if (route.length > 0 && route[0].latitude && route[0].longitude) {
      return [route[0].latitude, route[0].longitude];
    }
    return [26.715, 88.423];
  }, [route, top20UserLocation]);


  const googleMapsUrl = useMemo(() => {
    if (route.length === 0) return "#";
    if (route.length === 1) {
      return (
        route[0].google_maps_direction ||
        `https://www.google.com/maps/dir/?api=1&destination=${route[0].latitude},${route[0].longitude}`
      );
    }

    const origin = `${route[0].latitude},${route[0].longitude}`;
    const destination = `${route[route.length - 1].latitude},${route[route.length - 1].longitude}`;
    const waypoints = route
      .slice(1, -1)
      .map((p) => `${p.latitude},${p.longitude}`)
      .join("|");

    let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
    if (waypoints) {
      url += `&waypoints=${waypoints}`;
    }
    return url;
  }, [route]);

  const handleLoadTrail = (trail) => {
    // When loading a preset trail, also clear the top-20 user location
    setTop20UserLocation(null);
    const matched = trail.pandalNames
      .map((name) => pandals.find((p) => p.pandal_name.toLowerCase().includes(name.toLowerCase())))
      .filter(Boolean);
    loadCuratedTrail(matched, trail.name);
  };

  // Wraps clearRoute to also reset user location marker
  const handleClearRoute = () => {
    clearRoute();
    setTop20UserLocation(null);
  };


  const handleLoadTop20 = async () => {
    setIsLocatingTop20(true);
    // Detect user location (GPS → IP → Siliguri default)
    const loc = await detectUserLocation();
    setIsLocatingTop20(false);

    // Store location so the map can show the user's pin and start the polyline from it
    setTop20UserLocation(loc);

    // Take only the first 20 pandals from siliguri_pandals.json (fixed set by JSON order)
    const first20 = pandals.slice(0, 20);

    // Apply greedy nearest-neighbor TSP:
    // Starting at user position, always move to the closest *unvisited* pandal
    // from the *current* position — prevents backtracking, minimises total travel
    const optimizedRoute = buildNearestNeighborRoute(loc.lat, loc.lng, first20);

    loadCuratedTrail(optimizedRoute, "Top 20 Pandals");
  };

  return (
    <div className="min-h-screen bg-[#FFF4DC] text-[#181313] pt-14 md:pt-16 pb-24 md:pb-16">
      {/* Sleek mobile banner */}
      <section className="bg-[#181313] text-[#FFF4DC] py-5 px-4 sm:px-6 border-b border-[#D4A84F]/20">
        <div className="max-w-5xl mx-auto space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-[2px] uppercase text-[#D4A84F]">
              Route Planner
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#FFF4DC]">
            My Pujo Trail
          </h1>

          <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs font-semibold">
            <span className="px-2.5 py-1 rounded-lg bg-[#5A0909] text-[#FFF4DC] border border-[#D4A84F]/30 flex items-center gap-1.5">
              <RouteIcon size={13} className="text-[#D4A84F]" />
              <span>{route.length} Stops</span>
            </span>

            <span className="px-2.5 py-1 rounded-lg bg-black/40 text-[#FFF4DC] border border-[#D4A84F]/30 flex items-center gap-1.5">
              <Navigation size={13} className="text-[#D62828]" />
              <span>~{stats.formattedTotalDistance}</span>
            </span>

            {route.length > 0 && (
              <button
                onClick={handleClearRoute}
                className="px-2.5 py-1 rounded-lg bg-red-900/60 text-red-300 border border-red-700/50 hover:bg-red-800/70 flex items-center gap-1.5 transition ml-auto"
              >
                <Trash2 size={11} />
                <span>Clear Route</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-5">
        {route.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-white border border-[#D4A84F]/20 max-w-md mx-auto shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#A50000]/10 text-2xl flex items-center justify-center mx-auto mb-3">
              🪔
            </div>
            <h2 className="font-serif text-lg font-bold text-[#181313]">Your Route is Empty</h2>
            <p className="text-xs text-[#181313]/60 mt-1 max-w-xs mx-auto">
              Add pandals while exploring or load a curated Siliguri trail below!
            </p>

            <Link
              to="/explore"
              className="mt-4 inline-block px-5 py-2 rounded-full bg-[#D62828] text-white text-xs font-bold shadow-xs active:scale-95"
            >
              Explore 62 Pandals
            </Link>

            <div className="mt-6 pt-4 border-t border-[#D4A84F]/20 text-left">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#5A0909] mb-2 text-center">
                Load a Curated Siliguri Trail:
              </p>
              <div className="space-y-2">
                {/* Highlighted Top 20 option */}
                <button
                  onClick={handleLoadTop20}
                  disabled={isLocatingTop20}
                  className="w-full p-3 rounded-xl bg-gradient-to-r from-[#5A0909] to-[#A50000] border border-[#D4A84F]/60 text-left flex items-center justify-between text-xs transition active:scale-98 shadow-md disabled:opacity-70 disabled:cursor-wait"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{isLocatingTop20 ? "" : "⭐"}</span>
                    <div>
                      <span className="font-bold text-[#FFF4DC] flex items-center gap-1.5">
                        {isLocatingTop20 && <Loader2 size={12} className="animate-spin text-[#D4A84F]" />}
                        {isLocatingTop20 ? "Getting your location..." : "Visit Top 20 Pandals"}
                      </span>
                      <span className="text-[10px] text-[#D4A84F]">
                        {isLocatingTop20 ? "Sorting by your distance…" : "from your location • 20 stops"}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#D4A84F] shrink-0">
                    {isLocatingTop20 ? "…" : "Load Trail →"}
                  </span>
                </button>

                {PRESET_TRAILS.map((trail) => (
                  <button
                    key={trail.name}
                    onClick={() => handleLoadTrail(trail)}
                    className="w-full p-2.5 rounded-xl bg-[#FFF4DC]/60 hover:bg-[#FFF4DC] border border-[#D4A84F]/30 text-left flex items-center justify-between text-xs transition active:scale-98"
                  >
                    <span className="font-semibold text-[#5A0909]">{trail.name}</span>
                    <span className="text-[10px] font-bold text-[#A50000]">Load Trail →</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Stops List */}
            <div className="lg:col-span-5 space-y-3">
              {/* Route Summary Card: Total distance & estimated time */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#181313] to-[#2E0B0B] text-[#FFF4DC] border border-[#D4A84F]/40 shadow-md">
                <div className="flex items-center justify-between pb-2.5 border-b border-[#D4A84F]/20">
                  <span className="text-[10px] font-bold tracking-[1.5px] uppercase text-[#D4A84F]">
                    Route Summary
                  </span>
                  <span className="text-[11px] font-semibold text-[#FFF4DC]/80">
                    {route.length} Pandals Selected
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#A50000]/40 border border-[#D62828]/50 flex items-center justify-center shrink-0">
                      <RouteIcon size={16} className="text-[#E8C878]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/60">Total Distance</p>
                      <p className="font-serif text-sm font-bold text-[#FFF4DC]">
                        {stats.formattedTotalDistance || "0 km"}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#D4A84F]/20 border border-[#D4A84F]/40 flex items-center justify-center shrink-0">
                      <Clock size={16} className="text-[#D4A84F]" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/60">Estimated Time (Bike)</p>
                      <p className="font-serif text-sm font-bold text-[#FFF4DC]">
                        {formatDuration(stats.estimatedTimeMinutes)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-[#FFF4DC]/70">
                  <span>🏍️ Two-Wheeler transit: ~{stats.bikeTravelMinutes || Math.round((stats.totalDistanceKm || 0) * 3.5)} mins</span>
                  <span>🪔 Darshan: ~{route.length * 12} mins</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-[#D4A84F]/25 shadow-2xs flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#181313]">Stop Order</h3>
                  <p className="text-[10px] text-[#181313]/60">Reorder with arrows</p>
                </div>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#D62828] text-white text-xs font-bold shadow-xs active:scale-95"
                >
                  <Navigation size={12} />
                  <span>Open Route</span>
                  <ExternalLink size={11} />
                </a>
              </div>

              {/* Stop Cards */}
              <div className="space-y-2">
                {route.map((pandal, idx) => {
                  const leg = stats.legs[idx];
                  return (
                    <div key={pandal.id} className="space-y-1">
                      <div className="p-3 rounded-xl bg-white border border-[#D4A84F]/25 shadow-2xs flex items-center justify-between gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-[#5A0909] text-[#FFF4DC] font-bold text-[11px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </div>

                        <div className="min-w-0 flex-1">
                          <Link
                            to={`/pandal/${pandal.id}`}
                            className="font-serif text-xs sm:text-sm font-bold text-[#181313] hover:text-[#A50000] block truncate"
                          >
                            {pandal.pandal_name}
                          </Link>
                          <p className="text-[10px] text-[#181313]/60 truncate">
                            {pandal.area} • {pandal.category}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => moveUp(idx)}
                            disabled={idx === 0}
                            aria-label="Move up"
                            className="w-6 h-6 rounded-md bg-gray-100 text-gray-700 flex items-center justify-center disabled:opacity-30"
                          >
                            <ArrowUp size={12} />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveDown(idx)}
                            disabled={idx === route.length - 1}
                            aria-label="Move down"
                            className="w-6 h-6 rounded-md bg-gray-100 text-gray-700 flex items-center justify-center disabled:opacity-30"
                          >
                            <ArrowDown size={12} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromRoute(pandal.id)}
                            aria-label="Remove"
                            className="w-6 h-6 rounded-md bg-red-50 text-red-600 flex items-center justify-center"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>

                      {leg && (
                        <div className="flex items-center justify-center gap-1 text-[10px] font-semibold text-[#5A0909]">
                          <span>↓ {leg.formattedDistance} ({leg.walkingMinutes} min walk)</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <Link
                to="/explore"
                className="w-full py-2.5 rounded-xl border border-dashed border-[#D4A84F] text-[#5A0909] hover:bg-white flex items-center justify-center gap-1.5 text-xs font-bold transition"
              >
                <Plus size={14} />
                <span>Add More Pandals</span>
              </Link>

              <button
                onClick={handleClearRoute}
                className="w-full py-2.5 rounded-xl border border-red-700/40 text-red-600 hover:bg-red-50 flex items-center justify-center gap-1.5 text-xs font-bold transition"
              >
                <Trash2 size={14} />
                <span>Clear Route</span>
              </button>
            </div>

              {/* Map Column */}
              <div className="lg:col-span-7 space-y-3">
                <div className="h-[380px] lg:h-[500px] rounded-2xl overflow-hidden border border-[#D4A84F]/30 shadow-md bg-[#181313]">
                  <MapView
                    pandals={route}
                    center={mapCenter}
                    zoom={top20UserLocation ? 13 : 14}
                    userLocation={top20UserLocation}
                    routePolyline={routePolyline}
                    legBadges={
                      stats.legs
                        ? stats.legs.map((leg) => ({
                            position: [
                              (leg.from.latitude + leg.to.latitude) / 2,
                              (leg.from.longitude + leg.to.longitude) / 2,
                            ],
                            text: leg.formattedDistance,
                          }))
                        : []
                    }
                    numberedMarkers={true}
                    tileTheme="satellite"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          )}
      </main>
    </div>
  );
}
