import React, { useState, useEffect } from 'react';
import { Zap, Share2, Smartphone, Download, HelpCircle } from 'lucide-react';
import SocialDock from '../components/SocialDock';

// --- DATA ---
const ORCHARD_DATA = [
  { id: 'hendy', label: 'Hendy', sub: 'Royal Soul', icon: '👑', color: 'text-[#22D3EE]', border: 'border-[#22D3EE]' },
  { id: 'pineapple', label: 'Ananas', sub: 'Serious', icon: '🍍', color: 'text-[#D4AF37]', border: 'border-[#D4AF37]' },
  { id: 'pear', label: 'Hruška', sub: 'Family', icon: '🍐', color: 'text-emerald-400', border: 'border-emerald-400' },
  { id: 'mango', label: 'Mango', sub: 'Queer', icon: '🥭', color: 'text-purple-400', border: 'border-purple-400' },
  { id: 'banana', label: 'Banana', sub: 'Intimacy M', icon: '🍌', color: 'text-yellow-400', border: 'border-yellow-400' },
  { id: 'peach', label: 'Broskev', sub: 'Intimacy F', icon: '🍑', color: 'text-pink-500', border: 'border-pink-500' },
  { id: 'orange', label: 'Orange', sub: 'Friends', icon: '🍊', color: 'text-[#F97316]', border: 'border-[#F97316]' },
  { id: 'grape', label: 'Hrozny', sub: 'Groups', icon: '🍇', color: 'text-[#A855F7]', border: 'border-[#A855F7]' },
  { id: 'coconut', label: 'Kokos', sub: 'DIY Help', icon: '🥥', color: 'text-slate-200', border: 'border-slate-200' },
  { id: 'melon', label: 'Meloun', sub: 'Hobby', icon: '🍈', color: 'text-green-400', border: 'border-green-400' },
  { id: 'cherry', label: 'Cherry', sub: 'Meet Now', icon: '🍒', color: 'text-red-500', border: 'border-red-500' },
  { id: 'youth', label: 'Youth', sub: '15-18 Only', icon: '👻', color: 'text-white', border: 'border-white' }
];

export default function SovereignHome() {
  const [foundersLeft, setFoundersLeft] = useState(142); // Example start
  
  // Fake counter logic
  useEffect(() => {
    const timer = setInterval(() => {
      setFoundersLeft(prev => prev > 12 ? prev - 1 : 12);
    }, 50000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#050505] text-white min-h-screen">
      
      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative">
        
        {/* COUNTER */}
        <div className="absolute top-32 right-10 border border-[#D4AF37] p-4 rounded-xl hidden md:block">
            <div className="text-4xl font-black text-[#D4AF37]">{foundersLeft}</div>
            <div className="text-[9px] uppercase tracking-widest text-slate-400">Founders Left</div>
        </div>

        {/* LOGO & SLOGAN */}
        <h1 className="text-[10vw] font-black italic leading-[0.8] uppercase tracking-tighter text-white mb-8">
            ENTER THE <br/> 
            <span className="text-[#F97316]">ORCHARD.</span>
        </h1>
        <p className="text-xl md:text-3xl font-black uppercase text-slate-500 tracking-[0.2em] mb-20">
            Pick the fruit you crave.
        </p>

        {/* ORCHARD GRID (12 FRUITS) */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full max-w-[1400px]">
            {ORCHARD_DATA.map((item) => (
                <div key={item.id} className={`p-6 bg-white/5 border ${item.border} rounded-2xl hover:scale-105 transition-transform cursor-pointer flex flex-col items-center`}>
                    <div className="text-4xl mb-2">{item.icon}</div>
                    <div className={`text-sm font-black uppercase ${item.color}`}>{item.label}</div>
                </div>
            ))}
        </div>
      </section>

      {/* BUTTONS */}
      <section className="grid grid-cols-2 md:grid-cols-5 border-y border-white/10">
          {[
            { t: "Waitlist", c: "bg-[#F97316]", i: Zap },
            { t: "Referrals", c: "bg-[#22D3EE]", i: Share2 },
            { t: "iOS App", c: "bg-[#8B5CF6]", i: Smartphone },
            { t: "Android", c: "bg-[#EC4899]", i: Download },
            { t: "FAQ", c: "bg-slate-800", i: HelpCircle }
          ].map((btn) => (
            <button key={btn.t} className={`${btn.c} py-20 flex flex-col items-center justify-center gap-4 hover:brightness-125 transition-all border-r border-black/20 group`}>
              <div className="text-white group-hover:scale-125 transition-transform"><btn.i size={40} className="drop-shadow-lg"/></div>
              <span className="text-xl font-black italic tracking-widest text-white uppercase">{btn.t}</span>
            </button>
          ))}
      </section>

      {/* FOOTER & SOCIALS (7 ICONS) */}
      <footer className="py-40 px-10 border-t border-white/10 bg-black">
         <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-black italic uppercase text-white mb-4">Connect with the Eight.</h2>
            <SocialDock /> 
         </div>
      </footer>
    </div>
  );
}
