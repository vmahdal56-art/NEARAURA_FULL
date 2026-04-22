import React from 'react';
import { useNavigate } from 'react-router-dom';

const OathPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center justify-center p-4 font-sans overflow-hidden pb-24">
      
      {/* 1. HEADER SECTION */}
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

      {/* 2. THE BOX */}
      <div className="w-full max-w-lg border-4 border-orange-600 p-8 md:p-12 text-center bg-black relative shadow-[0_0_50px_rgba(234,88,12,0.15)] z-10">
        <h2 className="text-2xl md:text-3xl font-black text-orange-500 uppercase tracking-wide mb-8 underline decoration-2 underline-offset-8">THE GEEZER'S<br />OATH</h2>
        <p className="text-xl md:text-2xl font-black italic text-zinc-200 mb-12 leading-snug">"I REJECT THE LIES AND<br />FARTS. I EMBRACE THE<br />TRUTH AND HEARTS. TA!"</p>
        <button onClick={() => navigate('/gateway')} className="bg-[#059669] hover:bg-[#047857] text-black font-black text-xl py-4 px-12 transition-transform hover:scale-105 active:scale-95 shadow-lg w-full md:w-auto uppercase tracking-wide">I SWEAR</button>
      </div>

      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/10 via-black to-black pointer-events-none"></div>

      {/* --- JARMILA & HELENKA FOOTER --- */}
      <div className="fixed bottom-0 left-0 w-full bg-black border-t-4 border-emerald-900 py-4 z-50 text-center shadow-[0_0_50px_rgba(16,185,129,0.3)]">
         <p className="text-[#22D3EE] font-black italic uppercase text-[10px] md:text-xs tracking-[0.3em] animate-pulse drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
            IN THE MEMORY OF JARMILA & HELENKA — NEARAURA.COM — THE TRUTH AND LOVE PREVAILS
         </p>
      </div>

    </div>
  );
};
export default OathPage;