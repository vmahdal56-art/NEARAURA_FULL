import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

const INITIALS = ["JV", "JM", "PM", "LA", "PM", "LH", "YM", "VM"];

export const SovereignFooter = () => (
  <footer className="bg-black py-40 border-t border-white/5 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-20 mb-32">
      <div className="md:col-span-2">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-full border-4 border-[#22D3EE] flex items-center justify-center font-black italic text-[#22D3EE] text-3xl cyan-glow">N</div>
          <span className="text-5xl font-black italic tracking-tighter uppercase text-white">NearAura</span>
        </div>
        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest leading-relaxed mb-10 max-w-sm">
          THE END OF THE LONELY SWIPE. BUILT FROM 1,400 HOURS OF SOVEREIGN CODING. 10% HARDCODED TO HEAL CANCER AND ALCOHOLISM.
        </p>
        <div className="flex gap-10 text-[#22D3EE]">
          <Facebook size={28} className="hover:scale-125 transition-all cursor-pointer" />
          <Twitter size={28} className="hover:scale-125 transition-all cursor-pointer" />
          <Instagram size={28} className="hover:scale-125 transition-all cursor-pointer" />
          <Linkedin size={28} className="hover:scale-125 transition-all cursor-pointer" />
        </div>
      </div>
      
      {/* 15 LINKS TOTAL */}
      <div className="text-[11px] font-black uppercase text-slate-400 space-y-6 italic">
        <p className="text-white text-sm mb-8 underline decoration-[#22D3EE] underline-offset-8">Empire</p>
        <p className="hover:text-[#22D3EE] cursor-pointer">Manifesto</p><p className="hover:text-[#22D3EE] cursor-pointer">Matrix 6x15</p><p className="hover:text-[#22D3EE] cursor-pointer">Director Status</p><p className="hover:text-[#22D3EE] cursor-pointer">Indiegogo</p><p className="hover:text-[#22D3EE] cursor-pointer">Pre-Registration</p>
      </div>
      <div className="text-[11px] font-black uppercase text-slate-400 space-y-6 italic">
        <p className="text-white text-sm mb-8 underline decoration-[#22D3EE] underline-offset-8">Control</p>
        <p className="hover:text-[#22D3EE] cursor-pointer">HWID Exile</p><p className="hover:text-[#22D3EE] cursor-pointer">Aura Radar</p><p className="hover:text-[#22D3EE] cursor-pointer">Bridge of Peace</p><p className="hover:text-[#22D3EE] cursor-pointer">Heatmaps</p><p className="hover:text-[#22D3EE] cursor-pointer">Hardware Sync</p>
      </div>
      <div className="text-[11px] font-black uppercase text-slate-400 space-y-6 italic">
        <p className="text-white text-sm mb-8 underline decoration-[#22D3EE] underline-offset-8">Legacy</p>
        <p className="hover:text-[#22D3EE] cursor-pointer">Jarmila Trust</p><p className="hover:text-[#22D3EE] cursor-pointer">Cancer Research</p><p className="hover:text-[#22D3EE] cursor-pointer">Alcoholism Fund</p><p className="hover:text-[#22D3EE] cursor-pointer">Privacy Protocol</p><p className="hover:text-[#22D3EE] cursor-pointer">Contact</p>
      </div>
    </div>
    
    <div className="pt-20 border-t border-white/5 text-center">
      <div className="flex justify-center gap-14 mb-10">
        {INITIALS.map(init => (
          <span key={init} className="text-3xl font-black text-slate-800 tracking-[0.6em] hover:text-[#22D3EE] transition-colors">{init}</span>
        ))}
      </div>
      <p className="text-[10px] text-slate-700 font-black uppercase tracking-[1em]">NearAura &copy; 2026 | Dedicated to Jarmila</p>
    </div>
  </footer>
);

export const LegacySection = () => null;