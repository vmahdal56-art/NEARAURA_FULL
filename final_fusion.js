const fs = require('fs');
const path = require('path');

console.log("🛡️ NEARAURA GOD PROJECT: FINAL FUSION (UI/UX + LOGIC + ASSETS)...");
console.log("⚠️  CÍL: Sloučení vaší grafiky (Neon/Glass) s DNA logikou.");

function write(filePath, content) {
    const fullPath = path.join(process.cwd(), filePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content.trim());
    console.log(`✅ Zapsáno: ${filePath}`);
}

// -----------------------------------------------------------------------------
// 1. INDEX.CSS (FORENZNÍ SLOUČENÍ)
// -----------------------------------------------------------------------------
// Zahrnuje vaše původní třídy (glass-panel) + nové DNA animace.
const cssContent = `
/* ---------------------------------------------------------
   🔱 SOVEREIGN TYPOGRAPHY
   --------------------------------------------------------- */
   @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   
   :root {
     --color-brand-orange: #F97316;
     --color-brand-cyan: #22D3EE;
     --color-brand-gold: #D4AF37;
     --bg-black: #060709;
   }
   
   html { scroll-behavior: smooth; height: 100%; background-color: var(--bg-black); }
   body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; background-color: var(--bg-black); color: white; overflow-x: hidden; touch-action: pan-y; }
   
   /* SCROLLBARS */
   ::-webkit-scrollbar { width: 8px; height: 8px; }
   ::-webkit-scrollbar-track { background: #0a0a0a; border-left: 1px solid rgba(255, 255, 255, 0.05); }
   ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; border: 1px solid rgba(0,0,0,0.5); }
   ::-webkit-scrollbar-thumb:hover { background: var(--color-brand-orange); }
   
   /* UTILITIES (From your Live Code) */
   .glass-panel { background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.1); }
   .neon-glow-cyan { box-shadow: 0 0 20px rgba(34, 211, 238, 0.2); }
   .neon-glow-orange { box-shadow: 0 0 20px rgba(249, 115, 22, 0.2); }
   .rounded-full-fix { -webkit-mask-image: -webkit-radial-gradient(white, black); }

   /* ANIMATIONS (Missing DNA) */
   .typing-effect { overflow: hidden; white-space: nowrap; border-right: 2px solid var(--color-brand-orange); animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite; }
   @keyframes typing { from { width: 0 } to { width: 100% } }
   @keyframes blink-caret { from, to { border-color: transparent } 50% { border-color: var(--color-brand-orange) } }

   @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
   .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
   
   .animate-marquee { animation: marquee 25s linear infinite; }
   @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-100%); } }
   
   .animate-spin-slow { animation: spin 10s linear infinite; }
   @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
`;
write('web/src/index.css', cssContent);

// -----------------------------------------------------------------------------
// 2. TAILWIND CONFIG (PODPORA PRO VAŠE BARVY)
// -----------------------------------------------------------------------------
write('web/tailwind.config.js', `
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#060709",
        cyan: { DEFAULT: "#22D3EE", dim: "rgba(34, 211, 238, 0.1)" },
        sovereign: "#D4AF37",
        // Zachování vašich custom barev
        aura: {
           cyan: '#22D3EE',
           violet: '#8B5CF6',
           pink: '#EC4899',
           orange: '#F97316',
           black: '#0A0A0C',
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
        mono: ['"Courier New"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
`);

// -----------------------------------------------------------------------------
// 3. MAIN.TSX (ČISTÝ START)
// -----------------------------------------------------------------------------
write('web/src/main.tsx', `
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`);

// -----------------------------------------------------------------------------
// 4. INDEX.HTML (HLAVIČKA)
// -----------------------------------------------------------------------------
write('web/index.html', `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="theme-color" content="#060709" />
    <title>NEARAURA | Sovereign Vault</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`);

// -----------------------------------------------------------------------------
// 5. APP.TSX (SKELET S DATY)
// -----------------------------------------------------------------------------
// Protože váš kód v chatu byl obrovský a nekompletní (useknutý),
// vytvořím App.tsx, který obsahuje VŠECHNA POTŘEBNÁ DATA (Matrix, Radar, etc.)
// a navodím vás, kam vložit ten zbytek.

