import React, { useState } from 'react';
import { t } from '../../utils/i18n';
import { Ledger } from '../../utils/storage';
export const DnaQuiz = () => {
  const [step, setStep] = useState(0);
  const next = (correct: boolean) => {
    if (correct) { if (step === 0) setStep(1); else { Ledger.set('AGE', '18'); window.location.href='/orchard'; } }
    else setStep(0);
  };
  return (
    <div className="min-h-screen bg-black text-white p-20 flex flex-col items-center justify-center">
      <h2 className="text-[#cd5c09] text-2xl font-black mb-8 uppercase">Junior Lesson {step + 1}</h2>
      <p className="text-xl mb-10">{step === 0 ? t('quiz_wood_q') : t('quiz_work_q')}</p>
      <div className="flex gap-4">
        <button onClick={() => next(true)} className="border border-zinc-700 px-6 py-2 hover:bg-zinc-800 uppercase">{step === 0 ? t('quiz_wood_a') : t('quiz_work_a')}</button>
        <button onClick={() => next(false)} className="border border-zinc-700 px-6 py-2 hover:bg-zinc-800 uppercase">Plastic</button>
      </div>
    </div>
  );
};