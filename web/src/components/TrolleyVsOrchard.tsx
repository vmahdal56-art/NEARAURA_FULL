import React from 'react';
import { ShoppingCart, Trees, ShieldCheck, AlertTriangle } from 'lucide-react';

const TrolleyVsOrchard = () => {
  return (
    <section className="w-full py-20 bg-zinc-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-16 uppercase tracking-widest">
          OLD SCHOOL <span className="text-zinc-600">vs</span> <span className="text-[#F97316]">NEW AURA</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          
          {/* LEFT: THE MATRIX (TROLLEY) */}
          <div className="relative group border border-zinc-800 bg-zinc-950/50 p-8 rounded-3xl opacity-60 hover:opacity-100 transition-all duration-500">
            <div className="absolute top-4 right-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <ShoppingCart className="w-24 h-24 text-zinc-600" strokeWidth={1} />
                <span className="absolute -top-2 -right-2 text-4xl animate-bounce">🍍</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-zinc-400 mb-2 uppercase">The Supermarket</h3>
            <p className="text-zinc-500 text-sm font-mono mb-4">"Mercadona Pineapple Method"</p>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-center gap-2">❌ <strong>Blind Luck:</strong> Nevíš, kdo to je.</li>
              <li className="flex items-center gap-2">❌ <strong>High Risk:</strong> Žádné Soul Score.</li>
              <li className="flex items-center gap-2">❌ <strong>Predators:</strong> Hadi milují ananasy.</li>
            </ul>
          </div>

          {/* VS BADGE */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
            <div className="bg-[#F97316] text-black font-black text-xl w-16 h-16 rounded-full flex items-center justify-center border-4 border-zinc-900">
              VS
            </div>
          </div>

          {/* RIGHT: THE ORCHARD (SAFE) */}
          <div className="relative border-2 border-[#F97316]/30 bg-gradient-to-b from-zinc-900 to-[#F97316]/10 p-8 rounded-3xl transform scale-105 shadow-2xl shadow-orange-900/20">
             <div className="absolute top-4 right-4">
              <ShieldCheck className="w-8 h-8 text-[#F97316]" />
            </div>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Trees className="w-24 h-24 text-[#F97316]" strokeWidth={1.5} />
                <span className="absolute bottom-0 right-0 text-xs bg-white text-black px-2 py-1 font-bold rounded-full">
                  100% SOUL
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 uppercase">The Orchard</h3>
            <p className="text-[#F97316] text-sm font-mono mb-4">"Gravity & Soul Score"</p>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li className="flex items-center gap-2">✅ <strong>Verified:</strong> Známe jejich DNA.</li>
              <li className="flex items-center gap-2">✅ <strong>Safe:</strong> Chráníme ženy a děti.</li>
              <li className="flex items-center gap-2">✅ <strong>No Snakes:</strong> Matrix má BAN.</li>
            </ul>
            <div className="mt-6 text-center">
              <span className="inline-block px-4 py-2 bg-[#F97316] text-black font-bold text-xs uppercase tracking-widest rounded-full">
                Safe Zone
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrolleyVsOrchard;