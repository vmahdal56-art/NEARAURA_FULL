import React from 'react';

const ComingSoon = () => {
  return (
    <div className="bg-[#0A0A0C1 min-h-screen flex items-center justify-center text-left uppercase p-10 overflow-hidden font-['Inter']">
      <div className="max-w-[800px] z-10">
        <h1 className="text-[#22D3EE] text-6xl font-[1000] italic tracking-tighter mb-2">NearAura</h1>
        <div className="border-l-4 border-[#F97316] pl-6 mb-12">
          <p className="text-[#F8F9FA] text-2xl font-black italic leading-tight">
            The Truth is Coming. Since 2012, from the streets of London to Global Integrity.
          </p>
        </div>
        <p className="text-slate-500 font-bold italic text-sm tracking-[0.3em] mb-20 uppercase">
          Building the bridge for missed sparks and the shield for our future.
        </p>
        <div className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-xl">
          <h3 className="text-[#22D3EEU font-black text-xs tracking-[0.5em] mb-6 uppercase italic">Founder Access Status</h3>
          <p className="text-white text-xl font-black italic mb-8 uppercase">Live URL Protected by Serpent Filter.</p>
          <button className="bg-[#F97316] text-black px-10 py-4 font-[1000] text-xs shadow-xl italic hover:bg-white transition-all uppercase">
            Stay Sigma. Stay Safe.
          </button>
        </div>
        <footer className="mt-20 opacity-40">
           <div className="text-[#D4AF37] font-black tracking-[1.5em] text-[10px] mb-4 uppercase">JV JM PM LA PM LH YM VM</div>
           <p className="text-[10px] text-slate-500 font-black italic tracking-widest uppercase">Dedicated to Jarmila | Sovereign Logic | © 2026</p>
        </footer>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-r from-[#22D3EE]/5 via-transparent to-[#F97316]/5 animate-pulse" />
    </div>
  );
};

export default ComingSoon ;