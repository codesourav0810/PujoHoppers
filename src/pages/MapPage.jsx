import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  MapPin,
  Navigation,
  Compass,
  List,
  Map as MapIcon,
  X,
  Sparkles,
  Route as RouteIcon,
  Clock,
  ExternalLink,
  Check,
  Plus,
  Minus,
  Layers,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import MapView from "../components/MapView";
import PandalPreview from "../components/PandalPreview";
import PandalCard from "../components/PandalCard";
import { pandals, ALL_ZONES } from "../data/pandals";
import { buildTop20Circuit, formatDistance, getDistanceKm } from "../utils/distance";
import { detectUserLocation, SILIGURI_DEFAULT } from "../utils/geolocation";
import { useRoute } from "../context/RouteContext";

const POPULAR_HUBS = [
  { name: "Airview More", lat: 26.7153, lng: 88.4239 },
  { name: "Sevoke Road", lat: 26.7301, lng: 88.4355 },
  { name: "Bidhan Market", lat: 26.7118, lng: 88.4282 },
  { name: "Siliguri Junction", lat: 26.7275, lng: 88.4067 },
  { name: "Ashrampara", lat: 26.7205, lng: 88.4312 },
];

export default function MapPage() {
  const { loadCuratedTrail } = useRoute();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState("all");
  const [selectedPandal, setSelectedPandal] = useState(null);
  const [userLocation, setUserLocation] = useState(SILIGURI_DEFAULT);
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState("Siliguri Central");
  const [viewMode, setViewMode] = useState("map"); // "map" or "list"
  const [tileTheme, setTileTheme] = useState("satellite"); // Default: Satellite View

  // Top 20 Circuit mode
  const [top20Active, setTop20Active] = useState(false);
  // Set of selected pandal IDs within Top 20 mode (allows selecting / deselecting)
  const [selectedCircuitIds, setSelectedCircuitIds] = useState(new Set());
  const [circuitPanelExpanded, setCircuitPanelExpanded] = useState(false);
  const [trailSaved, setTrailSaved] = useState(false);

  // Attempt gentle background location on mount
  useEffect(() => {
    detectUserLocation((msg) => setLocationStatus(msg)).then((loc) => {
      setUserLocation(loc);
      if (loc.source === "gps") {
        setLocationStatus("GPS Active");
      } else {
        setLocationStatus(loc.name);
      }
    });
  }, []);

  // Compute Base Top 20 closest pandals from user location
  const baseTop20Pandals = useMemo(() => {
    if (!userLocation) return [];
    return pandals
      .map((p) => ({
        ...p,
        distanceFromUser: getDistanceKm(userLocation.lat, userLocation.lng, p.latitude, p.longitude),
      }))
      .sort((a, b) => a.distanceFromUser - b.distanceFromUser)
      .slice(0, 20);
  }, [userLocation]);

  // When activating Top 20, initialize selectedCircuitIds with all 20
  const handleToggleTop20 = () => {
    if (!top20Active) {
      const allIds = new Set(baseTop20Pandals.map((p) => p.id));
      setSelectedCircuitIds(allIds);
      setTop20Active(true);
      setSelectedPandal(null);
      setSearchQuery("");
      setSelectedZone("all");
      setCircuitPanelExpanded(false);
    } else {
      setTop20Active(false);
      setSelectedCircuitIds(new Set());
      setTrailSaved(false);
    }
  };

  // Toggle selection of a specific pandal in the circuit
  const handleTogglePandalInCircuit = (pandalId) => {
    setSelectedCircuitIds((prev) => {
      const next = new Set(prev);
      if (next.has(pandalId)) {
        next.delete(pandalId);
      } else {
        next.add(pandalId);
      }
      return next;
    });
  };

  const handleSelectAll20 = () => {
    setSelectedCircuitIds(new Set(baseTop20Pandals.map((p) => p.id)));
  };

  const handleClearCircuit = () => {
    setSelectedCircuitIds(new Set());
  };

  // Compute active ordered circuit from the user's location through only selected pandals
  const activeCircuit = useMemo(() => {
    if (!top20Active || !userLocation) return null;

    const activePandals = baseTop20Pandals.filter((p) => selectedCircuitIds.has(p.id));
    if (activePandals.length === 0) {
      return {
        stops: [],
        polyline: [],
        totalStops: 0,
        formattedTotalDistance: "0 km",
        totalHopDuration: "0 mins",
        legBadges: [],
      };
    }

    // Build optimized sequence through the selected stops
    const circuit = buildTop20Circuit(userLocation.lat, userLocation.lng, activePandals);
    if (!circuit) return null;

    // Build leg mid-point distance badges for the map
    const legBadges = [];
    if (circuit.legs && circuit.legs.length > 0) {
      circuit.legs.forEach((leg) => {
        const midLat = (leg.fromCoord[0] + leg.toPandal.latitude) / 2;
        const midLng = (leg.fromCoord[1] + leg.toPandal.longitude) / 2;
        legBadges.push({
          position: [midLat, midLng],
          text: leg.formattedDistance,
        });
      });
    }

    return {
      ...circuit,
      legBadges,
    };
  }, [top20Active, userLocation, baseTop20Pandals, selectedCircuitIds]);

  // Filtered pandals to display on map
  const displayPandals = useMemo(() => {
    if (top20Active) {
      // In Top 20 mode, show all 20 candidate pandals so user can re-select deselected ones
      return baseTop20Pandals;
    }

    return pandals.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.pandal_name.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.zone.toLowerCase().includes(q) ||
        (p.venue_address || "").toLowerCase().includes(q) ||
        (p.theme || "").toLowerCase().includes(q);

      const matchesZone = selectedZone === "all" || p.zone.toLowerCase() === selectedZone.toLowerCase();
      return matchesSearch && matchesZone;
    });
  }, [searchQuery, selectedZone, top20Active, baseTop20Pandals]);

  // Request location with GPS + IP fallback
  const handleLocateMe = async () => {
    setIsLocating(true);
    setLocationStatus("Locating...");
    const loc = await detectUserLocation((msg) => setLocationStatus(msg));
    setUserLocation(loc);
    setIsLocating(false);
    if (loc.source === "gps") {
      setLocationStatus(`GPS: ${loc.lat.toFixed(4)}°, ${loc.lng.toFixed(4)}°`);
    } else {
      setLocationStatus(loc.name);
    }
  };

  const handleSelectHub = (hub) => {
    setUserLocation({
      lat: hub.lat,
      lng: hub.lng,
      name: hub.name,
      source: "hub",
    });
    setLocationStatus(hub.name);
  };

  const handleSaveToRoutePlanner = () => {
    if (activeCircuit && activeCircuit.stops && activeCircuit.stops.length > 0) {
      loadCuratedTrail(activeCircuit.stops, "Top 20 Hopping Route");
      setTrailSaved(true);
      setTimeout(() => setTrailSaved(false), 3000);
    }
  };

  // Google Maps navigation url
  const googleMapsCircuitUrl = useMemo(() => {
    if (!activeCircuit || !activeCircuit.stops || activeCircuit.stops.length === 0) return "#";
    const origin = `${userLocation.lat},${userLocation.lng}`;
    const destination = `${activeCircuit.stops[activeCircuit.stops.length - 1].latitude},${
      activeCircuit.stops[activeCircuit.stops.length - 1].longitude
    }`;
    const waypoints = activeCircuit.stops
      .slice(0, 8) // Google Maps waypoint URL query limit
      .map((p) => `${p.latitude},${p.longitude}`)
      .join("|");

    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}`;
  }, [activeCircuit, userLocation]);

  const handleResetView = () => {
    setSelectedPandal(null);
    setSearchQuery("");
    setSelectedZone("all");
    setTop20Active(false);
  };

  return (
    <div className="relative w-full h-[calc(100svh-56px)] md:h-[calc(100vh-64px)] mt-14 md:mt-16 overflow-hidden flex flex-col bg-[#120D0C]">
      {/* Top Floating Controls Bar */}
      <div className="absolute top-2 inset-x-2.5 md:left-6 md:right-6 z-[1000] flex flex-col gap-1.5 pointer-events-none">
        <div className="flex items-center gap-1.5 pointer-events-auto">
          {/* Search Box */}
          <div className="relative flex-1 max-w-sm sm:max-w-md">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4A84F]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={top20Active ? "Search pandals..." : "Search 62 Siliguri pandals..."}
              className="w-full h-9 pl-8 pr-7 rounded-full bg-[#181313]/90 text-[#FFF4DC] placeholder-[#FFF4DC]/50 border border-[#D4A84F]/40 shadow-md text-xs backdrop-blur-md focus:outline-none focus:border-[#D62828]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#FFF4DC]/60 hover:text-white"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Top 20 Trail Toggle Button */}
          <button
            onClick={handleToggleTop20}
            className={`h-9 px-3 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-md backdrop-blur-md transition active:scale-95 whitespace-nowrap ${
              top20Active
                ? "bg-[#D62828] text-white border border-[#D4A84F]"
                : "bg-[#181313]/90 text-[#FFF4DC] border border-[#D4A84F]/50 hover:bg-[#5A0909]"
            }`}
          >
            <RouteIcon size={13} className="text-[#D4A84F]" />
            <span>{top20Active ? "Exit Top 20" : "Top 20 from Here"}</span>
          </button>

          {/* Tile Layer Toggle: Satellite vs Street */}
          <button
            onClick={() => setTileTheme(tileTheme === "satellite" ? "street" : "satellite")}
            title={tileTheme === "satellite" ? "Switch to Street View" : "Switch to Satellite View"}
            className="h-9 px-2.5 rounded-full bg-[#181313]/90 border border-[#D4A84F]/40 text-[#FFF4DC] flex items-center gap-1 text-[11px] font-semibold shadow-md backdrop-blur-md hover:bg-[#5A0909] active:scale-95 transition"
          >
            <Layers size={13} className="text-[#D4A84F]" />
            <span className="hidden sm:inline">
              {tileTheme === "satellite" ? "Satellite" : "Street"}
            </span>
          </button>

          {/* Toggle Map / List */}
          <button
            onClick={() => setViewMode(viewMode === "map" ? "list" : "map")}
            aria-label="Toggle view"
            className="h-9 px-2.5 rounded-full bg-[#181313]/90 border border-[#D4A84F]/40 text-[#FFF4DC] flex items-center justify-center shadow-md backdrop-blur-md hover:bg-[#5A0909] active:scale-95 transition"
          >
            {viewMode === "map" ? <List size={14} className="text-[#D4A84F]" /> : <MapIcon size={14} className="text-[#D4A84F]" />}
          </button>
        </div>

        {/* Location Hub Chips / Zone Chips */}
        <div className="flex items-center gap-1 overflow-x-auto pb-0.5 no-scrollbar pointer-events-auto">
          {/* Quick Hub Origin pills */}
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[10px] text-[#D4A84F] font-bold px-1.5 py-0.5 rounded bg-black/60 border border-[#D4A84F]/30 backdrop-blur-xs">
              📍 {locationStatus}
            </span>
            {POPULAR_HUBS.map((hub) => (
              <button
                key={hub.name}
                onClick={() => handleSelectHub(hub)}
                className={`px-2 py-0.5 rounded-full text-[10px] whitespace-nowrap transition active:scale-95 ${
                  userLocation.name === hub.name
                    ? "bg-[#5A0909] text-[#FFF4DC] border border-[#D4A84F] font-bold"
                    : "bg-black/60 text-white/80 hover:bg-black/80 border border-white/10"
                }`}
              >
                {hub.name}
              </button>
            ))}
          </div>

          {/* Zones (when not in Top 20 mode) */}
          {!top20Active && (
            <div className="flex items-center gap-1 pl-2 border-l border-white/20 shrink-0">
              <button
                onClick={() => setSelectedZone("all")}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap transition ${
                  selectedZone === "all"
                    ? "bg-[#D62828] text-white"
                    : "bg-black/60 text-white/80 border border-white/10"
                }`}
              >
                All Zones ({pandals.length})
              </button>
              {ALL_ZONES.map((zone) => (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`px-2 py-0.5 rounded-full text-[10px] whitespace-nowrap transition ${
                    selectedZone === zone
                      ? "bg-[#5A0909] text-[#FFF4DC] border border-[#D4A84F] font-bold"
                      : "bg-black/60 text-white/80 border border-white/10"
                  }`}
                >
                  {zone}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Buttons Bottom Right */}
      <div className="absolute right-3 bottom-20 md:bottom-6 z-[1000] flex flex-col gap-2">
        {/* Use My Location GPS */}
        <button
          onClick={handleLocateMe}
          disabled={isLocating}
          title="Use my current GPS location"
          className="h-10 w-10 rounded-full bg-[#181313]/90 text-[#FFF4DC] border border-[#D4A84F]/60 flex items-center justify-center shadow-xl backdrop-blur-md hover:bg-[#5A0909] active:scale-95 transition disabled:opacity-50"
        >
          <Navigation
            size={16}
            className={`${isLocating ? "animate-spin text-[#D62828]" : "text-[#1A73E8]"}`}
          />
        </button>

        {/* Recenter Siliguri */}
        <button
          onClick={handleResetView}
          title="Recenter Siliguri"
          className="h-10 w-10 rounded-full bg-[#181313]/90 text-[#FFF4DC] border border-[#D4A84F]/60 flex items-center justify-center shadow-xl backdrop-blur-md hover:bg-[#5A0909] active:scale-95 transition"
        >
          <Compass size={16} className="text-[#D4A84F]" />
        </button>
      </div>

      {/* Main View: Map or List View */}
      {viewMode === "map" ? (
        <div className="relative w-full h-full">
          <MapView
            pandals={displayPandals}
            selectedPandal={selectedPandal}
            onSelectPandal={(pandal) => {
              if (top20Active) {
                // In Top 20 mode, clicking a pandal selects/deselects it from the trail
                handleTogglePandalInCircuit(pandal.id);
              } else {
                setSelectedPandal(pandal);
              }
            }}
            userLocation={userLocation}
            tileTheme={tileTheme}
            center={[userLocation.lat, userLocation.lng]}
            zoom={top20Active ? 14 : 14}
            routePolyline={top20Active && activeCircuit ? activeCircuit.polyline : null}
            legBadges={top20Active && activeCircuit ? activeCircuit.legBadges : []}
            numberedMarkers={top20Active}
            className="w-full h-full"
          />

          {/* Selected Pandal Bottom Sheet Preview (Standard mode) */}
          {selectedPandal && !top20Active && (
            <PandalPreview
              pandal={selectedPandal}
              onClose={() => setSelectedPandal(null)}
              userLocation={userLocation}
            />
          )}

          {/* Top 20 Circuit Dynamic Selection Bottom Drawer */}
          {top20Active && activeCircuit && (
            <div className="absolute bottom-20 md:bottom-6 left-2.5 right-2.5 md:left-6 md:right-auto md:w-[440px] z-[1000] bg-[#181313]/95 text-[#FFF4DC] border border-[#1A73E8] rounded-2xl p-3 shadow-2xl backdrop-blur-md animate-fade-in space-y-2">
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-1.5 border-b border-[#D4A84F]/20">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#1A73E8] shadow-[0_0_8px_#1A73E8]" />
                  <span className="font-serif text-xs sm:text-sm font-bold text-[#FFF4DC]">
                    Top 20 Circuit from Your Spot
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-[#1A73E8] rounded-full text-white font-bold">
                    {selectedCircuitIds.size} of 20 Selected
                  </span>
                </div>
                <button
                  onClick={() => setTop20Active(false)}
                  className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white"
                >
                  <X size={12} />
                </button>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-black/50 border border-[#1A73E8]/40 flex items-center gap-2">
                  <Navigation size={14} className="text-[#1A73E8] shrink-0" />
                  <div>
                    <span className="text-[9px] text-white/60 block uppercase font-bold">
                      Plain Blue Route
                    </span>
                    <span className="font-bold text-[#FFF4DC]">
                      {activeCircuit.formattedTotalDistance}
                    </span>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-black/50 border border-[#D4A84F]/30 flex items-center gap-2">
                  <Clock size={14} className="text-[#D4A84F] shrink-0" />
                  <div>
                    <span className="text-[9px] text-white/60 block uppercase font-bold">
                      Est. Total Time
                    </span>
                    <span className="font-bold text-[#D4A84F]">
                      ~{activeCircuit.totalHopDuration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Selection & Deselection Controls */}
              <div className="flex items-center justify-between pt-0.5 text-[11px]">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSelectAll20}
                    className="text-[10px] text-[#D4A84F] hover:underline font-bold"
                  >
                    Select All (20)
                  </button>
                  <span className="text-white/30">•</span>
                  <button
                    onClick={handleClearCircuit}
                    className="text-[10px] text-red-400 hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                <button
                  onClick={() => setCircuitPanelExpanded(!circuitPanelExpanded)}
                  className="text-[10px] text-[#1A73E8] font-bold flex items-center gap-0.5 hover:underline"
                >
                  <span>{circuitPanelExpanded ? "Hide Stops List" : "Customize Stops"}</span>
                  {circuitPanelExpanded ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
                </button>
              </div>

              {/* Expandable stops selection chip list */}
              {circuitPanelExpanded && (
                <div className="max-h-40 overflow-y-auto space-y-1.5 p-1 rounded-xl bg-black/40 border border-white/10 text-xs">
                  <p className="text-[10px] text-white/60 px-1 italic">
                    Tap to select or deselect pandals from the blue route:
                  </p>
                  <div className="grid grid-cols-1 gap-1">
                    {baseTop20Pandals.map((pandal, idx) => {
                      const isSelected = selectedCircuitIds.has(pandal.id);
                      return (
                        <button
                          key={pandal.id}
                          onClick={() => handleTogglePandalInCircuit(pandal.id)}
                          className={`w-full p-1.5 rounded-lg flex items-center justify-between text-left transition active:scale-98 ${
                            isSelected
                              ? "bg-[#1A73E8]/20 border border-[#1A73E8] text-white font-medium"
                              : "bg-white/5 border border-white/10 text-white/40 line-through"
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span
                              className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                                isSelected ? "bg-[#1A73E8] text-white" : "bg-gray-700 text-gray-300"
                              }`}
                            >
                              {idx + 1}
                            </span>
                            <span className="truncate text-[11px]">{pandal.pandal_name}</span>
                          </div>
                          <span className="text-[10px] text-[#D4A84F] shrink-0 font-mono ml-2">
                            {formatDistance(pandal.distanceFromUser)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Actions Row */}
              <div className="pt-1 flex items-center gap-2">
                <a
                  href={googleMapsCircuitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#1A73E8] hover:bg-[#1557B0] text-white text-xs font-bold shadow-md active:scale-95 transition"
                >
                  <Navigation size={13} />
                  <span>Google Maps Route</span>
                  <ExternalLink size={11} />
                </a>

                <button
                  type="button"
                  onClick={handleSaveToRoutePlanner}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition active:scale-95 ${
                    trailSaved
                      ? "bg-[#D4A84F] text-[#181313] border-[#D4A84F]"
                      : "bg-[#5A0909] text-[#FFF4DC] border-[#D4A84F]/40 hover:bg-[#A50000]"
                  }`}
                >
                  {trailSaved ? <Check size={13} /> : <RouteIcon size={13} />}
                  <span>{trailSaved ? "Saved!" : "Save to Planner"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* List Mode fallback */
        <div className="w-full h-full overflow-y-auto px-4 pt-20 pb-20 max-w-4xl mx-auto">
          <div className="mb-3 flex items-center justify-between text-xs text-[#FFF4DC]/70">
            <span>
              {top20Active
                ? `Showing Top 20 circuit stops (${displayPandals.length})`
                : `Showing ${displayPandals.length} pandals`}
            </span>
            <button
              onClick={() => setViewMode("map")}
              className="text-[#D4A84F] font-bold hover:underline"
            >
              Switch back to Map
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {displayPandals.map((p, idx) => (
              <PandalCard
                key={p.id}
                pandal={p}
                showDistance={top20Active}
                distanceText={top20Active ? `Stop #${idx + 1}` : ""}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
