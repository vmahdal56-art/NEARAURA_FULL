import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- INIT: METAL, WOOD, COTTON & TRUTH ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("\n>>> 🧬 SAINT DJANGO v256: DEEP DNA SCAN COMPLETE...");
console.log(">>> 🩸 INJECTING: GESTAPO, VONTOVÉ, BŮČEK, EGG HOUSE, ONE-SCREEN GATEWAY");
console.log(">>> 🔨 MODE: TOTAL PROPER GEEZER (NO BOLLOCKS)\n");

// =============================================================================
// 1. SHARED COMPONENTS (HELENKA FOOTER - ETERNAL MEMORY)
// =============================================================================
const HELENKA_FOOTER = `
      <div className="fixed bottom-0 left-0 w-full bg-black border-t-4 border-[#F97316] py-2 z-[200] text-center shadow-[0_0_50px_rgba(249,115,22,0.3)]">
         <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-8">
            <p className="text-[#22D3EE] font-black italic uppercase text-[10px] tracking-[0.3em] animate-pulse">
               V PAMÁTCE JARMILY A HELENKY — NEARAURA.COM — PRAVDA A LÁSKA VÍTĚZÍ (TRUTH WINS) — SADOVÁ 862
            </p>
         </div>
      </div>`;

// =============================================================================
// 2. GATEWAY PAGE (ONE SCREEN + BASS + SUBTITLES)
// =============================================================================
const gatewayPage = `import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- ANTHEM CONFIG (BASS & TRUTH) ---
const ANTHEMS = {
  left: { 
    id: 'JMHS9o8KIGU', title: 'TRUTH PREVAILS', 
    keywords: "TRUTH • METAL • WOOD • COTTON",
    subtitle: ">>> SIGNAL LOCKED: TRUTH PREVAILS... THE WORLD IS DIFFERENT THAN I THOUGHT BEFORE! TIME HOLDS NO POWER OVER US! NO LIE SHALL EVER BREAK IT! <<<"
  },
  right: { 
    id: 'vkKeB7Rh0r0', title: 'AT HEAVENS GATES', 
    keywords: "STETSON • OGAR • SILAGE • FREEDOM",
    subtitle: ">>> STETSON SIGNAL LOCKED... END OF LIES AND FARTS — REBIRTH OF TRUTH AND HEARTS! THE BOYS IN STETSONS HAVE AN EVERLASTING SMILE. <<<"
  },
  roots: {
    id: '9jK-NcRmVbg', title: 'THE FINAL COUNTDOWN', 
    keywords: "BÁNOV • NIVNICE • 1983 • FUTURE",
    subtitle: ">>> FINAL COUNTDOWN INITIATED... SADOVÁ 862 READY. WE'RE LEAVING TOGETHER! BUT STILL IT'S FAREWELL! IT'S THE FINAL COUNTDOWN! TA! TA! TA! <<<"
  }
};

const GatewayPage = () => {
  const navigate = useNavigate();
  const [activeAnthem, setActiveAnthem] = useState(null);
  const [entered, setEntered] = useState(false);

  const toggleAnthem = (key, e) => {
    e.stopPropagation();
    setActiveAnthem(activeAnthem === key ? null : key);
  }

  // --- AUDIO UNLOCK (BROWSER POLICY) ---
  if (!entered) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center cursor-pointer z-[9999]" onClick={() => setEntered(true)}>
        <div className="text-center animate-pulse border-4 border-emerald-600 p-10 bg-zinc-900/50 rounded-3xl shadow-[0_0_100px_rgba(16,185,129,0.4)]">
           <h1 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter mb-4 uppercase">Enter Aura</h1>
           <p className="text-emerald-500 font-mono text-sm tracking-[0.5em] uppercase">Click to Initialize Truth & Audio</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#050505] text-white flex flex-col font-sans overflow-hidden relative">
      
      <style>{\`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee-force { display: inline-block; white-space: nowrap; animation: marquee 30s linear infinite; }
        .bass-pulse { animation: pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      \`}</style>

      {/* --- HIDDEN AUDIO PLAYER (YOUTUBE EMBED) --- */}
      <div className="absolute top-0 left-0 w-0 h-0 opacity-0 pointer-events-none">
        {activeAnthem && <iframe width="1" height="1" src={\`https://www.youtube.com/embed/\${ANTHEMS[activeAnthem].id}?autoplay=1&mute=0&enablejsapi=1\`} allow="autoplay"></iframe>}
      </div>

      {/* --- ROW 1: HEADER & KEYWORDS --- */}
      <div className="w-full text-center pt-6 pb-4 bg-black z-20 border-b border-zinc-900 shrink-0 shadow-xl">
        <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter leading-none mb-2">
          <span className="text-[#ef4444]">END OF LIES</span>{' '}
          <span className="text-white mx-2">⚡</span>{' '}
          <span className="text-[#10b981]">REBIRTH OF TRUTH</span>
        </h1>
        {/* ROW 1: KEYWORDS */}
        <p className="text-[10px] md:text-xs text-[#F97316] font-black uppercase tracking-[0.8em] animate-pulse">
          {activeAnthem ? ANTHEMS[activeAnthem].keywords : "TRUTH • METAL • WOOD • COTTON • TA"}
        </p>
      </div>

      {/* --- ROW 2: LIVE RUNNING SUBTITLES --- */}
      <div className="w-full border-b-4 border-emerald-900/50 bg-zinc-900 py-3 overflow-hidden relative flex items-center shrink-0">
         <div className="absolute left-0 bg-black/90 z-10 px-4 h-full flex items-center border-r border-zinc-700">
            <span className={\`w-3 h-3 rounded-full mr-3 \${activeAnthem ? 'bg-red-600 animate-ping' : 'bg-zinc-600'}\`}></span>
            <span className="text-[10px] font-black tracking-widest text-white">LIVE FEED</span>
         </div>
         <div className="w-full overflow-hidden">
             <div className="animate-marquee-force text-xl md:text-2xl font-black italic text-zinc-300 uppercase tracking-widest pl-20">
                {activeAnthem ? ANTHEMS[activeAnthem].subtitle : "<<< SYSTEM READY <<< WAITING FOR INPUT <<< SELECT SECTOR BELOW <<< THE TRUTH IS WAITING <<<"}
             </div>
         </div>
      </div>

      {/* --- ROW 3: MAIN GRID (3 PILLARS - NO SCROLL) --- */}
      <div className="flex-1 w-full max-w-[1800px] mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-0 pb-20">
        
        {/* COL 1: ORCHARD */}
        <div className="h-full flex flex-col items-center justify-center text-center border-4 border-[#6ee7b7]/20 bg-zinc-900/40 hover:bg-[#6ee7b7]/10 hover:border-[#6ee7b7] transition-all cursor-pointer group relative overflow-hidden rounded-3xl" onClick={() => navigate('/orchard')}>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <h2 className="text-4xl md:text-6xl font-black text-[#6ee7b7] italic tracking-tighter mb-4 z-10 uppercase leading-none drop-shadow-lg group-hover:scale-105 transition-transform">
            THE<br/>ORCHARD
          </h2>
          <p className="text-zinc-400 font-bold tracking-widest text-xs uppercase mb-8">Nurture Your Soul</p>
          <button onClick={(e) => toggleAnthem('left', e)} className="z-10 text-[10px] font-bold px-6 py-3 border-2 border-[#6ee7b7] text-[#6ee7b7] hover:bg-[#6ee7b7] hover:text-black uppercase tracking-widest rounded-full transition-all">
             {activeAnthem === 'left' ? '■ SILENCE' : '▶ PLAY ANTHEM'}
          </button>
        </div>

        {/* COL 2: BE THE HELP */}
        <div className="h-full flex flex-col items-center justify-center text-center border-4 border-[#ea580c]/20 bg-zinc-900/40 hover:bg-[#ea580c]/10 hover:border-[#ea580c] transition-all cursor-pointer group relative overflow-hidden rounded-3xl" onClick={() => navigate('/help')}>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-10"></div>
          <h2 className="text-4xl md:text-6xl font-black text-[#ea580c] italic tracking-tighter mb-4 z-10 uppercase leading-none drop-shadow-lg group-hover:scale-105 transition-transform">
            BE THE<br/>HELP
          </h2>
          <p className="text-zinc-400 font-bold tracking-widest text-xs uppercase mb-8">Logistics • Doctors • Producers</p>
          <button onClick={(e) => toggleAnthem('right', e)} className="z-10 text-[10px] font-bold px-6 py-3 border-2 border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-black uppercase tracking-widest rounded-full transition-all">
             {activeAnthem === 'right' ? '■ SILENCE' : '▶ PLAY ANTHEM'}
          </button>
        </div>

        {/* COL 3: ROOTS */}
        <div className="h-full flex flex-col items-center justify-center text-center border-4 border-zinc-500/20 bg-zinc-900/40 hover:bg-zinc-500/10 hover:border-zinc-500 transition-all cursor-pointer group relative overflow-hidden rounded-3xl" onClick={() => navigate('/roots')}>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h2 className="text-4xl md:text-6xl font-black text-zinc-300 italic tracking-tighter mb-4 z-10 uppercase leading-none drop-shadow-lg group-hover:scale-105 transition-transform">
            ROOTS<br/>& DNA
          </h2>
          <p className="text-zinc-500 font-bold tracking-widest text-xs uppercase mb-8">Gestapo • Vontové • Bůček</p>
          <button onClick={(e) => toggleAnthem('roots', e)} className="z-10 text-[10px] font-bold px-6 py-3 border-2 border-zinc-500 text-zinc-300 hover:bg-zinc-500 hover:text-black uppercase tracking-widest rounded-full transition-all">
             {activeAnthem === 'roots' ? '■ SILENCE' : '▶ PLAY ANTHEM'}
          </button>
        </div>

      </div>

      ${HELENKA_FOOTER}
    </div>
  );
};
export default GatewayPage;`;

