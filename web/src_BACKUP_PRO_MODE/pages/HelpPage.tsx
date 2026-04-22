import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HelpPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([30, 50, 40, 70, 20]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => prev.map(() => Math.floor(Math.random() * 80) + 10)); 
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center p-6 uppercase font-sans overflow-x-hidden pb-32">
      
      {/* HEADER */}
      <div className="w-full text-center py-8">
        <h1 className="text-4xl md:text-6xl font-black italic text-orange-600 mb-2 tracking-tighter">
          MISSION: BE THE HELP
        </h1>
        <p className="text-[10px] text-zinc-500 tracking-[0.4em]">LAVA LOGISTICS • REALTIME DATA</p>
      </div>

      {/* DASHBOARD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full flex-1 items-start">
        
        {/* PANEL 1: SWEDISH BUFFET */}
        <div className="p-8 border-2 border-orange-900/30 bg-zinc-950 shadow-[0_0_30px_rgba(234,88,12,0.1)]">
          <h3 className="font-black text-orange-500 mb-6 text-xs tracking-widest underline decoration-orange-800 underline-offset-4">SWEDISH BUFFET</h3>
          <p className="text-[10px] text-zinc-400 italic mb-4">STATUS: <span className="text-emerald-500 animate-pulse font-bold">OPEN / STOCK FULL</span></p>
          <div className="flex gap-2">
             <div className="w-3 h-3 rounded-full bg-emerald-600 shadow-[0_0_10px_#059669]"></div>
             <div className="w-3 h-3 rounded-full bg-emerald-600 shadow-[0_0_10px_#059669]"></div>
             <div className="w-3 h-3 rounded-full bg-emerald-600 shadow-[0_0_10px_#059669]"></div>
          </div>
          <p className="text-[9px] text-zinc-600 mt-4 tracking-wider">CAPACITY: 75%</p>
        </div>

        {/* PANEL 2: LOGISTICS MAP */}
        <div className="p-8 border-2 border-orange-900/30 bg-zinc-950 shadow-[0_0_30px_rgba(234,88,12,0.1)]">
          <h3 className="font-black text-orange-500 mb-6 text-xs tracking-widest underline decoration-orange-800 underline-offset-4">LOGISTICS TRACKER</h3>
          <div className="w-full h-32 bg-zinc-900 border border-zinc-800 mb-4 flex items-center justify-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:10px_10px] opacity-20"></div>
             <div className="absolute w-3 h-3 bg-red-600 rounded-full animate-ping top-1/2 left-1/2"></div>
             <div className="absolute w-2 h-2 bg-red-600 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
             <span className="text-[8px] text-zinc-500 z-10 font-mono mt-12 bg-black px-1">ID: {Math.floor(Math.random() * 999999)}</span>
          </div>
          <p className="text-[9px] text-zinc-500">SIGNAL STRENGTH: <span className="text-emerald-500 font-bold">STRONG</span></p>
        </div>

        {/* PANEL 3: LIVE PRODUCTION */}
        <div className="p-8 border-2 border-orange-900/30 bg-zinc-950 shadow-[0_0_30px_rgba(234,88,12,0.1)]">
          <h3 className="font-black text-orange-500 mb-6 text-xs tracking-widest underline decoration-orange-800 underline-offset-4">LIVE PRODUCTION</h3>
          <div className="h-32 w-full flex items-end gap-2 mb-4 border-b border-zinc-800 pb-1">
              {data.map((h, i) => (
                <div key={i} className="bg-orange-600 w-full transition-all duration-500 ease-in-out opacity-80 hover:opacity-100" style={{height: `${h}%`}}></div>
              ))}
          </div>
          <p className="text-[9px] text-zinc-500">REAL-TIME DATA STREAM</p>
        </div>

        {/* PANEL 4: THE BIG TA */}
        <div className="md:col-span-3 p-12 border-2 border-orange-900/30 bg-zinc-950 flex flex-col items-center justify-center text-center">
          <h2 className="text-orange-600 font-black italic text-8xl md:text-9xl opacity-20 select-none">TA!</h2>
          <p className="text-xs text-orange-500 font-bold tracking-[0.5em] -mt-6 uppercase">Mission Accomplished</p>
        </div>
      </div>

      <button onClick={() => navigate('/gateway')} className="mt-12 border-2 border-zinc-900 px-12 py-4 text-[10px] font-black tracking-widest text-zinc-600 hover:text-white hover:border-white transition-all uppercase">
        { "← RETURN TO GATEWAY" }
      </button>

      {/* --- JARMILA & HELENKA FOOTER --- */}
      <div className="fixed bottom-0 left-0 w-full bg-black border-t-4 border-emerald-900 py-4 z-50 text-center shadow-[0_0_50px_rgba(16,185,129,0.3)]">
         <p className="text-[#22D3EE] font-black italic uppercase text-[10px] md:text-xs tracking-[0.3em] animate-pulse drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
            IN THE MEMORY OF JARMILA & HELENKA — NEARAURA.COM — THE TRUTH AND LOVE PREVAILS
         </p>
      </div>

    </div>
  );
};
export default HelpPage;web/src_BACKUP_PRO_MODE/pages/RootsPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ZDE JE PRVNÍ UPDATE (GATEWAY TEXTY UDĚLÁME V DALŠÍM KROKU, TADY JE LOGIKA ROOTU)
const ROOTS_DATA = {
    id: '9jK-NcRmVbg', 
    timedLyrics: [
      { start: 0, text: ">>> FINAL COUNTDOWN INITIATED... SADOVÁ 862 READY <<<" },
      { start: 15, text: "WE'RE LEAVING TOGETHER! BUT STILL IT'S FAREWELL!" },
      { start: 22, text: "IT'S THE FINAL COUNTDOWN! TA! TA! TA!" },
      { start: 45, text: "BÁNOV DNA ACTIVATED. THE TRUTH IS NEAR." }
    ]
};

