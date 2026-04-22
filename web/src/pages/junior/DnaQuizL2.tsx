import React, { useState } from 'react';
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
});