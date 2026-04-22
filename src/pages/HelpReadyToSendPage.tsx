import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MemorialFooter from '../components/MemorialFooter';
import SoulGuard from '../components/SoulGuard';
// --- INJECTED CONTEXT ---
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

import { 
  Package, ArrowLeft, CheckCircle, Utensils, 
  Wrench, Stethoscope, Baby, Weight, Zap, 
  ShieldCheck, AlertCircle, Info, Truck
} from 'lucide-react';

const T: any = {
  EN: {
    back: "Back to Dashboard",
    h1: "ASSEMBLE ", h1Span: "KPZ UNIT",
    sub: "SURVIVAL BOX // VERSION 2.1 // TRUTH SECURED",
    weight: "Current Weight:",
    max: "MAX: 5.0 kg",
    shipBtn: "TRANSMIT UNIT TO LOGISTICS",
    categories: {
      food: "NUTRITION",
      tools: "EQUIPMENT",
      meds: "MEDICINE",
      toys: "IDENTITY"
    },
    items: {
      "Dried Meat": "High energy protein.",
      "Water Tablets": "Clean water for 50L.",
      "Multi-Tool": "Proper metal. No plastic.",
      "Flashlight": "Self-powered (Crank).",
      "Antibiotics": "Life saver. Broad spectrum.",
      "Bandages": "Industrial grade.",
      "Teddy Bear": "For soul protection.",
      "Crayons": "To draw the future."
    },
    warning: "SYSTEM NOTE: Once you ship, the signal is written into the Ledger. No undo. Truth is final."
  },
  FR: {
    back: "Retour au Tableau de Bord",
    h1: "ASSEMBLER ", h1Span: "UNITÉ KPZ",
    sub: "BOÎTE DE SURVIE // VERSION 2.1 // VÉRITÉ SÉCURISÉE",
    weight: "Poids Actuel :",
    max: "MAX : 5.0 kg",
    shipBtn: "TRANSMETTRE L'UNITÉ À LA LOGISTIQUE",
    categories: {
      food: "NUTRITION",
      tools: "ÉQUIPEMENT",
      meds: "MÉDECINE",
      toys: "IDENTITÉ"
    },
    items: {
      "Dried Meat": "Protéine haute énergie.",
      "Water Tablets": "Eau propre pour 50L.",
      "Multi-Tool": "Vrai métal. Pas de plastique.",
      "Flashlight": "Auto-alimenté (Manivelle).",
      "Antibiotics": "Sauveur de vie.",
      "Bandages": "Qualité industrielle.",
      "Teddy Bear": "Pour protéger l'âme.",
      "Crayons": "Pour dessiner l'avenir."
    },
    warning: "NOTE SYSTÈME : Une fois expédié, le signal est écrit dans le Ledger. Pas d'annulation."
  },
  DE: {
    back: "Zurück zum Dashboard",
    h1: "KPZ EINHEIT ", h1Span: "ZUSAMMENSTELLEN",
    sub: "SURVIVAL BOX // VERSION 2.1 // WAHRHEIT GESICHERT",
    weight: "Aktuelles Gewicht:",
    max: "MAX: 5.0 kg",
    shipBtn: "EINHEIT AN LOGISTIK ÜBERMITTELN",
    categories: {
      food: "NÄHRSTOFFE",
      tools: "AUSRÜSTUNG",
      meds: "MEDIZIN",
      toys: "IDENTITÄT"
    },
    items: {
      "Dried Meat": "Hochenergie-Protein.",
      "Water Tablets": "Sauberes Wasser für 50L.",
      "Multi-Tool": "Echtes Metall. Kein Plastik.",
      "Flashlight": "Selbstversorgend (Kurbel).",
      "Antibiotics": "Lebensretter.",
      "Bandages": "Industriequalität.",
      "Teddy Bear": "Für den Seelenschutz.",
      "Crayons": "Um die Zukunft zu malen."
    },
    warning: "SYSTEM-HINWEIS: Nach dem Versand wird das Signal in den Ledger geschrieben. Keine Umkehr."
  },
  CZ: {
    back: "Zpět na Dashboard",
    h1: "SESTAVIT ", h1Span: "KPZ JEDNOTKU",
    sub: "KRABIČKA POSLEDNÍ ZÁCHRANY // VERZE 2.1 // PRAVDA ZAJIŠTĚNA",
    weight: "Aktuální váha:",
    max: "MAX: 5.0 kg",
    shipBtn: "PŘEDAT JEDNOTKU LOGISTICE",
    categories: {
      food: "VÝŽIVA",
      tools: "VYBAVENÍ",
      meds: "MEDICÍNA",
      toys: "IDENTITA"
    },
    items: {
      "Dried Meat": "Vysokoenergetický protein.",
      "Water Tablets": "Čistá voda pro 50L.",
      "Multi-Tool": "Poctivý kov. Žádný plast.",
      "Flashlight": "Samonapájecí (Klička).",
      "Antibiotics": "Záchrana života.",
      "Bandages": "Průmyslová kvalita.",
      "Teddy Bear": "Pro ochranu duše.",
      "Crayons": "Pro kreslení budoucnosti."
    },
    warning: "SYSTÉMOVÁ POZNÁMKA: Jakmile odešlete, signál je zapsán do Ledgeru. Není cesty zpět."
  }
};

