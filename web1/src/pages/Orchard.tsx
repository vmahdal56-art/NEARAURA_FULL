import React from 'react';
import { Apple, Leaf } from 'lucide-react';

const FruitItem = ({ name, description, emoji }: any) => (
  <div className="p-8 border-b border-white/5 hover:bg-white/5 transition-all flex items-start gap-8">
    <div className="text-6xl">{emoji}</div>
    <div>
      <h3 className="text-2xl font-black italic text-white uppercase mb-2">{name}</h3>
      <p className="text-slate-400 font-bold italic uppercase tracking-widest text-xs leading-relaxed">{description}</p>
    </div>
  </div>
);

export default function Orchard() {
  return (
    <div className="pt-40 pb-20 px-6 bg-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-8xl font-black italic text-[#22D3EE] uppercase mb-20 text-center">The Fruit <span className="text-white">Codex</span></h1>
        <div className="space-y-4">
          <FruitItem emoji="🍍" name="Pineapple" description="The Foundation. High-intent friendship and sovereign connection. No hidden agendas." />
          <FruitItem emoji="🍑" name="Peach" description="Deep Intimacy. For those seeking the physical and emotional heat of a synchronized aura." />
          <FruitItem emoji="🍒" name="Cherries" description="Social Play. Shared hobbies, events, and the energy of the London nightlife." />
          <FruitItem emoji="🥥" name="Coconut" description="Cultural Wisdom. The intent to bridge mentalities and learn from another's roots." />
          <p className="text-center py-20 text-slate-700 font-black italic uppercase tracking-[1em]">And 12 more pulses in the grid...</p>
        </div>
      </div>
    </div>
  );
}
