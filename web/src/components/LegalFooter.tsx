import React from 'react';
import { Shield, Lock, AlertCircle, FileText } from 'lucide-react';

export default function LegalFooter({ mode = 'DARK' }: { mode?: 'DARK' | 'LIGHT' | 'KIDS' }) {
  const isKids = mode === 'KIDS';
  
  const textColor = isKids ? 'text-blue-400' : 'text-zinc-600';
  const hoverColor = isKids ? 'hover:text-white' : 'hover:text-zinc-400';
  const borderColor = isKids ? 'border-blue-900/30' : 'border-zinc-900';
  const bgColor = mode === 'LIGHT' ? 'bg-gray-100' : 'bg-transparent';

  return (
    <footer className={`w-full py-8 mt-auto border-t ${borderColor} ${bgColor} ${textColor} text-[9px] font-mono uppercase tracking-widest transition-colors duration-500 relative z-50`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* IDENTITY */}
        <div className="flex flex-col gap-1 text-center md:text-left">
          <span className="font-bold flex items-center gap-2 justify-center md:justify-start">
            <Shield size={10} className={isKids ? 'text-blue-500' : 'text-zinc-500'}/> 
            © 2026 AURA INC.
          </span>
          <span className="opacity-50">Mahdal Protocols v2.5</span>
        </div>

        {/* LEGAL LINKS */}
        <div className="flex flex-wrap justify-center gap-6 opacity-70">
          <button className={`${hoverColor} transition-colors flex items-center gap-1`}>
             <FileText size={10}/> Terms
          </button>
          <button className={`${hoverColor} transition-colors flex items-center gap-1`}>
             <Lock size={10}/> Privacy
          </button>
          <button className={`${hoverColor} transition-colors flex items-center gap-1`}>
             <Shield size={10}/> GDPR
          </button>
        </div>

        {/* DISCLAIMER */}
        <div className="flex items-center gap-2 opacity-50 text-right">
            {!isKids ? (
                <span className="flex items-center gap-2 cursor-help" title="Data are simulated for privacy.">
                    <AlertCircle size={10}/> SIMULATION MODE / DEMO
                </span>
            ) : (
                <span className="flex items-center gap-2">
                    <Lock size={10}/> SAFE HARBOR PROTOCOL
                </span>
            )}
        </div>
      </div>
    </footer>
  );
}