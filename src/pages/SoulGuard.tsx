import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Lock, Activity, ArrowLeft } from 'lucide-react';

const SoulGuard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-red-500 font-mono flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* POZADÍ */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-red-900/10 animate-pulse pointer-events-none"></div>

      <div className="z-10 text-center max-w-2xl border border-red-900 bg-black/80 p-12 backdrop-blur-md shadow-[0_0_50px_rgba(220,38,38,0.3)]">
        
        <div className="flex justify-center mb-8">
           <ShieldAlert size={80} className="animate-pulse" />
        </div>

        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-white">
          SOUL <span className="text-red-600">GUARD</span>
        </h1>
        
        <div className="flex items-center justify-center gap-3 text-red-500 mb-8 border-y border-red-900/50 py-4">
           <Lock size={20} />
           <span className="tracking-[0.3em] uppercase text-xs font-bold">Protocol Active</span>
           <Activity size={20} className="animate-bounce" />
        </div>

        <p className="text-zinc-400 text-lg mb-8 font-serif italic">
          "Tvůj Soul Score je pod ochranou. Matrix se snaží proniknout dovnitř, ale firewall Dědečkova etika drží linii."
        </p>

        <div className="grid grid-cols-2 gap-4 text-xs font-mono uppercase tracking-widest text-zinc-600 mb-12">
           <div className="border border-zinc-900 p-2">Threat Level: <span className="text-white">EXTREME</span></div>
           <div className="border border-zinc-900 p-2">Status: <span className="text-green-500">SECURE</span></div>
        </div>

        <button 
          onClick={() => navigate('/gateway')}
          className="group flex items-center justify-center gap-3 w-full py-4 bg-red-600 text-black font-black uppercase tracking-widest hover:bg-white transition-all"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform"/>
          Return to Gateway
        </button>

      </div>
    </div>
  );
};

export default SoulGuard;