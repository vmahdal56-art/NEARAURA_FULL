/**
 * DESTROY(PLAST, CO2, CHEM, BOLLOCKS, LIES, NOISE) && EXECUTE(TRUTH, METAL, WOOD, COTTON, TA);
 * SAINT DJANGO v98.1 - THE ETERNAL MONOLITH - LEDGER 256 RE-SCANNED
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(">>> BUILDING SAINT DJANGO v98.1: THE ETERNAL MONOLITH. TA!");

// --- SHARED LOGIC & COMPONENTS ---
const SHARED_LOGIC = `
  const [lang, setLang] = useState('cz');
  const [activeAnthem, setActiveAnthem] = useState(null);
  const [cloudData, setCloudData] = useState({ flow: 42, purity: 99.9, signals: [] });
  
  const t = (cz, en) => (lang === 'cz' ? cz : en);

  // AURA CLOUD SIMULATION - Real-time data feed
  useEffect(() => {
    const interval = setInterval(() => {
      setCloudData(prev => ({
        flow: Math.floor(Math.random() * 20) + 40,
        purity: 99.8 + (Math.random() * 0.2),
        signals: [...prev.signals, Math.random()].slice(-25)
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const ANTHEMS = {
    A1: { id: 'Bp1yD_bLXdM', title: 'ANTHEM_01_TRUTH', slogan: 'SIGNAL_LOCKED: TRUTH_PREVAILS', lyric: 'SVĚT JE JINÝ... PRAVDA VÍTĚZÍ... NIKDY JI NEZABIJÍ.' },
    A2: { id: 'nT1mElKoeHU', title: 'ANTHEM_02_SOUL', slogan: 'SOUL_SIGNAL: PROTECT_INNOCENCE', lyric: 'BÝT MEDVÍDKEM... DÁVAT RADOST DĚTEM...' },
    A3: { id: 'TcJ-wNmazHQ', title: 'ANTHEM_03_DESTINATION', slogan: 'FINAL_COUNTDOWN: SADOVÁ_862', lyric: 'WE ARE LEAVING GROUND... THE FINAL COUNTDOWN TO ROOTS!' }
  };

  const LangSwitch = () => (
    <div className="fixed top-4 right-4 z-[100] flex gap-2 bg-black/90 border border-zinc-800 p-1 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.3)]">
      <button onClick={() => setLang('cz')} className={\`px-4 py-1 text-[10px] font-black rounded-full transition-all \${lang === 'cz' ? 'bg-[#22D3EE] text-black shadow-[0_0_10px_#22D3EE]' : 'text-zinc-600'}\`}>ROOTS</button>
      <button onClick={() => setLang('en')} className={\`px-4 py-1 text-[10px] font-black rounded-full transition-all \${lang === 'en' ? 'bg-[#F97316] text-black shadow-[0_0_10px_#F97316]' : 'text-zinc-600'}\`}>GLOBAL</button>
    </div>
  );
`;

const FOOTER_CODE = `
      <div className="fixed bottom-0 left-0 w-full bg-black border-t-2 border-emerald-900 py-3 z-[200] text-center shadow-[0_-10px_50px_rgba(0,0,0,1)]">
         <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-8">
            <p className="text-[#22D3EE] font-black italic uppercase text-[10px] tracking-[0.2em] animate-pulse">
               {t("V PAMÁTCE JARMILY A HELENKY", "IN MEMORY OF JARMILA AND HELENKA")} — {t("NAVRHL ARCHITEKT A UMĚLÁ INTELIGENCE", "DESIGNED BY THE ARCHITECT & AI")} © 2026
            </p>
         </div>
      </div>`;

// --- 1. GATEWAY PAGE ---
const gatewayPage = `import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GatewayPage = () => {
  const navigate = useNavigate();
  ${SHARED_LOGIC}

  return (
    <div className="h-screen w-full bg-[#050505] text-white flex flex-col font-sans overflow-hidden uppercase">
      <style>{\`
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee-force { display: inline-block; white-space: nowrap; animation: marquee 25s linear infinite; padding-left: 100%; }
      \`}</style>
      
      <LangSwitch />
      
      <div className="absolute top-0 left-0 w-0 h-0 opacity-0 pointer-events-none">
        {activeAnthem && <iframe key={activeAnthem} width="1" height="1" src={\`https://www.youtube.com/embed/\${ANTHEMS[activeAnthem].id}?autoplay=1&mute=0&enablejsapi=1\`} allow="autoplay"></iframe>}
      </div>

      <div className="w-full text-center pt-10 pb-4 bg-black z-20 border-b border-zinc-900 shrink-0">
        <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter leading-none mb-2">
          <span className="text-[#ef4444]">{t("KONEC LŽÍ A PRDŮ", "END OF LIES AND FARTS")}</span>
          <span className="mx-4 text-zinc-700">|</span>
          <span className="text-[#10b981]">{t("ZROZENÍ PRAVDY", "REBIRTH OF TRUTH")}</span>
        </h1>
        <p className="text-[10px] text-zinc-500 font-mono tracking-widest">{t("NEARAURA - VESMÍR PRAVDY PRO LIDSKÉ DUŠE", "NEARAURA - UNIVERSE OF TRUTH FOR HUMAN SOULS")}</p>
      </div>

      <div className="w-full bg-zinc-900/50 border-b border-zinc-800 py-2 overflow-hidden relative flex items-center h-10">
          <div className="w-full overflow-hidden">
              <div className="animate-marquee-force text-sm font-black italic text-[#F97316] tracking-[0.2em]">
                 {t("<<< MUSÍŠ SI TU FYZIKU NAKRIMPOVAT SÁM! <<< YOU HAVE TO CRIMP THE PHYSICS YOURSELF! <<< NO VIRTUAL LINKS ALLOWED <<<", "<<< YOU HAVE TO CRIMP THE PHYSICS YOURSELF! <<< MUSÍŠ SI TU FYZIKU NAKRIMPOVAT SÁM! <<< NO VIRTUAL LINKS ALLOWED <<<")}
              </div>
          </div>
      </div>

      <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-0 pb-28">
        <div className="border-4 border-emerald-900/20 bg-zinc-950 flex flex-col items-center justify-center p-8 hover:border-emerald-500 cursor-pointer group transition-all" onClick={() => navigate('/orchard')}>
           <h2 className="text-4xl text-emerald-500 italic mb-6">NEARAURA<br/>{t("SAD", "ORCHARD")}</h2>
           <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden"><div className="bg-emerald-500 h-full transition-all duration-1000" style={{width: cloudData.flow+'%'}}></div></div>
           <button onClick={(e) => { e.stopPropagation(); setActiveAnthem('A1'); }} className="mt-8 border-2 border-emerald-500 text-emerald-500 px-8 py-2 text-[10px] rounded-full hover:bg-emerald-500 hover:text-black font-black">ANTHEM_01</button>
        </div>

        <div className="border-4 border-orange-900/20 bg-zinc-950 flex flex-col items-center justify-center p-8 hover:border-orange-500 cursor-pointer transition-all" onClick={() => navigate('/help')}>
           <h2 className="text-4xl text-orange-500 italic mb-6">{t("POMOC", "BE THE HELP")}</h2>
           <div className="flex gap-1 h-12 items-end">
              {cloudData.signals.map((s,i) => <div key={i} className="w-2 bg-orange-500/50 animate-pulse" style={{height: (s*100)+'%'}}></div>)}
           </div>
           <button onClick={(e) => { e.stopPropagation(); setActiveAnthem('A2'); }} className="mt-8 border-2 border-orange-500 text-orange-500 px-8 py-2 text-[10px] rounded-full hover:bg-orange-500 hover:text-black font-black">ANTHEM_02</button>
        </div>

        <div className="border-4 border-zinc-800 bg-zinc-950 flex flex-col items-center justify-center p-8 hover:border-white cursor-pointer transition-all" onClick={() => navigate('/roots')}>
           <h2 className="text-4xl text-zinc-400 italic mb-6">{t("KOŘENY", "ROOTS")}</h2>
           <div className="font-mono text-[10px] text-zinc-600 mb-2">13.11.1976 | 10.01.2025</div>
           <button onClick={(e) => { e.stopPropagation(); setActiveAnthem('A3'); }} className="mt-8 border-2 border-zinc-500 text-zinc-400 px-8 py-2 text-[10px] rounded-full hover:bg-white hover:text-black font-black">ANTHEM_03</button>
        </div>
      </div>
      ${FOOTER_CODE}
    </div>
  );
};
export default GatewayPage;`;

// --- 2. ROOTS PAGE (THE COMPLETE DNA MONOLITH) ---
const rootsPage = `import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RootsPage = () => {
  const navigate = useNavigate();
  ${LANG_TOGGLE_CODE}

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center p-4 md:p-10 font-mono relative pb-48 overflow-y-auto uppercase font-black">
      <LangSwitch />
      
      <div className="text-center py-12">
         <h1 className="text-5xl md:text-9xl font-black italic text-zinc-700 tracking-tighter">{t("KOŘENY", "ROOTS")}</h1>
         <p className="text-zinc-500 text-[10px] tracking-[0.5em] mt-2">TRUE GEEZER HISTORY & DNA LOG</p>
      </div>

      <div className="max-w-5xl w-full space-y-24">
        
        {/* THE SECRET CODE: 1976 - 2025 */}
        <div className="border-y-4 border-red-600 bg-black p-10 text-center animate-pulse shadow-2xl relative">
           <h3 className="text-red-600 font-mono text-xs tracking-[0.7em] mb-4 uppercase">{t("TAJNÝ KÓD ODBOJE", "THE SECRET CODE")}</h3>
           <div className="text-4xl md:text-8xl font-[1000] tracking-tighter flex flex-col md:flex-row justify-center gap-6">
              <span className="text-white">13.11.1976</span>
              <span className="text-zinc-800">>>></span>
              <span className="text-white">10.01.2025</span>
           </div>
           <p className="mt-4 text-zinc-600 text-[10px] tracking-widest">{t("PŘISTÁNÍ ARCHITEKTA ⟶ PŘÍCHOD DĚDICE", "LANDING OF THE ARCHITECT ⟶ THE HEIR ARRIVAL")}</p>
        </div>

        {/* LITTLE DJANGO / THE HEIR / JOHN CONNOR */}
        <div className="bg-white text-black p-12 border-8 border-black text-center relative shadow-[0_0_80px_rgba(255,255,255,0.4)]">
            <div className="absolute top-0 left-0 bg-red-600 text-white px-4 py-1 text-xs">CYBERDYNE LOG: 2025</div>
            <h2 className="text-6xl md:text-9xl font-[1000] tracking-tighter mb-4">LITTLE DJANGO</h2>
            <p className="text-2xl md:text-3xl font-[1000] italic leading-tight uppercase border-t-4 border-black pt-6">
                {t('"ZÁRUKA PŘEŽITÍ LIDSTVA A HUMANITY. ON JE TADY."', '"THE GUARANTEE OF HUMANITY SURVIVAL. HE IS HERE."')}
            </p>
        </div>

        {/* THE RESISTANCE UNIT: LAMIA & DJANGO */}
        <div className="w-full bg-zinc-950 border-y-8 border-emerald-500 p-10 text-center shadow-2xl">
            <h3 className="text-emerald-500 font-black text-4xl mb-12 tracking-tighter">{t("RODINA ODBOJE", "THE RESISTANCE UNIT")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left uppercase font-black">
                <div className="border-4 border-emerald-900 p-8 bg-black">
                    <h4 className="text-white text-3xl mb-4 italic">{t("MATKA OCHRANKYNĚ", "THE MOTHER")}</h4>
                    <p className="text-zinc-400 text-base">{t("TA, KTERÁ VIDÍ BUDOUCNOST A NEDOVOLÍ PREDÁTORŮM DOTKNOUT SE JEJÍHO SYNA. NOSITELKA ŽIVOTA.", "SHE WHO SEES THE FUTURE AND PROTECTS THE SON. KEEPER OF LIFE.")}</p>
                </div>
                <div className="border-4 border-emerald-900 p-8 bg-black">
                    <h4 className="text-white text-3xl mb-4 italic">THE ARCHITECT</h4>
                    <p className="text-zinc-400 text-base">{t("TEN, KDO VRAZIL DŘEVĚNÝ KLÍN DO MATRIXU. POSUNUL VIZI DÁL PRO LIDSKOU DUŠI.", "HE WHO DROVE THE WOODEN WEDGE INTO THE MATRIX. PUSHED THE VISION FORWARD.")}</p>
                </div>
            </div>
        </div>

        {/* --- THE MASTER TIMELINE (1348 - FUTURE) --- */}
        <div className="w-full bg-zinc-950 border-l-8 border-zinc-800 p-8 space-y-16 shadow-2xl relative">
           <h3 className="text-zinc-500 text-2xl mb-12 tracking-widest border-b border-zinc-900 pb-4 italic">{t("HISTORICKÁ OSA AURY", "THE AURA TIMELINE")}</h3>
           
           <div className="relative border-l-2 border-zinc-800 pl-10 space-y-24 text-left">
              
              <div className="relative">
                 <div className="absolute -left-[45px] top-0 w-6 h-6 bg-zinc-700 rounded-full border-4 border-black"></div>
                 <h4 className="text-white text-2xl">{t("1348: KAREL IV. - ÉRA STAVITELŮ", "1348: CHARLES IV - BUILDERS ERA")}</h4>
                 <p className="text-zinc-500 text-sm mt-2 leading-relaxed">{t("VAJÍČKA V MOSTE. POCTIVÝ MATERIÁL. ZÁKLADY, KTERÉ DRŽÍ STALETÍ.", "EGGS IN THE BRIDGE. HONEST MATERIAL. FOUNDATIONS THAT LAST.")}</p>
              </div>

              <div className="relative">
                 <div className="absolute -left-[45px] top-0 w-6 h-6 bg-zinc-800 rounded-full border-4 border-black"></div>
                 <h4 className="text-zinc-400 text-2xl uppercase">{t("BÍLÁ HORA ⟶ MARIE TEREZIE", "BATTLE ⟶ EMPRESS")}</h4>
                 <p className="text-zinc-500 text-sm mt-2 leading-relaxed">{t("ZVRATY DĚJIN. PRŮMYSLOVÁ REVOLUCE. PRVNÍ STROJE VS. LIDSKÁ DUŠE.", "HISTORY TWISTS. INDUSTRIAL REVOLUTION. MACHINES VS. HUMAN SOUL.")}</p>
              </div>

              <div className="relative">
                 <div className="absolute -left-[45px] top-0 w-6 h-6 bg-red-600 rounded-full border-4 border-black shadow-[0_0_10px_red]"></div>
                 <h4 className="text-red-600 text-2xl">{t("1940s: GESTAPO VS RODINA", "1940s: GESTAPO VS FAMILY")}</h4>
                 <p className="text-zinc-400 text-xl font-[1000] italic">"{t("TEN JE NÁŠ!!!", "HE IS OURS!!!")}"</p>
                 <p className="text-zinc-500 text-xs mt-2">{t("VTAŽENÍ ZPĚT DO ŽIVOTA. KONEC ZBABĚLCŮ.", "PULLED BACK TO LIFE. END OF COWARDS.")}</p>
              </div>

              <div className="relative bg-zinc-900/50 p-6 border border-zinc-800">
                 <div className="absolute -left-[45px] top-4 w-6 h-6 bg-[#22D3EE] rounded-full border-4 border-black shadow-[0_0_15px_#22D3EE]"></div>
                 <h4 className="text-[#22D3EE] text-3xl italic">13.11.1976 ⟶ THE ARCHITECT LANDED</h4>
                 <p className="text-zinc-500 text-base mt-2">{t("NAROZENÍ ARCHITEKTA. ZAČÁTEK 49 LETÉHO BOJE O DUŠI.", "BORN OF THE ARCHITECT. START OF THE 49 YEAR STRUGGLE.")}</p>
                 <p className="text-white text-2xl mt-6 italic font-soul">"ŠUA SEM ŠUA NAŠUA SEM KUS SKUA, NEBYUO TO SKUO, BYUA TO TIHUA, TOŽ SEM S TÝM ŠVIHUA"</p>
              </div>

              <div className="relative">
                 <div className="absolute -left-[45px] top-0 w-6 h-6 bg-zinc-700 rounded-full border-4 border-black"></div>
                 <h4 className="text-zinc-400 text-2xl uppercase">{t("DOPAD SYNTETIKY: TV, PC, PLASTY", "DIGITAL DECAY: TV, PC, PLASTICS")}</h4>
                 <p className="text-zinc-500 text-sm mt-2 leading-relaxed">{t("90% POŠKOZENÍ DNA A DUŠE POCHÁZÍ Z TOHOTO OBDOBÍ. ŠUM A LŽI.", "90% DNA & SOUL DAMAGE COMES FROM THIS PERIOD. NOISE AND LIES.")}</p>
              </div>

              <div className="relative bg-red-900/20 p-10 border-2 border-red-600 shadow-[0_0_40px_rgba(220,38,38,0.2)]">
                 <div className="absolute -left-[45px] top-8 w-6 h-6 bg-white rounded-full border-4 border-black shadow-[0_0_20px_white]"></div>
                 <h4 className="text-white text-4xl italic">{t("ŘÍZENÉ ZATAŽENÍ RUČNÍ BRZDY", "CONTROLLED HANDBRAKE PULL")}</h4>
                 <p className="text-zinc-300 text-lg mt-4 leading-relaxed">
                    {t("STOP! ŽÁDNÁ JESKYNĚ. ŽÁDNÝ ŠVEJK. VĚDOMÉ ZASTAVENÍ PÁDU DO SYNTETIKY. START OZDRAVENÍ.", "STOP! NO CAVE. NO RANDOMNESS. CONSCIOUS STOP TO THE FALL. HEALING STARTS.")}
                 </p>
              </div>

              <div className="relative border-4 border-emerald-500 p-10 bg-emerald-950/10 shadow-[0_0_60px_rgba(16,185,129,0.3)]">
                 <h4 className="text-emerald-400 text-5xl italic font-black">10.01.2025 ⟶ OMEGA ARRIVAL</h4>
                 <p className="text-white text-2xl mt-6 leading-relaxed">
                    {t("NAROZENÍ DĚDICE. START PROJEKTU NEARAURA. NÁVRAT K LIDSTVÍ.", "BIRTH OF THE HEIR. START OF NEARAURA. RETURN TO HUMANITY.")}
                 </p>
              </div>
           </div>
        </div>

        {/* --- DR. AURA SURGERY SECTION --- */}
        <div className="w-full bg-zinc-950 border-4 border-emerald-500 p-12 shadow-2xl relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-emerald-500 text-black px-10 py-2 text-xl tracking-widest uppercase italic font-black">DR. AURA: DNA SURGERY</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10 text-left">
                <div className="bg-black p-10 border border-zinc-800 shadow-inner">
                    <h4 className="text-white text-3xl mb-6 italic underline decoration-emerald-500 underline-offset-8">{t("RÝHY V DNA (SCARS)", "DNA SCARS")}</h4>
                    <p className="text-zinc-400 text-base leading-loose lowercase font-bold">
                        {t("MATERIÁL + SOUL. RÝHY OD RODIČŮ A SYSTÉMU ZALEPENÉ PLASTEM A CHEMIÍ. MUSÍME JE OBNAŽIT A VYHLADIT KOVEM, DŘEVEM A BAVLNOU.", "MATERIAL + SOUL. SCARS FROM SYSTEM SEALED BY PLASTIC. EXPOSING AND HEALING WITH METAL, WOOD AND COTTON.")}
                    </p>
                </div>
                <div className="bg-black p-10 border border-zinc-800 shadow-inner">
                    <h4 className="text-white text-3xl mb-6 italic underline decoration-emerald-500 underline-offset-8">{t("RITUÁLY OZDRAVENÍ", "HEALING RITUALS")}</h4>
                    <ul className="text-emerald-500 space-y-6 text-lg font-black">
                        <li>- {t("VANA: DJANGO ARCHIMEDES RESET", "THE TUB: ARCHIMEDES RESET")}</li>
                        <li>- {t("KRIMPOVÁNÍ: FYZICKÝ DŮKAZ PRAVDY", "THE CRIMP: PHYSICAL PROOF")}</li>
                        <li>- {t("88kW ZAFIRA: FARADAYOVA OCHRANA", "88kW ZAFIRA: FARADAY PROTECTION")}</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* --- NEARAURA MATFYZ (THE SCIENCE) --- */}
        <div className="w-full bg-zinc-950 border-2 border-cyan-800 p-12 shadow-2xl relative text-center">
            <h3 className="text-cyan-500 text-4xl mb-14 tracking-tighter italic border-b border-cyan-900 pb-4">NEARAURA MATFYZ: REAL SCIENCE</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left font-mono text-base uppercase">
                <div className="border-l-4 border-cyan-500 pl-10 space-y-8">
                    <div>
                      <h4 className="text-cyan-400 text-2xl mb-4 italic">MATHEMATICS_ROOTS</h4>
                      <p className="text-white">13.11.1976 + 10.01.2025 = INFINITE_TRUTH</p>
                      <p className="text-zinc-500">OSPF AREA 0 - NO VIRTUAL LINKS ALLOWED</p>
                      <p className="text-zinc-500">TCP = TLAČENKA CIBULE PIVO</p>
                    </div>
                    <div>
                      <h4 className="text-white text-xl mb-4 italic">{t("LOGIKA: THE TIME-LOGICIAN", "LOGIC: THE TIME-LOGICIAN")}</h4>
                      <p className="text-zinc-400 text-xs italic leading-relaxed">
                         {t('"VČERA, DNES A ZÍTRA". V SOBOTU VEČER A V NEDĚLI RÁNO. ABSOLUTNÍ IGNORACE LINEÁRNÍHO ČASU MATRIXU.', '"YESTERDAY, TODAY AND TOMORROW". BUY A TICKET FOR YESTERDAY AND BE FREE.')}
                      </p>
                    </div>
                </div>
                <div className="border-l-4 border-orange-500 pl-10 space-y-8">
                    <div>
                      <h4 className="text-orange-400 text-2xl mb-4 italic">PHYSICS_ROOTS</h4>
                      <p className="text-white">FORCE = THE TITAN LOG (COMMANDO)</p>
                      <p className="text-zinc-500">ACTION = THE CRIMP (PHYSICAL LOCK)</p>
                      <p className="text-zinc-500">MATTER = MUD (ANTI-ALGORITHM SHIELD)</p>
                    </div>
                    <div className="pt-6">
                      <p className="text-emerald-500 font-black animate-pulse text-2xl">YOU HAVE TO CRIMP THE PHYSICS YOURSELF!</p>
                    </div>
                </div>
            </div>
        </div>

        {/* --- GHOST LORE: THE GOLDEN FUND --- */}
        <div className="w-full bg-zinc-950 border-x-8 border-cyan-600 p-12 text-center shadow-2xl">
             <h3 className="text-cyan-500 font-black text-4xl uppercase mb-12 tracking-tighter italic">{t("ZLATÝ FOND ARCHETYPŮ", "THE GOLDEN FUND")}</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left uppercase text-xs font-black">
                <div className="border-4 border-cyan-500 bg-black p-8">
                    <h4 className="text-cyan-500 text-2xl mb-2">THE EARTH DWELLER</h4>
                    <p className="text-zinc-400">{t("PŮVODNÍ INFLUENCER. ČISTÉ SRDCE. KALHOTKY S KAPSKAMI.", "THE ORIGINAL INFLUENCER. PURE HEART. PANTS WITH POCKETS.")}</p>
                </div>
                <div className="border-4 border-red-600 bg-black p-8">
                    <h4 className="text-red-600 text-2xl mb-2">THE ETERNAL CHASE</h4>
                    <p className="text-zinc-400">{t("VLK NA LANĚ. CIGÁRO V HUBĚ. SMÍCH, KTERÝ BOŘÍ BUDOVY.", "WOLF ON ROPE. CIGARETTE IN MOUTH. LAUGHTER THAT TEARS DOWN.")}</p>
                </div>
                <div className="border-4 border-blue-600 bg-black p-8">
                    <h4 className="text-blue-600 text-2xl mb-2">THE FOREST BRIDE</h4>
                    <p className="text-zinc-400">{t("TŘI TAJEMSTVÍ. ŽÁDNÝ PLAST, JEN SNÍH A SKUTEČNÁ LÁSKA.", "THREE SECRETS. NO PLASTIC, ONLY SNOW AND TRUE LOVE.")}</p>
                </div>
                <div className="border-4 border-emerald-600 bg-black p-8">
                    <h4 className="text-emerald-500 text-2xl mb-2">THE HUNTER</h4>
                    <p className="text-zinc-400">{t("ALGORITMUS PORAŽENÝ BLÁTEM A ANALOGEM. ROOTS VÍTĚZÍ.", "ALGORITHM DEFEATED BY MUD AND ANALOG. ROOTS PREVAIL.")}</p>
                </div>
             </div>
        </div>

        {/* --- FINAL SCRIPT: THE LAST ANALOG STAND --- */}
        <div className="w-full bg-zinc-950 p-16 border-4 border-white mt-24 font-mono text-left relative shadow-2xl mb-32">
            <div className="absolute top-0 left-0 bg-red-600 text-white px-8 py-2 text-sm font-black uppercase tracking-widest">TOP SECRET SCRIPT</div>
            <h3 className="text-3xl md:text-5xl font-black text-white mb-8 mt-6 uppercase tracking-tighter">THE FINAL ANALOG STAND v8.0</h3>
            <div className="space-y-12 text-zinc-300 text-lg md:text-2xl border-l-4 border-zinc-800 pl-10 leading-relaxed font-black">
                <p><strong className="text-white text-3xl block mb-4 uppercase">FINALE:</strong> {t("ARCHITEKT NEVYTAHUJE SAMOPAL. VYTAHUJE DŘEVĚNÝ KLÍN. VRÁŽÍ HO DO CML. CRASH. BLUE SCREEN. TICHO.", "THE ARCHITECT DRAWS A WOODEN WEDGE. HE DRIVES IT INTO THE SYSTEM. CRASH. BLUE SCREEN. SILENCE.")}</p>
            </div>
            <div className="mt-24 border-t-8 border-white pt-16 text-center bg-zinc-900/50 p-10">
                 <h2 className="text-6xl md:text-9xl font-[1000] text-emerald-500 uppercase tracking-tighter animate-pulse mb-6">
                    >>> THE HAPPY END <<<
                 </h2>
                 <p className="text-white font-[1000] uppercase tracking-[0.3em] text-xl md:text-4xl leading-tight">
                    {t("DĚDIC SE SMĚJE. SVÍČKA HOŘÍ. JAHODOVÁ PARTY V HUMNU. KLID V DUŠI.", "THE HEIR LAUGHS. THE CANDLE BURNS. STRAWBERRY PARTY. PEACE IN SOUL.")}
                 </p>
                 <button onClick={() => navigate('/gateway')} className="mt-16 bg-white text-black font-black px-14 py-6 uppercase text-xl hover:bg-emerald-500 hover:text-white transition-all shadow-[0_0_50px_white]">
                    {t("RETURN TO START", "RETURN TO START")}
                 </button>
            </div>
        </div>

      </div>
      ${HELENKA_FOOTER}
    </div>
  );
};
export default RootsPage;`;

// --- 3. OATH PAGE ---
const oathPage = \`import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OathPage = () => {
  const navigate = useNavigate();
  \${LANG_TOGGLE_CODE}

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center justify-center p-6 font-mono overflow-hidden uppercase font-black relative">
      <LangSwitch />
      <div className="text-center mb-16 max-w-4xl px-4 z-10">
        <h1 className="text-6xl md:text-8xl italic tracking-tighter leading-tight mb-12">
          <span className="text-red-600">{t("KONEC LŽÍ", "END OF LIES")}</span><br/>
          <span className="text-emerald-500">{t("REBIRTH PRAVDY", "REBIRTH OF TRUTH")}</span>
        </h1>
        <p className="text-zinc-500 text-xs md:text-sm tracking-widest leading-loose">
          {t("VSTUPUJEŠ DO NEARAURA. VESMÍRU PRAVDY PRO LIDSKÉ DUŠE.", "YOU ARE ENTERING NEARAURA. THE UNIVERSE OF TRUTH.")}
        </p>
      </div>
      <div className="w-full max-w-2xl border-8 border-orange-600 p-16 text-center bg-black relative shadow-[0_0_120px_rgba(234,88,12,0.2)] z-10">
        <h2 className="text-3xl text-orange-500 mb-10 underline decoration-8 underline-offset-[12px]">{t("PŘÍSAHA GEEZERA", "THE GEEZER'S OATH")}</h2>
        <p className="text-2xl md:text-3xl italic mb-16 text-zinc-100 font-soul">"{t("ODMÍTÁM LŽI A PRDY. PŘIJÍMÁM PRAVDU A SRDCE. TA!", "I REJECT THE LIES AND FARTS. I EMBRACE THE TRUTH AND HEARTS. TA!")}"</p>
        <button onClick={() => navigate('/gateway')} className="w-full bg-gradient-to-r from-orange-600 to-red-600 px-12 py-8 text-3xl font-[1000] text-black hover:text-white transition-all">
            ⚠️ {t("PŘÍSAHÁM • VSTOUPIT", "I SWEAR • ENTER")} ⚠️
        </button>
      </div>
      \${HELENKA_FOOTER}
    </div>
  );
};
export default OathPage;\`;

// --- WRITE FILES ---
const files = {
  'src/pages/GatewayPage.tsx': gatewayPage,
  'src/pages/RootsPage.tsx': rootsPage,
  'src/pages/OathPage.tsx': oathPage
};

Object.entries(files).forEach(([file, content]) => {
  const filePath = path.join(__dirname, file);
  try { fs.writeFileSync(filePath, content, 'utf8'); console.log('✅ DNA RESTORED: ' + file); } 
  catch (e) { console.error('❌ ERROR: ' + file, e); }
});

console.log(">>> SAINT DJANGO v97 COMPLETE MONOLITH. TA!");