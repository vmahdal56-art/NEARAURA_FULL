import React from 'react';
// --- INJECTED CONTEXT ---
import { useLanguage } from '../context/LanguageContext';

const T: any = {
  EN: { scanning: "SCANNING...", detected: "IDENTITY_FOUND", level: "AURA_LEVEL: HIGH" },
  FR: { scanning: "ANALYSE...", detected: "IDENTITÉ_TROUVÉE", level: "NIVEAU_AURA : HAUT" },
  DE: { scanning: "SCANNT...", detected: "IDENTITÄT_GEFUNDEN", level: "AURA_NIVEAU: HOCH" },
  CZ: { scanning: "SKENUJI...", detected: "IDENTITA_NALEZENA", level: "AURA_LEVEL: VYSOKÝ" }
};

const Radar = () => {
  const { lang } = useLanguage();
  const txt = T[lang || 'EN'];

  return (
    <div className="w-full h-full relative flex items-center justify-center bg-black/20 rounded-full overflow-hidden border border-zinc-800">
      
      {/* 1. BACKGROUND GRID (ZACHOVÁNO 1:1) */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle, #cd5c09 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      {/* 2. ROTATING SCANNER LINE (ZACHOVÁNO) */}
      <div className="absolute inset-0 animate-spin-slow origin-center opacity-40">
        <div className="w-1/2 h-full bg-gradient-to-r from-[#cd5c09]/40 to-transparent"></div>
      </div>

      {/* 3. CONCENTRIC CIRCLES (ZACHOVÁNO) */}
      {[0, 1, 2, 3].map((i) => (
        <div 
          key={i}
          className="absolute rounded-full border border-zinc-800/50"
          style={{ width: `${(i + 1) * 25}%`, height: `${(i + 1) * 25}%` }}
        ></div>
      ))}

      {/* 4. DETECTION BLIPS (ZACHOVÁNO) */}
      <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-[#cd5c09] rounded-full animate-ping"></div>
      <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-white rounded-full animate-pulse opacity-50"></div>
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-[#22D3EE] rounded-full animate-ping delay-700"></div>

      {/* 5. RADAR DATA OVERLAY (ZACHOVÁNO 1:1) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center z-10">
        <p className="text-[8px] font-black text-[#cd5c09] tracking-[0.4em] uppercase animate-pulse mb-1">
          {txt.scanning}
        </p>
        <div className="bg-black/80 px-3 py-1 border border-zinc-800 rounded">
           <p className="text-[7px] text-zinc-500 font-mono flex items-center justify-center gap-2">
             <span className="w-1 h-1 bg-green-500 rounded-full"></span> {txt.detected}
           </p>
           <p className="text-[6px] text-zinc-600 font-mono mt-1">{txt.level}</p>
        </div>
      </div>

      {/* MAGNETIC FIELD EFFECT (ZACHOVÁNO) */}
      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(205,92,9,0.1)] pointer-events-none"></div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Radar;