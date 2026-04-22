import React from 'react';
import { useNavigate } from 'react-router-dom';

export default React.memo(() => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black p-6 relative z-10">
      <button onClick={() => navigate('/junior')} className="mb-8 text-zinc-500 hover:text-white uppercase text-xs tracking-widest">← Zpět</button>
      <div className="max-w-2xl mx-auto p-8 font-mono text-zinc-300 bg-black border-l-4 border-[#cd5c09]">
        <h1 className="text-3xl font-black text-white mb-8 uppercase tracking-tighter">Pracovní manuál rodiny Mahdalů</h1>
        <section className="space-y-6 text-lg leading-relaxed">
          <p><strong className="text-white">I.</strong> Pracujeme <span className="text-[#cd5c09]">od pěti do osmi</span>. Kdo zaspí, zmešká pravdu.</p>
          <p><strong className="text-white">II.</strong> U ponku se nemluví. Práce není diskuse, práce je výsledek. <span className="italic">No chatter.</span></p>
          <p><strong className="text-white">III.</strong> Kdo nepodrží nářadí, nezaslouží si jíst. Parazity netrpíme.</p>
          <p><strong className="text-white">IV.</strong> Hledej váhu v kovu a dřevu. Vyhýbej se digitální pěně.</p>
          <p><strong className="text-white">V.</strong> Čistej ponk = čistá hlava. Po šichtě všechno na svý místo.</p>
        </section>
        <div className="mt-12 pt-4 border-t border-zinc-800 text-xs text-zinc-600 uppercase">Vytesáno 2026 · Mahdal Metal Integrity</div>
      </div>
    </div>
  );
});