// =============================================================================
// 3. ROOTS PAGE (DNA + GESTAPO STORY + INDIEGOGO + TCP++)
// =============================================================================
const rootsPage = `import React from 'react';
import { useNavigate } from 'react-router-dom';

const RootsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center p-0 font-mono relative pb-32 overflow-y-auto scroll-smooth">
      
      {/* HERO HEADER */}
      <div className="w-full text-center py-16 bg-zinc-950 border-b border-zinc-900">
         <h1 className="text-5xl md:text-8xl font-black italic text-zinc-600 mb-4 tracking-tighter uppercase">
           ROOTS <span className="text-[#22D3EE]">&</span> DNA
         </h1>
         <p className="text-[#F97316] font-bold tracking-[0.5em] text-sm uppercase">THE TRUTH PROTOCOL V1.0</p>
      </div>

      <div className="max-w-6xl w-full px-6 space-y-20 z-10 flex flex-col items-center mt-12">
        
        {/* --- 1. GESTAPO & PRABABICKA (THE CORE STORY) --- */}
        <div className="bg-zinc-900 p-12 text-center border-l-8 border-red-600 w-full shadow-2xl relative">
            <div className="absolute top-4 right-4 text-red-600 opacity-20 text-9xl font-black">1942</div>
            <p className="text-zinc-400 text-lg italic uppercase font-bold mb-6">
               Už seděl v Mercedesu s Gestapákem. Odváželi ho pryč. Prababička vyběhla, chytila ho za límec a zařvala přímo do hlavně pušky:
            </p>
            <p className="text-6xl md:text-9xl font-[1000] text-white tracking-tighter uppercase leading-none mb-6 drop-shadow-2xl">
              "TEN JE NÁŠ!!!"
            </p>
            <p className="text-red-600 font-black tracking-[0.5em] text-xs uppercase animate-pulse">
               (HE IS OURS!!! - ABSOLUTE DEFIANCE)
            </p>
            <p className="mt-8 text-zinc-500 text-sm">To je DNA Aura Worldu. Nikdy se nevzdat. Nikdy neuhnout.</p>
        </div>

        {/* --- 2. DĚTSTVÍ: VONTOVÉ, MOTOKÁRA, STOH --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div className="border-4 border-yellow-600 p-8 bg-zinc-950">
                <h3 className="text-yellow-600 font-black mb-4 text-[12px] tracking-widest uppercase"> { ">>> VONTOVÉ & RYCHLÉ ŠÍPY" } </h3>
                <p className="text-xl italic font-black mb-4 leading-tight uppercase text-white">
                  "ULICE VE STÍNU. JEŽEK V KLECI. PŘÍSAHA NA DLAŽEBNÍ KOSTKU."
                </p>
                <p className="text-zinc-500 font-bold text-[10px] uppercase">
                  (THE SHADOW STREETS. THE PLEDGE OF HONOR.)
                </p>
            </div>
            <div className="border-4 border-blue-600 p-8 bg-zinc-950">
                <h3 className="text-blue-600 font-black mb-4 text-[12px] tracking-widest uppercase"> { ">>> MOTOKÁRA & STOHY" } </h3>
                <p className="text-xl italic font-black mb-4 leading-tight uppercase text-white">
                  "SKÁKÁNÍ ZE STOHU DO NEZNÁMA. MOTOKÁRA BEZ BRZD. ČISTÝ ADRENALIN BEZ DISPLEJE."
                </p>
                <p className="text-zinc-500 font-bold text-[10px] uppercase">
                  (HAYSTACK JUMPING. NO BRAKES. PURE REALITY.)
                </p>
            </div>
        </div>

        {/* --- 3. BÁNOV & NIVNICE DIALECT --- */}
        <div className="w-full border-4 border-emerald-900 bg-zinc-900 p-8">
            <h3 className="text-emerald-500 font-black mb-4 text-[12px] tracking-widest uppercase text-center"> { ">>> JAZYKOVÁ INTEGRITA (DIALECT)" } </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
               <div>
                  <p className="text-2xl italic font-black text-white uppercase">"ŠUA SEM ŠUA NAŠUA SEM KUS SKUA..."</p>
                  <p className="text-zinc-500 text-[10px] mt-2">NEBYUO TO SKUO, BYUA TO TIHUA, TOŽ SEM S TÝM ŠVIHUA.</p>
               </div>
               <div>
                  <p className="text-2xl italic font-black text-white uppercase">"VĚTROLAM & SILÁŽ"</p>
                  <p className="text-zinc-500 text-[10px] mt-2">ČUCHAL JSEM TY SMRADY ZE SILÁŽE. TO JE VŮNĚ DOMOVA.</p>
               </div>
            </div>
        </div>

        {/* --- 4. TCP++ NUTRITION PROTOCOL --- */}
        <div className="w-full border-4 border-[#F97316] bg-zinc-950 p-10 relative overflow-hidden rounded-xl shadow-[0_0_60px_rgba(249,115,22,0.2)]">
            <div className="absolute top-0 right-0 bg-[#F97316] text-black font-black px-4 py-1 text-xs uppercase tracking-widest">
                GEEZER FUEL
            </div>
            <h2 className="text-4xl md:text-6xl font-black italic text-white mb-8 uppercase tracking-tighter">
                TCP++ <span className="text-[#F97316]">NUTRITION</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-black p-6 border border-zinc-800">
                    <h3 className="text-2xl font-black text-[#F97316] uppercase mb-2">BŮČEK (PORK BELLY)</h3>
                    <p className="text-zinc-400 text-xs uppercase leading-relaxed">
                       THERMAL MASS. STRUCTURE. STABILITY. TÁTA MUSÍ BÝT PEVNÝ.
                    </p>
                </div>
                <div className="bg-black p-6 border border-zinc-800">
                    <h3 className="text-2xl font-black text-emerald-500 uppercase mb-2">ZELÍ (SAUERKRAUT)</h3>
                    <p className="text-zinc-400 text-xs uppercase leading-relaxed">
                       BIO-PROCESSOR. VITAMIN C. DETOX FROM LIES.
                    </p>
                </div>
                <div className="bg-black p-6 border border-zinc-800">
                    <h3 className="text-2xl font-black text-yellow-500 uppercase mb-2">CHLÉB (SOURDOUGH)</h3>
                    <p className="text-zinc-400 text-xs uppercase leading-relaxed">
                       FIRE & GRAIN. WOOD-FIRED CRUST. ENERGY FOR CRIMPING.
                    </p>
                </div>
            </div>
            <p className="text-center mt-8 text-zinc-500 text-sm font-bold uppercase tracking-widest">
               "KDO ŽERE MCDONALD, NENÍ TÁTA. PROPER GEEZER POTŘEBUJE TUK A VÁPNO."
            </p>
        </div>

        {/* --- 5. INDIEGOGO CAMPAIGN --- */}
        <div id="indiegogo" className="w-full border-4 border-[#22D3EE] bg-zinc-950 p-10 relative overflow-hidden rounded-xl">
            <div className="absolute top-0 left-0 bg-[#22D3EE] text-black font-black px-4 py-1 text-xs uppercase tracking-widest">
                BUILDING REALITY
            </div>
            <h2 className="text-4xl md:text-6xl font-black italic text-white mb-10 uppercase tracking-tighter text-center">
                AURA WORLD <span className="text-[#22D3EE]">CAMPAIGN</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                <div className="space-y-4">
                    <div className="text-5xl">🥚</div>
                    <h3 className="text-2xl font-black text-white uppercase">EGG HOUSE</h3>
                    <p className="text-[#22D3EE] font-bold text-xl">8,000,000 CZK</p>
                    <p className="text-zinc-400 text-xs uppercase">
                        PLANS FOR FREE. SUSTAINABLE SHELTER. CLAY & WOOD.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="text-5xl">📽️</div>
                    <h3 className="text-2xl font-black text-white uppercase">HŘEBEJK FILM</h3>
                    <p className="text-[#22D3EE] font-bold text-xl">AURA LEGACY</p>
                    <p className="text-zinc-400 text-xs uppercase">
                        70MM ANALOG RECORDING. CULTURE AS A WEAPON.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="text-5xl">🌳</div>
                    <h3 className="text-2xl font-black text-white uppercase">THE ORCHARD</h3>
                    <p className="text-[#22D3EE] font-bold text-xl">BE THE HELP</p>
                    <p className="text-zinc-400 text-xs uppercase">
                        SAD SVOBODY. JÍDLO PRO VŠECHNY.
                    </p>
                </div>
            </div>
            <div className="text-center mt-12">
               <button className="bg-[#22D3EE] text-black font-black text-xl py-4 px-12 uppercase hover:bg-white hover:scale-105 transition-all rounded-full shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                  SUPPORT THE CAMPAIGN (INDIEGOGO)
               </button>
            </div>
        </div>

        {/* --- 6. FUTURE: REVERSE GEAR --- */}
        <div className="w-full bg-zinc-900 p-12 border-t-8 border-purple-600 text-center">
             <h3 className="text-purple-500 font-black text-4xl uppercase mb-4 tracking-tighter">
                FUTURE: REVERSE GEAR
            </h3>
            <p className="text-white text-2xl font-bold uppercase tracking-widest mb-4">NO PLAST • NO CHEMS • NO NOISE</p>
            <p className="text-zinc-500 text-sm uppercase max-w-2xl mx-auto">
               ZPÁTKY KE KOŘENŮM. PŘÍRODA NEPOTŘEBUJE PLAST. MY NEPOTŘEBUJEME AI, MY POTŘEBUJEME ASI (AURA SI).
               VÁLKA PARTYZÁNŮ S HLÍNOU NIKDY NESKONČILA.
            </p>
        </div>

      </div>

      <div className="mt-20 mb-20 flex gap-4">
          <button onClick={() => navigate('/gateway')} className="border-2 border-zinc-800 px-10 py-4 text-xs font-black tracking-widest text-zinc-500 hover:text-white hover:border-white transition-all uppercase">
            ← BACK TO GATEWAY
          </button>
      </div>

      ${HELENKA_FOOTER}
    </div>
  );
};
export default RootsPage;`;

