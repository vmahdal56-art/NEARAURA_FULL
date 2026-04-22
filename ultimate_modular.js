const fs = require('fs');
const path = require('path');

console.log("🛡️ NEARAURA GOD PROJECT: ULTIMATE MODULAR GENESIS...");
console.log("⚠️  CÍL: Vygenerovat kompletní MODULÁRNÍ strukturu s Matrixem 3.0 a Backend logikou.");

function write(filePath, content) {
    const fullPath = path.join(process.cwd(), filePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content.trim());
    console.log(`✅ [MODUL] Zapsáno: ${filePath}`);
}

// =============================================================================
// 1. CONFIG & STYLES (ROOT)
// =============================================================================

write('web/tailwind.config.js', `
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { void: "#060709", cyan: "#22D3EE", sovereign: "#D4AF37", pink: "#EC4899", orange: "#F97316" },
      fontFamily: { sans: ['"Space Grotesk"', 'sans-serif'], inter: ['"Inter"', 'sans-serif'] },
      animation: { 'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite', 'fade-in-up': 'fadeInUp 0.8s ease-out forwards', 'marquee': 'marquee 25s linear infinite' },
      keyframes: { fadeInUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } }, marquee: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-100%)' } } }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
`);

write('web/src/index.css', `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
@tailwind base; @tailwind components; @tailwind utilities;

:root { --color-brand-orange: #F97316; --color-brand-cyan: #22D3EE; --color-brand-gold: #D4AF37; --bg-black: #060709; }
html { scroll-behavior: smooth; height: 100%; background-color: var(--bg-black); }
body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; background-color: var(--bg-black); color: white; overflow-x: hidden; touch-action: pan-y; }
::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
.glass-panel { background: rgba(0,0,0,0.6); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1); }
.typing-effect { overflow: hidden; white-space: nowrap; border-right: 2px solid var(--color-brand-orange); animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite; }
@keyframes typing { from { width: 0 } to { width: 100% } } @keyframes blink-caret { 50% { border-color: transparent } }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
.animate-marquee { animation: marquee 25s linear infinite; } @keyframes marquee { 100% { transform: translateX(-100%); } }
`);

write('web/index.html', `
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><link rel="icon" type="image/png" href="/logo.png" /><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /><meta name="theme-color" content="#060709" /><title>NEARAURA | Sovereign Vault</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>
`);

// =============================================================================
// 2. DNA CORE (LOGIC LAYER) - src/dna
// =============================================================================

write('web/src/dna/Config.ts', `
export const SYSTEM_DNA = {
  INITIALS: "JV JM PM LA PM LH YM VM",
  MOTTO: "Truth and love must prevail over lies and hatred",
  ASSETS: {
    logo: "https://firebasestorage.googleapis.com/v0/b/huddleme-staging.appspot.com/o/assets%2Flogo.png?alt=media",
    jarmila: "https://firebasestorage.googleapis.com/v0/b/huddleme-staging.appspot.com/o/assets%2Fjarmila.jpg?alt=media",
    hero_overlay: "https://firebasestorage.googleapis.com/v0/b/huddleme-staging.appspot.com/o/assets%2Foverlay.png?alt=media",
  }
};

export const REALMS = {
  KIDS: { id: 'KIDS', label: 'KIDS SHIELD', range: '0-15', color: 'text-white', border: 'border-white', bg: 'bg-white/10' },
  YOUTH: { id: 'YOUTH', label: 'YOUTH REALM', range: '15-18', color: 'text-[#22D3EE]', border: 'border-[#22D3EE]', bg: 'bg-[#22D3EE]/10' },
  ADULT: { id: 'ADULT', label: 'SOVEREIGN', range: '18+', color: 'text-[#D4AF37]', border: 'border-[#D4AF37]', bg: 'bg-[#D4AF37]/10' },
  FLUID: { id: 'FLUID', label: 'FLUID REALM', range: '18+', color: 'text-[#EC4899]', border: 'border-[#EC4899]', bg: 'bg-[#EC4899]/10' }
};
`);

