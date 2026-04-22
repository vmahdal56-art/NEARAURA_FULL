import React from 'react';
import { useLanguage, LangType } from '../context/LanguageContext';

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  
  // Naložili jsme FR do seznamu, aby se v Paříži nenudili
  const supportedLanguages: LangType[] = ['EN', 'CZ', 'DE', 'FR'];

  return (
    <div className="absolute top-6 right-6 flex gap-4 text-xs font-black tracking-widest z-50 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/5">
      {supportedLanguages.map((l) => (
        <button 
          key={l} 
          onClick={() => setLang(l)} 
          className={`${
            lang === l 
              ? 'text-[#cd5c09] underline decoration-2 underline-offset-4' 
              : 'text-zinc-500 hover:text-white'
          } transition-colors uppercase`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}