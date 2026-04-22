const fs = require('fs');
const path = require('path');

console.log("🛡️ NEARAURA GOD PROJECT: ZAHAJUJI BUFFER-PROOF EXEKUCI...");
console.log("⚠️  CÍL: 100% DNA (Web + Functions + Security Rules)");

// Pomocná funkce pro bezpečný zápis (vytvoří i složky)
function write(filePath, content) {
    const fullPath = path.join(process.cwd(), filePath);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fullPath, content.trim());
    console.log(`✅ Zapsáno: ${filePath}`);
}

// 1. ZÁLOHA (FAIL-SAFE)
const backupName = `web_backup_full_${Date.now()}`;
if (fs.existsSync('web')) {
    console.log(`📦 Vytvářím zálohu starého webu do: ${backupName}`);
    try { fs.cpSync('web', backupName, { recursive: true }); } catch (e) {}
}

// =============================================================================
// FÁZE 1: MOZEK (DNA CONFIGURATION)
// =============================================================================

// SYSTEM CONFIG (Barvy, Iniciály, Jarmila)
write('web/src/dna/SystemConfig.ts', `
export const SYSTEM_CONFIG = {
  ENTITY: "NEARAURA Ltd",
  MOTTO: "Truth and love must prevail over lies and hatred",
  LAUNCH_DATE: "2026-02-14",
  SIGNATURE: "🛡️🧬🦁🌅🚀🔥",
  GUARDIANS: ["JV", "JM", "PM", "LA", "PM", "LH", "YM", "VM"],
  JARMILA_SPLIT_RATIO: 0.10, // 10% Heart-Cut
  VAULT_LOCK_HOURS: 48,
  LEGACY: { TIMEOUT_DAYS: 90, CONTACTS: ["pmahdal@gmail.com", "alimilamia@yahoo.fr"] },
  THEME: {
    VOID_BLACK: "#060709", ROYAL_CYAN: "#22D3EE", SOVEREIGN_GOLD: "#D4AF37",
    WHITE_AURA: "#FFFFFF", PINK_FLUID: "#F472B6"
  }
};
`);

// ORCHARD CONFIG (12 Ovocí - Hendy 963Hz, Youth 111Hz)
write('web/src/dna/OrchardConfig.ts', `
export const ORCHARD_DATA = [
  { id: 'hendy', name: 'Hendy', hz: 963, color: '#D4AF37', icon: '👑', desc: 'Highest Integrity', realm: ['ADULT'] },
  { id: 'pineapple', name: 'Pineapple', hz: 432, color: '#FBBF24', icon: '🍍', desc: 'Serious Intent', realm: ['ADULT', 'YOUTH'] },
  { id: 'pear', name: 'Pear', hz: 528, color: '#10B981', icon: '🍐', desc: 'Family/Married', realm: ['ADULT'] },
  { id: 'mango', name: 'Mango', hz: 639, color: '#F472B6', icon: '🥭', desc: 'Fluid Gateway', realm: ['FLUID'] },
  { id: 'banana', name: 'Banana', hz: 417, color: '#FB923C', icon: '🍌', desc: 'Intimacy M', realm: ['ADULT', 'FLUID'] },
  { id: 'peach', name: 'Peach', hz: 417, color: '#FDA4AF', icon: '🍑', desc: 'Intimacy F', realm: ['ADULT', 'FLUID'] },
  { id: 'orange', name: 'Orange', hz: 396, color: '#F97316', icon: '🍊', desc: 'Friendship', realm: ['ALL'] },
  { id: 'grape', name: 'Grape', hz: 741, color: '#6366F1', icon: '🍇', desc: 'Work/Group', realm: ['ALL'] },
  { id: 'coconut', name: 'Coconut', hz: 174, color: '#E5E5E5', icon: '🥥', desc: 'Help/Service', realm: ['ALL'] },
  { id: 'melon', name: 'Melon', hz: 528, color: '#EF4444', icon: '🍉', desc: 'Hobby/Sport', realm: ['ALL'] },
  { id: 'cherry', name: 'Cherry', hz: 852, color: '#BE123C', icon: '🍒', desc: 'Meet Now', realm: ['ADULT', 'FLUID'] },
  { id: 'youth', name: 'Youth', hz: 111, color: '#FFFFFF', icon: '👶', desc: 'Kids Aura (0-15)', realm: ['YOUTH'] }
];
export const REALMS = {
  YOUTH: { id: 'YOUTH', color: '#FFFFFF', label: 'YOUTH REALM' },
  ADULT: { id: 'ADULT', color: '#22D3EE', label: 'SOVEREIGN REALM' },
  FLUID: { id: 'FLUID', color: '#F472B6', label: 'FLUID REALM' }
};
`);

