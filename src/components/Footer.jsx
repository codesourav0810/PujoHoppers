import React from "react";
import { Link } from "react-router-dom";
import { Map, Compass, Navigation, Route, Sparkles, Heart } from "lucide-react";
import logoImg from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#0D0A09] text-[#FFF4DC] border-t border-[#D4A84F]/20 pt-8 pb-24 md:pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#D4A84F]/15 text-center md:text-left">
          {/* Brand */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D4A84F]/80 shadow-sm shrink-0 bg-[#5A0909]">
                <img src={logoImg} alt="PujoHoppers Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight">
                <span className="text-[#FFF4DC]">Pujo</span>
                <span className="text-[#D62828]">Hoppers</span>
              </span>
              <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#D4A84F]/10 border border-[#D4A84F]/30 text-[#D4A84F] font-bold">
                Siliguri 2026
              </span>
            </div>
            <p className="font-serif text-sm text-[#D4A84F] italic">
              "One city. 62 pandals. Endless Pujo."
            </p>
            <p className="text-[11px] text-[#FFF4DC]/60 max-w-sm">
              Discover verified Durga Puja pandals, map routes, and celebrate the spirit of Siliguri.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#FFF4DC]/80">
            <Link to="/explore" className="hover:text-[#D4A84F] transition">Explore</Link>
            <Link to="/map" className="hover:text-[#D4A84F] transition">Pujo Map</Link>
            <Link to="/near-me" className="hover:text-[#D4A84F] transition">Near Me</Link>
            <Link to="/routes" className="hover:text-[#D4A84F] transition">Route Planner</Link>
            <Link to="/about" className="hover:text-[#D4A84F] transition">About</Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FFF4DC]/50 gap-2 text-center">
          <p>© 2026 PujoHoppers Siliguri. 62 Verified Locations.</p>
          <p className="font-bengali text-[#D4A84F]/80">শুভ শারদীয়া ১৪৩৩</p>
        </div>
      </div>
    </footer>
  );
}
