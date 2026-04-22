import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, Skull, Gavel, DoorOpen, 
  Train, Activity, HeartCrack, Briefcase, MousePointer2, Zap, Dna, ArrowRight, Cpu, AlertTriangle,
  CircleX 
} from 'lucide-react';

import { useGeneration } from '../context/GenerationalContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

const T: any = {
  EN: {
    lbl_matrix: "MATRIX", lbl_soft: "(SOFTWARE)", lbl_fail: "SYSTEM FAILURE: LIES DETECTED",
    lbl_aura: "AURATRIX", lbl_hard: "(HARDWARE)", lbl_truth: "L1 TRUTH: CONNECTION READY",
    header: "CASE EVIDENCE",
    stories_title: "5 TRUE STORIES",
    stories_sub: "EVIDENCE OF REALITY",
    read_btn: "READ FULL TRUE STORY (HUMANS ONLY)",
    s1: { t: "THE ANGEL", d: "Killed by Program" },
    s2: { t: "GHOST SON", d: "20 Years Stolen" },
    s3: { t: "1500 CZK", d: "Price of Life" },
    s4: { t: "CONNOR SAVE", d: "Physics over Words" },
    s5: { t: "GLITCH", d: "L3 vs Matrix" },
    s6: { t: "LEGACY", d: "Blood & Dreams" },
    exit: "STAY IN SOFTWARE (EXIT)",
    recoding: "RECODING FUTURE",
    train: "THE TRAIN", trainSub: "is leaving the station.",
    window: "DECISION WINDOW", leave: "LEAVE THE VIRUS.",
    enter: "ENTER AURATRIX", healing: "HEALING..."
  },
  CZ: {
    lbl_matrix: "MATRIX", lbl_soft: "(SOFTWARE)", lbl_fail: "SELHÁNÍ SYSTÉMU: DETEKCE LŽÍ",
    lbl_aura: "AURATRIX", lbl_hard: "(HARDWARE)", lbl_truth: "L1 PRAVDA: SPOJENÍ PŘIPRAVENO",
    header: "DŮKAZNÍ MATERIÁL",
    stories_title: "5 PŘÍBĚHŮ",
    stories_sub: "DŮKAZY REALITY",
    read_btn: "ČÍST CELÉ PŘÍBĚHY (JEN PRO LIDI)",
    s1: { t: "ANDĚL", d: "Zabita Programem" },
    s2: { t: "ZTRACENÝ SYN", d: "20 let krádeže" },
    s3: { t: "1500 KČ", d: "Cena za život" },
    s4: { t: "CONNOR SAVE", d: "Fyzika místo slov" },
    s5: { t: "GLITCH", d: "L3 vs Matrix" },
    s6: { t: "ODKAZ", d: "Krev a Sny" },
    exit: "ZŮSTAT V SOFTWARU (ZPĚT)",
    recoding: "PŘEPISUJI BUDOUCNOST",
    train: "VLAK", trainSub: "odjíždí ze stanice.",
    window: "ROZHODOVACÍ OKNO", leave: "OPUSTIT VIRUS.",
    enter: "VSTOUPIT DO AURATRIX", healing: "LÉČENÍ..."
  },
  FR: { lbl_matrix: "MATRIX", lbl_soft: "(LOGICIEL)", lbl_aura: "AURATRIX", lbl_hard: "(MATÉRIEL)", read_btn: "LIRE TOUT", train: "LE TRAIN", enter: "ENTRER", exit: "SORTIE" },
  DE: { lbl_matrix: "MATRIX", lbl_soft: "(SOFTWARE)", lbl_aura: "AURATRIX", lbl_hard: "(HARDWARE)", read_btn: "ALLES LESEN", train: "DER ZUG", enter: "BETRETEN", exit: "AUSGANG" }
};

