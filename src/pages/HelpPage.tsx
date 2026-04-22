import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MemorialFooter from '../components/MemorialFooter';
import SoulGuard from '../components/SoulGuard';
import { 
  Truck, Activity, Globe, Wifi, Radio, 
  Box, Zap, BarChart2, Flame, Hammer, AlertTriangle,
  Users, Stethoscope, Baby, Cpu, ArrowRight, ShieldCheck,
  Utensils, Database, Briefcase, Ban, Skull, 
  CircuitBoard, Thermometer, Droplet, Smile, Package, Shirt,
  Cross, XCircle, LogIn, Lock, Terminal, Factory, CheckCircle, MapPin, Clock, DollarSign
} from 'lucide-react';

// --- INJECTED CONTEXT ---
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

const T: any = {
  EN: {
    status: "NOT A CHARITY",
    h1: "EXECUTIVE ", h1Span: "DASHBOARD",
    sub: "AI ORCHESTRATED • LEDGER SECURED • REAL-TIME OPS",
    core: "AI CORE: ONLINE",
    helpBtn: "HELP THE MOST VULNERABLE KIDS",
    kpz: "DEPLOY KPZ UNIT (SURVIVAL BOX)",
    feedTitle: "IMMEDIATE DEMAND (LIVE SIGNAL)",
    receiving: "RECEIVING REQUESTS...",
    reqLabel: "REQUEST:",
    stats: ["FUNDS COLLECTED", "CONVERTED TO MATERIAL", "KPZ DELIVERED", "UNITS"],
    factoryH: "MANUFACTURERS",
    factorySub: "JOIN THE SUPPLY CHAIN OF TRUTH",
    factoryBtn: "I HAVE A FACTORY",
    cards: [
      { h: "DO YOU MAKE STUFF?", p: "We need socks, knives, flashlights, packaging, food. Do not send money. Send your best product.", i: "Input: RAW MATERIAL >>" },
      { h: "DO YOU MOVE STUFF?", p: "We need trucks, vans, and drivers who don't ask stupid questions and deliver on time.", i: "Input: LOGISTICS >>" },
      { h: "DO YOU PACK STUFF?", p: "We need durable boxes, tins, and wrapping that survives the mud and rain.", i: "Input: PACKAGING >>" }
    ]
  },
  FR: {
    status: "PAS UNE CHARITÉ",
    h1: "TABLEAU DE BORD ", h1Span: "EXÉCUTIF",
    sub: "ORCHESTRÉ PAR IA • LEDGER SÉCURISÉ • OPÉRATIONS EN TEMPS RÉEL",
    core: "CŒUR IA : EN LIGNE",
    helpBtn: "AIDER LES ENFANTS LES PLUS VULNÉRABLES",
    kpz: "DÉPLOYER UNITÉ KPZ (BOÎTE DE SURVIE)",
    feedTitle: "DEMANDE IMMÉDIATE (SIGNAL LIVE)",
    receiving: "RÉCEPTION DES REQUÊTES...",
    reqLabel: "REQUÊTE :",
    stats: ["FONDS COLLECTÉS", "CONVERTIS EN MATÉRIEL", "UNITÉS KPZ LIVRÉES", "UNITÉS"],
    factoryH: "FABRICANTS",
    factorySub: "REJOIGNEZ LA CHAÎNE D'APPROVISIONNEMENT DE LA VÉRITÉ",
    factoryBtn: "J'AI UNE USINE",
    cards: [
      { h: "VOUS FABRIQUEZ DES CHOSES ?", p: "Nous avons besoin de chaussettes, couteaux, lampes, emballages, nourriture. Envoyez vos produits.", i: "Entrée : MATIÈRE PREMIÈRE >>" },
      { h: "VOUS DÉPLACEZ DES CHOSES ?", p: "Nous avons besoin de camions, de camionnettes et de chauffeurs qui livrent à temps.", i: "Entrée : LOGISTIQUE >>" },
      { h: "VOUS EMBALLEZ DES CHOSES ?", p: "Nous avons besoin de boîtes durables et d'emballages qui survivent à la pluie.", i: "Entrée : EMBALLAGE >>" }
    ]
  },
  DE: {
    status: "KEINE WOHLTÄTIGKEIT",
    h1: "EXECUTIVE ", h1Span: "DASHBOARD",
    sub: "KI ORCHESTRIERT • LEDGER GESICHERT • ECHTZEIT-OPS",
    core: "KI-KERN: ONLINE",
    helpBtn: "DEN VERWUNDBARSTEN KINDERN HELFEN",
    kpz: "KPZ-EINHEIT EINSETZEN (ÜBERLEBENSBOX)",
    feedTitle: "SOFORTIGER BEDARF (LIVE-SIGNAL)",
    receiving: "ANFRAGEN EMPFANGEN...",
    reqLabel: "ANFRAGE:",
    stats: ["GESAMMELTE MITTEL", "IN MATERIAL UMGWANDELT", "KPZ GELIEFERT", "STÜCK"],
    factoryH: "HERSTELLER",
    factorySub: "WERDEN SIE TEIL DER LIEFERKETTE DER WAHRHEIT",
    factoryBtn: "ICH HABE EINE FABRIK",
    cards: [
      { h: "STELLEN SIE ETWAS HER?", p: "Wir brauchen Socken, Messer, Taschenlampen, Lebensmittel. Senden Sie Ihr bestes Produkt.", i: "Eingabe: ROHMATERIAL >>" },
      { h: "BEWEGEN SIE ETWAS?", p: "Wir brauchen Lastwagen, Vans und Fahrer, die pünktlich liefern.", i: "Eingabe: LOGISTIK >>" },
      { h: "VERPACKEN SIE ETWAS?", p: "Wir brauchen langlebige Kisten und Verpackungen, die Regen überstehen.", i: "Eingabe: VERPACKUNG >>" }
    ]
  },
  CZ: {
    status: "ŽÁDNÁ CHARITA",
    h1: "EXEKUTIVNÍ ", h1Span: "DASHBOARD",
    sub: "ORCHESTROVÁNO AI • LEDGER ZAJIŠTĚN • REAL-TIME OPS",
    core: "AI JÁDRO: ONLINE",
    helpBtn: "POMOC NEJZRANITELNĚJŠÍM DĚTEM",
    kpz: "NASADIT KPZ JEDNOTKU (KRABIČKA POSLEDNÍ ZÁCHRANY)",
    feedTitle: "OKAMŽITÁ POPTÁVKA (LIVE SIGNÁL)",
    receiving: "PŘIJÍMÁM POŽADAVKY...",
    reqLabel: "POŽADAVEK:",
    stats: ["VYBRANÉ PROSTŘEDKY", "PŘEVEDENO NA MATERIÁL", "KPZ DORUČENO", "KUSŮ"],
    factoryH: "VÝROBCI",
    factorySub: "PŘIPOJTE SE K DODAVATELSKÉMU ŘETĚZCI PRAVDY",
    factoryBtn: "MÁM TOVÁRNU",
    cards: [
      { h: "VYRÁBÍTE VĚCI?", p: "Potřebujeme ponožky, nože, svítilny, obaly, jídlo. Neposílejte peníze. Pošlete svůj nejlepší produkt.", i: "Vstup: MATERIÁL >>" },
      { h: "STĚHUJETE VĚCI?", p: "Potřebujeme náklaďáky, dodávky a řidiče, kteří se neptají na blbosti a doručí včas.", i: "Vstup: LOGISTIKA >>" },
      { h: "BALÍTE VĚCI?", p: "Potřebujeme odolné krabice, plechovky a obaly, které přežijí bláto a déšť.", i: "Vstup: OBALY >>" }
    ]
  }
};

