import React from 'react';

// --- 1. HEATMAP WITH ZONES (Pineapple, Orange, Grapes, Mango) ---
export const DnaHeatmap = () => (
  <svg viewBox="0 0 500 800" className="w-full h-full absolute inset-0 opacity-80 pointer-events-none" preserveAspectRatio="none">
    <defs>
      <radialGradient id="heatCore" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#F97316" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
      <pattern id="dnaGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#222" strokeWidth="0.5"/>
      </pattern>
    </defs>
    
    {/* Base */}
    <rect width="100%" height="100%" fill="#020202" />
    <rect width="100%" height="100%" fill="url(#dnaGrid)" opacity="0.5" />

    {/* --- ZONE 1: LOVE (PINEAPPLE) - YELLOW/GOLD --- */}
    <circle cx="250" cy="250" r="120" fill="#EAB308" fillOpacity="0.15" style={{ filter: 'blur(50px)' }} />
    <text x="250" y="250" textAnchor="middle" fill="#EAB308" fontSize="14" fontWeight="900" letterSpacing="2" opacity="0.8">PINEAPPLE (LOVE)</text>

    {/* --- ZONE 2: FRIENDS (ORANGE) - ORANGE --- */}
    <circle cx="100" cy="500" r="100" fill="#F97316" fillOpacity="0.15" style={{ filter: 'blur(40px)' }} />
    <text x="100" y="500" textAnchor="middle" fill="#F97316" fontSize="12" fontWeight="900" letterSpacing="1" opacity="0.7">ORANGE (FRIENDS)</text>

    {/* --- ZONE 3: COMMUNITY (GRAPES) - PURPLE --- */}
    <circle cx="400" cy="600" r="110" fill="#A855F7" fillOpacity="0.15" style={{ filter: 'blur(40px)' }} />
    <text x="400" y="600" textAnchor="middle" fill="#A855F7" fontSize="12" fontWeight="900" letterSpacing="1" opacity="0.7">GRAPES (COMMUNITY)</text>

    {/* --- ZONE 4: RAINBOW (MANGO) - CYAN/MULTI --- */}
    <circle cx="250" cy="700" r="80" fill="#22D3EE" fillOpacity="0.1" style={{ filter: 'blur(30px)' }} />
    <text x="250" y="700" textAnchor="middle" fill="#22D3EE" fontSize="10" fontWeight="900" letterSpacing="1" opacity="0.6">MANGO (RAINBOW)</text>

    {/* Paths connecting them */}
    <path d="M 250,250 L 100,500 L 400,600 Z" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="5,5" fill="none" />

    {/* Active Nodes */}
    <circle cx="250" cy="250" r="4" fill="#EAB308"><animate attributeName="r" values="4;8;4" dur="3s" repeatCount="indefinite"/></circle>
    <circle cx="100" cy="500" r="3" fill="#F97316" />
    <circle cx="400" cy="600" r="3" fill="#A855F7" />
  </svg>
);

// --- 2. IMAGE RADAR (Levý radar - Intent) ---
export const ImageRadar = ({ className }: { className?: string }) => (
<svg viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
  <circle cx="400" cy="225" r="150" stroke="#22D3EE" strokeWidth="1" opacity="0.2"/>
  <circle cx="400" cy="225" r="100" stroke="#22D3EE" strokeWidth="1" opacity="0.4"/>
  <circle cx="400" cy="225" r="50" stroke="#22D3EE" strokeWidth="1" opacity="0.6"/>
  <path d="M400 225 L550 225 A150 150 0 0 1 400 375" fill="url(#scanGradient)" opacity="0.3">
    <animateTransform attributeName="transform" type="rotate" from="0 400 225" to="360 400 225" dur="4s" repeatCount="indefinite"/>
  </path>
  <defs>
    <linearGradient id="scanGradient" x1="400" y1="225" x2="550" y2="225" gradientUnits="userSpaceOnUse">
      <stop stopColor="#22D3EE" stopOpacity="0"/>
      <stop offset="1" stopColor="#22D3EE"/>
    </linearGradient>
  </defs>
</svg>
);