// TAILWIND CONFIG (Void Black)
write('web/tailwind.config.js', `
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { void: "#060709", cyan: { DEFAULT: "#22D3EE", dim: "rgba(34, 211, 238, 0.1)" }, sovereign: "#D4AF37" },
      fontFamily: { sans: ['"Space Grotesk"', 'sans-serif'] },
      animation: { 'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }
    },
  },
  plugins: [],
}
`);

// =============================================================================
// FÁZE 2: SRDCE (KOMPONENTY & AUDIO)
// =============================================================================

// USE SOLFEGGIO (Audio Engine)
write('web/src/hooks/useSolfeggio.ts', `
import { useCallback } from 'react';
export const useSolfeggio = () => {
  const playTone = useCallback((hz, duration = 2) => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine'; osc.frequency.setValueAtTime(hz, ctx.currentTime);
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.1, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + duration);
  }, []);
  return { playTone };
};
`);

// MANIFESTO (Global English)
write('web/src/components/sovereign/Manifesto.tsx', `
import React from 'react';
import { SYSTEM_CONFIG } from '../../dna/SystemConfig';
export const Manifesto = () => (
  <div className="prose prose-invert max-w-2xl mx-auto text-center p-8 border border-white/10 rounded-3xl bg-black/50 backdrop-blur-xl">
    <h2 className="text-3xl font-black text-cyan-400 mb-6 uppercase tracking-widest">Sovereign Manifesto</h2>
    <p className="text-lg leading-relaxed mb-6 font-light">You are entering a space where <strong>Truth</strong> is currency.</p>
    <div className="my-8 p-6 border-l-2 border-sovereign bg-white/5 text-left italic">"{SYSTEM_CONFIG.MOTTO}"</div>
    <p className="text-sm opacity-60 uppercase tracking-widest mt-8">Signed: {SYSTEM_CONFIG.ENTITY}</p>
  </div>
);
`);

// MATRIX PRICING (Global Currency)
write('web/src/components/features/MatrixPricing.tsx', `
import React from 'react';
import { Shield, Zap, Globe } from 'lucide-react';
export const MatrixPricing = () => (
  <div className="w-full max-w-5xl mx-auto py-12 px-4">
    <h2 className="text-3xl font-black text-center text-white mb-12 uppercase tracking-widest">Sovereign Matrix</h2>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="border border-white/10 rounded-3xl p-8 bg-black/40"><h3 className="text-xl font-bold text-gray-400">VISITOR</h3><div className="text-4xl font-black mt-4 mb-6">0 GBP</div></div>
      <div className="border-2 border-cyan-400 rounded-3xl p-8 bg-cyan-900/10 transform scale-105 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
        <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2"><Shield size={20}/> SOVEREIGN</h3>
        <div className="text-4xl font-black mt-4 mb-6 text-white">60 <span className="text-sm text-cyan-400">GBP</span></div>
        <ul className="space-y-4 text-sm text-gray-300 mb-8 font-mono"><li>40x Boost</li><li>Global Radar</li><li>NNN Vault</li></ul>
        <button className="w-full py-4 bg-cyan-400 text-black font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all">Activate DNA</button>
        <p className="text-[9px] text-center mt-4 opacity-50">10% allocated to Jarmila Fund</p>
      </div>
      <div className="border border-white/10 rounded-3xl p-8 bg-black/40"><h3 className="text-xl font-bold text-sovereign">LEGACY</h3><div className="text-4xl font-black mt-4 mb-6">1000 GBP</div></div>
    </div>
  </div>
);
`);

// SOUL RADAR
write('web/src/components/features/SoulRadar.tsx', `
import React from 'react';
import { Scan } from 'lucide-react';
export const SoulRadar = () => (
  <div className="w-full max-w-2xl mx-auto my-20 p-8 border border-cyan-400/30 rounded-full aspect-square relative flex items-center justify-center bg-cyan-900/5 overflow-hidden">
    <div className="absolute inset-0 border-4 border-cyan-400/10 rounded-full animate-ping opacity-20"></div>
    <div className="text-center z-10"><Scan size={48} className="mx-auto text-cyan-400 mb-4 animate-pulse" /><h3 className="text-2xl font-black uppercase tracking-widest text-white">Soul Radar</h3><p className="text-xs text-cyan-400/60 font-mono mt-2">SCANNING FREQUENCIES...</p></div>
  </div>
);
`);