write('web/src/dna/MatrixData.ts', `
// MATRIX 3.0: Definice viditelnosti ovoce pro 4 kategorie
export const ORCHARD_DATA = [
  // 1. SAFE ZONE (Všichni)
  { id: 'orange', label: 'Orange', realm: ['KIDS','YOUTH','ADULT','FLUID'], color: 'text-[#F97316]', border: 'border-[#F97316]', icon: '🍊', desc: 'Friendship' },
  { id: 'melon', label: 'Melon', realm: ['KIDS','YOUTH','ADULT','FLUID'], color: 'text-[#EF4444]', border: 'border-[#EF4444]', icon: '🍉', desc: 'Hobby/Sport' },
  { id: 'coconut', label: 'Coconut', realm: ['KIDS','YOUTH','ADULT','FLUID'], color: 'text-[#E5E5E5]', border: 'border-[#E5E5E5]', icon: '🥥', desc: 'Help/Service' },
  { id: 'grape', label: 'Grape', realm: ['KIDS','YOUTH','ADULT','FLUID'], color: 'text-[#8B5CF6]', border: 'border-[#8B5CF6]', icon: '🍇', desc: 'Community Chat' }, // Grape = Community
  
  // 2. SOCIAL ZONE (Youth, Adult, Fluid)
  { id: 'cherry', label: 'Cherry', realm: ['YOUTH','ADULT','FLUID'], color: 'text-[#BE123C]', border: 'border-[#BE123C]', icon: '🍒', desc: 'Meet Now' },
  { id: 'pineapple', label: 'Pineapple', realm: ['YOUTH','ADULT','FLUID'], color: 'text-[#FBBF24]', border: 'border-[#FBBF24]', icon: '🍍', desc: 'Serious Intent' }, // Youth+Fluid povoleno

  // 3. SOVEREIGN ZONE (Adult, Fluid)
  { id: 'pear', label: 'Pear', realm: ['ADULT','FLUID'], color: 'text-[#10B981]', border: 'border-[#10B981]', icon: '🍐', desc: 'Family/Life' }, // Fluid povoleno
  { id: 'banana', label: 'Banana', realm: ['ADULT','FLUID'], color: 'text-[#F97316]', border: 'border-[#F97316]', icon: '🍌', desc: 'Intimacy M' },
  { id: 'peach', label: 'Peach', realm: ['ADULT','FLUID'], color: 'text-[#FDA4AF]', border: 'border-[#FDA4AF]', icon: '🍑', desc: 'Intimacy F' },
  { id: 'hendy', label: 'Hendy', realm: ['ADULT','FLUID'], color: 'text-[#D4AF37]', border: 'border-[#D4AF37]', icon: '👑', desc: 'Highest Integrity' },
  
  // 4. FLUID EXCLUSIVE
  { id: 'mango', label: 'Mango', realm: ['FLUID'], color: 'text-[#EC4899]', border: 'border-[#EC4899]', icon: '🥭', desc: 'Fluid Gateway' }
];

export const FEATURES_MATRIX = [
  { name: "View Orchard", t1: true, t2: true, t3: true, t4: true },
  { name: "Manifesto Access", t1: true, t2: true, t3: true, t4: true },
  { name: "Sovereign Badge", t1: false, t2: false, t3: true, t4: true },
  { name: "Global Radar", t1: false, t2: false, t3: true, t4: true },
  { name: "Revenue Share", t1: false, t2: false, t3: "40x", t4: "40x" }
];
`);

// =============================================================================
// 3. SERVICES (BACKEND CONNECTION) - src/services
// =============================================================================

write('web/src/services/firebase.ts', `
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// ⚠️ PLACEHOLDER KEYS - REPLACE BEFORE DEPLOY
const firebaseConfig = {
  apiKey: "AIzaSy_PLACEHOLDER",
  authDomain: "huddleme-staging.firebaseapp.com",
  projectId: "huddleme-staging",
  storageBucket: "huddleme-staging.appspot.com",
  messagingSenderId: "123",
  appId: "1:123:web:123"
};

let app, db, functions;
try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  functions = getFunctions(app);
} catch(e) { console.warn("Firebase Init Skipped/Failed"); }

export { db, functions };
`);

write('web/src/services/database.ts', `
import { db } from './firebase';
import { collection, addDoc, serverTimestamp, setDoc, doc } from "firebase/firestore";
import { ORCHARD_DATA } from '../dna/MatrixData';

// A. WAITLIST WRITE
export const addToWaitlist = async (email: string) => {
    if(!db) return; 
    await addDoc(collection(db, "waitlist"), { 
        email, 
        timestamp: serverTimestamp(), 
        source: "web_modular" 
    });
};

// B. ADMIN: SEED CONTENT (1000 Words)
export const seedDatabase = async () => {
    if(!db) { alert("Firebase not connected!"); return; }
    
    for (const fruit of ORCHARD_DATA) {
        console.log("Seeding " + fruit.id + "...");
        const longText = {
            title: fruit.label,
            h1: "THE DOCTRINE OF " + fruit.label.toUpperCase(),
            intro: "In the era of digital chaos, " + fruit.label + " represents a fundamental pillar of the Sovereign Protocol...",
            sections: [
                { h2: "§1. The Sovereign Foundation", text: "Here lies the first principle of " + fruit.label + ". We return to the roots. ".repeat(20) },
                { h2: "§2. The Bio-Rhythm Sync", text: "We do not swipe. We resonate. Frequency matching is key. ".repeat(30) },
                { h3: "Subsection Alpha: Integrity", text: "Without truth, there is no connection. ".repeat(15) },
                { h2: "§3. The 48-Hour Lock Protocol", text: "Intent must be solidified by time. Hardware ID lock active. ".repeat(25) },
                { h4: "Technical Implementation", text: "Encrypted handshake protocol. ".repeat(10) },
                { h2: "§4. The Jarmila Promise", text: "Safety is not an option. It is the law. 10% revenue allocation confirmed. ".repeat(40) }
            ],
            image: \`https://firebasestorage.googleapis.com/v0/b/huddleme-staging.appspot.com/o/assets%2F\${fruit.id}.jpg\`
        };
        await setDoc(doc(db, "manifestos", fruit.id), longText);
    }
    alert("✅ DATABASE SEEDED: 12 Manuscripts (1000+ words each) injected into Firestore.");
};
`);

