const fs = require('fs');
const path = require('path');

console.log("⚒️ STARTUJI MONTÁŽ: JUNIOR ORCHARD (ČISTÁ OCEL PRO OGAŘE) ⚒️");

const filesToCreate = {
  // 1. RING BUFFER TELEMETRIE (Lokální záznam, žádný cloud)
  'web/src/utils/telemetry.ts': `export const AuraLogger = {
  log: (event: string, level: string, detail: string) => {
    const logEntry = \`[\${new Date().toISOString()}] \${event} | \${level} | \${detail}\`;
    console.log("🛡️ AURA TELEMETRY:", logEntry);
    
    // Ring buffer - držíme jen posledních 50 záznamů v lokálu
    try {
      const existing = JSON.parse(localStorage.getItem('AURA_RING_BUFFER') || '[]');
      existing.push(logEntry);
      if (existing.length > 50) existing.shift();
      localStorage.setItem('AURA_RING_BUFFER', JSON.stringify(existing));
    } catch (e) {}
  }
};`,

  // 2. HARDENING JISTIČ (KIDS MODE ONLY)
  'web/src/routing/JuniorRoute.tsx': `import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGeneration } from '../context/GenerationalContext';

export const JuniorRoute = ({ children }: { children: React.ReactNode }) => {
  const { world } = useGeneration();
  
  // Zámek: Pokud svět není KIDS, vykopneme ho na Gateway. Fail-closed.
  if (world !== 'KIDS') {
    return <Navigate to="/gateway" replace />;
  }
  return <>{children}</>;
};`,

  // 3. JUNIOR PANEL (Základní stavební kámen, žádný animace, jen CSS)
  'web/src/components/junior/JuniorPanel.tsx': `import React from 'react';

type Props = { title: string; desc: string; iconPath: string; onClick?: () => void };

export const JuniorPanel = React.memo(({ title, desc, iconPath, onClick }: Props) => (
  <button
    onClick={onClick}
    className="border-4 border-zinc-800 bg-zinc-900 p-6 flex flex-col items-center text-center w-full
               active:scale-95 transition-transform duration-75 select-none hover:border-[#cd5c09]"
  >
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#cd5c09" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
      <path d={iconPath} />
    </svg>
    <h3 className="text-2xl font-black uppercase text-white mb-2">{title}</h3>
    <p className="text-zinc-400 font-serif leading-tight">{desc}</p>
  </button>
));`,

  // 4. JUNIOR ORCHARD (Hlavní rozcestník)
  'web/src/pages/junior/JuniorOrchard.tsx': `import React from 'react';
import { useNavigate } from 'react-router-dom';
import { JuniorPanel } from '../../components/junior/JuniorPanel';

export default function JuniorOrchard() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
      <div className="col-span-full border-b-2 border-zinc-800 pb-4 mb-4">
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Sady pro mladou krev</h1>
        <p className="text-[#cd5c09] uppercase text-xs font-bold tracking-widest mt-1">Aura Vacuum: Aktivní</p>
      </div>
      
      <JuniorPanel title="Lekce 1: Materiál" desc="Jak se kalí ocel a co vydrží dub." 
        iconPath="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" 
        onClick={() => navigate('/junior/quiz-l1')} />
        
      <JuniorPanel title="Lekce 2: Bezpečnost" desc="Kdy nosit brejle a kdy sundat rukavice." 
        iconPath="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" 
        onClick={() => navigate('/junior/quiz-l2')} />
        
      <JuniorPanel title="Dědečkův Manuál" desc="Od pěti do osmi. Kdo nemaká, ten nejí." 
        iconPath="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" 
        onClick={() => navigate('/junior/manual')} />
        
      <JuniorPanel title="Archiv Dílny" desc="Paměť rodu. Nářadí a starý časy." 
        iconPath="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" 
        onClick={() => navigate('/junior/archive')} />
    </div>
  );
}`,

  // 5. DNA KVÍZ - LEKCE 1
  'web/src/pages/junior/DnaQuizL1.tsx': `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuraLogger } from '../../utils/telemetry';

const Q_L1 = [
  { q: 'Který dřevo patří do základů, aby neuhnil?', a: 'Dub', opts: ['Smrk', 'Dub', 'Bříza'] },
  { q: 'Čím se chladí rozžhavená ocel, aby ztvrdla?', a: 'Olej', opts: ['Voda', 'Olej', 'Vzduch'] },
  { q: 'Kdy začíná poctivá šichta?', a: 'V pět ráno', opts: ['V devět', 'V pět ráno', 'Až se mi chce'] }
];

export default React.memo(() => {
  const [step, setStep] = useState(0);
  const [passed, setPassed] = useState(false);
  const navigate = useNavigate();

  const answer = (opt: string) => {
    if (opt !== Q_L1[step].a) {
      AuraLogger.log('QUIZ_FAILED', 'L1_SEED', 'WRONG_ANSWER');
      setStep(0); return;
    }
    if (step + 1 < Q_L1.length) setStep(step + 1);
    else { setPassed(true); AuraLogger.log('QUIZ_PASSED', 'L2_WORKER', 'LEKCE_1_DONE'); }
  };

  if (passed) return (
    <div className="p-8 border-4 border-zinc-800 bg-black text-center min-h-screen pt-20 relative z-10">
      <p className="text-[#cd5c09] font-black text-2xl uppercase">DNA Potvrzena.</p>
      <button onClick={() => navigate('/junior')} className="mt-8 border-2 border-zinc-800 p-4 text-white uppercase text-xs">Zpět do Sadu</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-black p-6 relative z-10">
      <div className="bg-zinc-900 border-2 border-zinc-800 p-6 select-none max-w-xl mx-auto mt-10">
        <h2 className="text-zinc-500 text-xs mb-4 uppercase tracking-widest">Lekce 1 / {Q_L1.length}</h2>
        <p className="text-xl text-white font-serif mb-6">{Q_L1[step].q}</p>
        <div className="grid gap-2">
          {Q_L1[step].opts.map(opt => (
            <button key={opt} onClick={() => answer(opt)} className="border border-zinc-700 p-4 text-left hover:bg-zinc-800 active:bg-black transition-colors uppercase text-sm text-zinc-300">{opt}</button>
          ))}
        </div>
      </div>
    </div>
  );
});`,

  // 6. DNA KVÍZ - LEKCE 2
  'web/src/pages/junior/DnaQuizL2.tsx': `import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuraLogger } from '../../utils/telemetry';

const Q_L2 = [
  { q: 'Jakej je rozdíl mezi pilníkem a rašplí?', a: 'Rašple má hrubý zuby na dřevo', opts: ['Je to to samý', 'Rašple má hrubý zuby na dřevo', 'Pilník je na polystyren'] },
  { q: 'Proč u vrtačky NIKDY nenosíme rukavice?', a: 'Hrozí namotání', opts: ['Kvůli citu', 'Hrozí namotání', 'Rukavice se rychle trhaj'] },
  { q: 'Kdy si nasazuješ ochranný brejle?', a: 'Vždycky, když kov potká kov', opts: ['Jen u průvanu', 'Vždycky, když kov potká kov', 'Až mě pálí oči'] }
];

export default React.memo(() => {
  const [step, setStep] = useState(0);
  const [passed, setPassed] = useState(false);
  const navigate = useNavigate();

  const answer = (opt: string) => {
    if (opt !== Q_L2[step].a) {
      AuraLogger.log('QUIZ_L2_FAILED', 'L1_SEED', 'WRONG_ANSWER');
      navigate('/junior/quiz-l1'); // Tvrdý trest - návrat na L1
      return;
    }
    if (step + 1 < Q_L2.length) setStep(step + 1);
    else { 
      setPassed(true); 
      localStorage.setItem('AURA_JUNIOR_TOOLS', 'UNLOCKED');
      AuraLogger.log('QUIZ_L2_PASSED', 'L2_WORKER', 'TOOLS_SAFETY_OK'); 
    }
  };

  if (passed) return (
    <div className="p-8 border-4 border-zinc-800 bg-black text-center min-h-screen pt-20 relative z-10">
      <p className="text-[#cd5c09] font-black text-2xl uppercase">Bezpečnost ověřena.</p>
      <p className="text-zinc-400 mt-2">Zpřístupněn archiv nářadí.</p>
      <button onClick={() => navigate('/junior')} className="mt-8 border-2 border-zinc-800 p-4 text-white uppercase text-xs">Zpět do Sadu</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-black p-6 relative z-10">
      <div className="bg-zinc-900 border-2 border-zinc-800 p-6 select-none max-w-xl mx-auto mt-10">
        <h2 className="text-zinc-500 text-xs mb-4 uppercase tracking-widest">Lekce 2 / {Q_L2.length}</h2>
        <p className="text-xl text-white font-serif mb-6">{Q_L2[step].q}</p>
        <div className="grid gap-2">
          {Q_L2[step].opts.map(opt => (
            <button key={opt} onClick={() => answer(opt)} className="border border-zinc-700 p-4 text-left hover:bg-zinc-800 active:bg-black transition-colors uppercase text-sm text-zinc-300">{opt}</button>
          ))}
        </div>
      </div>
    </div>
  );
});`,

  // 7. JUNIOR MANUÁL
  'web/src/pages/junior/JuniorManual.tsx': `import React from 'react';
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
});`,

  // 8. JUNIOR ARCHIV (Zamčeno, dokud není L2)
  'web/src/pages/junior/JuniorArchive.tsx': `import React from 'react';
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
});`
};

for (const [relPath, content] of Object.entries(filesToCreate)) {
    const fullPath = path.join(process.cwd(), relPath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`✅ VYKOVANÝ MODUL -> ${relPath}`);
}

console.log("\\n🗿 JUNIOR MONTÁŽ DOKONČENA. MŮŽEME ZAPOJIT KABELY.");
console.log("Pravda a Láska zvítězila. TA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");