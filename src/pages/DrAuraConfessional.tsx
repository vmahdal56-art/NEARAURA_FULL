import React, { useState } from 'react';
import MemorialFooter from '../components/MemorialFooter';
import SoulGuard from '../components/SoulGuard';
import { Activity, ShieldAlert, CheckCircle, Terminal, Send, Trash2 } from 'lucide-react';
// --- INJECTED CONTEXT ---
import { useLanguage } from '../context/LanguageContext';
import { useGeneration } from '../context/GenerationalContext';
import LanguageToggle from '../components/LanguageToggle';

// --- PŘEKLADY VČETNĚ FR ---
const T: any = {
  EN: {
    sub: "AI DRIVEN INTEGRITY TERMINAL • NO SECRETS",
    enter: "ENTER RAW TRUTH",
    quote: "\"Speak your shadow. The system listens. If you hide, you fail. If you speak, you heal. The truth is the only way through the Vortex.\"",
    placeholder: "Type your confession here...",
    btn: "TRANSMIT TO AURA",
    scanning: "Scanning Bio-Patterns... Analyzing Soul Integrity...",
    pureTitle: "TRUTH VERIFIED",
    pureText: "Your soul is aligned. The signal is clear. No distortion detected.",
    pureBtn: "NEW SESSION",
    toxicTitle: "MALICE DETECTED",
    toxicFilter: "DISSIMULATION FILTER TRIGGERED",
    toxicText: "\"Go back. Clean your mind. Try again with pure intent. The Matrix has no place here.\"",
    toxicBtn: "RESET TERMINAL"
  },
  FR: {
    sub: "TERMINAL D'INTÉGRITÉ PILOTÉ PAR L'IA • AUCUN SECRET",
    enter: "ENTREZ LA VÉRITÉ BRUTE",
    quote: "\"Exprimez votre ombre. Le système écoute. Si vous cachez, vous échouez. Si vous parlez, vous guérissez. La vérité est le seul chemin à travers le Vortex.\"",
    placeholder: "Tapez votre confession ici...",
    btn: "TRANSMETTRE À L'AURA",
    scanning: "Skan des bio-modèles... Analyse de l'intégrité de l'âme...",
    pureTitle: "VÉRITÉ VÉRIFIÉE",
    pureText: "Votre âme est alignée. Le signal est clair. Aucune distorsion détectée.",
    pureBtn: "NOUVELLE SESSION",
    toxicTitle: "MALICE DÉTECTÉE",
    toxicFilter: "FILTRE DE DISSIMULATION DÉCLENCHÉ",
    toxicText: "\"Retournez en arrière. Purifiez votre esprit. Réessayez avec une intention pure.\"",
    toxicBtn: "RÉINITIALISER LE TERMINAL"
  },
  DE: {
    sub: "KI-GESTEUERTES INTEGRITÄTSTERMINAL • KEINE GEHEIMNISSE",
    enter: "ROHE WAHRHEIT EINGEBEN",
    quote: "\"Sprich deinen Schatten aus. Das System hört zu. Wenn du dich versteckst, versagst du. Die Wahrheit ist der einzige Weg durch den Vortex.\"",
    placeholder: "Geben Sie hier Ihr Geständnis ein...",
    btn: "AN AURA ÜBERMITTELN",
    scanning: "Bio-Muster scannen... Seelenintegrität analysieren...",
    pureTitle: "WAHRHEIT VERIFIZIERT",
    pureText: "Deine Seele ist im Einklang. Das Signal ist klar.",
    pureBtn: "NEUE SITZUNG",
    toxicTitle: "BÖSWILLIGKEIT ERKANNT",
    toxicFilter: "TÄUSCHUNGSFILTER AUSGELÖST",
    toxicText: "\"Geh zurück. Reinige deinen Geist. Versuche es erneut mit reiner Absicht.\"",
    toxicBtn: "TERMINAL ZURÜCKSETZEN"
  },
  CZ: {
    sub: "INTEGRITNÍ TERMINÁL ŘÍZENÝ AI • ŽÁDNÁ TAJEMSTVÍ",
    enter: "ZADEJ SYROVOU PRAVDU",
    quote: "„Vyslov svůj stín. Systém naslouchá. Pokud se schováváš, selháváš. Pokud mluvíš, léčíš se. Pravda je jediná cesta skrz Vortex.“",
    placeholder: "Zde napiš své přiznání...",
    btn: "PŘENÉST DO AURY",
    scanning: "Skenuji bio-vzorce... Analyzuji integritu duše...",
    pureTitle: "PRAVDA OVĚŘENA",
    pureText: "Tvá duše je v souladu. Signál je čistý. Nebylo zjištěno žádné zkreslení.",
    pureBtn: "NOVÉ SEZENÍ",
    toxicTitle: "DETEKOVÁNA ZLOVŮLE",
    toxicFilter: "FILTR PŘETVÁŘKY AKTIVOVÁN",
    toxicText: "„Jdi zpět. Vyčisti svou mysl. Zkus to znovu s čistým záměrem. Matrix zde nemá místo.“",
    toxicBtn: "RESETOVAT TERMINÁL"
  }
};

