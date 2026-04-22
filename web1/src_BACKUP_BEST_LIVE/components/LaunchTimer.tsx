import React, { useState, useEffect } from 'react';

export const LaunchTimer = () => {
  return (
    <div className="py-12 bg-[#D4AF37] text-black">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter">London Zone 1 Launch</h2>
          <p className="font-bold uppercase text-[10px] tracking-[0.4em]">The Orchard Opens 2026</p>
        </div>
        <div className="flex gap-8">
            <div className="text-center">
                <span className="block text-4xl font-black italic">365</span>
                <span className="text-[10px] font-bold uppercase">Days</span>
            </div>
            <div className="text-center font-black text-4xl italic">:</div>
            <div className="text-center">
                <span className="block text-4xl font-black italic">24</span>
                <span className="text-[10px] font-bold uppercase">Hours</span>
            </div>
            <div className="text-center font-black text-4xl italic">:</div>
            <div className="text-center">
                <span className="block text-4xl font-black italic">00</span>
                <span className="text-[10px] font-bold uppercase">Mins</span>
            </div>
        </div>
      </div>
    </div>
  );
};
