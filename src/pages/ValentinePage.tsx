import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, Zap, ChevronDown, Lock, Unlock, 
  ArrowLeft, Info, Flame, Magnet, XCircle
} from 'lucide-react';
import MemorialFooter from '../components/MemorialFooter';

// --- INJECTED CONTEXT ---
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

const T: any = {
  EN: {
    back: "Back to Orchard",
    title: "VALENTINE",
    sub: "ARCHIVE OF MISSED SPARKS • MAGNETIC FIELD V1.2",
    intro: "The truth about the spark. No algorithms. Just pure attraction. If you have the pineapple, you have the world. If you lack the peach, you lock for 7 days.",
    choose: "SELECT YOUR FRUIT",
    unveil: "UNVEIL TRUTH & LOVE",
    lockMsg: "LOCKED FOR 7 DAYS (TRUTH PENALTY)",
    fruits: {
      peach: { name: "PEACH", meaning: "Intimacy & Flow", ban: "Bollocks & Cold Hearts" },
      pineapple: { name: "PINEAPPLE", meaning: "Serious Intent & Growth", ban: "Temporary Flings" },
      strawberry: { name: "STRAWBERRY", meaning: "The Sweet Truth", ban: "Matrix Bitterness" },
      lemon: { name: "LEMON", meaning: "Acidic Honesty", ban: "Sugar-coated Lies" }
    }
  },
  FR: {
    back: "Retour au Verger",
    title: "VALENTIN",
    sub: "ARCHIVE DES ÉTINCELLES MANQUÉES • CHAMP MAGNÉTIQUE V1.2",
    intro: "La vérité sur l'étincelle. Pas d'algorithmes. Juste de l'attraction pure. Si vous avez l'ananas, vous avez le monde.",
    choose: "CHOISISSEZ VOTRE FRUIT",
    unveil: "RÉVÉLER LA VÉRITÉ ET L'AMOUR",
    lockMsg: "VERROUILLÉ PENDANT 7 JOURS (PÉNALITÉ DE VÉRITÉ)",
    fruits: {
      peach: { name: "PÊCHE", meaning: "Intimité & Flux", ban: "Conneries & Cœurs Froids" },
      pineapple: { name: "ANANAS", meaning: "Intention Sérieuse & Croissance", ban: "Aventures Éphémères" },
      strawberry: { name: "FRAISE", meaning: "La Douce Vérité", ban: "Amertume de la Matrice" },
      lemon: { name: "CITRON", meaning: "Honnêteté Acidulée", ban: "Mensonges Sucrés" }
    }
  },
  DE: {
    back: "Zurück zum Garten",
    title: "VALENTIN",
    sub: "ARCHIV DER VERPASSTEN FUNKEN • MAGNETFELD V1.2",
    intro: "Die Wahrheit über den Funken. Keine Algorithmen. Nur reine Anziehungskraft.",
    choose: "WÄHLEN SIE IHRE FRUCHT",
    unveil: "WAHRHEIT & LIEBE ENTHÜLLEN",
    lockMsg: "7 TAGE GESPERRT (WAHRHEITSSTRAFE)",
    fruits: {
      peach: { name: "PFIRSICH", meaning: "Intimität & Fluss", ban: "Quatsch & Kalte Herzen" },
      pineapple: { name: "ANANAS", meaning: "Ernste Absicht & Wachstum", ban: "Eintagsfliegen" },
      strawberry: { name: "ERDBEERE", meaning: "Die süße Wahrheit", ban: "Matrix-Bitterkeit" },
      lemon: { name: "ZITRONE", meaning: "Saure Ehrlichkeit", ban: "Zuckerglasierte Lügen" }
    }
  },
  CZ: {
    back: "Zpět do Sadu",
    title: "VALENTÝN",
    sub: "ARCHIV ZMEŠKANÝCH JISKER • MAGNETICKÉ POLE V1.2",
    intro: "Pravda o jiskře. Žádné algoritmy. Jen čistá přitažlivost. Pokud máš ananas, máš svět. Pokud ti chybí broskev, zamykáme na 7 dní.",
    choose: "VYBER SI OVOCE",
    unveil: "ODHAL PRAVDU A LÁSKU",
    lockMsg: "ZAMČENO NA 7 DNÍ (PENALIZACE ZA LEŽ)",
    fruits: {
      peach: { name: "PEACH (BROSKEV)", meaning: "Intimita a plynutí", ban: "Kecy a chladná srdce" },
      pineapple: { name: "PINEAPPLE (ANANAS)", meaning: "Vážný záměr a růst", ban: "Dočasné úlety" },
      strawberry: { name: "STRAWBERRY (JAHODA)", meaning: "Sladká pravda", ban: "Hořkost Matrixu" },
      lemon: { name: "LEMON (CITRÓN)", meaning: "Kyselá upřímnost", ban: "Cukrované lži" }
    }
  }
};

