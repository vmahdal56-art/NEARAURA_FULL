import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MemorialFooter from '../components/MemorialFooter';
import SoulGuard from '../components/SoulGuard';
import { 
  Triangle, Sword, Cross, Skull, Heart, 
  Hammer, ShieldAlert, GitMerge, Tv, 
  MessageSquare, ArrowRight, Ban, Globe, Mic2, Network, Anchor, Zap, Scissors
} from 'lucide-react';

// IMPORT OBRÁZKŮ (Ponecháno dle live kódu)
import vinylImg from '../assets/tublatanka.jpg';
import gramoImg from '../assets/nostalgy.jpg';

const RootsPage = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<'en' | 'cz' | 'fr' | 'de'>('en'); 

  const t = {
    en: {
      headerTitle: "Roots & Legacy",
      headerSub: "SOURCE CODE: MAHDAL / VYSTRČIL",
      ccTitle: "1. THE HISTORY OF CONTROL",
      ccItems: [
        { t: "PHARAOH", d: "I command. You build.", i: Triangle },
        { t: "ROME", d: "I conquer. You obey.", i: Sword },
        { t: "CHURCH", d: "I preach. You fear.", i: Cross },
        { t: "GESTAPO (1943)", d: "I take. You lose.", i: Skull },
      ],
      gestapoTitle: "THE DNA STRIKE (1943)",
      gestapoStory: "The Black Mercedes (Gestapo) arrived to take the Grandson. They expected obedience.",
      gestapoAction: "But they met the BLOODLINE. She ripped the child from them.",
      gestapoQuote: "\"HE IS OURS!\" (TEN JE NÁŠ!)",
      gestapoResult: "The Mercedes left. The logic of power was broken by the logic of Blood.",
      mahdalTitle: "LINE A: MAHDAL (NIVNICE)",
      mahdalSub: "THE HEART & KINDNESS",
      mahdalDesc: "Grandmother (Diabetes, Wheelchair, No leg). Yet she made the best Fruit Cocktails for New Year's Eve. Pure Love.",
      mahdalPeople: "MEMBERS: GRANDMA, GRANDPA, FATHER, MILENA, DANA.",
      vystrcilTitle: "LINE B: VYSTRČIL (BÁNON)",
      vystrcilSub: "THE ANVIL & DISCIPLINE",
      vystrcilDesc: "Work from 5 to 8. The Barn (Stodola) full of Straw and Treasures. The Go-Kart (Motokára) built by 'PARTA HIC' from scraps found in the barn.",
      vystrcilPeople: "MEMBERS: GREAT-GRANDMA, GRANDPA, MOTHER.",
      cultureTitle: "CULTURAL DNA (TRAINING DATA)",
      dialectItems: [
        { t: "OGAR Z NIVNICE", d: "The Boy from Nivnice. Identity." },
        { t: "NATÍRAU SEM PUOT", d: "\"I painted the fence blue...\" The Code of Work." },
        { t: "SUA SEM SUA", d: "\"I walked the path...\" Persistence." }
      ],
      tvDrchlik: "DRCHLIK VS. CML",
      tvDrchlikDesc: "In 'The Visitors', Central Brain (AI) fails. Mr. Drchlík fixes it with a wooden wedge. DJANGO IS DRCHLÍK.",
      tvWolf: "NU POGODI (THE WOLF)",
      tvWolfDesc: "Wolf on the rope with a cigarette. Proper Geezer.",
      sagaTitle: "THE SAGA OF TRUTH",
      occTitle: "1968: RUSSIAN WINTER",
      occDesc: "Tanks in the streets. Darkness falls. The Matrix tightens its grip.",
      rebelTitle: "1988: THE REBELLION (MÁNIČKA)",
      rebelDesc: "Growing up in Communist CSSR. I was a 'Mánička'. Iron Maiden t-shirt. Tublatanka on the turntable.",
      layer1Title: "1990s: PHYSICAL CONNECTIVITY (LAYER 1)", // ANECT ODSTRANĚN
      layer1Desc: "Crimping cables. Copper. Physical work. Pure connectivity.",
      londonTitle: "2011—2018: LONDON CALLING",
      londonDesc: "Exile. Hard work. Verification of Truth.",
      freedomScream: "FREEEEEEEEEEEDOOOOOOOOOOOOOOOOMMMMMMMMMMMMMM",
      shiftTitle: "2026: THE RETURN (AURATRIX)",
      shiftDesc: "The circle closes. Returning home with the Source Code.",
      trainBtn: "ENTER AURATRIX"
    },
    fr: {
      headerTitle: "Racines & Héritage",
      headerSub: "CODE SOURCE : MAHDAL / VYSTRČIL",
      ccTitle: "1. L'HISTOIRE DU CONTRÔLE",
      ccItems: [
        { t: "PHARAON", d: "Je commande. Tu construis.", i: Triangle },
        { t: "ROME", d: "Je conquiers. Tu obéis.", i: Sword },
        { t: "L'ÉGLISE", d: "Je prêche. Tu as peur.", i: Cross },
        { t: "GESTAPO (1943)", d: "Je prends. Tu perds.", i: Skull },
      ],
      gestapoTitle: "L'ATTAQUE DE L'ADN (1943)",
      gestapoStory: "La Mercedes noire (Gestapo) est arrivée pour prendre le Petit-fils.",
      gestapoAction: "Mais ils ont rencontré la LIGNÉE. Elle leur a arraché l'enfant.",
      gestapoQuote: "\"CELUI-LÀ EST À NOUS !\" (TEN JE NÁŠ!)",
      gestapoResult: "La Mercedes est partie. La logique du pouvoir brisée par celle du Sang.",
      mahdalTitle: "LIGNE A : MAHDAL (NIVNICE)",
      mahdalSub: "LE CŒUR & LA BONTÉ",
      mahdalDesc: "La grand-mère (Diabète, fauteuil roulant). Pourtant, elle faisait les meilleurs cocktails de fruits. Amour Pur.",
      mahdalPeople: "MEMBRES : GRAND-MÈRE, GRAND-PÈRE, PÈRE, MILENA, DANA.",
      vystrcilTitle: "LIGNE B : VYSTRČIL (BÁNOV)",
      vystrcilSub: "L'ENCLUME & LA DISCIPLINE",
      vystrcilDesc: "Travail de 5 à 8. La grange pleine de paille et de trésors. Le Go-Kart fabriqué à partir de restes.",
      vystrcilPeople: "MEMBRES : ARRIÈRE-GRAND-MÈRE, GRAND-PÈRE, MÈRE.",
      cultureTitle: "ADN CULTUREL (DONNÉES D'ENTRAÎNEMENT)",
      dialectItems: [
        { t: "OGAR Z NIVNICE", d: "Le gamin de Nivnice. Identité." },
        { t: "NATÍRAU SEM PUOT", d: "\"J'ai peint la clôture en bleu...\" Le Code du Travail." },
        { t: "SUA SEM SUA", d: "\"J'ai tracé mon chemin...\" Persistance." }
      ],
      tvDrchlik: "DRCHLIK VS. CML",
      tvDrchlikDesc: "Dans 'Les Visiteurs', le Cerveau Central (IA) échoue. M. Drchlík le répare avec un coin en bois.",
      tvWolf: "NU POGODI (LE LOUP)",
      tvWolfDesc: "Le loup sur la corde avec une cigarette. Un vrai mec.",
      sagaTitle: "LA SAGA DE LA VÉRITÉ",
      occTitle: "1968 : L'HIVER RUSSE",
      occDesc: "Chars dans les rues. L'obscurité tombe. La Matrice serre sa prise.",
      rebelTitle: "1988 : LA RÉBELLION (MÁNIČKA)",
      rebelDesc: "Grandir en Tchécoslovaquie communiste. J'étais une 'Mánička'. T-shirt Iron Maiden.",
      layer1Title: "ANNÉES 90 : PROTOCOLES COUCHE 1", // ANECT ODSTRANĚN
      layer1Desc: "Sertissage de câbles. Cuivre. Travail physique. Connectivité pure.",
      londonTitle: "2011—2018 : L'APPEL DE LONDRES",
      londonDesc: "Exil. Travail acharné. Vérification de la Vérité.",
      freedomScream: "FREEEEEEEEEEEDOOOOOOOOOOOOOOOOMMMMMMMMMMMMMM",
      shiftTitle: "2026 : LE RETOUR (AURATRIX)",
      shiftDesc: "Le cercle se ferme. Retour à la maison avec le Code Source.",
      trainBtn: "ENTRER DANS L'AURATRIX"
    },
    de: {
      headerTitle: "Wurzeln & Erbe",
      headerSub: "QUELLCODE: MAHDAL / VYSTRČIL",
      ccTitle: "1. GESCHICHTE DER KONTROLLE",
      ccItems: [
        { t: "PHARAO", d: "Ich befehle. Du baust.", i: Triangle },
        { t: "ROM", d: "Ich erobere. Du gehorchst.", i: Sword },
        { t: "KIRCHE", d: "Ich predige. Du fürchtest dich.", i: Cross },
        { t: "GESTAPO (1943)", d: "Ich nehme. Du verlierst.", i: Skull },
      ],
      gestapoTitle: "DER DNA-SCHLAG (1943)",
      gestapoStory: "Der schwarze Mercedes (Gestapo) kam, um den Enkel zu holen.",
      gestapoAction: "Doch sie trafen auf die BLUTLINIE. Sie riss ihnen das Kind weg.",
      gestapoQuote: "\"DER GEHÖRT UNS!\" (TEN JE NÁŠ!)",
      gestapoResult: "Der Mercedes fuhr ab. Die Logik der Macht wurde durch das Blut gebrochen.",
      mahdalTitle: "LINIE A: MAHDAL (NIVNICE)",
      mahdalSub: "HERZ & GÜTE",
      mahdalDesc: "Oma (Diabetes, Rollstuhl). Dennoch machte sie die besten Obstcocktails an Silvester. Pure Liebe.",
      mahdalPeople: "MITGLIEDER: OMA, OPA, VATER, MILENA, DANA.",
      vystrcilTitle: "LINIE B: VYSTRČIL (BÁNOV)",
      vystrcilSub: "AMBOSS & DISZIPLIN",
      vystrcilDesc: "Arbeit von 5 bis 8. Die Scheune voller Stroh und Schätze. Das Go-Kart aus Schrott.",
      vystrcilPeople: "MITGLIEDER: UR-OMA, OPA, MUTTER.",
      cultureTitle: "KULTURELLE DNA",
      dialectItems: [
        { t: "OGAR Z NIVNICE", d: "Der Junge aus Nivnice. Identität." },
        { t: "NATÍRAU SEM PUOT", d: "\"Zaun blau gestrichen...\" Arbeitsethos." },
        { t: "SUA SEM SUA", d: "\"Weg gegangen...\" Beharrlichkeit." }
      ],
      tvDrchlik: "DRCHLIK VS. CML",
      tvDrchlikDesc: "In 'Die Besucher' versagt das Gehirn (KI). Drchlík fixiert es mit einem Holzkeil.",
      tvWolf: "NU POGODI (DER WOLF)",
      tvWolfDesc: "Wolf am Seil mit Zigarette. Ein echter Kerl.",
      sagaTitle: "DIE SAGA DER WAHRHEIT",
      occTitle: "1968: RUSSISCHER WINTER",
      occDesc: "Panzer auf den Straßen. Die Matrix zieht die Zügel an.",
      rebelTitle: "1988: DIE REBELLION (MÁNIČKA)",
      rebelDesc: "Aufgewachsen in der CSSR. Ich war eine 'Mánička'. Iron Maiden T-Shirt.",
      layer1Title: "1990er: SCHICHT 1 PROTOKOLLE", // ANECT ODSTRANĚN
      layer1Desc: "Kabel crimpen. Kupfer. Physische Arbeit. Pure Konnektivität.",
      londonTitle: "2011—2018: LONDON CALLING",
      londonDesc: "Exil. Harte Arbeit. Verifizierung der Wahrheit.",
      freedomScream: "FREEEEEEEEEEEDOOOOOOOOOOOOOOOOMMMMMMMMMMMMMM",
      shiftTitle: "2026: DIE RÜCKKEHR (AURATRIX)",
      shiftDesc: "Der Kreis schließt sich. Heimkehr mit dem Quellcode.",
      trainBtn: "AURATRIX BETRETEN"
    },
    cz: {
      headerTitle: "Kořeny a Odkaz",
      headerSub: "ZDROJOVÝ KÓD: MAHDAL / VYSTRČIL",
      ccTitle: "1. HISTORIE OVLÁDÁNÍ",
      ccItems: [
        { t: "FARAON", d: "Já přikazuji. Ty stavíš.", i: Triangle },
        { t: "ŘÍM", d: "Já dobývám. Ty posloucháš.", i: Sword },
        { t: "CÍRKEV", d: "Já kážu. Ty se bojíš.", i: Cross },
        { t: "GESTAPO (1943)", d: "Já beru. Ty ztrácíš.", i: Skull },
      ],
      gestapoTitle: "DNA ÚDER (1943)",
      gestapoStory: "Černý Mercedes (Gestapo) přijel pro Vnuka. Očekávali poslušnost.",
      gestapoAction: "Ale narazili na KREV. Vyrvala jim dítě z rukou.",
      gestapoQuote: "\"TEN JE NÁŠ!\"",
      gestapoResult: "Mercedes odjel. Logika moci byla zlomena logikou Krve.",
      mahdalTitle: "LINIE A: MAHDAL (NIVNICE)",
      mahdalSub: "SRDCE A LÁSKA",
      mahdalDesc: "Hodná babička (Cukrovka, Vozík, bez nohy). Přesto dělala nejlepší Ovocné koktejly na Silvestra. Čistá Láska.",
      mahdalPeople: "ČLENOVÉ: BABIČKA, DĚDA, OTEC, MILENA, DANA.",
      vystrcilTitle: "LINIE B: VYSTRČIL (BÁNOV)",
      vystrcilSub: "KOVADLINA A DISCIPLÍNA",
      vystrcilDesc: "Práce od 5 do 8. Stodola = Sláma a Poklady. Motokára 'PARTA HIC' ze stodolových zbytků. Bez brzd. Čistý adrenalin.",
      vystrcilPeople: "ČLENOVÉ: PRABABIČKA, DĚDA, MATKA.",
      cultureTitle: "KULTURNÍ DNA (TRÉNINKOVÁ DATA)",
      dialectItems: [
        { t: "OGAR Z NIVNICE", d: "Identita. Kluk z dědiny." },
        { t: "NATÍRAU SEM PUOT", d: "\"Natírau sem puot na modro...\" Kód práce." },
        { t: "SUA SEM SUA", d: "\"Bánovké sua sem sua...\" Cesta a vytrvalost." }
      ],
      tvDrchlik: "DRCHLÍK VS. CML",
      tvDrchlikDesc: "V 'Návštěvnících' CML (AI) selže. Kdo ho opraví? Ne vědec. Pan Drchlík. Dřevěným klínem. DJANGO JE DRCHLÍK.",
      tvWolf: "NU POGODI (VLK)",
      tvWolfDesc: "Vlk na laně s cigárem. Proper Geezer.",
      sagaTitle: "SÁGA PRAVDY",
      occTitle: "1968: RUSKÁ ZIMA (OKUPACE)",
      occDesc: "Tanky v ulicích. Tma. Normalizace. Matrix utahuje šrouby. Ticho před bouří.",
      rebelTitle: "1988: MÁNIČKA & IRON MAIDEN",
      rebelDesc: "Komunistické Československo. Byl jsem Mánička. Na sobě triko Iron Maiden, na somráku namalovaný Eddie s fakáčem.",
      anectTitle: "90s: PROTOKOLY VRSTVY 1", // ANECT ODSTRANĚN
      anectDesc: "Krimpování kabelů. Žádný Cloud, žádné kecy. Měď a konektory. Poctivá práce od podlahy.",
      londonTitle: "2011—2018: LONDÝN (ŠKOLA ŽIVOTA)",
      londonDesc: "Exile. Tvrdá práce. Potvrzení instinktů. SVOBODA stojí za to.",
      freedomScream: "FREEEEEEEEEEEDOOOOOOOOOOOOOOOOMMMMMMMMMMMMMM",
      shiftTitle: "2026: NÁVRAT (AURATRIX)",
      shiftDesc: "Kruh se uzavírá. Návrat domů se Zdrojovým kódem. Stavba Digitálního Klínu.",
      trainBtn: "VSTOUPIT DO AURATRIX"
    }
  };

  const text = t[lang];

  return (
    <SoulGuard minScore={50}>
      <div className="min-h-screen bg-[#050505] text-[#a1a1aa] font-serif flex flex-col relative selection:bg-[#cd5c09] selection:text-black">
        
        {/* LANG SWITCH */}
        <div className="fixed top-24 right-4 z-50 flex gap-2">
          {['en', 'fr', 'de', 'cz'].map((l) => (
            <button key={l} onClick={() => setLang(l as any)} className={`px-3 py-1 text-xs font-bold border transition-all uppercase tracking-widest ${lang === l ? 'bg-[#cd5c09] text-black border-[#cd5c09]' : 'bg-black border-zinc-800 text-zinc-500 hover:text-white'}`}>
              {l}
            </button>
          ))}
        </div>

        {/* HEADER (ZACHOVÁNO 1:1) */}
        <header className="pt-32 pb-12 text-center border-b border-zinc-900 bg-black sticky top-0 z-40 shadow-xl">
          <h1 className="text-4xl md:text-6xl text-[#cd5c09] font-black uppercase tracking-tighter mb-2">{text.headerTitle}</h1>
          <p className="text-xs text-zinc-500 font-mono uppercase tracking-[0.3em] flex items-center justify-center gap-2">
             <GitMerge size={12}/> {text.headerSub}
          </p>
        </header>

        <main className="flex-grow container mx-auto px-6 py-16 max-w-6xl space-y-32">
          
          {/* SECTION 1: ANCIENT HISTORY */}
          <section className="text-center opacity-80">
             <h2 className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-8">{text.ccTitle}</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                {text.ccItems.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center group hover:scale-105 transition-transform">
                     <item.i size={32} className="text-red-900/50 mb-2 group-hover:text-red-600 transition-colors"/>
                     <span className="text-xs font-bold uppercase text-zinc-500">{item.t}</span>
                     <span className="text-[10px] text-zinc-700 italic">{item.d}</span>
                  </div>
                ))}
             </div>
             <div className="relative border-[6px] border-red-900 p-8 md:p-12 bg-[#1a0505] overflow-hidden text-center max-w-4xl mx-auto">
                <div className="relative z-10">
                    <ShieldAlert size={48} className="mx-auto text-red-600 mb-4 animate-pulse"/>
                    <h2 className="text-3xl font-black text-white uppercase mb-4">{text.gestapoTitle}</h2>
                    <p className="text-xl text-zinc-300 font-serif mb-4">{text.gestapoStory}</p>
                    <p className="text-white font-bold text-lg mb-6">{text.gestapoAction}</p>
                    <p className="text-4xl md:text-5xl font-black text-[#cd5c09] mb-4">{text.gestapoQuote}</p>
                    <p className="italic text-zinc-500 text-sm uppercase tracking-widest">{text.gestapoResult}</p>
                </div>
             </div>
          </section>

          {/* SECTION 2: DUAL CORE */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
             <div className="bg-zinc-900/10 border-l-4 border-[#eab308] p-8 hover:bg-zinc-900/20 transition-colors group">
                <div className="flex items-center gap-3 mb-4 text-[#eab308]">
                   <Heart size={24} className="group-hover:scale-110 transition-transform"/>
                   <h3 className="text-xl font-black uppercase">{text.mahdalTitle}</h3>
                </div>
                <p className="text-[#eab308] font-mono text-xs uppercase mb-4 tracking-widest">{text.mahdalSub}</p>
                <p className="text-zinc-300 mb-6 leading-relaxed font-serif text-lg">{text.mahdalDesc}</p>
                <div className="bg-black/50 p-4 border border-[#eab308]/20">
                   <p className="text-[10px] text-zinc-400 font-mono uppercase">{text.mahdalPeople}</p>
                </div>
             </div>
             <div className="bg-zinc-900/10 border-r-4 border-[#cd5c09] p-8 text-right hover:bg-zinc-900/20 transition-colors group">
                <div className="flex items-center gap-3 mb-4 text-[#cd5c09] justify-end">
                   <h3 className="text-xl font-black uppercase">{text.vystrcilTitle}</h3>
                   <Hammer size={24} className="group-hover:rotate-45 transition-transform"/>
                </div>
                <p className="text-[#cd5c09] font-mono text-xs uppercase mb-4 tracking-widest">{text.vystrcilSub}</p>
                <p className="text-zinc-300 mb-6 leading-relaxed font-serif text-lg">{text.vystrcilDesc}</p>
                <div className="bg-black/50 p-4 border border-[#cd5c09]/20">
                   <p className="text-[10px] text-zinc-400 font-mono uppercase">{text.vystrcilPeople}</p>
                </div>
             </div>
          </section>

          {/* SECTION 3: CULTURAL DNA */}
          <section className="border-y border-zinc-900 py-16">
             <h2 className="text-center text-2xl font-black text-white uppercase mb-12">{text.cultureTitle}</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-[#0a0a0a] p-8 border border-zinc-800">
                   <h3 className="text-white font-bold uppercase mb-6 flex items-center gap-2">
                      <MessageSquare size={20} className="text-[#cd5c09]"/> DIALECT
                   </h3>
                   <div className="space-y-6">
                      {text.dialectItems.map((item, idx) => (
                         <div key={idx} className="border-l-2 border-[#cd5c09] pl-4">
                            <strong className="text-[#cd5c09] block uppercase text-sm mb-1">{item.t}</strong>
                            <p className="text-zinc-400 text-sm italic font-serif">"{item.d}"</p>
                         </div>
                      ))}
                   </div>
                </div>
                <div className="bg-[#0a0a0a] p-8 border border-zinc-800">
                   <h3 className="text-white font-bold uppercase mb-6 flex items-center gap-2">
                      <Tv size={20} className="text-[#cd5c09]"/> HEROES
                   </h3>
                   <div className="space-y-6">
                      <div>
                         <strong className="text-white text-sm block mb-1">{text.tvDrchlik}</strong>
                         <p className="text-zinc-500 text-xs">{text.tvDrchlikDesc}</p>
                      </div>
                      <div className="border-t border-zinc-800 pt-4">
                         <strong className="text-white text-sm block mb-1">{text.tvWolf}</strong>
                         <p className="text-zinc-500 text-xs">{text.tvWolfDesc}</p>
                      </div>
                   </div>
                </div>
             </div>
          </section>

          {/* SECTION 4: TIMELINE */}
          <section className="relative space-y-24">
             <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-zinc-800 -z-10"></div>
             <div className="text-center mb-16 bg-black inline-block px-4 relative z-10 mx-auto w-full">
                 <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">{text.sagaTitle}</h2>
             </div>

             <div className="relative pl-12 md:pl-0 md:text-right md:pr-12 md:w-1/2 ml-0 mr-auto">
                <div className="absolute left-[-5px] md:left-auto md:right-[-6px] top-0 w-3 h-3 bg-red-900 rounded-full"></div>
                <h3 className="text-2xl font-black text-red-900 uppercase mb-2">{text.occTitle}</h3>
                <p className="text-zinc-400 font-serif text-lg">{text.occDesc}</p>
             </div>

             <div className="relative pl-12 md:w-1/2 ml-auto">
                <div className="absolute left-[-5px] top-0 w-3 h-3 bg-[#cd5c09] rounded-full"></div>
                <div className="flex flex-col gap-8">
                    <div>
                        <div className="flex items-center gap-3 text-[#cd5c09] mb-2">
                           <Scissors size={24}/>
                           <h3 className="text-2xl font-black uppercase">{text.rebelTitle}</h3>
                        </div>
                        <p className="text-zinc-200 font-serif text-lg leading-relaxed border-l-4 border-[#cd5c09] pl-4">{text.rebelDesc}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#111] p-2 border border-zinc-800 text-center">
                           <div className="relative aspect-square mb-2 overflow-hidden bg-black">
                              <img src={vinylImg} alt="LP" className="w-full h-full object-cover sepia-[0.3] hover:sepia-0 transition-all duration-700"/>
                           </div>
                           <span className="text-[10px] font-mono text-zinc-500 uppercase">TUBLATANKA (1988)</span>
                        </div>
                        <div className="bg-[#111] p-2 border border-zinc-800 text-center">
                           <div className="relative aspect-square mb-2 overflow-hidden bg-black">
                              <img src={gramoImg} alt="Gramo" className="w-full h-full object-cover sepia-[0.2] hover:sepia-0 transition-all duration-700"/>
                           </div>
                           <span className="text-[10px] font-mono text-zinc-500 uppercase">MACHINE (2026)</span>
                        </div>
                    </div>
                </div>
             </div>

             <div className="relative pl-12 md:pl-0 md:text-right md:pr-12 md:w-1/2 ml-0 mr-auto">
                <div className="absolute left-[-5px] md:left-auto md:right-[-6px] top-0 w-3 h-3 bg-blue-600 rounded-full"></div>
                <div className="flex items-center gap-3 text-blue-500 mb-2 md:justify-end">
                   <h3 className="text-2xl font-black uppercase">{text.layer1Title}</h3>
                   <Network size={24}/>
                </div>
                <p className="text-zinc-300 font-serif text-lg leading-relaxed">{text.anectDesc}</p>
             </div>

             <div className="relative pl-12 md:w-1/2 ml-auto">
                <div className="absolute left-[-5px] top-0 w-3 h-3 bg-white rounded-full"></div>
                <div className="flex items-center gap-3 text-white mb-2">
                   <Globe size={24}/>
                   <h3 className="text-2xl font-black uppercase">{text.londonTitle}</h3>
                </div>
                <p className="text-zinc-300 font-serif text-lg leading-relaxed mb-8">{text.londonDesc}</p>
                <div className="p-4 border-2 border-white/20 bg-zinc-900/50 rounded-xl group hover:border-[#cd5c09] transition-colors">
                    <Mic2 size={32} className="text-[#cd5c09] mb-2 animate-pulse"/>
                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase break-all leading-none group-hover:text-[#cd5c09] transition-colors">{text.freedomScream}</h3>
                </div>
             </div>
          </section>

          {/* SECTION 5: THE SHIFT */}
          <section className="py-20 text-center border-t border-zinc-900 mt-24 bg-gradient-to-b from-black to-[#0a0a0a]">
             <div className="inline-block p-4 border-2 border-[#cd5c09] rounded-full mb-8">
                 <Anchor size={48} className="text-[#cd5c09]"/>
             </div>
             <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">{text.shiftTitle}</h2>
             <p className="text-zinc-500 font-mono uppercase tracking-[0.2em] mb-12">{text.shiftDesc}</p>
             <button onClick={() => navigate('/auratrix')} className="inline-flex items-center gap-4 bg-[#cd5c09] text-black px-12 py-6 font-black text-xl uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-[0_0_50px_rgba(205,92,9,0.3)] rounded-lg">
                {text.trainBtn} <ArrowRight size={24}/>
             </button>
          </section>

        </main>
        <MemorialFooter />
      </div>
    </SoulGuard>
  );
};

export default RootsPage;