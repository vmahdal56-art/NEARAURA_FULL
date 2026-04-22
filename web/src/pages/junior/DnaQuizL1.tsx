import React, { useState } from 'react';
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
});