const RootsPage = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (active) {
      setTimer(0);
      intervalRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    } else {
      clearInterval(intervalRef.current);
      setTimer(0);
    }
    return () => clearInterval(intervalRef.current);
  }, [active]);

  const getCurrentLyric = () => {
    // @ts-ignore
    const current = [...ROOTS_DATA.timedLyrics].reverse().find(l => timer >= l.start);
    return current ? current.text : "INITIATING COUNTDOWN SEQUENCE...";
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center p-6 overflow-hidden uppercase font-mono relative pb-32">
      
      {/* INVISIBLE PLAYER */}
      <div className="absolute top-0 left-0 w-0 h-0 opacity-0 pointer-events-none">
        {active && <iframe width="1" height="1" src={`https://www.youtube.com/embed/${ROOTS_DATA.id}?autoplay=1&mute=0`} allow="autoplay"></iframe>}
      </div>

      {/* HEADER */}
      <div className="w-full text-center py-10 z-10">
         <h1 className="text-4xl md:text-6xl font-black italic text-zinc-500 mb-2 tracking-tighter">
           ANCESTRAL <span className="text-blue-500">ROOTS</span>
         </h1>
         <p className="text-[10px] text-zinc-600 tracking-[0.5em]">DNA SOURCE: BÁNOV 1983</p>
      </div>

      <div className="max-w-4xl w-full space-y-10 z-10 flex flex-col items-center">
        
        {/* THE BUTTON */}
        <button 
          onClick={() => setActive(!active)} 
          className={`px-10 py-6 border-4 text-xs md:text-sm font-black tracking-[0.2em] uppercase transition-all shadow-2xl transform hover:scale-105 ${active ? 'border-red-600 text-red-600 bg-red-900/10' : 'border-blue-600 text-blue-500 hover:bg-blue-600 hover:text-white animate-pulse'}`}
        >
          {active ? "■ ABORT COUNTDOWN" : "▶ INITIATE FINAL COUNTDOWN (EUROPE)"}
        </button>

        {/* LYRICS MARQUEE */}
        {active && (
          <div className="w-full bg-blue-900/10 border-y-2 border-blue-600/50 p-6 overflow-hidden backdrop-blur-sm">
            <div className="whitespace-nowrap animate-marquee text-blue-400 font-black italic text-xl md:text-3xl uppercase text-center w-full drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
               {getCurrentLyric()}
            </div>
          </div>
        )}

        {/* STORY BLOCK: BÁNOV */}
        <div className="border-l-[12px] border-blue-600 p-8 md:p-12 bg-zinc-950 shadow-2xl w-full text-left relative overflow-hidden">
          <div className="absolute right-0 top-0 text-[10rem] text-blue-600 opacity-5 font-black italic pointer-events-none">83</div>
          <h3 className="text-blue-500 font-black mb-6 text-[10px] tracking-[0.6em]">
             { ">>> MEMORY LOG: BÁNOV 1983" }
          </h3>
          <p className="text-xl md:text-3xl italic font-black leading-tight text-white uppercase mb-8">
            "BANOV 1983 - S DEDU ZA ZADAMA SEM NATIRAU PUOT V HUMNE NAMODRO - BYUA TO PRO MŇA TA NEJVĚTŠÍ SKOUA ŽIVOTA. TO SUU HOVNA!!!"
          </p>
          <div className="border-t-2 border-zinc-900 pt-6">
            <p className="text-emerald-500 font-black text-[10px] tracking-widest italic">
              PROPER ENGLISH TRANSLATION: "BÁNOV 1983 - WITH MY GRANDPA BEHIND MY BACK, I PAINTED THE FENCE BLUE. IT WAS THE GREATEST SCHOOL OF LIFE FOR ME. BOLLOCKS!"
            </p>
          </div>
        </div>

        {/* STORY GRID - TEĎ S NOVÝM 'KECY PRDY' BLOKEM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full text-left">
          
          {/* 1. OGAR - KECY PRDY */}
          <div className="col-span-1 md:col-span-2 border-4 border-yellow-500 p-8 bg-zinc-950 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
             <h3 className="text-yellow-500 font-black mb-4 text-[10px] tracking-widest uppercase flex items-center gap-2">
                <span>⚡</span> { ">>> THE CHILDHOOD TRUTH CURSE" }
             </h3>
             <p className="text-2xl md:text-4xl italic font-black mb-6 leading-none uppercase text-white tracking-tighter">
               "KECY, PRDY, BEĎARY...<br/>
               <span className="text-yellow-500">PLÍSNĚ, VŘEDY, OPARY!"</span>
             </p>
             <p className="text-zinc-500 font-bold text-[10px] uppercase border-t border-zinc-800 pt-4">
               OFFICIAL TRANSLATION: "BOLLOCKS, FARTS, PIMPLES... MOLDS, ULCERS, COLD SORES!"
             </p>
          </div>

          {/* 2. NIVNICKÝ OGAR */}
          <div className="border-l-8 border-emerald-500 p-8 bg-zinc-950 shadow-xl">
            <h3 className="text-emerald-500 font-black mb-4 text-[10px] tracking-widest uppercase"> { ">>> NIVNICKÝ OGAR" } </h3>
            <p className="text-lg italic font-black mb-6 leading-tight uppercase text-zinc-200">
              "SEL SEM KOLEM VETROLAMU A CUCHAL SEM TY SMRADY..."
            </p>
            <p className="text-zinc-500 font-bold text-[9px] uppercase">
              EN: "I WALKED PAST THE WINDBREAK AND SMELLED THE SILAGE..."
            </p>
          </div>
          
          {/* 3. BÁNOVŠTINA */}
          <div className="border-l-8 border-orange-600 p-8 bg-zinc-950 shadow-xl">
            <h3 className="text-orange-600 font-black mb-4 text-[10px] tracking-widest uppercase"> { ">>> BÁNOV DIALECT" } </h3>
            <p className="text-lg italic font-black mb-6 leading-tight uppercase text-zinc-200">
              "SUA SEM SUA NASUA SEM KUS SKUA..."
            </p>
            <p className="text-zinc-500 font-bold text-[9px] uppercase">
              EN: "I WENT AND FOUND A PIECE OF GLASS..."
            </p>
          </div>
        </div>
      </div>

      <button 
        onClick={() => navigate('/gateway')} 
        className="mt-16 border-2 border-zinc-800 px-14 py-5 text-xs font-black tracking-widest text-zinc-500 hover:text-white hover:border-white transition-all uppercase"
      >
        { "← RETURN TO GATEWAY" }
      </button>

      {/* --- 3. THE ULTIMATE FOOTER (JARMILA & HELENKA) --- */}
      {/* Vkládáme přímo sem, protože RootsPage nepoužívá velký SovereignFooter */}
      <div className="fixed bottom-0 left-0 w-full bg-black border-t-4 border-emerald-900 py-4 z-50 text-center shadow-[0_0_50px_rgba(16,185,129,0.3)]">
         <p className="text-[#22D3EE] font-black italic uppercase text-[10px] md:text-xs tracking-[0.3em] animate-pulse drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
            IN THE MEMORY OF JARMILA & HELENKA — NEARAURA.COM — THE TRUTH AND LOVE PREVAILS
         </p>
      </div>

    </div>
  );
};

export default RootsPage;web/src_BACKUP_PRO_MODE/pages/Mentality.tsx
