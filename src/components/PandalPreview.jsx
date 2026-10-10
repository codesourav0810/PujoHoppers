import React from "react";
import { Link } from "react-router-dom";
import { X, Navigation, ArrowRight, MapPin, Plus, Check } from "lucide-react";
import { useRoute } from "../context/RouteContext";

export default function PandalPreview({ pandal, onClose, userLocation = null }) {
  const { isInRoute, toggleRoute } = useRoute();
  if (!pandal) return null;

  const inRoute = isInRoute(pandal.id);

  return (
    <div
      role="region"
      aria-label="Pandal Preview"
      className="absolute bottom-20 md:bottom-6 left-3 right-3 md:left-6 md:right-auto md:w-[380px] z-[1000] bg-[#181313]/95 text-[#FFF4DC] border border-[#D4A84F]/60 rounded-2xl p-4 shadow-2xl backdrop-blur-md animate-fade-in"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close pandal preview"
        className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-[#FFF4DC] flex items-center justify-center transition active:scale-95"
      >
        <X size={15} />
      </button>

      <div className="flex gap-3">
        {/* Thumbnail */}
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-black shrink-0 border border-[#D4A84F]/30 relative">
          <img
            src={pandal.image}
            alt={pandal.pandal_name}
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-1 left-1 text-[8px] font-bold uppercase tracking-wider bg-[#A50000] text-white px-1.5 py-0.5 rounded">
            {pandal.category}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-6">
          <div className="flex items-center gap-1 text-[11px] text-[#D4A84F] font-medium truncate mb-0.5">
            <MapPin size={11} className="text-[#D62828] shrink-0" />
            <span className="truncate">{pandal.area} • {pandal.zone}</span>
          </div>

          <h3 className="font-serif text-base font-bold text-[#FFF4DC] leading-snug truncate">
            {pandal.pandal_name}
          </h3>

          <p className="text-[11px] text-[#FFF4DC]/70 italic line-clamp-1 mt-1">
            {pandal.theme || pandal.venue_address || "Durga Puja 2026"}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-3 pt-3 border-t border-[#D4A84F]/20 flex items-center gap-2">
        <Link
          to={`/pandal/${pandal.id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-[#D62828] to-[#A50000] text-white text-xs font-bold hover:brightness-110 transition active:scale-95 shadow-md"
        >
          <span>View Details</span>
          <ArrowRight size={13} />
        </Link>

        {/* Route toggle */}
        <button
          type="button"
          onClick={() => toggleRoute(pandal)}
          aria-label={inRoute ? "Remove from route" : "Add to route"}
          title={inRoute ? "In your route" : "Add to route"}
          className={`flex h-8 px-2.5 items-center justify-center gap-1 rounded-xl border text-xs font-semibold transition active:scale-95 ${
            inRoute
              ? "bg-[#D4A84F] text-[#181313] border-[#D4A84F]"
              : "bg-white/10 text-[#FFF4DC] border-[#D4A84F]/40 hover:bg-white/20"
          }`}
        >
          {inRoute ? <Check size={14} /> : <Plus size={14} />}
          <span className="hidden sm:inline">{inRoute ? "Added" : "Route"}</span>
        </button>

        {/* External Directions */}
        {pandal.google_maps_direction && (
          <a
            href={pandal.google_maps_direction}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open directions"
            className="flex h-8 px-2.5 items-center justify-center gap-1 rounded-xl border border-[#D4A84F]/40 bg-[#5A0909] text-[#FFF4DC] text-xs font-semibold hover:bg-[#A50000] transition active:scale-95"
          >
            <Navigation size={13} />
            <span className="hidden sm:inline">Directions</span>
          </a>
        )}
      </div>
    </div>
  );
}
