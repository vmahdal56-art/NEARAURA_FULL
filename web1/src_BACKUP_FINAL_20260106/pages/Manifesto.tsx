import React from 'react';

const SovereignSection = ({ h1, content }) => (
  <div className="mb-24">
    <h2 className="text-5xl font-black italic uppercase tracking-tighter text-aura-cyan mb-8">{h1}</h2>
    <div className="text-slate-300 text-lg leading-relaxed space-y-6 font-medium">
      {content.map((p, i) => <p key={i}>{p}</p>)}
    </div>
  </div>
);

export default function Manifesto() {
  return (
    <div className="pt-40 pb-20 px-10 bg-aura-black min-h-screen text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-9xl font-black italic uppercase tracking-tighter dna-gradient-text mb-20 text-center">
          The Manifesto
        </h1>

        <SovereignSection 
          h1="H1: The 1,400 Hour Stand"
          content={[
            "For 1,400 hours, I have sat in the silence of creation to build a weapon against the digital ghost. NearAura is not an app; it is a territory of integrity. We have watched the decay of human connection—the 'lonely swipe' that leads to nowhere. We have seen the bots and the fakes erode the motherboard of society.",
            "This manifesto is the hardcoding of dignity. Every pixel on this screen was bought with the currency of time. We do not negotiate with ghosters. We do not provide second chances to fakes. If you enter the Orchard, you enter a contract of presence. Failure to honor that contract results in total Hardware Exile."
          ]}
        />

        <SovereignSection 
          h1="H2: The Hardware Exile & The Orchard"
          content={[
            "The Orchard is a protected ecosystem. In most 'gardens,' a snake can return simply by changing its skin (email). In the Orchard, we track the skin and the bone. Our Hardware Exile logic binds your device ID to your behavior. If you ghost, your hardware is Exiled. Permanently. You cannot buy your way back. You cannot hide behind a new profile.",
            "This ensures that every 'Aura' you see in the grid is a verified soul. When you see a Pineapple (Dating) or a Tribe (Community), you are seeing a real intent locked for 48 hours. This friction is our filter. Only those who value their time—and yours—will survive the Orchard."
          ]}
        />

        <SovereignSection 
          h1="H3: The Director Matrix (JV, JM, PM...)"
          content={[
            "The Matrix is the financial and cultural engine of NearAura. The Sovereign Directors—JV, JM, PM, LA, PM, LH, YM, VM—are the pillars of this architecture. They represent the 40x Multiplier. They are the Oracles who see beyond the 500m radar. Their legacy is hardcoded into the revenue stream of every interaction within the territory.",
            "To be a Director is to hold the keys to the Mentality Manual. It is the understanding that human connection is the only asset that cannot be inflated. We are building the London Zone 1 Launch to prove that when you eliminate the noise of 1 billion fake profiles, the remaining few become an Empire."
          ]}
        />

        <div className="py-20 border-t border-white/10 text-center">
          <p className="text-slate-700 font-black uppercase tracking-[1em] mb-4">Dedicated to Jarmila</p>
          <p className="text-aura-cyan font-bold italic uppercase tracking-widest text-xs">NearAura © 2026 | The Sovereign Orchard</p>
        </div>
      </div>
    </div>
  );
}
