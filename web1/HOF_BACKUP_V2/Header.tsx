import React, { useState } from 'react';
import logoPng from '../logo.png';

const Header = () => {
  const [activeCat, setActiveCat] = useState('ADULT');

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-black/95 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        
        {/* === 100% DNA LOGO (STEALTH MODE - NO FRAME) === */}
        <div className="relative group w-16 h-16 flex items-center justify-center">
          
          {/* GEEZER HEARTBEAT AURA (Bije přímo pod symbolem) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#F97316] to-[#22D3EE] rounded-full blur-3xl opacity-90 animate-alfa-pulse"></div>
          
          {/* LOGO IMAGE - BEZ RÁMEČKU, SPLÝVÁ S POZADÍM */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <img 
              src={logoPng} 
              alt="NearAura" 
              className="w-full h-full object-contain brightness-125 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
            />
          </div>
          
        </div>

        {/* SWITCHER */}
        <div className="hidden xl:flex gap-1 p-1 bg-white/5 rounded-full border border-white/10 ml-4">
          {['KIDS', 'YOUTH', 'ADULT', 'RAINBOW'].map((c) => (
            <button key={c} onClick={() => setActiveCat(c)} className={`px-3 py-1 rounded-full text-[9px] font-black tracking-widest transition-all ${activeCat === c ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}>{c}</button>
          ))}
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase">
        <a href="#manifesto" className="hover:text-white transition-colors">MANIFESTO</a>
        <a href="#dna" className="hover:text-[#22D3EE] transition-colors">DNA</a>
        <a href="#orchard" className="hover:text-[#F97316] transition-colors">ORCHARD</a>
        <a href="#zones" className="hover:text-white transition-colors">ZONES</a>
      </nav>

      <div className="flex items-center gap-3">
        <button className="px-6 py-2 rounded-full text-[10px] font-black tracking-widest text-white bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-aura-cyan to-purple-500 bg-[length:200%_200%] animate-rainbow shadow-[0_0_15px_rgba(255,255,255,0.1)]">ACCESS</button>
        <a href="/void.html" className="bg-[#F97316] text-black px-6 py-2 rounded-full font-[1000] text-[10px] uppercase tracking-widest hover:bg-white transition-all">EXIT</a>
      </div>
    </header>
  );
};
export default Header;
