import React, { useState, useEffect } from 'react';
import { Crown, Check, XCircle, Zap, Globe, Clock, ShieldCheck } from 'lucide-react';

// 13 FRUITS - PROPER LONDON ENGLISH
const FRUITS = [
  { id: 'hendy', icon: '👑', label: 'HENDY', color: 'text-[#67e8f9]', border: 'border-[#67e8f9]', desc: 'Sovereign Soul. The Royal standard of authentic identity. Pure unhackable presence.', mix: 'Universal Nodes', ban: 'Fakes & Snakes' },
  { id: 'strawberry', icon: '🍓', label: 'STRAWBERRY', color: 'text-[#ef4444]', border: 'border-[#ef4444]', desc: 'The Real Orchard. Strawberries & Cream. Drchlik Style. Family Gold.', mix: 'Pear, Coconut', ban: 'Anonymity' },
  { id: 'pineapple', icon: '🍍', label: 'PINEAPPLE', color: 'text-[#fbbf24]', border: 'border-[#fbbf24]', desc: 'Serious Love & Dating. High-frequency resonance for seeking a real soulmate.', mix: 'Peach, Banana', ban: 'Under 15' },
  { id: 'orange', icon: '🍊', label: 'ORANGE', color: 'text-[#f97316]', border: 'border-[#f97316]', desc: 'Pure Friendship. Socializing without pressure. Expand your sovereign circle.', mix: 'Cherry, Grape', ban: 'Romance Intent' },
  { id: 'grape', icon: '🍇', label: 'GRAPE', color: 'text-[#a855f7]', border: 'border-[#a855f7]', desc: 'Community Hub. Tribes, networking, and shared interests in the neighborhood.', mix: 'Watermelon, Orange', ban: 'Isolation' },
  { id: 'watermelon', icon: '��', label: 'WATERMELON', color: 'text-[#4ade80]', border: 'border-[#4ade80]', desc: 'Active Energy. Teammates for sports and outdoor movement.', mix: 'Grape, Orange', ban: 'Boredom' },
  { id: 'coconut', icon: '🥥', label: 'COCONUT', color: 'text-[#e2e8f0]', border: 'border-[#e2e8f0]', desc: 'Technical Help. Local DIY support, handymen, and skill exchange.', mix: 'Strawberry, Pear', ban: 'Theory only' },
  { id: 'mango', icon: '🥭', label: 'MANGO', color: 'text-[#f472b6]', border: 'border-[#f472b6]', desc: 'Identity & Pride. Safe frequency for the Rainbow spectrum.', mix: 'Open Souls', ban: 'Bigotry' },
  { id: 'banana', icon: '🍌', label: 'BANANA', color: 'text-[#facc15]', border: 'border-[#facc15]', desc: 'Intimacy (Male). Deep physical resonance and attraction.', mix: 'Peach, Pineapple', ban: 'Under 18' },
  { id: 'peach', icon: '🍑', label: 'PEACH', color: 'text-[#fb7185]', border: 'border-[#fb7185]', desc: 'Intimacy (Female). Deep physical resonance and attraction.', mix: 'Banana, Pineapple', ban: 'Under 18' },
  { id: 'pear', icon: '🍐', label: 'PEAR', color: 'text-[#10b981]', border: 'border-[#10b981]', desc: 'Household Anchor. Committed family values and home building.', mix: 'Strawberry, Coconut', ban: 'Infidelity' },
  { id: 'cherry', icon: '🍒', label: 'CHERRY', color: 'text-[#ef4444]', border: 'border-[#ef4444]', desc: 'Nightlife Pulse. Spontaneous neighborhood fun and parties.', mix: 'Orange, Grape', ban: 'Sadness' },
  { id: 'lemon', icon: '🍋', label: 'LEMON', color: 'text-[#fef08a]', border: 'border-[#fef08a]', desc: 'Healing Node. Spiritual guidance and Dr. Aura support.', mix: 'Universal', ban: 'Neglect' }
];

