import React, { useState, useEffect } from 'react';
import { Crown, Check, XCircle, ChevronDown } from 'lucide-react';

const FRUITS = [
  { id: 'hendy', icon: '👑', label: 'HENDY', color: 'text-[#22D3EE]', border: 'border-[#22D3EE]', desc: 'Sovereign Soul. Royal standard of authentic identity. Pure unhackable presence.', mix: 'Universal Nodes', ban: 'Fakes & Snakes' },
  { id: 'strawberry', icon: '🍓', label: 'STRAWBERRY', color: 'text-red-500', border: 'border-red-500', desc: 'The Real Orchard. Drchlik Style. Family Gold.', mix: 'Pear, Coconut', ban: 'Anonymity' },
  { id: 'pineapple', icon: '🍍', label: 'PINEAPPLE', color: 'text-[#F97316]', border: 'border-[#F97316]', desc: 'Serious Love & Dating. High-frequency resonance for seeking a real soulmate.', mix: 'Peach, Banana', ban: 'Under 15' },
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
  const [selectedFruit, setSelectedFruit] = useState(FRUITS[2]); // Pineapple
  useEffect(() => { const i = setInterval(() => setRot(r => r + 0.04), 50); return () => clearInterval(i); }, []);

  return (
    // PŘIDÁNO pt-32 md:pt-48 PRO ODSTUP OD HEADERU
    <section className="relative min-h-screen w-full flex flex-col items-center bg-black text-white pt-32 md:pt-48 pb-20 px-6">
      
      {/* 1. GRID ORBS */}
      <div className="z-50 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 w-full max-w-[1400px] justify-items-center">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-aura-cyan/40 bg-aura-cyan/5 flex items-center justify-center font-black text-2xl md:text-3xl text-aura-cyan shadow-[0_0_30px_rgba(34,211,238,0.2)]">842</div>
            <span className="text-[9px] font-black tracking-[0.3em] uppercase opacity-60 mt-3">Founders</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-aura-orange/40 bg-aura-orange/5 flex items-center justify-center font-black text-2xl md:text-3xl text-aura-orange shadow-[0_0_30px_rgba(249,115,22,0.2)]">12</div>
            <span className="text-[9px] font-black tracking-[0.3em] uppercase opacity-60 mt-3 text-aura-orange">Elite</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-red-500/40 bg-red-500/5 flex items-center justify-center font-black text-2xl md:text-3xl text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]">62d</div>
            <span className="text-[9px] font-black tracking-[0.3em] uppercase opacity-60 mt-3 text-red-500">Launch</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-aura-cyan/40 bg-aura-cyan/5 flex items-center justify-center font-black text-2xl md:text-3xl text-aura-cyan shadow-[0_0_30px_rgba(34,211,238,0.2)]">42</div>
            <span className="text-[9px] font-black tracking-[0.3em] uppercase opacity-60 mt-3">Hall</span>
          </div>
      </div>

      {/* 2. PICK YOUR TRUTH BUTTON */}
      <button className="mb-16 z-20 bg-gradient-to-r from-orange-600 to-red-600 text-white px-10 py-5 rounded-full font-[1000] text-xs md:text-sm uppercase tracking-[0.4em] shadow-[0_0_50px_rgba(234,88,12,0.4)] border border-white/20 animate-pulse hover:scale-105 transition-transform">
        ENTER THE ORCHARD • PICK YOUR TRUTH
      </button>

      {/* 3. MAIN HUB */}
      <div className="w-full max-w-[1600px] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        
        <div className="flex justify-center relative min-h-[400px] md:min-h-[600px]">
            <div className="relative w-[350px] h-[350px] md:w-[600px] md:h-[600px]">
                <div className="absolute inset-0 bg-aura-orange/10 rounded-full blur-[120px]"></div>
                <div className="absolute inset-0 rounded-full border border-white/5" style={{ transform: `rotate(${rot}deg)` }}>
                    {FRUITS.map((f, i) => {
                        const angle = (i * 360) / FRUITS.length;
                        const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 150 : 280;
                        const isPineapple = f.id === 'pineapple';
                        return (
                            <div key={f.id} onClick={() => setSelectedFruit(f)} 
                                 className={`absolute top-1/2 left-1/2 w-14 h-14 -ml-7 -mt-7 flex items-center justify-center text-3xl md:text-5xl cursor-pointer transition-all ${isPineapple ? 'scale-[1.6] z-50 drop-shadow-[0_0_20px_rgba(249,115,22,0.7)]' : 'scale-100 opacity-70 hover:opacity-100'}`}
                                 style={{ transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)` }}>
                                 {f.icon}
                            </div>
                        );
                    })}
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"><Crown size={160} className="text-aura-orange opacity-30" strokeWidth={0.5} /></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[18rem] pointer-events-none drop-shadow-2xl">{selectedFruit.icon}</div>
            </div>
        </div>

        <div className="flex justify-center w-full px-4">
          <div className={`bg-black/40 border-4 ${selectedFruit.border} p-10 md:p-16 rounded-[50px] md:rounded-[100px] backdrop-blur-3xl w-full max-w-[700px] shadow-2xl transition-all duration-500`}>
            <div className="flex items-center gap-8 mb-10 border-b border-white/10 pb-10">
              <span className="text-7xl md:text-9xl">{selectedFruit.icon}</span>
              <h2 className={`text-4xl md:text-7xl font-[1000] uppercase tracking-tighter leading-none ${selectedFruit.color}`}>{selectedFruit.label}</h2>
            </div>
            
            <p className="text-2xl md:text-4xl font-black text-white uppercase leading-tight mb-12 italic break-words">
              "{selectedFruit.desc}"
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex items-start gap-5">
                <Check className="text-green-500 w-10 h-10 shrink-0" />
                <div>
                  <h3 className="text-[10px] font-black uppercase text-green-500 tracking-widest mb-2">Good Chemistry</h3>
                  <p className="text-lg text-zinc-300 uppercase font-bold leading-tight">{selectedFruit.mix}</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <XCircle className="text-red-500 w-10 h-10 shrink-0" />
                <div>
                  <h3 className="text-[10px] font-black uppercase text-red-500 tracking-widest mb-2">Kryptonite</h3>
                  <p className="text-lg text-zinc-300 uppercase font-bold leading-tight">{selectedFruit.ban}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. FOOTER ŠIPKA */}
      <div className="z-50 flex flex-col items-center gap-4 cursor-pointer animate-bounce mt-10 mb-12">
        <span className="font-black text-[10px] md:text-sm tracking-[0.6em] text-aura-cyan uppercase animate-pulse">UNVEIL TRUTH & LOVE</span>
        <ChevronDown size={40} className="text-white opacity-80" strokeWidth={3} />
      </div>

      {/* 5. FINÁLNÍ NADPIS */}
      <div className="text-center w-full pb-24">
        <h1 className="text-6xl md:text-[11rem] font-black italic tracking-tighter leading-[0.8] mb-10 text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#8B5CF6] to-[#22D3EE] drop-shadow-[0_0_60px_rgba(249,115,22,0.4)]">
          THE END OF <br /> LONELY SWIPE
        </h1>
        <p className="text-aura-cyan text-sm md:text-3xl font-[1000] uppercase tracking-[0.6em] opacity-80 italic">
          "The Truth and Love Must Prevail Over Lies and Hatred."
        </p>
      </div>

    </section>
  );
}
