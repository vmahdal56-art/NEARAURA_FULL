import React, { useState, useEffect } from 'react';
import { Activity, Heart, Clock } from 'lucide-react';
// --- INJECTED CONTEXT ---
import { useLanguage } from '../context/LanguageContext';

const T: any = {
  EN: {
    l1_tag: "ORCHARD • TRUTH",
    l2_tag: "HELP • LOVE",
    l3_tag: "ROOTS • COUNTDOWN",
    tubla: [
      "The world is different than I thought...",
      "The world is sadly real.",
      "Empty people want to rule it...",
      "They laugh in our faces.",
      "BUT THEY WILL NEVER KILL THE TRUTH!",
      "It will never die!",
      "TRUTH PREVAILS!",
      "Time doesn't harm the truth!",
      "Nor the shine of almighty money!"
    ],
    tucny: [
      "🎶 I used to like and I still do...",
      "What slumbers within me...",
      "I believed and I still believe...",
      "That it's worth it!",
      "--- FOR KIDS (TEDDY BEAR) ---",
      "🧸 You played with glass marbles...",
      "When the teddy bear was scared...",
      "Tickle him behind the ear so he knows...",
      "That he's not alone here..."
    ],
    europe: [
      "We're leaving together...",
      "But still it's farewell.",
      "And maybe we'll come back...",
      "To earth, who can tell?",
      "IT'S THE FINAL COUNTDOWN!",
      "TUDUDUDÚÚÚ TUDUDUDUDÚÚÚ...",
      "The Final Countdown...",
      "We're heading for Venus..."
    ]
  },
  FR: {
    l1_tag: "VERGER • VÉRITÉ",
    l2_tag: "AIDE • AMOUR",
    l3_tag: "RACINES • COMPTE À REBOURS",
    tubla: [
      "Le monde est différent de ce que je pensais...",
      "Le monde est tristement réel.",
      "Les gens vides veulent y régner...",
      "Ils nous rient au nez.",
      "MAIS ILS NE TUERONT JAMAIS LA VÉRITÉ !",
      "Elle ne mourra jamais !",
      "LA VÉRITÉ TRIOMPHE !",
      "Le temps n'atteint pas la vérité !",
      "Ni l'éclat de l'argent tout-puissant !"
    ],
    tucny: [
      "🎶 J'ai aimé et j'aime...",
      "Ce qui sommeille en moi...",
      "J'ai cru et je crois toujours...",
      "Que cela en vaut la peine !",
      "--- POUR LES ENFANTS (OURSON) ---",
      "🧸 Tu jouais aux billes de verre...",
      "Quand le petit ours avait peur...",
      "Chatouille-le derrière l'oreille...",
      "Qu'il n'est pas seul ici..."
    ],
    europe: [
      "Nous partons ensemble...",
      "Mais c'est quand même un adieu.",
      "Peut-être reviendrons-nous...",
      "Sur Terre, qui sait ?",
      "C'EST LE COMPTE À REBOURS FINAL !",
      "TUDUDUDÚÚÚ TUDUDUDUDÚÚÚ...",
      "Le Compte à Rebours Final...",
      "Nous visons Vénus..."
    ]
  },
  DE: {
    l1_tag: "GARTEN • WAHRHEIT",
    l2_tag: "HILFE • LIEBE",
    l3_tag: "WURZELN • COUNTDOWN",
    tubla: [
      "Die Welt ist anders als ich dachte...",
      "Die Welt ist traurig real.",
      "Leere Menschen wollen herrschen...",
      "Sie lachen uns ins Gesicht.",
      "ABER SIE TÖTEN DIE WAHRHEIT NIE!",
      "Sie wird niemals sterben!",
      "DIE WAHRHEIT SIEGT!",
      "Zeit schadet der Wahrheit nicht!",
      "Noch der Glanz des Geldes!"
    ],
    tucny: [
      "🎶 Ich mochte es und mag es noch...",
      "Was in mir schlummert...",
      "Ich glaubte und glaube weiter...",
      "Dass es den Preis wert ist!",
      "--- FÜR KINDER (TEDDYBÄR) ---",
      "🧸 Du hast mit Glaskugeln gespielt...",
      "Als der Teddybär Angst hatte...",
      "Kitzle ihn hinter dem Ohr...",
      "Dass er hier nicht allein ist..."
    ],
    europe: [
      "Wir gehen zusammen...",
      "Aber es ist doch ein Abschied.",
      "Vielleicht kommen wir zurück...",
      "Zur Erde, wer weiß das schon?",
      "ES IST DER FINALE COUNTDOWN!",
      "TUDUDUDÚÚÚ TUDUDUDUDÚÚÚ...",
      "The Final Countdown...",
      "Wir fliegen zur Venus..."
    ]
  },
  CZ: {
    l1_tag: "SAD • PRAVDA",
    l2_tag: "POMOC • LÁSKA",
    l3_tag: "KOŘENY • ODPOČET",
    tubla: [
      "Svet je iný, než som myslel...",
      "Svet je smutne skutočný.",
      "Prázdni ľudia chcú v n0m vládnuť...",
      "Smejú sa nám do očí.",
      "ALE PRAVDU NIKDY NEZABIJÚ!",
      "Tá nikdy nezomrie!",
      "PRAVDA VÍŤAZÍ!",
      "Pravde čas nevadí!",
      "Ani lesk všemocných peňazí!"
    ],
    tucny: [
      "🎶 Měl jsem rád a mám...",
      "To co ve mně dřímá...",
      "Věřil jsem a dál věřím...",
      "Že to cenu má!",
      "--- PRO DĚTI (MEDVÍDEK) ---",
      "🧸 Kuličky ze skla jsi hrál...",
      "Když se tenkrát medvídek bál...",
      "Pošimrej ho za uchem ať ví...",
      "Že tu není sám..."
    ],
    europe: [
      "Odcházíme spolu...",
      "Ale stále je to rozloučení.",
      "A možná se vrátíme...",
      "Na zem, kdo ví?",
      "JE TO ZÁVĚREČNÝ ODPOČET!",
      "TUDUDUDÚÚÚ TUDUDUDUDÚÚÚ...",
      "The Final Countdown...",
      "Míříme na Venuši..."
    ]
  }
};

