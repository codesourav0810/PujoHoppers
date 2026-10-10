import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useRoute } from "../context/RouteContext";
import logoImg from "../assets/logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { totalStops } = useRoute();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Explore", path: "/explore" },
    { label: "Pujo Map", path: "/map" },
    { label: "Near Me", path: "/near-me" },
    { label: "Routes", path: "/routes", badge: totalStops > 0 ? totalStops : null },
    { label: "About", path: "/about" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
        scrolled || !isHome
          ? "bg-[#181313]/95 backdrop-blur-md border-b border-[#D4A84F]/20 shadow-md"
          : "bg-gradient-to-b from-black/75 via-black/30 to-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex h-14 md:h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group transition active:scale-95"
          aria-label="PujoHoppers Home"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D4A84F]/80 shadow-sm shrink-0 bg-[#5A0909]">
            <img src={logoImg} alt="PujoHoppers Logo" className="w-full h-full object-cover" />
          </div>
          <div className="font-serif text-lg md:text-xl font-bold tracking-tight">
            <span className="text-[#FFF4DC]">Pujo</span>
            <span className="text-[#D62828]">Hoppers</span>
          </div>
          <span className="text-[9px] uppercase tracking-wider text-[#D4A84F] font-bold px-1.5 py-0.5 rounded bg-[#D4A84F]/10 border border-[#D4A84F]/30 ml-1">
            Siliguri
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition ${
                  active
                    ? "text-[#FFF4DC] bg-[#5A0909] border border-[#D4A84F]/40 font-semibold"
                    : "text-[#FFF4DC]/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="ml-1.5 inline-flex items-center justify-center px-1.5 py-0.2 text-[9px] font-bold bg-[#D62828] text-white rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Header Right: Quick Explore Pill */}
        <div className="flex items-center gap-2">
          <Link
            to="/explore"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#D62828] text-white text-[11px] md:text-xs font-bold border border-[#D4A84F]/40 shadow-sm active:scale-95 transition"
          >
            <Sparkles size={12} className="text-[#D4A84F]" />
            <span>62 Pandals</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
