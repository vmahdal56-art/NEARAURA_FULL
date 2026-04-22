import React, { useState, useEffect } from 'react';
import { Ledger } from '../utils/storage';
export const AuraDebugOverlay = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const toggle = (e: any) => { if (e.key === '`') setVisible(v => !v); };
    window.addEventListener('keydown', toggle);
    return () => window.removeEventListener('keydown', toggle);
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed top-2 left-2 z-[9999] bg-black/90 border border-[#cd5c09] p-3 font-mono text-[10px] text-zinc-400 uppercase pointer-events-none shadow-2xl">
      <div>SOUL: {Ledger.get('SOUL') || 'NULL'}</div>
      <div>AUTH: {Ledger.get('AUTH') || 'LOCKED'}</div>
      <div>AGE: {Ledger.get('AGE') || '0'}</div>
      <div className="mt-2 text-[8px] text-zinc-600">AURATRIX DEBUG · DEV</div>
    </div>
  );
};