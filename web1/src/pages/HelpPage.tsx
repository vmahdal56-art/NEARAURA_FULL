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
export default HelpPage;
