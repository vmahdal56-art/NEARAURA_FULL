import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Flame, Beer, Trophy, Lock, Skull, Crown } from 'lucide-react';

const Geezers = () => {
  // 🔱 COCKNEY DICTIONARY (The Inner Frequency)
  const [slangMode] = useState(true);

  return (
    <div className="min-h-screen bg-[#07080A] text-white font-sans selection:bg-red-500/30 overflow-x-hidden p-8">
      {/* 🔱 THE INNER SANCTUARY HEADER */}
      <nav className="flex justify-between items-center mb-24">
        <div className="flex items-center gap-4">
          <Skull className="text-red-500 animate-pulse" size={32} />
          <h1 className="text-3xl font-black italic tracking-tighter uppercase text-white">
            The Bunker <span className="text-red-600">Locked</span>
          </h1>
        </div>
        <div className="bg-red-600/10 border border-red-600/20 px-4 py-2 rounded-full">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500">
            Sovereign Access Only
          </span>
        </div>
      </nav>

      {/* 🔱 THE DJANGO MANIFESTO (Cockney Version) */}
      <header className="max-w-4xl mb-32">
        <motion.h2 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter mb-10 leading-none"
        >
          LISTEN <br /> <span className="text-red-600">CLOSE,</span> <br /> GEEZER.
        </motion.h2>
        
        <div className="space-y-8 text-xl md:text-2xl font-bold italic text-slate-400 leading-relaxed">
          <p>
            You’ve stepped out of the global fog. No more <span className="text-white">"plastic smiles"</span> or corporate frequencies. 
            This is the Orchard for the proper ones.
          </p>
          <p className="text-white border-l-4 border-red-600 pl-8 py-4 bg-red-600/5">
            "Truth Over Distance ain't just a slogan, it's the law of the land. 
            You move with integrity, or you don't move at all."
          </p>
        </div>
      </header>

      {/* 🔱 THE UNFILTERED GRID: PICK YOUR POISON */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
        {[
          { id: 'pineapple', name: 'Pineapple', icon: Flame, slang: 'Proper Sort', desc: 'Looking for a diamond to build a kingdom with.' },
          { id: 'mango', name: 'Mango', icon: Shield, slang: 'Bunker Graft', desc: 'Founder support for the real ones building the future.' },
          { id: 'hendy', name: 'Hendy', icon: Beer, slang: 'Proper Pint', desc: 'No small talk. Just a cold one with the lads.' },
          { id: 'cherry', name: 'Cherry', icon: Heart, slang: 'The Real Deal', desc: 'Pure loyalty. No plastic. No lies.' },
          { id: 'lemon', name: 'Lemon', icon: Coins, slang: 'Skrava', desc: 'Serious biz only. Let’s count the jarmila.' },
          { id: 'coconut', name: 'Coconut', icon: Lock, slang: 'Barney Rubble', desc: 'In a bit of trouble? The family has your back.' },
        ].map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            className="relative p-8 bg-white/[0.01] border border-red-600/10 rounded-[2rem] group hover:border-red-600/40 transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-6">
              <item.icon size={40} className="text-red-600 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700">
                Frequency Active
              </span>
            </div>
            
            <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2">{item.slang}</h3>
            <p className="text-slate-500 font-bold italic text-sm mb-6 uppercase tracking-widest">{item.name} DNA</p>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-8 italic">
              "{item.desc}"
            </p>

            <button className="w-full py-4 bg-red-600/5 border border-red-600/20 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] text-red-500 hover:bg-red-600 hover:text-white transition-all">
              Lock the Oath
            </button>

            {/* Subtle Glow */}
            <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity pointer-events-none" />
          </motion.div>
        ))}
      </section>

      {/* �� THE SOVEREIGN WARNING */}
      <footer className="border-t border-red-600/20 pt-12 flex flex-col items-center text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.6em] text-red-600 mb-8 animate-pulse">
          Integrity is non-negotiable.
        </p>
        <div className="flex gap-8">
           <a href="/" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
             ← Back to Global Fog
           </a>
        </div>
      </footer>
    </div>
  );
};

export default Geezers;
