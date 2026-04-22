import React from 'react';
import MemorialFooter from '../components/MemorialFooter';
import SoulGuard from '../components/SoulGuard';
import { Network, Radio, Server, Layers, Wifi, Cpu, Shield, ArrowRight, ZapOff, Globe } from 'lucide-react';

// --- INJECTED CONTEXT ---
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

const T: any = {
  EN: {
    intro_h: "OLD WORLD vs NEW WORLD",
    intro_p: "The Internet is a decaying Matrix. Since it lacks a Soul Score, it's infested with troll farms, propaganda, and fear. AuraNet is the New World. Entry is conditional: Only clean souls. Only Truth and Love. No parasites allowed.",
    btn_upgrade: "INTERNET ⟶ AURANET",
    sub: "HARDCORE OSI LAYER • BGP • OSPF • SNS • SRC • AOS • MORSE",
    n1_lbl: "CORE ROUTER", n1_upt: "UPTIME", n1_val: "108 YEARS",
    n2_lbl: "FIREWALL", n2_pol: "POLICY", n2_val: "DROP LIES",
    n3_lbl: "CONTROLLER", n3_syn: "SYNC", n3_val: "PENDING",
    l7: "L7: APP", l7_val: "TRUTH (HTTP/2)",
    l4: "L4: TRANSPORT", l4_val: "TCP (TLACENKA)",
    l1: "L1: PHYSICAL", l1_val: "METAL / WOOD",
    analyzer: "SIGNAL ANALYZER",
    decoded: "DECODED: SOS MAHDAL SAVED"
  },
  FR: {
    intro_h: "VIEUX MONDE vs NOUVEAU MONDE",
    intro_p: "Internet est une Matrice en décomposition. Sans Soul Score, il est infesté de fermes de trolls, de propagande et de peur. AuraNet est le Nouveau Monde. L'entrée est conditionnelle : Uniquement des âmes pures. Uniquement la Vérité et l'Amour.",
    btn_upgrade: "INTERNET ⟶ AURANET",
    sub: "COUCHE OSI HARDCORE • BGP • OSPF • SNS • SRC • AOS • MORSE",
    n1_lbl: "ROUTEUR CENTRAL", n1_upt: "DURÉE", n1_val: "108 ANS",
    n2_lbl: "PARE-FEU", n2_pol: "POLITIQUE", n2_val: "REJETER MENSONGES",
    n3_lbl: "CONTRÔLEUR", n3_syn: "SYNC", n3_val: "EN ATTENTE",
    l7: "L7 : APPLICATION", l7_val: "VÉRITÉ (HTTP/2)",
    l4: "L4 : TRANSPORT", l4_val: "TCP (TLACENKA)",
    l1: "L1 : PHYSIQUE", l1_val: "MÉTAL / BOIS",
    analyzer: "ANALYSEUR DE SIGNAL",
    decoded: "DÉCODÉ : SOS MAHDAL SAUVÉ"
  },
  CZ: {
    intro_h: "STARÝ SVĚT vs NOVÝ SVĚT",
    intro_p: "Internet je hnijící Matrix. Protože postrádá Soul Score, je zamořen trollími farmami, propagandou a strachem. AuraNet je Nový Svět. Vstup je podmíněn: Jen čisté duše. Jen Pravda a Láska. Žádní paraziti.",
    btn_upgrade: "INTERNET ⟶ AURANET",
    sub: "HARDCORE OSI VRSTVA • BGP • OSPF • SNS • SRC • AOS • MORSE",
    n1_lbl: "CENTRÁLNÍ ROUTER", n1_upt: "DOBA BĚHU", n1_val: "108 LET",
    n2_lbl: "FIREWALL", n2_pol: "POLITIKA", n2_val: "ZAHODIT LŽI",
    n3_lbl: "KONTROLER", n3_syn: "SYNCHRO", n3_val: "ČEKÁ SE",
    l7: "L7: APLIKACE", l7_val: "PRAVDA (HTTP/2)",
    l4: "L4: TRANSPORT", l4_val: "TCP (TLAČENKA)",
    l1: "L1: FYZICKÁ", l1_val: "KOV / DŘEVO",
    analyzer: "ANALYZÁTOR SIGNÁLU",
    decoded: "DEKÓDOVÁNO: SOS MAHDAL ZACHRÁNĚN"
  },
  DE: {
    intro_h: "ALTE WELT vs NEUE WELT",
    intro_p: "Das Internet ist eine zerfallende Matrix. Da es kein Soul Score hat, ist es voll von Troll-Farmen und Lügen. AuraNet ist die Neue Welt. Zutritt nur für saubere Seelen. Nur Wahrheit und Liebe.",
    btn_upgrade: "INTERNET ⟶ AURANET",
    sub: "HARDCORE OSI EBENE • BGP • OSPF • SNS • SRC • AOS • MORSE",
    n1_lbl: "KERNROUTER", n1_upt: "LAUFZEIT", n1_val: "108 JAHRE",
    n2_lbl: "FIREWALL", n2_pol: "RICHTLINIE", n2_val: "LÜGEN ABWERFEN",
    n3_lbl: "CONTROLLER", n3_syn: "SYNC", n3_val: "AUSSTEHEND",
    l7: "L7: ANWENDUNG", l7_val: "WAHRHEIT (HTTP/2)",
    l4: "L4: TRANSPORT", l4_val: "TCP (TLACENKA)",
    l1: "L1: PHYSISCH", l1_val: "METALL / HOLZ",
    analyzer: "SIGNALANALYSATOR",
    decoded: "DECODIERT: SOS MAHDAL GERETTET"
  }
};