const DrAuraConfessional = () => {
  const { lang } = useLanguage();
  const { world } = useGeneration();
  const txt = T[lang || 'EN'];

  const [confession, setConfession] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<'PURE' | 'TOXIC' | null>(null);

  const handleConfess = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      // AI SCAN SIMULATION
      const isToxic = confession.toLowerCase().includes('lie') || confession.length < 10;
      setResult(isToxic ? 'TOXIC' : 'PURE');
      setIsAnalyzing(false);
    }, 3000);
  };

  // Ochrana: Confessional je pouze pro dospělý svět (ADULT)
  if (world === 'KIDS') {
      return (
          <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono">
              <h1 className="text-xl font-black uppercase tracking-widest border border-green-500 px-6 py-3">
                Confessional Restricted to Adult Souls
              </h1>
          </div>
      );
  }

  return (
    <SoulGuard minScore={50}>
      <div className="min-h-screen bg-[#020202] text-zinc-400 font-mono flex flex-col selection:bg-green-900 selection:text-white">
        <LanguageToggle />

        <header className="pt-32 pb-12 px-6 border-b border-zinc-900 bg-black text-center">
           <Activity size={48} className="mx-auto text-green-500 mb-4 animate-pulse" />
           <h1 className="text-4xl font-black text-white uppercase tracking-tighter">DR. AURA CONFESSIONAL</h1>
           <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-600 mt-2">{txt.sub}</p>
        </header>

        <main className="flex-grow container mx-auto px-6 py-16 max-w-2xl">
           <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-green-500/20"></div>
              
              {!result && !isAnalyzing && (
                <div className="space-y-6 animate-in fade-in duration-500">
                   <h2 className="text-white font-bold uppercase text-lg flex items-center gap-2">
                      <Terminal size={20} className="text-green-500"/> {txt.enter}
                   </h2>
                   <p className="text-xs text-zinc-500 leading-relaxed italic">
                      {txt.quote}
                   </p>
                   <textarea 
                     value={confession}
                     onChange={(e) => setConfession(e.target.value)}
                     className="w-full h-40 bg-black border border-zinc-700 p-4 text-green-500 focus:border-green-500 outline-none resize-none transition-colors"
                     placeholder={txt.placeholder}
                   />
                   <button 
                     onClick={handleConfess}
                     className="w-full bg-green-600 hover:bg-white text-black font-black py-4 uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(22,163,74,0.2)]"
                   >
                      <Send size={18}/> {txt.btn}
                   </button>
                </div>
              )}

              {isAnalyzing && (
                <div className="text-center py-20 space-y-4">
                   <Activity className="mx-auto text-green-500 animate-spin" size={40} />
                   <p className="text-green-500 animate-pulse font-bold tracking-widest text-xs uppercase">{txt.scanning}</p>
                </div>
              )}

              {result === 'PURE' && (
                <div className="text-center animate-in zoom-in duration-300">
                   <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                   <h3 className="text-2xl font-black text-white uppercase">{txt.pureTitle}</h3>
                   <p className="text-zinc-500 mt-4 mb-8">{txt.pureText}</p>
                   <button onClick={() => {setResult(null); setConfession('')}} className="text-green-500 underline text-xs uppercase tracking-widest font-bold">{txt.pureBtn}</button>
                </div>
              )}

              {result === 'TOXIC' && (
                <div className="text-center animate-in zoom-in duration-300">
                   <ShieldAlert size={64} className="text-red-600 mx-auto mb-4" />
                   <h3 className="text-2xl font-black text-white uppercase">{txt.toxicTitle}</h3>
                   <p className="text-red-600 font-bold uppercase text-[10px] mt-2 tracking-widest">{txt.toxicFilter}</p>
                   <p className="text-zinc-500 mt-4 mb-8 italic">{txt.toxicText}</p>
                   <button onClick={() => {setResult(null); setConfession('')}} className="text-red-600 underline text-xs uppercase tracking-widest font-bold">{txt.toxicBtn}</button>
                </div>
              )}
           </div>
        </main>
        <MemorialFooter />
      </div>
    </SoulGuard>
  );
};

export default DrAuraConfessional;