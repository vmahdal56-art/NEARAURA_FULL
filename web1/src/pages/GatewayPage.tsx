import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ANTHEMS = {
  left: { 
    id: 'Bp1yD_bLXdM', // Tublatanka - Static Image (Safe Embed)
    title: 'TUBLATANKA: PRAVDA VÍTĚZÍ', 
    lyric: ">>> SIGNAL LOCKED: TRUTH PREVAILS... <<< SVĚT JE JINÝ, NEŽ JSEM SI DŘÍV MYSLEL! PRAVDA VÍTĚZÍ! ČAS PRAVDU NEZAHUBÍ! <<<"
  },
  right: { 
    id: 'nT1mElKoeHU', // Michal Tucny - Medvidek (Working)
    title: 'MICHAL TUČNÝ: MEDVÍDEK', 
    lyric: ">>> SOUL SIGNAL LOCKED... <<< CHTĚL BYCH BÝT MEDVÍDKEM... V ROHU TIŠE SEDĚT... A DÍVAT SE, JAK SI DĚTI HRAJÍ. PROSÍM VÁS, NECHTE MĚ BÝT... <<<"
  },
  roots: {
    id: 'TcJ-wNmazHQ', // Europe - Lyric Video (Old reliable ID)
    title: 'EUROPE: THE FINAL COUNTDOWN', 
    lyric: ">>> FINAL COUNTDOWN INITIATED... SADOVÁ 862 READY <<< WE'RE LEAVING TOGETHER! BUT STILL IT'S FAREWELL! IT'S THE FINAL COUNTDOWN! TA! TA! TA! <<<"
  }
};