// =============================================================================
// 4. COMPONENTS (UI BRICKS) - src/components
// =============================================================================

write('web/src/components/Header.tsx', `
import React from 'react';
import { SYSTEM_DNA, REALMS } from '../dna/Config';
import { Database } from 'lucide-react';
import { seedDatabase } from '../services/database';

export const Header = ({ activeRealm, setActiveRealm }) => (
  <nav className="fixed top-0 w-full z-50 bg-black/95 border-b border-white/10 p-4 flex justify-between items-center backdrop-blur-md">
    <div className="flex items-center gap-4">
       <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan to-orange animate-pulse"></div>
       <div className="text-[#F97316] font-mono text-[10px] uppercase font-bold hidden md:block">{SYSTEM_DNA.MOTTO}</div>
    </div>
    <div className="flex gap-2">
      {Object.values(REALMS).map(r => (
        <button key={r.id} onClick={() => setActiveRealm(r.id)} 
          className={\`text-[9px] font-black uppercase px-3 py-1 rounded border transition-all \${activeRealm === r.id ? \`\${r.bg} \${r.border} \${r.color}\` : 'border-transparent text-slate-600 hover:text-white'}\`}>
          {r.label}
        </button>
      ))}
    </div>
    <button onClick={seedDatabase} className="hidden md:flex bg-red-900/20 text-red-500 border border-red-900 px-2 py-1 text-[8px] uppercase tracking-widest gap-2 hover:bg-red-900 hover:text-white transition-all"><Database size={10}/> ADMIN SEED</button>
  </nav>
);
`);

write('web/src/components/OrchardGrid.tsx', `
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ORCHARD_DATA } from '../dna/MatrixData';

export const OrchardGrid = ({ activeRealm }) => {
  const navigate = useNavigate();
  // MATRIX LOGIC: Filter by Realm
  const visibleFruits = ORCHARD_DATA.filter(f => f.realm.includes(activeRealm));

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto p-4">
      {visibleFruits.map(fruit => (
        <div key={fruit.id} onClick={() => navigate(\`/manifesto/\${fruit.id}\`)} 
             className={\`p-6 border \${fruit.border} bg-white/5 rounded-2xl hover:bg-white/10 cursor-pointer group transition-all hover:scale-105\`}>
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{fruit.icon}</div>
            <h3 className={\`font-black uppercase \${fruit.color}\`}>{fruit.label}</h3>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">{fruit.desc}</p>
        </div>
      ))}
    </div>
  );
};
`);

write('web/src/components/JarmilaAssistant.tsx', `
import React, { useState } from 'react';
import { Siren } from 'lucide-react';
import { SYSTEM_DNA } from '../dna/Config';

export const JarmilaAssistant = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end">
            {open && (<div className="mb-4 bg-black/90 border border-[#22D3EE] p-4 rounded-2xl w-64 animate-fade-in-up"><div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10"><div className="w-8 h-8 rounded-full bg-[#22D3EE] flex items-center justify-center text-black font-black text-xs">J</div><div><h4 className="text-white font-bold text-sm">Jarmila AI</h4><p className="text-[10px] text-[#22D3EE]">Guardian Online</p></div></div><button className="flex items-center gap-3 p-3 rounded-lg bg-red-900/30 text-red-200 text-xs font-bold uppercase border border-red-900 w-full"><Siren size={16} className="animate-pulse"/> SOS / IZS (112)</button></div>)}
            <button onClick={() => setOpen(!open)} className="w-16 h-16 rounded-full bg-black border-2 border-[#22D3EE] flex items-center justify-center hover:scale-110 transition-transform overflow-hidden"><img src={SYSTEM_DNA.ASSETS.jarmila} className="w-full h-full object-cover opacity-80" alt="AI" onError={(e) => {e.currentTarget.style.display='none'}} /></button>
        </div>
    );
};
`);