const OathPage = () => {
  const navigate = useNavigate();
  const generation = useGeneration();
  const { lang } = useLanguage();
  
  const safeLang = (lang || 'EN').toUpperCase();
  const txt = T[safeLang] || T.EN;

  const [isBoarding, setIsBoarding] = useState(false);

  const handleEnterAuratrix = () => {
    setIsBoarding(true);
    localStorage.setItem('mah_sovereign_oath', 'signed');
    if (generation?.markSworn) generation.markSworn(); 
    setTimeout(() => navigate('/gateway'), 2500);
  };

  const handleReadStories = () => {
    navigate('/5truestory');
  };

  const handleStayInMatrix = () => {
    window.location.href = "https://www.google.com"; 
  };

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-mono selection:bg-red-900 selection:text-white overflow-hidden relative">
      
      <div className="absolute top-6 right-6 z-[100]">
        <LanguageToggle />
      </div>

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      
      {/* HEADER - L1: GATE FROM HELL TO HEAVEN */}
      <div className="absolute top-0 left-0 w-full p-6 z-50 flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-b from-black to-transparent pointer-events-auto text-nowrap">
         <div className="flex flex-col gap-1">
             <div className="flex items-center gap-3 font-black uppercase tracking-widest text-xl select-none text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                <Shield size={24} className="text-[#cd5c09] animate-pulse" /> 
                <span>L1</span>
                <span className="text-[#cd5c09]">•</span>
                <span className="text-red-600">THIS IS GATE FROM HELL TO HEAVEN</span>
                <span className="hidden xl:inline text-zinc-500 text-sm font-light ml-2 animate-bounce">(DON'T WAIT - ENTER)</span>
             </div>
             <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] ml-9 flex items-center gap-2">
                <Cpu size={10} /> NEAR AURA PROTOCOL • PURE HARDWARE HUMANITY
             </div>
         </div>
      </div>

      <div className="w-full h-full min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-24 lg:pt-0">
        
        {/* LEVÁ STRANA - MATRIX (SOFTWARE) */}
        <div className="bg-[#0a0505] p-8 md:p-16 flex flex-col justify-center border-r border-zinc-900 relative shadow-[inset_-20px_0_50px_rgba(220,38,38,0.1)]">
           <div className="mb-12 border-b-2 border-red-600/40 pb-6">
              <div className="flex items-center gap-2 text-red-500 mb-2">
                 <AlertTriangle size={18} />
                 <span className="text-xs font-mono uppercase tracking-[0.3em] font-bold">{txt?.lbl_fail}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                 {txt?.lbl_matrix} <br/>
                 <span className="text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]">{txt?.lbl_soft}</span>
              </h1>
           </div>

           <div className="mb-8">
              <p className="text-zinc-400 font-black tracking-[0.2em] uppercase text-sm mb-6 border-l-2 border-red-600 pl-4">
                 {txt?.stories_sub}
              </p>
              <div className="space-y-5">
                 {[txt?.s1, txt?.s2, txt?.s3, txt?.s4, txt?.s5, txt?.s6].map((story, i) => (
                    <div key={i} className="flex items-center gap-4 group opacity-90 hover:opacity-100 transition-all cursor-default">
                       <div className="w-2 h-2 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,1)] rounded-full"></div>
                       <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                          <span className="text-white font-black uppercase text-sm tracking-widest group-hover:text-red-500 transition-colors">{story?.t}</span>
                          <span className="text-red-500 text-[11px] font-bold uppercase font-mono border border-red-600/50 bg-red-950/20 px-2 py-0.5 rounded leading-none">
                            {story?.d}
                          </span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
           
           <div className="mt-10">
              <button 
                onClick={handleReadStories}
                className="w-full py-5 border-2 border-red-600 text-white bg-red-900/10 hover:bg-red-600 hover:text-black font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 group transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.2)]"
              >
                 {txt?.read_btn} <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform"/>
              </button>
              
              <button 
                onClick={handleStayInMatrix}
                className="w-full mt-6 text-xs text-zinc-500 hover:text-white font-mono uppercase tracking-[0.2em] flex items-center justify-center gap-2 group transition-colors"
              >
                 <CircleX size={16} className="group-hover:rotate-90 transition-transform"/> 
                 {txt?.exit}
              </button>
           </div>
        </div>

        {/* PRAVÁ STRANA - AURATRIX (HARDWARE) */}
        <div className="bg-[#050505] p-8 md:p-16 flex flex-col justify-center relative items-center text-center">
           <div className="absolute top-4 right-4 text-xs text-[#10b981] font-black uppercase tracking-widest flex items-center gap-2 bg-[#10b981]/10 px-3 py-1 border border-[#10b981]/30">
              <Dna size={14}/> {txt?.recoding}
           </div>

           <div className="mb-12 border-b-2 border-[#cd5c09]/40 pb-6 w-full max-w-md">
              <div className="flex items-center justify-center gap-2 text-[#10b981] mb-2">
                 <Zap size={18} fill="currentColor" />
                 <span className="text-xs font-mono uppercase tracking-[0.3em] font-bold">{txt?.lbl_truth}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                 {txt?.lbl_aura} <br/>
                 <span className="text-[#cd5c09] drop-shadow-[0_0_10px_rgba(205,92,9,0.5)]">{txt?.lbl_hard}</span>
              </h1>
           </div>

           <div className="relative mb-10">
              <div className="absolute inset-0 bg-[#cd5c09] blur-[60px] opacity-20 animate-pulse"></div>
              <Train size={120} className="text-[#cd5c09] relative z-10 animate-bounce" strokeWidth={1} />
           </div>
           
           <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
              {txt?.train}
           </h2>
           <p className="text-xl text-zinc-400 font-serif italic mb-12">
              {txt?.trainSub}
           </p>

           <div className="bg-zinc-900/80 border border-zinc-700 p-8 mb-12 max-w-md w-full backdrop-blur-xl shadow-2xl">
              <div className="flex justify-between items-center mb-3">
                 <span className="text-zinc-500 text-xs uppercase font-black tracking-widest">{txt?.window}</span>
                 <MousePointer2 size={16} className="text-[#cd5c09] animate-ping"/>
              </div>
              <p className="text-white font-black text-6xl md:text-7xl tracking-tighter tabular-nums">0.000001<span className="text-zinc-600 text-2xl ml-1">s</span></p>
              <p className="text-[#10b981] text-xs uppercase tracking-[0.4em] mt-4 font-black">
                 {txt?.leave}
              </p>
           </div>

           <button 
             onClick={handleEnterAuratrix}
             disabled={isBoarding}
             className={`
               group relative w-full max-w-md px-12 py-10 bg-[#cd5c09] text-black 
               font-black uppercase tracking-[0.4em] text-3xl
               hover:bg-white hover:text-black transition-all duration-500
               shadow-[0_0_60px_rgba(205,92,9,0.4)]
               hover:shadow-[0_0_100px_rgba(255,255,255,0.6)]
               ${isBoarding ? 'opacity-80 scale-95 cursor-wait' : 'hover:scale-105 active:scale-95'}
             `}
           >
             {isBoarding ? (
               <span className="flex items-center justify-center gap-6">
                 {txt?.healing} <Activity className="animate-pulse h-8 w-8"/>
               </span>
             ) : (
               <span className="flex items-center justify-center gap-4">
                 {txt?.enter} <Zap fill="currentColor" className="h-8 w-8"/>
               </span>
             )}
           </button>

           <div className="mt-20 space-y-4">
              <p className="text-[#10b981] text-sm font-mono uppercase tracking-[0.5em] font-black">
                 PROPER • ALPHA • LOVE • HEALED
              </p>
              <p className="text-zinc-600 text-[11px] font-mono uppercase tracking-widest">
                 EST. 2026 • NEAR AURA • THE CONNOR LINE
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OathPage;