const ValentinePage = () => {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const txt = T[lang || 'EN'];

  const [selectedFruit, setSelectedFruit] = useState<any>(null);

  const fruits = [
    { id: 'peach', icon: "🍑", ...txt.fruits.peach },
    { id: 'pineapple', icon: "🍍", ...txt.fruits.pineapple },
    { id: 'strawberry', icon: "🍓", ...txt.fruits.strawberry },
    { id: 'lemon', icon: "🍋", ...txt.fruits.lemon },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-pink-600 flex flex-col items-center overflow-x-hidden relative">
      <LanguageToggle />
      
      {/* 1. HEADER (ZACHOVÁNO 1:1) */}
      <div className="w-full max-w-7xl px-6 pt-24 pb-12 flex flex-col items-center text-center">
        <button onClick={() => navigate('/orchard')} className="flex items-center gap-2 text-zinc-600 hover:text-white transition-colors mb-12 uppercase text-[10px] font-black tracking-widest group self-start">
           <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> {txt.back}
        </button>

        <div className="relative mb-6">
           <div className="absolute inset-0 bg-pink-600 blur-[80px] opacity-20 animate-pulse"></div>
           <Heart size={80} className="text-pink-600 relative z-10 drop-shadow-[0_0_20px_rgba(219,39,119,0.8)]" fill="currentColor" />
        </div>
        
        <h1 className="text-6xl md:text-[8rem] font-black italic tracking-tighter leading-none mb-4">{txt.title}</h1>
        <p className="text-[#22D3EE] font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] mb-8">{txt.sub}</p>
        
        <div className="max-w-2xl border-l-4 border-pink-600 pl-6 py-4 bg-pink-900/5 text-left mb-16">
          <p className="text-lg md:text-xl text-zinc-400 italic font-serif leading-relaxed">
            "{txt.intro}"
          </p>
        </div>
      </div>

      {/* 2. FRUIT SELECTION GRID (ZACHOVÁNO) */}
      <div className="w-full max-w-5xl px-6 mb-24">
        <h2 className="text-center font-black text-xs uppercase tracking-[0.4em] text-zinc-600 mb-12">{txt.choose}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {fruits.map((f) => (
            <button 
              key={f.id}
              onClick={() => setSelectedFruit(f)}
              className={`aspect-square rounded-[3rem] border-2 transition-all duration-500 flex flex-col items-center justify-center gap-4 group relative overflow-hidden ${selectedFruit?.id === f.id ? 'bg-white border-white scale-105' : 'bg-zinc-900/30 border-zinc-800 hover:border-pink-600 hover:scale-105'}`}
            >
              <span className={`text-6xl md:text-7xl transition-transform duration-500 ${selectedFruit?.id === f.id ? 'scale-110 rotate-12' : 'group-hover:rotate-12'}`}>{f.icon}</span>
              <span className={`font-black text-[10px] tracking-widest uppercase ${selectedFruit?.id === f.id ? 'text-black' : 'text-zinc-500'}`}>{f.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. DYNAMIC DETAIL AREA (ZACHOVÁNO 1:1) */}
      {selectedFruit && (
        <div className="w-full max-w-4xl px-6 mb-32 animate-in fade-in slide-in-from-bottom duration-700">
           <div className="bg-white text-black p-10 md:p-16 rounded-[4rem] relative overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.1)]">
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none transform rotate-12">
                 <Magnet size={300} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                 <div>
                    <h3 className="text-[10px] font-black uppercase text-pink-600 tracking-[0.4em] mb-4">MAGNETIC ATTRIBUTE</h3>
                    <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-6">{selectedFruit.name}</h2>
                    <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest border-y border-black/10 py-4">
                       <Zap size={16} className="text-amber-500" fill="currentColor"/> 
                       <span>AURA SCORE: +40pts</span>
                    </div>
                 </div>
                 
                 <div className="flex flex-col justify-center space-y-8">
                    <div className="flex items-start gap-5">
                       <div className="p-3 bg-green-100 rounded-2xl"><Flame className="text-green-600" /></div>
                       <div>
                          <h4 className="text-[10px] font-black uppercase text-green-600 tracking-widest mb-1">{selectedFruit.meaning}</h4>
                          <p className="text-lg font-bold uppercase leading-tight">SYNERGY DETECTED</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-5">
                       <div className="p-3 bg-red-100 rounded-2xl"><XCircle className="text-red-600" /></div>
                       <div>
                          <h4 className="text-[10px] font-black uppercase text-red-600 tracking-widest mb-1">KRYPTONITE</h4>
                          <p className="text-lg font-bold uppercase leading-tight">{selectedFruit.ban}</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* 4. FOOTER ŠIPKA (ZACHOVÁNO) */}
      <div className="z-50 flex flex-col items-center gap-4 cursor-pointer animate-bounce mt-10 mb-12">
        <span className="font-black text-[10px] md:text-sm tracking-[0.6em] text-[#22D3EE] uppercase animate-pulse">{txt.unveil}</span>
        <ChevronDown size={40} className="text-white opacity-80" strokeWidth={3} />
      </div>

      <MemorialFooter />
    </div>
  );
};

export default ValentinePage;