import React from 'react';
import { t } from '../utils/i18n';
import { Ledger } from '../utils/storage';
import { generateAuditId } from '../utils/auditId';
export const ExilePage = () => {
  const ts = Date.now();
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-10">
      <div className="border-4 border-red-900 p-10 max-w-md">
        <h1 className="text-red-600 text-4xl font-black mb-4 uppercase">{t('exile_title')}</h1>
        <p className="text-zinc-500 mb-4">{t('exile_desc')}</p>
        <div className="text-[10px] text-zinc-700 font-mono">AUDIT ID: {generateAuditId(ts)}</div>
      </div>
    </div>
  );
};