
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ANTHEMS = {
  left: { 
    id: 'JMHS9o8KIGU', title: 'TRUTH PREVAILS', 
    timedLyrics: [
      { start: 0, text: ">>> SIGNAL LOCKED: TRUTH PREVAILS... <<<" },
      { start: 13, text: "THE WORLD IS DIFFERENT THAN I THOUGHT BEFORE!" },
      { start: 19, text: "TRUTH PREVAILS! TIME HOLDS NO POWER OVER US!" },
      { start: 25, text: "NO LIE SHALL EVER BREAK IT! TRUTH PREVAILS!" }
    ]
  },
  right: { 
    id: 'vkKeB7Rh0r0', title: 'AT HEAVENS GATES', 
    timedLyrics: [
      { start: 0, text: ">>> STETSON SIGNAL LOCKED... SALVATION APPROACHING... <<<" },
      { start: 10, text: "END OF LIES AND FARTS — REBIRTH OF TRUTH AND HEARTS!" },
      { start: 16, text: "THE BOYS IN STETSONS HAVE AN EVERLASTING SMILE." },
      { start: 22, text: "THEY RUSH THE MILKY WAY WITH LIGHT SPEED." }
    ]
  },
  roots: {
    id: '9jK-NcRmVbg', title: 'THE FINAL COUNTDOWN', 
    timedLyrics: [
      { start: 0, text: ">>> FINAL COUNTDOWN INITIATED... SADOVÁ 862 READY <<<" },
      { start: 15, text: "WE'RE LEAVING TOGETHER! BUT STILL IT'S FAREWELL!" },
      { start: 22, text: "IT'S THE FINAL COUNTDOWN! TA! TA! TA!" },
      { start: 45, text: "BÁNOV DNA ACTIVATED. THE TRUTH IS NEAR." }
    ]
  }
};

