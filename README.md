# PujoHoppers 🪔

A web app to discover Durga Puja pandals in Siliguri, check out their themes and locations, find pandals near you, and plan an optimized pandal-hopping trail.

<!-- PLACEHOLDER FOR SCREENSHOT 1: Home Page Hero & Carousel -->
<!-- Add a screenshot of the Home page showing the hero banner, logo, and the auto-scrolling Pujo Experience cards here -->
<!-- Example: ![PujoHoppers Home Page](screenshots/home.png) -->
<p align="center">
  <em>(📸 Screenshot 1: Home page banner & Pujo experience carousel goes here)</em>
</p>

---

## What the App Does

- **Explore 62 Pandals**: Browse verified Durga Puja committees across Siliguri with their venue addresses, zones, themes, and photos. Filter pandals quickly by zone.
- **Interactive Pujo Map**: See pandal locations marked across Siliguri using OpenStreetMap & Satellite views. Tap any marker to view details and get directions.
- **Near Me**: Detects your location (GPS or IP) and shows the 10 closest pandals to you in real time, along with distance and walking time estimates.
- **Route Planner & Circuit**: Build your custom hopping list or click **"Visit Top 20 Pandals"** to generate a trail starting from your location. The route order uses a nearest-neighbor algorithm to minimize travel distance so you do not have to double back, and calculates the total distance and estimated hopping time for bikes/two-wheelers.
- **Traditional Festive Theme**: Designed in a warm festive palette with authentic Bengali Durga Puja line illustrations (Maa Durga with Chalchitra, Dhak, Dhunuchi, and Kaash Phool) in the background.

<!-- PLACEHOLDER FOR SCREENSHOT 2: Interactive Map View -->
<!-- Add a screenshot of the Map page showing pandal markers across Siliguri here -->
<!-- Example: ![Siliguri Pujo Map](screenshots/map.png) -->
<p align="center">
  <em>(📸 Screenshot 2: Pujo Map with markers and satellite view goes here)</em>
</p>

<!-- PLACEHOLDER FOR SCREENSHOT 3: Route Planner & Top 20 Trail -->
<!-- Add a screenshot of the Route Planner page showing the Route Summary card, distance, bike duration, and stop list here -->
<!-- Example: ![Route Planner](screenshots/route_planner.png) -->
<p align="center">
  <em>(📸 Screenshot 3: Route Planner summary and optimized stops go here)</em>
</p>

---

## Tech Stack

- **React 19**
- **Vite**
- **Tailwind CSS v4**
- **React Router v7**
- **Leaflet & React-Leaflet** (Map rendering)
- **Lucide React** (Icons)

---

## Project Structure

Here is how the project files are organized:

```
Puja_Hoppers/
├── index.html               # Main HTML entry file
├── package.json             # Project dependencies and npm scripts
├── vite.config.js           # Vite build configuration
├── siliguri_pandals.json    # Dataset containing all 62 pandals (names, coordinates, addresses, themes)
└── src/
    ├── main.jsx             # React entry point
    ├── App.jsx              # Main app wrapper, route definitions, and global layout
    ├── index.css            # Global styling, Tailwind imports, custom animations
    ├── assets/              # Local image assets and website logo
    ├── components/
    │   ├── Navbar.jsx       # Top navigation bar with logo and quick links
    │   ├── Footer.jsx       # Footer with site info and links
    │   ├── MobileBottomNav.jsx # Bottom navigation bar for mobile screens
    │   ├── MapView.jsx      # Reusable Leaflet map component (markers, route lines, user pin)
    │   ├── PandalCard.jsx   # Card displaying pandal image, name, location, and actions
    │   ├── PandalPreview.jsx # Bottom sheet preview when tapping a marker on the map
    │   ├── FestiveBackground.jsx # Background illustrations (Durga, Dhak, Dhunuchi)
    │   ├── FestiveLoader.jsx# Loading spinner
    │   └── ScrollToTop.jsx  # Scrolls page to top on route change
    ├── context/
    │   └── RouteContext.jsx # State management for saving and editing custom trails in localStorage
    ├── pages/
    │   ├── Home.jsx         # Landing page with hero banner, quick cards, and infinite carousel
    │   ├── Explore.jsx      # Browse, search, and filter all 62 pandals
    │   ├── MapPage.jsx      # Full-screen interactive map with hub quick-jump buttons
    │   ├── NearMe.jsx       # Location-aware list showing the 10 closest pandals
    │   ├── RoutePlanner.jsx # Route summary with bike travel time, reordering, and Top 20 circuit
    │   ├── PandalDetails.jsx# Detailed view of a single pandal with directions
    │   └── About.jsx        # Project background and info
    └── utils/
        ├── distance.js      # Haversine distance calculations, nearest-neighbor TSP route, time estimation
        └── geolocation.js   # Browser GPS and IP-based user location detection
```

---

## Getting Started

To run this project on your local machine:

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18 or higher) installed on your computer.

### 2. Clone the repository
```bash
git clone https://github.com/codesourav0810/PujoHoppers.git
cd PujoHoppers
```

### 3. Install dependencies
```bash
npm install
```

### 4. Start the development server
```bash
npm run dev
```
Open your browser and navigate to the local URL shown in your terminal (usually `http://localhost:5173`).

### 5. Build for production
```bash
npm run build
```
This will compile and optimize the files into the `dist/` directory, ready to be deployed on Vercel, Netlify, or GitHub Pages.

---

## Adding Your Screenshots

To add real screenshots to the places marked above:
1. Create a folder named `screenshots` in the root folder.
2. Save your screenshots as:
   - `screenshots/home.png` (Home page)
   - `screenshots/map.png` (Map page)
   - `screenshots/route.png` (Route Planner page)
3. Replace the placeholder comment blocks in this README with:
   ```markdown
   ![Home Page](screenshots/home.png)
   ![Map View](screenshots/map.png)
   ![Route Planner](screenshots/route.png)
   ```

---

## License

This project is created for the community and open for Durga Puja enthusiasts.