const TruthSubtitles = () => {
  const { lang } = useLanguage();
  const txt = T[lang || 'EN'];

  const [line1, setLine1] = useState(0); 
  const [line2, setLine2] = useState(0); 
  const [line3, setLine3] = useState(0); 

  // ČASOVAČE (ZACHOVÁNO 1:1 DLE LIVE KÓDU)
  useEffect(() => {
    const i1 = setInterval(() => setLine1(l => (l + 1) % txt.tubla.length), 4000);
    const i2 = setInterval(() => setLine2(l => (l + 1) % txt.tucny.length), 5000); 
    const i3 = setInterval(() => setLine3(l => (l + 1) % txt.europe.length), 3500); 
    return () => { clearInterval(i1); clearInterval(i2); clearInterval(i3); };
  }, [txt]);

  return (
    <div className="fixed bottom-0 left-0 w-full z-[200] bg-black border-t-2 border-zinc-800 h-20 md:h-24 grid grid-cols-3 divide-x divide-zinc-800 selection:bg-[#cd5c09] selection:text-black">
      
      {/* === OKNO 1: TUBLATANKA (ORCHARD / TRUTH) === */}
      <div className="relative flex flex-col items-center justify-center p-2 bg-zinc-900/10 overflow-hidden group">
         <div className="absolute top-1 left-2 flex items-center gap-2">
            <Activity size={10} className="text-red-500 animate-pulse" />
            <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">{txt.l1_tag}</span>
         </div>
         <p className="text-white font-serif italic text-xs md:text-sm text-center leading-tight drop-shadow-md group-hover:scale-105 transition-transform px-4">
           "{txt.tubla[line1]}"
         </p>
         <div className="absolute bottom-1 right-2 text-[8px] text-zinc-600 uppercase">Tublatanka</div>
      </div>

      {/* === OKNO 2: MICHAL TUČNÝ (HELP / LOVE) === */}
      <div className="relative flex flex-col items-center justify-center p-2 bg-[#EAB308]/5 overflow-hidden group border-t-2 border-[#EAB308]">
         <div className="absolute top-1 left-2 flex items-center gap-2">
            <Heart size={10} className="text-[#EAB308] fill-current animate-bounce" />
            <span className="text-[9px] font-black text-[#EAB308] uppercase tracking-widest">{txt.l2_tag}</span>
         </div>
         <p className="text-[#EAB308] font-bold font-mono text-xs md:text-sm text-center leading-tight px-4 group-hover:text-white transition-colors">
           {txt.tucny[line2]}
         </p>
         <div className="absolute bottom-1 right-2 text-[8px] text-zinc-500 uppercase">Michal Tučný</div>
      </div>

      {/* === OKNO 3: EUROPE (ROOTS) === */}
      <div className="relative flex flex-col items-center justify-center p-2 bg-zinc-900/10 overflow-hidden group">
         <div className="absolute top-1 left-2 flex items-center gap-2">
            <Clock size={10} className="text-[#22D3EE] animate-spin-slow" />
            <span className="text-[9px] font-black text-[#22D3EE] uppercase tracking-widest">{txt.l3_tag}</span>
         </div>
         <p className="text-zinc-300 font-black uppercase text-xs md:text-sm text-center leading-tight tracking-wider px-4">
           {txt.europe[line3]}
         </p>
         <div className="absolute bottom-1 right-2 text-[8px] text-zinc-600 uppercase">Europe</div>
      </div>

    </div>
  );
};

export default TruthSubtitles;