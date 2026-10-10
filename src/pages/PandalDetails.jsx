import React, { useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Navigation,
  MapPin,
  Plus,
  Check,
  Share2,
  Sparkles,
  ExternalLink,
  Layers,
} from "lucide-react";
import { getPandalById, pandals } from "../data/pandals";
import { getDistanceKm, formatDistance } from "../utils/distance";
import { useRoute } from "../context/RouteContext";
import MapView from "../components/MapView";
import PandalCard from "../components/PandalCard";

export default function PandalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isInRoute, toggleRoute } = useRoute();

  const pandal = useMemo(() => getPandalById(id), [id]);

  // Compute nearby pandals
  const nearbyPandals = useMemo(() => {
    if (!pandal || !pandal.latitude || !pandal.longitude) return [];

    return pandals
      .filter((p) => String(p.id) !== String(pandal.id))
      .map((p) => {
        const dist = getDistanceKm(pandal.latitude, pandal.longitude, p.latitude, p.longitude);
        return {
          ...p,
          distance: dist,
          formattedDistance: formatDistance(dist),
        };
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);
  }, [pandal]);

  if (!pandal) {
    return (
      <div className="min-h-screen pt-20 pb-16 px-4 flex flex-col items-center justify-center text-center bg-[#FFF4DC]">
        <div className="w-12 h-12 rounded-full bg-[#A50000]/10 flex items-center justify-center text-2xl mb-3">
          🪔
        </div>
        <h2 className="font-serif text-xl font-bold text-[#181313]">Pandal Not Found</h2>
        <p className="text-xs text-[#181313]/70 mt-1 max-w-sm">
          We couldn't locate the requested pandal.
        </p>
        <Link
          to="/explore"
          className="mt-4 px-5 py-2 rounded-full bg-[#D62828] text-white text-xs font-bold shadow-xs"
        >
          Explore All 62 Pandals
        </Link>
      </div>
    );
  }

  const inRoute = isInRoute(pandal.id);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${pandal.pandal_name} — Siliguri Durga Puja 2026`,
          text: `Check out ${pandal.pandal_name} in ${pandal.area}, Siliguri on PujoHoppers!`,
          url: window.location.href,
        });
      } catch (err) {
        console.warn("Share cancelled", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Pandal link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF4DC] text-[#181313] pt-14 md:pt-16 pb-24 md:pb-16">
      {/* Top Breadcrumb Bar */}
      <div className="bg-[#181313] text-[#FFF4DC] border-b border-[#D4A84F]/20 px-4 py-2.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-xs text-[#D4A84F] hover:text-white transition active:scale-95"
          >
            <ArrowLeft size={14} />
            <span>Back to pandals</span>
          </button>

          <button
            onClick={handleShare}
            title="Share this pandal"
            className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[#FFF4DC] border border-[#D4A84F]/30"
          >
            <Share2 size={12} />
            <span>Share</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
        {/* Hero Banner Card */}
        <div className="relative rounded-2xl overflow-hidden border border-[#D4A84F]/30 shadow-md bg-[#181313]">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full">
            <img
              src={pandal.image}
              alt={pandal.pandal_name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181313] via-[#181313]/60 to-black/20" />

            {/* Badges on Hero */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#A50000] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm border border-[#D4A84F]/40">
                {pandal.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#181313]/80 backdrop-blur-xs text-[#D4A84F] text-[10px] font-medium border border-[#D4A84F]/30">
                {pandal.zone}
              </span>
            </div>

            {/* Pandal Title on Hero Bottom */}
            <div className="absolute bottom-4 inset-x-4">
              <div className="flex items-center gap-1 text-[11px] text-[#D4A84F] font-semibold mb-0.5">
                <MapPin size={12} className="text-[#D62828]" />
                <span>{pandal.area}, Siliguri</span>
              </div>
              <h1 className="font-serif text-xl sm:text-3xl font-bold text-[#FFF4DC] leading-snug">
                {pandal.pandal_name}
              </h1>
            </div>
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="mt-3 p-3 rounded-xl bg-white border border-[#D4A84F]/25 shadow-2xs flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#5A0909] text-[#FFF4DC] flex items-center justify-center font-bold text-xs shadow-inner">
              #{pandal.id}
            </div>
            <div>
              <p className="text-[10px] text-[#181313]/60">Siliguri Pujo Hopping</p>
              <p className="text-xs font-bold text-[#5A0909]">Verified 2026 Pandal</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Add to Route */}
            <button
              onClick={() => toggleRoute(pandal)}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs tracking-wide transition active:scale-95 shadow-2xs ${
                inRoute
                  ? "bg-[#D4A84F] text-[#181313] border border-[#D4A84F]"
                  : "bg-[#181313] text-[#FFF4DC] hover:bg-[#5A0909]"
              }`}
            >
              {inRoute ? <Check size={14} strokeWidth={2.5} /> : <Plus size={14} />}
              <span>{inRoute ? "Added" : "Add to Route"}</span>
            </button>

            {/* Get Directions */}
            {pandal.google_maps_direction && (
              <a
                href={pandal.google_maps_direction}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D62828] to-[#A50000] text-white font-bold text-xs tracking-wide hover:brightness-110 active:scale-95 shadow-2xs transition"
              >
                <Navigation size={14} />
                <span>Get Directions</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>

        {/* Content Layout */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Details */}
          <div className="md:col-span-2 space-y-4">
            {/* Theme */}
            <div className="p-4 rounded-xl bg-white border border-[#D4A84F]/25 shadow-2xs space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A50000] flex items-center gap-1">
                <Sparkles size={12} />
                <span>2026 Mandap Theme</span>
              </span>
              <p className="font-serif text-base sm:text-lg text-[#5A0909] font-semibold leading-relaxed">
                "{pandal.theme || "Traditional Bengali Daker Saaj & Classical Rhythms"}"
              </p>
            </div>

            {/* Venue Details */}
            <div className="p-4 rounded-xl bg-white border border-[#D4A84F]/25 shadow-2xs space-y-3">
              <h3 className="font-serif text-sm font-bold text-[#181313]">Venue Details</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[#FFF4DC]/50 border border-[#D4A84F]/20">
                  <span className="text-[#181313]/60 block text-[10px]">Address</span>
                  <span className="font-semibold text-[#181313] truncate block">
                    {pandal.venue_address || `${pandal.area}, Siliguri`}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FFF4DC]/50 border border-[#D4A84F]/20">
                  <span className="text-[#181313]/60 block text-[10px]">Zone</span>
                  <span className="font-semibold text-[#181313] truncate block">{pandal.zone}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FFF4DC]/50 border border-[#D4A84F]/20">
                  <span className="text-[#181313]/60 block text-[10px]">Category</span>
                  <span className="font-semibold text-[#A50000]">{pandal.category}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FFF4DC]/50 border border-[#D4A84F]/20">
                  <span className="text-[#181313]/60 block text-[10px]">Coordinates</span>
                  <span className="font-mono text-[#5A0909] text-[11px]">
                    {pandal.latitude.toFixed(4)}°, {pandal.longitude.toFixed(4)}°
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mini Map */}
          <div>
            <div className="rounded-xl overflow-hidden border border-[#D4A84F]/30 shadow-2xs bg-[#181313]">
              <div className="p-2.5 bg-[#181313] text-[#FFF4DC] flex items-center justify-between border-b border-[#D4A84F]/20">
                <span className="text-xs font-bold text-[#D4A84F] flex items-center gap-1">
                  <Layers size={13} /> Location Map
                </span>
                <Link to="/map" className="text-[11px] text-[#FFF4DC]/70 hover:text-white">
                  Full Map →
                </Link>
              </div>

              <div className="h-48 w-full">
                <MapView
                  pandals={[pandal]}
                  selectedPandal={pandal}
                  center={[pandal.latitude, pandal.longitude]}
                  zoom={15}
                  tileTheme="satellite"
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Nearby Next Hop Pandals */}
        {nearbyPandals.length > 0 && (
          <div className="mt-8 pt-6 border-t border-[#D4A84F]/25">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#A50000]">
                  Continue Hopping
                </span>
                <h3 className="font-serif text-lg font-bold text-[#181313]">Nearby Pandals</h3>
              </div>
              <Link to="/map" className="text-xs font-bold text-[#A50000] hover:underline">
                View on Map →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {nearbyPandals.map((p) => (
                <PandalCard
                  key={p.id}
                  pandal={p}
                  showDistance={true}
                  distanceText={`${p.formattedDistance} away`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
