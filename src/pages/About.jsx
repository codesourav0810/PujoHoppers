import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Map, Route } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-[#FFF4DC] text-[#181313] pt-14 md:pt-16 pb-24 md:pb-16">
      {/* Banner */}
      <section className="bg-[#181313] text-[#FFF4DC] py-8 px-4 sm:px-6 border-b border-[#D4A84F]/20">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-[2px] uppercase text-[#D4A84F]">
              About PujoHoppers
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#FFF4DC]">
            Siliguri Sharod 2026
          </h1>

          <p className="font-serif text-base sm:text-lg text-[#D4A84F] italic">
            "One city. 62 pandals. Endless Pujo."
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-5">
        {/* Purpose */}
        <div className="p-5 rounded-2xl bg-white border border-[#D4A84F]/25 shadow-2xs space-y-2.5">
          <h2 className="font-serif text-lg font-bold text-[#5A0909] flex items-center gap-2">
            <Sparkles size={16} className="text-[#D62828]" />
            What is PujoHoppers?
          </h2>
          <p className="text-xs sm:text-sm text-[#181313]/80 leading-relaxed">
            PujoHoppers is a Siliguri-focused Durga Puja discovery platform designed to help people discover
            pandals, explore the city, find nearby Puja destinations, and plan their own custom pandal-hopping
            routes.
          </p>
          <p className="text-xs sm:text-sm text-[#181313]/80 leading-relaxed">
            During Durga Puja, Siliguri transforms. From Ashrampara and Hakimpara to Sevoke Road and South Siliguri,
            thousands step out every evening. PujoHoppers brings all 62 verified mandap locations, real coordinates,
            and proximity tracking to your phone.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-[#5A0909] text-[#FFF4DC] border border-[#D4A84F]/30 shadow-2xs space-y-1">
            <span className="font-serif font-bold text-lg text-[#D4A84F]">62</span>
            <h3 className="font-serif text-sm font-bold text-[#FFF4DC]">Verified Pandals</h3>
            <p className="text-[11px] text-[#FFF4DC]/75 leading-relaxed">
              Every coordinate, address, and theme is verified across Siliguri.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white text-[#181313] border border-[#D4A84F]/25 shadow-2xs space-y-1">
            <span className="text-[#D62828]"><Map size={18} /></span>
            <h3 className="font-serif text-sm font-bold text-[#5A0909]">No API Key Map</h3>
            <p className="text-[11px] text-[#181313]/70 leading-relaxed">
              Open Leaflet maps with fast dark festival styling.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white text-[#181313] border border-[#D4A84F]/25 shadow-2xs space-y-1">
            <span className="text-[#A50000]"><Route size={18} /></span>
            <h3 className="font-serif text-sm font-bold text-[#5A0909]">Route Planner</h3>
            <p className="text-[11px] text-[#181313]/70 leading-relaxed">
              Build your custom trail, view distances, and open in Google Maps.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#181313] text-[#FFF4DC] border border-[#D4A84F]/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="font-serif text-base font-bold text-[#FFF4DC]">Ready to explore Siliguri?</h3>
            <p className="text-xs text-[#FFF4DC]/70">Find the nearest pandals or open the map now.</p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/explore"
              className="px-4 py-2 rounded-full bg-[#D62828] text-white text-xs font-bold shadow-xs active:scale-95"
            >
              Explore Pandals
            </Link>
            <Link
              to="/map"
              className="px-4 py-2 rounded-full border border-[#D4A84F] text-[#FFF4DC] text-xs font-bold active:scale-95"
            >
              Pujo Map
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
