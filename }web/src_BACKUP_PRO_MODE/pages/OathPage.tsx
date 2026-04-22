import React from 'react';
import { useNavigate } from 'react-router-dom';

const OathPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center justify-center p-4 font-sans overflow-hidden pb-24">
      
      {/* 1. HEADER SECTION */}
      <div className="text-center mb-10 max-w-2xl z-10">
        <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter leading-tight mb-6">
          <span className="text-[#ef4444]">END OF LIES AND FARTS</span>{' '}
          <span className="text-white mx-2">⟶</span><br />
          <span className="text-[#10b981]">REBIRTH OF TRUTH AND HEARTS!</span>
        </h1>
        
        <p className="text-xs md:text-sm text-zinc-400 font-mono leading-relaxed uppercase tracking-wide px-4">
          You came here to either help the most vulnerable kids or to heal your soul by nearaura orchard.<br/>
          <span className="text-orange-500 font-bold mt-2 block tracking-widest">We are the NearAura the universe of truth for humans souls.</span>
        </p>
      </div>

      {/* 2. THE BOX */}
      <div className="w-full max-w-lg border-4 border-orange-600 p-8 md:p-12 text-center bg-black relative shadow-[0_0_50px_rgba(234,88,12,0.15)] z-10">
        <h2 className="text-2xl md:text-3xl font-black text-orange-500 uppercase tracking-wide mb-8 underline decoration-2 underline-offset-8">THE GEEZER'S<br />OATH</h2>
        <p className="text-xl md:text-2xl font-black italic text-zinc-200 mb-12 leading-snug">"I REJECT THE LIES AND<br />FARTS. I EMBRACE THE<br />TRUTH AND HEARTS. TA!"</p>
        <button onClick={() => navigate('/gateway')} className="bg-[#059669] hover:bg-[#047857] text-black font-black text-xl py-4 px-12 transition-transform hover:scale-105 active:scale-95 shadow-lg w-full md:w-auto uppercase tracking-wide">I SWEAR</button>
      </div>

      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/10 via-black to-black pointer-events-none"></div>

      {/* --- JARMILA & HELENKA FOOTER --- */}
      <div className="fixed bottom-0 left-0 w-full bg-black border-t-4 border-emerald-900 py-4 z-50 text-center shadow-[0_0_50px_rgba(16,185,129,0.3)]">
         <p className="text-[#22D3EE] font-black italic uppercase text-[10px] md:text-xs tracking-[0.3em] animate-pulse drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
            IN THE MEMORY OF JARMILA & HELENKA — NEARAURA.COM — THE TRUTH AND LOVE PREVAILS
         </p>
      </div>

    </div>
  );
};
export default OathPage;web/src_BACKUP_PRO_MODE/pages/Manifesto.tsx
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