const HelpPage = () => {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const txt = T[lang || 'EN'];
  
  // LIVE COUNTER STATE (ZACHOVÁNO 1:1 DLE DUMPU)
  const [stats, setStats] = useState({
     raised: 54000,      // USD
     converted: 42500,   // USD (Material)
     delivered: 450      // KPZ UNITS
  });

  // IMMEDIATE DEMAND STATE (ZACHOVÁNO 1:1 DLE DUMPU)
  const [demands, setDemands] = useState([
     { loc: "RAFAH (GAZA)", req: "INSULIN + MERKUR KITS", urgent: "CRITICAL", time: "2 MINS AGO" },
     { loc: "SUDAN (KHARTOUM)", req: "PROPANE-BUTANE GEN.", urgent: "SOS", time: "12 MINS AGO" },
     { loc: "HORNÍ DOLNÍ (CZ)", req: "40 DOLLS + WINTER JACKETS", urgent: "HIGH", time: "45 MINS AGO" },
     { loc: "KHARKIV (UA)", req: "POWER BANKS + DRIED MILK", urgent: "HIGH", time: "1 HOUR AGO" },
     { loc: "YEMEN (ADEN)", req: "CLEAN WATER FILTERS", urgent: "CRITICAL", time: "2 HOURS AGO" },
  ]);

  return (
    <SoulGuard minScore={0}>
      <div className="min-h-screen bg-black text-[#10b981] font-mono selection:bg-[#10b981] selection:text-black flex flex-col">
        <LanguageToggle />

        {/* HEADER (ZACHOVÁNO) */}
        <header className="pt-24 pb-8 border-b border-[#10b981]/20 bg-[#050505]">
           <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                 <div className="inline-block bg-red-600 text-white font-black text-xs px-3 py-1 uppercase tracking-widest mb-2 animate-pulse">
                    {txt.status}
                 </div>
                 <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
                   {txt.h1}<span className="text-[#10b981]">{txt.h1Span}</span>
                 </h1>
                 <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] mt-2">
                   {txt.sub}
                 </p>
              </div>
              <div className="flex gap-4 text-[10px] uppercase font-bold">
                 <div className="bg-[#10b981]/10 border border-[#10b981] px-4 py-2 text-[#10b981] flex items-center gap-2">
                    <Cpu size={12} className="animate-spin-slow"/> {txt.core}
                 </div>
              </div>
           </div>
        </header>

        <main className="flex-grow container mx-auto px-6 py-12 max-w-7xl space-y-24">
           
           {/* === 1. THE REACTOR (ZACHOVÁNO 1:1) === */}
           <section className="text-center">
              
              <div className="relative group inline-block w-full max-w-3xl mb-16">
                 <div className="absolute inset-0 bg-red-600 blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                 <button 
                    className="relative w-full bg-red-600 text-white text-2xl md:text-5xl font-black uppercase py-8 md:py-12 rounded-2xl shadow-[0_0_50px_rgba(220,38,38,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all border-4 border-red-500 tracking-tighter flex flex-col items-center justify-center gap-2"
                    onClick={() => navigate('/help/ready-to-send')}
                 >
                    <span>{txt.helpBtn}</span>
                    <span className="text-sm md:text-lg font-mono font-normal opacity-80 tracking-widest bg-black/20 px-4 py-1 rounded">
                       {txt.kpz}
                    </span>
                 </button>
              </div>

              {/* IMMEDIATE DEMAND FEED (ZACHOVÁNO) */}
              <div className="max-w-4xl mx-auto bg-[#1a0505] border-2 border-red-900/50 rounded-xl overflow-hidden relative shadow-[0_0_30px_rgba(220,38,38,0.1)] mb-16">
                  <div className="bg-red-950/50 px-6 py-3 flex justify-between items-center border-b border-red-900/30">
                     <div className="flex items-center gap-3">
                        <Radio size={20} className="text-red-500 animate-pulse" />
                        <h3 className="text-red-500 font-black uppercase tracking-widest text-sm md:text-base">{txt.feedTitle}</h3>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                        <span className="text-red-500 font-mono text-xs hidden md:inline">{txt.receiving}</span>
                     </div>
                  </div>
                  <div className="divide-y divide-red-900/20 max-h-[300px] overflow-y-auto">
                     {demands.map((item, idx) => (
                        <div key={idx} className="p-4 md:p-6 hover:bg-red-900/10 transition-colors flex flex-col md:flex-row gap-4 md:items-center justify-between text-left group">
                           <div className="md:w-1/3">
                              <div className="flex items-center gap-2 text-white font-bold uppercase mb-1">
                                 <MapPin size={14} className="text-red-500"/> {item.loc}
                              </div>
                              <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs">
                                 <Clock size={10}/> {item.time}
                              </div>
                           </div>
                           <div className="md:w-1/2">
                              <span className="text-[#cd5c09] font-mono text-xs uppercase block mb-1">{txt.reqLabel}</span>
                              <span className="text-white font-bold text-lg md:text-xl uppercase group-hover:text-[#cd5c09] transition-colors">
                                 {item.req}
                              </span>
                           </div>
                           <div className="md:w-1/6 text-right">
                              <span className={`inline-block px-3 py-1 text-xs font-black uppercase rounded border ${
                                 item.urgent === 'SOS' || item.urgent === 'CRITICAL' 
                                 ? 'bg-red-600 text-black border-red-600 animate-pulse' 
                                 : 'bg-red-900/20 text-red-500 border-red-900'
                              }`}>
                                 {item.urgent}
                              </span>
                           </div>
                        </div>
                     ))}
                  </div>
              </div>

              {/* LIVE LEDGER (ZACHOVÁNO) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden backdrop-blur-sm">
                 <div className="p-8 border-b md:border-b-0 md:border-r border-zinc-800">
                    <div className="flex items-center justify-center gap-2 text-zinc-500 mb-2 font-mono text-xs uppercase tracking-widest">
                       <DollarSign size={14}/> {txt.stats[0]}
                    </div>
                    <div className="text-4xl font-black text-white">
                       ${stats.raised.toLocaleString()}
                    </div>
                 </div>
                 <div className="p-8 border-b md:border-b-0 md:border-r border-zinc-800 bg-[#cd5c09]/5">
                    <div className="flex items-center justify-center gap-2 text-[#cd5c09] mb-2 font-mono text-xs uppercase tracking-widest">
                       <Activity size={14}/> {txt.stats[1]}
                    </div>
                    <div className="text-4xl font-black text-[#cd5c09]">
                       ${stats.converted.toLocaleString()}
                    </div>
                 </div>
                 <div className="p-8">
                    <div className="flex items-center justify-center gap-2 text-green-500 mb-2 font-mono text-xs uppercase tracking-widest">
                       <CheckCircle size={14}/> {txt.stats[2]}
                    </div>
                    <div className="text-4xl font-black text-white">
                       {stats.delivered} <span className="text-sm text-zinc-600">{txt.stats[3]}</span>
                    </div>
                 </div>
              </div>
           </section>

           {/* === 2. MANUFACTURERS MODULE (ZACHOVÁNO) === */}
           <section className="border-t border-zinc-900 pt-16">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
                 <div>
                    <div className="flex items-center gap-3 text-[#cd5c09] mb-2">
                       <Factory size={32} />
                       <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">{txt.factoryH}</h2>
                    </div>
                    <p className="text-zinc-500 font-mono uppercase tracking-widest text-xs">
                       {txt.factorySub}
                    </p>
                 </div>
                 <button className="px-8 py-4 border border-[#cd5c09] text-[#cd5c09] hover:bg-[#cd5c09] hover:text-black font-black uppercase transition-all flex items-center gap-2">
                    <Hammer size={18}/> {txt.factoryBtn}
                 </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {txt.cards.map((card: any, i: number) => (
                    <div key={i} className="bg-[#111] p-8 border-l-4 border-zinc-700 hover:border-[#cd5c09] transition-colors group">
                       <h3 className="text-xl font-black text-white mb-4 uppercase">{card.h}</h3>
                       <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                          {card.p}
                       </p>
                       <div className="text-[#cd5c09] font-mono text-xs uppercase group-hover:underline">{card.i}</div>
                    </div>
                 ))}
              </div>
           </section>

        </main>
        
        <MemorialFooter />
      </div>
    </SoulGuard>
  );
};

export default HelpPage;