import React from 'react';
import MemorialFooter from '../components/MemorialFooter';
import SoulGuard from '../components/SoulGuard';
import { 
  HardHat, Hammer, Nut, AlertTriangle, 
  XCircle, CheckCircle, Truck, ShieldCheck, 
  DollarSign, Clock, Ban, UserX, Wrench, ShieldAlert
} from 'lucide-react';

// --- INJECTED CONTEXT ---
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

const T: any = {
  EN: {
    sub: "HARD SHELL • PURE WATER • PROPER WORK",
    introH: "DIY OR DIE?",
    introP: "We love DIY. But let's be honest. If you are a Grandmother with a leaking roof, or a Mother with three kids and a broken boiler, you can't just 'YouTube it'. You need a man with a van. A proper toolset. And a spine.",
    generic: "GENERIC PLATFORMS",
    namby: "OPERATOR: \"NAMBY PAMBY\"",
    aura: "MODULE KOKOS",
    geezer: "OPERATOR: \"PROPER GEEZER\"",
    bad: [
      { t: "HIDDEN FEES", d: "You pay 20% extra just for the 'connection'. The money goes to Silicon Valley." },
      { t: "NO TOOLS", d: "He arrives by subway with a plastic bag. 'Do you have a screwdriver, Madam?'" },
      { t: "GHOSTING", d: "'I'll be there on Tuesday.' (Never shows up. No call. No honor.)" },
      { t: "THE EXCUSE", d: "'It's too old. Buy a new system.' (Because he can't fix it.)" }
    ],
    good: [
      { t: "DIRECT (ZERO COMMISSION)", d: "100% of the money goes to the hands with calluses. No middleman." },
      { t: "OWN VAN & TOOLS", d: "Hilti, Makita, Festool. He has everything. He solves it." },
      { t: "5 TO 8 (ETHIC)", d: "Starts early. Finishes when it's done. No chatter. Just work." },
      { t: "THE GUARANTEE", d: "'Fixed.' His name is his bond. He doesn't leave until water flows." }
    ],
    defense: "PERIMETER DEFENSE",
    defenseQuote: "\"We don't lock with a key. We have Kokos.\"",
    scenario: "/// SCENARIO: KREMLIN / MATRIX KNOCKS ON DOOR ///",
    action: "Kokos (opens door with Wrench):",
    shout: "\"DO YOU HAVE A PINEAPPLE? OR JUST BOLLOCKS?\"",
    system: ">>> SYSTEM ACTION: DOOR SLAMMED. NOISE ELIMINATED.",
    need: "NEED A KOKOS?",
    needP: "This module is locked in the App under 'KOKOS' intent. If it's nonsense, no Geezer will come.",
    btnFind: "FIND KOKOS (NEARBY)",
    btnJoin: "I AM A CRAFTSMAN (JOIN)"
  },
  FR: {
    sub: "COQUE DUR • EAU PURE • TRAVAIL PROPRE",
    introH: "BRICOLER OU MOURIR ?",
    introP: "Nous aimons le bricolage. Mais soyons honnêtes. Si vous êtes une grand-mère avec un toit qui fuit, vous ne pouvez pas juste 'regarder YouTube'. Vous avez besoin d'un homme avec une camionnette. Un vrai outillage. Et une colonne vertébrale.",
    generic: "PLATEFORMES GÉNÉRIQUES",
    namby: "OPÉRATEUR : \"NAMBY PAMBY\"",
    aura: "MODULE KOKOS",
    geezer: "OPÉRATEUR : \"VRAI MEC\"",
    bad: [
      { t: "FRAIS CACHÉS", d: "Vous payez 20% de plus pour la 'connexion'. L'argent va à la Silicon Valley." },
      { t: "PAS D'OUTILS", d: "Il arrive en métro avec un sac plastique. 'Avez-vous un tournevis, Madame ?'" },
      { t: "GHOSTING", d: "'Je serai là mardi.' (Ne vient jamais. Pas d'appel. Pas d'honneur.)" },
      { t: "L'EXCUSE", d: "'C'est trop vieux. Achetez du neuf.' (Parce qu'il ne sait pas réparer.)" }
    ],
    good: [
      { t: "DIRECT (ZÉRO COMMISSION)", d: "100% de l'argent va aux mains calleuses. Pas d'intermédiaire." },
      { t: "CAMIONNETTE & OUTILS", d: "Hilti, Makita, Festool. Il a tout. Il résout le problème." },
      { t: "DE 5 À 8 (ÉTHIQUE)", d: "Commence tôt. Finit quand c'est fait. Pas de bavardage. Juste du travail." },
      { t: "LA GARANTIE", d: "'Réparé.' Sa parole est son engagement. L'eau doit couler." }
    ],
    defense: "DÉFENSE PÉRIMÉTRIQUE",
    defenseQuote: "\"Nous ne fermons pas à clé. Nous avons Kokos.\"",
    scenario: "/// SCÉNARIO : LE KREMLIN / LA MATRICE FRAPPE À LA PORTE ///",
    action: "Kokos (ouvre la porte avec une clé à molette) :",
    shout: "\"AVEZ-VOUS UN ANANAS ? OU JUSTE DES CONNERIES ?\"",
    system: ">>> ACTION SYSTÈME : PORTE CLAQUÉE. BRUIT ÉLIMINÉ.",
    need: "BESOIN D'UN KOKOS ?",
    needP: "Ce module est verrouillé dans l'App. Si c'est n'importe quoi, aucun artisan ne viendra.",
    btnFind: "TROUVER UN KOKOS",
    btnJoin: "JE SUIS UN ARTISAN (REJOINDRE)"
  },
  DE: {
    sub: "HARTE SCHALE • REINES WASSER • ECHTE ARBEIT",
    introH: "DIY ODER STERBEN?",
    introP: "Wir lieben Heimwerken. Aber seien wir ehrlich. Wenn das Dach leckt, hilft kein YouTube-Video. Man braucht einen Mann mit Werkzeug und Rückgrat.",
    generic: "GENERISCHE PLATTFORMEN",
    namby: "OPERATOR: \"NAMBY PAMBY\"",
    aura: "MODUL KOKOS",
    geezer: "OPERATOR: \"ECHTER KERL\"",
    bad: [
      { t: "VERSTECKTE GEBÜHREN", d: "20% extra für die 'Vermittlung'. Das Geld geht ins Silicon Valley." },
      { t: "KEIN WERKZEUG", d: "Kommt mit der U-Bahn und Plastiktüte. 'Haben Sie einen Schraubenzieher?'" },
      { t: "GHOSTING", d: "'Ich komme am Dienstag.' (Erscheint nie. Kein Anruf. Keine Ehre.)" },
      { t: "DIE AUSREDE", d: "'Zu alt. Kaufen Sie neu.' (Weil er es nicht reparieren kann.)" }
    ],
    good: [
      { t: "DIREKT (NULL PROVISION)", d: "100% des Geldes geht an die Hände mit Schwielen. Kein Mittelsmann." },
      { t: "EIGENER WAGEN & WERKZEUG", d: "Hilti, Makita, Festool. Er hat alles. Er löst es." },
      { t: "5 BIS 8 (ETHIK)", d: "Fängt früh an. Hört auf, wenn es fertig ist. Keine Quasselei." },
      { t: "DIE GARANTIE", d: "'Erledigt.' Sein Wort gilt. Er geht erst, wenn das Wasser fließt." }
    ],
    defense: "PERIMETERVERTEIDIGUNG",
    defenseQuote: "\"Wir schließen nicht ab. Wir haben Kokos.\"",
    scenario: "/// SZENARIO: KREML / MATRIX KLOPFT AN DIE TÜR ///",
    action: "Kokos (öffnet die Tür mit Rohrzange):",
    shout: "\"HABEN SIE EINE ANANAS? ODER NUR QUATSCH?\"",
    system: ">>> SYSTEMAKTION: TÜR ZU. LÄRM ELIMINIERT.",
    need: "BRAUCHST DU KOKOS?",
    needP: "Dieses Modul ist gesperrt. Bei Unsinn kommt kein Handwerker.",
    btnFind: "KOKOS FINDEN (NÄHE)",
    btnJoin: "ICH BIN HANDWERKER (BEITRETEN)"
  },
  CZ: {
    sub: "TVRDÁ SKOŘÁPKA • ČISTÁ VODA • POCTIVÁ PRÁCE",
    introH: "DIY NEBO SMRT?",
    introP: "Milujeme DIY. Ale buďme upřímní. Pokud jsi babička, které teče do střechy, nebo máma se třemi dětmi a rozbitým bojlerem, nepomůže ti YouTube. Potřebuješ chlapa s dodávkou, poctivým nářadím a páteří.",
    generic: "GENERICKÉ PLATFORMY",
    namby: "OPERÁTOR: \"NAMBY PAMBY\"",
    aura: "MODUL KOKOS",
    geezer: "OPERÁTOR: \"PROPER GEEZER\"",
    bad: [
      { t: "SKRYTÉ POPLATKY", d: "Platíš 20 % navíc jen za 'propojení'. Peníze jdou do Silicon Valley, ne řemeslníkovi." },
      { t: "ŽÁDNÉ NÁŘADÍ", d: "Přijede metrem s igelitkou. 'Nemáte šroubovák, paní?'" },
      { t: "GHOSTING", d: "'Přijedu v úterý.' (Nikdy se neukáže. Žádný hovor. Žádná čest.)" },
      { t: "VÝMLUVA", d: "'Je to moc staré. Kupte si nové.' (Protože to neumí opravit.)" }
    ],
    good: [
      { t: "PŘÍMO (NULOVÁ PROVIZE)", d: "100 % peněz jde do rukou s mozoly. Žádný prostředník." },
      { t: "VLASTNÍ AUTO A NÁŘADÍ", d: "Hilti, Makita, Festool. Má všechno v autě. Vyřeší to." },
      { t: "OD PĚTI DO OSMI (ETIKA)", d: "Začíná brzo. Končí, až je hotovo. Žádné žvanění. Jen práce." },
      { t: "ZÁRUKA", d: "'Opraveno.' Jeho jméno je jeho závazek. Neodejde, dokud voda neteče." }
    ],
    defense: "OBRANA PERIMETRU",
    defenseQuote: "„Nezamykáme na klíč. My máme Kokose.“",
    scenario: "/// SCÉNÁŘ: KREML / MATRIX KLEPE NA DVEŘE ///",
    action: "Kokos (otevírá dveře s hasákem):",
    shout: "„MÁTE ANANAS? NEBO JENOM KECY?“",
    system: ">>> SYSTÉMOVÁ AKCE: DVEŘE ZABOCHNUTY. HLUK ELIMINOVÁN.",
    need: "POTŘEBUJEŠ KOKOSE?",
    needP: "Tento modul je zamčený v aplikaci. Pokud je to nesmysl, žádný Geezer nepřijede.",
    btnFind: "NAJÍT KOKOSE (POBLÍŽ)",
    btnJoin: "JSEM ŘEMESLNÍK (PŘIDAT SE)"
  }
};

