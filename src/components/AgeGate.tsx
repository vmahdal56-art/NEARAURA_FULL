import React from 'react';
import { QrCode, Download, ShieldCheck, Zap, Smartphone, Eye } from 'lucide-react';

const AgeGate = ({ onScanSuccess }: { onScanSuccess: () => void }) => {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-10 font-mono text-white">
      {/* CLOUD BLUR - Tady se láme Matrix a Hardware */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl animate-pulse-slow"></div>

      <div className="max-w-5xl w-full border-2 border-[#cd5c09] bg-zinc-950/90 relative z-10 shadow-[0_0_150px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        
        {/* LEVÁ STRANA: IDENTITA */}
        <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-zinc-900 bg-black/40">
          <div className="mb-8">
            <h3 className="text-[#cd5c09] font-black uppercase tracking-[0.3em] text-[10px] mb-4">Awaiting Handshake</h3>
            <div className="bg-white p-3 inline-block relative group">
              <QrCode size={160} className="text-black" />
              <div className="absolute inset-0 border-2 border-[#cd5c09] scale-105 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] text-zinc-400 uppercase font-black">Naskenuj skrze AuraApp</p>
            <p className="text-[8px] text-zinc-600 uppercase">Status: Ledger Connection Ready</p>
          </div>
        </div>

        {/* PRAVÁ STRANA: VÝBAVA */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-zinc-950">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
            VSTUP DO <span className="text-[#cd5c09]">SADU</span>
          </h2>
          <p className="text-xs text-zinc-500 mb-10 leading-relaxed italic">
            "Vidíš obrysy, ale detaily patří jen těm, kdo nesou vlastní klíč. Nejsme korporát, neukládáme tvý data do cloudu. Tvůj telefon je tvá svoboda."
          </p>

          <div className="space-y-4">
            {/* LITE APP - PRVNÍ KONTAKT */}
            <button className="w-full flex items-center justify-between bg-[#cd5c09] text-black px-6 py-4 font-black uppercase tracking-widest hover:bg-white transition-all group">
              <span className="flex items-center gap-3"><Smartphone size={20}/> AuraAuth Lite</span>
              <Download size={20} className="group-hover:translate-y-1 transition-transform" />
            </button>
            <p className="text-[8px] text-zinc-600 uppercase text-center font-black">
              Stažení 4MB • AI Autentikace Duše • Bez Gov-Talku
            </p>

            <div className="relative py-4">
              <div className="h-px bg-zinc-900 w-full"></div>
            </div>

            <button 
              onClick={onScanSuccess} // Simulace pro vývoj
              className="w-full flex items-center justify-center gap-2 text-zinc-500 hover:text-white transition-colors text-[9px] uppercase font-black tracking-widest"
            >
              Už mám klíč v ruce <Zap size={12} className="text-yellow-500" />
            </button>
          </div>
        </div>

        {/* BOTTOM BAR: TECHNICKÝ RAZÍTKO */}
        <div className="col-span-1 md:col-span-2 bg-[#cd5c09]/5 border-t border-zinc-900 p-4 flex justify-between items-center px-8">
           <div className="flex items-center gap-2 text-[8px] font-black uppercase text-zinc-600 tracking-widest">
             <ShieldCheck size={12} className="text-green-600" /> Hardware Level Auth Active
           </div>
           <div className="text-[8px] font-black uppercase text-[#cd5c09] animate-pulse">
             Direct Post /api/soul enabled
           </div>
        </div>
      </div>
    </div>
  );
};

export default AgeGate;