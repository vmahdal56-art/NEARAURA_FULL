import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; 
import logoPng from '../logo.png'; 

const Header = () => {
  const [activeCat, setActiveCat] = useState('ADULT');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // HLAVIČKA MÁ Z-INDEX 200 (ABY BYLA VŽDY NAHOŘE)
    <header className="fixed top-0 left-0 right-0 z-[200] bg-black/95 backdrop-blur-xl border-b border-white/10 px-4 md:px-8 py-3 md:py-5 flex items-center justify-between">
      
      {/* 1. LEVÁ STRANA */}
      <div className="flex items-center gap-4 md:gap-10">
        <div className="relative w-14 h-14 md:w-28 md:h-28 flex items-center justify-center shrink-0 -ml-1 md:-ml-2">
           <div className="absolute inset-0 bg-gradient-to-tr from-[#7c2d12] to-[#164e63] rounded-full blur-[30px] md:blur-[50px] opacity-50 animate-alfa-pulse"></div>
           <div 
            className="relative z-10 w-full h-full bg-no-repeat bg-contain bg-center brightness-110 saturate-100"
            style={{ 
              backgroundImage: `url(${logoPng})`,
              WebkitMaskImage: `url(${logoPng})`,
              maskImage: `url(${logoPng})`,
              maskMode: 'luminance' 
            }}
          ></div>
        </div>

        <nav className="hidden xl:flex items-center gap-10 text-[13px] font-[1000] tracking-[0.4em] text-zinc-400 uppercase">
          <a href="#manifesto" className="hover:text-white transition-colors">MANIFESTO</a>
          <a href="#dna" className="hover:text-[#22D3EE] transition-colors">DNA</a>
          <a href="#orchard" className="hover:text-[#F97316] transition-colors">ORCHARD</a>
          <a href="#zones" className="hover:text-white transition-colors">ZONES</a>
        </nav>
      </div>

      {/* 2. PRAVÁ STRANA */}
      <div className="flex items-center gap-3 md:gap-6">
        <div className="hidden lg:flex gap-1 p-1 bg-white/5 rounded-full border border-white/10">
          {['KIDS', 'YOUTH', 'ADULT', 'RAINBOW'].map((c) => (
            <button key={c} onClick={() => setActiveCat(c)} className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest transition-all ${activeCat === c ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}>{c}</button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="px-8 py-3.5 rounded-full text-[11px] font-[1000] tracking-widest text-white bg-gradient-to-r from-red-600 via-aura-cyan to-purple-600 animate-rainbow shadow-xl">ACCESS</button>
          <a href="/void.html" className="bg-[#F97316] text-black px-8 py-3.5 rounded-full font-[1000] text-[11px] uppercase tracking-widest shadow-xl">EXIT</a>
        </div>

        {/* TLAČÍTKO MENU - MĚNÍ IKONU */}
        <button className="xl:hidden text-white p-2 z-[201]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* 3. MOBILNÍ MENU - OPRAVA POZADÍ (ULTIMATE BLACKOUT) */}
      {isMenuOpen && (
        // ZMĚNA: bg-[#000000] (tvrdá černá), top-[70px] (aby nelezlo pod hlavičku), h-screen (přes celý zbytek)
        <div className="fixed inset-0 top-[70px] left-0 w-full h-screen bg-[#000000] z-[190] flex flex-col items-center justify-start pt-10 gap-8 xl:hidden overflow-y-auto pb-32">
            
            {/* ODKAZY */}
            <div className="flex flex-col items-center gap-6 w-full">
              <a href="#manifesto" onClick={() => setIsMenuOpen(false)} className="text-2xl font-[1000] tracking-[0.2em] text-white hover:text-aura-cyan transition-colors">MANIFESTO</a>
              <a href="#dna" onClick={() => setIsMenuOpen(false)} className="text-2xl font-[1000] tracking-[0.2em] text-white hover:text-aura-cyan transition-colors">DNA</a>
              <a href="#orchard" onClick={() => setIsMenuOpen(false)} className="text-2xl font-[1000] tracking-[0.2em] text-white hover:text-aura-cyan transition-colors">ORCHARD</a>
              <a href="#zones" onClick={() => setIsMenuOpen(false)} className="text-2xl font-[1000] tracking-[0.2em] text-white hover:text-aura-cyan transition-colors">ZONES</a>
            </div>

            <div className="w-20 h-[1px] bg-white/20"></div>

            {/* VOLBA VĚKU */}
            <div className="flex flex-wrap justify-center gap-3 px-6 w-full">
                {['KIDS', 'YOUTH', 'ADULT', 'RAINBOW'].map((c) => (
                    <button key={c} onClick={() => {setActiveCat(c); setIsMenuOpen(false)}} className={`px-6 py-3 rounded-full text-xs font-black tracking-widest border border-white/20 ${activeCat === c ? 'bg-white text-black' : 'text-zinc-400'}`}>
                        {c}
                    </button>
                ))}
            </div>

            {/* AKČNÍ TLAČÍTKA */}
            <div className="flex flex-col gap-4 mt-4 w-3/4">
                <button className="w-full py-4 rounded-full text-sm font-black bg-gradient-to-r from-red-600 to-purple-600 text-white shadow-lg animate-rainbow">ACCESS</button>
                <a href="/void.html" className="w-full py-4 rounded-full text-sm font-black bg-[#F97316] text-black text-center uppercase tracking-widest shadow-lg">EXIT</a>
            </div>
        </div>
      )}
    </header>
  );
};
export default Header;