const KokosPage = () => {
  const { lang } = useLanguage();
  const txt = T[lang || 'EN'];

  return (
    <SoulGuard minScore={0}>
      <div className="min-h-screen bg-[#1a1810] text-[#eab308] font-mono selection:bg-[#eab308] selection:text-black flex flex-col">
        <LanguageToggle />
        
        {/* HEADER */}
        <header className="pt-24 pb-12 text-center border-b border-[#eab308]/20 bg-black">
           <div className="inline-block p-4 border-2 border-[#eab308] rounded-full mb-6 animate-pulse">
              <Nut size={48} className="text-[#eab308]" />
           </div>
           <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-2">
             MODULE <span className="text-[#eab308]">KOKOS</span>
           </h1>
           <p className="text-zinc-500 text-xs uppercase tracking-[0.3em]">
             {txt.sub}
           </p>
        </header>

        <main className="flex-grow container mx-auto px-6 py-16 max-w-6xl space-y-20">
           
           {/* INTRO */}
           <section className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl font-bold text-white mb-4 uppercase">{txt.introH}</h2>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base italic">
                {txt.introP}
              </p>
           </section>

           {/* === VS SECTION === */}
           <section className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-zinc-800 shadow-2xl">
              
              {/* LEFT: GENERIC (BAD) */}
              <div className="bg-[#110000] border-b md:border-b-0 md:border-r border-zinc-800 p-8 md:p-12 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <Ban size={200} className="text-red-900" />
                 </div>

                 <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2 text-red-600">
                       <XCircle size={24} />
                       <span className="text-xs font-bold uppercase tracking-widest">USUAL "GIG" APPS</span>
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase mb-1">{txt.generic}</h3>
                    <p className="text-red-500 font-bold mb-8 text-sm uppercase">{txt.namby}</p>

                    <ul className="space-y-6">
                       {txt.bad.map((item: any, i: number) => (
                         <li key={i} className="flex gap-4">
                            <div className="mt-1">
                              {i === 0 ? <DollarSign size={20} className="text-red-600"/> : 
                               i === 1 ? <UserX size={20} className="text-red-600"/> :
                               i === 2 ? <Clock size={20} className="text-red-600"/> :
                               <AlertTriangle size={20} className="text-red-600"/>}
                            </div>
                            <div>
                               <strong className="text-white block uppercase text-sm">{item.t}</strong>
                               <p className="text-zinc-500 text-xs">{item.d}</p>
                            </div>
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>

              {/* RIGHT: AURA CRAFTSMEN (GOOD) */}
              <div className="bg-[#1a1500] p-8 md:p-12 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <CheckCircle size={200} className="text-[#eab308]" />
                 </div>

                 <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2 text-[#eab308]">
                       <ShieldCheck size={24} />
                       <span className="text-xs font-bold uppercase tracking-widest">AURA CRAFTSMEN</span>
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase mb-1">{txt.aura}</h3>
                    <p className="text-[#eab308] font-bold mb-8 text-sm uppercase">{txt.geezer}</p>

                    <ul className="space-y-6">
                       {txt.good.map((item: any, i: number) => (
                         <li key={i} className="flex gap-4">
                            <div className="mt-1">
                              {i === 0 ? <Nut size={20} className="text-[#eab308]"/> : 
                               i === 1 ? <Truck size={20} className="text-[#eab308]"/> :
                               i === 2 ? <Clock size={20} className="text-[#eab308]"/> :
                               <Hammer size={20} className="text-[#eab308]"/>}
                            </div>
                            <div>
                               <strong className="text-white block uppercase text-sm">{item.t}</strong>
                               <p className="text-zinc-400 text-xs">{item.d}</p>
                            </div>
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>
           </section>

           {/* --- KOKOS SECURITY PROTOCOL (HASÁK) --- */}
           <div className="border-4 border-red-600 bg-red-950/20 p-8 rounded-xl relative overflow-hidden transform md:rotate-1 md:hover:rotate-0 transition-transform duration-300 shadow-[0_0_50px_rgba(220,38,38,0.2)]">
               <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                   <Wrench size={120} />
               </div>
               
               <h3 className="text-3xl font-black text-red-500 uppercase mb-4 flex items-center gap-3">
                  <ShieldAlert size={32}/> {txt.defense}
               </h3>
               
               <div className="font-mono text-xl md:text-2xl text-white font-bold space-y-4 relative z-10">
                  <p>{txt.defenseQuote}</p>
                  <div className="bg-black p-6 border border-red-500/50 rounded-lg shadow-xl">
                     <p className="text-zinc-500 text-xs mb-2 uppercase">{txt.scenario}</p>
                     <p className="text-[#cd5c09]">{txt.action}</p>
                     <p className="text-white text-3xl font-black uppercase mt-2">{txt.shout}</p>
                     <p className="text-red-500 text-xs mt-4 animate-pulse">{txt.system}</p>
                  </div>
               </div>
           </div>

           {/* CTA */}
           <section className="text-center bg-zinc-900 border border-zinc-800 p-10 rounded-xl shadow-2xl">
              <h3 className="text-white text-2xl font-bold uppercase mb-4">{txt.need}</h3>
              <p className="text-zinc-500 mb-8 text-sm max-w-xl mx-auto italic">
                 {txt.needP}
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                 <button className="bg-[#eab308] text-black font-black px-8 py-4 uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2 transform hover:scale-105">
                    <Hammer size={18}/> {txt.btnFind}
                 </button>
                 <button className="border border-zinc-700 text-zinc-400 font-bold px-8 py-4 uppercase tracking-widest hover:text-white hover:border-white transition-all transform hover:scale-105">
                    {txt.btnJoin}
                 </button>
              </div>
           </section>

        </main>
        <MemorialFooter />
      </div>
    </SoulGuard>
  );
};

export default KokosPage;