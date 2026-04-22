import React from 'react';
import { ShieldAlert, Fingerprint, Lock, Zap } from 'lucide-react';

export default function SecurityPortal() {
  const mockHWID = "8F3A-92DE-0012-XB99"; // In prod, this pulls from the App sync
  
  return (
    <div className="pt-40 pb-20 px-6 bg-[#050000] min-h-screen text-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-600/10 border-2 border-red-600/20 p-12 rounded-[60px] mb-12 relative overflow-hidden">
          <ShieldAlert className="absolute -right-10 -top-10 text-red-600/10" size={240} />
          <h1 className="text-5xl font-black italic uppercase mb-6">Security <span className="text-red-600">Portal</span></h1>
          <p className="text-slate-400 font-bold italic uppercase tracking-widest mb-8">
            Your connection to the Orchard is tied to this physical device. 
            If this device is Exiled, it can never return.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-black/40 p-6 rounded-3xl border border-white/5">
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] block mb-2">Registered HWID</span>
              <code className="text-[#22D3EE] font-mono font-bold">{mockHWID}</code>
            </div>
            <div className="bg-black/40 p-6 rounded-3xl border border-white/5">
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] block mb-2">Trust Index</span>
              <span className="text-2xl font-black italic text-green-500">99.8% VERIFIED</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 border border-white/5 rounded-[40px] text-center">
                <Fingerprint className="mx-auto mb-4 text-[#D4AF37]" />
                <h4 className="font-black italic uppercase text-xs">Biometric Sync</h4>
            </div>
            <div className="p-8 border border-white/5 rounded-[40px] text-center">
                <Lock className="mx-auto mb-4 text-[#D4AF37]" />
                <h4 className="font-black italic uppercase text-xs">E2E Messaging</h4>
            </div>
            <div className="p-8 border border-white/5 rounded-[40px] text-center">
                <Zap className="mx-auto mb-4 text-[#D4AF37]" />
                <h4 className="font-black italic uppercase text-xs">Anti-Bot Shield</h4>
            </div>
        </div>
      </div>
    </div>
  );
}
