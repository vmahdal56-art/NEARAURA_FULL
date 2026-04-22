import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Hammer, Shield, Radar, Crosshair, Heart } from 'lucide-react';

const FRUITS = [
  { id: 'hendy', icon: '👑', label: 'HENDY', color: 'text-[#22D3EE]', border: 'border-[#22D3EE]', desc: 'Sovereign Soul.', mix: 'Universal Nodes', ban: 'Fakes & Snakes' },
  { id: 'strawberry', icon: '🍓', label: 'STRAWBERRY', color: 'text-red-500', border: 'border-red-500', desc: 'The Real Orchard.', mix: 'Pear, Coconut', ban: 'Anonymity' },
  { id: 'pineapple', icon: '🍍', label: 'PINEAPPLE', color: 'text-[#F97316]', border: 'border-[#F97316]', desc: 'Serious Dating.', mix: 'Peach, Banana', ban: 'Under 15' },
  { id: 'coconut', icon: '🥥', label: 'COCONUT', color: 'text-white', border: 'border-white', desc: 'Technical Help.', mix: 'Strawberry', ban: 'Theory only' },
  { id: 'orange', icon: '🍊', label: 'ORANGE', color: 'text-orange-500', border: 'border-orange-500', desc: 'Pure Friendship.', mix: 'Cherry, Grape', ban: 'Romance Intent' },
  { id: 'grape', icon: '🍇', label: 'GRAPE', color: 'text-purple-500', border: 'border-purple-500', desc: 'Community Hub.', mix: 'Watermelon, Orange', ban: 'Isolation' },
  { id: 'watermelon', icon: '🍉', label: 'WATERMELON', color: 'text-green-500', border: 'border-green-500', desc: 'Active Energy.', mix: 'Grape, Orange', ban: 'Boredom' },
  { id: 'mango', icon: '🥭', label: 'MANGO', color: 'text-pink-500', border: 'border-pink-500', desc: 'Identity & Pride.', mix: 'Open Souls', ban: 'Bigotry' },
  { id: 'banana', icon: '🍌', label: 'BANANA', color: 'text-yellow-400', border: 'border-yellow-400', desc: 'Intimacy (Male).', mix: 'Peach, Pineapple', ban: 'Under 18' },
  { id: 'peach', icon: '🍑', label: 'PEACH', color: 'text-rose-400', border: 'border-rose-400', desc: 'Intimacy (Female).', mix: 'Banana, Pineapple', ban: 'Under 18' },
  { id: 'pear', icon: '🍐', label: 'PEAR', color: 'text-emerald-500', border: 'border-emerald-500', desc: 'Household Anchor.', mix: 'Strawberry, Coconut', ban: 'Infidelity' },
  { id: 'cherry', icon: '🍒', label: 'CHERRY', color: 'text-red-600', border: 'border-red-600', desc: 'Nightlife Pulse.', mix: 'Orange, Grape', ban: 'Sadness' },
  { id: 'lemon', icon: '🍋', label: 'LEMON', color: 'text-yellow-200', border: 'border-yellow-200', desc: 'Healing Node.', mix: 'Universal', ban: 'Neglect' }
];

