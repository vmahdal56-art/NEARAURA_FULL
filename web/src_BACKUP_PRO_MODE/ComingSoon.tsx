import React from 'react';

const ComingSoon = () => {
  return (
    <div className="bg-[#0A0A0C1 min-h-screen flex items-center justify-center text-left uppercase p-10 overflow-hidden font-['Inter']">
      <div className="max-w-[800px] z-10">
        <h1 className="text-[#22D3EE] text-6xl font-[1000] italic tracking-tighter mb-2">NearAura</h1>
        <div className="border-l-4 border-[#F97316] pl-6 mb-12">
          <p className="text-[#F8F9FA] text-2xl font-black italic leading-tight">
            The Truth is Coming. Since 2012, from the streets of London to Global Integrity.
          </p>
        </div>
        <p className="text-slate-500 font-bold italic text-sm tracking-[0.3em] mb-20 uppercase">
          Building the bridge for missed sparks and the shield for our future.
        </p>
        <div className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-xl">
          <h3 className="text-[#22D3EEU font-black text-xs tracking-[0.5em] mb-6 uppercase italic">Founder Access Status</h3>
          <p className="text-white text-xl font-black italic mb-8 uppercase">Live URL Protected by Serpent Filter.</p>
          <button className="bg-[#F97316] text-black px-10 py-4 font-[1000] text-xs shadow-xl italic hover:bg-white transition-all uppercase">
            Stay Sigma. Stay Safe.
          </button>
        </div>
        <footer className="mt-20 opacity-40">
           <div className="text-[#D4AF37] font-black tracking-[1.5em] text-[10px] mb-4 uppercase">JV JM PM LA PM LH YM VM</div>
           <p className="text-[10px] text-slate-500 font-black italic tracking-widest uppercase">Dedicated to Jarmila | Sovereign Logic | © 2026</p>
        </footer>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-r from-[#22D3EE]/5 via-transparent to-[#F97316]/5 animate-pulse" />
    </div>
  );
};

export default ComingSoon ;web/src_BACKUP_PRO_MODE/pages/OrchardPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Importy komponent
import Header from '../components/Header';
import Manifesto from '../components/Manifesto';
import { SovereignFooter } from '../components/ui/SovereignSoul';

const OrchardPage = () => {
  const navigate = useNavigate();
  const fruits = ["APPLE", "PEAR", "PLUM", "CHERRY", "APRICOT", "PEACH", "WALNUT", "HAZELNUT", "GRAPE", "QUINCE", "MEDLAR", "SLOE", "ELDERBERRY"];

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col font-sans uppercase overflow-y-auto pb-20">
      
      {/* HEADER */}
      <Header />

      <div className="flex-1 flex flex-col items-center justify-start p-6 md:p-10 relative pt-24"> 
        
        {/* THE SUN */}
        <div className="absolute top-20 w-64 h-64 bg-orange-600 rounded-full blur-[120px] opacity-20 animate-pulse pointer-events-none"></div>
        <h1 className="text-4xl md:text-6xl font-black italic text-orange-500 mb-10 z-10 tracking-tighter">
          THE NEARAURA SUN
        </h1>

        {/* FRUIT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-6xl z-10 w-full mb-16">
          {fruits.map((f, i) => (
            <div key={i} className="aspect-square flex items-center justify-center border border-emerald-900/50 bg-zinc-950/80 text-[10px] md:text-xs font-black tracking-widest hover:bg-emerald-600 hover:text-black hover:border-emerald-400 transition-all duration-300 shadow-xl cursor-crosshair group">
              <span className="group-hover:scale-110 transition-transform">{f}</span>
            </div>
          ))}
        </div>

        {/* MANIFESTO */}
        <Manifesto />

      </div>

      {/* VELKÝ FOOTER (Necháváme ho tam, ale pod ním bude ten svítící proužek) */}
      <SovereignFooter />

      {/* --- JARMILA & HELENKA FIXNÍ LIŠTA (VŠUDE) --- */}
      <div className="fixed bottom-0 left-0 w-full bg-black border-t-4 border-emerald-900 py-4 z-[200] text-center shadow-[0_0_50px_rgba(16,185,129,0.3)]">
         <p className="text-[#22D3EE] font-black italic uppercase text-[10px] md:text-xs tracking-[0.3em] animate-pulse drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
            IN THE MEMORY OF JARMILA & HELENKA — NEARAURA.COM — THE TRUTH AND LOVE PREVAILS
         </p>
      </div>

    </div>
  );
};

