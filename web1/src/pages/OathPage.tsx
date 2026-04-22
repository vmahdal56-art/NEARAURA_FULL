import React from 'react';
import { useNavigate } from 'react-router-dom';

const OathPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center justify-center p-4 font-sans overflow-hidden pb-24 relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

      <div className="text-center mb-10 max-w-2xl z-10">
        <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter leading-tight mb-6">
          <span className="text-[#ef4444]">END OF LIES AND FARTS</span>{' '}
          <span className="text-white mx-2">⟶</span><br />
          <span className="text-[#10b981]">REBIRTH OF TRUTH AND HEARTS!</span>
        </h1>
        <p className="text-xs md:text-sm text-zinc-400 font-mono leading-relaxed uppercase tracking-wide px-4">
          You came here to either help the most vulnerable kids or to heal your soul by nearaura orchard.<br/>
          <span className="text-orange-500 font-bold mt-2 block tracking-widest">We are the NearAura the universe of truth for humans souls.</span>
        </p>
      </div>

      <div className="w-full max-w-lg border-4 border-orange-600 p-8 md:p-12 text-center bg-black relative shadow-[0_0_50px_rgba(234,88,12,0.15)] z-10">
        <h2 className="text-2xl md:text-3xl font-black text-orange-500 uppercase tracking-wide mb-8 underline decoration-2 underline-offset-8">THE GEEZER'S<br />OATH</h2>
        <p className="text-xl md:text-2xl font-black italic text-zinc-200 mb-12 leading-snug">"I REJECT THE LIES AND<br />FARTS. I EMBRACE THE<br />TRUTH AND HEARTS. TA!"</p>
        
        <button 
            onClick={() => navigate('/gateway')} 
            className="group relative w-full overflow-hidden bg-gradient-to-r from-orange-600 to-red-600 px-12 py-6 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(249,115,22,0.6)]"
        >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
            <span className="relative font-[1000] text-2xl uppercase tracking-widest text-black group-hover:text-white transition-colors flex items-center justify-center gap-4">
                ⚠️ I SWEAR • ENTER ⚠️
            </span>
        </button>
      </div>

      
      <div className="fixed bottom-0 left-0 w-full bg-black border-t-4 border-emerald-900 py-2 z-[200] text-center shadow-[0_0_50px_rgba(16,185,129,0.3)]">
         <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-8">
            <p className="text-[#22D3EE] font-black italic uppercase text-[10px] tracking-[0.3em] animate-pulse">
               V PAMÁTCE JARMILY A HELENKY — NEARAURA.COM — PRAVDA A LÁSKA VÍTĚZÍ
            </p>
         </div>
      </div>
    </div>
  );
};
export default OathPage;