const appSkeleton = `
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  Twitter, Instagram, Music, Youtube, Facebook, Linkedin, Wind, MessageCircle, 
  Send, Siren, Brain, Info, Check, X, ShoppingCart, Apple, Smartphone, Ghost, 
  ArrowLeft, Fingerprint, Zap, Lock, ShieldCheck, Heart, MapPin, ShieldAlert, Crown, XCircle, Signal, Wifi, Battery 
} from 'lucide-react';

// --- 1. DNA DATA INJECTION (NUTNÉ PRO BĚH APLIKACE) ---
const ASSETS = {
  logo: "https://firebasestorage.googleapis.com/v0/b/huddleme-staging.appspot.com/o/assets%2Flogo.png?alt=media",
  jarmila: "https://firebasestorage.googleapis.com/v0/b/huddleme-staging.appspot.com/o/assets%2Fjarmila.jpg?alt=media",
  hero_overlay: "https://firebasestorage.googleapis.com/v0/b/huddleme-staging.appspot.com/o/assets%2Foverlay.png?alt=media",
  orbit_bg: "https://firebasestorage.googleapis.com/v0/b/huddleme-staging.appspot.com/o/assets%2Forbit.png?alt=media",
  heatmap_path: "https://firebasestorage.googleapis.com/v0/b/huddleme-staging.appspot.com/o/assets%2Fheatmap.png?alt=media",
  noise_texture: "https://firebasestorage.googleapis.com/v0/b/huddleme-staging.appspot.com/o/assets%2Fnoise.png?alt=media"
};

const INITIALS = "JV JM PM LA PM LH YM VM";
const AXIOM = { motto: "Truth and love must prevail over lies and hatred" };

const MATRIX_FEATURES = [
  { name: "View Orchard", t1: true, t2: true, t3: true, t4: true, t5: true, t6: true },
  { name: "Manifesto Access", t1: true, t2: true, t3: true, t4: true, t5: true, t6: true },
  { name: "Sovereign Badge", t1: false, t2: false, t3: false, t4: true, t5: true, t6: true },
  { name: "Global Radar", t1: false, t2: false, t3: false, t4: true, t5: true, t6: true },
  { name: "NNN Vault", t1: false, t2: false, t3: false, t4: true, t5: true, t6: true },
  { name: "Revenue Share", t1: false, t2: false, t3: false, t4: false, t5: "40x", t6: "∞" }
];

const ORCHARD_DATA = [
  { id: 'hendy', label: 'Hendy', color: 'text-[#D4AF37]', border: 'border-[#D4AF37]', icon: '👑', desc: 'Highest Integrity', mix: 'All', ban: 'Lies' },
  { id: 'pineapple', label: 'Pineapple', color: 'text-[#FBBF24]', border: 'border-[#FBBF24]', icon: '🍍', desc: 'Serious Intent', mix: 'Adult', ban: 'Flakes' },
  { id: 'pear', label: 'Pear', color: 'text-[#10B981]', border: 'border-[#10B981]', icon: '🍐', desc: 'Family/Married', mix: 'Similar', ban: 'Singles' },
  { id: 'mango', label: 'Mango', color: 'text-[#EC4899]', border: 'border-[#EC4899]', icon: '🥭', desc: 'Fluid Gateway', mix: 'Open', ban: 'Hate' },
  { id: 'banana', label: 'Banana', color: 'text-[#F97316]', border: 'border-[#F97316]', icon: '🍌', desc: 'Intimacy M', mix: 'Peach', ban: 'Minors' },
  { id: 'peach', label: 'Peach', color: 'text-[#FDA4AF]', border: 'border-[#FDA4AF]', icon: '🍑', desc: 'Intimacy F', mix: 'Banana', ban: 'Minors' },
  { id: 'orange', label: 'Orange', color: 'text-[#F97316]', border: 'border-[#F97316]', icon: '🍊', desc: 'Friendship', mix: 'All', ban: 'Drama' },
  { id: 'grape', label: 'Grape', color: 'text-[#8B5CF6]', border: 'border-[#8B5CF6]', icon: '🍇', desc: 'Work/Group', mix: 'Pro', ban: 'Lazy' },
  { id: 'coconut', label: 'Coconut', color: 'text-[#E5E5E5]', border: 'border-[#E5E5E5]', icon: '🥥', desc: 'Help/Service', mix: 'Need', ban: 'Greed' },
  { id: 'melon', label: 'Melon', color: 'text-[#EF4444]', border: 'border-[#EF4444]', icon: '🍉', desc: 'Hobby/Sport', mix: 'Active', ban: 'Bored' },
  { id: 'cherry', label: 'Cherry', color: 'text-[#BE123C]', border: 'border-[#BE123C]', icon: '🍒', desc: 'Meet Now', mix: 'Local', ban: 'Ghost' },
  { id: 'youth', label: 'Youth', color: 'text-[#22D3EE]', border: 'border-[#22D3EE]', icon: '👶', desc: 'Kids Aura (0-15)', mix: 'Safe', ban: 'Adults' }
];

const RADAR_USERS = [
  { id: 1, x: 20, y: 30, intent: '👑', score: 98 },
  { id: 2, x: 70, y: 50, intent: '🍍', score: 85 },
  { id: 3, x: 40, y: 80, intent: '🥭', score: 92 },
  { id: 4, x: 80, y: 20, intent: '🍌', score: 45 }
];

const GENESIS_POINTS = [
  { id: "01", t: "TRUTH", d: "No filters. No algorithm manipulation. Pure data sovereignty." },
  { id: "02", t: "LOVE", d: "Connection over consumption. We build bridges, not walls." },
  { id: "03", t: "HONOR", d: "Respect the code. Respect the legacy. Respect Jarmila." },
  { id: "04", t: "DUTY", d: "Protect the vulnerable. Serve the mission. Hold the line." }
];

const DIRECTOR_FULL_TEXT = [
  { type: 'h3', text: "The Vision" },
  { type: 'p', text: "I built this because I was tired of being a product. I wanted a tool, not a trap." },
  { type: 'h2', text: "The Promise" },
  { type: 'p', text: "We will never sell your data. We will never manipulate your emotions." }
];

const FAQ_DATA = [
  { q: "Is this free?", a: "Visitor mode is free. Sovereign features require a pledge." },
  { q: "Why Jarmila Fund?", a: "To heal the digital wounds we all carry." },
  { q: "How do I verify?", a: "Biometric handshake and 3-second intent lock." }
];

const FOOTER_LINKS = [
  { title: "Protocol", links: ["Manifesto", "Whitepaper", "Source Code"] },
  { title: "Community", links: ["Discord", "Events", "Founders"] },
  { title: "Legal", links: ["Privacy", "Terms", "GDPR"] }
];

const MANIFESTO_CONTENT = {
  'default': [
    { type: 'h2', text: "PROTOCOL OMEGA" },
    { type: 'p', text: "The sovereign individual requires no permission to exist." }
  ],
  'hendy': [
    { type: 'h2', text: "963Hz: THE ROYAL FREQUENCY" },
    { type: 'p', text: "Highest integrity. Absolute truth. No compromise." }
  ]
};

// --- 2. ZDE VLOŽTE VÁŠ KÓD KOMPONENT ---
// (ScrollToTop, SocialDock, SovereignHome...)
// Zkopírujte sem ten dlouhý blok, který jste mi poslal v chatu.

// PROZATÍMNÍ PLACEHOLDER (Aby aplikace naběhla a vy viděl, že to funguje):
const SovereignHome = () => (
  <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center flex-col">
    <h1 className="text-5xl font-black text-[#22D3EE] mb-4">SYSTEM READY</h1>
    <p className="text-xl">Data Injected. CSS Fixed. Waiting for Component Logic.</p>
    <div className="mt-8 p-4 border border-[#F97316] text-[#F97316]">
       ⚠️ ACTION REQUIRED: Open web/src/App.tsx and paste your SovereignHome code here.
    </div>
  </div>
);

export default function BootstrapApp() {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<SovereignHome />} />
            </Routes>
        </Router>
    );
}
`;
write('web/src/App.tsx', appSkeleton);

// -----------------------------------------------------------------------------
// 6. FIREBASE PLACEHOLDER (ABY NEPADAL BUILD)
// -----------------------------------------------------------------------------
const fbPath = path.join(process.cwd(), 'web/src/firebase.ts');
if (!fs.existsSync(fbPath)) {
    write('web/src/firebase.ts', \`
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// ⚠️ REPLACE WITH REAL KEYS
const firebaseConfig = {
  apiKey: "PLACEHOLDER",
  authDomain: "huddleme-staging.firebaseapp.com",
  projectId: "huddleme-staging"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
\`);
}

console.log("================================================================");
console.log("🛡️ FINAL FUSION COMPLETE.");
console.log("   1. CSS aktualizováno (včetně vašich custom tříd).");
console.log("   2. App.tsx vytvořen s DATY (ale bez logiky komponent).");
console.log("================================================================");
console.log("⚠️  AKCE PRO VÁS:");
console.log("   Otevřete 'web/src/App.tsx' a vložte tam obsah vaší");
console.log("   komponenty SovereignHome (ten dlouhý kód z chatu).");
console.log("================================================================");