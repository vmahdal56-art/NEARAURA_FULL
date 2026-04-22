import React, { useState, useEffect } from 'react';
import { Crown, Check, XCircle, ChevronDown } from 'lucide-react';

const FRUITS = [
  { id: 'hendy', icon: '👑', label: 'HENDY', color: 'text-[#22D3EE]', border: 'border-[#22D3EE]', desc: 'Sovereign Soul. Royal standard of authentic identity.', mix: 'Universal Nodes', ban: 'Fakes & Snakes' },
  { id: 'strawberry', icon: '🍓', label: 'STRAWBERRY', color: 'text-red-500', border: 'border-red-500', desc: 'The Real Orchard. Drchlik Style. Family Gold.', mix: 'Pear, Coconut', ban: 'Anonymity' },
  { id: 'pineapple', icon: '🍍', label: 'PINEAPPLE', color: 'text-[#F97316]', border: 'border-[#F97316]', desc: 'Serious Love & Dating. High-frequency resonance.', mix: 'Peach, Banana', ban: 'Under 15' },
  { id: 'orange', icon: '🍊', label: 'ORANGE', color: 'text-orange-500', border: 'border-orange-500', desc: 'Pure Friendship.', mix: 'Cherry, Grape', ban: 'Romance Intent' },
  { id: 'grape', icon: '🍇', label: 'GRAPE', color: 'text-purple-500', border: 'border-purple-500', desc: 'Community Hub.', mix: 'Watermelon, Orange', ban: 'Isolation' },
  { id: 'watermelon', icon: '🍉', label: 'WATERMELON', color: 'text-green-500', border: 'border-green-500', desc: 'Active Energy.', mix: 'Grape, Orange', ban: 'Boredom' },
  { id: 'coconut', icon: '🥥', label: 'COCONUT', color: 'text-white', border: 'border-white', desc: 'Technical Help.', mix: 'Strawberry, Pear', ban: 'Theory only' },
  { id: 'mango', icon: '🥭', label: 'MANGO', color: 'text-pink-500', border: 'border-pink-500', desc: 'Identity & Pride.', mix: 'Open Souls', ban: 'Bigotry' },
  { id: 'banana', icon: '🍌', label: 'BANANA', color: 'text-yellow-400', border: 'border-yellow-400', desc: 'Intimacy (Male).', mix: 'Peach, Pineapple', ban: 'Under 18' },
  { id: 'peach', icon: '🍑', label: 'PEACH', color: 'text-rose-400', border: 'border-rose-400', desc: 'Intimacy (Female).', mix: 'Banana, Pineapple', ban: 'Under 18' },
  { id: 'pear', icon: '🍐', label: 'PEAR', color: 'text-emerald-500', border: 'border-emerald-500', desc: 'Household Anchor.', mix: 'Strawberry, Coconut', ban: 'Infidelity' },
  { id: 'cherry', icon: '🍒', label: 'CHERRY', color: 'text-red-600', border: 'border-red-600', desc: 'Nightlife Pulse.', mix: 'Orange, Grape', ban: 'Sadness' },
  { id: 'lemon', icon: '🍋', label: 'LEMON', color: 'text-yellow-200', border: 'border-yellow-200', desc: 'Healing Node.', mix: 'Universal', ban: 'Neglect' }
];

