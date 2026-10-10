import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Navigation, Plus, Check, ArrowRight } from "lucide-react";
import { useRoute } from "../context/RouteContext";

const CATEGORY_COLORS = {
  Traditional: "bg-[#A50000]/15 text-[#A50000] border-[#A50000]/30",
  Heritage: "bg-[#5A0909]/20 text-[#5A0909] border-[#5A0909]/30",
  "Eco-Friendly": "bg-emerald-950/20 text-emerald-800 border-emerald-800/30",
  Theme: "bg-amber-950/20 text-amber-900 border-amber-900/30",
  Community: "bg-red-950/15 text-red-800 border-red-800/30",
};

const AUTHENTIC_FALLBACK =
  "https://images.unsplash.com/photo-1759463191632-90844233c9ea?auto=format&fit=crop&w=800&q=80";

export default function PandalCard({ pandal, showDistance = false, distanceText = "" }) {
  const { isInRoute, toggleRoute } = useRoute();
  const [imgError, setImgError] = useState(false);

  const inRoute = isInRoute(pandal.id);
  const categoryStyle = CATEGORY_COLORS[pandal.category] || CATEGORY_COLORS.Traditional;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#D4A84F]/30 bg-[#FFFDF7] shadow-2xs hover:shadow-md transition duration-200">
      {/* Media Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#181313]">
        <img
          src={imgError ? AUTHENTIC_FALLBACK : pandal.image || AUTHENTIC_FALLBACK}
          alt={pandal.pandal_name}
          loading="lazy"
          decoding="async"
          width={600}
          height={375}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-1.5">
          <span
            className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border backdrop-blur-xs bg-white/95 ${categoryStyle}`}
          >
            {pandal.category || "Pandal"}
          </span>

          {showDistance && distanceText && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#181313]/90 text-[#D4A84F] border border-[#D4A84F]/40 backdrop-blur-xs flex items-center gap-1">
              <Navigation size={9} className="text-[#D62828]" />
              {distanceText}
            </span>
          )}
        </div>

        {/* Pandal Name in Media */}
        <div className="absolute bottom-2.5 inset-x-2.5 text-[#FFF4DC]">
          <div className="flex items-center gap-1 text-[10px] text-[#D4A84F] font-medium mb-0.5">
            <MapPin size={11} className="text-[#D62828] shrink-0" />
            <span className="truncate">{pandal.area} • {pandal.zone}</span>
          </div>
          <h3 className="font-serif text-sm sm:text-base font-bold leading-snug line-clamp-1">
            {pandal.pandal_name}
          </h3>
        </div>
      </div>

      {/* Body Info */}
      <div className="p-3 flex-1 flex flex-col justify-between gap-2.5">
        <div>
          {pandal.theme ? (
            <p className="text-[11px] text-[#181313]/75 italic line-clamp-2 leading-relaxed">
              "{pandal.theme}"
            </p>
          ) : (
            <p className="text-[11px] text-[#181313]/60 line-clamp-2 leading-relaxed">
              {pandal.venue_address || "Siliguri Durga Puja 2026"}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-[#D4A84F]/15 flex items-center gap-1.5">
          <Link
            to={`/pandal/${pandal.id}`}
            className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-xl bg-[#5A0909] text-[#FFF4DC] text-xs font-bold hover:bg-[#A50000] active:scale-95 transition"
          >
            <span>View</span>
            <ArrowRight size={12} />
          </Link>

          {/* Add to Route Toggle */}
          <button
            type="button"
            onClick={() => toggleRoute(pandal)}
            aria-label={inRoute ? "Remove from route" : "Add to route"}
            title={inRoute ? "In your route" : "Add to route"}
            className={`flex h-8 w-8 items-center justify-center rounded-xl border text-xs font-bold transition active:scale-95 ${
              inRoute
                ? "bg-[#D4A84F] text-[#181313] border-[#D4A84F]"
                : "border-[#D4A84F]/40 bg-white text-[#5A0909] hover:bg-[#FFF4DC]"
            }`}
          >
            {inRoute ? <Check size={14} strokeWidth={2.5} /> : <Plus size={14} />}
          </button>

          {/* External Directions */}
          {pandal.google_maps_direction && (
            <a
              href={pandal.google_maps_direction}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Directions in Google Maps"
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#D4A84F]/40 bg-white text-[#D62828] hover:bg-[#FFF4DC] active:scale-95 transition"
            >
              <Navigation size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
