import React, { createContext, useContext, useState, useEffect } from "react";
import { calculateRouteStats } from "../utils/distance";
import { pandals } from "../data/pandals";
import { detectUserLocation, SILIGURI_DEFAULT } from "../utils/geolocation";

const RouteContext = createContext(null);

const STORAGE_KEY = "pujohoppers_saved_route";

export function RouteProvider({ children }) {
  const [route, setRoute] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const ids = JSON.parse(stored);
        // hydrate from current pandals dataset to stay fresh and consistent
        return ids
          .map((id) => pandals.find((p) => p.id === id || p.pandal_name === id))
          .filter(Boolean);
      }
    } catch (e) {
      console.error("Failed to parse saved route", e);
    }
    // Default initial trail: 4 central heritage pandals to immediately experience the feature
    return pandals.slice(0, 4);
  });

  const [userLocation, setUserLocation] = useState(null);
  const [isLocatingUser, setIsLocatingUser] = useState(false);

  // Auto-detect user location on mount
  useEffect(() => {
    setIsLocatingUser(true);
    detectUserLocation().then((loc) => {
      setUserLocation(loc);
      setIsLocatingUser(false);
    }).catch(() => {
      setUserLocation(SILIGURI_DEFAULT);
      setIsLocatingUser(false);
    });
  }, []);

  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      const ids = route.map((p) => p.id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch (e) {
      console.error("Failed to persist route", e);
    }
  }, [route]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const isInRoute = (pandalId) => {
    return route.some((p) => String(p.id) === String(pandalId) || p.pandal_name === pandalId);
  };

  const addToRoute = (pandal) => {
    if (!pandal) return;
    if (isInRoute(pandal.id)) {
      showToast(`Already in your route: ${pandal.pandal_name}`);
      return;
    }
    setRoute((prev) => [...prev, pandal]);
    showToast(`Added to route: ${pandal.pandal_name}`);
  };

  const removeFromRoute = (pandalId) => {
    const target = route.find((p) => String(p.id) === String(pandalId) || p.pandal_name === pandalId);
    setRoute((prev) => prev.filter((p) => String(p.id) !== String(pandalId) && p.pandal_name !== pandalId));
    if (target) {
      showToast(`Removed from route: ${target.pandal_name}`);
    }
  };

  const toggleRoute = (pandal) => {
    if (isInRoute(pandal.id)) {
      removeFromRoute(pandal.id);
    } else {
      addToRoute(pandal);
    }
  };

  const reorderRoute = (startIndex, endIndex) => {
    setRoute((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  const moveUp = (index) => {
    if (index <= 0) return;
    reorderRoute(index, index - 1);
  };

  const moveDown = (index) => {
    if (index >= route.length - 1) return;
    reorderRoute(index, index + 1);
  };

  const clearRoute = () => {
    setRoute([]);
    showToast("Route cleared");
  };

  const loadCuratedTrail = (trailPandals, trailName = "Curated Trail") => {
    if (!trailPandals || !trailPandals.length) return;
    setRoute(trailPandals);
    showToast(`Loaded ${trailName} (${trailPandals.length} pandals)`);
  };

  const stats = calculateRouteStats(route, userLocation);

  return (
    <RouteContext.Provider
      value={{
        route,
        stats,
        totalStops: route.length,
        isInRoute,
        addToRoute,
        removeFromRoute,
        toggleRoute,
        reorderRoute,
        moveUp,
        moveDown,
        clearRoute,
        loadCuratedTrail,
        toastMessage,
        userLocation,
        isLocatingUser,
      }}
    >
      {children}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:max-w-md z-50 flex items-center justify-between gap-3 bg-[#181313] text-[#FFF4DC] border border-[#D4A84F]/60 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md animate-fade-in"
        >
          <div className="flex items-center gap-2">
            <span className="text-[#D4A84F] text-lg">🪔</span>
            <span className="text-xs md:text-sm font-medium">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-[#D4A84F] text-xs font-bold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}
    </RouteContext.Provider>
  );
}

export function useRoute() {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error("useRoute must be used within a RouteProvider");
  }
  return context;
}