// =============================================================================
// FÁZE 3: TĚLO (APP.TSX)
// =============================================================================

write('web/src/App.tsx', `
import React, { useState, useEffect, useRef } from 'react';
import { SYSTEM_CONFIG } from './dna/SystemConfig';
import { ORCHARD_DATA, REALMS } from './dna/OrchardConfig';
import { useSolfeggio } from './hooks/useSolfeggio';
import { Shield, Lock, Fingerprint } from 'lucide-react';
import { Manifesto } from './components/sovereign/Manifesto';
import { MatrixPricing } from './components/features/MatrixPricing';
import { SoulRadar } from './components/features/SoulRadar';

export default function App() {
  const [realm, setRealm] = useState(REALMS.ADULT);
  const [locked, setLocked] = useState(true);
  const { playTone } = useSolfeggio();
  const pressTimer = useRef(null);

  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    document.body.style.touchAction = 'pan-y';
    document.body.style.backgroundColor = SYSTEM_CONFIG.THEME.VOID_BLACK;
  }, []);

  const handleTouchStart = () => {
    pressTimer.current = setTimeout(() => {
      if (navigator.vibrate) navigator.vibrate([50, 50, 50]); 
      playTone(963, 3);
      setLocked(false);
    }, 3000);
  };
  const handleTouchEnd = () => { if (pressTimer.current) clearTimeout(pressTimer.current); };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-cyan-400 selection:text-black flex flex-col" style={{ backgroundColor: SYSTEM_CONFIG.THEME.VOID_BLACK }}>
      <nav className="p-6 border-b border-white/10 flex justify-between items-center backdrop-blur-md sticky top-0 z-50 bg-black/80">
        <div className="flex items-center gap-3 select-none" onMouseDown={handleTouchStart} onMouseUp={handleTouchEnd} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <Shield style={{ color: SYSTEM_CONFIG.THEME.ROYAL_CYAN }} className="animate-pulse" size={32} />
          <div className="flex flex-col"><h1 className="text-2xl font-black tracking-tighter uppercase leading-none text-white">{SYSTEM_CONFIG.ENTITY}</h1><span style={{ color: SYSTEM_CONFIG.THEME.ROYAL_CYAN }} className="text-[10px] tracking-[0.4em] font-bold">SOVEREIGN</span></div>
        </div>
        <div className="flex items-center gap-2 opacity-50" style={{ color: SYSTEM_CONFIG.THEME.ROYAL_CYAN }}><Lock size={16} /><span className="text-xs font-mono">48H LOCK</span></div>
      </nav>

      <main className="flex-grow flex flex-col items-center pt-12 px-6 pb-24 relative w-full max-w-7xl mx-auto">
        {locked ? (
          <div className="w-full max-w-2xl animate-fade-in space-y-12 mt-12">
            <div className="text-center space-y-4 select-none cursor-pointer" onMouseDown={handleTouchStart} onMouseUp={handleTouchEnd} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
               <Fingerprint size={80} style={{ color: SYSTEM_CONFIG.THEME.ROYAL_CYAN }} className="mx-auto opacity-80 animate-pulse" />
               <p className="text-xs text-cyan-400 font-mono tracking-widest">HOLD 3S TO UNLOCK VAULT</p>
            </div>
            <Manifesto />
          </div>
        ) : (
          <div className="w-full space-y-32 animate-fade-in">
            <section>
              <header className="mb-12 text-center w-full">
                 <div className="flex justify-center gap-4 mb-8">
                   {Object.values(REALMS).map(r => (
                     <button key={r.id} onClick={() => setRealm(r)} className={\`px-4 py-2 rounded-full text-[10px] font-bold border transition-all\`} style={{ borderColor: realm.id === r.id ? r.color : 'rgba(255,255,255,0.1)', color: realm.id === r.id ? r.color : '#666', backgroundColor: realm.id === r.id ? \`\${r.color}11\` : 'transparent' }}>{r.label}</button>
                   ))}
                 </div>
                 <h1 className="text-5xl md:text-7xl font-black italic uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">{realm.id} MISSION</h1>
              </header>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {ORCHARD_DATA.filter(f => f.realm.includes('ALL') || f.realm.includes(realm.id)).map((fruit) => (
                  <div key={fruit.id} onClick={() => playTone(fruit.hz)} className="group relative p-6 rounded-3xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden" style={{ borderColor: \`\${fruit.color}33\` }}>
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{fruit.icon}</div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-white group-hover:text-cyan-400">{fruit.name}</h3>
                    <div className="flex justify-between items-end mt-2"><span className="text-[10px] font-mono text-gray-400" style={{ color: fruit.color }}>{fruit.hz}Hz</span></div>
                  </div>
                ))}
              </div>
            </section>
            <section className="border-t border-white/5 pt-20"><SoulRadar /></section>
            <section className="border-t border-white/5 pt-20"><MatrixPricing /></section>
          </div>
        )}
      </main>

      <footer className="py-12 border-t border-white/5 text-center" style={{ backgroundColor: SYSTEM_CONFIG.THEME.VOID_BLACK }}>
        <div className="text-4xl mb-6 opacity-80 hover:opacity-100 transition-opacity cursor-default tracking-[1em]">{SYSTEM_CONFIG.SIGNATURE}</div>
        <div className="space-y-4">
          <p className="text-[10px] tracking-[0.5em] uppercase font-bold opacity-60" style={{ color: SYSTEM_CONFIG.THEME.ROYAL_CYAN }}>{SYSTEM_CONFIG.GUARDIANS.join("  ")}</p>
          <div className="pt-4 opacity-30 hover:opacity-100 transition-opacity"><span className="text-[9px] uppercase border border-white/20 px-3 py-1 rounded-full">🏛️ School for Jarmila</span></div>
        </div>
      </footer>
    </div>
  );
}
`);

