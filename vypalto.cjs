const fs = require('fs');
const path = require('path');

/**
 * AURA FUSION ENGINE v1.0
 * Status: Proper.
 * Integrity: 1000x UP.
 */

const filePath = path.join(__dirname, 'web', 'src', 'App.tsx');

// 1. BACKUP (Bezpečnost nade vše)
if (fs.existsSync(filePath)) {
    const backup = fs.readFileSync(filePath, 'utf8');
    fs.writeFileSync(filePath + '.bak', backup);
    console.log("🛡️ BACKUP VYTVOŘEN: App.tsx.bak");
}

// 2. THE SOUL & ACTION CODE
const finalCode = `import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Manifesto from './components/Manifesto';

/**
 * 🔱 AURA GATEWAY: SOUL DNA EDITION
 * LEFT: NearAura Orchard (Soul Connection)
 * RIGHT: Be the Help (Lava Logistics)
 */

const Gateway = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-black text-zinc-100 flex flex-col overflow-hidden font-sans">
      {/* SOUL FONTS INJECTION */}
      <style>{\`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&family=Inter:wght@900&display=swap');
        .font-soul { font-family: 'Playfair Display', serif; }
        .font-action { font-family: 'Inter', sans-serif; }
        .gateway-title { letter-spacing: -0.05em; line-height: 0.9; }
      \`}</style>

      <header className="py-20 md:py-28 text-center z-20">
        <h1 className="text-5xl md:text-8xl font-black gateway-title uppercase text-white italic">The Truth is Here.</h1>
        <p className="text-zinc-500 font-bold tracking-[0.7em] uppercase text-[10px] md:text-xs mt-6">Select what you want to be</p>
      </header>
      
      <main className="flex-1 flex flex-col md:flex-row border-t border-white/5">
        {/* LEFT: NEARAURA ORCHARD */}
        <div 
          onClick={() => navigate('/orchard')}
          className="flex-1 group cursor-pointer relative overflow-hidden transition-all duration-1000 hover:flex-[1.6] bg-gradient-to-br from-black to-[#051103]"
        >
          <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-all duration-700" />
          <div className="relative h-full flex flex-col items-center justify-center p-12 text-center transition-all duration-700 group-hover:scale-110">
            <h2 className="text-5xl md:text-8xl font-soul italic text-emerald-100 mb-6 drop-shadow-2xl">NearAura Orchard</h2>
            <p className="max-w-xs text-emerald-200/40 uppercase tracking-[0.3em] text-[10px] font-bold leading-relaxed group-hover:text-emerald-200/80 transition-colors">
              Nurture the Soul. <br/> Find Connection in the Grove.
            </p>
            <div className="mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 text-[9px] tracking-[0.5em] text-emerald-500 font-black">ENTER THE SACRED</div>
          </div>
        </div>

        {/* RIGHT: BE THE HELP */}
        <div 
          onClick={() => navigate('/poorkids')}
          className="flex-1 group cursor-pointer relative overflow-hidden transition-all duration-1000 hover:flex-[1.6] bg-gradient-to-bl from-black to-[#1a0800]"
        >
          <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/5 transition-all duration-700" />
          <div className="relative h-full flex flex-col items-center justify-center p-12 text-center transition-all duration-700 group-hover:scale-110">
            <h2 className="text-5xl md:text-8xl font-action italic font-black uppercase text-orange-600 mb-6 tracking-tighter drop-shadow-2xl">Be the Help</h2>
            <p className="max-w-xs text-orange-200/40 uppercase tracking-[0.3em] text-[10px] font-bold leading-relaxed group-hover:text-orange-200/80 transition-colors">
              For the most vulnerable kids. <br/> Direct Logistics. No Hops.
            </p>
            <div className="mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 text-[9px] tracking-[0.5em] text-orange-500 font-black">LAUNCH THE LAVA</div>
          </div>
        </div>
      </main>
    </div>
  );
};

// 🔱 ORCHARD HOME (Původní DNA)
const OrchardHome = () => (
  <div className="min-h-screen bg-black animate-fade-in">
    <Header />
    <Manifesto />
  </div>
);

// 🔱 POOR KIDS (Michael Tučný Protocol)
const PoorKidsPage = () => (
  <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.1)_0%,transparent_70%)]" />
    <h1 className="font-action italic text-7xl md:text-9xl text-orange-700 uppercase tracking-tighter mb-12 animate-pulse">Lava Pipe</h1>
    <div className="max-w-3xl space-y-8 z-10">
      <p className="font-soul text-3xl md:text-5xl text-zinc-200 italic leading-tight">
        "Měl jsem rád... koňské hřívy a dětský smích."
      </p>
      <p className="text-zinc-500 text-xs tracking-[0.6em] uppercase font-black">Michael Tučný Protocol | Status: Proper</p>
    </div>
    <button 
      onClick={() => window.location.href='/'} 
      className="mt-24 text-zinc-700 hover:text-white uppercase tracking-[0.8em] text-[10px] font-black transition-all border-b border-transparent hover:border-zinc-500 pb-2"
    >
      ← Back to the Truth
    </button>
  </div>
);

export default function App() { 
  return ( 
    <Routes>
      <Route path="/" element={<Gateway />} />
      <Route path="/orchard" element={<OrchardHome />} />
      <Route path="/poorkids" element={<PoorKidsPage />} />
    </Routes>
  ); 
}
\`;

// 3. EXECUTION
try {
    fs.writeFileSync(filePath, finalCode);
    console.log("🚀 VYPÁLENO! App.tsx byla aktualizována.");
    console.log("🔗 /        -> Gateway");
    console.log("🔗 /orchard -> Tvá původní DNA");
    console.log("🔗 /poorkids -> Pomoc dětem");
} catch (err) {
    console.error("❌ CHYBA PŘI VYPÁLENÍ:", err);
}
`;

// TERMINAL COMMAND
console.log("\nTeď už jen v terminálu napiš:");
console.log("node vypalto.js");