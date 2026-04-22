import React from 'react';
import MemorialFooter from '../components/MemorialFooter';
import SoulGuard from '../components/SoulGuard';
import { Shield, Zap, Lock, Eye, ZapOff, Heart, Hammer, Anchor } from 'lucide-react';
// --- INJECTED CONTEXT ---
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

const T: any = {
  EN: {
    h1: "THE MANIFESTO",
    sub: "TRUTH OVER NOISE • PHYSICAL OVER DIGITAL • HUMAN OVER MACHINE",
    intro: "The world has become a simulation of convenience. We trade our soul for a 'Like' and our privacy for a 'Free Service'. Aura is the exit strategy.",
    systemTitle: "THE SYSTEM (MATRIX)",
    systemDesc: "Artificial scarcity. Data harvesting. Corporate 'as-a-service' chains. Constant noise. Digital isolation.",
    orchardTitle: "THE ORCHARD (AURA)",
    orchardDesc: "Physical results. Absolute privacy. Family DNA. Silence. Real human connection.",
    pillars: [
      { t: "TRUTH", d: "Truth is not a service. It's a binary state (1 or 0). We kill the noise." },
      { t: "METAL & WOOD", d: "We value things you can touch. Software is just a tool for hardware." },
      { t: "PRIVACY", d: "Your data is your blood. Nobody has the right to touch it." }
    ],
    footer: "THIS IS NOT A STARTUP. THIS IS A LEGACY."
  },
  FR: {
    h1: "LE MANIFESTE",
    sub: "LA VÉRITÉ SUR LE BRUIT • LE PHYSIQUE SUR LE NUMÉRIQUE • L'HUMAIN SUR LA MACHINE",
    intro: "Le monde est devenu une simulation de commodité. Nous échangeons notre âme contre un 'Like'. Aura est la stratégie de sortie.",
    systemTitle: "LE SYSTÈME (MATRICE)",
    systemDesc: "Pénurie artificielle. Collecte de données. Chaînes corporatives. Bruit constant. Isolation numérique.",
    orchardTitle: "LE VERGER (AURA)",
    orchardDesc: "Résultats physiques. Confidentialité absolue. ADN familial. Silence. Connexion humaine réelle.",
    pillars: [
      { t: "VÉRITÉ", d: "La vérité n'est pas un service. C'est un état binaire (1 ou 0). Nous tuons le bruit." },
      { t: "MÉTAL & BOIS", d: "Nous valorisons ce que l'on peut toucher. Le logiciel n'est qu'un outil." },
      { t: "CONFIDENTIALITÉ", d: "Vos données sont votre sang. Personne n'a le droit d'y toucher." }
    ],
    footer: "CE N'EST PAS UNE STARTUP. C'EST UN HÉRITAGE."
  },
  DE: {
    h1: "DAS MANIFEST",
    sub: "WAHRHEIT ÜBER LÄRM • PHYSISCH ÜBER DIGITAL • MENSCH ÜBER MASCHINE",
    intro: "Die Welt ist zu einer Simulation der Bequemlichkeit geworden. Aura ist die Exit-Strategie.",
    systemTitle: "DAS SYSTEM (MATRIX)",
    systemDesc: "Künstliche Knappheit. Datenernte. Ständiger Lärm. Digitale Isolation.",
    orchardTitle: "DER GARTEN (AURA)",
    orchardDesc: "Physische Ergebnisse. Absolute Privatsphäre. Familien-DNA. Stille. Echte Verbindung.",
    pillars: [
      { t: "WAHRHEIT", d: "Wahrheit ist keine Dienstleistung. Wir beenden den Lärm." },
      { t: "METALL & HOLZ", d: "Wir schätzen Dinge, die man anfassen kann. Software ist nur ein Werkzeug." },
      { t: "PRIVATSPHÄRE", d: "Deine Daten sind dein Blut. Niemand hat das Recht, sie zu berühren." }
    ],
    footer: "DIES IST KEIN STARTUP. DIES IST EIN VERMÄCHTNIS."
  },
  CZ: {
    h1: "MANIFEST",
    sub: "PRAVDA NAD HLUKEM • FYZIČNO NAD DIGITÁLEM • ČLOVĚK NAD STROJEM",
    intro: "Svět se stal simulací pohodlí. Měníme svou duši za 'Like' a soukromí za 'Službu zdarma'. Aura je úniková strategie.",
    systemTitle: "SYSTÉM (MATRIX)",
    systemDesc: "Umělý nedostatek. Těžení dat. Korporátní řetězce. Neustálý hluk. Digitální izolace.",
    orchardTitle: "SAD (AURA)",
    orchardDesc: "Fyzické výsledky. Absolutní soukromí. Rodinná DNA. Ticho. Skutečné lidské spojení.",
    pillars: [
      { t: "PRAVDA", d: "Pravda není služba. Je to binární stav (1 nebo 0). Zabíjíme hluk." },
      { t: "KOV A DŘEVO", d: "Vážíme si věcí, na které si lze sáhnout. Software je jen nástroj pro hardware." },
      { t: "SOUKROMÍ", d: "Tvoje data jsou tvá krev. Nikdo nemá právo se jich dotknout." }
    ],
    footer: "TOTO NENÍ STARTUP. TOTO JE ODKAZ."
  }
};