export default function Manifesto() {
  const [rot, setRot] = useState(0);
  const [selectedFruit, setSelectedFruit] = useState(FRUITS[2]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detekce pro laptopy a mobily (< 1280px)
    const checkMobile = () => setIsMobile(window.innerWidth < 1280); 
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => { const i = setInterval(() => setRot(r => r + 0.04), 50); return () => clearInterval(i); }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center bg-black text-white pt-24 md:pt-40 pb-20 px-4 overflow-x-hidden">
      
      {/* 1. GRID ORBS */}
      <div className="grid grid-cols-4 gap-4 mb-8 w-full max-w-5xl justify-items-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-aura-cyan/40 bg-aura-cyan/5 flex items-center justify-center font-black text-xl text-aura-cyan shadow-[0_0_30px_rgba(34,211,238,0.2)]">842</div>
            <span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-60 mt-2">Founders</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-aura-orange/40 bg-aura-orange/5 flex items-center justify-center font-black text-xl text-aura-orange">12</div>
            <span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-60 mt-2 text-aura-orange">Elite</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-red-500/40 bg-red-500/5 flex items-center justify-center font-black text-xl text-red-500">62d</div>
            <span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-60 mt-2 text-red-500">Launch</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-aura-cyan/40 bg-aura-cyan/5 flex items-center justify-center font-black text-xl text-aura-cyan">42</div>
            <span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-60 mt-2">Hall</span>
          </div>
      </div>

      {/* 2. BUTTON FIX: TEXT JE ZPĚT */}
      <button className="mb-12 bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 md:px-10 py-4 rounded-full font-[1000] text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] shadow-lg animate-pulse hover:scale-105 transition-transform text-center w-full md:w-auto">
        ENTER THE ORCHARD • PICK YOUR TRUTH
      </button>

      {/* 3. MAIN SECTION */}
      <div className="w-full max-w-7xl grid grid-cols-1 xl:grid-cols-2 gap-12 items-center mb-24">
        
        {/* ORBIT */}
        <div className="flex justify-center relative min-h-[400px] md:min-h-[500px]">
             <div className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px]">
                <div className="absolute inset-0 bg-aura-orange/10 rounded-full blur-[80px]"></div>
                <div className="absolute inset-0 rounded-full" style={{ transform: `rotate(${rot}deg)` }}>
                    {FRUITS.map((f, i) => {
                        const angle = (i * 360) / FRUITS.length;
                        const radius = isMobile ? 140 : 240; 
                        const isPineapple = f.id === 'pineapple';
                        return (
                            <div key={f.id} onClick={() => setSelectedFruit(f)} 
                                 className={`absolute top-1/2 left-1/2 w-12 h-12 md:w-14 md:h-14 -ml-6 -mt-6 flex items-center justify-center text-3xl md:text-5xl cursor-pointer transition-all ${isPineapple ? 'scale-125 z-50 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]' : 'opacity-70 hover:opacity-100'}`}
                                 style={{ transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)` }}>
                                 {f.icon}
                            </div>
                        );
                    })}
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[14rem] pointer-events-none drop-shadow-2xl">
                    {selectedFruit.icon}
                </div>
            </div>
        </div>

        {/* INFO CARD */}
        <div className="flex justify-center w-full">
          <div className={`bg-black/80 border-2 md:border-4 ${selectedFruit.border} p-8 md:p-12 rounded-[40px] md:rounded-[60px] backdrop-blur-xl w-full max-w-[600px] shadow-2xl transition-all`}>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 border-b border-white/10 pb-8 text-center sm:text-left">
              <span className="text-7xl sm:text-8xl">{selectedFruit.icon}</span>
              <h2 className={`text-4xl sm:text-6xl font-[1000] uppercase tracking-tighter leading-none ${selectedFruit.color} break-words`}>
                {selectedFruit.label}
              </h2>
            </div>
            
            <p className="text-2xl sm:text-3xl font-black text-white uppercase leading-tight mb-8 italic text-center sm:text-left">
              "{selectedFruit.desc}"
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="bg-white/5 p-4 rounded-xl">
                  <h3 className="text-[10px] font-black uppercase text-green-500 tracking-widest mb-1">Good Chemistry</h3>
                  <p className="text-base font-bold uppercase text-zinc-300">{selectedFruit.mix}</p>
               </div>
               <div className="bg-white/5 p-4 rounded-xl">
                  <h3 className="text-[10px] font-black uppercase text-red-500 tracking-widest mb-1">Kryptonite</h3>
                  <p className="text-base font-bold uppercase text-zinc-300">{selectedFruit.ban}</p>
               </div>
            </div>

          </div>
        </div>
      </div>

       {/* FOOTER TITLE & SLOGAN */}
       <div className="text-center w-full pb-12 px-4">
        <h1 className="text-5xl md:text-[8rem] font-black italic tracking-tighter leading-none md:leading-[0.8] mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#8B5CF6] to-[#22D3EE] break-words">
          THE END OF <br /> LONELY SWIPE
        </h1>
        <p className="text-aura-cyan text-[10px] md:text-2xl font-[1000] uppercase tracking-[0.2em] md:tracking-[0.6em] opacity-80 italic mt-6 px-4">
            "The Truth and Love Must Prevail Over Lies and Hatred."
        </p>
      </div>
    </section>
  );
}