export default function Manifesto() {
  const [rot, setRot] = useState(0);
  const [selectedFruit, setSelectedFruit] = useState(FRUITS[2]); // Pineapple default
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1280); 
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => { const i = setInterval(() => setRot(r => r + 0.04), 50); return () => clearInterval(i); }, []);

  return (
    <section id="manifesto" className="relative min-h-screen w-full flex flex-col items-center bg-black text-white pt-32 pb-20 px-4 overflow-x-hidden">
      
      {/* GRID ORBS */}
      <div className="grid grid-cols-4 gap-4 mb-8 w-full max-w-5xl justify-items-center">
          <div className="flex flex-col items-center"><div className="w-16 h-16 rounded-full border border-cyan-500/40 bg-cyan-500/5 flex items-center justify-center font-black text-xl text-cyan-500">842</div></div>
          <div className="flex flex-col items-center"><div className="w-16 h-16 rounded-full border border-orange-500/40 bg-orange-500/5 flex items-center justify-center font-black text-xl text-orange-500">12</div></div>
          <div className="flex flex-col items-center"><div className="w-16 h-16 rounded-full border border-red-500/40 bg-red-500/5 flex items-center justify-center font-black text-xl text-red-500">62d</div></div>
          <div className="flex flex-col items-center"><div className="w-16 h-16 rounded-full border border-cyan-500/40 bg-cyan-500/5 flex items-center justify-center font-black text-xl text-cyan-500">42</div></div>
      </div>

      <button className="mb-12 bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-full font-[1000] text-xs uppercase tracking-[0.2em] shadow-lg animate-pulse hover:scale-105 transition-transform">
        ENTER THE ORCHARD • PICK YOUR TRUTH
      </button>

      {/* MAIN ORBIT SECTION */}
      <div className="w-full max-w-7xl grid grid-cols-1 xl:grid-cols-2 gap-12 items-center mb-24">
        
        {/* ORBIT */}
        <div className="flex justify-center relative min-h-[400px]">
             <div className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px]">
                <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-[80px]"></div>
                <div className="absolute inset-0 rounded-full" style={{ transform: `rotate(${rot}deg)` }}>
                    {FRUITS.map((f, i) => {
                        const angle = (i * 360) / FRUITS.length;
                        const radius = isMobile ? 140 : 240; 
                        const isSelected = selectedFruit.id === f.id;
                        return (
                            <div key={f.id} onClick={() => setSelectedFruit(f)} 
                                 className={`absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6 flex items-center justify-center text-3xl cursor-pointer transition-all ${isSelected ? 'scale-150 z-50 drop-shadow-[0_0_15px_white]' : 'opacity-70 hover:scale-125'}`}
                                 style={{ transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)` }}>
                                 {f.icon}
                            </div>
                        );
                    })}
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] pointer-events-none drop-shadow-2xl">
                    {selectedFruit.icon}
                </div>
            </div>
        </div>

        {/* INFO CARD & KOKOS BUTTON */}
        <div className="flex flex-col items-center xl:items-start w-full">
          <div className={`bg-black/80 border-4 ${selectedFruit.border} p-12 rounded-[40px] backdrop-blur-xl w-full max-w-[600px] shadow-2xl mb-8`}>
            <h2 className={`text-6xl font-[1000] uppercase tracking-tighter leading-none ${selectedFruit.color} mb-4`}>{selectedFruit.label}</h2>
            <p className="text-3xl font-black text-white uppercase leading-tight mb-8 italic">"{selectedFruit.desc}"</p>
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white/5 p-4 rounded-xl"><h3 className="text-[10px] font-black uppercase text-green-500">Good Mix</h3><p className="text-base font-bold text-zinc-300">{selectedFruit.mix}</p></div>
               <div className="bg-white/5 p-4 rounded-xl"><h3 className="text-[10px] font-black uppercase text-red-500">Bad Mix</h3><p className="text-base font-bold text-zinc-300">{selectedFruit.ban}</p></div>
            </div>
          </div>

          {/* DYNAMIC BUTTON: ONLY FOR COCONUT */}
          {selectedFruit.id === 'coconut' && (
             <Link to="/kokospage" className="animate-fade-in-up group bg-[#eab308] text-black px-8 py-4 rounded-full font-black text-xl uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_30px_rgba(234,179,8,0.5)] flex items-center gap-3">
                <Hammer size={24} /> FIND PROPER HANDYMAN
             </Link>
          )}

        </div>
      </div>

       <div className="text-center w-full pb-8 px-4">
        <h1 className="text-5xl md:text-[8rem] font-black italic tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#8B5CF6] to-[#22D3EE]">
          THE END OF <br /> LONELY SWIPE
        </h1>
        {/* NEW SUBTITLE */}
        <p className="text-xs md:text-sm font-bold uppercase tracking-[0.5em] text-zinc-500 mt-6 animate-pulse">
            THE TRUTH AND LOVE PREVAILS LIES AND HATRED
        </p>
      </div>

      {/* --- NEW: THE TWIN RADARS (DNA INJECTION) --- */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 px-4 pb-20">
          
          {/* RADAR A: THE SOVEREIGN CODEX (Origin: DNAFULL.txt) */}
          <div className="relative p-10 border border-white/10 bg-black/50 rounded-3xl overflow-hidden flex flex-col items-center group hover:border-[#22D3EE]/50 transition-colors">
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Radar size={16} className="text-[#22D3EE] animate-spin-slow" />
                <span className="text-[10px] font-black tracking-widest text-[#22D3EE] uppercase">RADAR_A :: CODEX_SCAN</span>
              </div>

              {/* SVG RADAR A */}
              <div className="relative w-full max-w-[300px] aspect-square my-8">
                <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <defs>
                    <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                      <stop offset="0%" stopColor="#A855F7" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#050505" stopOpacity="0" />
                    </radialGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <circle cx="250" cy="250" r="100" fill="none" stroke="#333" strokeWidth="1" opacity="0.5" />
                  <circle cx="250" cy="250" r="180" fill="none" stroke="#333" strokeWidth="1" opacity="0.3" />
                  <circle cx="250" cy="250" r="220" fill="url(#grad1)" opacity="0.4" className="animate-pulse" />

                  {/* Shield Icon Path */}
                  <path 
                    d="M250,180 L290,200 L290,240 C290,280 250,310 250,310 C250,310 210,280 210,240 L210,200 Z" 
                    fill="#000" stroke="#22D3EE" strokeWidth="2" filter="url(#glow)"
                  />
                  {/* Rotating Scanner Line */}
                  <line x1="250" y1="250" x2="250" y2="50" stroke="url(#grad1)" strokeWidth="2">
                      <animateTransform attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur="4s" repeatCount="indefinite" />
                  </line>
                </svg>
              </div>
              <h3 className="text-2xl font-black italic text-white uppercase">The Codex</h3>
              <p className="text-xs text-zinc-500 tracking-widest uppercase mt-2">Scanning for Truth...</p>
          </div>

          {/* RADAR B: BIOMETRIC SYNC (Origin: DNAFULL.txt) */}
          <div className="relative p-10 border border-white/10 bg-[#08080A] rounded-3xl overflow-hidden flex flex-col items-center group hover:border-[#F97316]/50 transition-colors">
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Crosshair size={16} className="text-[#F97316] animate-pulse" />
                <span className="text-[10px] font-black tracking-widest text-[#F97316] uppercase">RADAR_B :: BIO_SYNC</span>
              </div>

              {/* SVG RADAR B */}
              <div className="relative w-full max-w-[300px] aspect-square my-8 flex items-center justify-center">
                 <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                   <defs>
                     <radialGradient id="grad2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                       <stop offset="0%" stopColor="#F97316" stopOpacity="0.4" />
                       <stop offset="100%" stopColor="#000" stopOpacity="0" />
                     </radialGradient>
                   </defs>
                   
                   <path d="M250,0 L250,500 M0,250 L500,250" stroke="#222" strokeWidth="1" />
                   <circle cx="250" cy="250" r="150" fill="none" stroke="#222" strokeDasharray="4 4" />
                   
                   {/* Heatmap Pulse */}
                   <circle cx="250" cy="250" r="120" fill="url(#grad2)">
                     <animate attributeName="r" values="100;120;100" dur="2s" repeatCount="indefinite" />
                     <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
                   </circle>

                   {/* Heart Icon Center */}
                   <foreignObject x="218" y="218" width="64" height="64">
                      <div className="flex items-center justify-center w-full h-full">
                          <Heart size={64} className="text-[#F97316] animate-pulse fill-black" />
                      </div>
                   </foreignObject>
                 </svg>
              </div>
              <h3 className="text-2xl font-black italic text-white uppercase">Bio-Sync</h3>
              <p className="text-xs text-zinc-500 tracking-widest uppercase mt-2">Pulse Detected: 72 BPM</p>
          </div>

      </div>

    </section>
  );
}