const ManifestoPage = () => {
  const { lang } = useLanguage();
  const txt = T[lang || 'EN'];

  return (
    <SoulGuard minScore={0}>
      <div className="min-h-screen bg-[#050505] text-zinc-400 font-serif selection:bg-[#cd5c09] selection:text-black flex flex-col">
        <LanguageToggle />

        <header className="pt-32 pb-16 text-center border-b border-zinc-900 bg-black">
           <Shield size={64} className="mx-auto text-[#cd5c09] mb-6 animate-pulse" />
           <h1 className="text-5xl md:text-8xl text-white font-black uppercase tracking-tighter mb-4 italic">{txt.h1}</h1>
           <p className="text-zinc-500 font-mono uppercase tracking-widest text-xs">{txt.sub}</p>
        </header>

        <main className="flex-grow container mx-auto px-6 py-20 max-w-5xl space-y-32">
           
           {/* INTRO QUOTE */}
           <section className="text-center max-w-3xl mx-auto border-l-4 border-[#cd5c09] pl-8 py-4">
              <p className="text-2xl md:text-3xl text-white italic leading-relaxed">
                "{txt.intro}"
              </p>
           </section>

           {/* THE COMPARISON (ZACHOVÁNO 1:1 DLE DUMPU) */}
           <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-red-950/10 border border-red-900/30 p-10 rounded-3xl group hover:bg-red-900/20 transition-all">
                 <ZapOff className="text-red-600 mb-6" size={40} />
                 <h2 className="text-3xl font-black text-white uppercase mb-4">{txt.systemTitle}</h2>
                 <p className="text-zinc-500 leading-relaxed italic">
                   {txt.systemDesc}
                 </p>
              </div>
              <div className="bg-[#cd5c09]/10 border border-[#cd5c09]/30 p-10 rounded-3xl group hover:bg-[#cd5c09]/20 transition-all">
                 <Zap className="text-[#cd5c09] mb-6" size={40} />
                 <h2 className="text-3xl font-black text-white uppercase mb-4">{txt.orchardTitle}</h2>
                 <p className="text-zinc-300 leading-relaxed italic">
                   {txt.orchardDesc}
                 </p>
              </div>
           </section>

           {/* THE PILLARS (ZACHOVÁNO) */}
           <section className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {txt.pillars.map((p: any, i: number) => (
                    <div key={i} className="space-y-4 border-t border-zinc-800 pt-8">
                       <h3 className="text-[#cd5c09] font-black uppercase tracking-widest text-sm flex items-center gap-2">
                          {i === 0 ? <Eye size={16}/> : i === 1 ? <Hammer size={16}/> : <Lock size={16}/>} {p.t}
                       </h3>
                       <p className="text-zinc-400 text-sm leading-relaxed">
                          {p.d}
                       </p>
                    </div>
                 ))}
              </div>
           </section>

           {/* FINAL CALL (ZACHOVÁNO) */}
           <section className="text-center py-20 border-y border-zinc-900 bg-zinc-900/5">
              <Anchor className="mx-auto text-zinc-700 mb-8" size={48} />
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                 {txt.footer}
              </h2>
              <div className="flex justify-center gap-4 mt-12">
                 <div className="w-2 h-2 bg-[#cd5c09] rounded-full animate-ping"></div>
                 <div className="w-2 h-2 bg-white rounded-full animate-ping delay-100"></div>
                 <div className="w-2 h-2 bg-[#cd5c09] rounded-full animate-ping delay-200"></div>
              </div>
           </section>

        </main>
        <MemorialFooter />
      </div>
    </SoulGuard>
  );
};

export default ManifestoPage;