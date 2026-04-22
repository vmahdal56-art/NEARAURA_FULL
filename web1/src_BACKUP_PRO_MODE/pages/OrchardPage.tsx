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

export default OrchardPage;