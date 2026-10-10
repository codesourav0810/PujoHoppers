// Haversine formula to calculate great-circle distance between two points in km
export function getDistanceKm(lat1, lon1, lat2, lon2) {
  if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) return null;

  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

function toRad(degrees) {
  return (degrees * Math.PI) / 180;
}

// Format distance cleanly: e.g. "450 m" or "2.4 km"
export function formatDistance(km) {
  if (km == null || isNaN(km)) return "";
  if (km < 1) {
    const meters = Math.round(km * 1000);
    return `${meters} m`;
  }
  return `${km.toFixed(1)} km`;
}

// Estimated two-wheeler / bike travel time in minutes (~3.5 mins per km in city festival traffic)
export function getBikeTimeMinutes(km) {
  if (km == null || isNaN(km)) return 0;
  return Math.max(1, Math.round(km * 3.5));
}

// Estimated walking time in minutes (~12 mins per km in festival crowd)
export function getWalkingTimeMinutes(km) {
  if (km == null || isNaN(km)) return 0;
  return Math.max(1, Math.round(km * 13));
}

// Format duration
export function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} mins`;
  const hrs = Math.floor(minutes / 60);
  const rem = minutes % 60;
  return rem > 0 ? `${hrs}h ${rem}m` : `${hrs}h`;
}

// Return pandals sorted by distance from specified coordinates
export function getPandalsSortedByDistance(pandalsList, userLat, userLng) {
  if (!userLat || !userLng) return pandalsList;

  return pandalsList
    .map((pandal) => {
      const distance = getDistanceKm(userLat, userLng, pandal.latitude, pandal.longitude);
      return {
        ...pandal,
        distance,
        formattedDistance: formatDistance(distance),
        walkingMinutes: getWalkingTimeMinutes(distance),
        bikeMinutes: getBikeTimeMinutes(distance),
      };
    })
    .sort((a, b) => (a.distance || 0) - (b.distance || 0));
}

// Calculate total sequential distance for a list of route stops
export function calculateRouteStats(routePandals) {
  if (!routePandals || routePandals.length < 2) {
    return {
      totalDistanceKm: 0,
      formattedTotalDistance: "0 km",
      estimatedTimeMinutes: 0,
      bikeTravelMinutes: 0,
      legs: [],
    };
  }

  let totalDistance = 0;
  const legs = [];

  for (let i = 0; i < routePandals.length - 1; i++) {
    const p1 = routePandals[i];
    const p2 = routePandals[i + 1];
    const legDist = getDistanceKm(p1.latitude, p1.longitude, p2.latitude, p2.longitude);
    totalDistance += legDist;
    legs.push({
      from: p1,
      to: p2,
      distanceKm: legDist,
      formattedDistance: formatDistance(legDist),
      walkingMinutes: getWalkingTimeMinutes(legDist),
      bikeMinutes: getBikeTimeMinutes(legDist),
    });
  }

  const bikeTravelMinutes = Math.round(totalDistance * 3.5);
  // Bike travel + 12-15 mins darshan per pandal
  const estimatedTimeMinutes = bikeTravelMinutes + routePandals.length * 12;

  return {
    totalDistanceKm: totalDistance,
    formattedTotalDistance: formatDistance(totalDistance),
    estimatedTimeMinutes,
    bikeTravelMinutes,
    legs,
  };
}

/**
 * Greedy Nearest-Neighbor TSP
 * Starts at userLat/userLng, then at each step picks the closest *unvisited*
 * pandal from the *current* position (not the user origin).
 * This prevents backtracking and produces the shortest sequential path
 * through all pandals in the given list.
 *
 * @param {number} userLat
 * @param {number} userLng
 * @param {Array}  pandalsList  — the exact set of pandals to route through
 * @returns {Array} ordered array of pandals (closest-to-furthest chain)
 */
export function buildNearestNeighborRoute(userLat, userLng, pandalsList) {
  if (!userLat || !userLng || !pandalsList?.length) return pandalsList || [];

  const unvisited = pandalsList.map((p) => ({ ...p }));
  const ordered = [];
  let currentLat = userLat;
  let currentLng = userLng;

  while (unvisited.length > 0) {
    let nearestIdx = 0;
    let minDist = Infinity;

    for (let i = 0; i < unvisited.length; i++) {
      const d = getDistanceKm(
        currentLat,
        currentLng,
        unvisited[i].latitude,
        unvisited[i].longitude
      );
      if (d !== null && d < minDist) {
        minDist = d;
        nearestIdx = i;
      }
    }

    const next = unvisited.splice(nearestIdx, 1)[0];
    ordered.push(next);
    currentLat = next.latitude;
    currentLng = next.longitude;
  }

  return ordered;
}


// Build an optimized Top 20 circuit starting from the user's location
export function buildTop20Circuit(userLat, userLng, pandalsList) {
  if (!userLat || !userLng || !pandalsList || pandalsList.length === 0) {
    return null;
  }

  // 1. Get 20 closest pandals to user
  const sorted = getPandalsSortedByDistance(pandalsList, userLat, userLng);
  const candidatePool = sorted.slice(0, 20);

  // 2. Order them using nearest-neighbor chain starting from user position
  const unvisited = [...candidatePool];
  const orderedStops = [];
  let currentLat = userLat;
  let currentLng = userLng;
  let totalDistanceKm = 0;
  const legs = [];

  while (unvisited.length > 0) {
    let nearestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < unvisited.length; i++) {
      const d = getDistanceKm(currentLat, currentLng, unvisited[i].latitude, unvisited[i].longitude);
      if (d < minDistance) {
        minDistance = d;
        nearestIndex = i;
      }
    }

    const nextPandal = unvisited.splice(nearestIndex, 1)[0];
    totalDistanceKm += minDistance;

    legs.push({
      fromCoord: [currentLat, currentLng],
      toPandal: nextPandal,
      distanceKm: minDistance,
      formattedDistance: formatDistance(minDistance),
    });

    orderedStops.push(nextPandal);
    currentLat = nextPandal.latitude;
    currentLng = nextPandal.longitude;
  }

  // Full polyline starting from user position through all 20 stops
  const polyline = [
    [userLat, userLng],
    ...orderedStops.map((p) => [p.latitude, p.longitude]),
  ];

  // Estimation:
  // Walking travel time: ~12 min / km
  // Transit / Auto time in festival traffic: ~4 min / km
  // Pandal Darshan / Visit time: ~12-15 min per pandal (20 * 12 = 240 mins)
  const walkingTravelMinutes = Math.round(totalDistanceKm * 12);
  const autoTravelMinutes = Math.round(totalDistanceKm * 4);
  const darshanMinutes = orderedStops.length * 12; // 240 mins

  const totalHopMinutes = autoTravelMinutes + darshanMinutes;

  return {
    stops: orderedStops,
    polyline,
    totalStops: orderedStops.length,
    totalDistanceKm,
    formattedTotalDistance: formatDistance(totalDistanceKm),
    initialDistanceToFirstStop: legs[0]?.formattedDistance || "0 km",
    travelTimeWalking: formatDuration(walkingTravelMinutes),
    travelTimeAuto: formatDuration(autoTravelMinutes),
    totalHopDuration: formatDuration(totalHopMinutes),
    legs,
  };
}
