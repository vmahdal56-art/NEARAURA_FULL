import React from 'react';
import { Skull, ZapOff, Ban, ShieldAlert, WifiOff, Ghost } from 'lucide-react';
// --- INJECTED CONTEXT ---
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

const T: any = {
  EN: {
    h1: "THE MATRIX",
    status: "STATUS: SLAVERY ACTIVE",
    warning: "YOU ARE BEING HARVESTED",
    protocols: [
      { t: "DEBT SYSTEM", d: "Trade your future for a plastic dream." },
      { t: "DATA MINING", d: "Your soul is a product for the machine." },
      { t: "SaaS CHAINS", d: "You own nothing. You pay forever." },
      { t: "NOISE", d: "Constant distraction to kill the silence." }
    ],
    exit: "EXIT STRATEGY: AURA"
  },
  FR: {
    h1: "LA MATRICE",
    status: "STATUT : ESCLAVAGE ACTIF",
    warning: "VOUS ÊTES EXPLOITÉS",
    protocols: [
      { t: "SYSTÈME DE DETTE", d: "Échangez votre avenir contre un rêve en plastique." },
      { t: "MINAGE DE DONNÉES", d: "Votre âme est un produit pour la machine." },
      { t: "CHAÎNES SaaS", d: "Vous ne possédez rien. Vous payez pour toujours." },
      { t: "BRUIT", d: "Distraction constante pour tuer le silence." }
    ],
    exit: "STRATÉGIE DE SORTIE : AURA"
  },
  DE: {
    h1: "DIE MATRIX",
    status: "STATUS: SKLAVEREI AKTIV",
    warning: "SIE WERDEN GEERNTET",
    protocols: [
      { t: "SCHULDENSYSTEM", d: "Tausche deine Zukunft gegen einen Plastiktraum." },
      { t: "DATA MINING", d: "Deine Seele ist ein Produkt für die Maschine." },
      { t: "SaaS KETTEN", d: "Du besitzt nichts. Du zahlst ewig." },
      { t: "LÄRM", d: "Ständige Ablenkung, um die Stille zu töten." }
    ],
    exit: "EXIT-STRATEGIE: AURA"
  },
  CZ: {
    h1: "MATRIX",
    status: "STAV: OTROCTVÍ AKTIVNÍ",
    warning: "JSTE VYTĚŽOVÁNI",
    protocols: [
      { t: "DLUHOVÝ SYSTÉM", d: "Vyměňte svou budoucnost za plastový sen." },
      { t: "TĚŽBA DAT", d: "Tvá duše je produktem pro stroj." },
      { t: "SaaS ŘETĚZY", d: "Nevlastníš nic. Platíš navždy." },
      { t: "HLUK", d: "Neustálé rozptylování pro zabití ticha." }
    ],
    exit: "STRATEGIE ÚNIKU: AURA"
  }
};

const Matrix = () => {
  const { lang } = useLanguage();
  const txt = T[lang || 'EN'];

  return (
    <div className="min-h-screen bg-[#0a0000] text-red-600 font-mono p-10 flex flex-col items-center justify-center relative overflow-hidden selection:bg-red-600 selection:text-black">
      <LanguageToggle />
      
      {/* Background Noise (ZACHOVÁNO) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <header className="text-center z-10 mb-20 animate-pulse">
         <Skull size={80} className="mx-auto mb-6 text-red-700" />
         <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-2">
           {txt.h1}
         </h1>
         <p className="text-red-900 font-bold tracking-[0.5em] text-xs">
           {txt.status}
         </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl w-full z-10">
         {txt.protocols.map((p: any, i: number) => (
           <div key={i} className="border-l-2 border-red-900 pl-6 py-4 bg-red-950/5 hover:bg-red-950/20 transition-all group">
              <div className="flex items-center gap-3 mb-2">
                 {i === 0 ? <ZapOff size={20}/> : i === 1 ? <Ban size={20}/> : i === 2 ? <ShieldAlert size={20}/> : <Ghost size={20}/>}
                 <h3 className="font-black uppercase text-xl group-hover:text-white transition-colors">{p.t}</h3>
              </div>
              <p className="text-red-900 text-sm italic">{p.d}</p>
           </div>
         ))}
      </main>

      <footer className="mt-20 z-10 text-center">
         <div className="bg-red-600 text-black px-10 py-4 font-black uppercase tracking-widest animate-bounce">
            {txt.warning}
         </div>
         <p className="mt-8 text-zinc-700 font-bold uppercase text-[10px] tracking-[1em]">
            {txt.exit}
         </p>
      </footer>

      {/* GLITCH OVERLAY (ZACHOVÁNO 1:1) */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-red-600 opacity-10 animate-scan"></div>
      
      <style>{`
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Matrix;