import React from 'react';
import { useNavigate } from 'react-router-dom';

const ITEMS = [
  { id: '1', title: 'Dílna 1978', desc: 'Ponk, svěrák, žádný řeči.' },
  { id: '2', title: 'Nářadí v lajně', desc: 'Všechno má místo. Chaos se neodpouští.' }
];

export default React.memo(() => {
  const navigate = useNavigate();
  const unlocked = localStorage.getItem('AURA_JUNIOR_TOOLS') === 'UNLOCKED';

  if (!unlocked) return (
    <div className="min-h-screen bg-black p-6 relative z-10 text-center pt-20">
      <h2 className="text-[#cd5c09] text-2xl font-black uppercase">Přístup odepřen</h2>
      <p className="text-zinc-400 mt-4">Musíš nejprve projít Lekcí 2 (Bezpečnost), abys viděl nářadí.</p>
      <button onClick={() => navigate('/junior/quiz-l2')} className="mt-8 border-2 border-zinc-800 p-4 text-white uppercase text-xs">Jít na zkoušku</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-black p-6 relative z-10">
      <button onClick={() => navigate('/junior')} className="mb-8 text-zinc-500 hover:text-white uppercase text-xs tracking-widest">← Zpět</button>
      <h1 className="text-3xl font-black text-white mb-8 uppercase tracking-tighter">Paměť Rodu (Offline)</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {ITEMS.map(item => (
          <figure key={item.id} className="border-2 border-zinc-800 bg-zinc-900 p-8 text-center">
            {/* Tady by byl tag <img src="...webp" />, my dáme placeholder box pro čistotu bez assetů */}
            <div className="w-full h-32 border border-zinc-700 mb-4 bg-black flex items-center justify-center text-zinc-800">[FOTKA]</div>
            <figcaption className="text-white font-black uppercase">{item.title}</figcaption>
            <p className="text-zinc-400 text-sm mt-1">{item.desc}</p>
          </figure>
        ))}
      </div>
    </div>
  );
});