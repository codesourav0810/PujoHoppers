// Resilient location detection — GPS first, then IP geolocation fallback
const SILIGURI_DEFAULT = {
  lat: 26.7153,
  lng: 88.4239,
  name: "Siliguri Central (Airview More)",
  source: "default",
};

export async function detectUserLocation(onProgress = () => {}) {
  // Try Browser Geolocation (GPS / WiFi positioning)
  if (navigator.geolocation) {
    onProgress("Requesting GPS signal...");
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        });
      });

      return {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        name: "Your Live Location",
        source: "gps",
        accuracy: position.coords.accuracy,
      };
    } catch (gpsError) {
      console.warn("GPS unavailable:", gpsError.message);
      onProgress("GPS failed, trying IP location...");
    }
  }

  // Fallback: IP-based geolocation (works on desktop without GPS)
  try {
    onProgress("Detecting via IP...");
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    
    if (data.latitude && data.longitude) {
      return {
        lat: data.latitude,
        lng: data.longitude,
        name: `${data.city || "Unknown"}, ${data.region_code || ""} (IP-based)`,
        source: "ip",
        accuracy: "~50km",
      };
    }
  } catch (ipError) {
    console.warn("IP geolocation failed:", ipError.message);
  }

  // Final fallback to Siliguri Central
  onProgress("Using Siliguri Central");
  return SILIGURI_DEFAULT;
}

export { SILIGURI_DEFAULT };
