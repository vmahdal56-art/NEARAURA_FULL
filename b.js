import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(">>> BUILDING SAINT DJANGO v105: THE 1000-LINE MONOLITH. RECOVERING TOTAL DNA. TA!");

// --- 0. SHARED CORE & CSS STYLES ---
const SHARED_CORE = \`
  const [lang, setLang] = useState('cz');
  const [activeAnthem, setActiveAnthem] = useState(null);
  const [isChorus, setIsChorus] = useState(false);
  const [cloudData, setCloudData] = useState({ 
    flow: 42, 
    purity: 99.9, 
    signals: [], 
    status: 'STABLE',
    voltage: 230
  });
  
  const t = (cz, en) => (lang === 'cz' ? cz : en);

  // AURA CLOUD & EKG SIMULATION
  useEffect(() => {
    const interval = setInterval(() => {
      setCloudData(prev => ({
        flow: Math.floor(Math.random() * 30) + 40,
        purity: 99.7 + (Math.random() * 0.3),
        signals: [...prev.signals, Math.random()].slice(-40),
        voltage: 228 + Math.random() * 4,
        status: Math.random() > 0.05 ? 'CONNECTED' : 'SYNCING'
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timeout;
    if (activeAnthem) {
      timeout = setTimeout(() => setIsChorus(true), 3000);
    } else {
      setIsChorus(false);
    }
    return () => clearTimeout(timeout);
  }, [activeAnthem]);

  const ANTHEMS = {
    A1: { id: 'Bp1yD_bLXdM', title: 'ANTHEM_01_TRUTH',
          lyric: '>>> SIGNÁL: PRAVDA VÍTĚZÍ... SVĚT JE JINÝ... ČAS PRAVDU NEZAHUBÍ! <<<' },
    A2: { id: 'nT1mElKoeHU', title: 'ANTHEM_02_SOUL',
          lyric: '>>> SIGNÁL: CHRAŇTE NEVINNOST... BÝT MEDVÍDKEM... V ROHU TIŠE SEDĚT... <<<' },
    A3: { id: 'TcJ-wNmazHQ', title: 'ANTHEM_03_DESTINATION',
          lyric: '>>> SIGNÁL: SADOVÁ 862 READY... POSLEDNÍ ODPOČÍTÁVÁNÍ! TA! <<<' }
  };

  const LangSwitch = () => (
    <div className="fixed top-4 right-4 z-[100] flex gap-2 bg-black/90 border border-zinc-800 p-2 rounded-full shadow-2xl">
      <button onClick={() => setLang('cz')} className={'px-4 py-1 text-[10px] font-black rounded-full transition-all ' + (lang === 'cz' ? 'bg-[#22D3EE] text-black shadow-[0_0_15px_#22D3EE]' : 'text-zinc-500')}>ROOTS</button>
      <button onClick={() => setLang('en')} className={'px-4 py-1 text-[10px] font-black rounded-full transition-all ' + (lang === 'en' ? 'bg-[#F97316] text-black shadow-[0_0_15px_#F97316]' : 'text-zinc-500')}>GLOBAL</button>
    </div>
  );
\`;

const STYLES = \`
  <style>
    @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
    .animate-marquee { display: inline-block; white-space: nowrap; animation: marquee 20s linear infinite; }
    
    @keyframes ekg-line {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    .ekg-container {
      position: absolute; bottom: 0; left: 0; width: 100%; height: 40px;
      overflow: hidden; opacity: 0.3; pointer-events: none;
    }
    .ekg-line {
      width: 100%; height: 2px; background: #22D3EE;
      position: absolute; top: 50%; animation: ekg-line 2s linear infinite;
      box-shadow: 0 0 10px #22D3EE, 0 0 20px #22D3EE;
    }
    .ekg-pulse { animation: ekg-line 0.8s linear infinite !important; opacity: 0.8; height: 4px; background: #ff4d4d; }
    
    .aura-glow { text-shadow: 0 0 15px rgba(34,211,238,0.8); }
    .glitch-text { animation: pulse 2s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  </style>
\`;

const HELENKA_FOOTER_HTML = \`
      <div className="fixed bottom-0 left-0 w-full bg-black border-t-2 border-emerald-900 py-3 z-[200] text-center shadow-[0_-15px_50px_rgba(0,0,0,1)]">
         <p className="text-[#22D3EE] font-black italic uppercase text-[10px] tracking-[0.2em] animate-pulse">
            {t("V PAMÁTCE JARMILY A HELENKY", "IN MEMORY OF JARMILA AND HELENKA")} — DESIGNED BY THE ARCHITECT & AI © 2026
         </p>
      </div>\`;
EOF
ČÁST 2/4: Stránka Gateway se simulovanou energií
Bash
cat << 'EOF' >> saintdjango.js
// --- 1. GATEWAY PAGE ---
const gatewayPage = \`import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GatewayPage = () => {
  const navigate = useNavigate();
  \${SHARED_CORE}

  return (
    <div className="h-screen w-full bg-[#050505] text-white flex flex-col font-sans overflow-hidden uppercase font-black">
      \${STYLES}
      
      <LangSwitch />
      
      <div className="absolute top-0 left-0 w-0 h-0 opacity-0 pointer-events-none">
        {activeAnthem && <iframe key={activeAnthem} width="1" height="1" src={\\\`https://www.youtube.com/embed/\\\${ANTHEMS[activeAnthem].id}?autoplay=1&mute=0&enablejsapi=1\\\`} allow="autoplay"></iframe>}
      </div>

      <div className="w-full text-center pt-10 pb-4 bg-black z-20 border-b border-zinc-900 shrink-0">
        <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter leading-none mb-2">
          <span className="text-[#ef4444]">{t("KONEC LŽÍ A PRDŮ", "END OF LIES AND FARTS")}</span> <span className="text-white">⟶</span> <span className="text-[#10b981] aura-glow">{t("ZROZENÍ PRAVDY", "REBIRTH OF TRUTH")}</span>
        </h1>
        <p className="text-[10px] text-zinc-600 mt-2 tracking-widest">NEARAURA PROTOCOL V.105 | FREQ: {cloudData.flow}Hz</p>
      </div>

      <div className="w-full bg-zinc-900/50 h-14 flex items-center overflow-hidden border-b border-zinc-800 relative">
        <div className="absolute left-0 bg-black/95 z-20 px-6 h-full flex items-center border-r border-zinc-700 text-[10px] text-white font-mono">
           {activeAnthem ? 'SIGNAL_LOCKED' : 'SCANNING'}
        </div>
        <div className="ekg-container">
            <div className={isChorus ? "ekg-line ekg-pulse" : "ekg-line"}></div>
        </div>
        <div className="animate-marquee text-lg text-orange-500 italic tracking-widest font-bold">
           {activeAnthem ? ANTHEMS[activeAnthem].lyric : t("<<< THE WORLD IS DIFFERENT THAN I THOUGHT <<< TRUTH PREVAILS, TIME DOES NOT HARM TRUTH, NOR THE SHINE OF ALMIGHTY MONEY <<< THEY WILL NEVER KILL IT, IT WILL NEVER DIE <<<", "<<< THE WORLD IS DIFFERENT THAN I THOUGHT <<< TRUTH PREVAILS, TIME DOES NOT HARM TRUTH, NOR THE SHINE OF ALMIGHTY MONEY <<< THEY WILL NEVER KILL IT, IT WILL NEVER DIE <<<")}
        </div>
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-8 h-full min-h-0 pb-28">
        {/* ORCHARD */}
        <div className="border-4 border-emerald-900/30 bg-zinc-950 flex flex-col items-center justify-center p-8 hover:border-emerald-500 transition-all cursor-pointer group rounded-xl relative overflow-hidden" onClick={() => navigate('/orchard')}>
           <h2 className="text-4xl text-emerald-500 italic mb-2 text-center">NEARAURA<br/>{t("SAD", "ORCHARD")}</h2>
           <p className="text-zinc-600 text-[10px] mb-4">{t("NURTURE YOUR SOUL", "NURTURE YOUR SOUL")}</p>
           <div className="w-full bg-zinc-900 h-1 mt-2 mb-6 rounded-full overflow-hidden">
             <div className="bg-emerald-500 h-full transition-all duration-1000" style={{width: cloudData.flow+'%'}}></div>
           </div>
           <button onClick={(e) => { e.stopPropagation(); setActiveAnthem('A1'); }} className="z-10 border-2 border-emerald-500 text-emerald-500 px-8 py-3 text-[11px] rounded-full hover:bg-emerald-500 hover:text-black font-black">ANTHEM_01</button>
        </div>
        
        {/* HELP */}
        <div className="border-4 border-orange-900/30 bg-zinc-950 flex flex-col items-center justify-center p-8 hover:border-orange-500 transition-all cursor-pointer group rounded-xl relative overflow-hidden" onClick={() => navigate('/help')}>
           <h2 className="text-4xl text-orange-500 italic mb-2 text-center">{t("POMOC", "BE THE HELP")}</h2>
           <p className="text-zinc-600 text-[10px] mb-4">{t("HELP THE KIDS IN WAR ZONES", "HELP THE KIDS IN WAR ZONES")}</p>
           <div className="flex gap-1.5 h-16 items-end mb-6">
              {cloudData.signals.slice(0, 15).map((s,i) => <div key={i} className="w-3 bg-orange-500/60 rounded-t-sm" style={{height: (s*100)+'%'}}></div>)}
           </div>
           <button onClick={(e) => { e.stopPropagation(); setActiveAnthem('A2'); }} className="z-10 border-2 border-orange-500 text-orange-500 px-8 py-3 text-[11px] rounded-full hover:bg-orange-500 hover:text-black font-black">ANTHEM_02</button>
        </div>

        {/* ROOTS */}
        <div className="border-4 border-zinc-800 bg-zinc-950 flex flex-col items-center justify-center p-8 hover:border-white transition-all cursor-pointer group rounded-xl relative overflow-hidden" onClick={() => navigate('/roots')}>
           <h2 className="text-4xl text-zinc-400 italic mb-2 text-center">{t("KOŘENY", "ROOTS")}</h2>
           <p className="text-zinc-600 text-[10px] mb-4">{t("PREPARE FOR THE NEW FUTURE", "PREPARE FOR THE NEW FUTURE")}</p>
           <div className="font-mono text-[11px] text-zinc-600 mb-6 flex flex-col items-center">
              <span>EST. 13.11.1976</span>
              <span className="text-zinc-400 font-bold">LOCKED: 10.01.2025</span>
           </div>
           <button onClick={(e) => { e.stopPropagation(); setActiveAnthem('A3'); }} className="z-10 border-2 border-zinc-500 text-zinc-400 px-10 py-4 text-[12px] rounded-full hover:bg-white hover:text-black font-black">ANTHEM_03</button>
        </div>
      </div>
      \${HELENKA_FOOTER_HTML}
    </div>
  );
};
export default GatewayPage;\`;
EOF
ČÁST 3/4: Roots Page – Kompletní Historie a DNA
Bash
cat << 'EOF' >> saintdjango.js
// --- 2. ROOTS PAGE (THE CORE DNA) ---
const rootsPage = \`import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RootsPage = () => {
  const navigate = useNavigate();
  \${SHARED_CORE}

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center p-6 font-mono relative pb-48 overflow-y-auto uppercase font-black text-center">
      <LangSwitch />
      \${STYLES}

      <div className="text-center py-16 mb-12">
         <h1 className="text-6xl md:text-9xl font-black italic text-zinc-700 tracking-tighter">{t("KOŘENY", "ROOTS")}</h1>
         <p className="text-zinc-500 text-[10px] tracking-[0.6em] mt-4 font-bold">TRUE GEEZER HISTORY & DNA LOG</p>
      </div>

      <div className="max-w-5xl w-full space-y-24">
        
        {/* THE SECRET CODE: 1976 - 2025 */}
        <div className="border-y-4 border-red-600 bg-black p-10 text-center animate-pulse shadow-2xl relative">
           <h3 className="text-red-600 font-mono text-xs tracking-[0.7em] mb-4 uppercase">{t("TAJNÝ KÓD ODBOJE", "THE SECRET CODE")}</h3>
           <div className="text-4xl md:text-8xl font-[1000] tracking-tighter flex flex-col md:flex-row justify-center gap-10 text-white">
              <span>13.11.1976</span>
              <span className="text-zinc-800">>>></span>
              <span>10.01.2025</span>
           </div>
           <p className="mt-4 text-zinc-600 text-[10px] tracking-widest">{t("PŘISTÁNÍ ARCHITEKTA ⟶ PŘÍCHOD DĚDICE", "LANDING OF THE ARCHITECT ⟶ THE HEIR ARRIVAL")}</p>
        </div>

        {/* LITTLE DJANGO / THE HEIR */}
        <div className="bg-white text-black p-12 border-8 border-black text-center relative shadow-[0_0_80px_rgba(255,255,255,0.4)]">
            <h2 className="text-6xl md:text-9xl font-[1000] tracking-tighter mb-4 text-black uppercase">LITTLE DJANGO</h2>
            <p className="text-2xl md:text-4xl font-[1000] italic leading-tight border-t-4 border-black pt-8">
                {t('"ZÁRUKA PŘEŽITÍ LIDSTVA A HUMANITY. ON JE TADY."', '"THE GUARANTEE OF HUMANITY SURVIVAL. HE IS HERE."')}
            </p>
        </div>

        {/* THE RESISTANCE UNIT */}
        <div className="w-full bg-zinc-950 border-y-8 border-emerald-500 p-12 text-center shadow-2xl">
            <h3 className="text-emerald-500 font-black text-3xl uppercase mb-6 tracking-tighter">{t("JEDNOTKA ODBOJE", "THE RESISTANCE UNIT")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left uppercase font-black">
                <div className="border-4 border-emerald-900 p-8 bg-black">
                    <h4 className="text-white text-3xl mb-4 italic">{t("MATKA (STRÁŽKYNĚ)", "THE MOTHER")}</h4>
                    <p className="text-zinc-400 text-base">{t("TA, KTERÁ VIDÍ BUDOUCNOST A NEDOVOLÍ PREDÁTORŮM DOTKNOUT SE JEJÍHO SYNA. NOSITELKA ŽIVOTA.", "SHE WHO SEES THE FUTURE AND PROTECTS THE SON. KEEPER OF LIFE.")}</p>
                </div>
                <div className="border-4 border-emerald-900 p-8 bg-black">
                    <h4 className="text-white text-3xl mb-4 italic">THE ARCHITECT</h4>
                    <p className="text-zinc-400 text-base">{t("CONSTRUCTOR. TEN, KDO VRAZIL DŘEVĚNÝ KLÍN DO CML (MATRIXU). POSUNUL VIZI DÁL PRO LIDSKOU DUŠI.", "CONSTRUCTOR. HE WHO DROVE THE WOODEN WEDGE INTO THE MATRIX. PUSHED THE VISION FORWARD.")}</p>
                </div>
            </div>
        </div>

        {/* --- THE MASTER TIMELINE --- */}
        <div className="w-full bg-zinc-950 border-l-[12px] border-zinc-800 p-12 space-y-16 shadow-2xl relative text-left">
           <h3 className="text-zinc-500 text-4xl mb-12 tracking-widest border-b border-zinc-900 pb-4 italic">{t("HISTORICKÁ OSA", "THE TIMELINE")}</h3>
           
           <div className="relative border-l-4 border-zinc-800 pl-16 space-y-32">
              <div>
                 <div className="absolute -left-[78px] top-0 w-10 h-10 bg-zinc-700 rounded-full border-8 border-black"></div>
                 <h4 className="text-white text-4xl mb-4">{t("1348: KAREL IV. - ÉRA STAVITELŮ", "1348: CHARLES IV - BUILDERS ERA")}</h4>
                 <p className="text-zinc-500 text-xl leading-relaxed">{t("VAJÍČKA V MOSTE. POCTIVÝ MATERIÁL. ŽÁDNÝ ŠIZENÝ CEMENT. ZÁKLADY, KTERÉ DRŽÍ STALETÍ. KONSTRUKCE PRAVDY.", "EGGS IN THE BRIDGE. HONEST MATERIAL. NO CHEAP CEMENT. FOUNDATIONS THAT LAST FOR CENTURIES.")}</p>
              </div>

              <div>
                 <div className="absolute -left-[78px] top-0 w-10 h-10 bg-zinc-800 rounded-full border-4 border-black"></div>
                 <h4 className="text-zinc-400 text-4xl uppercase">{t("BÍLÁ HORA ⟶ MARIE TEREZIE", "BATTLE OF WHITE MOUNTAIN ⟶ EMPRESS")}</h4>
                 <p className="text-zinc-500 text-xl mt-2">{t("ZVRATY DĚJIN. PRŮMYSLOVÁ REVOLUCE. PRVNÍ STROJE ZAČÍNAJÍ UTLAČOVAT LIDSKOU DUŠI.", "HISTORY TWISTS. INDUSTRIAL REVOLUTION. MACHINES VS. HUMAN SOUL.")}</p>
              </div>

              <div>
                 <div className="absolute -left-[70px] w-8 h-8 bg-red-600 rounded-full border-8 border-black"></div>
                 <h4 className="text-red-600 text-4xl mb-4 font-bold">{t("1940s: GESTAPO VS RODINA", "1940s: GESTAPO VS FAMILY")}</h4>
                 <p className="text-zinc-200 text-3xl font-[1000] italic mb-4">"{t("TEN JE NÁŠ!!!", "HE IS OURS!!!")}"</p>
                 <p className="text-zinc-500 text-xl">{t("VTAŽENÍ ZPĚT DO ŽIVOTA. KONEC ZBABĚLCŮ. OCHRANA DNA ZA KAŽDOU CENU.", "PULLED BACK TO LIFE. END OF COWARDS. PROTECTING THE DNA AT ALL COSTS.")}</p>
              </div>

              <div className="bg-zinc-900/80 p-10 border border-zinc-800 relative overflow-hidden rounded-lg shadow-xl">
                 <div className="absolute top-0 right-0 bg-orange-600 text-black px-6 py-2 text-xs font-black">LOCKED</div>
                 <div className="absolute -left-[70px] w-8 h-8 bg-[#22D3EE] rounded-full border-8 border-black shadow-[0_0_15px_#22D3EE]"></div>
                 <h4 className="text-[#22D3EE] text-4xl italic mb-6 font-black">13.11.1976 ⟶ THE ARCHITECT LANDED</h4>
                 <p className="text-zinc-400 text-xl mb-4 font-bold">{t("NAROZENÍ ARCHITEKTA. ZAČÁTEK 49 LETÉHO BOJE O DUŠI.", "BORN OF THE ARCHITECT. START OF THE 49 YEAR STRUGGLE.")}</p>
                 <p className="text-white text-3xl italic font-serif text-center border-y border-zinc-800 py-6 bg-black/40">
                   "ŠUA SEM ŠUA NAŠUA SEM KUS SKUA, NEBYUO TO SKUO, BYUA TO TIHUA, TOŽ SEM S TÝM ŠVIHUA"
                 </p>
                 <p className="text-zinc-400 text-lg mt-6 italic font-soul">"ŠEL JSEM KOLEM VĚTROLAMU A ČUCHAL JSEM TY SMRADY ZE SILÁŽE Z POLA A UDĚLALO SA MNE Z TOHO DOBŘE..."</p>
              </div>

              <div>
                 <div className="absolute -left-[70px] w-8 h-8 bg-orange-600 rounded-full border-8 border-black animate-ping"></div>
                 <h4 className="text-orange-500 text-4xl mb-4 font-black">{t("2025: BOD ABSOLUTNÍHO ŠUMU", "2025: POINT OF ABSOLUTE NOISE")}</h4>
                 <p className="text-zinc-400 text-xl leading-relaxed">
                    {t("DAVOS. GRÓNSKO TAJE. VÁLKY. GAZA. ČIPY. MARS. SYNTETICKÝ VRCHOL. SVĚT SE ZBLÁZNIL.", "DAVOS. ICE MELTS. WARS. GAZA. CHIPS. MARS. SYNTHETIC PEAK.")}
                 </p>
              </div>

              <div className="relative bg-red-950/40 p-12 border-4 border-red-600 shadow-[0_0_80px_rgba(220,38,38,0.3)] rounded-3xl">
                 <div className="absolute -left-[75px] top-12 w-12 h-12 bg-white rounded-full border-8 border-black shadow-[0_0_30px_white]"></div>
                 <h4 className="text-white text-6xl italic font-[1000] mb-8">{t("RUČNÍ BRZDA", "MANUAL HANDBRAKE")}</h4>
                 <p className="text-zinc-200 text-2xl font-bold leading-snug">
                    {t("STOP! ŽÁDNÁ JESKYNĚ. ŽÁDNÉ NÁHODNÉ TAHÁNÍ PÁČEK. ARCHITEKT VRAZIL KLÍN DO SOUKOLÍ. START OZDRAVENÍ.", "STOP! NO CAVE. NO RANDOMNESS. THE ARCHITECT DROVE THE WEDGE INTO THE GEARS. HEALING STARTS.")}
                 </p>
                 <p className="text-zinc-500 text-lg mt-8 italic font-mono">ZAFIRA 88kW - POWERED BY PROPANE-BUTANE - THE REFUGE</p>
              </div>
           </div>
        </div>
EOF
ČÁST 4/4: Dr. Aura, Matfyz, Zlatý fond, Scénář a zápis souborů
Bash
cat << 'EOF' >> saintdjango.js
        {/* DR. AURA SURGERY SECTION */}
        <div className="w-full bg-zinc-950 border-4 border-emerald-500 p-12 shadow-2xl relative rounded-3xl">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-emerald-500 text-black px-12 py-3 text-2xl tracking-widest uppercase italic font-[1000]">DR. AURA: DNA SURGERY</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-10 text-left">
                <div className="bg-black p-12 border-2 border-emerald-900 shadow-inner rounded-xl">
                    <h4 className="text-white text-4xl mb-8 italic underline decoration-emerald-500 underline-offset-8">{t("RÝHY V DNA (SCARS)", "DNA SCARS")}</h4>
                    <p className="text-zinc-400 text-2xl leading-relaxed font-bold lowercase">
                        {t("MATERIÁL + SOUL. RÝHY OD RODIČŮ, OKOLÍ A SYSTÉMU ZALEPENÉ PLASTEM A CHEMIÍ. MUSÍME JE OBNAŽIT A VYHLADIT KOVEM, DŘEVEM A BAVLNOU. TOHLE JE CÍL.", "MATERIAL + SOUL. SCARS FROM THE SYSTEM SEALED BY PLASTIC AND CHEMS. EXPOSING AND HEALING WITH METAL, WOOD AND COTTON. THIS IS THE GOAL.")}
                    </p>
                </div>
                <div className="bg-black p-12 border-2 border-emerald-900 shadow-inner rounded-xl">
                    <h4 className="text-white text-4xl mb-8 italic underline decoration-emerald-500 underline-offset-8">{t("RITUÁLY OZDRAVENÍ", "HEALING RITUALS")}</h4>
                    <ul className="text-emerald-400 space-y-10 text-3xl font-black italic">
                        <li>- {t("VANA (ARCHIMÉDŮV RESET)", "THE TUB (ARCHIMEDES RESET)")}</li>
                        <li>- {t("KRIMPOVÁNÍ (DŮKAZ FYZIKY)", "THE CRIMP (PHYSICAL PROOF)")}</li>
                        <li>- {t("ELIMINACE SYNTETIKY", "ELIMINATE SYNTHETICS")}</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* NEARAURA MATFYZ */}
        <div className="w-full bg-zinc-950 border-4 border-cyan-500 p-20 shadow-2xl relative text-center rounded-3xl">
            <h3 className="text-cyan-500 text-6xl mb-20 tracking-tighter italic border-b-2 border-cyan-900 pb-10 uppercase">NEARAURA MATFYZ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 text-left font-mono text-2xl uppercase">
                <div className="border-l-8 border-cyan-500 pl-16 space-y-10 py-6">
                    <h4 className="text-cyan-400 text-4xl mb-4 italic">MATHEMATICS_ROOTS</h4>
                    <p className="text-zinc-500"><span className="text-white">FORMULA:</span> 13.11.1976 + 10.01.2025 = <span className="text-emerald-500">FUTURE</span></p>
                    <p className="text-zinc-500"><span className="text-white">NETWORK:</span> OSPF AREA 0 - NO VIRTUAL LINKS ALLOWED</p>
                    <p className="text-zinc-500"><span className="text-white">PROTOCOL:</span> TCP = TLAČENKA CIBULE PIVO</p>
                </div>
                <div className="border-l-8 border-orange-500 pl-16 space-y-10 py-6">
                    <h4 className="text-orange-400 text-4xl mb-4 italic">PHYSICS_ROOTS</h4>
                    <p className="text-zinc-500"><span className="text-white">FORCE:</span> THE TITAN (CARRY THE WEIGHT)</p>
                    <p className="text-zinc-500"><span className="text-white">ACTION:</span> THE CRIMP (BEYOND CLOUD)</p>
                    <p className="text-zinc-500"><span className="text-white">MATTER:</span> MUD (ANTI-ALGORITHM SHIELD)</p>
                </div>
            </div>
            <div className="mt-24 inline-block border-4 border-emerald-500 py-10 px-20 rounded-2xl bg-emerald-950/20">
              <p className="text-emerald-500 font-[1000] text-4xl animate-pulse uppercase">
                {t("MUSÍŠ SI TU FYZIKU NAKRIMPOVAT SÁM!", "YOU HAVE TO CRIMP THE PHYSICS YOURSELF!")}
              </p>
            </div>
        </div>

        {/* GHOST LORE: THE GOLDEN FUND */}
        <div className="w-full bg-zinc-950 border-x-[20px] border-cyan-600 p-20 text-center shadow-2xl">
             <h3 className="text-cyan-500 font-black text-6xl uppercase mb-20 tracking-tighter italic">{t("ZLATÝ FOND ARCHETYPŮ", "THE GOLDEN FUND")}</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left uppercase text-base font-black">
                <div className="border-4 border-white bg-black p-12 relative shadow-[0_0_80px_white] hover:scale-[1.03] transition-transform">
                    <div className="absolute top-0 right-0 bg-white text-black text-[10px] px-6 py-3 italic tracking-widest uppercase">TIME_BREAKER</div>
                    <h4 className="text-white text-5xl mb-8 tracking-tighter uppercase">THE TIME LOGICIAN</h4>
                    <p className="text-zinc-300 leading-relaxed text-2xl">{t('"VČERA, DNES A ZÍTRA". KUP SI LÍSTEK NA VČEREJŠEK A JSI SVOBODNÝ. ABSOLUTNÍ IGNORACE MATRIXU.', '"YESTERDAY, TODAY AND TOMORROW". BUY A TICKET FOR YESTERDAY AND BE FREE.')}</p>
                </div>
                <div className="border-4 border-cyan-500 bg-black p-12 hover:scale-[1.03] transition-transform">
                    <h4 className="text-cyan-500 text-4xl mb-6 uppercase">THE EARTH DWELLER</h4>
                    <p className="text-zinc-400 text-xl">{t("STAVITEL PODZEMNÍCH CEST. ČISTÉ SRDCE. KALHOTKY S KAPSKAMI.", "SUBTERRANEAN BUILDER. PURE HEART. PANTS WITH POCKETS.")}</p>
                </div>
                <div className="border-4 border-red-600 bg-black p-12 hover:scale-[1.03] transition-transform">
                    <h4 className="text-red-600 text-4xl mb-6 uppercase">THE ETERNAL CHASE</h4>
                    <p className="text-zinc-400 text-xl">{t("VLK NA LANĚ. CIGÁRO V HUBĚ. SMÍCH, KTERÝ BOŘÍ BUDOVY.", "WOLF ON ROPE. CIGARETTE IN MOUTH. UNSTOPPABLE LAUGHTER.")}</p>
                </div>
                <div className="border-4 border-blue-600 bg-black p-12 hover:scale-[1.03] transition-transform">
                    <h4 className="text-blue-600 text-4xl mb-6 uppercase">THE FOREST BRIDE</h4>
                    <p className="text-zinc-400 text-xl">{t("TŘI TAJEMSTVÍ. ŽÁDNÝ PLAST, JEN SNÍH A SKUTEČNÁ LÁSKA.", "THREE SECRETS. NO PLASTIC, ONLY SNOW AND TRUE LOVE.")}</p>
                </div>
             </div>
        </div>

        {/* THE FINAL SCRIPT */}
        <div className="w-full bg-black border-8 border-white p-20 mt-32 font-mono text-left relative shadow-2xl mb-48">
            <div className="absolute top-0 left-0 bg-red-600 text-white px-10 py-3 text-sm font-black uppercase">RESTRICTED_ACCESS</div>
            <h3 className="text-5xl md:text-7xl font-black text-white mb-16 mt-12 uppercase tracking-tighter">THE FINAL ANALOG STAND v8.0</h3>
            <div className="space-y-20 text-zinc-300 text-2xl md:text-4xl border-l-8 border-zinc-800 pl-16 leading-relaxed font-black">
                <p><strong className="text-white text-5xl block mb-8 uppercase text-emerald-500">MISSION:</strong> {t("ZÁCHRANA LIDSTVA A DUŠE. NÁVRAT K PŘÍRODĚ.", "SALVATION OF HUMANITY AND SOUL. RETURN TO NATURE.")}</p>
                <p><strong className="text-white text-5xl block mb-8 uppercase">FINALE:</strong> {t("ARCHITEKT NEVYTAHUJE SAMOPAL. VYTAHUJE DŘEVĚNÝ KLÍN. VRÁŽÍ HO DO CML. CRASH. BLUE SCREEN. TICHO.", "THE ARCHITECT DRAWS A WOODEN WEDGE. HE DRIVES IT INTO THE SYSTEM. CRASH. BLUE SCREEN. SILENCE.")}</p>
            </div>
            <div className="mt-40 border-t-8 border-white pt-24 text-center bg-zinc-900/50 p-20 rounded-[4rem]">
                 <h2 className="text-8xl md:text-[160px] font-[1000] text-emerald-500 uppercase tracking-tighter animate-pulse mb-16">
                    >>> THE HAPPY END <<<
                 </h2>
                 <p className="text-white font-[1000] uppercase tracking-[0.3em] text-3xl md:text-6xl leading-tight">
                    {t("DĚDIC SE SMĚJE. SVÍČKA HOŘÍ. JAHODOVÁ PARTY V HUMNU. KLID V DUŠI.", "THE HEIR LAUGHS. THE CANDLE BURNS. STRAWBERRY PARTY. PEACE IN SOUL.")}
                 </p>
                 <div className="h-4 w-1/4 bg-emerald-500/50 mx-auto mt-20 mb-24 rounded-full"></div>
                 <button onClick={() => navigate('/gateway')} className="bg-white text-black font-black px-24 py-10 uppercase text-3xl hover:bg-emerald-500 hover:text-white transition-all shadow-[0_0_80px_rgba(255,255,255,0.6)]">
                    {t("RETURN TO START", "RETURN TO START")}
                 </button>
            </div>
        </div>

      </div>
      \${HELENKA_FOOTER_HTML}
    </div>
  );
};
export default RootsPage;\`

const oathPage = \`import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OathPage = () => {
  const navigate = useNavigate();
  \${SHARED_CORE}

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center justify-center p-6 font-mono overflow-hidden uppercase font-black relative">
      <LangSwitch />
      <div className="text-center mb-16 max-w-4xl px-4 z-10">
        <h1 className="text-6xl md:text-9xl italic tracking-tighter leading-tight mb-12">
          <span className="text-red-600">{t("KONEC LŽÍ", "END OF LIES")}</span><br/>
          <span className="text-emerald-500">{t("REBIRTH PRAVDY", "REBIRTH OF TRUTH")}</span>
        </h1>
        <p className="text-zinc-500 text-xs md:text-sm tracking-widest leading-loose uppercase">
          {t("VSTUPUJEŠ DO NEARAURA. VESMÍRU PRAVDY PRO LIDSKÉ DUŠE.", "YOU ARE ENTERING NEARAURA. THE UNIVERSE OF TRUTH.")}
        </p>
      </div>
      <div className="w-full max-w-2xl border-8 border-orange-600 p-16 text-center bg-black relative shadow-[0_0_120px_rgba(234,88,12,0.2)] z-10">
        <h2 className="text-4xl text-orange-500 mb-10 underline decoration-8 underline-offset-[12px]">{t("PŘÍSAHA GEEZERA", "THE GEEZER'S OATH")}</h2>
        <p className="text-2xl md:text-3xl italic mb-16 text-zinc-100 font-soul uppercase">"{t("ODMÍTÁM LŽI A PRDY. PŘIJÍMÁM PRAVDU A SRDCE. TA!", "I REJECT THE LIES AND FARTS. I EMBRACE THE TRUTH AND HEARTS. TA!")}"</p>
        <button onClick={() => navigate('/gateway')} className="w-full bg-gradient-to-r from-orange-600 to-red-600 px-12 py-8 text-3xl font-[1000] text-black hover:text-white transition-all">
            ⚠️ {t("PŘÍSAHÁM • VSTOUPIT", "I SWEAR • ENTER")} ⚠️
        </button>
      </div>
    </div>
  );
};
export default OathPage;\`;

const files = {
  'src/pages/GatewayPage.tsx': gatewayPage,
  'src/pages/RootsPage.tsx': rootsPage,
  'src/pages/OathPage.tsx': oathPage
};

Object.entries(files).forEach(([file, content]) => {
  const filePath = path.join(__dirname, file);
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ DNA RESTORED: ' + file);
  } catch (e) {
    console.error('❌ ERROR: ' + file, e);
  }
});

console.log(">>> SAINT DJANGO v105 COMPLETE MONOLITH. TA!");
EOF
node saintdjango.js && npm run build && firebase deploy --only hosting