export default function Manifesto() {
  const [rot, setRot] = useState(0);
  const [selectedFruit, setSelectedFruit] = useState(FRUITS[0]);

  // CLOUD DATA STATE
  const [stats] = useState({
    foundersLeft: 842,
    eliteLeft: 12,
    fameTotal: 42
  });

  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = new Date('2026-03-21T00:00:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      setTimeLeft({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((diff % (1000 * 60)) / 1000)
      });
      setRot(r => r + 0.04);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOrbClick = () => { console.log("Navigating..."); };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center bg-black text-white overflow-x-hidden py-8 md:py-20">
      
      {/* 1. QUAD ORBS (GRID) */}
      <div className="z-50 grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 px-4 w-full max-w-4xl shrink-0 mt-20 md:mt-0 justify-items-center">
          
          {/* Founders */}
          <div className="flex flex-col items-center cursor-pointer group hover:scale-105 transition-all">
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl flex flex-col items-center justify-center shadow-lg group-hover:bg-white/10">
                  <span className="text-sm md:text-xl font-black">{stats.foundersLeft}</span>
                  <span className="text-[6px] md:text-[8px] font-mono tracking-widest text-zinc-500 mt-1">LEFT</span>
              </div>
              <span className="text-[7px] md:text-[8px] font-black tracking-[0.2em] mt-2 text-white/60 uppercase">Founders</span>
          </div>

          {/* Elite */}
          <div className="flex flex-col items-center cursor-pointer group hover:scale-105 transition-all">
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border border-orange-500/30 bg-orange-500/5 backdrop-blur-xl flex flex-col items-center justify-center shadow-lg group-hover:bg-orange-500/10">
                  <span className="text-sm md:text-xl font-black text-orange-500">{stats.eliteLeft}</span>
                  <span className="text-[6px] md:text-[8px] font-mono tracking-widest text-orange-500/60 mt-1">LEFT</span>
              </div>
              <span className="text-[7px] md:text-[8px] font-black tracking-[0.2em] mt-2 text-orange-500/80 uppercase">Elite</span>
          </div>

          {/* Launch */}
          <div className="flex flex-col items-center cursor-pointer group hover:scale-105 transition-all">
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-red-600/40 bg-red-600/5 backdrop-blur-xl flex flex-col items-center justify-center shadow-lg group-hover:bg-red-600/10">
                  <span className="text-[8px] md:text-[11px] font-mono font-black text-red-500">{timeLeft.d}d:{timeLeft.h}h</span>
                  <span className="text-[7px] md:text-[8px] font-mono font-black text-red-500/80">{timeLeft.m}m</span>
              </div>
              <span className="text-[7px] md:text-[8px] font-black tracking-[0.2em] mt-2 text-red-500 uppercase">Launch</span>
          </div>

          {/* Hall of Fame */}
          <div className="flex flex-col items-center cursor-pointer group hover:scale-105 transition-all">
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border border-cyan-400/30 bg-cyan-400/5 backdrop-blur-xl flex flex-col items-center justify-center shadow-lg group-hover:bg-cyan-400/10">
                  <span className="text-sm md:text-xl font-black text-cyan-400">{stats.fameTotal}</span>
                  <span className="text-[6px] md:text-[8px] font-mono tracking-widest text-cyan-400/60 mt-1">LEGENDS</span>
              </div>
              <span className="text-[7px] md:text-[8px] font-black tracking-[0.2em] mt-2 text-cyan-400/80 uppercase">Hall of Fame</span>
          </div>
      </div>

      {/* 2. TLAČÍTKO */}
      <div className="mb-8 z-20 shrink-0">
         <button className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.3em] shadow-[0_0_40px_rgba(234,88,12,0.5)] hover:scale-105 transition-transform border border-white/20 animate-pulse-slow">
            ENTER THE ORCHARD • PICK YOUR TRUTH
         </button>
      </div>

      {/* 3. HLAVNÍ GRID: SLUNCE (13 Plodů) & RÁMEČEK - FULL WIDTH EXPANSION */}
      {/* ZMĚNA: w-full max-w-[95vw] (téměř celá šířka) a mezera gap-4 až gap-20 pro vzdušnost */}
      <div className="w-full max-w-[95vw] lg:max-w-[90vw] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center mb-12 shrink-0 px-4">
        
        {/* LEVÁ STRANA: SLUNCE - OBROVSKÉ A VYCENTROVANÉ */}
        <div className="flex justify-center lg:justify-end relative h-[400px] md:h-[600px] w-full">
            <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 bg-[#F97316]/5 rounded-full blur-[100px]"></div>
                
                {/* ORBIT - ZVĚTŠENÝ POLOMĚR PRO FULL WIDTH */}
                <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-white/5" style={{ transform: `rotate(${rot}deg)` }}>
                    {FRUITS.map((f, i) => {
                        const angle = (i * 360) / FRUITS.length;
                        const scale = f.id === 'pineapple' ? 1.4 : 1; // Ještě větší ananas
                        // Poloměr: Mobil 140px, Desktop 240px (Prostor!)
                        const radius = window.innerWidth < 768 ? 140 : 240;
                        
                        return (
                            <div key={f.id} 
                                 onClick={() => setSelectedFruit(f)}
                                 className="absolute top-1/2 left-1/2 w-8 h-8 md:w-12 md:h-12 -ml-4 md:-ml-6 -mt-4 md:-mt-6 flex items-center justify-center text-xl md:text-3xl cursor-pointer hover:scale-125 transition-transform"
                                 style={{ 
                                   transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg) scale(${scale})` 
                                 }}>
                                {f.icon}
                            </div>
                        );
                    })}
                </div>

                {/* Střed - Koruna */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
                    <Crown size={80} className="text-[#F97316] opacity-90 md:w-[120px] md:h-[120px]" strokeWidth={0.5} />
                </div>

                {/* Střed - Detail Ovoce */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl md:text-[10rem] opacity-90 z-10 drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] pointer-events-none">
                    {selectedFruit.icon}
                </div>
            </div>
        </div>

        {/* PRAVÁ STRANA: RÁMEČEK (London English) - ŠIRŠÍ */}
        <div className="flex justify-center lg:justify-start w-full">
          <div className={`bg-black/80 border-2 ${selectedFruit.border} p-8 md:p-12 rounded-[30px] md:rounded-[50px] backdrop-blur-xl w-full max-w-[500px] relative overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)] transition-colors duration-500`}>
            
            <div className="flex items-center gap-6 mb-6 md:mb-8 border-b border-white/10 pb-6">
                <span className="text-4xl md:text-6xl">{selectedFruit.icon}</span>
                <div>
                    <h2 className={`text-2xl md:text-4xl font-black uppercase ${selectedFruit.color} leading-none`}>{selectedFruit.label}</h2>
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 mt-2">{selectedFruit.sub}</p>
                </div>
            </div>
            
            <div className="max-h-[150px] overflow-y-auto custom-scrollbar mb-8">
                <p className="text-sm md:text-lg font-bold text-white uppercase leading-relaxed break-words">
                    "{selectedFruit.desc}"
                </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1"><Check size={18} className="text-green-500" /></div>
                <div>
                    <h3 className="text-[10px] md:text-xs font-black uppercase tracking-wider text-green-500 mb-1">Compatible</h3>
                    <p className="text-xs md:text-sm text-zinc-400 font-mono leading-tight break-words">{selectedFruit.mix}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1"><XCircle size={18} className="text-red-500" /></div>
                <div>
                    <h3 className="text-[10px] md:text-xs font-black uppercase tracking-wider text-red-500 mb-1">Toxic / Ban</h3>
                    <p className="text-xs md:text-sm text-zinc-400 font-mono leading-tight break-words">{selectedFruit.ban}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. UNVEIL TRIGGER */}
      <div className="z-50 mt-auto flex flex-col items-center gap-2 cursor-pointer animate-bounce mb-6 shrink-0">
        <span className="font-mono text-[9px] md:text-[10px] font-black tracking-[0.6em] text-white/80 uppercase animate-pulse">
          UNVEIL TRUTH & LOVE
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-white/90">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      {/* 5. FOOTER (HAVEL SLOGAN ENGLISH) */}
      <div className="text-center shrink-0 px-4">
         <h1 className="text-4xl md:text-8xl font-black italic tracking-tighter leading-[0.85] drop-shadow-2xl mb-4">
            THE END OF <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#EAB308]">
              LONELY SWIPE
            </span>
         </h1>
         <p className="text-zinc-500 text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] md:tracking-[0.4em] opacity-80">
            "Truth and Love Must Prevail Over Lies and Hatred."
         </p>
      </div>

    </section>
  );
};