const HelpReadyToSendPage = () => {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const txt = T[lang || 'EN'];

  const [activeItems, setActiveItems] = useState<string[]>([]);
  
  // DATA STRUKTURA (ZACHOVÁNO 1:1 DLE DUMPU)
  const categories = [
    { id: 'food', label: txt.categories.food, icon: <Utensils size={18}/>, items: [
      { id: 'f1', name: "Dried Meat", weight: 0.5, desc: txt.items["Dried Meat"] },
      { id: 'f2', name: "Water Tablets", weight: 0.1, desc: txt.items["Water Tablets"] }
    ]},
    { id: 'tools', label: txt.categories.tools, icon: <Wrench size={18}/>, items: [
      { id: 't1', name: "Multi-Tool", weight: 0.8, desc: txt.items["Multi-Tool"] },
      { id: 't2', name: "Flashlight", weight: 0.4, desc: txt.items["Flashlight"] }
    ]},
    { id: 'meds', label: txt.categories.meds, icon: <Stethoscope size={18}/>, items: [
      { id: 'm1', name: "Antibiotics", weight: 0.2, desc: txt.items["Antibiotics"] },
      { id: 'm2', name: "Bandages", weight: 0.3, desc: txt.items["Bandages"] }
    ]},
    { id: 'toys', label: txt.categories.toys, icon: <Baby size={18}/>, items: [
      { id: 'k1', name: "Teddy Bear", weight: 0.6, desc: txt.items["Teddy Bear"] },
      { id: 'k2', name: "Crayons", weight: 0.2, desc: txt.items["Crayons"] }
    ]}
  ];

  const totalWeight = categories.flatMap(c => c.items)
    .filter(i => activeItems.includes(i.id))
    .reduce((acc, curr) => acc + curr.weight, 0);

  const toggleItem = (id: string) => {
    setActiveItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <SoulGuard minScore={0}>
      <div className="min-h-screen bg-black text-zinc-400 font-mono flex flex-col selection:bg-red-600 selection:text-white">
        <LanguageToggle />

        <header className="pt-24 pb-12 border-b border-zinc-900 bg-[#050505]">
           <div className="container mx-auto px-6 max-w-5xl">
              <button onClick={() => navigate('/help')} className="flex items-center gap-2 text-zinc-600 hover:text-white mb-8 transition-colors group uppercase text-[10px] font-black tracking-widest">
                 <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> {txt.back}
              </button>
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                {txt.h1}<span className="text-red-600">{txt.h1Span}</span>
              </h1>
              <p className="text-zinc-600 text-[10px] uppercase tracking-[0.4em] mt-2">
                {txt.sub}
              </p>
           </div>
        </header>

        <main className="flex-grow container mx-auto px-6 py-12 max-w-5xl space-y-16">
           
           {/* WEIGHT MONITOR (ZACHOVÁNO 1:1) */}
           <div className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-8 sticky top-24 z-30 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                 <div className="p-4 bg-red-600/10 rounded-full border border-red-600/20">
                    <Weight size={32} className="text-red-600"/>
                 </div>
                 <div>
                    <h2 className="text-zinc-500 uppercase text-xs font-black tracking-widest">{txt.weight}</h2>
                    <p className="text-4xl font-black text-white tracking-tighter">{totalWeight.toFixed(1)} <span className="text-sm text-zinc-600">kg</span></p>
                 </div>
              </div>
              <div className="w-full md:w-1/2">
                 <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                    <span className={totalWeight > 5 ? "text-red-600" : "text-zinc-600"}>Payload Status</span>
                    <span className="text-zinc-500">{txt.max}</span>
                 </div>
                 <div className="h-4 bg-black border border-zinc-800 p-1 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 rounded-full ${totalWeight > 5 ? 'bg-red-600' : 'bg-red-600/40'}`}
                      style={{ width: `${Math.min((totalWeight / 5) * 100, 100)}%` }}
                    ></div>
                 </div>
              </div>
           </div>

           {/* ASSEMBLY GRID (ZACHOVÁNO) */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categories.map((cat) => (
                <div key={cat.id} className="space-y-4">
                   <h3 className="flex items-center gap-3 text-white font-black uppercase tracking-widest text-sm border-b border-zinc-800 pb-2">
                      {cat.icon} {cat.label}
                   </h3>
                   <div className="space-y-2">
                      {cat.items.map((item) => (
                        <button 
                          key={item.id}
                          onClick={() => toggleItem(item.id)}
                          className={`w-full text-left p-4 border transition-all flex justify-between items-center group ${activeItems.includes(item.id) ? 'bg-red-900/10 border-red-600' : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'}`}
                        >
                          <div>
                             <h4 className={`font-black uppercase text-xs ${activeItems.includes(item.id) ? 'text-red-600' : 'text-zinc-300'}`}>{item.name}</h4>
                             <p className="text-[10px] text-zinc-500 italic mt-1">{item.desc}</p>
                          </div>
                          <div className="flex items-center gap-4">
                             <span className="text-[10px] font-mono text-zinc-600">{item.weight}kg</span>
                             {activeItems.includes(item.id) ? <CheckCircle size={20} className="text-red-600"/> : <div className="w-5 h-5 border border-zinc-800 rounded-full"></div>}
                          </div>
                        </button>
                      ))}
                   </div>
                </div>
              ))}
           </div>

           {/* FINAL ACTION (ZACHOVÁNO 1:1) */}
           <section className="pt-12 border-t border-zinc-900">
              <div className="bg-zinc-900/20 border-2 border-dashed border-zinc-800 p-8 text-center rounded-3xl">
                 <p className="text-zinc-500 text-xs italic mb-8 max-w-lg mx-auto">
                    {txt.warning}
                 </p>
                 <button 
                   disabled={totalWeight === 0 || totalWeight > 5}
                   onClick={() => navigate('/help/payment')}
                   className={`px-12 py-6 font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 mx-auto shadow-2xl ${totalWeight > 0 && totalWeight <= 5 ? 'bg-red-600 text-white hover:bg-white hover:text-black hover:scale-105' : 'bg-zinc-800 text-zinc-600 cursor-not-allowed opacity-50'}`}
                 >
                    <Truck size={20}/> {txt.shipBtn}
                 </button>
              </div>
           </section>

        </main>
        
        <MemorialFooter />
      </div>
    </SoulGuard>
  );
};

export default HelpReadyToSendPage;