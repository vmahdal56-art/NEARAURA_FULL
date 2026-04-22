import React from 'react';
import { useNavigate } from 'react-router-dom';
// --- INJECTED CONTEXT ---
import { useLanguage } from '../context/LanguageContext';

const T: any = {
  EN: { title: "Soul Scanner: Antonín Core" },
  FR: { title: "Scanner d'Âme : Antonín Core" },
  DE: { title: "Seelen-Scanner: Antonín Kern" },
  CZ: { title: "Sken duše: Jádro Antonín" }
};

const DrAuraBubble = () => {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const txt = T[lang || 'EN'];

  return (
    <div 
      onClick={() => navigate('/dr-aura-confessional')} // Opraveno na aktuální Confessional cestu
      className="fixed right-6 bottom-24 w-20 h-20 bg-black border-4 border-[#cd5c09] rounded-full flex items-center justify-center cursor-pointer z-[9999] shadow-[0_0_15px_rgba(205,92,9,0.5)] hover:scale-110 transition-transform group"
      title={txt.title}
    >
      <div className="text-[#cd5c09] font-black text-[10px] leading-tight text-center uppercase font-mono group-hover:text-white relative z-10">
        DR.<br/>AURA<br/><span className="text-[8px] text-zinc-500">Antonín</span>
      </div>
      
      {/* Pulsing effect - Signal of Truth (ZACHOVÁNO 1:1) */}
      <div className="absolute inset-0 rounded-full border border-[#cd5c09] animate-ping opacity-25"></div>
      
      {/* Glowing background */}
      <div className="absolute inset-0 bg-[#cd5c09]/5 rounded-full blur-md"></div>
    </div>
  );
};

export default DrAuraBubble;