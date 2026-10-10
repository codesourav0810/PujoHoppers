import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { RouteProvider } from "./context/RouteContext";
import Navbar from "./components/Navbar";
import MobileBottomNav from "./components/MobileBottomNav";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import FestiveLoader from "./components/FestiveLoader";
import FestiveBackground from "./components/FestiveBackground";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Explore = lazy(() => import("./pages/Explore"));
const PandalDetails = lazy(() => import("./pages/PandalDetails"));
const MapPage = lazy(() => import("./pages/MapPage"));
const NearMe = lazy(() => import("./pages/NearMe"));
const RoutePlanner = lazy(() => import("./pages/RoutePlanner"));
const About = lazy(() => import("./pages/About"));

function AppContent() {
  const location = useLocation();
  const isMapPage = location.pathname === "/map";

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FFF4DC] text-[#181313]">
      <ScrollToTop />
      <FestiveBackground />
      <Navbar />

      <div className="relative z-10 flex-1">
        <Suspense fallback={<FestiveLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/pandal/:id" element={<PandalDetails />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/near-me" element={<NearMe />} />
            <Route path="/routes" element={<RoutePlanner />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </div>

      {!isMapPage && <Footer />}
      <MobileBottomNav />
    </div>
  );
}

export default function App() {
  return (
    <RouteProvider>
      <Router>
        <AppContent />
      </Router>
    </RouteProvider>
  );
}
