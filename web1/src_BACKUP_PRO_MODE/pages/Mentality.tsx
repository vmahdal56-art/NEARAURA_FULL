import React from 'react';
import { Globe2, HeartHandshake } from 'lucide-react';

export default function Mentality() {
  return (
    <div className="pt-40 pb-20 px-6 bg-[#020202] min-h-screen text-white">
      <div className="max-w-6xl mx-auto text-center">
        <Globe2 className="mx-auto text-[#D4AF37] mb-6" size={64} />
        <h1 className="text-7xl font-black italic uppercase mb-4 tracking-tighter">The Mentality <span className="text-[#D4AF37]">Manual</span></h1>
        <div className="bg-white/5 p-12 rounded-[60px] border border-[#D4AF37]/20 mt-12">
          <HeartHandshake className="mx-auto text-[#D4AF37] mb-8" size={60} />
          <div className="px-8 py-4 bg-[#D4AF37] text-black font-black italic uppercase rounded-full inline-block">
            Understanding &gt; Anger
          </div>
        </div>
      </div>
    </div>
  );
}
