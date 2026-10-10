import React, { useState, useMemo } from "react";
import { Search, X, Sparkles, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import PandalCard from "../components/PandalCard";
import { pandals, ALL_ZONES, ALL_CATEGORIES } from "../data/pandals";

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState("all");
  const [showAllLimit, setShowAllLimit] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  // Filter logic (zone and search query)
  const filteredPandals = useMemo(() => {
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
  }, [searchQuery, selectedZone]);

  // Is user actively searching or filtering?
  const isFilteringOrSearching = Boolean(searchQuery.trim() || selectedZone !== "all");

  // If user just entered (no query, no filters), display only top 20 unless expanded
  const displayedPandals = useMemo(() => {
    if (isFilteringOrSearching || showAllLimit) {
      return filteredPandals;
    }
    return filteredPandals.slice(0, 20);
  }, [filteredPandals, isFilteringOrSearching, showAllLimit]);

  const activeFiltersCount = selectedZone !== "all" ? 1 : 0;

  const resetFilters = () => {
    setSelectedZone("all");
    setSearchQuery("");
    setShowAllLimit(false);
  };

  return (
    <div className="min-h-screen bg-[#FFF4DC] text-[#181313] pt-14 md:pt-16 pb-24 md:pb-16">
      {/* Sleek, uncluttered mobile-first header */}
      <section className="bg-[#181313] text-[#FFF4DC] py-6 px-4 sm:px-6 border-b border-[#D4A84F]/20">
        <div className="max-w-6xl mx-auto space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-[2px] uppercase text-[#D4A84F]">
              Siliguri 2026 Trail
            </span>
            <span className="text-white/30">•</span>
            <span className="text-[10px] text-white/60">62 Verified Pandals</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#FFF4DC]">
            Explore Pandals
          </h1>

          <p className="text-xs text-[#FFF4DC]/70 max-w-lg">
            Search iconic mandaps by area, theme, or zone across Siliguri.
          </p>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="sticky top-14 md:top-16 z-30 bg-[#FFF4DC]/95 backdrop-blur-md border-b border-[#D4A84F]/20 py-2.5 px-4 sm:px-6 shadow-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-md">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A0909]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, area (Sevoke, Ashrampara...)"
              className="w-full h-10 pl-9 pr-8 rounded-xl bg-white border border-[#D4A84F]/40 text-xs sm:text-sm text-[#181313] placeholder-[#181313]/50 focus:outline-none focus:border-[#A50000] shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter Controls */}
          <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-2">
            {/* Filter Button */}
            <button
              onClick={() => setFilterModalOpen(true)}
              className="h-10 px-3.5 rounded-xl bg-white border border-[#D4A84F]/40 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs text-[#181313] active:scale-95"
            >
              <SlidersHorizontal size={14} className="text-[#A50000]" />
              <span>Filter Zone</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#A50000] text-white text-[9px] font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {(activeFiltersCount > 0 || searchQuery) && (
              <button
                onClick={resetFilters}
                className="h-10 px-2.5 rounded-xl bg-white border border-gray-300 text-xs text-red-700 font-medium hover:bg-gray-50 active:scale-95"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Quick status bar */}
        <div className="max-w-6xl mx-auto mt-2 flex items-center justify-between text-[11px] text-[#181313]/70">
          <span>
            {!isFilteringOrSearching && !showAllLimit
              ? `Showing top 20 pandals`
              : `Showing ${displayedPandals.length} pandals`}
          </span>

          {!isFilteringOrSearching && !showAllLimit && (
            <button
              onClick={() => setShowAllLimit(true)}
              className="text-[#A50000] font-bold hover:underline"
            >
              View all 62 pandals →
            </button>
          )}
        </div>
      </section>

      {/* Main Grid Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-5">
        {displayedPandals.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-white border border-[#D4A84F]/20 max-w-md mx-auto shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#A50000]/10 flex items-center justify-center text-2xl mx-auto mb-3">
              🪔
            </div>
            <h2 className="font-serif text-lg font-bold text-[#181313]">No pandals found</h2>
            <p className="text-xs text-[#181313]/60 mt-1 max-w-xs mx-auto">
              We couldn't find any pandal matching "{searchQuery || selectedZone}".
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 rounded-full bg-[#D62828] text-white text-xs font-bold shadow-xs active:scale-95"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedPandals.map((pandal) => (
                <PandalCard key={pandal.id} pandal={pandal} />
              ))}
            </div>

            {/* If only top 20 are shown, provide button at bottom to load all 62 */}
            {!isFilteringOrSearching && !showAllLimit && (
              <div className="text-center pt-4 pb-8">
                <button
                  onClick={() => setShowAllLimit(true)}
                  className="px-6 py-3 rounded-full bg-[#5A0909] text-[#FFF4DC] border border-[#D4A84F]/40 text-xs font-bold shadow-md hover:bg-[#A50000] active:scale-95 transition"
                >
                  Load All 62 Pandals ({pandals.length - 20} more)
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Mobile Filter Modal */}
      {filterModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end animate-fade-in"
          onClick={() => setFilterModalOpen(false)}
        >
          <div
            className="bg-[#FFFDF7] border-t-2 border-[#D4A84F] rounded-t-3xl p-5 shadow-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#D4A84F]/20">
              <h3 className="font-serif text-base font-bold text-[#181313] flex items-center gap-1.5">
                <SlidersHorizontal size={15} className="text-[#A50000]" />
                Filter Pandals
              </h3>
              <button
                onClick={() => setFilterModalOpen(false)}
                className="w-7 h-7 rounded-full bg-[#181313]/10 flex items-center justify-center text-[#181313]"
              >
                <X size={15} />
              </button>
            </div>

            {/* Zone Filter */}
            <div className="py-3 border-b border-[#D4A84F]/20 space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#5A0909] block">
                Zone ({ALL_ZONES.length})
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pt-1">
                <button
                  onClick={() => setSelectedZone("all")}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedZone === "all"
                      ? "bg-[#A50000] text-white font-bold"
                      : "bg-[#FFF4DC] text-[#181313] border border-[#D4A84F]/40"
                  }`}
                >
                  All Zones
                </button>
                {ALL_ZONES.map((zone) => (
                  <button
                    key={zone}
                    onClick={() => setSelectedZone(zone)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedZone === zone
                        ? "bg-[#A50000] text-white font-bold"
                        : "bg-[#FFF4DC] text-[#181313] border border-[#D4A84F]/40"
                    }`}
                  >
                    {zone}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 flex gap-2">
              <button
                onClick={resetFilters}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 bg-white"
              >
                Reset
              </button>
              <button
                onClick={() => setFilterModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#A50000] text-white text-xs font-bold shadow-md"
              >
                Apply ({filteredPandals.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
