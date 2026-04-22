import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Heart, Users, Coins, Compass, Flame, Beer, Trophy, Info, Leaf } from 'lucide-react';

interface UserPing {
  id: string;
  x: number;
  y: number;
  fruit: string;
  category: 'dating' | 'tribe' | 'hobbies' | 'family' | 'foundry';
  soulScore: number;
  distance: string;
}

const Radar = () => {
  const [pings, setPings] = useState<UserPing[]>([]);

  useEffect(() => {
    // 🔱 LIVE TELEMETRY SIMULATION
    const mockPings: UserPing[] = [
      { id: '1', x: 35, y: 42, fruit: 'pineapple', category: 'dating', soulScore: 98, distance: '200m' },
      { id: '2', x: 65, y: 30, fruit: 'hendy', category: 'tribe', soulScore: 100, distance: '450m' },
      { id: '3', x: 52, y: 75, fruit: 'lemon', category: 'foundry', soulScore: 92, distance: '800m' },
    ];
    setPings(mockPings);
  }, []);

  const getCategoryColor = (cat: string) => {
    const colors = {
      dating: 'bg-pink-500', tribe: 'bg-cyan-400', 
      hobbies: 'bg-emerald-400', family: 'bg-orange-400', foundry: 'bg-yellow-500'
    };
    return colors[cat as keyof typeof colors] || 'bg-white';
  };

  return (
    <div className="relative w-full aspect-square max-w-2xl mx-auto flex flex-col items-center justify-center p-4">
      {/* 🔱 TECHNICAL RADAR INTERFACE */}
      <div className="relative w-full h-full rounded-full border border-white/10 bg-black/20 backdrop-blur-3xl overflow-hidden">
        
        {/* Distance Grids */}
        {[0.25, 0.5, 0.75].map((scale, i) => (
          <div 
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
            style={{ width: `${scale * 100}%`, height: `${scale * 100}%` }}
          />
        ))}

        {/* Axis Orientation */}
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/5" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5" />

        {/* Scanning Sweep */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 w-1/2 h-1/2 origin-top-left z-10"
          style={{ 
            background: 'conic-gradient(from 0deg, rgba(34,211,238,0.1) 0deg, transparent 60deg)',
          }}
        />

      {/* 🔱 SYSTEM TELEMETRY: STATUS & LEGEND */}
      <div className="absolute -bottom-16 w-full flex justify-between items-center px-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
            </span>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-cyan-400">
              Live Network Active
            </span>
          </div>
          <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest mt-1">
            {pings.length} Active Nodes within 1.5km Radius
          </span>
        </motion.div>

        <div className="flex gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[7px] font-black text-slate-700 uppercase tracking-widest mb-1">Scale Reference</span>
            <div className="flex gap-3">
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 rounded-full border border-white/20" />
                <span className="text-[7px] font-bold text-slate-600 uppercase">500m</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 rounded-full border border-cyan-500/50" />
                <span className="text-[7px] font-bold text-slate-600 uppercase">1km</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔱 SPECTRUM CATEGORIES: GLOBAL LEGEND */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 flex gap-2 bg-white/[0.02] border border-white/5 p-2 rounded-xl">
        {['dating', 'tribe', 'foundry', 'family', 'hobbies'].map((cat) => (
          <div key={cat} className="flex items-center gap-2 px-2 py-1 rounded-md bg-black/20">
            <div className={`w-1 h-1 rounded-full ${getCategoryColor(cat).replace('bg-', 'bg-')}`} />
            <span className="text-[7px] font-black uppercase tracking-widest text-slate-500">{cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Radar;
