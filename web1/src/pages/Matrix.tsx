import React from 'react';
import { Check, X, Shield, Crown, Zap } from 'lucide-react';

export default function Matrix() {
  const FEATURES = [
    { name: "100m Radar Visibility", free: true, founder: true, elite: true },
    { name: "See Who Liked You", free: false, founder: true, elite: true },
    { name: "Unlimited Swipes", free: false, founder: true, elite: true },
    { name: "Founder Badge (Gold)", free: false, founder: true, elite: true },
    { name: "Access to 'Hendy' Zone", free: false, founder: false, elite: true },
    { name: "Priority Support", free: false, founder: true, elite: true },
    { name: "No Ads (Zero Data)", free: true, founder: true, elite: true },
    { name: "Incognito Mode", free: false, founder: true, elite: true },
    { name: "Travel Mode (Teleport)", free: false, founder: true, elite: true },
    { name: "See Read Receipts", free: false, founder: true, elite: true },
    { name: "Boost (1x Week)", free: false, founder: true, elite: true },
    { name: "Super Likes (5x Day)", free: false, founder: true, elite: true },
    { name: "Filter by Fruit", free: true, founder: true, elite: true },
    { name: "Advanced Soul Filters", free: false, founder: false, elite: true },
    { name: "Legacy Transfer", free: false, founder: true, elite: true },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-32 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-black italic text-[#D4AF37] mb-10 uppercase tracking-tighter text-center">The Sovereign Matrix</h1>
        
        <div className="grid grid-cols-4 gap-4 text-center border border-white/10 bg-[#0A0A0C] p-10 rounded-3xl">
          {/* HEADER */}
          <div className="text-left font-black text-xl text-slate-500 uppercase tracking-widest">Feature / Protocol</div>
          <div className="font-black text-xl text-slate-400 uppercase tracking-widest">Tourist (Free)</div>
          <div className="font-black text-xl text-[#F97316] uppercase tracking-widest flex flex-col items-center gap-2">
            <Zap size={32}/> Founder
          </div>
          <div className="font-black text-xl text-[#22D3EE] uppercase tracking-widest flex flex-col items-center gap-2">
            <Crown size={32}/> Elite
          </div>

          {/* ROWS */}
          {FEATURES.map((f, i) => (
            <React.Fragment key={i}>
              <div className="text-left py-6 border-b border-white/5 font-bold text-slate-300 uppercase text-xs tracking-wider flex items-center">
                {f.name}
              </div>
              <div className="py-6 border-b border-white/5 flex justify-center items-center">
                {f.free ? <Check className="text-slate-500"/> : <X className="text-slate-800"/>}
              </div>
              <div className="py-6 border-b border-white/5 flex justify-center items-center bg-[#F97316]/5">
                {f.founder ? <Check className="text-[#F97316]"/> : <X className="text-slate-800"/>}
              </div>
              <div className="py-6 border-b border-white/5 flex justify-center items-center bg-[#22D3EE]/5">
                {f.elite ? <Check className="text-[#22D3EE]"/> : <X className="text-slate-800"/>}
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="mt-20 text-center">
           <p className="text-slate-500 uppercase tracking-widest text-xs">Pricing verified by the Sovereign Eight.</p>
        </div>
      </div>
    </div>
  );
}
