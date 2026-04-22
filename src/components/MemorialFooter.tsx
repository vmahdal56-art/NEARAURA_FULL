import React from 'react';
import { Shield, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const T: any = {
  EN: { est: "MAHDAL CLAN EST. 1916", memory: "In Memory of Jarmila & Helenka.", slogan: "Truth, Metal, Wood & Cotton.", code: "Code by Django", build: "Built on Aura SI (ASI). Not OSI.", ta: "TA!" },
  CZ: { est: "KLAN MAHDAL ZAL. 1916", memory: "Na památku Jarmily a Helenky.", slogan: "Pravda, Kov, Dřevo a Bavlna.", code: "Kód od Djanga", build: "Postaveno na Aura SI (ASI). Ne OSI.", ta: "TA!" },
  DE: { est: "MAHDAL CLAN EST. 1916", memory: "In Erinnerung an Jarmila & Helenka.", slogan: "Wahrheit, Metall, Holz & Baumwolle.", code: "Code by Django", build: "Gebaut auf Aura SI (ASI). Nicht OSI.", ta: "TA!" }
};

export default function MemorialFooter() {
  const { lang } = useLanguage();
  const txt = T[lang];

  return (
    <footer className="w-full py-12 mt-auto border-t border-zinc-900 bg-black relative z-50 text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* LEFT */}
        <div className="text-center md:text-left">
           <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <Shield size={12} className="text-[#cd5c09]"/> 
              <span className="font-bold text-zinc-400">{txt.est}</span>
           </div>
           <p className="opacity-50">{txt.memory}</p>
        </div>

        {/* CENTER */}
        <div className="text-center opacity-60">
           <p>{txt.slogan}</p>
           <div className="w-8 h-px bg-zinc-800 mx-auto my-2"></div>
           <p>{txt.build}</p>
        </div>

        {/* RIGHT */}
        <div className="text-center md:text-right">
           <p className="flex items-center gap-2 justify-center md:justify-end">
              <span>{txt.code}</span>
              <Heart size={10} className="text-red-900 fill-red-900 animate-pulse"/>
           </p>
           <p className="font-black text-[#cd5c09] mt-1 text-xs">{txt.ta}</p>
        </div>

      </div>
    </footer>
  );
}