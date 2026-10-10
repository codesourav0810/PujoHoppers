import React from "react";
import { useLocation } from "react-router-dom";

/**
 * FestiveBackground replicates the exact Durga Puja decorative illustrations
 * from the user's reference screenshot:
 * - Rendered in soft #5A0909 with opacity (~0.28 - 0.35) so it stands out clearly
 *   and beautifully against the warm cream (#FFF4DC) background
 * - Upper Right: Maa Durga idol & Mukut with Chalchitra aura, Trinayana and nose ring
 * - Upper Left: Dhak drum with crossed sticks
 * - Middle Right: Dhunuchi with gracefully rising aromatic incense smoke
 * - Bottom Left / Center: Dhak drum with Kaash Phool fronds
 */
export default function FestiveBackground() {
  const location = useLocation();
  const isMapPage = location.pathname === "/map";

  if (isMapPage) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. UPPER-RIGHT: Maa Durga with ornate Chalchitra arch, Mukut, Trinayana & jewelry */}
      <div className="absolute top-2 sm:top-4 right-0 sm:right-6 md:right-16 w-84 h-96 sm:w-[440px] sm:h-[500px] md:w-[520px] md:h-[580px] opacity-[0.32] text-[#5A0909]">
        <svg
          viewBox="0 0 450 500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          {/* Outer Chalchitra Arch (Semi-circular traditional Bengali temple halo) */}
          <path
            d="M 50 320 C 50 140 370 140 370 320"
            strokeWidth="3.2"
            strokeDasharray="6 4"
          />
          <path
            d="M 65 320 C 65 155 355 155 355 320"
            strokeWidth="2"
          />
          <path
            d="M 80 320 C 80 170 340 170 340 320"
            strokeWidth="1.5"
          />

          {/* Chalchitra decorative radiating petals */}
          {[190, 205, 220, 235, 250, 265, 280, 295, 310, 325, 340, 350].map((angle, i) => (
            <circle
              key={i}
              cx={210 + 175 * Math.cos((angle * Math.PI) / 180)}
              cy={320 + 175 * Math.sin((angle * Math.PI) / 180)}
              r="4.5"
              fill="currentColor"
              fillOpacity="0.45"
            />
          ))}

          {/* Grand Bengali Mukut (Crown) */}
          <path d="M 210 50 L 210 75" strokeWidth="3.2" />
          <circle cx="210" cy="46" r="5" fill="currentColor" fillOpacity="0.7" />
          <path
            d="M 210 75 C 235 95 270 115 255 160 C 235 155 220 160 210 170 C 200 160 185 155 165 160 C 150 115 185 95 210 75 Z"
            fill="currentColor"
            fillOpacity="0.12"
            strokeWidth="2.6"
          />
          {/* Crown Inner Engravings & Tiered Tiers */}
          <path d="M 180 115 Q 210 100 240 115" strokeWidth="2.2" />
          <path d="M 170 135 Q 210 120 250 135" strokeWidth="2.2" />
          <path d="M 165 155 Q 210 140 255 155" strokeWidth="2.4" />
          <circle cx="210" cy="128" r="6" fill="currentColor" fillOpacity="0.5" />
          <circle cx="192" cy="144" r="3.5" fill="currentColor" />
          <circle cx="228" cy="144" r="3.5" fill="currentColor" />

          {/* Side Crown Wings (Korno-kunjol & Mukut extensions) */}
          <path d="M 165 140 C 130 145 110 175 125 210 C 145 195 160 185 165 165" strokeWidth="2" />
          <path d="M 255 140 C 290 145 310 175 295 210 C 275 195 260 185 255 165" strokeWidth="2" />

          {/* Forehead ornament (Maang Tikka) */}
          <path d="M 210 170 L 210 195" strokeWidth="2.8" />
          <circle cx="210" cy="198" r="5" fill="currentColor" />

          {/* Third Eye (Trinayana on Forehead) */}
          <path
            d="M 210 190 C 220 205 220 215 210 230 C 200 215 200 205 210 190 Z"
            fill="currentColor"
            fillOpacity="0.55"
            strokeWidth="2.4"
          />
          <circle cx="210" cy="210" r="3.5" fill="currentColor" />

          {/* Iconic Large Almond Eyes & Curving Eyebrows */}
          {/* Left Eyebrow & Eye */}
          <path d="M 145 215 Q 175 195 198 218" strokeWidth="3.2" />
          <path
            d="M 148 226 C 168 214 190 214 200 230 C 190 242 168 242 148 226 Z"
            fill="currentColor"
            fillOpacity="0.3"
            strokeWidth="2.8"
          />
          <circle cx="178" cy="228" r="6.5" fill="currentColor" />

          {/* Right Eyebrow & Eye */}
          <path d="M 275 215 Q 245 195 222 218" strokeWidth="3.2" />
          <path
            d="M 272 226 C 252 214 230 214 220 230 C 230 242 252 242 272 226 Z"
            fill="currentColor"
            fillOpacity="0.3"
            strokeWidth="2.8"
          />
          <circle cx="242" cy="228" r="6.5" fill="currentColor" />

          {/* Nose & Traditional Nath (Large Bengali Nose Ring with Pearls) */}
          <path d="M 210 225 L 206 260 L 214 260" strokeWidth="2.2" />
          <circle cx="196" cy="262" r="16" strokeWidth="2.2" />
          <circle cx="184" cy="272" r="4" fill="currentColor" />
          <circle cx="192" cy="277" r="3.5" fill="currentColor" />

          {/* Serene Divine Smile / Lips */}
          <path d="M 188 285 Q 210 298 232 285" strokeWidth="2.8" />
          <path d="M 194 290 Q 210 304 226 290" strokeWidth="2.2" />

          {/* Face Contour & Chin */}
          <path
            d="M 140 220 C 145 285 175 320 210 325 C 245 320 275 285 280 220"
            strokeWidth="2.2"
            strokeDasharray="4 4"
          />

          {/* Grand Layered Necklaces (Haar) */}
          <path d="M 160 330 Q 210 355 260 330" strokeWidth="2.4" />
          <path d="M 150 350 Q 210 380 270 350" strokeWidth="2.2" />
          <path d="M 140 375 Q 210 415 280 375" strokeWidth="2" />
        </svg>
      </div>

      {/* 2. UPPER-LEFT: Dhak Drum with Kathi sticks (exactly like upper-left of screenshot) */}
      <div className="absolute top-12 -left-6 sm:left-2 md:left-8 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 opacity-[0.30] text-[#5A0909]">
        <svg
          viewBox="0 0 300 300"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full transform -rotate-12"
        >
          {/* Drum Skin Head (Top) */}
          <ellipse cx="140" cy="80" rx="55" ry="22" strokeWidth="2.8" fill="currentColor" fillOpacity="0.12" />
          {/* Drum Barrel Body */}
          <path d="M 85 80 L 80 210 C 80 230 200 230 200 210 L 195 80" strokeWidth="2.8" />
          {/* Bottom Rim */}
          <ellipse cx="140" cy="210" rx="60" ry="22" strokeWidth="2.6" fill="currentColor" fillOpacity="0.12" />
          {/* Diagonal Leather Cords (Ropes) */}
          <path d="M 90 90 L 140 220 L 115 95 L 165 220 L 140 98 L 190 215 L 165 95 L 198 200" strokeWidth="2" />

          {/* Two Crossed Drum Sticks (Kathi) */}
          <path d="M 50 65 L 175 105" strokeWidth="3.8" />
          <circle cx="48" cy="64" r="5.5" fill="currentColor" />
          <path d="M 220 55 L 110 110" strokeWidth="3.8" />
          <circle cx="222" cy="54" r="5.5" fill="currentColor" />

          {/* Feather Plume Accent (Chomor) */}
          <path d="M 185 75 C 215 50 240 65 245 45 C 235 75 215 85 190 80" fill="currentColor" fillOpacity="0.25" />
        </svg>
      </div>

      {/* 3. MIDDLE-RIGHT: Dhunuchi with gracefully rising incense smoke (matches screenshot right side behind buttons) */}
      <div className="absolute top-[280px] sm:top-[260px] right-2 sm:right-6 md:right-12 w-44 h-64 sm:w-56 sm:h-80 opacity-[0.32] text-[#5A0909]">
        <svg
          viewBox="0 0 240 340"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full"
        >
          {/* Dhunuchi Incense Burner Vessel */}
          <ellipse cx="120" cy="180" rx="60" ry="20" strokeWidth="2.8" fill="currentColor" fillOpacity="0.14" />
          {/* Vessel Bowl to Stem */}
          <path
            d="M 60 180 C 65 220 105 235 110 255 L 110 290 L 95 305 L 145 305 L 130 290 L 130 255 C 135 235 175 220 180 180"
            strokeWidth="2.8"
          />
          {/* Base Rim */}
          <ellipse cx="120" cy="305" rx="28" ry="8" strokeWidth="2.4" fill="currentColor" fillOpacity="0.2" />
          {/* Traditional Handle */}
          <path d="M 110 260 C 75 260 60 285 55 300 C 70 305 95 295 110 275" strokeWidth="3" />

          {/* Burning coconut husks / incense inside */}
          <path d="M 80 176 Q 100 160 120 176 Q 140 160 160 176" fill="currentColor" fillOpacity="0.35" strokeWidth="1.8" />

          {/* Beautiful Rising Incense Smoke Plumes (distinctive wavy curves) */}
          <path
            d="M 120 155 C 105 125 145 105 125 75 C 105 50 140 25 120 5"
            strokeWidth="2.5"
            strokeDasharray="4 3"
          />
          <path
            d="M 140 155 C 160 130 130 100 155 70 C 175 45 145 20 160 5"
            strokeWidth="2"
          />
          <path
            d="M 100 160 C 85 135 115 110 95 85 C 80 60 110 35 95 15"
            strokeWidth="1.6"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* 4. BOTTOM-LEFT: Second Dhak Drum & Kaash Phool (matches bottom-left of screenshot) */}
      <div className="absolute bottom-8 -left-4 sm:left-4 md:left-10 w-52 h-52 sm:w-68 sm:h-68 md:w-80 md:h-80 opacity-[0.30] text-[#5A0909]">
        <svg
          viewBox="0 0 320 320"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full transform rotate-6"
        >
          {/* Dhak Drum */}
          <ellipse cx="160" cy="90" rx="60" ry="24" strokeWidth="2.8" fill="currentColor" fillOpacity="0.12" />
          <path d="M 100 90 L 95 230 C 95 255 225 255 225 230 L 220 90" strokeWidth="2.8" />
          <ellipse cx="160" cy="230" rx="65" ry="24" strokeWidth="2.6" fill="currentColor" fillOpacity="0.12" />
          <path d="M 105 100 L 160 240 L 130 105 L 185 240 L 155 108 L 215 235 L 185 105 L 222 220" strokeWidth="2" />

          {/* Kathi Sticks */}
          <path d="M 60 75 L 195 115" strokeWidth="3.8" />
          <circle cx="58" cy="74" r="5.5" fill="currentColor" />
          <path d="M 250 65 L 130 125" strokeWidth="3.8" />
          <circle cx="252" cy="64" r="5.5" fill="currentColor" />

          {/* Kaash Phool / Autumn Grass Fronds behind drum */}
          <path d="M 40 310 Q 70 210 100 140" strokeWidth="2" />
          <path d="M 100 140 Q 120 120 140 125" strokeWidth="1.6" opacity="0.9" />
          <path d="M 90 165 Q 110 145 130 150" strokeWidth="1.6" opacity="0.9" />
          <path d="M 55 315 Q 85 235 115 170" strokeWidth="1.8" />
        </svg>
      </div>

      {/* 5. Subtlest Bengali Alpana corner border accents */}
      <div className="absolute -top-12 -left-12 w-48 h-48 opacity-[0.18] text-[#5A0909]">
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-full h-full">
          <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="70" strokeWidth="1.8" />
          <circle cx="50" cy="50" r="100" strokeWidth="1.4" strokeDasharray="6 6" />
        </svg>
      </div>
    </div>
  );
}