// =============================================================================
// FÁZE 4: DUŠE (BACKEND, RULES & INFRASTRUCTURE)
// =============================================================================

// CLOUD FUNCTIONS
write('functions/index.js', \`
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(functions.config().stripe.secret);
admin.initializeApp();
const db = admin.firestore();

exports.handleStripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try { event = stripe.webhooks.constructEvent(req.rawBody, sig, functions.config().stripe.endpoint_secret); } catch (err) { return res.status(400).send(err.message); }
  if (event.type === 'payment_intent.succeeded') {
    const amount = event.data.object.amount;
    const jarmilaAmount = Math.floor(amount * 0.10);
    await db.collection('jarmila_fund_ledger').add({ amount: jarmilaAmount, timestamp: admin.firestore.FieldValue.serverTimestamp(), note: "Heart-Cut Secured" });
  }
  res.json({received: true});
});

exports.lockVaultIntent = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'NNN Secured');
  const uid = context.auth.uid;
  const userDoc = await db.collection('users').doc(uid).get();
  if (userDoc.exists && userDoc.data().lockTimestamp) {
    if ((Date.now() - userDoc.data().lockTimestamp.toDate()) / 36e5 < 48) throw new functions.https.HttpsError('failed-precondition', '48H Rule Active');
  }
  await db.collection('users').doc(uid).set({ intent: data.intent, lockTimestamp: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
  return { success: true };
});
\`);

// FIRESTORE RULES
write('firestore.rules', \`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() { return request.auth != null; }
    function isOwner(uid) { return request.auth.uid == uid; }
    match /users/{userId} {
      allow read: if true;
      allow create: if isAuthenticated();
      allow update: if isOwner(userId) && (!request.resource.data.diff(resource.data).affectedKeys().hasAny(['soulScore', 'lockTimestamp']));
    }
    match /jarmila_fund_ledger/{docId} { allow read: if true; allow write: if false; }
  }
}
\`);

// PWA MANIFEST
write('web/public/manifest.json', \`
{
  "name": "NEARAURA Sovereign Vault", "short_name": "NearAura", "start_url": "/", "display": "standalone", "background_color": "#060709", "theme_color": "#060709",
  "icons": [{ "src": "favicon.ico", "sizes": "64x64", "type": "image/x-icon" }]
}
\`);

// HWID MODULE
write('web/src/utils/hwid.ts', \`
import FingerprintJS from '@fingerprintjs/fingerprintjs';
export const getSovereignFingerprint = async (): Promise<string> => {
  try { const fp = await FingerprintJS.load(); const result = await fp.get(); return result.visitorId; } catch (e) { return "UNKNOWN"; }
};
\`);

console.log("================================================================");
console.log("🛡️ GENESIS COMPLETE. 100% DNA WRITTEN.");
console.log("   Všechny soubory byly vytvořeny lokálně.");
console.log("   Nyní spusťte: cd web && npm install && npm run dev");
console.log("================================================================");