// =============================================================================
// 4. BE THE HELP PAGE (LOGIN MODULES & CHARTS)
// =============================================================================
const helpPage = `import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HelpPage = () => {
  const navigate = useNavigate();
  // SIMULATION: Live updating charts
  const [data, setData] = useState([30, 50, 40, 70, 20]);
  const [activeModal, setActiveModal] = useState(null); // 'doctor', 'transporter', 'producer'
  
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => prev.map(() => Math.floor(Math.random() * 80) + 10)); // Live random data
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const LoginModal = ({ type, onClose }) => (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
        <div className="bg-zinc-900 border-4 border-[#F97316] p-10 max-w-md w-full text-center relative rounded-2xl">
            <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white font-black">X</button>
            <h3 className="text-3xl font-black italic text-white uppercase mb-2">{type} LOGIN</h3>
            <p className="text-[#F97316] text-xs font-bold tracking-widest mb-8 uppercase">Aura World Secure Access</p>
            <input type="text" placeholder="AURA ID / EMAIL" className="w-full bg-black border border-zinc-700 p-4 text-white mb-4 font-mono text-sm focus:border-[#F97316] outline-none" />
            <input type="password" placeholder="PASSWORD" className="w-full bg-black border border-zinc-700 p-4 text-white mb-8 font-mono text-sm focus:border-[#F97316] outline-none" />
            <button className="w-full bg-[#F97316] text-black font-black py-4 uppercase hover:bg-white transition-all">AUTHENTICATE</button>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center p-6 font-mono relative overflow-y-auto pb-32">
      
      {activeModal && <LoginModal type={activeModal} onClose={() => setActiveModal(null)} />}

      <h1 className="text-5xl font-black italic text-orange-600 mb-12 mt-10 uppercase tracking-tighter">BE THE HELP DASHBOARD</h1>
      
      {/* --- LOGIN MODULES --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full mb-12">
          <div onClick={() => setActiveModal('VÝROBCE')} className="bg-zinc-900/50 border-2 border-zinc-700 hover:border-emerald-500 p-8 cursor-pointer group transition-all">
              <div className="text-4xl mb-4 grayscale group-hover:grayscale-0">🏭</div>
              <h3 className="font-black text-white text-xl uppercase group-hover:text-emerald-500">JSEM VÝROBCE</h3>
              <p className="text-xs text-zinc-500 mt-2 uppercase">Producers of Food & Material</p>
          </div>
          <div onClick={() => setActiveModal('DOPRAVCE')} className="bg-zinc-900/50 border-2 border-zinc-700 hover:border-blue-500 p-8 cursor-pointer group transition-all">
              <div className="text-4xl mb-4 grayscale group-hover:grayscale-0">🚚</div>
              <h3 className="font-black text-white text-xl uppercase group-hover:text-blue-500">JSEM DOPRAVCE</h3>
              <p className="text-xs text-zinc-500 mt-2 uppercase">Logistics & Transport</p>
          </div>
          <div onClick={() => setActiveModal('DOKTOR')} className="bg-zinc-900/50 border-2 border-zinc-700 hover:border-red-500 p-8 cursor-pointer group transition-all">
              <div className="text-4xl mb-4 grayscale group-hover:grayscale-0">⚕️</div>
              <h3 className="font-black text-white text-xl uppercase group-hover:text-red-500">JSEM DOKTOR</h3>
              <p className="text-xs text-zinc-500 mt-2 uppercase">Medical Assistance</p>
          </div>
      </div>

      {/* --- LIVE CHARTS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl w-full">
        <div className="p-8 border-2 border-orange-900/50 bg-zinc-950 shadow-2xl">
          <h3 className="font-black text-orange-500 mb-4 text-xs tracking-widest underline">LIVE PRODUCTION LEVELS</h3>
          <div className="h-32 w-full flex items-end gap-2 mb-4 border-b border-zinc-800 pb-1">
              {data.map((h, i) => (
                <div key={i} className="bg-orange-600 w-full transition-all duration-500 ease-in-out" style={{height: \`\${h}%\`}}></div>
              ))}
          </div>
          <p className="text-[9px] text-zinc-500 uppercase">Real-Time Data Stream from Factories</p>
        </div>

        <div className="p-8 border-2 border-emerald-900/50 bg-zinc-950 shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="font-black text-emerald-500 mb-4 text-xs tracking-widest underline">SWEDISH BUFFET STATUS</h3>
            <p className="text-4xl font-black text-white italic uppercase">OPEN / PLNO</p>
          </div>
          <div className="mt-4">
             <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[85%] animate-pulse"></div>
             </div>
             <p className="text-[9px] text-zinc-500 mt-2 uppercase text-right">Capacity: 85%</p>
          </div>
        </div>
      </div>

      <button onClick={() => navigate('/gateway')} className="mt-16 border-2 border-zinc-800 px-12 py-4 text-[10px] font-black tracking-widest text-zinc-600 hover:text-white uppercase transition-all">
        ← RETURN TO BASE
      </button>

      ${HELENKA_FOOTER}
    </div>
  );
};
export default HelpPage;`;

// =============================================================================
// 5. WRITE FILE SYSTEM
// =============================================================================
const files = { 
  'src/pages/GatewayPage.tsx': gatewayPage, 
  'src/pages/RootsPage.tsx': rootsPage, 
  'src/pages/HelpPage.tsx': helpPage 
};

Object.entries(files).forEach(([file, content]) => {
  const filePath = path.join(__dirname, file);
  try { 
    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content, 'utf8'); 
    console.log('✅ KRIMPED (UPDATED): ' + file); 
  } 
  catch (e) { 
    console.error('❌ DISKOMBOBULATED (ERROR): ' + file, e); 
  }
});

console.log("\n>>> SAINT DJANGO: MISSION COMPLETE.");
console.log(">>> SYSTEM STATUS: TRUTH INSTALLED. LIES REMOVED. TA!\n");