const AuraNetPage = () => {
  const { lang } = useLanguage();
  const txt = T[lang || 'EN'];

  return (
    <SoulGuard minScore={75}>
      <div className="min-h-screen bg-[#050505] text-[#10b981] font-mono selection:bg-[#10b981] selection:text-black flex flex-col">
        <LanguageToggle />

        {/* 1. IDEOLOGICAL HEADER (NEW) */}
        <section className="pt-24 pb-12 bg-black border-b-2 border-red-900/30">
           <div className="container mx-auto px-6 max-w-4xl text-center">
              <div className="flex justify-center gap-8 mb-8 opacity-50">
                <Globe size={40} className="text-red-900" />
                <ArrowRight size={40} className="text-zinc-800" />
                <Network size={40} className="text-[#10b981]" />
              </div>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6 italic">
                {txt.intro_h}
              </h1>
              <p className="text-zinc-400 text-sm md:text-lg leading-relaxed mb-10 font-serif italic border-l-4 border-[#cd5c09] pl-6 text-left">
                {txt.intro_p}
              </p>
              <button className="bg-[#cd5c09] text-black px-10 py-5 font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_30px_rgba(205,92,9,0.3)] flex items-center gap-3 mx-auto">
                <ZapOff size={20} /> {txt.btn_upgrade}
              </button>
           </div>
        </section>

        {/* 2. TECHNICAL HEADER (FROM DUMP) */}
        <header className="py-12 border-b border-[#10b981]/20 container mx-auto px-6">
           <div className="flex items-center gap-3 mb-4">
             <Network className="text-[#10b981] animate-pulse" size={40} />
             <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
               AURA<span className="text-[#10b981]">NET</span>
             </h2>
           </div>
           <p className="text-xs uppercase tracking-[0.3em] text-[#10b981]/60">
             {txt.sub}
           </p>
        </header>

        <main className="flex-grow container mx-auto px-6 py-12 space-y-12 pb-32">
           
           {/* 3. NETWORK TOPOLOGY (FROM DUMP) */}
           <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border border-[#10b981]/50 p-6 relative bg-[#10b981]/5">
                 <div className="absolute top-0 left-0 bg-[#10b981] text-black text-[10px] font-bold px-2 py-1 uppercase">{txt.n1_lbl}</div>
                 <Server size={32} className="mb-4 text-white" />
                 <h3 className="text-xl font-bold text-white mb-2 tracking-tighter uppercase">PRABABICKA_GW</h3>
                 <div className="space-y-1 text-[10px] border-t border-[#10b981]/30 pt-2 font-black uppercase">
                    <div className="flex justify-between text-zinc-500"><span>{txt.n1_upt}</span> <span className="text-[#10b981]">{txt.n1_val}</span></div>
                 </div>
              </div>

              <div className="border border-[#cd5c09]/50 p-6 relative bg-[#cd5c09]/5">
                 <div className="absolute top-0 left-0 bg-[#cd5c09] text-black text-[10px] font-bold px-2 py-1 uppercase">{txt.n2_lbl}</div>
                 <Shield size={32} className="mb-4 text-white" />
                 <h3 className="text-xl font-bold text-white mb-2 tracking-tighter uppercase">DEDECEK_FW</h3>
                 <div className="space-y-1 text-[10px] border-t border-[#cd5c09]/30 pt-2 font-black uppercase">
                    <div className="flex justify-between text-[#cd5c09]"><span>{txt.n2_pol}</span> <span>{txt.n2_val}</span></div>
                 </div>
              </div>

              <div className="border border-white/30 p-6 relative bg-white/5">
                 <div className="absolute top-0 left-0 bg-white text-black text-[10px] font-bold px-2 py-1 uppercase">{txt.n3_lbl}</div>
                 <Cpu size={32} className="mb-4 text-white" />
                 <h3 className="text-xl font-bold text-white mb-2 tracking-tighter uppercase">DJANGO_CORE</h3>
                 <div className="space-y-1 text-[10px] border-t border-white/30 pt-2 font-black uppercase">
                    <div className="flex justify-between text-zinc-500"><span>{txt.n3_syn}</span> <span className="text-white">{txt.n3_val}</span></div>
                 </div>
              </div>
           </section>

           {/* 4. OSI LAYER VISUALIZATION (FROM DUMP) */}
           <section className="border border-[#10b981]/30 bg-black p-8 rounded-2xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-[10px] font-black uppercase tracking-widest">
                 <div className="w-full border-l-4 border-[#cd5c09] pl-4 py-2">
                    <h4 className="text-[#cd5c09] mb-1">{txt.l7}</h4>
                    <p className="text-white text-base">{txt.l7_val}</p>
                 </div>
                 <div className="w-full border-l-4 border-zinc-700 pl-4 py-2">
                    <h4 className="text-zinc-500 mb-1">{txt.l4}</h4>
                    <p className="text-white text-base">{txt.l4_val}</p>
                 </div>
                 <div className="w-full border-l-4 border-zinc-700 pl-4 py-2">
                    <h4 className="text-zinc-500 mb-1">{txt.l1}</h4>
                    <p className="text-white text-base">{txt.l1_val}</p>
                 </div>
              </div>
           </section>

           {/* 5. MORSE ANALYZER (FROM DUMP) */}
           <section className="border-2 border-[#10b981]/30 p-8 bg-zinc-900/20 rounded-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Radio size={80} />
                 </div>
                 <h2 className="text-xl font-black mb-6 flex items-center gap-3 text-white uppercase italic">
                   <Radio size={24} className="text-[#cd5c09] animate-ping" /> {txt.analyzer}
                 </h2>
                 <div className="p-6 bg-black border border-[#cd5c09]/30 text-[#cd5c09] text-2xl md:text-4xl tracking-[0.5em] font-black break-all mb-4 shadow-[inset_0_0_20px_rgba(205,92,9,0.1)]">
                   ... --- ... / -- .- .... -.. .- .-.. / ... .- ...- . -..
                 </div>
                 <p className="text-xs text-zinc-500 font-black text-right uppercase tracking-[0.3em]">{txt.decoded}</p>
           </section>

        </main>
        <MemorialFooter />
      </div>
    </SoulGuard>
  );
};

export default AuraNetPage;