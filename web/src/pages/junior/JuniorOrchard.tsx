import React from 'react';
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
}