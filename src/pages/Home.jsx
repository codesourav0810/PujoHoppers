import React from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  Map,
  Navigation,
  Route,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { getFeaturedPandals } from "../data/pandals";
import Dhak from "../assets/Dhank.jpg";
import Dhunuchi from "../assets/Dhunuchi.jpg";
import Pandal from "../assets/Pandal.jpg";
import Sindoor from "../assets/Sindoor.jpg";
import homeBg from "../assets/homebg.jpg";
import logoImg from "../assets/logo.png";
import PandalCard from "../components/PandalCard";

export default function Home() {
  const featuredPandals = getFeaturedPandals(6);

  return (
    <main className="min-h-screen bg-[#FFF4DC] text-[#181313]">
      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[92svh] sm:min-h-[100svh] items-end overflow-hidden bg-[#180706]">
        {/* Hero Background Image with slow cinematic zoom */}
        <div
          className="absolute inset-0 bg-cover bg-center hero-zoom lg:bg-[length:100%_auto] lg:bg-no-repeat lg:bg-center"
          style={{
            backgroundImage: `url(${homeBg})`,
          }}
        />

        {/* Dark Festival Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#160807] via-[#160807]/75 to-[#160807]/25" />

        {/* Stationary Hero Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 pb-12 pt-20">
          {/* Season Label */}
          <div className="mb-2.5 flex items-center gap-2">
            <span className="h-px w-5 bg-[#D4A84F]" />
            <span className="text-[10px] sm:text-xl font-bold tracking-[2.5px] text-[#E8C878] uppercase ">
              শুভ শারদীয়া ১৪৩৩
            </span>
            <span className="h-px w-5 bg-[#D4A84F]" />
          </div>

          {/* Brand Heading */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#D4A84F] shadow-lg shrink-0 bg-[#5A0909]">
              <img src={logoImg} alt="PujoHoppers Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#FFF4DC] leading-tight">
              Pujo<span className="text-[#D62828] ml-1 sm:ml-2">Hoppers</span>
            </h1>
          </div>

          {/* Main Tagline */}
          <p className="mt-2 font-serif text-lg sm:text-2xl text-[#E8C878] leading-snug">
           Ekta Shohor, Countless Pandals, Aar Puro Bangali Pujor Vibes!
          </p>

          {/* Description */}
          <p className="mt-2 max-w-md text-xs sm:text-sm leading-relaxed text-[#FFF4DC]/80">
            Discover Siliguri's Durga Puja trail. Find pandals, explore the map and plan your perfect
            Pujo hop.
          </p>

          {/* CTA Buttons */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <Link
              to="/explore"
              className="flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#D62828] to-[#A50000] px-5 text-xs sm:text-sm font-bold text-white shadow-md border border-[#D4A84F]/40 hover:brightness-110 active:scale-95 transition"
            >
              <span>Explore Pandals</span>
              <ArrowRight size={15} />
            </Link>

            <Link
              to="/map"
              className="flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-[#FFF4DC]/70 bg-black/40 backdrop-blur-xs px-5 text-xs sm:text-sm font-bold text-[#FFF4DC] hover:bg-white/10 active:scale-95 transition"
            >
              <Map size={15} className="text-[#D4A84F]" />
              <span>View Pujo Map</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= QUICK ACCESS ================= */}
      <section className="bg-[#FFF4DC] px-4 sm:px-6 py-8 sm:py-12 max-w-5xl mx-auto">
        <div className="mb-4">
          <div className="mb-1 flex items-center gap-1.5">
            <span className="h-px w-6 bg-[#A50000]" />
            <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#A50000]">
              Quick Access
            </span>
          </div>

          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#181313]">
            Your Pujo, your way.
          </h2>
        </div>

        {/* 4 Cards Grid - Mobile Friendly */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
          {/* Explore */}
          <Link
            to="/explore"
            className="group relative min-h-[125px] sm:min-h-[145px] overflow-hidden rounded-2xl bg-[#A50000] p-4 text-[#FFF4DC] transition active:scale-[0.98] shadow-xs flex flex-col justify-between"
          >
            <Compass size={24} strokeWidth={1.8} className="text-[#FFF4DC]" />
            <div>
              <p className="text-sm sm:text-base font-bold font-serif">Explore</p>
              <p className="text-[11px] text-white/75 mt-0.5">62 verified pandals</p>
            </div>
          </Link>

          {/* Map */}
          <Link
            to="/map"
            className="group relative min-h-[125px] sm:min-h-[145px] overflow-hidden rounded-2xl border border-[#D4A84F]/40 bg-[#F7E7C5] p-4 text-[#181313] transition active:scale-[0.98] shadow-xs flex flex-col justify-between"
          >
            <Map size={24} strokeWidth={1.8} className="text-[#A50000]" />
            <div>
              <p className="text-sm sm:text-base font-bold font-serif">Pujo Map</p>
              <p className="text-[11px] text-[#181313]/65 mt-0.5">Across Siliguri</p>
            </div>
          </Link>

          {/* Near Me */}
          <Link
            to="/near-me"
            className="group relative min-h-[125px] sm:min-h-[145px] overflow-hidden rounded-2xl border border-[#D4A84F]/40 bg-[#181313] p-4 text-[#FFF4DC] transition active:scale-[0.98] shadow-xs flex flex-col justify-between"
          >
            <Navigation size={24} strokeWidth={1.8} className="text-[#E8C878]" />
            <div>
              <p className="text-sm sm:text-base font-bold font-serif">Near Me</p>
              <p className="text-[11px] text-white/65 mt-0.5">Closest to you</p>
            </div>
          </Link>

          {/* Plan Route */}
          <Link
            to="/routes"
            className="group relative min-h-[125px] sm:min-h-[145px] overflow-hidden rounded-2xl border border-[#D4A84F]/40 bg-[#5A0909] p-4 text-[#FFF4DC] transition active:scale-[0.98] shadow-xs flex flex-col justify-between"
          >
            <Route size={24} strokeWidth={1.8} className="text-[#E8C878]" />
            <div>
              <p className="text-sm sm:text-base font-bold font-serif">Plan Route</p>
              <p className="text-[11px] text-white/65 mt-0.5">Build your trail</p>
            </div>
          </Link>
        </div>
      </section>

      {/* ================= THE PUJO EXPERIENCE ================= */}
      <section className="bg-[#181313] px-4 sm:px-6 py-10 text-[#FFF4DC]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-5">
            <div className="mb-1 flex items-center gap-2">
              <span className="h-px w-6 bg-[#D4A84F]" />
              <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#E8C878]">
                The Pujo Experience
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-[#FFF4DC]">
              More than just pandals.
            </h2>
          </div>

          {/* Experience Cards - Auto infinite carousel without needing to swipe */}
          <div className="relative overflow-hidden w-full py-2 [mask-image:_linear-gradient(to_right,transparent_0,_black_40px,_black_calc(100%-40px),transparent_100%)]">
            <div className="animate-marquee flex gap-4">
              {[...Array(2)].map((_, loopIdx) => (
                <div key={loopIdx} className="flex gap-4 shrink-0">
                  {/* Dhak */}
                  <article className="relative h-[270px] w-[220px] sm:w-[260px] overflow-hidden rounded-2xl border border-[#D4A84F]/20 group shrink-0">
                    <img
                      src={Dhak}
                      alt="Dhak"
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-[#FFF4DC]">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#E8C878]">01</span>
                      <h3 className="font-serif text-lg font-bold">Dhak</h3>
                      <p className="text-[11px] text-white/70">The sound of Pujo.</p>
                    </div>
                  </article>

                  {/* Dhunuchi */}
                  <article className="relative h-[270px] w-[220px] sm:w-[260px] overflow-hidden rounded-2xl border border-[#D4A84F]/20 group shrink-0">
                    <img
                      src={Dhunuchi}
                      alt="Dhunuchi"
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-[#FFF4DC]">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#E8C878]">02</span>
                      <h3 className="font-serif text-lg font-bold">Dhunuchi</h3>
                      <p className="text-[11px] text-white/70">Smoke & celebration.</p>
                    </div>
                  </article>

                  {/* Sindoor */}
                  <article className="relative h-[270px] w-[220px] sm:w-[260px] overflow-hidden rounded-2xl border border-[#D4A84F]/20 group shrink-0">
                    <img
                      src={Sindoor}
                      alt="Sindoor"
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-[#FFF4DC]">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#E8C878]">03</span>
                      <h3 className="font-serif text-lg font-bold">Sindoor</h3>
                      <p className="text-[11px] text-white/70">Celebration & tradition.</p>
                    </div>
                  </article>

                  {/* Pandal */}
                  <article className="relative h-[270px] w-[220px] sm:w-[260px] overflow-hidden rounded-2xl border border-[#D4A84F]/20 group shrink-0">
                    <img
                      src={Pandal}
                      alt="Pandal"
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 text-[#FFF4DC]">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#E8C878]">04</span>
                      <h3 className="font-serif text-lg font-bold">Pandal</h3>
                      <p className="text-[11px] text-white/70">Artistry & devotion.</p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PANDALS ================= */}
      <section className="bg-[#FFF4DC] px-4 sm:px-6 py-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-5 flex items-end justify-between">
          <div>
            <div className="mb-1 flex items-center gap-1.5">
              <span className="h-px w-6 bg-[#A50000]" />
              <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#A50000]">
                Featured Pandals
              </span>
            </div>

            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#181313]">
              Where will you hop next?
            </h2>
          </div>

          <Link
            to="/explore"
            className="text-xs font-bold text-[#A50000] hover:underline flex items-center gap-1"
          >
            <span>View All 62</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredPandals.map((pandal) => (
            <PandalCard key={pandal.id} pandal={pandal} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-6 text-center">
          <Link
            to="/explore"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#A50000] hover:bg-[#5A0909] text-[#FFF4DC] px-6 py-2.5 text-xs font-bold shadow-sm transition active:scale-95"
          >
            <span>Explore All 62 Pandals</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}