const GatewayPage = () => {
  const navigate = useNavigate();
  const [activeAnthem, setActiveAnthem] = useState(null);
  const [entered, setEntered] = useState(false);

  const toggleAnthem = (key, e) => {
    e.stopPropagation();
    if (activeAnthem === key) {
        setActiveAnthem(null);
    } else {
        setActiveAnthem(key);
    }
  }

  const enterSite = () => {
    setEntered(true);
  };

  if (!entered) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center cursor-pointer z-[9999]" onClick={enterSite}>
        <div className="text-center animate-pulse">
           <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter mb-4">CLICK TO ENTER NEARAURA</h1>
           <p className="text-red-500 font-mono text-sm tracking-[0.5em]">INITIALIZE AUDIO & GLOBAL TRUTH</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#050505] text-white flex flex-col font-sans overflow-hidden">
      
      <style>{`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee-force { display: inline-block; white-space: nowrap; animation: marquee 20s linear infinite; padding-left: 100%; }
      `}</style>

      {/* YOUTUBE PLAYER */}
      <div className="absolute top-0 left-0 w-0 h-0 opacity-0 pointer-events-none">
        {activeAnthem && (
            <iframe 
                key={activeAnthem} // Forces reload on change
                width="1" 
                height="1" 
                src={`https://www.youtube.com/embed/${ANTHEMS[activeAnthem].id}?autoplay=1&mute=0&enablejsapi=1`} 
                allow="autoplay; encrypted-media"
                title="Anthem Player"
            ></iframe>
        )}
      </div>

      <div className="w-full text-center pt-4 pb-2 bg-black z-20 border-b border-zinc-900 shrink-0">
        <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter leading-none mb-1">
          <span className="text-[#ef4444]">END OF LIES AND FARTS</span>{' '}
          <span className="text-white mx-1">⟶</span>{' '}
          <span className="text-[#10b981]">REBIRTH OF TRUTH AND HEARTS!</span>
        </h1>
        <p className="text-[9px] text-zinc-500 font-mono uppercase tracking-wide">
          We are the NearAura the universe of truth for humans souls.
        </p>
      </div>

      <div className="w-full border-b border-zinc-800 bg-zinc-900/50 py-2 overflow-hidden relative flex items-center shrink-0 h-10">
         <div className="absolute left-0 bg-black/90 z-20 px-4 h-full flex items-center border-r border-zinc-700">
            <span className={`w-2 h-2 rounded-full mr-2 ${activeAnthem ? 'bg-red-500 animate-pulse' : 'bg-zinc-500'}`}></span>
            <span className="text-[9px] font-black tracking-widest text-white">
               {activeAnthem ? 'NOW PLAYING' : 'WAITING FOR SIGNAL'}
            </span>
         </div>
         <div className="w-full overflow-hidden flex items-center">
             <div key={activeAnthem || 'default'} className="animate-marquee-force text-lg font-black italic text-[#F97316] uppercase tracking-widest">
                {activeAnthem ? ANTHEMS[activeAnthem].lyric : "<<< THE WORLD IS DIFFERENT THAN I THOUGHT <<< TRUTH PREVAILS, TIME DOES NOT HARM TRUTH, NOR THE SHINE OF ALMIGHTY MONEY <<< THEY WILL NEVER KILL IT, IT WILL NEVER DIE <<<"}
             </div>
         </div>
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-3 gap-4 h-full min-h-0 pb-16">
        
        {/* LEFT: TUBLATANKA - NOW WITH LABEL */}
        <div className="h-full flex flex-col items-center justify-center text-center border-4 border-[#6ee7b7]/20 bg-zinc-900/30 hover:bg-[#6ee7b7]/10 hover:border-[#6ee7b7] transition-all cursor-pointer group relative overflow-hidden" onClick={() => navigate('/orchard')}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#6ee7b7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h2 className="text-2xl md:text-4xl font-black text-[#6ee7b7] italic tracking-tighter mb-2 z-10 uppercase leading-none">
            NEARAURA<br/>THE ORCHARD
          </h2>
          <p className="text-[#6ee7b7] text-[10px] font-bold uppercase mt-2 opacity-60 mb-4 animate-pulse">
             HYMN: PRAVDA VÍTĚZÍ (TUBLATANKA)
          </p>
          <button onClick={(e) => toggleAnthem('left', e)} className="z-10 text-[9px] font-bold px-6 py-3 border border-[#6ee7b7] text-[#6ee7b7] hover:bg-[#6ee7b7] hover:text-black uppercase tracking-widest rounded-full transition-all">
             {activeAnthem === 'left' ? '■ STOP' : '▶ ANTHEM'}
          </button>
        </div>

        {/* CENTER: HELP / MEDVIDEK */}
        <div className="h-full flex flex-col items-center justify-center text-center border-4 border-[#ea580c]/20 bg-zinc-900/30 hover:bg-[#ea580c]/10 hover:border-[#ea580c] transition-all cursor-pointer group relative overflow-hidden" onClick={() => navigate('/help')}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#ea580c]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h2 className="text-2xl md:text-4xl font-black text-[#ea580c] italic tracking-tighter mb-2 z-10 uppercase leading-none">
            BE THE HELP<br/>FOR KIDS WHO SUFFER
          </h2>
          <p className="text-[#ea580c] text-[10px] font-bold uppercase mt-2 opacity-60 mb-4 animate-pulse">
             HYMN: MEDVÍDEK (MICHAL TUČNÝ)
          </p>
          <button onClick={(e) => toggleAnthem('right', e)} className="z-10 text-[9px] font-bold px-6 py-3 border border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-black uppercase tracking-widest rounded-full transition-all">
             {activeAnthem === 'right' ? '■ STOP' : '▶ ANTHEM'}
          </button>
        </div>

        {/* RIGHT: ROOTS / EUROPE */}
        <div className="h-full flex flex-col items-center justify-center text-center border-4 border-zinc-500/20 bg-zinc-900/30 hover:bg-zinc-500/10 hover:border-zinc-500 transition-all cursor-pointer group relative overflow-hidden" onClick={() => navigate('/roots')}>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h2 className="text-2xl md:text-4xl font-black text-zinc-400 italic tracking-tighter mb-2 z-10 uppercase leading-none">
            ROOTS<br/>PAST & FUTURE
          </h2>
          <p className="text-zinc-400 text-[10px] font-bold uppercase mt-2 opacity-60 mb-4 animate-pulse">
             HYMN: THE FINAL COUNTDOWN
          </p>
          <button onClick={(e) => toggleAnthem('roots', e)} className="z-10 text-[9px] font-bold px-6 py-3 border border-zinc-500 text-zinc-500 hover:bg-zinc-500 hover:text-black uppercase tracking-widest rounded-full transition-all">
             {activeAnthem === 'roots' ? '■ STOP' : '▶ ANTHEM'}
          </button>
        </div>

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
export default GatewayPage;