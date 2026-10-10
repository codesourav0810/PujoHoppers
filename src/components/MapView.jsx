import React, { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default marker icons if ever accessed
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Create custom PujoHoppers marker
function createPandalIcon(isSelected = false, numberBadge = null) {
  const iconHtml = `
    <div class="pujo-marker ${isSelected ? "active" : ""}">
      ${isSelected ? '<div class="pujo-pulse-ring"></div>' : ""}
      <div class="pujo-marker-pin" style="${
        isSelected
          ? "background: #FFF4DC; color: #A50000; border: 2.5px solid #D62828;"
          : "background: radial-gradient(circle at 35% 35%, #D62828 0%, #A50000 65%, #5A0909 100%); border: 2px solid #D4A84F;"
      }">
        ${
          numberBadge !== null
            ? `<span style="font-size: 11px; font-weight: 800;">${numberBadge}</span>`
            : `<span style="font-size: 12px; line-height: 1;">🪔</span>`
        }
      </div>
    </div>
  `;

  return L.divIcon({
    className: "custom-pujo-div-icon",
    html: iconHtml,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
}

// User location icon (Google Maps style blue circle with pulse)
function createUserIcon() {
  return L.divIcon({
    className: "custom-user-div-icon",
    html: `
      <div style="position: relative; display: flex; align-items: center; justify-content: center;">
        <div class="user-pulse-ring"></div>
        <div class="user-marker-pin"></div>
      </div>
    `,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

// Distance badge icon along path legs
function createDistanceBadgeIcon(text) {
  return L.divIcon({
    className: "custom-distance-badge-icon",
    html: `
      <div style="
        background: rgba(24, 19, 19, 0.92);
        color: #FFF4DC;
        border: 1.5px solid #1A73E8;
        padding: 1px 6px;
        border-radius: 9999px;
        font-size: 10px;
        font-weight: 700;
        white-space: nowrap;
        box-shadow: 0 2px 6px rgba(0,0,0,0.4);
        transform: translate(-50%, -50%);
        pointer-events: none;
      ">
        ${text}
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

// MapController for smooth view panning & invalidateSize
function MapController({ center, zoom, selectedPandal, routeBounds }) {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [map]);

  useEffect(() => {
    if (selectedPandal && selectedPandal.latitude && selectedPandal.longitude) {
      map.flyTo([selectedPandal.latitude, selectedPandal.longitude], Math.max(map.getZoom(), 15), {
        animate: true,
        duration: 0.8,
      });
    } else if (routeBounds && routeBounds.length > 1) {
      map.fitBounds(routeBounds, { padding: [50, 50], maxZoom: 16 });
    } else if (center) {
      map.flyTo(center, zoom || 14, {
        animate: true,
        duration: 0.8,
      });
    }
  }, [center, zoom, selectedPandal, routeBounds, map]);

  return null;
}

export default function MapView({
  pandals = [],
  selectedPandal = null,
  onSelectPandal = () => {},
  userLocation = null,
  center = [26.715, 88.423], // Center of Siliguri
  zoom = 14,
  routePolyline = null,
  legBadges = [], // array of { position: [lat, lng], text: "450 m" }
  numberedMarkers = false,
  tileTheme = "satellite", // "satellite" (default) or "street"
  className = "w-full h-full",
}) {
  const defaultPandalIcon = useMemo(() => createPandalIcon(false), []);
  const selectedPandalIcon = useMemo(() => createPandalIcon(true), []);
  const userIcon = useMemo(() => createUserIcon(), []);

  // Free high-resolution Satellite Imagery (Esri World Imagery)
  const SATELLITE_TILES =
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
  // Reference street and place labels overlay on satellite imagery
  const SATELLITE_LABELS =
    "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}";
  // Clean standard OpenStreetMap street tiles
  const STREET_TILES = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

  const isSatellite = tileTheme !== "street";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        zoomControl={false}
        className="w-full h-full"
      >
        {isSatellite ? (
          <>
            {/* Real Satellite View */}
            <TileLayer
              attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              url={SATELLITE_TILES}
              maxZoom={19}
            />
            {/* Transparent Labels Overlay for roads and landmarks */}
            <TileLayer
              attribution=""
              url={SATELLITE_LABELS}
              maxZoom={19}
              opacity={0.85}
            />
          </>
        ) : (
          /* Normal Light Street View */
          <TileLayer
            attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={STREET_TILES}
            maxZoom={19}
          />
        )}

        <MapController
          center={center}
          zoom={zoom}
          selectedPandal={selectedPandal}
          routeBounds={routePolyline}
        />

        {/* User location marker if available */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Tooltip direction="top" offset={[0, -10]} opacity={0.9} permanent={false}>
              <span className="font-bold text-xs text-blue-600">Your Location</span>
            </Tooltip>
          </Marker>
        )}

        {/* Plain Solid Blue Route Line like Google Maps */}
        {routePolyline && routePolyline.length > 1 && (
          <>
            {/* Subtle dark blue border for high contrast on satellite view */}
            <Polyline
              positions={routePolyline}
              pathOptions={{
                color: "#0B3C7A",
                weight: 7,
                opacity: 0.6,
                lineCap: "round",
                lineJoin: "round",
              }}
            />
            {/* Solid vibrant Google Maps blue line */}
            <Polyline
              positions={routePolyline}
              pathOptions={{
                color: "#1A73E8",
                weight: 5,
                opacity: 1,
                lineCap: "round",
                lineJoin: "round",
              }}
            />
          </>
        )}

        {/* Distance badges along the legs */}
        {legBadges &&
          legBadges.map((badge, i) => (
            <Marker
              key={`leg-badge-${i}`}
              position={badge.position}
              icon={createDistanceBadgeIcon(badge.text)}
              interactive={false}
            />
          ))}

        {/* Pandal Markers */}
        {pandals.map((pandal, idx) => {
          if (!pandal.latitude || !pandal.longitude) return null;
          const isSelected = selectedPandal && String(selectedPandal.id) === String(pandal.id);
          const icon = isSelected
            ? selectedPandalIcon
            : numberedMarkers
            ? createPandalIcon(false, idx + 1)
            : defaultPandalIcon;

          return (
            <Marker
              key={pandal.id || idx}
              position={[pandal.latitude, pandal.longitude]}
              icon={icon}
              eventHandlers={{
                click: () => onSelectPandal(pandal),
              }}
            >
              <Tooltip direction="top" offset={[0, -14]} opacity={0.95}>
                <div className="text-center">
                  <p className="font-bold text-xs leading-tight">{pandal.pandal_name}</p>
                  <p className="text-[10px] text-gray-500">{pandal.area}</p>
                </div>
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
