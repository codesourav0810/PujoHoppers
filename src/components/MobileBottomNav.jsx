import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Compass, Map, Navigation, Route } from "lucide-react";
import { useRoute } from "../context/RouteContext";

export default function MobileBottomNav() {
  const location = useLocation();
  const { totalStops } = useRoute();

  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Explore", path: "/explore", icon: Compass },
    { label: "Map", path: "/map", icon: Map },
    { label: "Near Me", path: "/near-me", icon: Navigation },
    { label: "Route", path: "/routes", icon: Route, badge: totalStops > 0 ? totalStops : null },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#181313]/95 border-t border-[#D4A84F]/30 backdrop-blur-lg pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center justify-center h-full min-h-[44px] transition active:scale-95 ${
                isActive ? "text-[#FFF4DC]" : "text-[#FFF4DC]/50 hover:text-[#FFF4DC]/80"
              }`}
            >
              {isActive && (
                <span className="absolute top-0 w-8 h-[2px] bg-[#D62828] shadow-[0_0_8px_#D62828] rounded-full" />
              )}
              <div className="relative">
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.3 : 1.8}
                  className={`transition-colors ${isActive ? "text-[#D4A84F]" : "text-[#FFF4DC]/60"}`}
                />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-[16px] px-1 flex items-center justify-center text-[9px] font-bold bg-[#D62828] text-white rounded-full border border-[#181313]">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] mt-1 font-medium tracking-tight ${
                  isActive ? "text-[#FFF4DC] font-bold" : "text-[#FFF4DC]/60"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