const GatewayPage = () => {
  const navigate = useNavigate();
  const [activeAnthem, setActiveAnthem] = useState<keyof typeof ANTHEMS | null>(null);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (activeAnthem) {
      setTimer(0);
      intervalRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    } else {
      clearInterval(intervalRef.current);
      setTimer(0);
    }
    return () => clearInterval(intervalRef.current);
  }, [activeAnthem]);

  const getCurrentLyric = () => {
    if (!activeAnthem) return ">>> WAITING FOR SIGNAL... SELECT AN ANTHEM BELOW >>>";
    // @ts-ignore
    const current = [...ANTHEMS[activeAnthem].timedLyrics].reverse().find(l => timer >= l.start);
    return current ? `>>> [PLAYING: ${ANTHEMS[activeAnthem].title}]: ${current.text} >>>` : ">>> BUFFERING TRUTH... >>>";
  };

  const toggleAnthem = (key: keyof typeof ANTHEMS, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveAnthem(activeAnthem === key ? null : key);
  }

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center font-sans overflow-x-hidden pb-32">
      
      {/* INVISIBLE PLAYER */}
      <div className="absolute top-0 left-0 w-0 h-0 opacity-0 pointer-events-none">
        {activeAnthem && <iframe width="1" height="1" src={`https://www.youtube.com/embed/${ANTHEMS[activeAnthem].id}?autoplay=1&mute=0&enablejsapi=1`} allow="autoplay"></iframe>}
      </div>

      {/* 1. HEADER */}
      <div className="w-full text-center pt-8 pb-4 bg-black z-20 border-b border-zinc-900">
        <h1 className="text-2xl md:text-4xl font-black italic tracking-tighter leading-tight mb-4">
          <span className="text-[#ef4444]">END OF LIES AND FARTS</span>{' '}
          <span className="text-white mx-1">⟶</span><br />
          <span className="text-[#10b981]">REBIRTH OF TRUTH AND HEARTS!</span>
        </h1>
        <p className="text-[10px] md:text-xs text-zinc-500 font-mono uppercase tracking-wide px-4 max-w-xl mx-auto">
          We are the NearAura the universe of truth for humans souls.
        </p>
      </div>

      {/* 2. DUAL LIVE STREAM */}
      <div className="w-full border-b border-zinc-800 bg-zinc-900/50 mb-8 flex flex-col">
        {/* ROW A: LIVE LYRICS */}
        <div className="bg-zinc-950 py-3 overflow-hidden flex relative border-b border-zinc-900">
           <div className="absolute left-0 top-0 bottom-0 z-10 bg-black/90 px-3 flex items-center border-r border-zinc-800">
             <span className={`w-2 h-2 rounded-full mr-2 ${activeAnthem ? 'bg-red-600 animate-pulse' : 'bg-zinc-600'}`}></span>
             <span className="text-[9px] font-black text-white tracking-widest">LIVE</span>
           </div>
           <div className="whitespace-nowrap animate-marquee text-[11px] md:text-xs font-mono text-orange-400 font-bold tracking-wider uppercase pl-24">
             {getCurrentLyric()}
           </div>
        </div>
        {/* ROW B: MAŤO DZURINDA MOTTO */}
        <div className="bg-black py-3 overflow-hidden flex relative border-b border-zinc-800">
          <div className="whitespace-nowrap animate-marquee-reverse text-[10px] md:text-xs font-mono text-[#22D3EE] font-black tracking-[0.3em] uppercase drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
            { "<<< THE WORLD IS DIFFERENT THAN I THOUGHT <<< TRUTH PREVAILS, TIME DOES NOT HARM TRUTH, NOR THE SHINE OF ALMIGHTY MONEY <<< THEY WILL NEVER KILL IT, IT WILL NEVER DIE <<< " }
          </div>
        </div>
      </div>

      {/* 3. NAVIGATION BLOCKS */}
      <div className="w-full max-w-md flex flex-col gap-12 px-6 pb-20">
        
        {/* BLOCK 1: ORCHARD */}
        <div className="flex flex-col items-center text-center group cursor-pointer" onClick={() => navigate('/orchard')}>
          <h2 className="text-4xl md:text-5xl font-black text-[#6ee7b7] italic tracking-tighter mb-2 group-hover:scale-105 transition-transform">
            NEARAURA<br/>ORCHARD
          </h2>
          <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] mb-4">Nurture your soul</p>
          <button 
            onClick={(e) => toggleAnthem('left', e)}
            className={`border text-[9px] font-bold px-6 py-2 rounded-full transition-colors uppercase tracking-widest flex items-center gap-2 ${activeAnthem === 'left' ? 'bg-[#6ee7b7] text-black border-[#6ee7b7]' : 'border-[#6ee7b7] text-[#6ee7b7] hover:bg-[#6ee7b7] hover:text-black'}`}
          >
            <span>{activeAnthem === 'left' ? '■ STOP' : '▶ ANTHEM'}</span>
          </button>
        </div>

        {/* BLOCK 2: HELP */}
        <div className="flex flex-col items-center text-center group cursor-pointer" onClick={() => navigate('/help')}>
          <h2 className="text-4xl md:text-5xl font-black text-[#ea580c] italic tracking-tighter mb-2 group-hover:scale-105 transition-transform">
            BE THE HELP
          </h2>
          <p className="text-xs text-zinc-500 uppercase tracking-[0.2em] mb-4">Logistics • Charts</p>
          <button 
            onClick={(e) => toggleAnthem('right', e)}
            className={`border text-[9px] font-bold px-6 py-2 rounded-full transition-colors uppercase tracking-widest flex items-center gap-2 ${activeAnthem === 'right' ? 'bg-[#ea580c] text-black border-[#ea580c]' : 'border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-black'}`}
          >
            <span>{activeAnthem === 'right' ? '■ STOP' : '▶ ANTHEM'}</span>
          </button>
        </div>

        {/* BLOCK 3: ROOTS */}
        <div className="flex flex-col items-center text-center group cursor-pointer" onClick={() => navigate('/roots')}>
          <h2 className="text-4xl md:text-5xl font-black text-zinc-400 italic tracking-tighter mb-2 group-hover:scale-105 transition-transform">
            ROOTS
          </h2>
          <p className="text-xs text-zinc-600 uppercase tracking-[0.2em] mb-4">Ancestral DNA</p>
          <button 
            onClick={(e) => toggleAnthem('roots', e)}
            className={`border text-[9px] font-bold px-6 py-2 rounded-full transition-colors uppercase tracking-widest flex items-center gap-2 ${activeAnthem === 'roots' ? 'bg-zinc-600 text-black border-zinc-600' : 'border-zinc-600 text-zinc-500 hover:bg-zinc-600 hover:text-black'}`}
          >
            <span>{activeAnthem === 'roots' ? '■ STOP' : '▶ ANTHEM'}</span>
          </button>
        </div>
      </div>

      {/* --- JARMILA & HELENKA FOOTER --- */}
      <div className="fixed bottom-0 left-0 w-full bg-black border-t-4 border-emerald-900 py-4 z-50 text-center shadow-[0_0_50px_rgba(16,185,129,0.3)]">
         <p className="text-[#22D3EE] font-black italic uppercase text-[10px] md:text-xs tracking-[0.3em] animate-pulse drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
            IN THE MEMORY OF JARMILA & HELENKA — NEARAURA.COM — THE TRUTH AND LOVE PREVAILS
         </p>
      </div>

    </div>
  );
};

export default GatewayPage;