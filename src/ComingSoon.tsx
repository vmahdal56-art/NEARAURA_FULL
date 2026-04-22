import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

const T: any = {
  EN: {
    truth: "The Truth is Coming. Since 2012, from the streets of London to Global Integrity.",
    bridge: "Building the bridge for missed sparks and the shield for our future.",
    status: "Founder Access Status",
    protected: "Live URL Protected by Serpent Filter.",
    button: "Stay Sigma. Stay Safe.",
    dedicated: "Dedicated to Jarmila | Sovereign Logic | © 2026"
  },
  FR: {
    truth: "La Vérité arrive. Depuis 2012, des rues de Londres à l'Intégrité Mondiale.",
    bridge: "Construire le pont pour les étincelles manquées et le bouclier pour notre avenir.",
    status: "Statut d'Accès Fondateur",
    protected: "URL Live protégée par le filtre Serpent.",
    button: "Restez Sigma. Restez en sécurité.",
    dedicated: "Dédié à Jarmila | Logique Souveraine | © 2026"
  },
  DE: {
    truth: "Die Wahrheit kommt. Seit 2012, von den Straßen Londons zur globalen Integrität.",
    bridge: "Die Brücke für verpasste Funken und der Schild für unsere Zukunft.",
    status: "Gründerzugriffsstatus",
    protected: "Live-URL durch Schlangenfilter geschützt.",
    button: "Bleib Sigma. Bleib sicher.",
    dedicated: "Jarmila gewidmet | Souveräne Logik | © 2026"
  },
  CZ: {
    truth: "Pravda přichází. Od roku 2012, z ulic Londýna ke globální integritě.",
    bridge: "Stavíme most pro zmeškané jiskry a štít pro naši budoucnost.",
    status: "Stav přístupu zakladatele",
    protected: "Live URL chráněna hadím filtrem.",
    button: "Zůstaň Sigma. Zůstaň v bezpečí.",
    dedicated: "Věnováno Jarmile | Suverénní logika | © 2026"
  }
};

const ComingSoon = () => {
  const { lang } = useLanguage();
  const txt = T[lang || 'EN'];

  return (
    <div className="bg-[#0A0A0C] min-h-screen flex items-center justify-center text-left uppercase p-10 overflow-hidden font-['Inter'] relative">
      <LanguageToggle />
      
      <div className="max-w-[800px] z-10">
        <h1 className="text-[#22D3EE] text-6xl font-[1000] italic tracking-tighter mb-2">NearAura</h1>
        
        <div className="border-l-4 border-[#F97316] pl-6 mb-12">
          <p className="text-[#F8F9FA] text-2xl font-black italic leading-tight">
            {txt.truth}
          </p>
        </div>
        
        <p className="text-slate-500 font-bold italic text-sm tracking-[0.3em] mb-20 uppercase">
          {txt.bridge}
        </p>
        
        <div className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-xl">
          <h3 className="text-[#22D3EE] font-black text-xs tracking-[0.5em] mb-6 uppercase italic">
            {txt.status}
          </h3>
          <p className="text-white text-xl font-black italic mb-8 uppercase">
            {txt.protected}
          </p>
          <button className="bg-[#F97316] text-black px-10 py-4 font-[1000] text-xs shadow-xl italic hover:bg-white transition-all uppercase">
            {txt.button}
          </button>
        </div>
        
        <footer className="mt-20 opacity-40">
           <div className="text-[#D4AF37] font-black tracking-[1.5em] text-[10px] mb-4 uppercase">JV JM PM LA PM LH YM VM</div>
           <p className="text-[10px] text-slate-500 font-black italic tracking-widest uppercase">
             {txt.dedicated}
           </p>
        </footer>
      </div>
      
      {/* Background Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-r from-[#22D3EE]/5 via-transparent to-[#F97316]/5 animate-pulse" />
    </div>
  );
};

export default ComingSoon;