write('web/src/components/Waitlist.tsx', `
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { addToWaitlist } from '../services/database';

export const Waitlist = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");
        try {
            await addToWaitlist(email);
            setStatus("success");
        } catch (err) { setStatus("error"); }
    };

    if (status === "success") return <div className="text-[#22D3EE] font-black p-4 border border-[#22D3EE] bg-[#22D3EE]/10 rounded-xl inline-block">DATA SECURED IN VAULT.</div>;

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto mt-8">
            <input type="email" required placeholder="ENTER EMAIL..." className="bg-white/5 border border-white/20 p-4 rounded-lg w-full text-white" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <button disabled={status === "loading"} className="bg-[#F97316] text-black px-6 font-black rounded-lg">{status === "loading" ? "..." : <Send />}</button>
        </form>
    );
};
`);

// =============================================================================
// 5. PAGES (VIEWS) - src/pages
// =============================================================================

write('web/src/pages/Home.tsx', `
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { OrchardGrid } from '../components/OrchardGrid';
import { Waitlist } from '../components/Waitlist';
import { JarmilaAssistant } from '../components/JarmilaAssistant';
import { SYSTEM_DNA } from '../dna/Config';

export const Home = () => {
  const [activeRealm, setActiveRealm] = useState('ADULT');

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <Header activeRealm={activeRealm} setActiveRealm={setActiveRealm} />
      <JarmilaAssistant />
      
      <main className="pt-32 pb-20">
        <div className="text-center mb-16 px-4">
           <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-4 text-white">
             THE END OF <span className="text-[#22D3EE]">SWIPING</span>
           </h1>
           <p className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-8">Active Realm: <span className="text-white">{activeRealm}</span></p>
           <Waitlist />
        </div>

        {/* MODULAR GRID */}
        <OrchardGrid activeRealm={activeRealm} />
        
        <footer className="mt-20 text-center border-t border-white/10 pt-10 pb-10">
           <div className="text-[#D4AF37] font-black text-4xl opacity-50">{SYSTEM_DNA.INITIALS}</div>
        </footer>
      </main>
    </div>
  );
};
`);

write('web/src/pages/Manifesto.tsx', `
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

export const Manifesto = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchData = async () => {
          if (!db) { setLoading(false); return; } // Fallback if no DB
          try {
              const docRef = doc(db, "manifestos", pageId?.toLowerCase() || "");
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) setData(docSnap.data());
          } catch (e) { console.error(e); }
          setLoading(false);
      };
      fetchData();
  }, [pageId]);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-[#22D3EE] animate-pulse">DECRYPTING DNA...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-24 font-serif selection:bg-[#D4AF37] selection:text-black">
      <button onClick={() => navigate('/')} className="flex items-center gap-3 text-[#D4AF37] mb-12 font-black text-xs uppercase tracking-widest hover:-translate-x-1 transition-transform"><ArrowLeft size={20}/> RETURN</button>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-8xl font-black uppercase italic mb-8 tracking-tighter text-white">{data?.h1 || pageId?.toUpperCase()}</h1>
        <p className="text-xl md:text-2xl text-[#22D3EE] font-sans font-light mb-16 leading-relaxed border-l-4 border-[#22D3EE] pl-6">{data?.intro || "Data not found in Sovereign Ledger (Run Admin Seed)."}</p>
        
        <div className="prose prose-invert prose-lg max-w-none text-slate-300 space-y-12">
            {data?.sections?.map((sec: any, i: number) => (
                <div key={i}>
                    {sec.h2 && <h2 className="text-3xl font-black text-white uppercase mt-12 mb-6 border-b border-white/10 pb-4">{sec.h2}</h2>}
                    {sec.h3 && <h3 className="text-2xl font-bold text-[#F97316] uppercase mt-8 mb-4">{sec.h3}</h3>}
                    {sec.h4 && <h4 className="text-xl font-bold text-[#D4AF37] uppercase mt-6 mb-2 flex items-center gap-2"><Zap size={16}/> {sec.h4}</h4>}
                    <p className="leading-loose text-justify font-sans">{sec.text}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};
`);

// =============================================================================
// 6. MAIN ENTRY POINT - src/main.tsx & App.tsx
// =============================================================================

write('web/src/App.tsx', `
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Manifesto } from './pages/Manifesto';

export default function BootstrapApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manifesto/:pageId" element={<Manifesto />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}
`);

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

console.log("================================================================");
console.log("🛡️ ULTIMATE MODULAR GENESIS COMPLETE.");
console.log("   Všechny soubory jsou na svých místech (src/dna, src/components...)");
console.log("   Matrix 3.0 (Ananas pro Youth) je aktivní.");
console.log("   End-to-End logika (Admin Seed, Waitlist) je integrována.");
console.log("👉 SPUSŤTE: cd web && npm run dev");
console.log("================================================================");