export default OrchardPage;web/src_BACKUP_PRO_MODE/pages/Matrix.tsx
import React from 'react';
import { Check, X, Shield, Crown, Zap } from 'lucide-react';

export default function Matrix() {
  const FEATURES = [
    { name: "100m Radar Visibility", free: true, founder: true, elite: true },
    { name: "See Who Liked You", free: false, founder: true, elite: true },
    { name: "Unlimited Swipes", free: false, founder: true, elite: true },
    { name: "Founder Badge (Gold)", free: false, founder: true, elite: true },
    { name: "Access to 'Hendy' Zone", free: false, founder: false, elite: true },
    { name: "Priority Support", free: false, founder: true, elite: true },
    { name: "No Ads (Zero Data)", free: true, founder: true, elite: true },
    { name: "Incognito Mode", free: false, founder: true, elite: true },
    { name: "Travel Mode (Teleport)", free: false, founder: true, elite: true },
    { name: "See Read Receipts", free: false, founder: true, elite: true },
    { name: "Boost (1x Week)", free: false, founder: true, elite: true },
    { name: "Super Likes (5x Day)", free: false, founder: true, elite: true },
    { name: "Filter by Fruit", free: true, founder: true, elite: true },
    { name: "Advanced Soul Filters", free: false, founder: false, elite: true },
    { name: "Legacy Transfer", free: false, founder: true, elite: true },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-black italic text-[#D4AF37] mb-10 uppercase tracking-tighter text-center">The Sovereign Matrix</h1>
        
        <div className="grid grid-cols-4 gap-4 text-center border border-white/10 bg-[#0A0A0C] p-10 rounded-3xl">
          {/* HEADER */}
          <div className="text-left font-black text-xl text-slate-500 uppercase tracking-widest">Feature / Protocol</div>
          <div className="font-black text-xl text-slate-400 uppercase tracking-widest">Tourist (Free)</div>
          <div className="font-black text-xl text-[#F97316] uppercase tracking-widest flex flex-col items-center gap-2">
            <Zap size={32}/> Founder
          </div>
          <div className="font-black text-xl text-[#22D3EE] uppercase tracking-widest flex flex-col items-center gap-2">
            <Crown size={32}/> Elite
          </div>

          {/* ROWS */}
          {FEATURES.map((f, i) => (
            <React.Fragment key={i}>
              <div className="text-left py-6 border-b border-white/5 font-bold text-slate-300 uppercase text-xs tracking-wider flex items-center">
                {f.name}
              </div>
              <div className="py-6 border-b border-white/5 flex justify-center items-center">
                {f.free ? <Check className="text-slate-500"/> : <X className="text-slate-800"/>}
              </div>
              <div className="py-6 border-b border-white/5 flex justify-center items-center bg-[#F97316]/5">
                {f.founder ? <Check className="text-[#F97316]"/> : <X className="text-slate-800"/>}
              </div>
              <div className="py-6 border-b border-white/5 flex justify-center items-center bg-[#22D3EE]/5">
                {f.elite ? <Check className="text-[#22D3EE]"/> : <X className="text-slate-800"/>}
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="mt-20 text-center">
           <p className="text-slate-500 uppercase tracking-widest text-xs">Pricing verified by the Sovereign Eight.</p>
        </div>
      </div>
    </div>
  );