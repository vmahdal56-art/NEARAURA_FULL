import React from 'react';
import { ShieldAlert, Lock } from 'lucide-react';
// --- INJECTED CONTEXT ---
import { useLanguage } from '../context/LanguageContext';

// V reálném nasazení to bere data z AI Orchestratoru (Python Backend)
// Pro tebe (GUV/DJANGO) je to natvrdo 100.
const CURRENT_SOUL_SCORE = 100; 

interface SoulGuardProps {
  minScore: number;
  children: React.ReactNode;
}

const T: any = {
  EN: {
    denied: "ACCESS DENIED",
    snake: "SNAKE DETECTED",
    filter: "SERPENT FILTER: ACTIVE",
    intent: "INTENT: MALICIOUS",
    action: "ACTION: HARDWARE EXILE",
    quote: "This know-how is dangerous for those without a soul. Go back to the Matrix, watch Teletubbies and try again in your next life."
  },
  FR: {
    denied: "ACCÈS REFUSÉ",
    snake: "SERPENT DÉTECTÉ",
    filter: "FILTRE SERPENT : ACTIF",
    intent: "INTENTION : MALVEILLANTE",
    action: "ACTION : EXIL MATÉRIEL",
    quote: "Ce savoir-faire est dangereux pour ceux sans âme. Retourne dans la Matrice, regarde les Télétubbies et réessaie dans une autre vie."
  },
  DE: {
    denied: "ZUGRIFF VERWEIGERT",
    snake: "SCHLANGE ERKANNT",
    filter: "SCHLANGENFILTER: AKTIV",
    intent: "ABSICHT: BÖSWILLIG",
    action: "AKTION: HARDWARE-EXIL",
    quote: "Dieses Know-how ist gefährlich für Seelenlose. Geh zurück in die Matrix, schau Teletubbies und versuch es im nächsten Leben erneut."
  },
  CZ: {
    denied: "PŘÍSTUP ODÍTMNUT",
    snake: "DETEKOVÁN HAD",
    filter: "SERPENT FILTER: AKTIVNÍ",
    intent: "ÚMYSL: ZLOMYSLNÝ",
    action: "AKCE: HARDWAROVÝ EXIL",
    quote: "Toto know-how je nebezpečné pro ty bez duše. Vrať se do Matrixu, sleduj Teletubbies a zkus to v příštím životě."
  }
};

const SoulGuard: React.FC<SoulGuardProps> = ({ minScore, children }) => {
  const { lang } = useLanguage();
  const txt = T[lang || 'EN'];

  if (CURRENT_SOUL_SCORE < minScore) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-8 border-8 border-red-900 m-4 relative overflow-hidden selection:bg-red-600 selection:text-white">
        {/* Background Noise (ZACHOVÁNO 1:1) */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        
        <ShieldAlert size={80} className="text-red-600 mb-6 animate-pulse" />
        
        <h1 className="text-5xl md:text-8xl text-red-600 font-black uppercase mb-4 tracking-tighter">
          {txt.denied}
        </h1>
        
        <div className="bg-red-900/10 border border-red-800 p-6 max-w-2xl backdrop-blur-sm relative z-10">
            <p className="text-zinc-400 font-mono text-xl uppercase tracking-widest mb-4">
              {txt.snake} • SOUL SCORE {CURRENT_SOUL_SCORE}/{minScore}
            </p>
            <p className="text-red-500 font-bold font-mono text-sm text-left">
              &gt;&gt;&gt; {txt.filter}<br/>
              &gt;&gt;&gt; {txt.intent}<br/>
              &gt;&gt;&gt; {txt.action}
            </p>
        </div>

        <div className="mt-12 text-zinc-600 font-serif italic max-w-md relative z-10">
          "{txt.quote}"
        </div>
        
        <div className="mt-8 opacity-50 relative z-10">
            <Lock size={32} className="text-zinc-700 mx-auto" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default SoulGuard;